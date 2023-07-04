import axiosClient from './axiosClient'

export const getAllGyms = async () => {
  const response = await axiosClient.get('/gyms')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as Room[]

  return data
}
