import React from 'react'

function Index({roles,permissions}) {
  return (
    <div>
        <h1>Roles</h1>
        <ul>
            {roles.map((role) => (
                <li key={role.id}>{role.name}</li>
            ))}
        </ul>
        <h1>Permissions</h1>
        <ul>
            {permissions.map((permission) => (
                <li key={permission.id}>{permission.name}</li>
            ))}
        </ul>
    </div>
);
}

export default Index

