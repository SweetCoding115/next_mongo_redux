'use client'

// import { Metadata } from "next";
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react';

import { Providers } from "@/redux/provider";

// let title = "AI Interior Designer";
// let description = "Upload a photo of your room and let our AI do the magic.";
// let ogimage = "https://roomgpt-demo.vercel.app/og-image.png";
// let sitename = "www.improvementai.com";

// export const metadata: Metadata = {
//   title,
//   description,
//   icons: {
//     icon: "/favicon.png",
//   },
//   openGraph: {
//     images: [ogimage],
//     title,
//     description,
//     url: "https://roomgpt-demo.vercel.app",
//     siteName: sitename,
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     images: [ogimage],
//     title,
//     description,
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}