import {NextResponse} from "next/server";
import connectDb from "@/lib/dbconnect.js";

export async function GET(req) {
    try {
        await connectDb(); // Ensure MongoDB connection
        return NextResponse.json({ message: "Hello World!" },{ status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}