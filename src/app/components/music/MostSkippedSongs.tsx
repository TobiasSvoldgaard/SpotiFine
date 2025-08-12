import { JSX, useState } from "react";
import { song } from "@/app/utils/types";

type Props = {
  mostPlayedSongs: song[];
  setSelectedSongId: React.Dispatch<React.SetStateAction<string>>;
  embedSuffix: string;
};

export default function MostSkippedSongs({
  mostPlayedSongs,
  setSelectedSongId,
  embedSuffix,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Most Skipped Songs</h1>
          {mostPlayedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
            <div key={index} className="flex justify-between">
              <span
                className="w-[40%] hover:underline cursor-pointer truncate "
                onClick={() => {
                  setSelectedSongId(song.id);
                  document
                    .getElementById(`spotifySongEmbed${embedSuffix}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {index + 1}. {song.title} - {song.artist}
              </span>
              <span className="w-[20%] text-center truncate">
                {song.timesDirectlySkipped + song.timesIndirectlySkipped}{" "}
                {song.timesDirectlySkipped + song.timesIndirectlySkipped === 1
                  ? "skip"
                  : "skips"}{" "}
                ({song.timesDirectlySkipped} direct /{" "}
                {song.timesIndirectlySkipped} indirect)
              </span>
              <span className="w-[40%] text-right truncate">
                {(
                  ((song.timesDirectlySkipped + song.timesIndirectlySkipped) /
                    song.timesPlayed) *
                  100
                ).toFixed(2)}
                % skip rate
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
