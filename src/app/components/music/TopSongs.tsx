import { JSX, useState } from "react";
import { song } from "@/app/utils/types";

type Props = {
  mostPlayedSongs: song[];
  selectedSongId: string;
  setSelectedSongId: React.Dispatch<React.SetStateAction<string>>;
};

export default function TopSongs({
  mostPlayedSongs,
  selectedSongId,
  setSelectedSongId,
}: Props): JSX.Element {
  const [showMore, setShowMore] = useState(false);
  const [numberOfSongsToShow, setNumberOfSongsToShow] = useState<number>(10);

  return (
    <>
      <div className="w-[100%] bg-[#0f9516] rounded-2xl px-3 overflow-hidden">
        <div id="spotifySongEmbed" className="h-100 p-6 mb-4">
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
        <div className="h-100 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Top Songs</h1>
          {mostPlayedSongs.slice(0, numberOfSongsToShow).map((song, index) => (
            <div key={index} className="flex justify-between">
              <span
                className="w-[70%] hover:underline cursor-pointer truncate"
                onClick={() => {
                  setSelectedSongId(song.id);
                }}
              >
                <a href="#spotifySongEmbed">
                  {index + 1}. {song.title} - {song.artist}
                </a>
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
    </>
  );
}
