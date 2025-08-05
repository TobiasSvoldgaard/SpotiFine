import { JSX, useState } from "react";
import { song } from "../utils/types";

type Props = {
  mostPlayedSongs: song[];
};

export default function TopSongs({ mostPlayedSongs }: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);
  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl p-8 overflow-y-auto text-overflow">
        <h1 className="text-2xl font-bold">Top Songs</h1>
        {mostPlayedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
          <div key={index} className="flex justify-between">
            <span className="w-[70%] truncate">
              {index + 1}. {song.title} - {song.artist}
            </span>
            <span>
              {song.timesPlayed} {song.timesPlayed === 1 ? "play" : "plays"}
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
    </>
  );
}
