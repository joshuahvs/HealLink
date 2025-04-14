// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/HealLink-blue.svg"
            alt="HealLink Logo"
            width={140}
            height={40}
            className="h-7 w-auto"
          />
        </Link>
      </div>

      <button
        className="md:hidden text-gray-600 hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}
      >
        <Link href="/about" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Tentang Kami
        </Link>
        <Link href="/projects" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Proyek
        </Link>
        <Link href="/impact" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Dampak
        </Link>
        <Link href="/blog" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Blog
        </Link>
        <Link href="/donations" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Donasi
        </Link>
        <Link href="/volunteer" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Relawan
        </Link>
        <Link href="/partner" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Kemitraan
        </Link>
        <Link href="/contact" className="block md:inline text-gray-600 hover:text-blue-600 py-2 md:py-0">
          Kontak
        </Link>
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <button className="block md:inline w-full md:w-auto px-4 py-2 text-blue-600 hover:text-blue-800 mt-2 md:mt-0">
                Login
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="block md:inline w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2 md:mt-0">
                Daftar
              </button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <button className="block md:inline w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2 md:mt-0">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}