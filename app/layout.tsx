import { Metadata } from "next";
import "./globals.css";
import Footer from "./components/layout/Footer";
import ClientInit from "./components/ClientInit";
import { Toaster } from "react-hot-toast";
import SplashProvider from "./components/layout/SplashProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://flichire.com/"),
  title: {
    template: "%s",
    default: "Flic",
  },
  description:
    "The ultimate hiring platform for video editors, creators & Clients can find top-tier editors and creators with a single swipe.",
  keywords: [
    "flic",
    "short videos",
    "social media",
    "Where to hire a professional video editor",
    "How to find the best freelance video editor",
    "Best platform to hire video editors online",
    "Hire a video editor for social media content",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Flic",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo/Flic_black.png" }],
    apple: [{ url: "/logo/Flic_black.png" }],
  },
  verification: {
    google: "zBsu5vTiV3pkoH97D_hdMChQSJ9fkO5Ho_8JwoGP9ms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="zBsu5vTiV3pkoH97D_hdMChQSJ9fkO5Ho_8JwoGP9ms"
        />
      </head>
      <body
        className="h-full flex flex-col scroll-smooth"
        suppressHydrationWarning
      >
        <SplashProvider>
          <ClientInit />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </SplashProvider>
      </body>
    </html>
  );
}
