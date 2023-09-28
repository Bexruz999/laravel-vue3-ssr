import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {aliases, fa} from 'vuetify/lib/iconsets/fa';
import {mdi} from 'vuetify/lib/iconsets/mdi';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
        defaults: 'fa',
        aliases,
        sets: { fa, mdi }
    }
})

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            return createSSRApp({
                render: () => h(App, props),
            }).use(plugin).use(vuetify)
        },
    }),
)
