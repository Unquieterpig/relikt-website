import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Loader from '@components/Loader'
import Navbar from '@components/NavBarHome'

import toast from 'react-hot-toast'

export default function Home(){
  return(
    <>
      <Navbar />
    <div>
      <button onClick={() => toast.success('Hello toast!')}>Toast Me</button>

      <Loader show />
    </div>
    
    </>
  )
}