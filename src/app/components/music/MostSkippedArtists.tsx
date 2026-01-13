import { artist } from "@/app/utils/types";
import { JSX, useState } from "react";

type Props = {
  mostSkippedArtists: artist[];
};

export default function MostSkippedArtists({
  mostSkippedArtists,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfArtistsToShow, setNumberOfArtistsToShow] =
    useState<number>(10);
  return (
    <div className="w-full h-100 bg-[#0d0d0d] rounded-[14px] px-3 overflow-hidden">
      <div className="h-100 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Most Skipped Artists</h1>
        {mostSkippedArtists
          .slice(0, numberOfArtistsToShow)
          .map((artist, index) => (
            <div key={index} className="text-neutral-400 flex justify-between">
              <span className="w-[40%] truncate">{artist.name}</span>
              <span
                className="w-[20%] text-center truncate"
                title={`${artist.timesDirectlySkipped} direct skips / ${artist.timesIndirectlySkipped} indirect skips`}
              >
                {artist.timesDirectlySkipped + artist.timesIndirectlySkipped}{" "}
                {artist.timesDirectlySkipped + artist.timesIndirectlySkipped ===
                1
                  ? "skip"
                  : "skips"}{" "}
                ({artist.timesDirectlySkipped} / {artist.timesIndirectlySkipped}
                )
              </span>
              <span className="w-[40%] text-right truncate">
                {(
                  ((artist.timesDirectlySkipped +
                    artist.timesIndirectlySkipped) /
                    artist.timesPlayed) *
                  100
                ).toFixed(2)}
                % skip rate
              </span>
            </div>
          ))}
        <br />
        {mostSkippedArtists.length > 10 && (
          <p
            className="text-right underline cursor-pointer mt-2"
            onClick={() => {
              if (showMore) {
                setNumberOfArtistsToShow(10);
              } else {
                setNumberOfArtistsToShow(mostSkippedArtists.length);
              }
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show less" : "Show more"}
          </p>
        )}
      </div>
    </div>
  );
}
