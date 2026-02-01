import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router"
import { GET_PATIENT_DETAIL } from "../graphql/queries";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom"




export default function PatientDetail() {

    const { id } = useParams();
    console.log(id, ">>>>>")

    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_PATIENT_DETAIL, { variables: { id } })

    console.log("apakah data masuk", data)

    if (loading) return <div className="p-8 text-center text-lg font-bold">WAIT FOR A MINUTE ...</div>;
    if (error) return <div className="p-8 text-center text-lg font-bold">Error: {error.message}</div>;
    if (!data) return <div className="p-8 text-center text-lg font-bold">Patient not found</div>;

    const patient = data?.patient
    console.log("apakah data terbaru masuk", patient)

    return (
        <div className="p-8 max-w-6xl mx-auto border">

            <div>
                <Button 
                variant="secondary" 
                label="← Back to List" 
                onClick={() => navigate("/")}
                />      
            </div>

            <div className="uppercase text-2xl font-bold text-center mb-6">
                Detail pasien
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-6 mb-6 shadow-6">
                <div className="flex justify-between item-start mb-4">
                    <h2 className="font-bold text-xl">Informasi pasien</h2>
                    <div className="flex gap-2">
                        <Button 
                        variant="warning" 
                        label="📅 Buat Appointment" 
                        onClick={() => navigate("/calendar", { state: { patientId: id } })}/>
                        <Button 
                        variant="success" 
                        label="Edit Pasien" 
                        onClick={() => navigate(`/patient/edit/${id}`)}/>
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
        </div>
    )

}