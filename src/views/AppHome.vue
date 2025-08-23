<template>
    <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
        <h1 class="mb-3">Chào mừng đến với Ứng dụng Quản lý Công việc</h1>

        <p v-if="user && user.name" class="text-muted">Xin chào, {{ user.name }}</p>
        <p v-else class="text-muted">Vui lòng đăng nhập để bắt đầu.</p>

        <!-- Nếu chưa đăng nhập: nút dẫn tới trang Login -->
        <router-link v-if="!isAuthenticated" class="btn btn-primary btn-lg mt-4" to="/login">
            Đăng nhập với Google
        </router-link>

        <!-- Nếu đã đăng nhập: nút dẫn tới danh sách công việc -->
        <router-link v-else class="btn btn-success btn-lg mt-4" to="/todos">
            Vào danh sách công việc
        </router-link>
    </div>
</template>

<script>
import { getUser, isAuthenticated as isAuthFn } from '../utils/auth.js'

export default {
    name: 'HomeView',
    computed: {
        user() {
            return getUser() || {}
        },
        isAuthenticated() {
            return isAuthFn()
        }
    }
}
</script>