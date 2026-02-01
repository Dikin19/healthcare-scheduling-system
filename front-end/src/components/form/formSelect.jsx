
export default function FormSelection({
    
    label,
    name,
    value,
    onChange,
    options

}) {

    return (
        <>
            <label className="block font-semibold mb-1">
                {label}
            </label>
            <select 
                name={name} 
                value={value}
                onChange={onChange}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
                {options?.map((option) => (
                    <option 
                        key={option.value}
                        value={option.value}
                    > 
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}
