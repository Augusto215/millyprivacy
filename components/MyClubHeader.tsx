"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Globe, Bell } from "lucide-react";

interface MyClubHeaderProps {
  logoImg?: string;
}

export default function MyClubHeader({ logoImg = "/img/myclubfans.png" }: MyClubHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: userData } = await supabaseBrowser.auth.getUser();
      setIsLoggedIn(!!userData.user);
    };
    checkAuth();

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-15 bg-white border-b border-gray-200 flex items-center justify-center px-4">
      {/* Left spacer for icons */}
      <div className="absolute left-4 flex items-center gap-3">
        {isLoggedIn && (
          <>
            <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-600">
              <Globe className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </>
        )}
      </div>

      {/* Center logo */}
      <Link href="/myclub" className="flex items-center">
        <div className="h-12 w-auto relative flex items-center">
          <Image
            src={logoImg}
            alt="MyClubFans"
            width={320}
            height={80}
            className="h-30 w-auto object-contain"
            priority
          />
        </div>
      </Link>

      {/* Right spacer */}
      <div className="absolute right-4 w-10" />
    </header>
  );
}
