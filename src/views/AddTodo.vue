<template>
    <div class="container mt-4">
        <h3>Thêm công việc mới</h3>
        <form @submit.prevent="addTodo">
            <div class="mb-3">
                <label>Tên công việc</label>
                <input v-model="name" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-check-label">Trạng thái</label>
                <input type="checkbox" v-model="done" /> Hoàn thành
            </div>
            <button class="btn btn-primary" type="submit">Lưu</button>
        </form>
    </div>
</template>
<style>
.form-check-label {
    padding-right: 10px;
}
</style>
<script>
export default {
    data() {
        return {
            name: '',
            done: false
        }
    },
    methods: {
        addTodo() {
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