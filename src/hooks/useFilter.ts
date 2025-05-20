import { create } from 'zustand'

interface FilterStore {
  filter: string
  setFilter: (filter: string) => void
}

export const useFilter = create<FilterStore>((set) => ({
  filter: '',
  setFilter: (filter: string) => set({ filter }),
}))
