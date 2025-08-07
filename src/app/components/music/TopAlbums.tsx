import { JSX, useState } from "react";
import { album } from "@/app/utils/types";

type Props = {
  mostPlayedAlbums: album[];
};

export default function TopAlbums({ mostPlayedAlbums }: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfAlbumsToShow, setNumberOfAlbumsToShow] = useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Top Albums</h1>
          {mostPlayedAlbums
            .slice(0, numberOfAlbumsToShow)
            .map((album, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-[70%] truncate">
                  {index + 1}. {album.title}
                </span>
                <span>
                  {album.timesPlayed}{" "}
                  {album.timesPlayed === 1 ? "play" : "plays"}
                </span>
              </div>
            ))}
          <br />
          {mostPlayedAlbums.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfAlbumsToShow(10);
                } else {
                  setNumberOfAlbumsToShow(mostPlayedAlbums.length);
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
