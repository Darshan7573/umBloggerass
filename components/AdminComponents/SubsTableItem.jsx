import React from 'react'

const SubsTableItem = ({ email, date }) => {

    const emailDate = new Date(date)



    return (
        <tr className='bg-white border-b text-left'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email ? email : 'No subscriptions'}
            </th>
            <td className='px-6 py-4 hidden sm:block'>
                {emailDate.toDateString()}
            </td>
        </tr>
    )
}

export default SubsTableItem