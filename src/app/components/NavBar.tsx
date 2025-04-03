"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Heart, Bell, User } from "lucide-react";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  // Function to determine the icon color based on the current route
  const getIconColor = (path: string) => (pathname === path ? "#3C70FF" : "#818898");

  return (
    <div className="fixed bottom-0 w-full h-[96px] bg-white">
      <div className="flex flex-row items-center justify-between w-full mt-6 px-6">
        <Link href="/">
          <House color={getIconColor("/")} />
        </Link>
        <Link href="/favorites">
          <Heart color={getIconColor("/favorites")} />
        </Link>
        <Link href="/notifications">
          <Bell color={getIconColor("/notifications")} />
        </Link>
        <Link href="/profile">
          <User color={getIconColor("/profile")} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
