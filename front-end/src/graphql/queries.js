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
            dateOfBirth
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

export const CREATE_PATIENT = gql`
    mutation CreatePatient($input: PatientInput) {
        createPatient(input: $input) {
            id
            name
            email
            phone
            address
            dateOfBirth
            gender
        }
    }
`;

export const UPDATE_PATIENT = gql`
    mutation UpdatePatient($id: ID!, $input: PatientInput!) {
        updatePatient(id: $id, input: $input) {
            id
            name
            email
            phone
            address
            dateOfBirth
            gender
        }
    }

`

export const GET_APPOINTMENTS = gql`
    query GetAppointments {
        appointments {
        id
        patientId
        patientName
        date
        time
        doctor
        status
        type
        }
    }
`;

export const CREATE_APPOINTMENT = gql`
    mutation CreateAppointment($input: AppointmentInput!) {
        createAppointment(input: $input) {
            id
            patiendId
            patientName
            date
            time
            doctor
            status
            type
        }
    }
`;