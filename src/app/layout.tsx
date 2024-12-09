import { Providers } from "@/app/providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "GSMST CS Club",
  description: "GSMST Computer Science Club official website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="h-full">
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto p-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
