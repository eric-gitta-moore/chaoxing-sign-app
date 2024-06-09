import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import type { AppProps } from "next/app";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  const clazz = cn("min-h-screen bg-background font-sans antialiased", fontSans.variable);
  return (
    <main className={clazz}>
      <Component {...pageProps} />
    </main>
  );
}
