import axiosClient from './axiosClient'

export const getAllsFeedback = async () => {
  try {
    const response = await axiosClient.get('/feedbacks')
    if (!response) return

    const data = response as unknown as IFeedback[]
    const feedbacks = data.reduce((acc: Map<string, IFeedback>, feedback: IFeedback) => {
      acc.set(feedback.id.toString(), feedback)
      return acc
    }, new Map<string, IFeedback>())

    return feedbacks
  } catch (error) {
    console.error('==> Toang méo chạy được rồi ><!', error)
  }
}
