import { useEffect, useState } from "react";
import { usePatientStore } from "../../store/patientStore";




export default function Search() {

    const setSearch = usePatientStore((s) => s.setSearch);

    const [value, setValue] = useState("");

    useEffect(() => {

        const t = setTimeout(() => setSearch(value), 500);
        return () => clearTimeout(t)

    }, [value])


    return (

        <input
            className="border p-2 mb-2 rounded-lg w-full"
            placeholder="Search patient.."
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );

}