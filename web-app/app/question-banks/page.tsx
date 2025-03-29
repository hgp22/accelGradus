"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, LogOut, Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock data for question banks
const mockQuestionBanks = [
  {
    id: 1,
    name: "Calculus I",
    description: "First-year calculus questions covering limits, derivatives, and integrals",
    questionCount: 78,
    categories: ["Limits", "Derivatives", "Integrals", "Applications"],
    lastUpdated: "2023-11-15",
  },
  {
    id: 2,
    name: "Linear Algebra",
    description: "Questions on vectors, matrices, linear transformations, and eigenvalues",
    questionCount: 64,
    categories: ["Vectors", "Matrices", "Eigenvalues", "Linear Systems"],
    lastUpdated: "2023-10-28",
  },
  {
    id: 3,
    name: "Statistics 101",
    description: "Introductory statistics covering probability, distributions, and hypothesis testing",
    questionCount: 92,
    categories: ["Probability", "Distributions", "Hypothesis Testing", "Regression"],
    lastUpdated: "2023-11-02",
  },
  {
    id: 4,
    name: "Physics Mechanics",
    description: "Questions on Newtonian mechanics, forces, and motion",
    questionCount: 56,
    categories: ["Forces", "Motion", "Energy", "Momentum"],
    lastUpdated: "2023-09-18",
  },
]

export default function QuestionBanksPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [questionBanks, setQuestionBanks] = useState(mockQuestionBanks)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bankToDelete, setBankToDelete] = useState<number | null>(null)

  const filteredBanks = questionBanks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteBank = () => {
    if (bankToDelete !== null) {
      setQuestionBanks(questionBanks.filter((bank) => bank.id !== bankToDelete))
      setDeleteDialogOpen(false)
      setBankToDelete(null)
    }
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Question Banks</h1>
            <p className="text-muted-foreground">Manage your subject-specific question collections</p>
          </div>
          <Button onClick={() => router.push("/question-banks/new")} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Question Bank
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search question banks..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Banks</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
            <TabsTrigger value="largest">Largest Banks</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredBanks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredBanks.map((bank) => (
                  <Card key={bank.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{bank.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/question-banks/${bank.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setBankToDelete(bank.id)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{bank.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bank.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bank.questionCount} questions • Last updated {new Date(bank.lastUpdated).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex justify-between">
                      <Button variant="outline" onClick={() => router.push(`/question-banks/${bank.id}`)}>
                        View Questions
                      </Button>
                      <Button onClick={() => router.push(`/test-generation?bankId=${bank.id}`)}>Create Test</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No question banks found matching your search.</p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredBanks
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 4)
                .map((bank) => (
                  <Card key={bank.id}>
                    <CardHeader>
                      <CardTitle>{bank.name}</CardTitle>
                      <CardDescription>{bank.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bank.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bank.questionCount} questions • Last updated {new Date(bank.lastUpdated).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => router.push(`/question-banks/${bank.id}`)}>
                        View
                      </Button>
                      <Button onClick={() => router.push(`/test-generation?bankId=${bank.id}`)}>Create Test</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="largest" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredBanks
                .sort((a, b) => b.questionCount - a.questionCount)
                .slice(0, 4)
                .map((bank) => (
                  <Card key={bank.id}>
                    <CardHeader>
                      <CardTitle>{bank.name}</CardTitle>
                      <CardDescription>{bank.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bank.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bank.questionCount} questions • Last updated {new Date(bank.lastUpdated).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => router.push(`/question-banks/${bank.id}`)}>
                        View
                      </Button>
                      <Button onClick={() => router.push(`/test-generation?bankId=${bank.id}`)}>Create Test</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question Bank</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question bank? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBank}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

