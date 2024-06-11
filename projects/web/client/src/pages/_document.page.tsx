import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh">
      <Head />
      <body id="__app">
        <div id="__app-wrapper">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
