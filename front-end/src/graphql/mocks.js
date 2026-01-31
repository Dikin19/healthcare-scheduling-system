import { GET_PATIENTS } from "./queries";

export const mocks = [
    {
        request: {
            query: GET_PATIENTS,
        },
        result: {
            data: {
                patients: [
                    { id: "1", name: "Budi", email: "budi@mail.com", phone: "081223456543", },
                    { id: "2", name: "Dul", email: "Dul@mail.com", phone: "081212344241", },
                    { id: "3", name: "Buy", email: "Buy@mail.com", phone: "081109876541", },
                    { id: "4", name: "Baron", email: "Baron@mail.com", phone: "081110987654", },
                    { id: "5", name: "Reno", email: "Reno@mail.com", phone: "081111323456", },
                    { id: "6", name: "Krisna", email: "Krisna@mail.com", phone: "081111567890", },
                    { id: "7", name: "Fadhil", email: "Fadhil@mail.com", phone: "081110987654", },
                    { id: "8", name: "Yudi", email: "Yudi@mail.com", phone: "081111234567", },
                    { id: "9", name: "Ical", email: "Ical@mail.com", phone: "081110987654", },
                    { id: "10", name: "Agus", email: "Agus@mail.com", phone: "081111234567", },
                ]
            }
        }
    }
]