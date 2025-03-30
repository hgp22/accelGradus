"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, LogOut, Database, FileOutput, BarChart3, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">accelGrading</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Logout</div>
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link href="/question-banks">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Question Banks
                </CardTitle>
                <CardDescription>Manage your subject-specific question collections</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  View, create, and edit your question banks. Organize questions by subject and category for easy test
                  creation.
                </p>
                <Button className="mt-4">View Question Banks</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/test-generation">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileOutput className="h-5 w-5 text-primary" />
                  Test Generation
                </CardTitle>
                <CardDescription>Create multiple versions of tests with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Generate multiple test versions with customizable parameters. Preview test blueprints before
                  finalizing.
                </p>
                <Button className="mt-4">Generate Tests</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                New Question Bank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => router.push("/question-banks/new")}>
                Create
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileOutput className="h-5 w-5 text-primary" />
                Quick Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => router.push("/test-generation")}>
                Generate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => router.push("/analytics")}>
                View
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container flex justify-between items-center">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} accelGrading</div>
          <div className="flex gap-4">
          </div>
        </div>
      </footer>
    </div>
  )
}

