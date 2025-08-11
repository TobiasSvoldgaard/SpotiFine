import { JSX } from "react";

type Props = {
  firstSongTimestamp: Date;
  lastSongTimestamp: Date;
};

export default function MusicTimePeriod({
  firstSongTimestamp,
  lastSongTimestamp,
}: Props): JSX.Element {
  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl px-9 py-6 overflow-hidden flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Time Period</h1>

        <div className="flex h-60 justify-between text-4xl font-bold text-black">
          <div className="w-[50%] my-auto flex flex-col items-center text-center select-none">
            <h1 className="text-white pb-2">From</h1>
            <div>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {firstSongTimestamp.getDate().toString().padStart(2, "0")}
              </span>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {(firstSongTimestamp.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
              </span>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {firstSongTimestamp.getFullYear()}
              </span>
            </div>
          </div>
          <div className="w-[50%] my-auto flex flex-col items-center text-center select-none">
            <h1 className="text-white pb-2">To</h1>
            <div>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {lastSongTimestamp.getDate().toString().padStart(2, "0")}
              </span>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {(lastSongTimestamp.getMonth() + 1).toString().padStart(2, "0")}
              </span>
              <span className="px-2 py-1 rounded-md mx-1 bg-white hover:bg-neutral-300 transition duration-100 cursor-pointer">
                {lastSongTimestamp.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
