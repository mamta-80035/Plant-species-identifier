import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // globals.css file is imported here
import { Footer, SiteHeader } from "@/components/shared"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plant Species Identifier - AI-Powered Plant Recognition",
  description:
    "Identify any plant species instantly using advanced AI technology. Discover detailed information about plants with just a photo.",
  icons: {
    icon: "/plant-logo.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
