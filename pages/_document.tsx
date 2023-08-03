import { Html, Head, Main, NextScript } from "next/document";
import Hotjar from '@hotjar/browser';

const siteId = 3600422;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>IslamAI</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
