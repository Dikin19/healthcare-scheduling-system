
import { GET_APPOINTMENTS, GET_PATIENTS, CREATE_APPOINTMENT } from "../graphql/queries";
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/button";
import { useQuery, useMutation } from "@apollo/client/react";
import { isDatePassed } from "../helpers/isDatePassed.js";
import { getStatusLabel, getStatusColor } from "../helpers/labelColorStatus.js";
import FormInput from "../components/form/formInput";
import FormSelect from "../components/form/formSelect";
import FormTextarea from "../components/form/formTextarea";



export default function Calendar(params) {

    const [formErrors, setFormErrors] = useState({});
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { data, loading, error } = useQuery(GET_APPOINTMENTS);
    console.log("apa data apointment masuk?", data);
    const { data: patienstData } = useQuery(GET_PATIENTS, { variables: { search: "" } });

    const [createAppointment, { loading: creating }] = useMutation(CREATE_APPOINTMENT, {
        refetchQueries: [{ query: GET_APPOINTMENTS }]
    });

    const [formData, setFormData] = useState({

        patientId: location.state?.patientId || "",
        date: "",
        time: "",
        doctor: "",
        type: "",
        status: "scheduled"
    });

    const rawAppointment = data?.appointments || [];
    // console.log("data3", rawAppointment)
    const patients = patienstData?.patients || [];
    // console.log("data2", patients)

    const appointments = rawAppointment.map(apt => {
        if (apt.status === "scheduled" && isDatePassed(apt.date)) {
            return { ...apt, status: "completed" };
        }
        return apt;
    });

    const appointmentsByDate = appointments.reduce((acc, apt) => {
        if (!acc[apt.date]) {
            acc[apt.date] = [];
        }
        acc[apt.date].push(apt);
        return acc;
    }, {})

    const dates = Object.keys(appointmentsByDate).sort((a, b) => new Date(b) - new Date(a));

    const statusCounts = appointments.reduce((acc, apt) => {
        acc[apt.status] = (acc[apt.status] || 0) + 1;
        return acc;
    }, {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.patientId) errors.patientId = "Pilih pasien";
        if (!formData.date) errors.date = "Pilih tanggal";
        if (!formData.time) errors.time = "Pilih waktu";
        if (!formData.doctor) errors.doctor = "Masukan nama dokter";
        if (!formData.type) errors.type = "Pilih tipe appointment";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await createAppointment({
                variables: {
                    input: formData
                }
            });
            toast.success("Appointment berhasil dijadwalkan!");
            setShowForm(false);
            setFormData({
                patientId: "",
                date: "",
                time: "",
                doctor: "",
                type: "",
                status: "scheduled"
            });
        } catch (error) {
            toast.error(" Error: " + error.message);
        }
    };
    const options = [
        { value: "Dr. Siti Nurhaliza" },
        { value: "Dr. Ahmad Dahlan" },
        { value: "Dr. Budi Santoso" },
        { value: "Dr. Rina Marlina" }

    ]



    return (

        <div className="p-8 max-w-7xl mx-auto">

            <Button
                label="← Back"
                variant="secondary"
                onClick={() => navigate("/")}
            />


            <div className="uppercase text-2xl font-bold text-center mb-6">
                Calendar - Monthly Appointment
            </div>


            <div className="mb-6 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg border-2 border-blue-300 font-semibold">
                        🗓️ Terjadwal: {statusCounts.scheduled || 0}
                    </div>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg border-2 border-green-300 font-semibold">
                        ✅ Selesai: {statusCounts.completed || 0}
                    </div>
                    <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg border-2 border-red-300 font-semibold">
                        ❌ Dibatalkan: {statusCounts.cancelled || 0}
                    </div>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                >
                    {showForm ? "✕ Tutup Form" : "+ Buat Appointment Baru"}
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl w-full sm:w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleFade shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <h3 className="text-xl font-bold mb-4">Buat Appointment Baru</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <FormSelect
                                label="Pasien"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                options={patients.map(p => ({ label: p.name, value: p.id }))}
                            />

                            <FormInput
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={`w-full border-2 ${formErrors.date ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                            />

                            <FormInput
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={`w-full border-2 ${formErrors.time ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                            />

                            <div>
                                <label className="block font-semibold mb-1">Dokter *</label>
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${formErrors.doctor ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                                >
                                    <option value="">Pilih Dokter</option>
                                    <option value="Dr. Siti Nurhaliza">Dr. Siti Nurhaliza</option>
                                    <option value="Dr. Ahmad Dahlan">Dr. Ahmad Dahlan</option>
                                    <option value="Dr. Budi Santoso">Dr. Budi Santoso</option>
                                    <option value="Dr. Rina Marlina">Dr. Rina Marlina</option>
                                </select>
                                {formErrors.doctor && <p className="text-red-500 text-sm mt-1">{formErrors.doctor}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Tipe Appointment *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${formErrors.type ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                                >
                                    <option value="">Pilih Tipe</option>
                                    <option value="Checkup">Checkup</option>
                                    <option value="Konsultasi">Konsultasi</option>
                                    <option value="Pemeriksaan">Pemeriksaan</option>
                                    <option value="Perawatan Gigi">Perawatan Gigi</option>
                                    <option value="Follow Up">Follow Up</option>
                                </select>
                                {formErrors.type && <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Status *</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="scheduled">Scheduled</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                                >
                                    {creating ? "Memproses..." : "Buat Appointment"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setFormData({
                                            patientId: "",
                                            date: "",
                                            time: "",
                                            doctor: "",
                                            type: "",
                                            status: "scheduled"
                                        });
                                        setFormErrors({});
                                    }}
                                    className="flex-1 bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dates.map((date) => {
                    const dayAppointments = appointmentsByDate[date];
                    const dateObj = new Date(date);
                    const dayName = dateObj.toLocaleDateString("id-ID", { weekday: "long" });
                    const dateFormatted = dateObj.toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                    return (
                        <div key={date} className="bg-white border-2 border-black rounded-lg p-6 shadow-sm">
                            <div className="mb-4 border-b-2 border-gray-300 pb-3">
                                <h3 className="text-lg font-bold">{dayName}</h3>
                                <p className="text-sm text-gray-600">{dateFormatted}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                                    {dayAppointments.length} appointment(s)
                                </span>
                            </div>

                            <div className="space-y-3">
                                {dayAppointments.sort((a, b) => a.time.localeCompare(b.time)).map((apt) => (
                                    <div
                                        key={apt.id}
                                        className={`border-2 rounded-lg p-4 ${getStatusColor(apt.status)} hover:shadow-md transition-shadow cursor-pointer`}
                                        onClick={() => navigate(`/patient/${apt.patientId}`)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg">{apt.patientName}</h4>
                                                <p className="text-sm">{apt.type}</p>
                                            </div>
                                            <span className="text-xl font-bold">{apt.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-current opacity-70">
                                            <p className="text-sm font-semibold">{apt.doctor}</p>
                                            <span className="text-xs uppercase font-bold px-2 py-1 bg-white bg-opacity-50 rounded">
                                                {getStatusLabel(apt.status)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {appointments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-xl">Tidak ada appointment yang dijadwalkan</p>
                </div>
            )}
        </div>

    )



}

