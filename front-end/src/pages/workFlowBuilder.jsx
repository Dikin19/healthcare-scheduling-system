import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkFlowStore } from "../store/workFlowStore";
import Button from "../components/button/button";



export default function WorkFlowBuilder() {

    const navigate = useNavigate()

    const { steps, addStep, removeStep, updateStep, reorderStep, resetSteps } = useWorkFlowStore();

    const [isAddingStep, setIsAddingStep] = useState(false)

    const [editingId, setEditingId] = useState(null);
    const [newStep, setNewStep] = useState({ name: "", description: "" });
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleAddStep = () => {
        if (newStep.name.trim()) {
            addStep(newStep);
            setNewStep({ name: "", description: "" })
            setIsAddingStep(false)
        }
    };

    const handleUpdateStep = (id) => {

        if (newStep.name.trim()) {
            updateStep(id, newStep);
            setEditingId(null);
            setNewStep({ name: "", description: "" });
        }
    }

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex == null || draggedIndex === dropIndex) return;

        const newSteps = [...steps];
        const [draggedStep] = newSteps.splice(draggedIndex, 1);
        newSteps.splice(dropIndex, 0, draggedStep);

        reorderStep(newSteps);
        setDraggedIndex(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    }

    const startEdit = (step) => {
        setEditingId(step.id);
        setNewStep({ name: step.name, description: step.description });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsAddingStep(false);
        setNewStep({ name: "", description: "" })
    };




    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Button
                onClick={() => navigate("/")}
                label="← Back to Home"
                size="small"
                variant="secondary"
            />


            <div className="uppercase text-2xl font-bold text-center mb-6">
                Workflow Builder - Alur Klinik
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-6 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Langkah-langkah Workflow</h2>
                    <div className="flex gap-2">

                        <Button
                            variant="primary"
                            onClick={() => setIsAddingStep(true)}
                            richChildren
                        >
                            + Tambah Langkah
                        </Button>

                        <Button
                            variant="danger"
                            onClick={resetSteps}
                            richChildren
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    💡 Drag and drop untuk mengurutkan langkah
                </p>


                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div key={step.id}>

                            {editingId === step.id ? (

                                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 p-4">
                                    <div className="bg-white p-4 sm:p-6 rounded-xl w-full sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleFade shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                                        <input
                                            type="text"
                                            value={newStep.name}
                                            onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                                            placeholder="Nama langkah"
                                            className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <textarea
                                            value={newStep.description}
                                            onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                            placeholder="Deskripsi langkah"
                                            rows="2"
                                            className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateStep(step.id)}
                                                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <div
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`border-2 border-gray-300 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors cursor-move ${draggedIndex === index ? "opacity-50" : ""}`}
                                >
                                    <div className="flex items-start justify-between h-10">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg">{step.name}</h3>
                                                <p className="text-gray-600 text-sm">{step.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => startEdit(step)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Hapus langkah "${step.name}"?`)) {
                                                        removeStep(step.id);
                                                    }
                                                }}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {index < steps.length - 1 && (
                                <div className="flex justify-center my-2">
                                    <div className="text-3xl text-gray-400">↓</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {isAddingStep && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 p-4">
                        <div className="bg-white p-4 sm:p-6 rounded-xl w-full sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleFade shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                            <h3 className="font-bold mb-2">Tambah Langkah Baru</h3>
                            <input
                                type="text"
                                value={newStep.name}
                                onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                                placeholder="Nama langkah (contoh: Laboratorium)"
                                className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-green-500"
                            />
                            <textarea
                                value={newStep.description}
                                onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                placeholder="Deskripsi langkah (contoh: Pemeriksaan lab darah)"
                                rows="2"
                                className="w-full border-2 border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-green-500"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddStep}
                                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Tambah
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {steps.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        Belum ada langkah workflow. Klik tombol "Tambah Langkah" untuk memulai.
                    </p>
                )}
            </div>

            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Preview Workflow</h3>
                <div className="flex flex-wrap items-center gap-2">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <span className="px-4 py-2 bg-white border-2 border-black rounded font-semibold">
                                {step.name}
                            </span>
                            {index < steps.length - 1 && (
                                <span className="mx-2 text-2xl text-gray-600">→</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )

}