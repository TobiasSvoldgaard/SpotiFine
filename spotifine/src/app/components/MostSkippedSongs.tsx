import { JSX, useState } from "react";
import { song } from "../utils/types";

type Props = {
  mostSkippedSongs: song[];
};

export default function MostSkippedSongs({
  mostSkippedSongs,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-4 overflow-hidden">
        <div className="h-100 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold">Most Skipped Songs</h1>
          {mostSkippedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
            <div key={index} className="flex justify-between">
              <span className="w-[70%] truncate">
                {index + 1}. {song.title} - {song.artist}
              </span>
              <span>
                {song.timesSkipped} {song.timesSkipped === 1 ? "skip" : "skips"}
              </span>
            </div>
          ))}
          <br />
          {mostSkippedSongs.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfSongsToShow(10);
                } else {
                  setNumberOfSongsToShow(mostSkippedSongs.length);
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
