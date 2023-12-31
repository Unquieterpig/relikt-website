import BackButton from "@components/BackButton";

export default function Custom404() {
  return (
    <>
      <br />

      <center>
        <h1 className="text-4xl text-bold">404 - Page not found</h1>
        <br />
        <iframe
          src="https://giphy.com/embed/qjgm2rlJ6wep88aitp"
          width="480"
          height="362"
          allowFullScreen
        ></iframe>

        <br />
        <BackButton />
      </center>
    </>
  );
}
