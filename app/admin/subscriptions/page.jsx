'use client'

import SubsTableItem from '@/components/AdminComponents/SubsTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [emails, setEmail] = useState([])

    const fetchEmail = async () => {
        const response = await axios.get('/api/email')
        setEmail(response.data.emails)
    }

    useEffect(() => {
        fetchEmail()
    }, [])


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 pl-16'>
            <h1>All Subscription</h1>
            <div className='max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scroll-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subscription
                            </th>
                            <th scope='col' className='px-6 py-3 hidden sm:block'>
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((item, index) => {
                            return <SubsTableItem key={index} email={item.email} date={item.date} />
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page