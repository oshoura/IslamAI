import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

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
      </main>
    </>
  );
}

export default MyApp;
