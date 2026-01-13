import { session } from "@/app/utils/types";
import { JSX, useState } from "react";

type Props = {
  longestSongSession: session[];
};

export default function LongestSongSession({
  longestSongSession,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSessionsToShow, setNumberOfSessionsToShow] =
    useState<number>(10);
  return (
    <div className="w-full h-100 bg-[#0d0d0d] rounded-[14px] px-3 overflow-hidden">
      <div className="h-100 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Longest Listening Sessions</h1>
        {longestSongSession
          .slice(0, numberOfSessionsToShow)
          .map((session, index) => (
            <div key={index} className="text-neutral-400 flex justify-between">
              <span className="w-[40%] truncate">
                {index + 1}.{" "}
                {new Date(session.date).toLocaleDateString("en-GB")}
              </span>
              <span className="w-[20%] truncate text-center">
                {session.numberOfSongs}{" "}
                {session.numberOfSongs > 1 ? "songs" : "song"}
              </span>
              <span className="w-[40%] truncate text-right">
                {session.length / (1000 * 60 * 60) > 1
                  ? Math.floor(session.length / (1000 * 60 * 60)) + "h "
                  : ""}
                {Math.floor(session.length / (1000 * 60)) % 60}m{" "}
                {Math.floor(session.length / 1000) % 60}s
              </span>
            </div>
          ))}
        <br />
        {longestSongSession.length > 10 && (
          <p
            className="text-right underline cursor-pointer mt-2"
            onClick={() => {
              if (showMore) {
                setNumberOfSessionsToShow(10);
              } else {
                setNumberOfSessionsToShow(longestSongSession.length);
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
