import { create } from 'zustand'
import { getAllGyms } from '~/lib/getAllGyms'

interface IGymStore {
  rooms: Room[]
  getRooms: () => void
  setRoomsState: (rooms: Room[]) => void
}

const useGymStore = create<IGymStore>(set => ({
  rooms: [],

  getRooms: async () => {
    const data = await getAllGyms()

    set({ rooms: data })
  },

  setRoomsState: rooms => set({ rooms })
}))

export default useGymStore
