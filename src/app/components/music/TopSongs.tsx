import { JSX, useState } from "react";
import { song } from "@/app/utils/types";

type Props = {
  mostPlayedSongs: song[];
  selectedSongId: string;
  setSelectedSongId: React.Dispatch<React.SetStateAction<string>>;
  embedSuffix: string;
};

export default function TopSongs({
  mostPlayedSongs,
  selectedSongId,
  setSelectedSongId,
  embedSuffix,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);

  return (
    <div className="w-full h-204 bg-[#0d0d0d] rounded-[14px] px-3 overflow-y-auto">
      <div id={`spotifySongEmbed${embedSuffix}`} className="h-100 p-6 mb-4">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${selectedSongId}`}
          width="100%"
          height="352"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div className="h-98 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Top Songs</h1>
        {mostPlayedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
          <div key={index} className="text-neutral-400 flex justify-between">
            <span
              className="w-[70%] hover:underline cursor-pointer truncate"
              onClick={() => {
                setSelectedSongId(song.id);
                document
                  .getElementById(`spotifySongEmbed${embedSuffix}`)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {index + 1}. {song.title} - {song.artist}
            </span>
            <span className="truncate">
              {song.timesPlayed} {song.timesPlayed === 1 ? "play" : "plays"}
            </span>
          </div>
        ))}
        <br />
        {mostPlayedSongs.length > 10 && (
          <p
            className="text-right underline cursor-pointer mt-2"
            onClick={() => {
              if (showMore) {
                setNumberOfSongsToShow(10);
              } else {
                setNumberOfSongsToShow(mostPlayedSongs.length);
              }
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show less" : "Show more"}
          </p>
        )}
      </div>
    </div>
  );
}
