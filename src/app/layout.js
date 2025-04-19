import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import AnimatedGradient from "./components/AnimatedGradient";
import { ClerkProvider } from "@clerk/nextjs";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  // variable: "--font-indie-flower",
  weight: "400",
});

export const metadata = {
  title: "congurence solver",
  description: "mod(m)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} relative overflow-hidden antialiased`}
      >
        <ClerkProvider>
          <Header />
          <AnimatedGradient />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
