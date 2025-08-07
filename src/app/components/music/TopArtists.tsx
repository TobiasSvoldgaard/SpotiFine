import { JSX, useState } from "react";
import { artist } from "@/app/utils/types";

type Props = {
  mostPlayedArtists: artist[];
};

export default function TopAlbums({ mostPlayedArtists }: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfArtistsToShow, setNumberOfArtistsToShow] =
    useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Top Artists</h1>
          {mostPlayedArtists
            .slice(0, numberOfArtistsToShow)
            .map((artist, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-[70%] truncate">
                  {index + 1}. {artist.name}
                </span>
                <span>
                  {artist.timesPlayed}{" "}
                  {artist.timesPlayed === 1 ? "play" : "plays"}
                </span>
              </div>
            ))}
          <br />
          {mostPlayedArtists.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfArtistsToShow(10);
                } else {
                  setNumberOfArtistsToShow(mostPlayedArtists.length);
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
