import axiosClient from './axiosClient'

export const getAllMembers = async () => {
  try {
    const response = await axiosClient.get('/members')
    if (!response) return

    const data = response as unknown as IMember[]
    const members = data.reduce((acc: Map<string, IMember>, member: IMember) => {
      acc.set(member.id, member)
      return acc
    }, new Map<string, IMember>())

    return members
  } catch (error) {
    console.error('Lỗi r bé ơi >_<', error)
  }
}

export const updateMember = async (member: IMember) => {
  try {
    const response = await axiosClient.put(`/members/${member.id}`, member)
    if (!response) return

    const data = response as unknown as IMember
    return data
  } catch (error) {
    console.error('Lỗi r bé ơi >_<', error)
  }
}

export const getMemberById = async (id: string | undefined) => {
  const response = await axiosClient.get(`members/${id}`)
  if (!response) return
  return response
}

export const createMember = async (member: IMember) => {
  const response = await axiosClient.post('/members', member)
  if (!response) return
  return response as unknown as IMember
}
