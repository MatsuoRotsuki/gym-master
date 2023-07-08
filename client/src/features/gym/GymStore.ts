import { create } from 'zustand'
import { deleteFeedback, deleteGym, getAllFeedbacks, getAllGyms, getGymById } from '~/lib/gymApi'
import { getMemberById } from '~/lib/memberApi'
import { deleteGymEquipment } from '~/lib/gymApi'

interface IGymStore {
  rooms: IGym[]
  room: IGym
  member: IMember
  feedbacks: IFeedback[]
  getRooms: () => void
  setRoomsState: (rooms: IGym[]) => void
  getRoomById: (id: string | undefined) => void
  getMemeberById: (id: string | undefined) => void
  deleteGymEquipment: (gymId: string | undefined, equipmentId: string | undefined) => Promise<void>
  getAllFeedbacks: () => void
  deleteFeedback: (id: string) => Promise<void>
  deleteGym: (id: string) => Promise<void>
}

const useGymStore = create<IGymStore>((set, get) => ({
  rooms: [],
  room: {} as IGym,
  member: {} as IMember,
  feedbacks: [],
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
  deleteGymEquipment: async (gymId, equipmentId) => {
      await deleteGymEquipment(gymId, equipmentId)
      const response : IGym | undefined = await getGymById(gymId) as unknown as IGym
      set ({room: response})
  },
  getAllFeedbacks: async () => {
      const data = await getAllFeedbacks()
      set({ feedbacks: data })
  },
  deleteFeedback: async (id: string) => {
    await deleteFeedback(id)
    set(state => {
      state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== Number(id))
      return { feedbacks: state.feedbacks }
    })
  },
  deleteGym: async (id: string) => {
    await deleteGym(id)
    set(state => {
        state.rooms = state.rooms.filter((room) => room.id !== id)
        return { rooms: state.rooms }
      })
}
}))

export default useGymStore
