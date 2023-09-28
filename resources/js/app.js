import { createSSRApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import 'vuetify/styles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

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
        iconfont: 'mdi',
        defaults: 'fa',
        aliases,
        sets: { fa, mdi }
    }
})

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    setup({ el, App, props, plugin }) {
        createSSRApp({ render: () => h(App, props) })
            .use(plugin).use(vuetify)
    },
})
