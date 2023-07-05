import { create } from 'zustand'
import { getAllGyms, getGymById } from '~/lib/gymApi'
import { getMemberById } from '~/lib/memberApi'

interface IGymStore {
  rooms: IGym[]
  room: IGym
  member: IMember
  getRooms: () => void
  setRoomsState: (rooms: IGym[]) => void
  getRoomById: (id: string | undefined) => void
  getMemeberById: (id: string | undefined) => void
}

const useGymStore = create<IGymStore>(set => ({
  rooms: [],
  room: {} as IGym,
  member: {} as IMember,
  getRooms: async () => {
    const data = await getAllGyms()

    set({ rooms: data })
  },

  setRoomsState: rooms => set({ rooms }),
  getRoomById: async (id) => {
      const response : IGym | undefined = await getGymById(id) as unknown as IGym
      set ({room: response})
  },
  getMemeberById: async (id) => {
      const response : IMember | undefined = await getMemberById(id) as unknown as IMember
      set ({member: response})
  },
}))

export default useGymStore
