'use client'

import { assets, blog_data } from '@/assets/assets'
import Footer from '@/components/Footer'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

const Page = ({ params }) => {

    const resolvedParams = use(params) // Unwraps the promise in `params`, if use params.id it won't work
    const [data, setData] = useState(null)


    const fetchBlogData = async () => {

        const response = await axios.get('/api/blog', {
            params: {
                id: resolvedParams.id
            }
        })
        setData(response.data)

        //below is first code before server

        // const blogItem = blog_data.find(blog => blog.id === Number(resolvedParams.id))
        // if (blogItem) {
        //     setData(blogItem)
        //     console.log(blogItem)
        // }
        // for (let i = 0; i < blog_data.length; i++) {
        //     if (Number(params.id) === blog_data[i].id) {
        //         setData(blog_data[i])
        //     }
        // }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])

    return data && (
        <>
            <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
                <Link href={'/'} className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Echo-Bloges</h1>
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">Get Started<Image src={assets.arrow} alt='' /></button>
                </Link>
                <div className='text-center my-24'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    <Image src={data.authorImg} width={70} height={60} alt='' className='mx-auto mt-6 border border-white rounded-full shadow-[5px_5px_12px_#000000]' />
                    <p className='mt-2 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-[10px]'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
                {/* <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1> */}
                {/* <p>{data.description}</p> */}
                {/* <h3 className='my-5 text-[22px] font-semibold'>Key Insights and Takeaways</h3> */}
                {/* <p>
                    This section dives into the main takeaways from our discussion, offering valuable insights into the topic at hand. From practical tips to essential concepts, these key points will help you better understand and implement the ideas covered in this blog.
                </p> */}

                {/* <h3 className='my-5 text-[22px] font-semibold'>Exploring the Impact of Technology in Daily Life</h3> */}
                {/* <p>
                    Technology has woven itself into nearly every aspect of our lives, influencing how we communicate, work, and even think. In this section, we explore specific examples of how modern tech impacts our routines, from simplifying tasks to reshaping our social interactions and overall productivity.
                </p> */}
                <div className='block-content' dangerouslySetInnerHTML={{ __html: data.description }}>
                </div>
                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <Image width={50} src={assets.facebook_icon} alt='' />
                        <Image width={50} src={assets.twitter_icon} alt='' />
                        <Image width={50} src={assets.googleplus_icon} alt='' />
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Page