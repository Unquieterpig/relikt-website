import Router from 'next/router';
import { Button } from "@nextui-org/react";

export default function BackButton() {
    return (
        <Button color="primary" variant="shadow" onClick={() => Router.back()}>Go Back</Button>
    );
}
