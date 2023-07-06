import { create } from 'zustand'
import {
  addNewEquipment,
  deleteEquipment,
  getAllEquipments,
  updateEquipment
} from '~/lib/equipmentApi'

interface IEquipmentStore {
  equipments: EquipmentType
  currentPage: PageType
  getAllEquipments: () => void
  setCurrentPage: (page: PageType) => void
  addNewEquipment: (equipment: IEquipment) => Promise<void>
  updateEquipment: (equipment: IEquipment) => Promise<void>
  deleteEquipment: (id: string) => Promise<void>
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
  },

  addNewEquipment: async equipment => {
    const addedEquipment = await addNewEquipment(equipment)
    if (!addedEquipment) return

    set(state => ({
      equipments: state.equipments.set(addedEquipment.id, addedEquipment)
    }))
  },

  updateEquipment: async equipment => {
    const updatedEquipment = await updateEquipment(equipment)
    if (!updatedEquipment) return

    set(state => {
      const newEquipments = state.equipments
      newEquipments.delete(updatedEquipment.id)
      newEquipments.set(updatedEquipment.id, updatedEquipment)

      return {
        equipments: newEquipments
      }
    })
  },

  deleteEquipment: async id => {
    await deleteEquipment(id)

    set(state => {
      state.equipments.delete(id)
      return { equipments: state.equipments }
    })
  }
}))

export default useEquipmentStore
