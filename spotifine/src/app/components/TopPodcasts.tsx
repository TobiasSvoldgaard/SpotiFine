import { JSX, useState } from "react";
import { podcast } from "../utils/types";

type Props = {
  mostPlayedPodcasts: podcast[];
};

export default function TopPodcasts({
  mostPlayedPodcasts,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfPodcastsToShow, setNumberOfPodcastsToShow] =
    useState<number>(10);
  return (
    <>
      <div className="w-[50%] h-100 bg-[#0f9516] rounded-2xl p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold">Top Podcasts</h1>
        {mostPlayedPodcasts
          .slice(0, numberOfPodcastsToShow)
          .map((podcast, index) => (
            <div key={index} className="flex justify-between">
              <span className="w-[70%] truncate">
                {index + 1}. {podcast.name}
              </span>
              <span>
                {podcast.timesPlayed}{" "}
                {podcast.timesPlayed === 1 ? "episode" : "episodes"} played
              </span>
            </div>
          ))}
        <br />
        {mostPlayedPodcasts.length > 10 && (
          <p
            className="text-right underline cursor-pointer mt-2"
            onClick={() => {
              if (showMore) {
                setNumberOfPodcastsToShow(10);
              } else {
                setNumberOfPodcastsToShow(mostPlayedPodcasts.length);
              }
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show less" : "Show more"}
          </p>
        )}
      </div>
    </>
  );
}
