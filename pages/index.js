import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Loader from '@components/Loader'
import Navbar from '@components/NavBarHome'

import toast from 'react-hot-toast'

import { UserContext } from '@lib/context'

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
      <HomePage />

    </div>
    
    </>
  )
}

function HomePage() {

  return (
    <h1> Work in Progress</h1>
  );
}