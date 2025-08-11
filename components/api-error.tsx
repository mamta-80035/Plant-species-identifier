"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { XCircle, Settings } from "lucide-react"
import Link from "next/link"

interface ApiErrorProps {
  error: string
  onRetry?: () => void
}

export function ApiError({ error, onRetry }: ApiErrorProps) {
  const isApiKeyError = error.includes("api key") || error.includes("401")

  return (
    <Alert className="border-red-200 bg-red-50">
      <XCircle className="h-4 w-4 text-red-600" />
      <AlertDescription>
        <div className="space-y-3">
          <p className="text-red-800">{error}</p>

          {isApiKeyError && (
            <div className="space-y-2">
              <p className="text-sm text-red-700">
                This appears to be an API key issue. Please check your configuration.
              </p>
              <div className="flex gap-2">
                <Link href="/setup">
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300 bg-transparent">
                    <Settings className="h-3 w-3 mr-1" />
                    Setup Guide
                  </Button>
                </Link>
                {onRetry && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onRetry}
                    className="text-red-700 border-red-300 bg-transparent"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}

          {!isApiKeyError && onRetry && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="text-red-700 border-red-300 bg-transparent"
            >
              Try Again
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
