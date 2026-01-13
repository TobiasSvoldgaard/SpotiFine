import { JSX } from "react";

type Props = {
  songsByDay: number[];
  totalSongsPlayed: number;
};

export default function SongsByDay({
  songsByDay,
  totalSongsPlayed,
}: Props): JSX.Element {
  const mostPlays = Math.max(...songsByDay);
  const days = [1, 2, 3, 4, 5, 6, 0];

  return (
    <div className="w-full h-100 bg-[#0d0d0d] rounded-[14px] px-9 py-6 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Songs by Day</h1>
      <div className="flex gap-1 w-full">
        {days.map((day) => (
          <div
            key={day}
            className="flex-1 flex flex-col items-center"
            style={{ minWidth: "8px", flex: "1 1 0" }}
          >
            <div className="h-60 w-full flex items-end">
              <div
                className="w-full bg-neutral-400 hover:bg-white transition duration-100 rounded-lg"
                title={`${songsByDay[day]} plays`}
                style={{
                  height: `${(songsByDay[day] / mostPlays) * 100}%`,
                }}
              ></div>
            </div>
            <span className="mt-1 text-m text-neutral-400">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
            </span>
            <span className="text-sm text-neutral-400">
              {((songsByDay[day] / totalSongsPlayed) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
