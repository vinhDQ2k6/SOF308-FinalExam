<template>
    <div id="app">
        <AppNavbar v-if="isShowNavbar" />
        <router-view />
    </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'

export default {
    components: {
        AppNavbar
    },
    computed: {
        isShowNavbar() {
            return this.$route && this.$route.path !== '/login';
        }
    }
}
</script>