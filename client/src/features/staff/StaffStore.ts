import dayjs from 'dayjs';
import { create } from 'zustand'
import { getAllStaff, getAllUser, getStaffById, getUserById } from '~/lib/staff'

interface IStaffStore {
    staffs:IStaff[]
    staff:IStaff
    getAllStaffs: () => void
    getStaffById: (id: string | undefined) => void
}

const useStaffStore = create<IStaffStore>(set => ({
    staffs: [],
    staff: {} as IStaff,
    getAllStaffs: async () => {
        const data = await getAllStaff()
        set({ staffs: data})
    },
    getStaffById:async (id:string | undefined) => {
        const response : IStaff| undefined  =  await getStaffById(id) as unknown as IStaff
        console.log(response)
        const data : IStaff| undefined = {
            ...response,
            hiredDate: dayjs(response.hiredDate),
            dateOfBirth: dayjs(response.dateOfBirth),
        }
        set({staff: data})
    },
}))

export default useStaffStore
