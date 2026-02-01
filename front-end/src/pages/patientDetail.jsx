import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router"
import { GET_PATIENT_DETAIL } from "../graphql/queries";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom"
import UsePatientForm from "../hooks/usePatientForm";
import {useState, useEffect} from "react"
import FormInput from "../components/form/formInput";
import FormSelect from "../components/form/formSelect";
import FormTextArea from "../components/form/formTextarea";




export default function PatientDetail() {

    const [editId, setEditId] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams();
    console.log(id, ">>>>>")

    const navigate = useNavigate()

    
    const handleSuccess = () => {
        setShowForm(false);
        setEditId(null)
    };

    const {formData, errors, handleSubmit, handleChange, resetForm, loading: formLoading} = UsePatientForm(handleSuccess, editId)

    const { data, loading, error } = useQuery(GET_PATIENT_DETAIL, { variables: { id } })
    console.log("apakah data masuk", data)

    const patient = data?.patient
    console.log("apakah data terbaru masuk", patient)

    const genderOption = [
        {value: "Laki-Laki", label: "Laki-laki"},
        {value: "Perempuan", label: "Perempuan"}
    ]


    return (
        <div className="p-8 max-w-6xl mx-auto border">
            
            <div className="flex justify-center items-center text-center font-bold text-xl rounded-lg">
                {loading && <div>Loading...</div>}
        
                {!loading && error && (<div>Error: {error.message}</div>)}

                {!loading && !error && !data && (<div>No data</div>)}
            </div>

            <div>
                <Button 
                variant="secondary" 
                label="← Back to List" 
                onClick={() => navigate("/")}
                />      
            </div>

            {showForm && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleFade shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">{editId ? 'Update' : 'Add New Patient'}</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <FormInput
                                label="Nama Lengkap"
                                name="name"
                                value={formData.name}
                                placeholder="Masukan Nama Lengkap"
                                onChange={handleChange}
                                error={errors.name}
                                />
                            </div>

                            <div className="mb-2">
                                <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                placeholder="Masukan Email"
                                onChange={handleChange}
                                error={errors.email}
                                />
                            </div>

                            <div className="mb-2">
                                <FormInput
                                label="Nomor Telepon"
                                name="phone"
                                value={formData.phone}
                                placeholder="Masukan Nomor Telepon"
                                onChange={handleChange}
                                error={errors.phone}
                                />
                            </div>

                            <div className="mb-2">
                                <FormInput
                                label="Tanggal Lahir"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                error={errors.dateOfBirth}
                                />
                            </div>

                            
                            <div className="mb-2">
                                <FormSelect
                                label="Jenis Kelamin"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={genderOption}
                                error={errors.gender}
                                />
                            </div>

                            <div className="mb-3">
                                <FormTextArea
                                label="Alamat"
                                name="address"
                                value={formData.address}
                                placeholder="Masukan Alamat Lengkap"
                                onChange={handleChange}
                                error={errors.address}
                                rows={3}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between"> 
                                <Button 
                                variant="primary" 
                                label={formLoading ? "Saving..." : "Save"} 
                                size="medium" 
                                type="submit"
                                disabled={formLoading}/> 

                                <Button 
                                variant="danger" 
                                label="Close" 
                                size="medium" 
                                onClick={() => {
                                resetForm();
                                setEditId(null);
                                setShowForm(false);
                                }}/>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <div className="uppercase text-2xl font-bold text-center mb-6">
                Detail pasien
            </div>

            {patient && (
            <>
            <div className="bg-white border-2 border-black rounded-lg p-6 mb-6 shadow-6">
                <div className="flex justify-between item-start mb-4">
                    <h2 className="font-bold text-xl">Informasi pasien</h2>
                    <div className="flex gap-2">
                        
                        <Button 
                        variant="warning" 
                        label="📅 Buat Appointment" 
                        onClick={() => navigate("/calendar", { state: { patientId: id } })}/>
                        
                        
                                <Button
                                richChildren
                                size="small"
                                variant="primary"
                                onClick={() => {
                                    setEditId(patient?.id);
                                    setShowForm(true);
                                }}>
                                Update </Button>
                    </div>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-gray-700">←</label>
                        <p className="font-semibold text-gray-700">ID: {patient.id}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Nama:</label>
                        <p className="text-gray-900">{patient.name}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Email:</label>
                        <p className="text-gray-900">{patient.email}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Telepon:</label>
                        <p className="text-gray-900">{patient.phone}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Tanggal Lahir:</label>
                        <p className="text-gray-900">{patient.dateOfBirth}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700">Jenis Kelamin:</label>
                        <p className="text-gray-900">{patient.gender}</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="font-semibold text-gray-700">Alamat:</label>
                        <p className="text-gray-900">{patient.address}</p>
                    </div>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-6 shadow-sm mt-4">
                <h2 className="text-xl font-bold mb-4">Riwayat Kunjungan</h2>

                {!patient.history || patient.history.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada riwayat kunjungan</p>
                ) : (
                    <div className="space-y-4">
                        {patient.history.map((visit) => (
                            <div key={visit.id} className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg">{visit.diagnosis}</h3>
                                        <p className="text-sm text-gray-600">Dokter: {visit.doctor}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{visit.date}</span>
                                </div>
                                <p className="text-gray-700">{visit.notes}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </>
            )}
        </div>
    )

}