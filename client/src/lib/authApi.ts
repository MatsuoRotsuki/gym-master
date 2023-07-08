import axiosClient from './axiosClient'

export const login = async (credentials: CredentialsType) => {
  const response = await axiosClient.post('/auth/login', credentials)
  if (!response) return

  const userCredential = response as unknown as IUser

  return { id: userCredential.id, email: userCredential.email, role: userCredential.role } as IUser
}
