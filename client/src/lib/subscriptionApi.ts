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
    const response = (await axiosClient.post(`/member-memberships/register`, {
      memberId: Number(memberId),
      membershipId: Number(membershipId),
      periodOfMonths,
      note: ''
    })) as any

    return response.membershipActivityLogs[0].id
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}

export const confirmSubscribePlan = async (registerId: string, confirmInfo: ConfirmPayment) => {
  try {
    const data = (await axiosClient.post(
      `/member-activity-logs/${registerId}/confirm-payment`,
      confirmInfo
    )) as any

    return data.memberMembership
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}
