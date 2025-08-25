"use client";
import { ModeToggle } from "../ui/mode-toggle";

export default function Navbar() {
  return (
    <nav className="min-w-screen shadow-sm p-4 px-5 border-b-1 dark:bg-[#121826]">
      <div className="flex items-center justify-between">
        <div>
          <img src="/logo.svg" alt="logo clair" className="block dark:hidden" />
          <img
            src="/logo-small.svg"
            alt="logo sombre"
            className="hidden dark:block"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
