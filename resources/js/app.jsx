import './bootstrap'
import '../css/app.css'
import '../css/main.css'
import '../css/multiRangeSlider.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
// import ErrorBoundary from './components/error-baundry'

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages1 = import.meta.glob('./pages/main/**/*.jsx')
        const pages2 = import.meta.glob('./pages/user/**/*.jsx')
        return  resolvePageComponent(`./pages/${name}.jsx`, {...pages1, ...pages2})
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            // <ErrorBoundary>
                <App {...props} />
            // </ErrorBoundary>
        )
    },
    progress: { color: '#003bf1', showSpinner: true, includeCSS: true },
})
