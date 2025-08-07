import { JSX, useState } from "react";
import { streak } from "@/app/utils/types";

type Props = {
  longestSongStreak: streak[];
};

export default function LongestSongStreak({
  longestSongStreak,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfStreaksToShow, setNumberOfStreaksToShow] =
    useState<number>(10);
  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Longest Listening Streaks</h1>
          {longestSongStreak
            .slice(0, numberOfStreaksToShow)
            .map((streak, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-[70%] truncate">
                  {index + 1}.{" "}
                  {new Date(streak.startDate).toLocaleDateString("en-GB")} to{" "}
                  {new Date(streak.endDate).toLocaleDateString("en-GB")}
                </span>
                <span>{streak.length} days</span>
              </div>
            ))}
          <br />
          {longestSongStreak.length > 10 && (
            <p
              className="text-right underline cursor-pointer mt-2"
              onClick={() => {
                if (showMore) {
                  setNumberOfStreaksToShow(10);
                } else {
                  setNumberOfStreaksToShow(longestSongStreak.length);
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
