"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, LogOut, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewQuestionBankPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newBank, setNewBank] = useState({
    name: "",
    description: "",
    categories: [] as string[],
  })
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory.trim() && !newBank.categories.includes(newCategory.trim())) {
      setNewBank({
        ...newBank,
        categories: [...newBank.categories, newCategory.trim()],
      })
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setNewBank({
      ...newBank,
      categories: newBank.categories.filter((c) => c !== category),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/question-banks")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1 container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/question-banks")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Question Banks
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create New Question Bank</CardTitle>
              <CardDescription>
                Create a new question bank to organize your questions by subject or topic.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Question Bank Name</Label>
                  <Input
                    id="bank-name"
                    placeholder="e.g., Calculus I, Physics Mechanics"
                    value={newBank.name}
                    onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-description">Description</Label>
                  <Textarea
                    id="bank-description"
                    placeholder="Describe the content and purpose of this question bank"
                    value={newBank.description}
                    onChange={(e) => setNewBank({ ...newBank, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newBank.categories.map((category) => (
                      <Badge key={category} variant="outline" className="flex items-center gap-1">
                        {category}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddCategory()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddCategory} disabled={!newCategory.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Categories help organize questions within your bank (e.g., Limits, Derivatives, Integrals)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/question-banks")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !newBank.name.trim()}>
                  {isSubmitting ? "Creating..." : "Create Question Bank"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

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

