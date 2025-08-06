import { JSX } from "react";

type Props = {
  songsByHour: number[];
};

export default function SongsByHour({ songsByHour }: Props): JSX.Element {
  const mostPlays = Math.max(...songsByHour);
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl px-12 py-8 overflow-hidden">
        <h1 className="text-2xl font-bold">Songs by Hour</h1>
        <br />
        <div className="flex gap-1 w-full">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex-1 flex flex-col items-center"
              style={{ minWidth: "8px", flex: "1 1 0" }}
            >
              <div className="h-50 w-full flex items-end">
                <div
                  className="w-full bg-white hover:bg-neutral-300 transition duration-100 rounded-sm"
                  title={`${songsByHour[hour]} plays`}
                  style={{
                    height: `${(songsByHour[hour] / mostPlays) * 100}%`,
                  }}
                ></div>
              </div>

              {[0, 3, 6, 9, 12, 15, 18, 21].includes(hour) && (
                <span className="mt-3 text-xs text-white text-center">
                  {
                    {
                      0: "12 AM",
                      3: "3 AM",
                      6: "6 AM",
                      9: "9 AM",
                      12: "12 PM",
                      15: "3 PM",
                      18: "6 PM",
                      21: "9 PM",
                    }[hour]
                  }{" "}
                </span>
              )}
              {/* <span className="mt-1 text-xs text-white">
                {((songsByHour[hour] / totalSongsPlayed) * 100).toFixed(2)}%
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
