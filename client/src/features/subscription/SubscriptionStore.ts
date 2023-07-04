import { create } from 'zustand'

interface ISubscriptionStore {}

const useSubscriptionStore = create<ISubscriptionStore>(set => ({}))

export default useSubscriptionStore
