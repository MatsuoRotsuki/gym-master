import { create } from 'zustand'
import { getAllMembers, updateMember } from '~/lib/memberApi'

interface IMemberStore {
  members: Map<string, IMember>
  currentPage: PageType
  getAllMembers: () => void
  updateMember: (member: IMember) => void
  setCurrentPage: (page: PageType) => void
}

const useMemberStore = create<IMemberStore>((set, get) => ({
  members: new Map<string, IMember>(),
  currentPage: { page: 1, offset: 6 },
  getAllMembers: async () => {
    const data = await getAllMembers()
    if (!data) return
    set({ members: data })
  },
  setCurrentPage: page => set({ currentPage: page }),
  updateMember: async member => {
    const data = await updateMember(member)
    if (!data) return

    const members = get().members
    members.set(member.id, member)

    set({ members: members })
  }
}))

export default useMemberStore
