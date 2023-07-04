import { create } from 'zustand'

interface IEquipmentStore {}

const useEquipmentStore = create<IEquipmentStore>(set => ({}))

export default useEquipmentStore
