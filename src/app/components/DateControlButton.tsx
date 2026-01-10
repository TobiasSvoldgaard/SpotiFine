import { ChevronDown, ChevronUp } from "lucide-react";
import { JSX, ButtonHTMLAttributes } from "react";
import { dateButtonType } from "../utils/types";

interface DateControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  dateControlButtontype: dateButtonType;
}

export default function DateControlButton({
  dateControlButtontype,
  ...props
}: Readonly<DateControlButtonProps>): JSX.Element {
  return (
    <button
      type="button"
      className="rounded-full hover:bg-white hover:scale-110 transition duration-100 cursor-pointer"
      {...props}
    >
      {dateControlButtontype === dateButtonType.increase ? (
        <ChevronUp></ChevronUp>
      ) : (
        <ChevronDown></ChevronDown>
      )}
    </button>
  );
}
