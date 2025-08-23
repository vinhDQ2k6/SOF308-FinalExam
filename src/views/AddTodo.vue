<template>
  <div class="container mt-4">
    <h3>Thêm công việc mới</h3>
    <form @submit.prevent="addTodo">
      <div class="mb-3">
        <label class="form-label">Tên công việc</label>
        <input v-model="name" class="form-control" required />
      </div>
      <div class="form-check mb-3">
        <input id="done" type="checkbox" v-model="done" class="form-check-input" />
        <label for="done" class="form-check-label">Hoàn thành</label>
      </div>
      <button class="btn btn-primary" type="submit">Lưu</button>
    </form>
  </div>
</template>

<script>
import { isAdmin as checkAdmin } from '../utils/auth.js'

export default {
  data() {
    return {
      name: '',
      done: false
    }
  },
  created() {
    if (!checkAdmin()) {
      // Router đã chặn, nhưng kiểm tra lần nữa cho chắc
      alert('Bạn không có quyền thêm công việc.')
      this.$router.push('/todos')
    }
  },
  methods: {
    addTodo() {
      if (!checkAdmin()) return alert('Bạn không có quyền thực hiện thao tác này.')
      const todos = JSON.parse(localStorage.getItem('todos') || '[]')
      todos.push({
        name: this.name,
        done: this.done,
        createdAt: new Date().toLocaleString()
      })
      localStorage.setItem('todos', JSON.stringify(todos))
      this.$router.push('/todos')
    }
  }
}
</script>