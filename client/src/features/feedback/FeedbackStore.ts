import { create } from 'zustand'
import { getAllsFeedback } from '~/lib/feedbackApi'

interface IFeedbackStore {
  feedbacks: Map<string, IFeedback>
  getAllFeedbacks: () => void
}

const useFeedbackStore = create<IFeedbackStore>((set, get) => ({
  feedbacks: new Map<string, IFeedback>(),

  getAllFeedbacks: async () => {
    if (get().feedbacks.size > 0) return

    const feedbacks = await getAllsFeedback()
    if (!feedbacks) return

    set({ feedbacks })
  }
}))

export default useFeedbackStore
