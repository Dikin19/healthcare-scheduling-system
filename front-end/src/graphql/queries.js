import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
    query GetPatients ($search: String) {
        patients (search: $search) {
            id
            name
            email
            phone
        }
    }
`;


export const GET_PATIENT_DETAIL = gql`
    query GetPatientDetail($id: ID!) {
        patient(id: $id) {
            id
            name
            email
            phone
            address
            dateOfBirt
            gender
            history {
                id
                date
                diagnosis
                doctor
                notes
            }
        }
    }
`