<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home">Quản lý công việc</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/todos">Danh sách</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/add">Thêm công việc</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center ms-auto" v-if="user && user.name">
          <img :src="avatarUrl" alt="avatar" class="rounded-circle me-2" style="width:32px;height:32px;object-fit:cover"
            referrerpolicy="no-referrer" crossorigin="anonymous" @error="onImgError" />
          <span class="me-2">{{ user.name }} ({{ user.role }})</span>
          <button class="btn btn-outline-danger btn-sm" @click="logout">Đăng xuất</button>
        </div>

        <div v-else>
          <router-link class="btn btn-outline-primary btn-sm" to="/login">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getUser, isAdmin as checkAdmin, clearAuth } from '../utils/auth.js'
import { fallbackAvatar } from '../utils/image.js'

export default {
  name: 'AppNavbar',
  computed: {
    user() {
      return getUser() || {}
    },
    isAdmin() {
      return checkAdmin()
    },
    avatarUrl() {
      if (!this.user?.name) return fallbackAvatar('User', 64)
      return this.user.picture || fallbackAvatar(this.user.name, 64)
    }
  },
  methods: {
    logout() {
      clearAuth()
      this.$router.push('/login')
    },
    onImgError(e) {
      // Nếu ảnh Google lỗi 403/404, dùng fallback
      e.target.src = fallbackAvatar(this.user?.name || 'User', 64)
    }
  }
}
</script>