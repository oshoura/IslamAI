import type { AppProps } from 'next/app';

import '@/styles/global.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


import { Poppins } from 'next/font/google';
// import Hotjar from '@hotjar/browser';
import { Analytics } from '@vercel/analytics/react';

// const siteId = 3600422;
// const hotjarVersion = 6;

// Hotjar.init(siteId, hotjarVersion);

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}

export default MyApp;
