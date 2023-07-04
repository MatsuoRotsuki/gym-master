import { create } from "zustand"
import { getAllStaff } from "./lib/staff"

interface IStaffStore {
    staffs: IStaff[],
    getAllStaff: () => void
}

export const useStaffStore = create<IStaffStore>(set => ({
    staffs: [],
    getAllStaff: async () => {
        const data = await getAllStaff()
        set({ staffs: data})
    }
}))