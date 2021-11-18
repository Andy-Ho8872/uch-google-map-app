<template>
    <v-card>
        <v-app-bar elevation="2">
            <v-toolbar-title>{{ toolBarTitle }}</v-toolbar-title>
            <v-switch class="theme_switcher"
                v-model="$vuetify.theme.dark"
                label="深色模式"
                inset
            ></v-switch>
        </v-app-bar>
    </v-card>
</template>

<script>
export default {
    props: {
        toolBarTitle: {
            type: String,
            require: true
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.theme_switcher {
    position: absolute;
    right: 0;
    top: 25%;
}
</style>