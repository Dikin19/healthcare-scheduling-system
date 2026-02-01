import { ApolloLink, Observable } from "@apollo/client";
import { allPatients, patientHistory, appointments } from "./mocks";




let patientIdCounter = 11

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
            
            else if (operationName === "GetAppointments") {
                result = {
                    data: {
                        appointments: appointments
                    }
                };
            }

            else if (operationName === "CreatePatient") {
                const newPatient = {
                    id: String(patientIdCounter++),
                    ...variables.input
                };
                allPatients.push(newPatient);
                result = {
                    data: {
                        createPatient: newPatient
                    }
                };
            }

            else if (operationName === "UpdatePatient"){

                const index = allPatients.findIndex(p => p.id ===  variables.id);
                
                if(index !== -1) {
                    allPatients[index] = {
                        ...allPatients[index],
                        ...variables.input
                    };
                    result = {
                        data: {
                            updatePatient: allPatients[index]
                        }
                    };
                }
                else{
                    result = {
                        data: {
                            updatePatient: null
                        }
                    };
                }
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