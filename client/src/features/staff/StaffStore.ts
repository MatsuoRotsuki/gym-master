import { create } from 'zustand'

interface IStaffStore {}

const useStaffStore = create<IStaffStore>(set => ({}))

export default useStaffStore
