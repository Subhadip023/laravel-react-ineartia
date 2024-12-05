import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react'

function AdminLinks({name,href}) {
  return (
<Link className='w-[95%] text-xl p-2  duration-200 border-b hover:bg-gray-500 mb-2' href={href}> {name}</Link>  )
}

export default AdminLinks