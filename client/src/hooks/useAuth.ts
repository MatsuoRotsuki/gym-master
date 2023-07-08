const useAuth = () => {
  const currentUser = localStorage.getItem('currentUser')

  let isAdmin = false
  let isStaff = false
  let isMember = false
  let status = 'Member'

  if (!currentUser)
    return { role: 0, isStaff, isAdmin, isMember, email: null, status, currentUser: null }

  const userCredential = JSON.parse(currentUser)
  const { id, role, email } = userCredential

  isMember = role === 3
  isStaff = role === 2
  isAdmin = role === 1

  if (isStaff) status = 'Manager'
  if (isAdmin) status = 'Admin'

  return { role, isStaff, isAdmin, isMember, status, email, currentUser: id as string }
}

export default useAuth
