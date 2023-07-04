import axiosClient from "./axiosClient"

export const getAllStaff = async () => {
  const response = await axiosClient.get('v1/staff')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IStaff[]

  return data
}