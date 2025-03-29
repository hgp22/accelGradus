import { NextResponse } from 'next/server';
import { getAllQuestions } from '@/middleware/midw'; // Adjust the path if necessary

export async function GET() {
    console.log('API endpoint hit: GET /api/questions');

    try {
        // Call the getAllQuestions function to fetch all questions
        const questions = await getAllQuestions();

        // Return the questions in the response
        return NextResponse.json({ success: true, questions }, { status: 200 });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}