"use client";

import {HTMLAttributes, useEffect, useState} from "react";
import { cn } from "@/lib/utils"
import Link from "next/link";
import {UserNav} from "@/components/Navbar/UserNav";
import {Session} from "@supabase/gotrue-js";
import {supabase} from "@/auth/supabase";
import {Search} from "@/components/Navbar/Search";

export function Navbar({ className, ...props } : HTMLAttributes<HTMLElement> ) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, []);

  return (
    <div className="flex h-16 items-center px-4 md:mx-6">
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Home
        </Link>
        <Link href="/trending" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Trending
        </Link>
        <Link href="/popular" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Popular
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav session={session} />
      </div>
    </div>
  )
}