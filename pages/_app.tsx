import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Hotjar from '@hotjar/browser';
import { Analytics } from '@vercel/analytics/react';

const siteId = 3600422;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

const font = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-poppins',
    subsets: ['latin'],
    style: ['normal', 'italic'],
    display: 'swap'
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={font.className}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}

export default MyApp;
