export type userStats = {
  totalSongsListenedTo: number;
};

export type media = {
  ts: string;
  platform: string;
  ms_played: number;
  conn_country: string;
  ip_addr: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
  episode_name: string;
  episode_show_name: string;
  spotify_episode_uri: string;
  audiobook_title: string;
  audiobook_uri: string;
  audiobook_chapter_uri: string;
  audiobook_chapter_title: string;
  reason_start: string;
  reason_end: string;
  shuffle: boolean;
  skipped: boolean;
  offline: boolean;
  offline_timestamp: number;
  incognito_mode: boolean;
};

export type song = {
  title: string;
  artist: string;
  album: string;
  timesPlayed: number;
  timesSkipped: number;
};

export type artist = {
  name: string;
  timesPlayed: number;
};

export type album = {
  title: string;
  artist: string;
  timesPlayed: number;
};

export type podcast = {
  name: string;
  timesPlayed: number;
};

export type streak = {
  length: number;
  startDate: number;
  endDate: number;
};

export type session = {
  length: number;
  numberOfSongs: number;
  date: number;
  songs: song[];
};

export type statistics = {
  totalSongsPlayed: number;
  totalPodcastEpisodesPlayed: number;
  totalAudiobooksPlayed: number;
  totalSongListeningTime: number;
  totalPodcastListeningTime: number;
  totalAudiobookListeningTime: number;
  mostPlayedSongs: song[];
  mostPlayedArtists: artist[];
  mostPlayedAlbums: album[];
  mostPlayedPodcasts: podcast[];
  songsByDay: number[];
  songsByHour: number[];
  longestSongStreak: streak[];
  longestSongSession: session[];
};
