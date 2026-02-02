
import { create } from "zustand";
import { persist } from "zustand/middleware";


const defaultSteps = [
    { id: "1", name: "Registrasi", description: "Pendaftaran pasien baru atau lama" },
    { id: "2", name: "Pemeriksaan", description: "Pemeriksaan oleh dokter" },
    { id: "3", name: "Obat", description: "Pengambilan obat di apotek" },
    { id: "4", name: "Pembayaran", description: "Proses pembayaran di kasir" }
];


export const useWorkFlowStore = create(persist((set) => ({

    steps: defaultSteps,

    addStep: (step) => set((state) => ({

        steps: [...state.steps, {

            id: Date.now().toString(),
            name: step.name,
            description: step.description

        }]
    })),

    removeStep: (id) => set((state) => ({

        steps: state.steps.filter(s => s.id !== id)
    })),

    updateStep: (id, updateStep) => set((state) => ({

        steps: state.steps.map(s => s.id === id ? { ...s, ...updateStep } : s)
    })),

    reorderStep: (newSteps) => set({ steps: newSteps }),

    resetSteps: () => set({ steps: defaultSteps })

}),
    {
        name: "workflow-storage"
    }
))