import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import Popup from "@/Components/Popup";
function Index({ roles, flash }) {
    const { data, setData, post, put, delete: destroy, processing } = useForm();
    const [openRoleForm, setOpenRoleForm] = useState(false);

    const handleDelete = (roleId) => {
        destroy(route('roles.destroy', roleId), {
            preserveScroll: true,
            onSuccess: () => console.log('Role deleted successfully'),
            onError: (err) => console.error('Error deleting role:', err),
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles
                </h2>
            }
        >
            <Head title="Roles" />

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">

                        {


                            flash.success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {flash.success}
                                </div>
                            )}
                        {

                            flash.error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {flash.error}
                                </div>
                            )}

                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            Role Table
                        </h1>
                    </div>

                    <div className="flex gap-x-20 justify-center items-center mb-10">
                        <button
                            onClick={() => setOpenRoleForm(true)}
                            className="border-2 border-green-700 p-2 rounded-md hover:scale-110 duration-200 hover:text-green-800 flex gap-x-2 items-center text-green-700"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="scale:150  bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg> Add a new role</button>
                        <button className="border-2 border-green-700 p-2 rounded-md hover:scale-110 duration-200 hover:text-green-800 flex gap-x-2 items-center text-green-700"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="scale:150  bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg> Add a new permission</button>

                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Permissions
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Assign User
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td className="px-4 py-3">{role.name}</td>
                                        <td className="px-4 py-3">
                                            {role.permissions
                                                .map(
                                                    (permission) =>
                                                        permission.name
                                                )
                                                .join(", ")}
                                        </td>
                                        <td className="px-4 py-3">
                                            {role.users.length === 0 ? (
                                                <>
                                                    no user available
                                                </>
                                            ) : (
                                                role.users
                                                    .map((user) => user.name)
                                                    .join(", ")
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-lg text-gray-900 flex gap-x-2">
                                            <Link className="text-green-700 border-2 border-green-700 p-2 duration-300 hover:border-green-800 flex items-center justify-between rounded-lg hover:rounded-xl" href={`roles/${role.id}/edit`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-green-700 scale-150 mr-2 bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg> Update</Link>

                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    if (confirm("Are you sure you want to delete this role?")) {
                                                        handleDelete(role.id);
                                                    }
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="text-red-500 flex items-center gap-x-2 p-2 border-2 border-red-500 rounded-lg hover:border-red-600 duration-300 hover:rounded-xl hover:text-red-600 hover:scale-105"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-trash-fill scale-150 hover:scale-105 duration-200"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </form>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {
                openRoleForm && (<Popup isOpen={openRoleForm} onClose={() => setOpenRoleForm(false)}>
                    <div >
                        <form className="flex flex-col  h-20 m-2">

                            <input type="text" placeholder="Add a new Role" />
                            <button className="p-2 px-5 bg-green-800 text-white my-5  mb-10 rounded-lg">Add Role</button>
                        </form>
                    </div>




                </Popup>)
            }

        </AuthenticatedLayout>
    );
}

export default Index;
