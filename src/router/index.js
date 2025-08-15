import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'
import AddTodo from '../views/AddTodo.vue'
import AppLogin from '../views/AppLogin.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: AppLogin },
    { path: '/todos', component: TodoList, meta: { requiresAuth: true } },
    { path: '/add', component: AddTodo, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router