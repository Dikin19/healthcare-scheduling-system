



const statusLabelColor = {
    scheduled: {
        label: "Terjadwal",
        color: "bg-blue-100 text-blue-800 border-blue-300",
    },
    completed: {
        label: "Selesai",
        color: "bg-green-100 text-green-800 border-green-300",
    },
    cancelled: {
        label: "Dibatalkan",
        color: "bg-red-100 text-red-800 border-red-300",
    },
};

export const getStatusLabel = (status) => {
    return statusLabelColor[status]?.label || status;
};

export const getStatusColor = (status) => {
    return (
        statusLabelColor[status]?.color ||
        "bg-gray-100 text-gray-800 border-gray-300"
    );
};
