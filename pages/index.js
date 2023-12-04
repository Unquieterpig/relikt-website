import { useState, useEffect } from "react";

import Metatags from "@components/Metatags";

import NextImage from "next/image";
import { useTheme } from "next-themes";

import {
  Image,
  Card,
  CardHeader,
  CardBody,
  Spacer,
  Link,
} from "@nextui-org/react";

import OGMartin from "../public/OGMartin.jpg";
import ChefMartin from "../public/ChefMartin.png";
import DoctorMartin from "../public/DoctorMartin.png";
import FireMartin from "../public/FireMartin.png";
import SpaceMartin from "../public/SpaceMartin.png";
import Moist from "../public/Moist.png";
import Schlatt from "../public/latestschlatt.png";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <>
      <Metatags
        title="Relikt - Secure Your Voice"
        description="Homepage of website"
      />
      <HomePage />
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
      <Footer />
    </>
  );
}

function Section1() {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="my-5 text-2xl font-bold text-inherit lg:text-6xl">
          The best in class audio conversion
          <span className="block">using the latest in AI.</span>
        </h1>
        <h2 className="text-xl text-inherit lg:text-3xl">
          Give a listen and see for yourself.
        </h2>
      </div>

      <Spacer y={20} />

      <div className="flex flex-rows justify-center items-start h-unit-9xl gap-2">
        <Card isFooterBlurred className="py-2">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">The Schlatt Mix</p>
            <small className="text-default-500">
              Trained on 5 minutes of audio
            </small>
            <h4 className="font-bold text-large">JSchlatt</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              isZoomed
              as={NextImage}
              alt="Card background"
              className="opacity-100 max-h-72 max-w-sm object-cover rounded-xl"
              src={Schlatt}
            />
          </CardBody>
        </Card>

        <Card isFooterBlurred className="py-2">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">The Moist Mix</p>
            <small className="text-default-500">
              Trained on 4 minutes of audio
            </small>
            <h4 className="font-bold text-large">MoistCr1tikal</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              isZoomed
              as={NextImage}
              alt="Card background"
              className="opacity-100 max-h-72 max-w-sm object-cover rounded-xl"
              src={Moist}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}

const features = [
  {
    name: "Push of a button.",
    description:
      "Simplify your interactions with instant voice-to-voice translation. Our AI-powered service captures nuances, accents, and intonations, delivering natural and authentic audio outputs.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Arctic Backups.",
    description:
      "Never lose your important voice data. Our secure cloud backups ensure your information is safe, retrievable, and protected against any unforeseen events.",
    icon: LockClosedIcon,
  },
  {
    name: "Fast.",
    description:
      "Enjoy real-time conversion speeds. Our optimized algorithms provide quick, efficient, and high-quality voice translations, saving you time and resources.",
    icon: ServerIcon,
  },
];

function Section2() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const imageSrc =
    theme === "dark" ? "/AppPlaceHolderDark.png" : "/AppPlaceHolder.png";

  return (
    <div id="features" className="overflow-hidden h-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                Voice Conversion Made Easy
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-inherit sm:text-4xl">
                A better solution
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Revolutionize your communication with our state-of-the-art AI
                voice conversion technology. Experience seamless integration
                into your daily workflow, enhancing productivity and breaking
                down language barriers — where clarity meets convenience.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline dark:text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src={imageSrc}
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
            Unlock the full potential of effortless communication with our
            straightforward pricing. No hidden fees, no complexity—just one low
            price for unlimited access to the most advanced voice conversion
            technology available.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 shadow-lg shadow-blue-600/50 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-inherit">
              Premium
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              Elevate your audio experience with our Premium plan. Designed for
              both individuals and professionals, our service provides
              exceptional quality, versatility, and ease of use.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
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
                    className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400"
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
                  One Flat Rate for All
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    $10
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">
                    USD / month
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    <div
      id="sponsor"
      className="flex flex-col justify-center items-center h-100 py-24"
    >
      <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-gray-300">
        Trusted by the world’s most innovative man
      </h2>
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              The Man
            </p>
            <h4 className="text-white font-medium text-large">
              Original Martin
            </h4>
          </CardHeader>
          <Image
            as={NextImage}
            removeWrapper
            alt="Card background"
            className="opacity-100 z-0 w-full h-full object-cover"
            src={OGMartin}
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              The Myth
            </p>
            <h4 className="text-white font-medium text-large">Chef Martin</h4>
          </CardHeader>
          <Image
            as={NextImage}
            removeWrapper
            alt="Card background"
            className="opacity-100 z-0 w-full h-full object-cover"
            src={ChefMartin}
          />
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              The Legend
            </p>
            <h4 className="text-white font-medium text-large">Doc Martin</h4>
          </CardHeader>
          <Image
            as={NextImage}
            removeWrapper
            alt="Card background"
            className="opacity-100 z-0 w-full h-full object-cover"
            src={DoctorMartin}
          />
        </Card>
        <Card className="w-full h-[300px] col-span-12 sm:col-span-5">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Breaking Boundaries
            </p>
            <h4 className="text-white font-medium text-2xl">Fireman Martin</h4>
          </CardHeader>
          <Image
            as={NextImage}
            removeWrapper
            alt="Card example background"
            className="opacity-100 z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src={FireMartin}
          />
        </Card>
        <Card className="w-full h-[300px] col-span-12 sm:col-span-7">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Pushing the limits
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Spaceman Martin
            </h4>
          </CardHeader>
          <Image
            as={NextImage}
            removeWrapper
            alt="Relaxing app background"
            className="opacity-100 z-0 w-full h-full object-cover"
            src={SpaceMartin}
          />
        </Card>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-center text-center border-t border-t-neutral-300/20 gap-2">
      <p>Made with 💗 by </p>
      <Link color="danger" href="https://github.com/Unquieterpig">
        Just Debugging, Mostly (JDM)
      </Link>
    </div>
  );
}
