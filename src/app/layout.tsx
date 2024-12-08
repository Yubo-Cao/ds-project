import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/app/providers"; // a file that wraps MUI theme, if you do so
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GSMST CS Club",
  description: "GSMST Computer Science Club official website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
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
