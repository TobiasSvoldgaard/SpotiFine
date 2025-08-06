import { JSX } from "react";
import { song } from "../utils/types";

type Props = {
  totalSongsPlayed: number;
  totalSongListeningTime: number;
  mostPlayedSong: song;
};

export default function MusicOverview({
  totalSongsPlayed,
  totalSongListeningTime,
  mostPlayedSong,
}: Props): JSX.Element {
  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl p-12 text-center text-2xl font-bold flex flex-col items-center justify-center">
        <h1>You&apos;ve listened to {totalSongsPlayed} songs</h1>
        <br />
        <h1>
          You&apos;ve spent {(totalSongListeningTime / 3600000).toFixed(2)}{" "}
          hours listening to music
        </h1>
        <br />
        <h1>
          Your most played song is {mostPlayedSong.title} by{" "}
          {mostPlayedSong.artist} with {mostPlayedSong.timesPlayed} plays. One
          more can&apos;t hurt, right?
        </h1>
        <br />
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${mostPlayedSong.id}`}
          width="100%"
          height="80"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </>
  );
}
