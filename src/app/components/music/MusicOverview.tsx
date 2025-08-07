import { JSX } from "react";
import { song } from "@/app/utils/types";

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
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl p-12 text-center text-2xl font-bold flex flex-col items-center justify-center overflow-hidden">
        <h1>You&apos;ve listened to {totalSongsPlayed} songs</h1>
        <br />
        <h1>
          You&apos;ve spent {(totalSongListeningTime / 3600000).toFixed(2)}{" "}
          hours listening to music
        </h1>
        <br />
        <h1>
          Your most played song is {mostPlayedSong.title} by{" "}
          {mostPlayedSong.artist} with {mostPlayedSong.timesPlayed} plays
        </h1>
      </div>
    </>
  );
}
