"use client";

import {HTMLAttributes, useEffect, useState} from "react";
import { cn } from "@/lib/utils"
import {UserNav} from "@/components/Navbar/UserNav";
import {Session} from "@supabase/gotrue-js";
import {supabase} from "@/auth/supabase";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import Search from "@/components/Navbar/Search";

export function Navbar({ className, ...props } : HTMLAttributes<HTMLElement> ) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, []);

  return (
    <div className="flex h-16 items-center px-4 md:mx-6">
      <nav className={cn("flex gap-4", className)} {...props}>
        <Button variant={"ghost"} size={"icon"}>
          <Menu/>
        </Button>
        <Search/>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav session={session} />
      </div>
    </div>
  )
}