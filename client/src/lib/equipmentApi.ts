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
