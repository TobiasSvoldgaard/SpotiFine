import { JSX, useState } from "react";
import DateControlButton from "../DateControlButton";
import { dateButtonType } from "@/app/utils/types";

type Props = {
  firstSongTimestamp: Date;
  lastSongTimestamp: Date;
};

export default function MusicTimePeriod({
  firstSongTimestamp,
  lastSongTimestamp,
}: Props): JSX.Element {
  const [startDate, setStartDate] = useState<Date>(
    new Date(firstSongTimestamp.setHours(0, 0, 0, 0))
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(lastSongTimestamp.setHours(23, 59, 59, 999))
  );

  function handleIncreaseDay(target: "start" | "end") {
    if (target === "start") {
      const newStartDate = addDay(startDate);
      if (newStartDate.getTime() <= endDate.getTime()) {
        setStartDate(newStartDate);
      }
    }

    if (target === "end") {
      setEndDate(addDay(endDate));
    }
  }

  function handleDecreaseDay(target: "start" | "end") {
    if (target === "start") {
      setStartDate(subtractDay(startDate));
    }

    if (target === "end") {
      const newEndDate = subtractDay(endDate);
      if (newEndDate.getTime() >= startDate.getTime()) {
        setEndDate(newEndDate);
      }
    }
  }

  function handleIncreaseMonth(target: "start" | "end") {
    if (target === "start") {
      const newStartDate = addMonth(startDate);
      if (newStartDate.getTime() <= endDate.getTime()) {
        setStartDate(newStartDate);
      }
    }

    if (target === "end") {
      setEndDate(addMonth(endDate));
    }
  }

  function handleDecreaseMonth(target: "start" | "end") {
    if (target === "start") {
      setStartDate(subtractMonth(startDate));
    }

    if (target === "end") {
      const newEndDate = subtractMonth(endDate);
      if (newEndDate.getTime() >= startDate.getTime()) {
        setEndDate(newEndDate);
      }
    }
  }

  function handleIncreaseYear(target: "start" | "end") {
    if (target === "start") {
      const newStartDate = addYear(startDate);
      if (newStartDate.getTime() <= endDate.getTime()) {
        setStartDate(newStartDate);
      }
    }

    if (target === "end") {
      setEndDate(addYear(endDate));
    }
  }

  function handleDecreaseYear(target: "start" | "end") {
    if (target === "start") {
      setStartDate(subtractYear(startDate));
    }

    if (target === "end") {
      const newEndDate = subtractYear(endDate);
      if (newEndDate.getTime() >= startDate.getTime()) {
        setEndDate(newEndDate);
      }
    }
  }

  return (
    <>
      <div className="w-[100%] h-100 bg-[#0f9516] rounded-2xl px-9 py-6 overflow-hidden flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Time Period</h1>

        <div className="flex h-60 justify-between text-2xl font-bold text-black">
          <h1 className="text-white pb-2">From </h1>

          <div className="w-[50%] my-auto gap-2 grid grid-cols-3 place-items-center text-center select-none">
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseMonth("start")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseDay("start")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseYear("start")}
            ></DateControlButton>
            <span className="rounded-md px-2 bg-white">
              {startDate.toLocaleString("default", { month: "long" })}
            </span>
            <span className="rounded-md px-2 bg-white">
              {startDate.getDate().toString().padStart(2, "0")}
            </span>
            <span className="rounded-md px-2 bg-white">
              {startDate.getFullYear()}
            </span>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseMonth("start")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseDay("start")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseYear("start")}
            ></DateControlButton>
          </div>

          <h1 className="text-white pb-2">To</h1>
          <div className="w-[50%] my-auto gap-2 grid grid-cols-3 place-items-center text-center select-none">
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseMonth("end")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseDay("end")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.increase}
              onClick={() => handleIncreaseYear("end")}
            ></DateControlButton>
            <span className="rounded-md px-2 bg-white">
              {endDate.toLocaleString("default", { month: "long" })}
            </span>
            <span className="rounded-md px-2 bg-white">
              {endDate.getDate().toString().padStart(2, "0")}
            </span>
            <span className="rounded-md px-2 bg-white">
              {endDate.getFullYear()}
            </span>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseMonth("end")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseDay("end")}
            ></DateControlButton>
            <DateControlButton
              dateControlButtontype={dateButtonType.decrease}
              onClick={() => handleDecreaseYear("end")}
            ></DateControlButton>
          </div>
        </div>
      </div>
    </>
  );
}

function addDay(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d;
}

function subtractDay(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d;
}

function addMonth(date: Date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

function subtractMonth(date: Date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() - 1);
  return d;
}

function addYear(date: Date) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

function subtractYear(date: Date) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() - 1);
  return d;
}
