import { ApolloLink, Observable } from "@apollo/client";
import { allPatients, patientHistory } from "./mocks";


export const mockLink = new ApolloLink((operation) => {

    return new Observable((observer) => {

        const { query, variables } = operation;

        const definition = query.definitions[0];

        const operationName = definition.name?.value;

        let result;

        try {

            if (operationName === "GetPatients") {

                result = {
                    data: {
                        patients: allPatients
                    }
                };
            }

            else if (operationName === "GetPatientDetail") {
                const patient = allPatients.find(p => p.id === variables.id);
                result = {
                    data: {
                        patient: patient ? {
                            ...patient,
                            history: patientHistory[variables.id] || []
                        } : null
                    }
                };
            }

            else {
                result = {
                    errors: [{ message: `Unknown operation: ${operationName}` }]
                };
            }


            setTimeout(() => {
                observer.next(result);
                observer.complete()
            }, 100);

        } catch (error) {
            observer.error(error);

        }
    })
})