



export default function FormTextarea({

    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    row = 3

}) {

    return (
        <div>
            <label className="block font-semibold mb-1">
                {label}
            </label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                // rows={rows}
                placeholder={placeholder}
                className={`w-full border-2 rounded px-3 py-2 focus:outline-none focus:border-blue-500 
                ${error ? 'border-red-500' : 'border-gray-300'}`}
            />

                {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
                )}

        </div>
    );
}