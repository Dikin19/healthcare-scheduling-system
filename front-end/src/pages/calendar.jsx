
import { GET_APPOINTMENTS, GET_PATIENTS} from "../graphql/queries";
import {useState} from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/button";
import { useQuery, useMutation } from "@apollo/client/react";
import { isDatePassed } from "../helpers/isDatePassed.js";
import { getStatusLabel, getStatusColor } from "../helpers/labelColorStatus.js";


export default function Calendar(params) {

    const [formErrors, setFormErrors] = useState({});
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    const {data, loading, error} = useQuery(GET_APPOINTMENTS)
    console.log("apa data apointment masuk?", data)
    const {data: patienstData} = useQuery(GET_PATIENTS, {variables: {search: ""}})

    const [formData, setFormData] = useState({

        patient: location.state?.patientId || "",
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
        if(apt.status === "scheduled" && isDatePassed(apt.date)) {
            return { ...apt, status: "completed"};
        }
        return apt;
    });

    const appointmentsByDate = appointments.reduce((acc, apt)=> {
        if(!acc[apt.date]){
            acc[apt.date] = [];
        }
        acc[apt.date].push(apt);
        return acc;
    }, {})

    const dates = Object.keys(appointmentsByDate).sort((a,b) => new Date(b) - new Date(a));

    const statusCounts = appointments.reduce((acc, apt) => {
        acc[apt.status] = (acc[apt.status] || 0) + 1;
        return acc;
    }, {});


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

