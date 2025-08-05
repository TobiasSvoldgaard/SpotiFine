import { JSX } from "react";

export default function Spinner(): JSX.Element {
  return (
    <>
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
    </>
  );
}
