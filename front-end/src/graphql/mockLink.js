import { ApolloLink, Observable } from "@apollo/client";
import { allPatients } from "./mocks";


export const mockLink = new ApolloLink((operation) => {

    return new Observable((observer) => {

        const { query } = operation;

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
            };

            setTimeout(() => {
                observer.next(result);
                observer.complete()
            }, 100);

        } catch (error) {
            observer.error(error);

        }
    })
})