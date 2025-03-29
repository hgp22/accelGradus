import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SidebarCardProps {
  title: string
  children: ReactNode
  className?: string
}

// A reusable sidebar card component for consistent styling
export default function SidebarCard({ title, children, className = "" }: SidebarCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

