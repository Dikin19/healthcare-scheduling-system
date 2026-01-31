import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS } from "../graphql/queries";
import tableStyles from "../components/tableComponent/TableComponent";



export default function PatientList() {
    const { data, loading, error } = useQuery(GET_PATIENTS);
    console.log("apa data masuk", data);
    const patients = data?.patients;

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (!data || !data.patients) return <div>No data</div>;

    return (

        <div className={tableStyles.container}>

            <div className="uppercase text-lx font-bold text-center mb-4 mt-4">
                Healthcare Scheduling System
            </div>

            <table className={tableStyles.table}>
                <thead className={tableStyles.thead}>
                    <tr>
                        <th className={tableStyles.th}>ID</th>
                        <th className={tableStyles.th}>NAME</th>
                        <th className={tableStyles.th}>EMAIL</th>
                        <th className={tableStyles.th}>PHONE</th>
                    </tr>
                </thead>

                <tbody className={tableStyles.tbody}>
                    {patients?.map((patient) => (
                        <tr key={patient.id} cclassName="hover:bg-blue-50 transition-colors cursor-pointer">
                            <td className={tableStyles.td}><div className="text-center">{patient.id}</div></td>
                            <td className={tableStyles.td}>{patient.name}</td>
                            <td className={tableStyles.td}>{patient.email}</td>
                            <td className={tableStyles.td}>{patient.phone}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
}