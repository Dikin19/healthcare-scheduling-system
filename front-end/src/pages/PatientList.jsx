import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS } from "../graphql/queries";
import tableStyles from "../components/table/Table";
import { usePatientStore } from "../store/patientStore";
import { useMemo, useState } from "react";
import Search from "../components/search/search";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom"
import FormInput from "../components/form/formInput";
import FormSelect from "../components/form/formSelect";




export default function PatientList() {

    const search = usePatientStore((s) => s.search);
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_PATIENTS, { variables: { search: "" } });
    // console.log("apa data masuk", data);
    const dataPatients = data?.patients

    const patients = useMemo(() => {

        if (!dataPatients) return [];
        if (!search) return dataPatients;

        const searchLower = search.toLowerCase();

        return dataPatients.filter(
            p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.email.toLowerCase().includes(searchLower) ||
                p.phone.includes(search)

        );

    }, [dataPatients, search])


    return (

        <div className={tableStyles.container}>
                
            <div className="flex justify-center items-center text-center font-bold text-xl rounded-lg">
                {loading && <div>Loading...</div>}
        
                {!loading && error && (<div>Error: {error.message}</div>)}

                {!loading && !error && !data && (<div>No data</div>)}
        
            </div>

            <div className="uppercase text-lx font-bold text-center mb-4 mt-4">
                Healthcare Scheduling System
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-6">
                <div>
                    <Button size="small" label="+ Add New Patient" variant="success" onClick={()=> setShowForm(true)}/>
                </div>

            </div>

            {showForm && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55">
                    <div className="bg-white p-6 rounded-xl w-[30%] max-w-[90%] animate-scaleFade shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        
                        <div className="mb-2">
                            <FormInput
                            label="Nama Lengkap"
                            name="name"
                            placeholder="Masukan Nama Lengkap"
                            />
                        </div>

                        <div className="mb-2">
                            <FormSelect
                            label="Jenis Kelamin"

                            />
                        </div>
                        
                            <div className="flex justify-end"> <Button variant="primary" label="Close" size="small" onClick={() => setShowForm(false)}/> </div>
                    </div>
                </div>
            )}

            <Search />
            <table className={tableStyles.table}>
                <thead className={tableStyles.thead}>
                    <tr>
                        <th className={tableStyles.th}>ID</th>
                        <th className={tableStyles.th}>NAME</th>
                        <th className={tableStyles.th}>EMAIL</th>
                        <th className={tableStyles.th}>PHONE</th>
                        <th className={tableStyles.th}>ACTION</th>
                    </tr>
                </thead>

                <tbody className={tableStyles.tbody}>
                    {patients?.map((patient) => (
                        <tr key={patient.id} className="hover:bg-blue-50 transition-colors cursor-pointer">
                            <td className={tableStyles.td}><div className="text-center">{patient.id}</div></td>
                            <td className={tableStyles.td}>{patient.name}</td>
                            <td className={tableStyles.td}>{patient.email}</td>
                            <td className={tableStyles.td}>{patient.phone}</td>
                            <td className={tableStyles.td}>
                                <div className="flex justify-center gap-2">
                                <Button
                                richChildren
                                size="small"
                                variant="warning"
                                onClick={() => navigate(`/patient/${patient.id}`)}>
                                Detail </Button>
                                <Button
                                richChildren
                                size="small"
                                variant="primary"
                                onClick={() => navigate(`/patient/${patient.id}`)}>
                                update Patient </Button></div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
}