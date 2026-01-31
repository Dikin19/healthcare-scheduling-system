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