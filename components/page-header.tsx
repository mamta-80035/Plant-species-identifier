"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  rightContent?: React.ReactNode
}

export function PageHeader({ title, subtitle, showBackButton = true, rightContent }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white w-full">
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-between max-w-none">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}
            <div className="flex items-center space-x-3">
              <Image
                src="/plant-logo.png"
                alt="Plant Species Identifier"
                width={40}
                height={40}
                className="animate-pulse-slow"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                {subtitle && <p className="text-green-100 mt-1">{subtitle}</p>}
              </div>
            </div>
          </div>
          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    </div>
  )
}
