import axiosClient from './axiosClient'

export const getAllEquipments = async () => {
  try {
    const response = await axiosClient.get('/equipments')
    if (!response) return

    const data = response as unknown as IEquipment[]
    const equipments = data.reduce((acc: Map<string, IEquipment>, equipment: IEquipment) => {
      acc.set(equipment.id, equipment)
      return acc
    }, new Map<string, IEquipment>())

    return equipments
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const addNewEquipment = async (equipment: IEquipment) => {
  try {
    const response = await axiosClient.post('/equipments', equipment)
    if (!response) return

    const data = response as unknown as IEquipment
    return data
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const updateEquipment = async (equipment: IEquipment) => {
  try {
    const response = await axiosClient.put(`/equipments/${equipment.id}`, equipment)
    if (!response) return

    const data = response as unknown as IEquipment
    return data
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const deleteEquipment = async (id: string) => {
  try {
    await axiosClient.delete(`/equipments/${id}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}
