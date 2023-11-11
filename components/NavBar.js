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
import { useState } from "react";

import { ReliktLogo } from "@components/ReliktLogo";
import ThemeSwitcher from "@components/ThemeSwitcher";

export default function NavBar() {
  const { user, username } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Features", "Pricing", "Integration"];

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
          <ReliktLogo />
          <p className="font-bold text-inherit">RELIKT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <ReliktLogo />
          <p className="font-bold text-inherit">RELIKT</p>
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
          <Link color="foreground" href="#">
            Integration
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
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/generate"
                variant="shadow"
              >
                Generate
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user.name}
                    size="md"
                    src={user.photoURL}
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
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
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
