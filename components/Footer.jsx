import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
            <p width={120} className='text-white font-medium text-2xl'>Echo Blogs </p>
            <p className='text-white text-sm'>All right reserved.Copyright @blogger</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} alt='' width={40} />
                <Image src={assets.twitter_icon} alt='' width={40} />
                <Image src={assets.googleplus_icon} alt='' width={40} />
            </div>
        </div>
    )
}

export default Footer