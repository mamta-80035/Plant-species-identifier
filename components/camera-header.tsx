"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CameraHeaderProps {
  onSwitchToUpload: () => void
}

export function CameraHeader({ onSwitchToUpload }: CameraHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black text-white">
      <Link href="/">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </Link>

      <div className="flex items-center space-x-2">
        <Image
          src="/plant-logo.png"
          alt="Plant Species Identifier"
          width={24}
          height={24}
          className="animate-pulse-slow"
        />
        <h1 className="text-lg font-semibold">Camera Capture</h1>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/20 rounded-full"
        onClick={onSwitchToUpload}
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
    </div>
  )
}
