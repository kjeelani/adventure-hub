import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'DnD Adventure Hub',
  description: 'Adventuring Guild\'s Session Management System',
}

export default function Home() {
  return (
    <div>Hi</div>
  );
}
