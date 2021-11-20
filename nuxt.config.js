import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - map-app',
        title: 'map-app',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/gmap-vue.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    // https://go.nuxtjs.dev/vuetify
    buildModules: ['@nuxtjs/vuetify'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/firebase'],
    //* firebase configuration
    firebase: {
        //* test mode 
        config: {
            apiKey: 'AIzaSyAztT4xsMoqn6QFsCmDgER53V0CYeeggvI',
            authDomain: 'uch-travel-map-test.firebaseapp.com',
            projectId: 'uch-travel-map-test',
            storageBucket: 'uch-travel-map-test.appspot.com',
            messagingSenderId: '717696891299',
            appId: '1:717696891299:web:f95883bb24d2058d688216',
            measurementId: '<measurementId>',
        },
        services: {
            auth: true, // Just as example. Can be any other service.
        },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    env: {
        GMAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['gmap-vue'],
    },
}
