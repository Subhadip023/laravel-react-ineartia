<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles=['admin','editor','User'];
        $permissions = ['create articles', 'edit articles', 'delete articles', 'publish articles'];

         // Create permissions
         foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);

            // Assign all permissions to the admin role
            if ($roleName == 'admin') {
                $role->givePermissionTo(Permission::all());
            }
        }
    }
}
