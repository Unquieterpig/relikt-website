import Navbar from '@components/NavBarHome';
import BackButton from '@components/BackButton';

export default function Custom404() {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <br />
        <center>
          <h1>404 - Page not found</h1>
          <iframe
            src="https://giphy.com/embed/H7wajFPnZGdRWaQeu0"
            width="480"
            height="362"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <BackButton />
        
        </center>
      </>
    );
}