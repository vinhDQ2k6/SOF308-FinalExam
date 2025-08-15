<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/todos">Quản lý công việc</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/todos">Danh sách</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/add">Thêm công việc</router-link>
                    </li>
                </ul>
                <div v-if="user" class="d-flex align-items-center ms-auto">
                    <span class="me-2">{{ user.name }} ({{ user.email }})</span>
                    <button class="btn btn-outline-danger btn-sm" @click="logout">Đăng xuất</button>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'AppNavbar',
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user') || '{}')
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.$router.push('/login')
        }
    }
}
</script>