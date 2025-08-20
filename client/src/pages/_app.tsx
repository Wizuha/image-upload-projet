import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
