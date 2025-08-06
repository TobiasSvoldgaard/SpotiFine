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
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl px-12 py-8 overflow-hidden">
        <h1 className="text-2xl font-bold">Songs by Day</h1>
        <br />
        <div className="flex gap-4 w-full">
          {days.map((day) => (
            <div
              key={day}
              className="flex-1 flex flex-col items-center"
              style={{ minWidth: "8px", flex: "1 1 0" }}
            >
              {/* Fixed height container for bar */}
              <div className="h-50 w-full flex items-end">
                <div
                  className="w-full bg-white hover:bg-neutral-300 transition duration-100 rounded-lg"
                  title={`${songsByDay[day]} plays`}
                  style={{
                    height: `${(songsByDay[day] / mostPlays) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="mt-1 text-m text-white">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
              </span>
              <span className="text-sm text-white">
                {((songsByDay[day] / totalSongsPlayed) * 100).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
