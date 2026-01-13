import { JSX, useState } from "react";
import { album } from "@/app/utils/types";

type Props = {
  mostPlayedAlbums: album[];
};

export default function TopAlbums({ mostPlayedAlbums }: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfAlbumsToShow, setNumberOfAlbumsToShow] = useState<number>(10);
  return (
    <div className="w-full h-100 bg-[#0d0d0d] rounded-[14px] px-3 overflow-hidden">
      <div className="h-100 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Top Albums</h1>
        {mostPlayedAlbums.slice(0, numberOfAlbumsToShow).map((album, index) => (
          <div key={index} className="text-neutral-400 flex justify-between">
            <span className="w-[70%] truncate">
              {index + 1}. {album.title}
            </span>
            <span className="truncate">
              {album.timesPlayed} {album.timesPlayed === 1 ? "play" : "plays"}
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
  );
}
