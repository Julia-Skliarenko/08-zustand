import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "App for managing your notes efficiently",
  openGraph: {
    title: "NoteHub",
    description: "App for managing your notes efficiently",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={roboto.variable} 
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh", margin: 0 }}
      >
        <Providers>
          <Header />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}