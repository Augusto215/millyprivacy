"use client";

import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between bg-white px-4">
      {/* Logo */}
      <a
  href="/"
  className="font-display text-[20px] font-extrabold tracking-[-0.08em] text-black"
>
  privacy<span className="text-[#f59b32]">.</span>
</a>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black">
          <Bell className="h-4.5 w-4.5" />
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full bg-gradient-to-br from-[#e89c30]/40 to-[#f5f5f5]" />
        </div>
      </div>
    </header>
  );
}
