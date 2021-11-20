<template>
    <v-app>
        <!-- 標頭 -->
        <Header toolBarTitle="搶救花果山" />
        <!-- 頁面內容 -->
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-footer>
            <v-col class="text-center">
                &copy; {{ new Date().getFullYear() }} 健行科技大學 版權所有
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style scoped></style>
