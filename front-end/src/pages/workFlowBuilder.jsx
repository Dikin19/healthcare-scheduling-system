import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkFlowStore } from "../store/workFlowStore";
import Button from "../components/button/button";



export default function WorkFlowBuilder() {

    const navigate = useNavigate()

    const { steps, addStep, removeStep, updateStep, rearderSteps, resetSteps } = useWorkFlowStore();

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

    const handleDragOver = (e, index) => {
        e.preventDefault();

        if (draggedIndex == null || draggedIndex === index) return;

        const newSteps = [...steps];
        const draggedStep = newStep[draggedIndex];

        newStep.splice(draggedIndex, 1);
        newSteps.slice(index, 0, draggedStep);

        rearderSteps(newSteps);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    const startEdit = (step) => {
        setEditingId(step.id);
        setNewStep({ name: step.name, description: step.description });
    };

    const canceEdit = () => {
        setEditingId(null);
        setIsAddingStep(false);
        setNewStep({ name: "", description: "" })
    };




    return (
        <div className="p-8 max-w-4xl mx-auto">
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
                            onClick={() => {
                                if (confirm("Reset workflow ke default?")) {
                                    resetSteps();
                                }
                            }} richChildren
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    💡 Drag and drop untuk mengurutkan langkah
                </p>




            </div>
        </div>
    )

}