"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuestionsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCourse = searchParams.get("course"); // Get the selected course from query params
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch questions from the API and filter by the selected course
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/questions");
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const data = await response.json();
                console.log(data);
                // Filter questions by the selected course
                const filteredQuestions = data.questions.filter(
                    (question: any) => question.subject_course === selectedCourse
                );

                setQuestions(filteredQuestions); // Update state with filtered questions
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [selectedCourse]);

    // Function to remove a question from the list
    const handleRemoveQuestion = (id: string) => {
        console.log("Removing question with id:", id);
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container flex items-center justify-between py-4">
                    <h1 className="text-3xl font-bold">{selectedCourse || "Questions"}</h1>
                    <Button variant="outline" onClick={() => router.push("/question-banks")}>
                        Back to Question Banks
                    </Button>
                </div>
            </header>

            <main className="flex-1 container py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <p>Loading questions...</p>
                    </div>
                ) : questions.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {questions.map((question: any, index: number) => (
                            <Card key={question.id || `question-${index}`} className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg">{question.category || "Untitled Question"}</CardTitle>
                                    <CardDescription>
                                        {question.question_text || "No description available"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center">
                                    <Button>Edit</Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleRemoveQuestion(question.id)}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">No questions found for this course.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
