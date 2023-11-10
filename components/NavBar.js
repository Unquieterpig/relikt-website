import Link from 'next/link';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Image } from "@nextui-org/react";

import { useContext } from 'react';
import { UserContext } from '@lib/context';

export default function NavBar(){
  return (
    <Navbar>
      <NavbarBrand>
        <Image width={100} alt="Relikt Logo" src="/relikt-logo.png" />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>Home</NavbarItem>
        <NavbarItem>Generate</NavbarItem>
        <NavbarItem>About</NavbarItem>
        <NavbarItem>Contact</NavbarItem>
        <NavbarMenuToggle />
        <NavbarMenu placement="end">
          <NavbarMenuItem>Profile</NavbarMenuItem>
          <NavbarMenuItem>Settings</NavbarMenuItem>
          <NavbarMenuItem>Logout</NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
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