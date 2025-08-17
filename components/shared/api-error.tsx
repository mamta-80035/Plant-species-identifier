"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface ApiErrorProps {
  error: string
  onRetry?: () => void
}

export function ApiError({ error, onRetry }: ApiErrorProps) {
  return (
    <Alert className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-lg rounded-xl">
      <XCircle className="h-5 w-5 text-red-600" />
      <AlertDescription>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Something went wrong</h4>
            <p className="text-red-700">{error}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {onRetry && (
              <Button
                size="sm"
                onClick={onRetry}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            <Link href="/">
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
