import axiosClient from "./axiosClient"

export const getAllPackage = async () => {
  const response = await axiosClient.get('v1/package')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IStaff[]

  return data
}