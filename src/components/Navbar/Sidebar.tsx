import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Film, Menu, Tv} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"md:w-[300px] w-[250px]"}>
        <SheetHeader>
          <SheetTitle className={"text-center"}>CHROMA</SheetTitle>
        </SheetHeader>
        <Separator className={"my-4"}/>
        <div className={"grid grid-cols-1"}>
          <Link href={"/movies"} className={"flex gap-8 p-4 rounded-md hover:text-primary hover:bg-muted"}>
            <span><Film/></span>
            Movies
          </Link>
          <Link href={"/shows"} className={"flex gap-8 p-4 rounded-md hover:text-primary hover:bg-muted"}>
            <span><Tv/></span>
            TV Shows
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}