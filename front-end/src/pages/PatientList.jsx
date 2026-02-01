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
import FormTextArea from "../components/form/formTextarea";
import UsePatientForm from "../hooks/usePatientForm";




export default function PatientList() {

    const search = usePatientStore((s) => s.search);
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const navigate = useNavigate()

    const handleSuccess = () => {
        setShowForm(false);
        setEditId(null)
    };

    const { formData, errors, handleSubmit, handleChange, resetForm, loading: formLoading } = UsePatientForm(handleSuccess, editId)

    const { data, loading, error } = useQuery(GET_PATIENTS, { variables: { search: "" } });
    const dataPatients = data?.patients
    // console.log("apakah data masuk",dataPatients)

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

    const genderOption = [
        { value: "Laki-Laki", label: "Laki-laki" },
        { value: "Perempuan", label: "Perempuan" }
    ]

    return (

        <div className={tableStyles.container}>

            <div className="flex justify-center items-center text-center font-bold text-xl rounded-lg">
                {loading && <div>Loading...</div>}

                {!loading && error && (<div>Error: {error.message}</div>)}

                {!loading && !error && !data && (<div>No data</div>)}
            </div>

            <div className="uppercase text-base sm:text-lg md:text-xl font-bold text-center mb-3 sm:mb-4 mt-3 sm:mt-4">
                Healthcare Scheduling System
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-3 justify-center mb-4 sm:mb-6">
                <div>
                    <Button
                        size="small"
                        label="+ Add New Patient"
                        variant="warning"
                        onClick={() => {
                            setEditId(null);
                            setShowForm(true);
                        }} />
                </div>
                <div>
                    <Button
                        size="small"
                        label="📅 Calendar"
                        variant="primary"
                        onClick={() => navigate("/calendar")} />
                </div>

                <div>
                    <Button
                        size="small"
                        label="⚙️ Workflow Builder"
                        variant="danger"
                        onClick={() => navigate("/work-flow-builder")} />
                </div>

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
                                    disabled={formLoading} />

                                <Button
                                    variant="danger"
                                    label="Close"
                                    size="medium"
                                    onClick={() => {
                                        resetForm();
                                        setEditId(null);
                                        setShowForm(false);
                                    }} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Search />
            <div className="overflow-x-auto">
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
                                    <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
                                        <Button
                                            richChildren
                                            size="small"
                                            variant="primary"
                                            onClick={() => navigate(`/patient/${patient.id}`)}>
                                            Detail </Button>

                                        <Button
                                            richChildren
                                            size="small"
                                            variant="success"
                                            onClick={() => {
                                                setEditId(patient.id);
                                                setShowForm(true);
                                            }}>
                                            Update </Button></div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>

        </div>

    );
}