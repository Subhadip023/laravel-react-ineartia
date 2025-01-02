import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Link } from '@inertiajs/react';
import Popup from "@/Components/Popup";
import AdminLayout from "@/Layouts/AdminLayout";

function Index({ roles, flash, permissions }) {

    let index = 1

    const { data: roleData, setData: setRoleData, post: postRole, processing: roleProcessing, errors: roleErros } = useForm();
    const { data: permissionData, setData: setPermissionData, post: postPermission, processing: permissionProcessing } = useForm();

    const { data: editPermissionData, setData: setEditPermissionData, put: editPermissionPut } = useForm({
        id: 0,
        name: '',
    });
    const { delete: deletePermission } = useForm();
    const { delete: roleDelete } = useForm();
    const [openRoleForm, setOpenRoleForm] = useState(false);
    const [openPermissionForm, setOpenPermissionForm] = useState(false);
    const [openEditPermissionForm, setOpenEditPermissionForm] = useState(false);
    const [showFlashMessage, setShowFlashMessage] = useState(true);

    const handleDelete = (roleId) => {
        roleDelete(route('roles.destroy', roleId), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Role deleted successfully')
                setShowFlashMessage(true)
                setRoleData({ name: '' })
            },
            onError: (err) => {
                console.error('Error deleting role:', err)
                setShowFlashMessage(true)


            },
        });
        setTimeout(() => setShowFlashMessage(false), 3000)

    };

    const addRoleSubmit = (e) => {
        e.preventDefault();
        postRole(route('roles.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Role created successfully');
                setOpenRoleForm(false);

                setShowFlashMessage(true)
            },
            onError: (err) => {
                setShowFlashMessage(true)

                console.error('Error creating role:', err)
            },

        });

        setTimeout(() => setShowFlashMessage(false), 3000)

        setRoleData({});
    };

    const addPermissionSubmit = (e) => {
        e.preventDefault();
        postPermission(route('permissions.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Permission created successfully');
                setOpenPermissionForm(false);
                setShowFlashMessage(true)

            },
            onError: (err) => {
                setShowFlashMessage(true)

            },
        });
        setTimeout(() => setShowFlashMessage(false), 3000)

        setPermissionData({});
    };


    const editPermissionSubmit = (e) => {
        e.preventDefault();
        setShowFlashMessage(true)

        editPermissionPut(route('permissions.update', editPermissionData.id), {
            preserveScroll: true,

        }

        )
        setEditPermissionData({});
        setOpenEditPermissionForm(false);

        setTimeout(() => {
            setShowFlashMessage(false)
        }, 3000);


    }


    const deletePermissionsubmit = (e, roleId) => {
        setShowFlashMessage(true)
        e.preventDefault();
        deletePermission(route('permissions.destroy', roleId), {
            preserveScroll: true,
        })

        setTimeout(() => {
            setShowFlashMessage(false);
        }, 3000);


    }



    return (
        <>
            <Head title="Roles" />
            <section className="text-gray-600 body-font">
                <div className="container px-5  mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">


                        


                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Role Table</h1>
                    </div>

                    <div className="flex gap-x-20 justify-center items-center mb-10">
                        <button
                            onClick={() => setOpenRoleForm(true)}
                            className="border-2 border-green-700 p-2 rounded-md hover:scale-110 duration-200 hover:text-green-800 flex gap-x-2 items-center text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="scale:150 bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg> Add a new role
                        </button>

                    </div>

                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full  text-left whitespace-no-wrap">
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
                                                .map((permission) => permission.name)
                                                .join(", ")}
                                        </td>
                                        <td className="px-4 py-3">
                                            {role.users.length === 0
                                                ? 'no user available'
                                                : role.users.map((user) => user.name).join(", ")}
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

            {/* Role Form Popup */}
            <Popup isOpen={openRoleForm} onClose={() => setOpenRoleForm(false)}>
                <form onSubmit={addRoleSubmit} className="m-2 items-center justify-between flex flex-col h-36">
                    <h3>Add New Role</h3>
                    <input
                        type="text"
                        placeholder="Role Name"
                        value={roleData.name}
                        onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
                        required
                    />


                    {roleErros.name && <span className="text-red-500 text-sm">{roleErros.name}</span>}


                    <button type="submit" disabled={roleProcessing}
                        className="p-2 px-5 bg-green-700 text-white rounded-lg hover:bg-green-500 duration-200"
                    >Submit</button>
                </form>
            </Popup>

            {/* Permission Form Popup */}
            <Popup isOpen={openPermissionForm} onClose={() => setOpenPermissionForm(false)}>
                <form onSubmit={addPermissionSubmit} className="m-2 items-center justify-between flex flex-col h-36">
                    <h3>Add New Permission</h3>
                    <input
                        type="text"
                        placeholder="Permission Name"
                        value={permissionData.name}
                        onChange={(e) => setPermissionData({ ...permissionData, name: e.target.value })}
                        required
                    />
                    <button

                        className="p-2 px-5 bg-green-700 text-white rounded-lg hover:bg-green-500 duration-200"

                        type="submit" disabled={permissionProcessing}>Submit</button>
                </form>
            </Popup>

            <section className="text-gray-600  body-font mt-20">
                <div className="container px-5  mx-auto">
                    <div className="flex flex-col text-center w-full  mb-10">



                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Permission Table</h1>
                    </div>

                    <div className="flex gap-x-20 justify-center items-center mb-10">

                        <button
                            onClick={() => setOpenPermissionForm(true)}
                            className="border-2 border-green-700 p-2 rounded-md hover:scale-110 duration-200 hover:text-green-800 flex gap-x-2 items-center text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="scale:150 bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg> Add a new permission
                        </button>
                    </div>
                    <div className="lg:w-2/3 w-full  mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap ">
                            <thead >
                                <tr className="text-2xl font-bold">
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                        #
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Action                                    </th>

                                </tr>
                            </thead>
                            <tbody>







                                {
                                    permissions.map((permission) => (


                                        <tr key={permission.id}>
                                            <td className="px-4 py-3">{index++}</td>
                                            <td className="px-4 py-3">{permission.name}</td>
                                            <td className="px-4 py-3 flex gap-x-2">

                                                <button onClick={() => {
                                                    setOpenEditPermissionForm(true)
                                                    setEditPermissionData({
                                                        id: permission.id,
                                                        name: permission.name,
                                                    })


                                                }} className="text-green-700 border-2 border-green-700 p-2 duration-300 hover:border-green-800 flex items-center justify-between rounded-lg hover:rounded-xl" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-green-700 scale-150 mr-2 bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg>

                                                    Edit</button>

                                                <form onSubmit={(e) => {
                                                    if (confirm(`Are you want to delete ${permission.name} ?`)) {
                                                        deletePermissionsubmit(e, permission.id)

                                                    }
                                                }

                                                }>

                                                    <button

                                                        type="submit"
                                                        className="text-red-500 flex items-center gap-x-2 p-2 border-2 border-red-500 rounded-lg hover:border-red-600 duration-300 hover:rounded-xl hover:text-red-600 hover:scale-105"

                                                    ><svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-trash-fill scale-150 hover:scale-105 duration-200"
                                                        viewBox="0 0 16 16"
                                                    >
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg> Delete</button>


                                                </form>






                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


            {/* Permission Form Popup */}
            <Popup isOpen={openEditPermissionForm} onClose={() => setOpenEditPermissionForm(false)}>
                <form onSubmit={editPermissionSubmit} className="m-2 items-center justify-between flex flex-col h-36">
                    <h3>Edit Permission</h3>
                    <input
                        type="text"
                        placeholder="Permission Name"
                        value={editPermissionData.name}
                        onChange={(e) => setEditPermissionData({ ...editPermissionData, name: e.target.value })}
                        required
                    />
                    <button

                        className="p-2 px-5 bg-green-700 text-white rounded-lg hover:bg-green-500 duration-200"

                        type="submit" disabled={permissionProcessing}>Submit</button>
                </form>
            </Popup>


        </>
    );
}

Index.layout = page => <AdminLayout Children={page} />

export default Index;
