import { JSX } from "react";

export default function TopSongs(): JSX.Element {
  return (
    <>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center text-neutral-400 pr-2 pb-2">
        <p>&copy; Tobias Svoldgaard</p>
        <a href="https://github.com/TobiasSvoldgaard/SpotiFine" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 98 96"
            width="18"
            height="18"
            fill="#a1a1a1"
            className="github-icon ml-2 my-auto cursor-pointer text-neutral-400"
          >
            <path
              d="M49 .6C21.9.6 0 22.5 0 49.6c0 21.7 14.1 40.1 33.7 46.6 
        2.5.5 3.4-1.1 3.4-2.4 0-1.2 0-5.2-.1-9.4-13.7 3-16.6-5.9-16.6-5.9-2.3-5.8-5.6-7.3-5.6-7.3
        -4.6-3.2.3-3.1.3-3.1 5.1.4 7.8 5.2 7.8 5.2 4.5 7.8 11.7 5.6 14.6 4.3.5-3.2 1.7-5.6 3.1-6.8
        -10.9-1.2-22.3-5.4-22.3-23.9 0-5.3 1.9-9.7 5.1-13.1-.5-1.3-2.2-6.6.5-13.8 0 0 4.1-1.3
        13.4 5.1a46.4 46.4 0 0 1 24.4 0c9.3-6.4 13.4-5.1 13.4-5.1 2.7 7.2 1 12.5.5 13.8 3.2 3.4
        5.1 7.8 5.1 13.1 0 18.5-11.5 22.6-22.4 23.8 1.7 1.4 3.2 4.2 3.2 8.5 0 6.1-.1 11-.1 12.5
        0 1.3.9 2.9 3.4 2.4A49.4 49.4 0 0 0 98 49.6C98 22.5 76.1.6 49 .6z"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
