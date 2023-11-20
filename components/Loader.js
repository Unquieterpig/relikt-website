import { Spinner } from "@nextui-org/react";

export default function Loader({ show }) {
  return show ? <Spinner /> : null;
}
