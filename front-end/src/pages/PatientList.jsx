import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS } from "../graphql/queries";
import tableStyles from "../components/table/TableComponent";
import { usePatientStore } from "../store/patientStore";
import { useMemo } from "react";
import Search from "../components/search/search";
import Button from "../components/button/button";
import { useNavigate } from "react-router-dom"



export default function PatientList() {

    const search = usePatientStore((s) => s.search);

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



    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (!data || !data.patients) return <div>No data</div>;

    return (

        <div className={tableStyles.container}>

            <div className="uppercase text-lx font-bold text-center mb-4 mt-4">
                Healthcare Scheduling System
            </div>

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
                        <tr key={patient.id} cclassName="hover:bg-blue-50 transition-colors cursor-pointer">
                            <td className={tableStyles.td}><div className="text-center">{patient.id}</div></td>
                            <td className={tableStyles.td}>{patient.name}</td>
                            <td className={tableStyles.td}>{patient.email}</td>
                            <td className={tableStyles.td}>{patient.phone}</td>
                            <td className={tableStyles.td}>
                                <Button
                                richChildren
                                size="small"
                                variant="success"
                                onClick={() => navigate(`/patient/${patient.id}`)}>
                                Detail </Button></td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
}