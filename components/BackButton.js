import Router from 'next/router';

export default function BackButton() {
    return (
        <button className="btn-blue" onClick={() => Router.back()}>Go Back</button>
    );
}
