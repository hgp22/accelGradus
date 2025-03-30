"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { genQuestions, makeQuestionEasierHarder } from "@/lib/code"
import { set } from "date-fns";

export default function QuestionsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCourse = searchParams.get("course"); // Get the selected course from query params
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    const [harder, setHarder] = useState(false);
    const [easier, setEasier] = useState(false);
    const [genMuitas, setGenMuitas] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
    // Fetch questions from the API and filter by the selected course
    
    const handleD = async (question: any, difficulty: string) => {
        console.log("Making question", difficulty);
        const newQuestion = await makeQuestionEasierHarder(question, difficulty);

        return newQuestion;
    };

    const addQuestion = async (l:any) => {
        try {
            const response = await fetch("/api/addquestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(l),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to add question");
            }
            alert("Question added successfully!");
            //router.push("/question-banks");
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question. Please try again.");
        }
    }
    
    useEffect(() => {
        const executeEffect = async () => {
            if (genMuitas) {
                const lista = await genQuestions([],prompt);
                for (const l of lista) {
                    console.log("elemtno da lista de perguntas", l);

                    if (l?.question !== "") {
                        const nova = {
                            question_text: l.question,
                            category: l.category ?? "General",
                            subject_course: selectedCourse,
                        } 

                        console.log(nova)
                        addQuestion(nova);
                    }
                }
                setGenMuitas(false);
            }

            if (harder) {
                const l = await handleD(selectedQuestion, "harder");
                addQuestion(l);
                setHarder(false);
            }
            if (easier) {
                const l = await handleD(selectedQuestion, "easier");
                addQuestion(l);
                setEasier(false);
            }

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
        };

        executeEffect();
    }, [selectedCourse, harder, easier, genMuitas]);


    /*
    // Function to remove a question from the list
    const handleRemoveQuestion = (id: string) => {
        //console.log("Removing question with id:", id);
        //setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    };
    */

    const handleToggleHarder = (question: any) => {
        setHarder(!harder);
        setSelectedQuestion(question);  

    }
    const handleToggleEasier = (question: any) => {
        setEasier(!easier);
        setSelectedQuestion(question);
    }

    const  handleGen = () => {
        setGenMuitas(!genMuitas);
    }


    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container flex items-center justify-between py-4">
                    <h1 className="text-3xl font-bold">{selectedCourse || "Questions"}</h1>
                   
                    <Button
                         onClick={() => router.push(`/question-banks/new?course=${encodeURIComponent(selectedCourse || "")}`)}
                        className="shrink-0"
                    > Add Question
                    </Button>
                    <Button variant="secondary" onClick={() => router.push("/test-generation")}>
                        Back to Question Banks
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/question-banks")}>
                        Back to Question Banks
                    </Button>
                </div>
            </header>

            
            <div className="container py-4">
    <label htmlFor="questionInput" className="block text-sm font-medium text-gray-700">
        Add a New Question
    </label>
    <div className="mt-2 flex items-center gap-4">
        <input
            type="text"
            id="questionInput"
            placeholder="Type your question here..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
            onClick={() => {handleGen()}
            }
        >
            Generate a Question with AI
        </Button>
    </div>
</div>



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
                                        variant="outline"
                                        onClick={() => handleToggleEasier(question)}>
                                        Make it Easier
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => handleToggleHarder(question)}>
                                        Make it Harder
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={async () => {
                                            try {
                                                const response = await fetch("/api/removequestion", {
                                                    method: "DELETE",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        category: question.category, // Use question.category
                                                        question_text: question.question_text, // Use question.question_text
                                                        subject_course: question.subject_course, // Use question.subject_course
                                                    }),
                                                });

                                                if (!response.ok) {
                                                    throw new Error("Failed to delete the question");
                                                }

                                                const result = await response.json();
                                                if (result.success) {
                                                    alert("Question deleted successfully!");
                                                    // Refetch the questions from the API
                                                    const fetchQuestions = async () => {
                                                        try {
                                                            const response = await fetch("/api/questions");
                                                            if (!response.ok) {
                                                                throw new Error("Failed to fetch questions");
                                                            }
                                                            const data = await response.json();
                                                            // Filter questions by the selected course
                                                            const filteredQuestions = data.questions.filter(
                                                                (question: any) => question.subject_course === selectedCourse
                                                            );
                                                            setQuestions(filteredQuestions); // Update state with filtered questions
                                                        } catch (error) {
                                                            console.error("Error fetching questions:", error);
                                                            alert("Failed to reload questions. Please try again.");
                                                        }
                                                    };
                                                    await fetchQuestions();
                                                } else {
                                                    alert(result.message || "Failed to delete the question");
                                                }
                                            } catch (error) {
                                                console.error("Error deleting question:", error);
                                                alert("An error occurred while deleting the question. Please try again.");
                                            }
                                        }}
                                    >
                                        Delete
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
