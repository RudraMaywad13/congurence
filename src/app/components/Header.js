// components/Header.js
'use client';

import Link from 'next/link';
import { Kanit } from 'next/font/google';


const kanit = Kanit({
  subsets: ['latin'],
  weight: '800',
});
export default function Header() {
  return (
    <header className={`flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md shadow-md text-white gap-4 md:gap-0 ${kanit.className}`}>
      <div className="text-3xl font-extrabold tracking-wide text-indigo-300 hover:text-cyan-300 transition duration-300">
        <Link href="/">🧠 Congruence Solver</Link>
      </div>

      <nav className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-shadow-lg text-lg  font-semibold">
        <Link href="./solver" className="hover:text-rose-300 transition">
          Solver
        </Link>
        <Link href="./rules" className="hover:text-rose-300 transition">
          Divisibility Rules
        </Link>
        

        

        
      </nav>
    </header>
  );
}
