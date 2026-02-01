
import {useState, useEffect} from "react"
import { useQuery, useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { GET_PATIENTS, CREATE_PATIENT, GET_PATIENT_DETAIL, UPDATE_PATIENT} from "../graphql/queries";


export default function UsePatientForm(onSuccess, id) {

    const isEdit = !!id;

    const initialFormData = {
        name: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        gender: "Laki-laki"
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({})

    const {data} = useQuery(GET_PATIENT_DETAIL,{
        variables: {id},
        skip: !isEdit
    })

    const [createPatient, {loading: creating}] = useMutation(CREATE_PATIENT, {
        refetchQueries: [{query: GET_PATIENTS, variables: {search: ""}},
        ]
    });

    const [updatePatient, {loading: updating}] = useMutation(UPDATE_PATIENT, {
        refetchQueries: [
            {query: GET_PATIENTS, variables: {search: ""}},
            {query: GET_PATIENT_DETAIL, variables: {id}},

        ]
    });

    useEffect(() => {

        if(isEdit && data?.patient){
            setFormData({
                name: data.patient.name,
                email: data.patient.email,
                phone: data.patient.phone,
                address: data.patient.address,
                dateOfBirth: data.patient.dateOfBirth,
                gender: data.patient.gender
            });
        }

    }, [isEdit, data]);

    

    const validate = () => {

        const newErrors = []

        if (!formData.name.trim()){
            newErrors.name = "Nama wajib diisi"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone wajib diisi"
        
        }
        if (!formData.address.trim()) {
            newErrors.address = "Alamat wajib diisi"
        }

        if (!formData.dateOfBirth.trim()) {
            newErrors.dateOfBirth = " Tanggal wajib diisi"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            toast.error("Mohon lengkapi semua field yang wajib diisi!", {
                position: "top-right"
            });
            return;
        }

        try {

            if(isEdit){
                await updatePatient({
                    variables: {
                        id,
                        input: formData
                    }
                });
                toast.success("Pasien berhasil diupdate!", {
                    position: "top-right"
                });
            } else {
            
                await createPatient({
                variables : {
                    input: formData
                }
            });
            toast.success("pasien berhasil ditambahkan", {
                position: "top-right"
            });
         }

            resetForm();
            
            if (onSuccess) {
                onSuccess();
            }

            
        } catch (error) {
            toast.error("Terjadi kesalahan: " + error.message, {
                position: "top-right"
            });
            
        }

    };

    return {
        formData,
        errors,
        handleSubmit,
        handleChange,
        resetForm,
        loading: creating || updating
    }


}