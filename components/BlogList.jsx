import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {


    const [menu, setMenu] = useState("All")

    const [blogs, setBlogs] = useState([])



    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog')
        setBlogs(response.data.blogs)
    }


    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                {['All', 'Technology', 'Startup', 'Lifestyle'].map((item) => (
                    <button
                        key={item}
                        onClick={() => setMenu(item)}
                        className={`py-1 px-4 ${menu !== item ? "hover:bg-gray-100" : ""} ${menu === item ? 'bg-black text-white rounded-lg active transition-all duration-300' : ''}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => { setMenu('All') }} className={menu === 'All' ? 'bg-black text-white  py-1 px-4 rounded-e-sm' : ""}>All</button>
                <button onClick={() => { setMenu('Technology') }} className={menu === 'Technology' ? 'bg-black text-white  py-1 px-4 rounded-e-sm' : ""}>Technology</button>
                <button onClick={() => { setMenu('Startup') }} className={menu === 'Startup' ? 'bg-black text-white  py-1 px-4 rounded-e-sm' : ""}>Startup</button>
                <button onClick={() => { setMenu('LifeStyle') }} className={menu === 'LifeStyle' ? 'bg-black text-white  py-1 px-4 rounded-e-sm' : ""}>LifeStyle</button>
            </div> */}
            {blogs <= 0 ? <div className=' flex items-center justify-center text-center  min-h-96 '>
                <p>It looks like we don&apos;t have any blogs to show right now. Check back later for new content!</p>
            </div> : <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                    return <BlogItem key={index} image={item.image} title={item.title} description={item.description} category={item.category} id={item._id} />
                })}
            </div>}

        </div>
    )
}

export default BlogList