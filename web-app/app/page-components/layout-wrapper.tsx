"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut } from "lucide-react"

interface LayoutWrapperProps {
  children: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

// A reusable layout wrapper component that includes the standard header, footer,
// and page title section to maintain consistency across pages
export default function LayoutWrapper({ children, title, description, action }: LayoutWrapperProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TestGenius</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Page Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {action && <Button onClick={action.onClick}>{action.label}</Button>}
        </div>

        {/* Page Content */}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container flex justify-between items-center">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} TestGenius</div>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
