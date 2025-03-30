"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, LogOut, Database, FileOutput, BarChart3, Settings, User } from "lucide-react"


export default function QuestionBanksPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: any[] }>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch question banks from the API and group by subject_course
  useEffect(() => {
    const fetchQuestionBanks = async () => {
      try {
        const response = await fetch("/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch question banks");
        }
        const data = await response.json();

        // Group questions by subject_course
        const grouped = data.questions.reduce((acc: { [key: string]: any[] }, question: any) => {
          const course = question.subject_course || "Unknown Course";
          if (!acc[course]) {
            acc[course] = [];
          }
          acc[course].push(question);
          return acc;
        }, {});

        setGroupedQuestions(grouped); // Update state with grouped questions
      } catch (error) {
        console.error("Error fetching question banks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionBanks();
  }, []);

  const handleDeleteCourse = () => {
    if (courseToDelete !== null) {
      // Remove the course from groupedQuestions
      const updatedGroupedQuestions = { ...groupedQuestions };
      delete updatedGroupedQuestions[courseToDelete];
      setGroupedQuestions(updatedGroupedQuestions);
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

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
            <p className="text-muted-foreground"></p>
          </div>
          <Button onClick={() => router.push("/question-banks/new")} className="shrink-0">
            Add Question
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
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading question banks...</p>
          </div>
        ) : Object.keys(groupedQuestions).length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(groupedQuestions).map(([course, questions]) => (
              <Card key={course} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course}</CardTitle>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/removecategory", {
                            method: "DELETE", // Use DELETE method
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ subject_course: course }),
                          });

                          if (!response.ok) {
                            throw new Error("Failed to delete the course");
                          }

                          const result = await response.json();
                          if (result.success) {
                            alert("Course deleted successfully!");
                            // Update the UI by removing the course from groupedQuestions
                            const updatedGroupedQuestions = { ...groupedQuestions };
                            delete updatedGroupedQuestions[course];
                            setGroupedQuestions(updatedGroupedQuestions);
                          } else {
                            alert(result.message || "Failed to delete the course");
                          }
                        } catch (error) {
                          console.error("Error deleting course:", error);
                          alert("An error occurred while deleting the course. Please try again.");
                        }
                      }}
                    >
                      Delete
                    </Button>

                  </div>
                  <CardDescription>
                    {questions.length} questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground">
                    This course contains questions related to {course}.
                  </p>
                </CardContent>
                <CardFooter className="pt-3 flex justify-between">
                  <Button variant="outline" onClick={() => router.push(`/questions?course=${course}`)}>
                    View Questions
                  </Button>
                </CardFooter>
              </Card> 
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No question banks found.</p>
          </div>
        )}
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all questions for this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
