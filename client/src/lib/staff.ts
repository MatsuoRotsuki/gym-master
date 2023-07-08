import axiosClient from "./axiosClient"

export const getAllStaff = async () => {
  const response = await axiosClient.get('staffs')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IStaff[]
  console.log(data)
  return data
}

export const getAllUser = async () => {
  const response = await axiosClient.get('users')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IUser[]
  console.log(data)
  return data
}

export const getStaffById = async (id: string | undefined) => {
  const response = await axiosClient.get(`staffs/${id}`)
  if (!response) return

  return response
}

export const getUserById = async (id: string | undefined) => {
  const response = await axiosClient.get(`users/${id}`)
  if (!response) return

  return response
}

export const deleteStaff = async (id: string) => {
  try {
    await axiosClient.delete(`/staffs/${id}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}