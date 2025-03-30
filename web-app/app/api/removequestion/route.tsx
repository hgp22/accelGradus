import { NextResponse } from "next/server";
import { deleteQuestion } from "@/middleware/midw";

export async function DELETE(req: Request) {
    try {

        const { category, question_text, subject_course } = await req.json();

        console.log(subject_course)

        // Validate the input
        if (!subject_course || !category || !question_text) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        const result = await deleteQuestion(category,
                                    question_text, subject_course);
        console.log(result)

        return NextResponse.json(
            { success: true, message: 'Question removed successfully!'},
            { status: 201 }
        );

    } catch (error) {
        console.error("Error deleting course:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
