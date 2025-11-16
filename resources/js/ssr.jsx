import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import { route } from 'ziggy-js';
import {Ziggy} from '@/ziggy'
createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: name => {
            const pages1 = import.meta.glob('./pages/main/**/*.jsx',{ eager: false })
            const pages2 = import.meta.glob('./pages/user/**/*.jsx',{ eager: false })
            return  resolvePageComponent(`./pages/${name}.jsx`, {...pages1, ...pages2})
        },
        setup({ App, props }) {
            global.route = (name, params, absolute, config = Ziggy) => route(name, params, absolute, config);
            return <App {...props} />
        },
    }),
    { cluster: true },
)
