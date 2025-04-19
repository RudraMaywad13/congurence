// src/app/components/Header.js

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-pink-500 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold">Congruence Solver</div>
      
      <nav className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-100 transition">Login</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
