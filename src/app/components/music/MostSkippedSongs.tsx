import { JSX, useState } from "react";
import { song } from "@/app/utils/types";

type Props = {
  mostPlayedSongs: song[];
};

export default function MostSkippedSongs({
  mostPlayedSongs,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-4 overflow-hidden mt-4">
        <div className="h-100 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold">Most Skipped Songs</h1>
          {mostPlayedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
            <div key={index} className="flex justify-between">
              <span className="w-[40%] truncate">
                {index + 1}. {song.title} - {song.artist}
              </span>
              <span className="w-[20%] text-center">
                {song.timesSkipped} {song.timesSkipped === 1 ? "skip" : "skips"}
              </span>
              <span className="w-[40%] text-right">
                {((song.timesSkipped / song.timesPlayed) * 100).toFixed(2)}%
                skip rate
              </span>
            </div>
          ))}
          <br />
          {mostPlayedSongs.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfSongsToShow(10);
                } else {
                  setNumberOfSongsToShow(mostPlayedSongs.length);
                }
                setShowMore(!showMore);
              }}
            >
              {showMore ? "Show less" : "Show more"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
