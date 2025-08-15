<template>
  <div class="container text-center mt-5">
    <h2>ỨNG DỤNG QUẢN LÝ CÔNG VIỆC</h2>
    <div id="g_id_signin"></div>
  </div>
</template>
<script>
export default {
  name: "AppLogin",
  mounted() {
    window.google.accounts.id.initialize({
      client_id: "883246468411-1ejd8itjb6cdtc4rovckeed15c2c3blo.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large", text: "continue_with", shape: "pill" }
    );
  },
  methods: {
    handleCredentialResponse(response) {
      // Giải mã JWT lấy thông tin user
      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      const user = JSON.parse(jsonPayload)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', response.credential)
      this.$router.push('/todos')
    }
  }
}
</script>