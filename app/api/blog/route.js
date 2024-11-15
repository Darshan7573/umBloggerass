// we use custom header function GET, POST, PUT, PATCH, OPTIONS, DELETE

// Typically function to GET
// async function GET(params) {

// }

// arrow function
// export const GET = async (request) => {
//     console.log('Blog GET HIT')
//     return NextResponse.json({ message: 'API Working' })
// }


import { connectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises'

const fs = require('fs')



const { NextResponse } = require("next/server")

const LoadDB = async () => {
    await connectDB();
}

LoadDB();


//API for getting the blog from DB
export const GET = async (req) => {

    const blogId = req.nextUrl.searchParams.get('id')
    if (blogId) {
        const blog = await BlogModel.findById(blogId)
        return NextResponse.json(blog)
    } else {
        const blogs = await BlogModel.find({})
        return NextResponse.json({ blogs })
    }
}






//API for adding the blog
export const POST = async (request) => {

    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get('image')
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData)
    const path = `./public/${timeStamp}_${image.name}`
    await writeFile(path, buffer)

    const imageUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imageUrl}`,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData)
    console.log("Blog Saved")


    return NextResponse.json({ success: true, msg: "Blog Added" })
}

//API FOR DELETE BLOG

export const DELETE = async (req) => {
    const id = await req.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id)
    fs.unlink(`./public${blog.image}`, () => { })
    await BlogModel.findByIdAndDelete(id)

    return NextResponse.json({ success: true, msg: "Blog Deleted" })
}