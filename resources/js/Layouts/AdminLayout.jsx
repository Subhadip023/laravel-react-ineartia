import { Head, Link, usePage } from '@inertiajs/react'
import React, { Children, useEffect, useState } from 'react'
import AdminLinks from '@/Components/AdminLinks';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
function AdminLayout({ Children }) {
    const user = usePage().props.auth.user;

    const [showSideBar, setShowSideBar] = useState(true);
    const [showUserNav, setShowUserNav] = useState(false);

    useEffect(() => {

        if (showUserNav) {
            setTimeout(() => {
                setShowUserNav(false)
            }, 3000);
        }

    }, [showUserNav])

    return (
        <>
            <Head title='admin' />

            <section id='main-section' className='w-screen h-screen  flex duration-300'>



                <aside className={`${showSideBar ? 'w-2/12' : 'hidden '}  duration-200 h-screen flex flex-col bg-gray-700 text-white justify-between`}>

                    <div className='flex w-full h-fit items-center border-b bg-slate-800'>

                        <Link href='/admin' className='w-full  text-3xl hover:text-gray-400 flex justify-center font-bold duration-150'>
                            Dashboard


                        </Link>
                        <div className='w-1/5 h-fit  ' >



                            <div className='flex items-center justify-center py-4'>
                                <button onClick={() => setShowSideBar((prev) => !prev)}>


                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-layout-text-sidebar-reverse  hover:text-gray-400" viewBox="0 0 16 16">
                                        <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z" />
                                    </svg>
                                </button>


                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col w-full justify-start py-5 items-center h-[80%] overflow-y-auto  scroll-bar
                    '>
                        <AdminLinks name={'Users'} href={'/users'} />
                        <AdminLinks name='Products' href='/products' />
                        <AdminLinks name={'Roles & Permissions'} href={'/roles'} />

                    </div>
                    {
                        showUserNav && (<div className='bg-gray-300 shadow-md rounded-md w-44 py-5 fixed bottom-16 left-3 z-10'>

                            <div className="mb-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>


                        </div>)
                    }

                    <div className='h-[7%] flex items-center border-t justify-around'>


                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s" className='w-12 rounded-full ' alt="" onClick={() => setShowUserNav((prev) => !prev)} />

                        <h3 className='text-lg'>{user.name}</h3>

                    </div>

                </aside>


                <main className={`${showSideBar ? 'w-10/12' : 'w-full'} flex flex-wrap  items-start bg-slate-100  h-screen overflow-y-auto scroll-bar p-5`}>



                    <div className='w-full '>
                        {!showSideBar &&

                            (<div className=' w-fit sticky px-2 flex mt-3 '>

                                <button onClick={() => setShowSideBar((prev) => !prev)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-layout-text-sidebar-reverse text-gray-500 hover:text-gray-400" viewBox="0 0 16 16">
                                        <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z" />
                                    </svg>

                                </button>

                            </div>)

                        }


                        {Children}

                    </div>





                </main>


            </section>

        </>
    )
}

export default AdminLayout