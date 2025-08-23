export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

export function getRole() {
  const u = getUser()
  return u && u.role ? u.role : 'user'
}

export function isAdmin() {
  return getRole() === 'admin'
}

export function hasRole(roles = []) {
  if (!roles || roles.length === 0) return true
  return roles.includes(getRole())
}