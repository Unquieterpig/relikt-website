import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Loader from '@components/Loader'
import Navbar from '@components/NavBar'

import toast from 'react-hot-toast'

import { UserContext } from '@lib/context'

export default function Home(){
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}

function HomePage() {

  return (
    <div className="bg-relikt snap-y snap-mandatory overflow-y-scroll h-screen">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

function Section1() {
  return (
    <div className="snap-start">
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl font-bold text-white">RELIKT</h1>
        <p className="text-2xl text-white">The best way to create a website.</p>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="flex flex-col justify-center items-center h-screen snap-start">
      <h1 className="text-6xl font-bold text-white">RELIKT</h1>
      <p className="text-2xl text-white">The best way to create a website.</p>
    </div>
  );
}

function Section3() {
  return (
    <div className="flex flex-col justify-center items-center h-screen snap-start">
      <h1 className="text-6xl font-bold text-white">RELIKT</h1>
      <p className="text-2xl text-white">The best way to create a website.</p>
    </div>
  );
}