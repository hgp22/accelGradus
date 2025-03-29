"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddQuestionPage() {
    const router = useRouter();
    const [questionText, setQuestionText] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [course, setCourse] = useState("");

    const handleAddQuestion = async () => {
        if (!questionText || !category || !course) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question_text: questionText,
                    category,
                    difficulty,
                    subject_course: course,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add question");
            }

            alert("Question added successfully!");
            router.push("/question-banks");
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container flex items-center justify-between py-4">
                    <h1 className="text-3xl font-bold">Add New Question</h1>
                    <Button variant="outline" onClick={() => router.push("/question-banks")}>
                        Back to Question Banks
                    </Button>
                </div>
            </header>

            <main className="flex-1 container py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Question</CardTitle>
                        <CardDescription>Fill in the details below to add a new question to the database.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="question-text">Question Text</Label>
                            <Textarea
                                id="question-text"
                                placeholder="Enter the question text here"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                placeholder="Enter the category (e.g., Algebra, Physics)"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="course">Course</Label>
                            <Input
                                id="course"
                                placeholder="Enter the course name (e.g., Mathematics)"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                        </div>

                        <Button className="w-full" onClick={handleAddQuestion}>
                            Add Question
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}