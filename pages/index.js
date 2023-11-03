import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Loader from '@components/Loader'
import Navbar from '@components/NavBarHome'
import SignOutButton from '@components/SignOutButton'

import toast from 'react-hot-toast'

export default function Home(){
  return(
    <>
      <Navbar />
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => toast.success('Hello toast!')}>Toast Me</button>

      <SignOutButton />
      <Loader show />
    </div>
    
    </>
  )
}