import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import EntranceRitual from "@/components/EntranceRitual";
import WalletProvider from "@/components/WalletProvider";

const bitroad = localFont({
  src: "./fonts/Bitroad-Italic.woff2",
  variable: "--font-bitroad",
  display: "swap",
});

const bitroadMono = localFont({
  src: "./fonts/BitroadMono-RegularMono.woff2",
  variable: "--font-bitroad-mono",
  display: "swap",
});

const bodySans = DM_Sans({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MERIDIAN LOST",
  description: "We gather where the lines converge. The meridian was never lost — it was hidden.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◉</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bitroad.variable} ${bitroadMono.variable} ${bodySans.variable}`}>
      <body className="scanlines">
        <div className="noise-overlay" />
        <div className="vignette" />
        <CustomCursor />
        <EntranceRitual />
        <WalletProvider>
          <Navigation />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
