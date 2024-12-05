import React from 'react'
import { Link } from '@inertiajs/react'

function AdminLinks({name,href}) {
  return (
<Link className='w-[95%] text-xl p-2 h-12 duration-200 border-b hover:text-2xl hover:bg-gray-500 my-2' href={href}> {name}</Link>  )
}

export default AdminLinks