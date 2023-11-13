import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

import { useContext } from "react";
import { UserContext } from "@lib/context";
import { useState, useEffect } from "react";

import { ReliktLogo } from "@components/ReliktLogo";
import ThemeSwitcher from "@components/ThemeSwitcher";

import { auth } from '@lib/firebase';
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {

    // Update the current path when the route changes
    const handleRouteChange = () => {
      setCurrentPath(router.pathname);
      console.log("Current path is: " + currentPath);
    };

    // Listen for route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

  }, [router]);

  const isOnPanelPage = currentPath.startsWith("panel/");

  const menuItems = isOnPanelPage
  ? ["Generate", "Browse", "Subscription"]
  : ["Features", "Pricing", "Integration"];

  const handleSignOut = async () => {
    await auth.signOut();
    router.replace('/');
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/">
            <ReliktLogo />
            <p className="font-bold text-inherit">RELIKT</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link color="foreground" href="/">
            <ReliktLogo />
            <p className="font-bold text-inherit">RELIKT</p>
          </Link>
        </NavbarBrand>

        <NavbarItem>
          <Link color="foreground" href="/#features">
            Features
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/#pricing">
            Pricing
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/#sponsor">
            Sponsors
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        {/* user is not signed-in or has no username */}
        {!username && (
          <NavbarItem>
            <Button as={Link} color="primary" href="/enter" variant="shadow">
              Login
            </Button>
          </NavbarItem>
        )}

        {/* user is signed-in and has username */}
        {username && (
          <>
          {!isOnPanelPage && (
          <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/panel"
                variant="shadow"
              >
                Generate
              </Button>
            </NavbarItem>
            )}

            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user?.name || "John Doe"}
                    size="md"
                    src={user?.photoURL || "/OGMartin.png"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-2"
                    href={username}
                  >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">@{username}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem showDivider key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={handleSignOut}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color="foreground" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

// Top navbar OLD
// export default function NavBar() {
//     const { user, username } = useContext(UserContext);

//   return (
//     <nav className="navbar">
//       <ul>
//         <li>
//           <Link legacyBehavior href="/">
//             <button className="btn-logo">RELIKT</button>
//           </Link>
//         </li>

//         {/* user is signed-in and has username */}
//         {username && (
//           <>
//             <li className="push-left">
//               <Link legacyBehavior href="/generate">
//                 <button className="btn-blue">Generate</button>
//               </Link>
//             </li>
//             <li>
//               <Link legacyBehavior href={username}>
//                 <img src={user.photoURL} />
//               </Link>
//             </li>
//           </>
//         )}

//         {/* user is not signed OR has not created username */}
//         {!username && (
//           <li>
//             <Link legacyBehavior href="/enter">
//               <button className="btn-blue">Log in</button>
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }
