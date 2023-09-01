import {HTMLAttributes} from "react";
import { cn } from "@/lib/utils"
import {UserNav} from "@/components/Navbar/UserNav";
import Search from "@/components/Navbar/Search";
import Sidebar from "@/components/Navbar/Sidebar";

export function Navbar({ className, ...props } : HTMLAttributes<HTMLElement> ) {
  return (
    <nav className={cn("flex items-center w-screen gap-5 justify-between py-2 px-5", className)} {...props}>
      <div><Sidebar/></div>
      <div className={"max-w-xl"}><Search/></div>
      <div className={"flex items-center gap-2"}>
        <UserNav/>
      </div>
    </nav>
  )
}