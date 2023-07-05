import axiosClient from './axiosClient'

export const getAllGyms = async () => {
  const response = await axiosClient.get('/gyms')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IGym[]

  return data
}

export const getGymById = async (id: string | undefined) => {
  const response = await axiosClient.get(`/gyms/${id}`)

  if (!response) return

  return response 
}

export const updateGym = async (gym: IGym) => {
  try {
    const response = await axiosClient.put(`/gyms/${gym.id}`, gym)
    if (!response) return

    const data = response as unknown as IGym
    return data
  } catch (error) {
    console.error('Lỗi r bé ơi >_<', error)
  }
}