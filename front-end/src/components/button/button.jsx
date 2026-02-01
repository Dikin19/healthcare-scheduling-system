

export default function Button({

    richChildren = false,
    children,
    label,
    variant = "primary",
    size = "medium",
    onClick,
    disabled = false,
    fullWidth = false

}) {


    const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer"

    const variantClasses = {

        primary: "bg-blue-500 text-white hover:bg-green-500",
        secondary: "bg-gray-500 text-white hover:bg-gray-700",
        success: "bg-green-500 text-white hover:bg-blue-500",
        danger: "bg-red-500 text-white hover:bg-red-700",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    }

    const sizeClasses = {

        small: "px-3 py-1 text-sm",
        medium: "px-5 py-2 text-base",
        large: "px-7 py-3 text-lg"

    }

    const baseClasses = " rounded-md font-medium transition-all duration-300 ease-in-out transform hover:shadow-md disabled:opacity-50 disable:cursor-not-allowed"

    const fullWidthClass = fullWidth ? "w-full" : "";

    const className = `${cursorClass} ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidthClass}`

    return (

        <button
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {richChildren ? children : <div><p>{label}</p></div>}
        </button>

    )

};