<template>
    <div class="container mt-4">
        <h3>Danh sách công việc</h3>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Tên công việc</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
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
                    <td>
                        <button class="btn btn-danger btn-sm" @click="removeTodo(idx)">Xóa</button>
                        <button class="btn btn-warning btn-sm ms-2" @click="editTodo(idx)">Sửa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Modal chỉnh sửa (Bonus) -->
        <div v-if="editingIdx !== null" class="modal" style="display:block;">
            <!-- Modal content -->
            <div class="modal-dialog">
                <div class="modal-content p-3">
                    <h5>Sửa công việc</h5>
                    <input v-model="editingTodo.name" class="form-control mb-2" />
                    <label>
                        <input type="checkbox" v-model="editingTodo.done" /> Hoàn thành
                    </label>
                    <button class="btn btn-success mt-2" @click="saveEdit">Lưu</button>
                    <button class="btn btn-secondary mt-2" @click="cancelEdit">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos') || '[]'),
            editingIdx: null,
            editingTodo: { name: '', done: false }
        }
    },
    methods: {
        removeTodo(idx) {
            this.todos.splice(idx, 1)
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        editTodo(idx) {
            this.editingIdx = idx
            this.editingTodo = { ...this.todos[idx] }
        },
        saveEdit() {
            this.todos.splice(this.editingIdx, 1, this.editingTodo)
            localStorage.setItem('todos', JSON.stringify(this.todos))
            this.editingIdx = null
        },
        cancelEdit() {
            this.editingIdx = null
        }
    }
}
</script>