import Link from 'next/link';

import Navbar from '@components/NavBarHome';

export default function Custom404() {
    return (
        <main>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>404 - Page not found</h1>
            <iframe
                src="https://giphy.com/embed/H7wajFPnZGdRWaQeu0"
                width="480"
                height="362"
                frameBorder="0"
                allowFullScreen
                ></iframe>
                <Link href="/">
                    <button className='btn-blue'>Go home</button>
                </Link>
        </main>
    );
}