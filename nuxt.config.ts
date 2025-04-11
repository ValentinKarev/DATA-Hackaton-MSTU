// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui"],
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: false,
    ui: {
        colorMode: false,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        '@use "@/styles/_colors.scss" as *;',
                        '@use "@/styles/breakpoints.scss" as *;',
                    ].join(""),
                },
            },
        },
    },
    css: ["@/styles/global.scss", "@/styles/main.css"],
});
