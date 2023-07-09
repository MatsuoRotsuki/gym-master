import { create } from 'zustand'
import { addNewPlan, confirmSubscribePlan, deletePlan, getAllPlans } from '~/lib/subscriptionApi'

interface ISubscriptionStore {
  plans: Map<string, IMembership>
  currentPage: PageType
  getAllPlans: () => void
  setCurrentPage: (page: PageType) => void
  addNewPlan: (currentUser: string, plan: IMembership) => Promise<void>
  deletePlan: (id: string) => Promise<void>
}

const useSubscriptionStore = create<ISubscriptionStore>((set, get) => ({
  plans: new Map<string, IMembership>(),

  currentPage: { page: 1, offset: 12 },

  getAllPlans: async () => {
    if (get().plans.size > 0) return

    const plans = await getAllPlans()
    if (!plans) return

    set({ plans })
  },

  setCurrentPage: page => {
    set({ currentPage: page })
  },

  addNewPlan: async (currentUser, plan) => {
    const addedPlan = await addNewPlan(currentUser, plan)
    if (!addedPlan) return

    set(state => ({
      plans: state.plans.set(addedPlan.id, addedPlan)
    }))
  },

  deletePlan: async id => {
    await deletePlan(id)

    set(state => {
      state.plans.delete(id)
      return { plans: state.plans }
    })
  }
}))

export default useSubscriptionStore
