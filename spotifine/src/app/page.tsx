"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { statistics } from "./utils/types";
import getStats from "./utils/getStats";
import TopPodcasts from "./components/TopPodcasts";
import PodcastsOverview from "./components/PodcastsOverview";
import MusicOverview from "./components/MusicOverview";
import TopAlbums from "./components/TopAlbums";
import TopArtists from "./components/TopArtists";
import TopSongs from "./components/TopSongs";
import SongsByDay from "./components/SongsByDay";
import SongsByHour from "./components/SongsByHour";
import MostSkippedSongs from "./components/MostSkippedSongs";
import LongestSongStreak from "./components/LongestSongStreak";
import Spinner from "./components/Spinner";

export default function Home() {
  const [fileUploadName, setFileUploadName] = useState("");
  const [fileUploadSize, setFileUploadSize] = useState(0);
  const [userData, setUserData] = useState<File>();
  const [statistics, setStatistics] = useState<statistics | null>(null);
  const [showProceedButton, setShowProceedButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleDataSubmission = async () => {
    if (fileUploadSize > 0 && userData !== undefined) {
      setLoading(true);
      try {
        setStatistics(await getStats(userData));
      } finally {
        setLoading(false);
      }
    } else {
      alert("An error has occured");
    }
  };

  useEffect(() => {
    const fileDropZone = document.getElementById("fileDropZone");

    const handleFileDrop = (e: DragEvent) => {
      e.preventDefault();

      const files = e.dataTransfer?.files;
      const file = files?.[0];

      if (!file) {
        return;
      }

      if (!file.name.toLowerCase().endsWith(".zip")) {
        alert("Forbidden file format");
        return;
      }

      setFileUploadName(file.name);
      setFileUploadSize(file.size / 1000000);

      setUserData(file);

      fileDropZone?.classList.remove("bg-[#393939]");
    };

    fileDropZone?.addEventListener("dragenter", (e) => {
      e.preventDefault();
      fileDropZone.classList.add("bg-[#393939]");
    });

    fileDropZone?.addEventListener("dragleave", (e) => {
      e.preventDefault();
      fileDropZone.classList.remove("bg-[#393939]");
    });

    fileDropZone?.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    fileDropZone?.addEventListener("drop", handleFileDrop);

    return () => {
      fileDropZone?.removeEventListener("dragover", (e) => {
        e.preventDefault();
      });
      fileDropZone?.removeEventListener("drop", handleFileDrop);
    };
  });

  return (
    <>
      <div className="row">
        <div className="sideColumn">
          <br />
        </div>
        <div className="centerColumn px-32 pb-[50vh]">
          <header className="flex item-center text-end my-8">
            <Image
              className="cursor-pointer"
              onClick={() => location.reload()}
              src="/SpotiFineLogo.png"
              width={96}
              height={96}
              alt="SpotiFine logo"
            />
            <h1 className="text-6xl font-bold ml-4 my-auto">SpotiFine</h1>
          </header>
          <h1 className="text-2xl font-bold">
            Step 1 - Download your Spotify data
          </h1>
          <p className="text-neutral-400">
            Spotify allows you to request and download a copy of your personal
            data, which includes a detailed record of your entire listening
            history. You can request your Spotify data{" "}
            <a href="https://www.spotify.com/account/privacy/">here</a>, and
            once it&apos;s ready, you will receive a download link via email.
            Make sure to select &apos;Extended Streaming History&apos; when
            requesting your data, as this is the only format compatible with
            this application.
          </p>
          <br />
          <h1 className="text-2xl font-bold">
            Step 2 - Upload your data below
          </h1>
          <p className="text-neutral-400">
            Once you&apos;ve downloaded your data, simply upload the zip file
            below.
          </p>
          <br />
          <div
            className="fileDropZone rounded-2xl border-2 border-dashed border-neutral-400"
            id="fileDropZone"
          >
            <p>Drag and drop your file here</p>
            <br />
            <p>or</p>
            <br />
            <label
              className="bg-[#0F9516] hover:bg-[#13bf1c] cursor-pointer px-8 py-4 rounded-lg select-none"
              htmlFor="fileUpload"
            >
              Choose file
            </label>
            <input
              ref={fileUploadRef}
              type="file"
              name="fileUpload"
              id="fileUpload"
              accept=".zip"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) {
                  return;
                }

                if (!file.name.toLowerCase().endsWith(".zip")) {
                  alert("Forbidden file format");
                  return;
                }

                setFileUploadName(file.name);
                setFileUploadSize(file.size / 1000000);
                setUserData(file);
              }}
            />
          </div>
          {fileUploadSize !== 0 && (
            <p>{fileUploadName + " " + fileUploadSize.toFixed(2) + " MB"}</p>
          )}
          <br />
          <h1 className="text-2xl font-bold">
            Step 3 - Explore your listening habits
          </h1>
          <p className="text-neutral-400">
            If you&apos;re ready to view your data, please click the button
            below to proceed. Don&apos;t worry, your data is processed locally,
            entirely in your browser, and is never stored or shared anywhere
            else.
          </p>
          <br />
          <div className="proceedButton">
            {showProceedButton && (
              <button
                className={`${
                  fileUploadSize !== 0
                    ? "bg-[#0F9516] hover:bg-[#13bf1c] cursor-pointer"
                    : "bg-[#707070]"
                } px-8 py-4 rounded-lg select-none`}
                onClick={() => {
                  if (fileUploadSize > 0) {
                    handleDataSubmission();
                    setShowProceedButton(!showProceedButton);
                  }
                }}
              >
                View data
              </button>
            )}
          </div>
          {loading && <Spinner />}
          {statistics !== null && (
            <>
              {statistics.totalSongsPlayed > 0 && (
                <>
                  <h1 className="text-2xl font-bold">Music</h1>
                  <div className="grid grid-cols-2 gap-4">
                    <MusicOverview
                      totalSongsPlayed={statistics.totalSongsPlayed}
                      totalSongListeningTime={statistics.totalSongListeningTime}
                      mostPlayedSong={statistics.mostPlayedSongs[0]}
                    />
                    <TopSongs mostPlayedSongs={statistics.mostPlayedSongs} />
                    <TopArtists
                      mostPlayedArtists={statistics.mostPlayedArtists}
                    />
                    <TopAlbums mostPlayedAlbums={statistics.mostPlayedAlbums} />
                    <SongsByDay
                      songsByDay={statistics.songsByDay}
                      totalSongsPlayed={statistics.totalSongsPlayed}
                    />
                    <SongsByHour songsByHour={statistics.songsByHour} />

                    <LongestSongStreak
                      longestSongStreak={statistics.longestSongStreak}
                    />
                  </div>
                  <MostSkippedSongs
                    mostPlayedSongs={statistics.mostPlayedSongs
                      .filter((song) => song.timesSkipped > 0)
                      .sort((a, b) => b.timesSkipped - a.timesSkipped)}
                  />
                </>
              )}
              <br />
              {statistics.totalPodcastEpisodesPlayed > 0 && (
                <>
                  <h1 className="text-2xl font-bold">Podcasts</h1>
                  <div className="flex gap-4">
                    <PodcastsOverview
                      totalPodcastEpisodesPlayed={
                        statistics.totalPodcastEpisodesPlayed
                      }
                      totalPodcastListeningTime={
                        statistics.totalPodcastListeningTime
                      }
                      mostPlayedPodcastName={
                        statistics.mostPlayedPodcasts[0].name
                      }
                    />
                    <TopPodcasts
                      mostPlayedPodcasts={statistics.mostPlayedPodcasts}
                    />
                  </div>
                </>
              )}
              <br />
              {statistics.totalAudiobooksPlayed > 0 && (
                <>
                  <h1 className="text-2xl font-bold">Audiobooks</h1>
                </>
              )}
            </>
          )}
          <div className="proceedButton">
            {!showProceedButton && !loading && (
              <button
                className="bg-[#d92e2e] hover:bg-[#991d1d] cursor-pointer px-8 py-4 rounded-lg select-none"
                onClick={() => {
                  setShowProceedButton(!showProceedButton);
                  setFileUploadName("");
                  setFileUploadSize(0);
                  setUserData(undefined);
                  setStatistics(null);
                  fileUploadRef.current!.value = "";
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="sideColumn">
          <br />
        </div>
      </div>
    </>
  );
}
