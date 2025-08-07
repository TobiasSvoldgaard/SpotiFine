import { country } from "@/app/utils/types";
import { JSX, useState } from "react";

type Props = {
  songsByCountry: country[];
};

export default function SongsByCountry({ songsByCountry }: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfCountriesToShow, setNumberOfCountriesToShow] =
    useState<number>(10);
  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Songs by Country</h1>
          {songsByCountry
            .slice(0, numberOfCountriesToShow)
            .map((country, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-[70%] truncate">
                  {index + 1}. {country.name}
                </span>
                <span className="truncate">
                  {country.timesPlayed}{" "}
                  {country.timesPlayed === 1 ? "play" : "plays"}
                </span>
              </div>
            ))}
          <br />
          {songsByCountry.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfCountriesToShow(10);
                } else {
                  setNumberOfCountriesToShow(songsByCountry.length);
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
