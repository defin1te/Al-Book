// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-[#1e3a8a] p-4 text-white flex items-center fixed top-0 left-0 z-50">
      <h1 className="text-4xl font-bold">Al-Book</h1>
      <nav className="flex space-x-4 ml-8">
        <Link href="/" passHref>
          <p className="text-lg font-medium px-4 py-2 rounded-lg text-white bg-[#3b82f6] hover:bg-[#2563eb] cursor-pointer">
            Books
          </p>
        </Link>
        <Link href="/chat" passHref>
          <p className="text-lg font-medium px-4 py-2 rounded-lg text-white bg-[#3b82f6] hover:bg-[#2563eb] cursor-pointer">
            Chat
          </p>
        </Link>
        {session ? (
          <p className="text-lg font-medium px-4 py-2 cursor-pointer" onClick={() => signOut()}>
            Sign out
          </p>
        ) : (
          <p className="text-lg font-medium px-4 py-2 cursor-pointer" onClick={() => signIn('google')}>
            
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
