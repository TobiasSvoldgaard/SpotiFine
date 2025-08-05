import { JSX } from "react";

type Props = {
  totalPodcastEpisodesPlayed: number;
  totalPodcastListeningTime: number;
  mostPlayedPodcastName: string;
};

export default function PodcastsOverview({
  totalPodcastEpisodesPlayed,
  totalPodcastListeningTime,
  mostPlayedPodcastName,
}: Props): JSX.Element {
  return (
    <>
      <div className="w-[50%] h-100 bg-[#0f9516] rounded-2xl p-12 text-center text-2xl font-bold flex flex-col items-center justify-center">
        <h1>
          You&apos;ve listened to {totalPodcastEpisodesPlayed} podcast episodes
        </h1>
        <br />
        <h1>
          You&apos;ve spent {(totalPodcastListeningTime / 3600000).toFixed(2)}{" "}
          hours listening
        </h1>
        <br />
        <h1>{mostPlayedPodcastName} is your most played podcast</h1>
      </div>
    </>
  );
}
