import { create } from "zustand";



export const usePatientStore = create((set) => ({

    search: "",
    setSearch: (value) => set({ search: value }),

}));