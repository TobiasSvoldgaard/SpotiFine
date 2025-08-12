"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { statistics } from "./utils/types";
import getStats from "./utils/getStats";

import TopPodcasts from "./components/podcasts/TopPodcasts";
import PodcastsOverview from "./components/podcasts/PodcastsOverview";
import MusicOverview from "./components/music/MusicOverview";
import TopArtists from "./components/music/TopArtists";
import TopAlbums from "./components/music/TopAlbums";
import TopSongs from "./components/music/TopSongs";
import SongsByDay from "./components/music/SongsByDay";
import SongsByHour from "./components/music/SongsByHour";
import MostSkippedSongs from "./components/music/MostSkippedSongs";
import LongestSongStreak from "./components/music/LongestSongStreak";
import LongestSongSession from "./components/music/LongestSongSession";
import SongsByCountry from "./components/music/SongsByCountry";
import NeverSkipped from "./components/music/NeverSkipped";
import MusicTimePeriod from "./components/music/MusicTimePeriod";
import Spinner from "./components/Spinner";
import Copyright from "./components/Copyright";

export default function Home() {
  const [fileUploadName, setFileUploadName] = useState("");
  const [fileUploadSize, setFileUploadSize] = useState(0);
  const [userData, setUserData] = useState<File>();
  const [statistics, setStatistics] = useState<statistics | null>(null);
  const [showProceedButton, setShowProceedButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string>("");

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
    if (statistics?.mostPlayedSongs.length && selectedSongId === "") {
      setSelectedSongId(statistics.mostPlayedSongs[0].id);
    }
  }, [statistics, selectedSongId]);

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
        <div className="relative centerColumn px-[5%] pb-[25vh]">
          <header className="flex items-center w-full my-8 px-4 overflow-x-hidden">
            <Image
              className="cursor-pointer ml-auto w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24"
              onClick={() => location.reload()}
              src="/SpotiFineLogo.png"
              width={96}
              height={96}
              alt="SpotiFine logo"
              priority
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold ml-4 my-auto mr-auto">
              SpotiFine
            </h1>
          </header>
          <h1 className="text-2xl font-bold">What is SpotiFine?</h1>
          <p className="text-neutral-400">
            SpotiFine is a web app that let&apos;s you explore your Spotify
            listening habits and history. Your data is turned into simple
            breakdowns of your Spotify activity, which highlight your top
            tracks, favorite artists, and listening trends over time. Below you
            will find a full list of the insights and statistics SpotiFine
            provides.
          </p>
          <br />
          <h2 className="text-xl font-bold">Music</h2>
          <ul className="list-disc list-inside text-neutral-400">
            <li>Total songs listened to</li>
            <li>Total hours spent listening to music</li>
            <li>Most played songs</li>
            <li>Most played albums</li>
            <li>Most played artists</li>
            <li>Total songs played by day of the week</li>
            <li>Total songs played by hour of the day</li>
            <li>Longest daily listening streaks</li>
            <li>Longest uninterrupted listening sessions</li>
            <li>Most skipped songs and their skip rate</li>
            <li>Total songs played by country</li>
          </ul>
          <br />
          <h2 className="text-xl font-bold">Podcasts</h2>
          <ul className="list-disc list-inside text-neutral-400">
            <li>Total episodes listened to</li>
            <li>Total hours spent listening</li>
            <li>Most played podcast</li>
            <li>WIP</li>
          </ul>
          <br />
          <h2 className="text-xl font-bold">Audiobooks</h2>
          <ul className="list-disc list-inside text-neutral-400">
            <li>WIP</li>
          </ul>
          <br />
          <h1 className="text-2xl font-bold">
            Step 1 - Download your Spotify data
          </h1>
          <p className="text-neutral-400">
            Spotify allows you to request and download a copy of your personal
            data, which includes a detailed record of your entire listening
            history. You can request your Spotify data{" "}
            <a
              className="linkStyle"
              href="https://www.spotify.com/account/privacy/"
              target="_blank"
            >
              here
            </a>
            , and once it&apos;s ready, you will receive a download link via
            email. Make sure to select &apos;Extended Streaming History&apos;
            when requesting your data, as this is the only format compatible
            with this application.
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
              className="bg-[#0f9516] hover:bg-[#13bf1c] transition duration-100 cursor-pointer px-8 py-4 rounded-lg select-none"
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
                setStatistics(null);
                setSelectedSongId("");
                setShowProceedButton(true);
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
            If you&apos;re ready to view your statistics, click the button below
            to continue. Don&apos;t worry, your data is processed locally,
            entirely in your browser, and is never stored or shared anywhere
            else.
          </p>
          <br />
          <div className="proceedButton">
            {showProceedButton && (
              <button
                className={`${
                  fileUploadSize > 0
                    ? "bg-[#0f9516] hover:bg-[#13bf1c] transition duration-100 cursor-pointer"
                    : "bg-[#707070]"
                } px-8 py-4 rounded-lg select-none`}
                onClick={() => {
                  if (fileUploadSize > 0) {
                    handleDataSubmission();
                    setShowProceedButton(!showProceedButton);
                    setFileUploadName("");
                    setFileUploadSize(0);
                    setUserData(undefined);
                    fileUploadRef.current!.value = "";
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <MusicTimePeriod
                        firstSongTimestamp={
                          new Date(statistics.firstSongTimestamp)
                        }
                        lastSongTimestamp={
                          new Date(statistics.lastSongTimestamp)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <MusicOverview
                        totalSongsPlayed={statistics.totalSongsPlayed}
                        totalSongListeningTime={
                          statistics.totalSongListeningTime
                        }
                        mostPlayedSong={statistics.mostPlayedSongs[0]}
                      />

                      {/* TopSongs shows before TopArtists on mobile. */}
                      <div className="block md:hidden">
                        {selectedSongId && (
                          <TopSongs
                            mostPlayedSongs={statistics.mostPlayedSongs}
                            selectedSongId={selectedSongId}
                            setSelectedSongId={setSelectedSongId}
                            embedSuffix="Mobile"
                          />
                        )}
                      </div>

                      <TopArtists
                        mostPlayedArtists={statistics.mostPlayedArtists}
                      />
                    </div>

                    {/* TopSongs only visible on desktop. */}
                    <div className="hidden md:block">
                      {selectedSongId && (
                        <TopSongs
                          mostPlayedSongs={statistics.mostPlayedSongs}
                          selectedSongId={selectedSongId}
                          setSelectedSongId={setSelectedSongId}
                          embedSuffix="Desktop"
                        />
                      )}
                    </div>

                    <TopAlbums mostPlayedAlbums={statistics.mostPlayedAlbums} />

                    <SongsByDay
                      songsByDay={statistics.songsByDay}
                      totalSongsPlayed={statistics.totalSongsPlayed}
                    />

                    <div className="md:col-span-2">
                      <SongsByHour songsByHour={statistics.songsByHour} />
                    </div>
                    {statistics.longestSongStreak.length > 0 && (
                      <LongestSongStreak
                        longestSongStreak={statistics.longestSongStreak}
                      />
                    )}
                    {statistics.longestSongSession.length > 0 && (
                      <LongestSongSession
                        longestSongSession={statistics.longestSongSession}
                      />
                    )}

                    {/* MostSkippedSongs suffix depends on device. */}
                    {statistics.numberOfSkippedSongs > 0 ? (
                      <>
                        <div className="block md:hidden md:col-span-2">
                          <MostSkippedSongs
                            mostPlayedSongs={statistics.mostPlayedSongs
                              .filter(
                                (song) =>
                                  song.timesDirectlySkipped > 0 ||
                                  song.timesIndirectlySkipped > 0
                              )
                              .sort(
                                (a, b) =>
                                  b.timesDirectlySkipped +
                                  b.timesIndirectlySkipped -
                                  a.timesDirectlySkipped -
                                  a.timesIndirectlySkipped
                              )}
                            setSelectedSongId={setSelectedSongId}
                            embedSuffix="Mobile"
                          />
                        </div>

                        <div className="hidden md:block md:col-span-2">
                          <MostSkippedSongs
                            mostPlayedSongs={statistics.mostPlayedSongs
                              .filter(
                                (song) =>
                                  song.timesDirectlySkipped > 0 ||
                                  song.timesIndirectlySkipped > 0
                              )
                              .sort(
                                (a, b) =>
                                  b.timesDirectlySkipped +
                                  b.timesIndirectlySkipped -
                                  a.timesDirectlySkipped -
                                  a.timesIndirectlySkipped
                              )}
                            setSelectedSongId={setSelectedSongId}
                            embedSuffix="Desktop"
                          />
                        </div>
                      </>
                    ) : (
                      <NeverSkipped />
                    )}

                    <SongsByCountry
                      songsByCountry={statistics.songsByCountry}
                    />
                  </div>
                </>
              )}
              <br />
              {statistics.totalPodcastEpisodesPlayed > 0 && (
                <>
                  <h1 className="text-2xl font-bold">Podcasts</h1>
                  <div className="grid grid-cols-2 gap-4">
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
                className="bg-white hover:bg-neutral-300 transition duration-100 text-black cursor-pointer px-8 py-4 rounded-lg select-none"
                onClick={() => {
                  setShowProceedButton(!showProceedButton);
                  setFileUploadName("");
                  setFileUploadSize(0);
                  setUserData(undefined);
                  setStatistics(null);
                  setSelectedSongId("");
                  fileUploadRef.current!.value = "";
                  document.documentElement.scrollTop = 0;
                }}
              >
                Reset
              </button>
            )}
          </div>
          <Copyright />
        </div>
        <div className="sideColumn">
          <br />
        </div>
      </div>
    </>
  );
}
