import './globals.css'
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import { type Metadata } from "next";

export const metadata : Metadata = {
  title: "Home"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
