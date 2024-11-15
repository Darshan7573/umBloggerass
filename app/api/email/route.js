import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    await connectDB()
}

LoadDB()

export const POST = async (request) => {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }

    await EmailModel.create(emailData)
    console.log('Email Saved')

    return NextResponse.json({ success: true, msg: "Subscribe Successfull." })
}

export const GET = async (req) => {
    const emails = await EmailModel.find({})

    return NextResponse.json({ emails })
}
