export default function Home() {
  return (
    <>
      <div className="row">
        <div className="sideColumn">
          <br />
        </div>
        <div className="centerColumn px-32">
          <h1 className="text-2xl font-bold">
            Step 1 - Download your Spotify data
          </h1>
          <p className="text-neutral-400">
            Spotify allows you to request and download a copy of your personal
            data, which includes a detailed record of your entire listening
            history. You can request your Spotify data{" "}
            <a href="https://www.spotify.com/account/privacy/">here</a>, and
            once it&apos;s ready, you will receive a download link via email.
          </p>
          <br />
          <h1 className="text-2xl font-bold">
            Step 2 - Upload your data below
          </h1>
          <p className="text-neutral-400">
            Once you&apos;ve downloaded your data, simply upload the folder
            below.
          </p>
          <br />
          <div className="fileDropZone rounded-2xl border-2 border-dashed border-neutral-400">
            <p>Drag and drop your file here</p>
            <br />
            <p>or</p>
            <br />
            <label
              className="bg-[#0F9516] hover:bg-[#13bf1c] cursor-pointer px-8 py-4 rounded-lg"
              htmlFor="fileUpload"
            >
              Choose file
            </label>
            <input
              type="file"
              name="fileUpload"
              id="fileUpload"
              accept=".zip"
            />
          </div>
          <br />
          <h1 className="text-2xl font-bold">
            Step 3 - Explore your listening habits
          </h1>
          <p>
            If you&apos;re ready to view your data, please click the button
            below to proceed. Don&apos;t worry, your data is processed locally,
            and entirely in your browser, and is never stored or shared anywhere
            else.
          </p>
        </div>
        <div className="sideColumn">
          <br />
        </div>
      </div>
    </>
  );
}
