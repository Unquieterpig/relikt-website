import { Spinner } from "@nextui-org/react";

export default function Loader({ show, progress }) {
  return show ? <Spinner label={progress} /> : null;
}
