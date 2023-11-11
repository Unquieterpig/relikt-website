import Head from 'next/head'
import Link from 'next/link'
import NextImage from "next/image";

import { Image } from '@nextui-org/react'

import OGMartin from "../public/OGMartin.jpg"
import ChefMartin from "../public/ChefMartin.png";
import DoctorMartin from "../public/DoctorMartin.png";
import FireMartin from "../public/FireMartin.png";
import SpaceMartin from "../public/SpaceMartin.png";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

export default function Home(){
  return (
    <>
      <HomePage/>
    </>
  );
}

function HomePage() {

  return (
      <>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </>
  );
}

function Section1() {
  return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl font-bold text-inherit">
          Listen to what we produce
        </h1>
        <p className="text-2xl text-inherit">
          The best way to create a website.
        </p>
      </div>
  );
}

const features = [
  {
    name: "Push of a button.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Arctic Backups.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Fast.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];

function Section2() {
  return (
    <div id="features" className="overflow-hidden h-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
                Voice Conversion Made Easy
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-inherit sm:text-4xl">
                A better solution
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline dark:text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}

const includedFeatures = [
  "Faster audio processing",
  "Unlimited audio length",
  "Unlimited custom models",
  "Supports us 💗",
];

function Section3() {
  return (
    <div id="pricing" className="h-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-inherit sm:text-4xl">
            One Simple Price
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-inherit">
              Premium
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditiis repellendus etur quidem
              assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100 dark:bg-gray-400" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 dark:bg-neutral-950 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600 dark:text-gray-300">
                  Pay one price forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    $10
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">
                    USD per month
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Cancel anytime. No refunds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="h-screen py-24 sm:py-32 flex justify-center items-center">
      <div className="mx-auto px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-gray-300">
          Trusted by the world’s most innovative man
        </h2>
        <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 max-w-7xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
          <Image
            as={NextImage}
            className="opacity-100 col-span-2 max-h-full w-full object-contain lg:col-span-1"
            src={OGMartin}
            alt="Russell Martin"
          />
          <Image
            as={NextImage}
            className="opacity-100 col-span-2 max-h-full w-full object-contain lg:col-span-1"
            src={ChefMartin}
            alt="Chef Martin"
          />
          <Image
            as={NextImage}
            className="opacity-100 col-span-2 max-h-full w-full object-contain lg:col-span-1"
            src={DoctorMartin}
            alt="Doc Martin"
          />
          <Image
            as={NextImage}
            className="opacity-100 col-span-2 max-h-full w-full object-contain sm:col-start-2 lg:col-span-1"
            src={FireMartin}
            alt="Fireman Martin"
          />
          <Image
            as={NextImage}
            className="opacity-100 col-span-2 col-start-2 object-contain sm:col-start-auto lg:col-span-1"
            src={SpaceMartin}
            alt="Space Martin"
          />
        </div>
      </div>
    </div>
  );



}