import { create } from 'zustand'
import { getAllEquipments } from '~/lib/equipmentApi'

interface IEquipmentStore {
  equipments: EquipmentType
  currentPage: PageType
  getAllEquipments: () => void
  setCurrentPage: (page: PageType) => void
}

const useEquipmentStore = create<IEquipmentStore>(set => ({
  equipments: new Map<string, IEquipment>(),

  currentPage: { page: 1, offset: 12 },

  getAllEquipments: async () => {
    const data = await getAllEquipments()
    if (!data) return

    set({
      equipments: data
    })
  },

  setCurrentPage: page => {
    set({ currentPage: page })
  }
}))

export default useEquipmentStore
