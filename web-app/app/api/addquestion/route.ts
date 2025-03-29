import { NextResponse } from 'next/server';
import { addQuestion } from '@/middleware/midw';

export async function POST(req: Request) {
    try {
        const { category, question_text, subject_course, difficulty } = await req.json();

        // Validate input
        if (!category || !question_text || !subject_course || !difficulty) {
            return NextResponse.json(
                { success: false, message: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Add the question to the database
        const newQuestion = await addQuestion({
            category,
            question_text,
            subject_course,
            difficulty,
        });

        // Return the newly created question
        return NextResponse.json(
            { success: true, message: 'Question added successfully!', question: newQuestion },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding question:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}