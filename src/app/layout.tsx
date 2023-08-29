import './globals.css'
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata : Metadata = {
  title: "Home"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar/>
          {children}
        </ThemeProvider>
        <Analytics mode={"production"} />
      </body>
    </html>
  )
}
