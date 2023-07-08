import axiosClient from './axiosClient'

export const getAllPlans = async () => {
  try {
    const response = await axiosClient.get('/memberships')
    if (!response) return

    const data = response as unknown as IMembership[]
    const membreships = data.reduce((acc: Map<string, IMembership>, feedback: IMembership) => {
      acc.set(feedback.id.toString(), feedback)
      return acc
    }, new Map<string, IMembership>())

    return membreships
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const addNewPlan = async (currentUser: string, plan: IMembership) => {
  try {
    const response = await axiosClient.post(`/staffs/${currentUser}/add-membership`, plan)
    if (!response) return

    const data = response as unknown as IMembership
    return data
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const deletePlan = async (id: string) => {
  try {
    await axiosClient.delete(`/memberships/${id}`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const subscribePlan = async ({
  memberId,
  membershipId,
  periodOfMonths
}: SubscribeDataType) => {
  try {
    await axiosClient.post(`/member-memberships/register`)
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}
