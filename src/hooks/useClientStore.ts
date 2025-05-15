import { create } from 'zustand'

interface ClientStore {
  filter: string
  setFilter: (filter: string) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  filter: '',
  setFilter: (filter: string) => set({ filter }),
}))
