import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

function Edit({ role, users, permissions }) {
  const { errors, flash } = usePage().props;


  const { data, setData, post, put, processing } = useForm({
    users: role.users?.map((user) => user.id) || [], 
    permissions: role.permissions?.map((permission) => permission.id) || [],
  });

  // console.log(data.users.includes(5))

  const handleUserChange = (e) => {
    const { value, checked } = e.target;

    setData((prevState) => {
        const updatedUserIds = checked
            ? [...prevState.users, parseInt(value)] // Add user ID if checked
            : prevState.users.filter((id) => id !== parseInt(value)); // Remove user ID if unchecked

        return {
            ...prevState,
            users: updatedUserIds,
        };
    });
};
 

const handlePermissionChange = (e) => {
  const { value, checked } = e.target;

  setData((prevState) => {
      const updatedPermissions = checked
          ? [...prevState.permissions, parseInt(value)] // Add permission if checked
          : prevState.permissions.filter((id) => id !== parseInt(value)); // Remove permission if unchecked

      return {
          ...prevState,
          permissions: updatedPermissions, // Update the `permissions` field
      };
  });
};




  const handleUserSubmit = (e) => {
    e.preventDefault();
    put(route('updateUser', role.id), {
      preserveScroll: true, // Keeps the scroll position
      onSuccess: () => console.log('Users updated successfully!'),
      onError: (err) => console.error('Error updating users:', err),
    });
  };

  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    put(route('addPermissions', role.id), {
      preserveScroll: true, 
      onSuccess: () => console.log('Permissions updated successfully!'),
      onError: (err) => console.error('Error updating permissions:', err),
    });
  };

  return (
    <
    
    >

      {/* User Update Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Update Users for {role.name}
            </h1>
          </div>

          <form onSubmit={handleUserSubmit} className="lg:w-2/3 w-full mx-auto space-y-6">
            <div className="border rounded-md p-4 bg-gray-100">
              <h3 className="text-lg font-bold mb-2">Users</h3>
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    value={user.id}
                    checked={data.users.includes(user.id)}
                    onChange={handleUserChange}
                  />
                  <label htmlFor={`user-${user.id}`} className="text-gray-700">
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? 'Updating...' : 'Update Users'}
            </button>
          </form>
        </div>
      </section>

      {/* Permission Update Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Update Permissions for {role.name}
            </h1>
          </div>

          <form onSubmit={handlePermissionSubmit} className="lg:w-2/3 w-full mx-auto space-y-6">
            <div className="border rounded-md p-4 bg-gray-100">
              <h3 className="text-lg font-bold mb-2">Permissions</h3>
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`permission-${permission.id}`}
                    value={permission.id}
                    checked={data.permissions.includes(permission.id)}
                    onChange={handlePermissionChange}
                  />
                  <label htmlFor={`permission-${permission.id}`} className="text-gray-700">
                    {permission.name}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? 'Updating...' : 'Update Permissions'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
Edit.layout=page=><AdminLayout Children={page}/>
// Index.layout = page => <AdminLayout Children={page} />

export default Edit;
