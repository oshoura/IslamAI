import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PulsatingBackground from '@/components/pulsatingBackground';
import RevolvingText from '@/components/revolvingText';
import Lottie from 'react-lottie';
import moonLottie from '@/public/lotties/moon_lottie.json';
import swirlLottie from '@/public/lotties/swirl_lottie.json';
import planeLottie from '@/public/lotties/plane_lottie.json';

const About = () => {
  const [chatMessage, setChatMessage] = useState('');

  function lottie_settings(animation) {
    return {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
      background: 'transparent',
      style: { 'background-color': 'transparent' },
    };
  }

  const display_questions = [
    'Find me a Surah that discusses the punishment of the arrogant person',
    'Tell me a story of the prophet SAW displaying forgiveness',
    'Is it permissible to eat pigeon meat',
  ];

  const make_floating_chat = (type: string, text: string) => {
    const outer_classes = type == 'bot' ? 'justify-start' : 'justify-end';
    const inner_classes = type == 'bot' ? 'justify-start' : 'justify-end';
    return (
      <div className={'flex w-80 px-3 mb-4 ' + outer_classes}>
        <div className=" bg-white shadow-lg max-w-xs p-4 rounded-md flex flex-row justify-start pr-6">
          <img
            className=" w-7 h-7 object-fill mr-2 mt-2"
            src={type == 'bot' ? '/Islamicly logo2.png' : 'mini_user_icon.png'}
          />
          <p className="text-gray-700">{text}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Islamicly AI</title>
      </Head>
      <PulsatingBackground>
        <div className="top-0 z-40 w-full py-4 px-16 justify-between flex flex-row">
          <Link
            className="transition-transform duration-300 flex flex-row items-center"
            href="/"
          >
            <img className="w-14 h-14 object-fill" src="/Islamicly logo2.png" />
            <h1 className="text-2xl text-black '">Islamicly</h1>
          </Link>
          <button className="rounded-md border-2 border-islamicly-blue text-islamicly-blue bg-blue-100 hover:bg-blue-300  transition duration-300 ease-in-out px-4 py-2 text-sm flex flex-row items-center h-full">
            Chat with Islamicly
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pl-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
        </div>
        <section className="w-full max-w-6xl mx-auto mt-12 p-8 flex flex-row">
          <div className="flex flex-col justify-center text-center items-center space-y-6 mx-auto">
            <h1 className="text-6xl font-bold text-gray-700 max-w-3xl tracking-tight">
              Answer Any Islamic Question Instantly Using AI
            </h1>
            <RevolvingText
              textOptions={display_questions}
              onClick={(presetMessage) => setChatMessage(presetMessage)}
            />
            <div className="relative w-full">
              <input
                className=" w-full py-2 pl-4 pr-10 border border-gray-300 text-black rounded-lg focus:ring-offset-2 focus:outline-islamicly-blue placeholder:text-slate-500"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Chat With Islamicly"
              />
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-black rounded hover:bg-blue-200 transition duration-100 p-1 absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </PulsatingBackground>
      <section className="w-full mx-auto p-8 flex flex-col second-section ">
        <div className="max-w-6xl">
          <div className="h-3/4 w-full flex flex-row mb-8">
            <div className="flex flex-col justify-center items-center mx-4">
              <h2 className="text-2xl text-gray-700 font-bold ">
                Integrated Sources
              </h2>
              <span className="text-gray-500 text-center mt-4">
                Islamicly learns from the Quran, all major hadith collections,
                major books of Seerah, and scholarly opinions from the 4 major
                schools of thought to provide you the most accurate responses.
              </span>
            </div>
            <div className="flex justify-center items-center w-[65rem] blue-glow">
              <Lottie options={lottie_settings(swirlLottie)} />
            </div>
          </div>
          <div className="h-3/4 w-full flex flex-row mb-8">
            <div className="flex justify-center items-center w-[65rem]">
              <Lottie options={lottie_settings(moonLottie)} />
            </div>
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-2xl text-gray-700 font-bold ">
                Reliable Responses
              </h2>
              <span className="text-gray-500 text-center mt-4">
                Every Response from Islamicly is supported by an authentic
                source. Rest assured that any response from Islamicly will be
                backed by a verse from the quran, a hadith, or a scholarly
                opinion.
              </span>
            </div>
          </div>
          <div className="h-3/4 w-full flex flex-row mb-8">
            <div className="flex flex-col justify-center items-center mx-4">
              <h2 className="text-2xl text-gray-700 font-bold ">
                Instant Responses
              </h2>
              <span className="text-gray-500 text-center mt-4 ">
                Save yourself the time of googling and searching through links.
                Ask Islamicly the question once and using the power of AI,
                Islamicly will provide you with the most relevant response.
              </span>
            </div>
            <div className="flex justify-center items-center w-[65rem] blue-glow">
              <Lottie options={lottie_settings(planeLottie)} />
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full pb-12">
        <div className=" h-64 flex flex-col items-center justify-center ">
          <span className="gradient-text text-6xl font-bold w-128 mb-8 text-center outline-islamicly-blue outline-2">
            Try the world's first Islamic AI assistant now
          </span>
          <button className="rounded-md border-2 border-islamicly-blue text-islamicly-blue bg-blue-100 hover:bg-blue-300  transition duration-300 ease-in-out px-4 py-2 text-sm flex flex-row items-center h-full">
            Chat with Islamicly
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pl-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
};

export default About;
