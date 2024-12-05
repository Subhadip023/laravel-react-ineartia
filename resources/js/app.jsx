import '../css/app.css';
import './bootstrap';
import AdminLayout from './Layouts/AdminLayout';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

        // Check if the page is in the admin folder and assign the admin layout
        if (name.startsWith('Admin/')) {
            page.default.layout = (page) => <AdminLayout Children={page}/>;
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
