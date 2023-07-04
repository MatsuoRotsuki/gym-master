import { create } from 'zustand'

interface IMemberStore {}

const useMemberStore = create<IMemberStore>(set => ({}))

export default useMemberStore
