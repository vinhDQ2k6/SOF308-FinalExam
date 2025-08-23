<template>
  <div class="container mt-4">
    <h3>Danh sách công việc</h3>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Tên công việc</th>
          <th>Ngày tạo</th>
          <th>Trạng thái</th>
          <th class="text-end">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, idx) in todos" :key="idx">
          <td>{{ todo.name }}</td>
          <td>{{ todo.createdAt }}</td>
          <td>
            <span :class="{ 'text-success': todo.done, 'text-danger': !todo.done }">
              {{ todo.done ? 'Hoàn thành' : 'Chưa hoàn thành' }}
            </span>
          </td>
          <td class="text-end">
            <button class="btn btn-warning btn-sm me-2" @click="editTodo(idx)" v-if="isAdmin">
              Sửa
            </button>
            <button class="btn btn-danger btn-sm" @click="removeTodo(idx)" v-if="isAdmin">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal chỉnh sửa -->
    <div v-if="editingIdx !== null" class="modal" style="display:block; background: rgba(0,0,0,.3);">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <h5>Sửa công việc</h5>
          <input v-model="editingTodo.name" class="form-control mb-2" />
          <div class="form-check">
            <input id="done" type="checkbox" v-model="editingTodo.done" class="form-check-input" />
            <label class="form-check-label" for="done">Hoàn thành</label>
          </div>
          <div class="mt-3">
            <button class="btn btn-success me-2" @click="saveEdit">Lưu</button>
            <button class="btn btn-secondary" @click="cancelEdit">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isAdmin as checkAdmin } from '../utils/auth.js'

export default {
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      editingIdx: null,
      editingTodo: { name: '', done: false }
    }
  },
  computed: {
    isAdmin() {
      return checkAdmin()
    }
  },
  methods: {
    persist() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    removeTodo(idx) {
      if (!this.isAdmin) return alert('Bạn không có quyền xóa.')
      this.todos.splice(idx, 1)
      this.persist()
    },
    editTodo(idx) {
      if (!this.isAdmin) return alert('Bạn không có quyền sửa.')
      this.editingIdx = idx
      this.editingTodo = { ...this.todos[idx] }
    },
    saveEdit() {
      if (!this.isAdmin) return alert('Bạn không có quyền.')
      this.todos.splice(this.editingIdx, 1, this.editingTodo)
      this.persist()
      this.editingIdx = null
    },
    cancelEdit() {
      this.editingIdx = null
    }
  }
}
</script>