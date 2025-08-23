import { createRouter, createWebHistory } from 'vue-router'
import AppLogin from '../views/AppLogin.vue'
import TodoList from '../views/TodoList.vue'
import AddTodo from '../views/AddTodo.vue'
import { isAuthenticated, hasRole } from '../utils/auth.js'
import AppHome from '@/views/AppHome.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/home', component: AppHome },
  { path: '/login', component: AppLogin },
  // User và Admin đều xem được
  { path: '/todos', component: TodoList, meta: { requiresAuth: true, roles: ['admin', 'user'] } },
  // Chỉ Admin mới được vào trang thêm
  { path: '/add', component: AddTodo, meta: { requiresAuth: true, roles: ['admin'] } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const needAuth = !!to.meta.requiresAuth
  if (needAuth && !isAuthenticated()) {
    return next('/login')
  }
  const roles = to.meta.roles
  if (roles && roles.length > 0 && !hasRole(roles)) {
    // Không đủ quyền -> chuyển về danh sách
    return next('/todos')
  }
  next()
})

export default router