"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import LayoutWrapper from "../page-components/layout-wrapper"
import SidebarCard from "../page-components/sidebar-card"
// Example of a page using the reusable components
export default function ExamplePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <LayoutWrapper
      title="Example Page"
      description="This page demonstrates how to use the reusable components"
      action={{
        label: "Create New",
        onClick: () => console.log("Create new clicked"),
      }}
    >
      {/* Optional Search/Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          Filter
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Main Content</CardTitle>
              <CardDescription>Using reusable components for consistent layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>This example shows how to use the reusable layout components to create consistent pages quickly.</p>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Content Item</h3>
                <p className="text-sm text-muted-foreground">
                  You can focus on your page-specific content without worrying about the layout structure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <SidebarCard title="Information">
            <div className="space-y-1">
              <p className="text-sm font-medium">Using Components</p>
              <p className="text-muted-foreground">
                The sidebar card component helps maintain consistent styling across pages.
              </p>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          </SidebarCard>

          <SidebarCard title="Help & Support">
            <p className="text-sm text-muted-foreground">Need help with this feature? Check out our documentation.</p>
            <Button variant="outline" className="w-full">
              View Documentation
            </Button>
          </SidebarCard>
        </div>
      </div>
    </LayoutWrapper>
  )
}

