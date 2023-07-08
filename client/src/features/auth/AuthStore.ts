import { create } from 'zustand'
import { login } from '~/lib/authApi'

interface IAuthStore {
  currentUser: IUser
  login: (credentials: CredentialsType) => Promise<void>
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  currentUser: {} as IUser,

  login: async (credentials: CredentialsType) => {
    const data = await login(credentials)

    if (!data) return

    localStorage.setItem('currentUser', JSON.stringify(data))
    // window.location.href = '/'

    set({ currentUser: data })
  }
}))
