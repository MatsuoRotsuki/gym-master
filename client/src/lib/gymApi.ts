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

export const deleteGymEquipment = async (gymId: string | undefined, equipmentId: string | undefined) => {
  try {
    await axiosClient.delete(`/gyms/${gymId}/equipments/${equipmentId}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const getAllFeedbacks = async () => {
  const response = await axiosClient.get('/feedbacks')

  if (!response) return

  const data = (Array.isArray(response) ? response : [response]) as IFeedback[]

  return data
}

export const getAllRepliesFeedback = async (feedbackId: string) => {
  const response = await axiosClient.get(``)
}

export const deleteFeedback = async (feedbackId: string) => {
  try {
    await axiosClient.delete(`/feedbacks/${feedbackId}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const deleteGym = async (id: string) => {
  try {
    await axiosClient.delete(`/gyms/${id}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}