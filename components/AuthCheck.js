import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";

// Component's children only show to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <Link href="/enter" className="text-blue-600">
          You must be signed in
        </Link>
      );
}
