export default function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder
}) {

    return (

        <div>
            <label className="block font-semibold mb-1">
                {label}
            </label>

            <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border-2 rounded px-3 py-2 focus:outline-none focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'}`}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        
        </div>

    )

}