import React from 'react'
import { Link } from '@inertiajs/react'

function AdminLinks({ name, href, active = false }) {
  return (
    <Link
    
    className={`w-[95%]  p-2 h-12 duration-200  ${active?'text-2xl bg-gray-500 border':'text-xl border-b'} hover:text-2xl hover:bg-gray-500 my-2 `}
    
    
    href={href}> {name}</Link>)
}

export default AdminLinks