import { create } from 'zustand'
import { deleteStaff, getAllStaff, getStaffById } from '~/lib/staff'

interface IStaffStore {
  staffs: IStaff[]
  staff: IStaff
  getAllStaffs: () => void
  getStaffById: (id: string | undefined) => void
  deleteStaff: (id: string) => Promise<void>
}

const useStaffStore = create<IStaffStore>(set => ({
  staffs: [],
  staff: {} as IStaff,
  getAllStaffs: async () => {
    const data = await getAllStaff()
    set({ staffs: data })
  },
  getStaffById: async (id: string | undefined) => {
    const response: IStaff | undefined = (await getStaffById(id)) as unknown as IStaff
    console.log(response)
    const data: IStaff | undefined = {
      ...response
      // hiredDate: dayjs(response.hiredDate),
      // dateOfBirth: dayjs(response.dateOfBirth),
    }
    set({ staff: data })
  },
  deleteStaff: async id => {
    await deleteStaff(id)

    set(state => {
      state.staffs = state.staffs.filter(staff => staff.id !== Number(id))
      return { staffs: state.staffs }
    })
  }
}))

export default useStaffStore
