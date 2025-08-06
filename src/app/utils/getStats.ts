import JSZip from "jszip";
import {
  album,
  artist,
  media,
  podcast,
  session,
  song,
  statistics,
  streak,
} from "./types";

export default async function getStats(userData: File): Promise<statistics> {
  const zip = await JSZip.loadAsync(userData);
  const subfolder = "Spotify Extended Streaming History/";

  const songListeningHistory: media[] = [];
  const podcastListeningHistory: media[] = [];
  const audiobookListeningHistory: media[] = [];

  const mostPlayedSongsMap = new Map<string, song>();
  const mostPlayedArtistMap = new Map<string, artist>();
  const mostPlayedAlbumsMap = new Map<string, album>();
  const mostPlayedPodcastsMap = new Map<string, podcast>();

  const longestSongStreak: streak[] = [];
  const lengthOfDay = 24 * 60 * 60 * 1000;
  let songStreakStartDate = 0;
  let songStreakEndDate = 0;
  let previousDay = 0;
  let songStreakLength = 1;

  const longestSongSession: session[] = [];
  const maxSongGap = 10 * 60 * 1000;
  let previousSong = null;
  let songsInSession: song[] = [];
  let sessionStartTime = 0;

  const songsByDay = [0, 0, 0, 0, 0, 0, 0];
  const songsByHour = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const fileEntries = Object.entries(zip.files);

  await Promise.all(
    fileEntries.map(async ([path, zipEntry]) => {
      const targetIsJson =
        path.startsWith(subfolder) &&
        !zipEntry.dir &&
        path.endsWith(".json") &&
        path.split("/").length === 2;

      if (targetIsJson) {
        try {
          const text = await zipEntry.async("string");
          const raw = JSON.parse(text);

          if (!Array.isArray(raw)) {
            throw new Error(`File ${path} does not contain a JSON array`);
          }

          raw.forEach((entry) => {
            const item: media = {
              ts: entry.ts,
              platform: entry.platform,
              ms_played: entry.ms_played,
              conn_country: entry.conn_country,
              ip_addr: entry.ip_addr,
              master_metadata_track_name: entry.master_metadata_track_name,
              master_metadata_album_artist_name:
                entry.master_metadata_album_artist_name,
              master_metadata_album_album_name:
                entry.master_metadata_album_album_name,
              spotify_track_uri: entry.spotify_track_uri,
              episode_name: entry.episode_name,
              episode_show_name: entry.episode_show_name,
              spotify_episode_uri: entry.spotify_episode_uri,
              audiobook_title: entry.audiobook_title,
              audiobook_uri: entry.audiobook_uri,
              audiobook_chapter_uri: entry.audiobook_chapter_uri,
              audiobook_chapter_title: entry.audiobook_chapter_title,
              reason_start: entry.reason_start,
              reason_end: entry.reason_end,
              shuffle: entry.shuffle,
              skipped: entry.skipped,
              offline: entry.offline,
              offline_timestamp: entry.offline_timestamp,
              incognito_mode: entry.incognito_mode,
            };

            // Classify media based on URI type.
            if (item.spotify_track_uri) {
              songListeningHistory.push(item);
            } else if (item.spotify_episode_uri) {
              podcastListeningHistory.push(item);
            } else if (item.audiobook_uri) {
              audiobookListeningHistory.push(item);
            } else {
              console.warn("Unknown media type in entry", entry);
            }
          });
        } catch (err) {
          console.error(`Failed to parse ${path}`, err);
        }
      }
    })
  );

  // Sort arrays by when the media was played.
  songListeningHistory.sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
  );
  podcastListeningHistory.sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
  );
  audiobookListeningHistory.sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
  );

  // Get total listening time for songs, podcasts, and audiobooks.
  const totalSongListeningTime = getTotalListeningTime(songListeningHistory);
  const totalPodcastListeningTime = getTotalListeningTime(
    podcastListeningHistory
  );
  const totalAudiobookListeningTime = getTotalListeningTime(
    audiobookListeningHistory
  );

  for (const song of songListeningHistory) {
    // Initialise song/artist/album if not present in the maps.
    if (!mostPlayedSongsMap.has(song.spotify_track_uri)) {
      mostPlayedSongsMap.set(song.spotify_track_uri, {
        title: song.master_metadata_track_name,
        artist: song.master_metadata_album_artist_name,
        album: song.master_metadata_album_album_name,
        timesPlayed: 0,
        timesSkipped: 0,
        id: song.spotify_track_uri.substring(14),
      });
    }

    if (!mostPlayedArtistMap.has(song.master_metadata_album_artist_name)) {
      mostPlayedArtistMap.set(song.master_metadata_album_artist_name, {
        name: song.master_metadata_album_artist_name,
        timesPlayed: 0,
      });
    }

    if (!mostPlayedAlbumsMap.has(song.master_metadata_album_album_name)) {
      mostPlayedAlbumsMap.set(song.master_metadata_album_album_name, {
        title: song.master_metadata_album_album_name,
        artist: song.master_metadata_album_artist_name,
        timesPlayed: 0,
      });
    }

    // Update count.
    mostPlayedSongsMap.get(song.spotify_track_uri)!.timesPlayed += 1;
    if (song.skipped) {
      mostPlayedSongsMap.get(song.spotify_track_uri)!.timesSkipped += 1;
    }
    mostPlayedArtistMap.get(
      song.master_metadata_album_artist_name
    )!.timesPlayed += 1;
    mostPlayedAlbumsMap.get(
      song.master_metadata_album_album_name
    )!.timesPlayed += 1;

    // Save day when song was played.
    const day = new Date(song.ts).getUTCDay();
    songsByDay[day] = songsByDay[day] + 1;

    // Save hour when song was played.
    const hour = new Date(song.ts).getUTCHours();
    songsByHour[hour] = songsByHour[hour] + 1;

    // Get current song day, set time to 12 AM.
    const currentDay = new Date(song.ts).setHours(0, 0, 0, 0);

    if (currentDay - previousDay === lengthOfDay) {
      if (songStreakLength === 1) {
        songStreakStartDate = previousDay;
      }
      songStreakLength += 1;
    } else if (currentDay - previousDay !== 0) {
      if (songStreakLength > 1) {
        songStreakEndDate = previousDay;
        longestSongStreak.push({
          length: songStreakLength,
          startDate: songStreakStartDate,
          endDate: songStreakEndDate,
        });
      }
      songStreakLength = 1;
    }

    previousDay = currentDay;

    // If two songs are played within 5 minutes of each other.
    if (previousSong !== null) {
      if (timeBetweenMedia(song, previousSong) < maxSongGap) {
        // Add previous song if new session.
        if (songsInSession.length === 0) {
          songsInSession.push({
            title: previousSong.master_metadata_track_name,
            artist: previousSong.master_metadata_album_artist_name,
            album: previousSong.master_metadata_album_album_name,
            timesPlayed: 0,
            timesSkipped: 0,
            id: previousSong.spotify_track_uri.substring(14),
          });
          sessionStartTime = new Date(previousSong.ts).getTime();
        }

        // Add current song.
        songsInSession.push({
          title: song.master_metadata_track_name,
          artist: song.master_metadata_album_artist_name,
          album: song.master_metadata_album_album_name,
          timesPlayed: 0,
          timesSkipped: 0,
          id: song.spotify_track_uri.substring(14),
        });
      } else {
        const sessionEndTime =
          new Date(previousSong!.ts).getTime() + previousSong!.ms_played;
        // Push session to array.
        if (
          songsInSession.length > 0 &&
          sessionEndTime - sessionStartTime > 10 * 60 * 1000
        ) {
          longestSongSession.push({
            length: sessionEndTime - sessionStartTime,
            numberOfSongs: songsInSession.length,
            date: sessionStartTime,
            songs: songsInSession,
          });
        }

        // Clear songs in session.
        songsInSession = [];
      }
    }

    previousSong = song;
  }

  // Push current session to array.
  const sessionEndTime =
    new Date(previousSong!.ts).getTime() + previousSong!.ms_played;
  if (
    songsInSession.length > 0 &&
    sessionEndTime - sessionStartTime > 10 * 60 * 1000
  ) {
    longestSongSession.push({
      length: sessionEndTime - sessionStartTime,
      numberOfSongs: songsInSession.length,
      date: sessionStartTime,
      songs: songsInSession,
    });
  }

  for (const episode of podcastListeningHistory) {
    // Initialise podcast if not present in the map.
    if (!mostPlayedPodcastsMap.has(episode.episode_show_name)) {
      mostPlayedPodcastsMap.set(episode.episode_show_name, {
        name: episode.episode_show_name,
        timesPlayed: 0,
      });
    }

    // Update count.
    mostPlayedPodcastsMap.get(episode.episode_show_name)!.timesPlayed += 1;
  }

  // Convert maps to arrays.
  const mostPlayedSongs = Array.from(mostPlayedSongsMap.values());
  const mostPlayedArtists = Array.from(mostPlayedArtistMap.values());
  const mostPlayedAlbums = Array.from(mostPlayedAlbumsMap.values());
  const mostPlayedPodcasts = Array.from(mostPlayedPodcastsMap.values());

  mostPlayedSongs.sort((a, b) => b.timesPlayed - a.timesPlayed);
  mostPlayedArtists.sort((a, b) => b.timesPlayed - a.timesPlayed);
  mostPlayedAlbums.sort((a, b) => b.timesPlayed - a.timesPlayed);
  mostPlayedPodcasts.sort((a, b) => b.timesPlayed - a.timesPlayed);
  longestSongStreak.sort((a, b) => b.length - a.length);
  longestSongSession.sort((a, b) => b.length - a.length);

  return {
    totalSongsPlayed: songListeningHistory.length,
    totalPodcastEpisodesPlayed: podcastListeningHistory.length,
    totalAudiobooksPlayed: audiobookListeningHistory.length,
    totalSongListeningTime,
    totalPodcastListeningTime,
    totalAudiobookListeningTime,
    mostPlayedSongs,
    mostPlayedArtists,
    mostPlayedAlbums,
    mostPlayedPodcasts,
    songsByDay,
    songsByHour,
    longestSongStreak,
    longestSongSession,
  };
}

function getTotalListeningTime(listeningHistory: media[]) {
  let time = 0;
  for (const item of listeningHistory) {
    time += item.ms_played;
  }
  return time;
}

function timeBetweenMedia(a: media, b: media) {
  let firstPlayedEndTime = 0;
  let lastPlayedStartTime = 0;

  if (new Date(a.ts).getTime() < new Date(b.ts).getTime()) {
    firstPlayedEndTime = new Date(a.ts).getTime() + a.ms_played;
    lastPlayedStartTime = new Date(b.ts).getTime();
  } else {
    firstPlayedEndTime = new Date(b.ts).getTime() + b.ms_played;
    lastPlayedStartTime = new Date(a.ts).getTime();
  }

  return Math.abs(firstPlayedEndTime - lastPlayedStartTime);
}
