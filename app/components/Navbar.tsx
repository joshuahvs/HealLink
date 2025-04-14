// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  Heart,
  Users,
  Building2,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");

  // Dummy auth state
  const isAuthenticated = true;
  const dummyUser = {
    name: "Regina Aruan",
    email: "reginaaruan@gmail.com",
    image: null,
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen("");
  };

  const toggleDropdown = (name: string) => {
    setIsDropdownOpen(isDropdownOpen === name ? "" : name);
  };

  const navLinks = [
    {
      name: "Tentang Kami",
      href: "/about",
    },
    {
      name: "Proyek",
      href: "/projects",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Program",
      items: [
        { name: "Donasi", href: "/donations", icon: Heart },
        { name: "Relawan", href: "/volunteers", icon: Users },
        { name: "Kemitraan", href: "/company", icon: Building2 },
      ],
    },
    {
      name: "Kontak",
      href: "/contact",
    },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/HealLink-blue.svg"
              alt="HealLink Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.items ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center text-gray-600 hover:text-gray-900 gap-1"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          isDropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen === link.name && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu">
                          {link.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeDropdown}
                            >
                              {item.icon && (
                                <item.icon size={16} className="mr-2" />
                              )}
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <button className="relative p-2 rounded-full hover:bg-gray-100">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("user")}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                    </div>
                    <span className="font-medium">{dummyUser.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        isDropdownOpen === "user" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen === "user" && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        <Link
                          href="/dashboard/user"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          Pengaturan
                        </Link>
                        <Link
                          href="/auth/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          Keluar
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.items ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          isDropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen === link.name && (
                      <div className="pl-4">
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => {
                              closeDropdown();
                              setIsMenuOpen(false);
                            }}
                          >
                            {item.icon && (
                              <item.icon size={16} className="mr-2" />
                            )}
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {dummyUser.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {dummyUser.email}
                  </div>
                </div>
                <button className="ml-auto relative p-2 rounded-full hover:bg-gray-100">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/dashboard/user"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile/settings"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pengaturan
                </Link>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Keluar
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4 space-y-2">
              <Link
                href="/auth/login"
                className="block w-full text-center px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="block w-full text-center px-4 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
