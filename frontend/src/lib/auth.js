export const setToken = receivedToken => {
  window.localStorage.setItem('token', receivedToken)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  window.localStorage.removeItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export const isOwner = userId => {
  if (!isAuthenticated) return false
  return userId === getPayload().sub
}
