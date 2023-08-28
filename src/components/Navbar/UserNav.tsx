"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Switch} from "@/components/ui/switch";
import {useTheme} from "next-themes";
import {Session} from "@supabase/gotrue-js";
import {supabase} from "@/auth/supabase";
import {LogIn} from "lucide-react";

interface AuthSessionProp {
  session: Session | null
}

export function UserNav({ session } : AuthSessionProp) {
  const { theme, setTheme } = useTheme();

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.user_metadata.full_name}/>
            <AvatarFallback>{session.user.user_metadata.full_name.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.user_metadata.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user.user_metadata.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Bookmark</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>
            Dark Mode
            <DropdownMenuShortcut className={"opacity-100"}>
              <Switch
                id={"theme"}
                checked={theme === "dark"}
                onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
              />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button onClick={async () => await supabase.auth.signInWithOAuth({ provider: "google" })}>
        <LogIn className="mr-2 h-4 w-4"/> Google
      </Button>
      {theme && (
        <Switch
          checked={theme === "dark"}
          onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
        />
      )}
    </>
  )
}