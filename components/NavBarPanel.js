import SignOutButton from "@components/SignOutButton"
import Link from "next/link"

export default function NavBarPanel() {
    return (
        <nav className="navbar-vert">
            <div className="navbar-vert-top">
              <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">RELIKT</button>
                    </Link>
                </li>
                <li><Link href="/generate">Generate</Link></li>
                <li><Link href="/browse">Browse</Link></li>
                <li><Link href="/subscribe">Subscription</Link></li>
              </ul>
            </div>

            <div className="navbar-vert-bottom">
              <ul>
                <li>
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
            </div>
        </nav>
    );
  }