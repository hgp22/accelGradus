"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, LogOut, Wand2, Eye, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for question banks
const mockQuestionBanks = [
  {
    id: 1,
    name: "Calculus I",
    description: "First-year calculus questions",
    categories: ["Limits", "Derivatives", "Integrals", "Applications"],
  },
  {
    id: 2,
    name: "Linear Algebra",
    description: "Questions on vectors and matrices",
    categories: ["Vectors", "Matrices", "Eigenvalues", "Linear Systems"],
  },
  {
    id: 3,
    name: "Statistics 101",
    description: "Introductory statistics",
    categories: ["Probability", "Distributions", "Hypothesis Testing", "Regression"],
  },
  {
    id: 4,
    name: "Physics Mechanics",
    description: "Questions on Newtonian mechanics",
    categories: ["Forces", "Motion", "Energy", "Momentum"],
  },
]

export default function TestGenerationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bankIdParam = searchParams.get("bankId")

  const [selectedBank, setSelectedBank] = useState(bankIdParam ? Number(bankIdParam) : null)
  const [testName, setTestName] = useState("")
  const [testVersions, setTestVersions] = useState(3)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: true,
    shortAnswer: false,
  })
  const [questionCounts, setQuestionCounts] = useState({
    multipleChoice: 10,
    trueFalse: 5,
    shortAnswer: 2,
  })
  const [previewGenerated, setPreviewGenerated] = useState(false)

  const bank = mockQuestionBanks.find((b) => b.id === selectedBank)

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleGeneratePreview = () => {
    // In a real app, this would call an API to generate the test preview
    setPreviewGenerated(true)
  }

  const totalQuestions = Object.entries(questionTypes)
    .filter(([_, enabled]) => enabled)
    .reduce((sum, [type]) => sum + questionCounts[type as keyof typeof questionCounts], 0)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">accelGrading</span>
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
            <h1 className="text-3xl font-bold">Test Generation</h1>
            <p className="text-muted-foreground">Create multiple versions of tests with AI</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Configure your test parameters to generate multiple versions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="test-name">Test Name</Label>
                  <Input
                    id="test-name"
                    placeholder="Midterm Exam 1"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question-bank">Question Bank</Label>
                  <Select
                    value={selectedBank?.toString() || ""}
                    onValueChange={(value) => setSelectedBank(Number(value))}
                  >
                    <SelectTrigger id="question-bank">
                      <SelectValue placeholder="Select a question bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockQuestionBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id.toString()}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {bank && (
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {bank.categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
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
                )}

                <div className="space-y-4">
                  <Label>Question Types</Label>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="multiple-choice"
                          checked={questionTypes.multipleChoice}
                          onCheckedChange={(checked) => setQuestionTypes({ ...questionTypes, multipleChoice: checked })}
                        />
                        <Label htmlFor="multiple-choice">Multiple Choice</Label>
                      </div>

                      {questionTypes.multipleChoice && (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="mc-count" className="text-sm">
                            Count:
                          </Label>
                          <Input
                            id="mc-count"
                            type="number"
                            className="w-20"
                            value={questionCounts.multipleChoice}
                            onChange={(e) =>
                              setQuestionCounts({
                                ...questionCounts,
                                multipleChoice: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="true-false"
                          checked={questionTypes.trueFalse}
                          onCheckedChange={(checked) => setQuestionTypes({ ...questionTypes, trueFalse: checked })}
                        />
                        <Label htmlFor="true-false">True/False</Label>
                      </div>

                      {questionTypes.trueFalse && (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="tf-count" className="text-sm">
                            Count:
                          </Label>
                          <Input
                            id="tf-count"
                            type="number"
                            className="w-20"
                            value={questionCounts.trueFalse}
                            onChange={(e) =>
                              setQuestionCounts({
                                ...questionCounts,
                                trueFalse: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="short-answer"
                          checked={questionTypes.shortAnswer}
                          onCheckedChange={(checked) => setQuestionTypes({ ...questionTypes, shortAnswer: checked })}
                        />
                        <Label htmlFor="short-answer">Short Answer/Description</Label>
                      </div>

                      {questionTypes.shortAnswer && (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="sa-count" className="text-sm">
                            Count:
                          </Label>
                          <Input
                            id="sa-count"
                            type="number"
                            className="w-20"
                            value={questionCounts.shortAnswer}
                            onChange={(e) =>
                              setQuestionCounts({
                                ...questionCounts,
                                shortAnswer: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="versions">Number of Test Versions</Label>
                    <span className="text-sm">{testVersions}</span>
                  </div>
                  <Slider
                    id="versions"
                    min={1}
                    max={10}
                    step={1}
                    value={[testVersions]}
                    onValueChange={(value) => setTestVersions(value[0])}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleGeneratePreview}
                  disabled={!selectedBank || totalQuestions === 0 || !testName}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Test Blueprint
                </Button>
              </CardContent>
            </Card>

            {previewGenerated && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Test Blueprint Preview
                  </CardTitle>
                  <CardDescription>
                    This is how your test will be structured. The actual content will vary across versions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-6 space-y-8">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold">{testName}</h3>
                      <p className="text-muted-foreground">Version: Blueprint</p>
                      <p className="text-sm">Total Points: {totalQuestions * 5}</p>
                    </div>

                    {questionTypes.multipleChoice && questionCounts.multipleChoice > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold border-b pb-2">
                          Multiple Choice Questions ({questionCounts.multipleChoice})
                        </h4>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="font-medium">1. What is the derivative of f(x) = x² + 3x - 2?</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <span>a) 2x + 3</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>b) x² + 3</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>c) 2x</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>d) x + 3</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">2. Which of the following is an example of a limit?</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>a) f(x) = x²</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>b) ∫ x² dx</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <span>c) lim(x→0) sin(x)/x</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>d) d/dx (x³)</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm italic">
                            + {questionCounts.multipleChoice - 2} more multiple choice questions
                          </p>
                        </div>
                      </div>
                    )}

                    {questionTypes.trueFalse && questionCounts.trueFalse > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold border-b pb-2">
                          True/False Questions ({questionCounts.trueFalse})
                        </h4>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="font-medium">1. The derivative of a constant is always zero.</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <span>True</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>False</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">2. The integral of x² is x³.</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border"></div>
                                <span>True</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <span>False</span>
                              </div>
                            </div>
                          </div>

                          {questionCounts.trueFalse > 2 && (
                            <p className="text-muted-foreground text-sm italic">
                              + {questionCounts.trueFalse - 2} more true/false questions
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {questionTypes.shortAnswer && questionCounts.shortAnswer > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold border-b pb-2">
                          Short Answer Questions ({questionCounts.shortAnswer})
                        </h4>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="font-medium">1. Explain the concept of a limit and provide an example.</p>
                            <div className="border border-dashed rounded p-3 h-24 flex items-center justify-center text-muted-foreground">
                              Student answer area
                            </div>
                          </div>

                          {questionCounts.shortAnswer > 1 && (
                            <p className="text-muted-foreground text-sm italic">
                              + {questionCounts.shortAnswer - 1} more short answer questions
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview All Versions
                    </Button>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Generate {testVersions} Versions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Test Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Test Name</p>
                  <p className="text-muted-foreground">{testName || "Not specified"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Question Bank</p>
                  <p className="text-muted-foreground">{bank?.name || "Not selected"}</p>
                </div>

                {selectedCategories.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium">Question Types</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {questionTypes.multipleChoice && <li>Multiple Choice: {questionCounts.multipleChoice}</li>}
                    {questionTypes.trueFalse && <li>True/False: {questionCounts.trueFalse}</li>}
                    {questionTypes.shortAnswer && <li>Short Answer: {questionCounts.shortAnswer}</li>}
                  </ul>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Questions</p>
                  <p className="text-muted-foreground">{totalQuestions}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Test Versions</p>
                  <p className="text-muted-foreground">{testVersions}</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium">Estimated Completion Time</p>
                  <p className="text-muted-foreground">
                    {totalQuestions > 0 ? `${Math.ceil(totalQuestions * 1.5)} minutes per student` : "Not available"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our AI can help you create effective tests based on your teaching materials and learning objectives.
                </p>
                <Button variant="outline" className="w-full">
                  View Test Creation Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container flex justify-between items-center">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} accelGrading</div>
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

