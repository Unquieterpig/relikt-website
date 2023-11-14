import { useContext } from 'react';
import { UserContext } from '@lib/context';

// Component's children only show to logged-in users
export default function DeleteAccountButton(props) {
    const { username } = useContext(UserContext);
  
    return username ? props.children : props.fallback || <Link href="/index">You must be signed in</Link>;
  }