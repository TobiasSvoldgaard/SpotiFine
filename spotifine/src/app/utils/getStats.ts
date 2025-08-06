import JSZip from "jszip";
import {
  album,
  artist,
  media,
  podcast,
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

            // Classify media based URI type.
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
  };
}

function getTotalListeningTime(listeningHistory: media[]) {
  let time = 0;
  for (const item of listeningHistory) {
    time += item.ms_played;
  }
  return time;
}
