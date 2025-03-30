import { NextResponse } from "next/server";
import { deleteCourse } from "@/middleware/midw";

export async function DELETE(req: Request) {
    try {
        // Parse the request body
        const { subject_course } = await req.json();

        console.log(subject_course)

        // Validate the input
        if (!subject_course) {
            return NextResponse.json(
                { success: false, message: "The subject_course field is required." },
                { status: 400 }
            );
        }

        // Call the deleteCourse function to remove the course from the database
        const result = await deleteCourse(subject_course);
        console.log(result)

        return NextResponse.json(
            { success: true, message: 'Question added successfully!'},
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