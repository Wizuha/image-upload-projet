"use client";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <nav className="min-w-screen shadow-sm p-4 px-5 border-b-1 dark:bg-[#121826]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {theme === "dark" ? (
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-sm"
            >
              <img src="/logo-small.svg" alt="logo sombre" className="block" />
              <p className="font-bold ">ImageUpload</p>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-sm"
            >
              <img src="/logo-small.svg" alt="logo sombre" className="block" />
              <p className="font-bold ">ImageUpload</p>
            </Link>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
