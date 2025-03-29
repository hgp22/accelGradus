"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  LogOut,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Save,
  FileText,
} from "lucide-react"
import Link from "next/link"

// Mock data for a specific question bank
const mockQuestionBank = {
  id: 1,
  name: "Calculus I",
  description: "First-year calculus questions covering limits, derivatives, and integrals",
  questionCount: 78,
  categories: ["Limits", "Derivatives", "Integrals", "Applications"],
  lastUpdated: "2023-11-15",
}

// Mock data for questions in this bank
const mockQuestions = [
  {
    id: 1,
    text: "What is the derivative of f(x) = x² + 3x - 2?",
    type: "multiple-choice",
    difficulty: "easy",
    category: "Derivatives",
    options: [
      { id: "a", text: "2x + 3", isCorrect: true },
      { id: "b", text: "x² + 3", isCorrect: false },
      { id: "c", text: "2x", isCorrect: false },
      { id: "d", text: "x + 3", isCorrect: false },
    ],
    explanation:
      "To find the derivative, use the power rule and the sum rule. For x², the derivative is 2x. For 3x, the derivative is 3. The derivative of a constant is 0.",
  },
  {
    id: 2,
    text: "Evaluate the limit: lim(x→0) sin(x)/x",
    type: "multiple-choice",
    difficulty: "medium",
    category: "Limits",
    options: [
      { id: "a", text: "0", isCorrect: false },
      { id: "b", text: "1", isCorrect: true },
      { id: "c", text: "∞", isCorrect: false },
      { id: "d", text: "Undefined", isCorrect: false },
    ],
    explanation:
      "This is a famous limit that equals 1. It can be proven using the squeeze theorem or L'Hôpital's rule.",
  },
  {
    id: 3,
    text: "The derivative of a constant is always zero.",
    type: "true-false",
    difficulty: "easy",
    category: "Derivatives",
    options: [
      { id: "a", text: "True", isCorrect: true },
      { id: "b", text: "False", isCorrect: false },
    ],
    explanation: "The derivative measures the rate of change. Since constants don't change, their derivative is zero.",
  },
  {
    id: 4,
    text: "Find the indefinite integral of f(x) = 2x + 3.",
    type: "multiple-choice",
    difficulty: "easy",
    category: "Integrals",
    options: [
      { id: "a", text: "x² + 3x + C", isCorrect: true },
      { id: "b", text: "x² + 3x", isCorrect: false },
      { id: "c", text: "2x² + 3x + C", isCorrect: false },
      { id: "d", text: "x² + 3 + C", isCorrect: false },
    ],
    explanation: "To find the indefinite integral, apply the power rule and add the constant of integration C.",
  },
  {
    id: 5,
    text: "Explain the concept of a limit and provide an example.",
    type: "short-answer",
    difficulty: "medium",
    category: "Limits",
    answer:
      "A limit describes the value that a function approaches as the input approaches a certain value. Example: lim(x→2) (x²-4)/(x-2) = 4.",
    explanation: "The concept of limits is fundamental to calculus and forms the basis for derivatives and integrals.",
  },
]

