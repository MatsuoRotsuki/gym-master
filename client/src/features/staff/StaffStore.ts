import dayjs from 'dayjs';
import { create } from 'zustand'
import { deleteGym } from '~/lib/gymApi';
import { deleteStaff, getAllStaff, getAllUser, getStaffById, getUserById } from '~/lib/staff'

interface IStaffStore {
    staffs:IStaff[]
    staff:IStaff
    getAllStaffs: () => void
    getStaffById: (id: string | undefined) => void
    deleteStaff: (id: string) => Promise<void>
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
    deleteStaff: async (id) => {
        await deleteStaff(id)

        set(state => {
            state.staffs = state.staffs.filter((staff) => staff.id !== Number(id))
            return { staffs: state.staffs }
          })
    },
    deleteGym: async (id) => {
        await deleteGym(id)
        set(state => {
            state.rooms = state.rooms.filter((staff) => staff.id !== Number(id))
            return { rooms: state.rooms }
          })
    }
}))

export default useStaffStore
