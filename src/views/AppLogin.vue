<template>
  <div class="container text-center mt-5">
    <h2>ỨNG DỤNG QUẢN LÝ CÔNG VIỆC</h2>
    <p class="text-muted">Đăng nhập bằng tài khoản Google để tiếp tục</p>

    <div id="g_id_signin" class="d-flex justify-content-center mt-3"></div>

    <div v-if="loadError" class="alert alert-danger mt-3" role="alert">
      {{ loadError }}
    </div>
  </div>
</template>

<script>
import { ADMIN_EMAILS } from '../config/auth.js'
import { setUser } from '../utils/auth.js'
import { normalizeGooglePhoto, fallbackAvatar } from '../utils/image.js'

export default {
  name: 'LoginView',
  data() {
    return { loadError: '' }
  },
  mounted() {
    this.initGoogleSignIn()
  },
  methods: {
    async initGoogleSignIn() {
      try {
        await this.ensureGoogleLoaded()
        window.google.accounts.id.initialize({
          client_id: '883246468411-1ejd8itjb6cdtc4rovckeed15c2c3blo.apps.googleusercontent.com',
          callback: this.handleCredentialResponse
        })
        window.google.accounts.id.renderButton(
          document.getElementById('g_id_signin'),
          { theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill' }
        )
      } catch (e) {
        console.error(e)
        this.loadError = 'Không tải được Google Sign-In. Kiểm tra script GSI và Client ID.'
      }
    },
    ensureGoogleLoaded() {
      return new Promise((resolve, reject) => {
        let tries = 0
        const itv = setInterval(() => {
          tries++
          if (window.google?.accounts?.id) {
            clearInterval(itv); resolve()
          } else if (tries > 50) {
            clearInterval(itv); reject(new Error('Google script not loaded'))
          }
        }, 100)
      })
    },
    handleCredentialResponse(response) {
      try {
        if (!response?.credential) {
          alert('Không nhận được credential từ Google')
          return
        }
        const googleUser = this.decodeJwt(response.credential)
        // console.log('Google claims:', googleUser)

        const role = ADMIN_EMAILS.includes(googleUser.email) ? 'admin' : 'user'
        // Chuẩn hóa ảnh + fallback
        const rawPicture = googleUser.picture || ''
        const picture = normalizeGooglePhoto(rawPicture, 64) || fallbackAvatar(googleUser.name, 64)

        const appUser = {
          name: googleUser.name,
          email: googleUser.email,
          picture,
          role
        }
        localStorage.setItem('token', response.credential)
        setUser(appUser)
        this.$router.push('/todos')
      } catch (err) {
        console.error(err)
        alert('Đăng nhập thất bại: ' + err.message)
      }
    },
    decodeJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      )
      return JSON.parse(jsonPayload)
    }
  }
}
</script>