export default function QuestionBankPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const bankId = Number.parseInt(params.id)

  const [questionBank, setQuestionBank] = useState(mockQuestionBank)
  const [questions, setQuestions] = useState(mockQuestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [editMode, setEditMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [isEditingBank, setIsEditingBank] = useState(false)
  const [editedBank, setEditedBank] = useState({ ...questionBank })

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(question.category)
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(question.difficulty)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(question.type)
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  })

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle difficulty filter
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  // Toggle type filter
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Handle editing a question
  const handleEditQuestion = (question: any) => {
    setCurrentQuestion({ ...question })
    setEditMode(true)
  }

  // Handle saving question changes
  const handleSaveQuestion = () => {
    if (isAddingQuestion) {
      // Add new question
      setQuestions([...questions, { ...currentQuestion, id: questions.length + 1 }])
      setIsAddingQuestion(false)
    } else {
      // Update existing question
      setQuestions(questions.map((q) => (q.id === currentQuestion.id ? currentQuestion : q)))
    }
    setCurrentQuestion(null)
    setEditMode(false)
  }

  // Handle deleting a question
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  // Handle adding a new question
  const handleAddQuestion = () => {
    setCurrentQuestion({
      id: null,
      text: "",
      type: "multiple-choice",
      difficulty: "medium",
      category: questionBank.categories[0],
      options: [
        { id: "a", text: "", isCorrect: false },
        { id: "b", text: "", isCorrect: false },
        { id: "c", text: "", isCorrect: false },
        { id: "d", text: "", isCorrect: false },
      ],
      explanation: "",
    })
    setIsAddingQuestion(true)
    setEditMode(true)
  }

  // Handle saving bank changes
  const handleSaveBank = () => {
    setQuestionBank(editedBank)
    setIsEditingBank(false)
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

        {/* Question Bank Details */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{questionBank.name}</CardTitle>
                <CardDescription className="mt-1">{questionBank.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog open={isEditingBank} onOpenChange={setIsEditingBank}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Bank
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Edit Question Bank</DialogTitle>
                      <DialogDescription>Update the details of your question bank.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="bank-name">Name</Label>
                        <Input
                          id="bank-name"
                          value={editedBank.name}
                          onChange={(e) => setEditedBank({ ...editedBank, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bank-description">Description</Label>
                        <Textarea
                          id="bank-description"
                          value={editedBank.description}
                          onChange={(e) => setEditedBank({ ...editedBank, description: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Categories</Label>
                        <div className="flex flex-wrap gap-2">
                          {editedBank.categories.map((category, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              {category}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() =>
                                  setEditedBank({
                                    ...editedBank,
                                    categories: editedBank.categories.filter((_, i) => i !== index),
                                  })
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Add category"
                              className="w-32 h-8"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value) {
                                  setEditedBank({
                                    ...editedBank,
                                    categories: [...editedBank.categories, e.currentTarget.value],
                                  })
                                  e.currentTarget.value = ""
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditingBank(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveBank}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => router.push(`/test-generation?bankId=${bankId}`)}>Create Test</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {questionBank.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {questions.length} questions • Last updated {new Date(questionBank.lastUpdated).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold">Questions</h2>
          <Button onClick={handleAddQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Questions</DialogTitle>
                <DialogDescription>Select filters to narrow down the questions displayed.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {questionBank.categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Difficulty</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["easy", "medium", "hard"].map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty}`}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() => toggleDifficulty(difficulty)}
                        />
                        <label
                          htmlFor={`difficulty-${difficulty}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Question Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "multiple-choice", label: "Multiple Choice" },
                      { id: "true-false", label: "True/False" },
                      { id: "short-answer", label: "Short Answer" },
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type.id}`}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={() => toggleType(type.id)}
                        />
                        <label
                          htmlFor={`type-${type.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedDifficulties([])
                    setSelectedTypes([])
                  }}
                >
                  Clear Filters
                </Button>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <Card key={question.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {question.type.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.category}</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditQuestion(question)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">{question.text}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {question.type === "multiple-choice" || question.type === "true-false" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.options.map((option: any) => (
                        <div key={option.id} className="flex items-center gap-2">
                          <div
                            className={`h-4 w-4 rounded-full border ${
                              option.isCorrect ? "border-primary flex items-center justify-center" : ""
                            }`}
                          >
                            {option.isCorrect && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                          <span>
                            {option.id}) {option.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded p-3 bg-muted/20">
                      <p className="text-sm font-medium">Answer:</p>
                      <p className="text-sm mt-1">{question.answer}</p>
                    </div>
                  )}

                  {question.explanation && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium">Explanation:</p>
                      <p className="text-sm text-muted-foreground mt-1">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No questions found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategories([])
                  setSelectedDifficulties([])
                  setSelectedTypes([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Question Edit Dialog */}
      <Dialog
        open={editMode}
        onOpenChange={(open) => {
          if (!open) {
            setEditMode(false)
            setCurrentQuestion(null)
            setIsAddingQuestion(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{isAddingQuestion ? "Add New Question" : "Edit Question"}</DialogTitle>
            <DialogDescription>
              {isAddingQuestion
                ? "Create a new question for your question bank."
                : "Make changes to the selected question."}
            </DialogDescription>
          </DialogHeader>
          {currentQuestion && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  id="question-text"
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="question-type">Type</Label>
                  <Select
                    value={currentQuestion.type}
                    onValueChange={(value) => {
                      const updatedQuestion = { ...currentQuestion, type: value }

                      // Reset options based on question type
                      if (value === "multiple-choice") {
                        updatedQuestion.options = [
                          { id: "a", text: "", isCorrect: false },
                          { id: "b", text: "", isCorrect: false },
                          { id: "c", text: "", isCorrect: false },
                          { id: "d", text: "", isCorrect: false },
                        ]
                      } else if (value === "true-false") {
                        updatedQuestion.options = [
                          { id: "a", text: "True", isCorrect: false },
                          { id: "b", text: "False", isCorrect: false },
                        ]
                      } else if (value === "short-answer") {
                        updatedQuestion.options = []
                        updatedQuestion.answer = ""
                      }

                      setCurrentQuestion(updatedQuestion)
                    }}
                  >
                    <SelectTrigger id="question-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="question-difficulty">Difficulty</Label>
                  <Select
                    value={currentQuestion.difficulty}
                    onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, difficulty: value })}
                  >
                    <SelectTrigger id="question-difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="question-category">Category</Label>
                  <Select
                    value={currentQuestion.category}
                    onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, category: value })}
                  >
                    <SelectTrigger id="question-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionBank.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false") && (
                <div className="grid gap-2">
                  <Label>Answer Options</Label>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option: any, index: number) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`option-correct-${option.id}`}
                            checked={option.isCorrect}
                            onCheckedChange={(checked) => {
                              const newOptions = [...currentQuestion.options]

                              // For true/false and multiple choice, only one answer can be correct
                              if (checked) {
                                newOptions.forEach((opt) => {
                                  opt.isCorrect = opt.id === option.id
                                })
                              } else {
                                newOptions[index].isCorrect = false
                              }

                              setCurrentQuestion({
                                ...currentQuestion,
                                options: newOptions,
                              })
                            }}
                          />
                          <Label htmlFor={`option-correct-${option.id}`} className="text-sm">
                            Correct
                          </Label>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={option.text}
                            onChange={(e) => {
                              const newOptions = [...currentQuestion.options]
                              newOptions[index].text = e.target.value
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: newOptions,
                              })
                            }}
                            placeholder={`Option ${option.id}`}
                            disabled={currentQuestion.type === "true-false"}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion.type === "short-answer" && (
                <div className="grid gap-2">
                  <Label htmlFor="question-answer">Correct Answer</Label>
                  <Textarea
                    id="question-answer"
                    value={currentQuestion.answer || ""}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                    rows={2}
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="question-explanation">Explanation (Optional)</Label>
                <Textarea
                  id="question-explanation"
                  value={currentQuestion.explanation || ""}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  placeholder="Explain why the correct answer is right"
                  rows={2}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditMode(false)
                setCurrentQuestion(null)
                setIsAddingQuestion(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveQuestion}>
              <Save className="h-4 w-4 mr-2" />
              {isAddingQuestion ? "Add Question" : "Save Changes"}
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

