export let allPatients = [
    { id: "1", name: "Budi Santoso", email: "budi@mail.com", phone: "081223456543", address: "Jl. Sudirman No. 123, Jakarta", dateOfBirth: "1990-05-15", gender: "Laki-laki" },
    { id: "2", name: "Dul Aziz", email: "Dul@mail.com", phone: "081212344241", address: "Jl. Thamrin No. 45, Jakarta", dateOfBirth: "1985-08-20", gender: "Laki-laki" },
    { id: "3", name: "Buy Setiawan", email: "Buy@mail.com", phone: "081109876541", address: "Jl. Gatot Subroto No. 67, Jakarta", dateOfBirth: "1992-03-10", gender: "Laki-laki" },
    { id: "4", name: "Baron Wijaya", email: "Baron@mail.com", phone: "081110987654", address: "Jl. Kuningan No. 89, Jakarta", dateOfBirth: "1988-11-25", gender: "Laki-laki" },
    { id: "5", name: "Reno Prasetyo", email: "Reno@mail.com", phone: "081111323456", address: "Jl. Senopati No. 12, Jakarta", dateOfBirth: "1995-07-08", gender: "Laki-laki" },
    { id: "6", name: "Krisna Putra", email: "Krisna@mail.com", phone: "081111567890", address: "Jl. Kemang No. 34, Jakarta", dateOfBirth: "1987-12-18", gender: "Laki-laki" },
    { id: "7", name: "Fadhil Rahman", email: "Fadhil@mail.com", phone: "081110987654", address: "Jl. Menteng No. 56, Jakarta", dateOfBirth: "1993-04-22", gender: "Laki-laki" },
    { id: "8", name: "Yudi Hartono", email: "Yudi@mail.com", phone: "081111234567", address: "Jl. Tebet No. 78, Jakarta", dateOfBirth: "1991-09-14", gender: "Laki-laki" },
    { id: "9", name: "Ical Maulana", email: "Ical@mail.com", phone: "081110987654", address: "Jl. Cikini No. 90, Jakarta", dateOfBirth: "1989-06-30", gender: "Laki-laki" },
    { id: "10", name: "Agus Susanto", email: "Agus@mail.com", phone: "081111234567", address: "Jl. Salemba No. 23, Jakarta", dateOfBirth: "1994-02-17", gender: "Laki-laki" }
];


export let patientHistory = {
    "1": [
        { id: "h1", date: "2026-01-15", diagnosis: "Checkup", doctor: "Dr. Siti Nurhaliza", notes: "Pemeriksaan rutin, hasil baik." }
    ],
    "2": [
        { id: "h3", date: "2025-12-15", diagnosis: "Hipertensi", doctor: "Dr. Budi Santoso", notes: "Kontrol tekanan darah rutin sudah diselesaikan. Tekanan darah 130/85, diberi obat antihipertensi. Kontrol rutin setiap bulan." },
        { id: "h2", date: "2026-01-20", diagnosis: "Konsultasi", doctor: "Dr. Budi Santoso", notes: "Konsultasi kesehatan, tidak ada keluhan baru." }
    ],
    "3": [
        { id: "h5", date: "2026-01-10", diagnosis: "Alergi", doctor: "Dr. Siti Nurhaliza", notes: "Penanganan alergi makanan sudah diselesaikan. Diberi antihistamin dan kortikosteroid. Hindari makanan pemicu alergi (seafood)." }
    ],
    "4": [
        { id: "h11", date: "2026-02-03", diagnosis: "Perawatan Gigi", doctor: "Dr. Rina Marlina", notes: "Perawatan gigi rutin, tidak ditemukan masalah." }
    ],
    "5": [
        { id: "h12", date: "2026-02-03", diagnosis: "Checkup", doctor: "Dr. Ahmad Dahlan", notes: "Pemeriksaan kesehatan umum, hasil normal." }
    ],
    "6": [
        { id: "h9", date: "2025-11-10", diagnosis: "Sakit Perut", doctor: "Dr. Siti Nurhaliza", notes: "Penanganan maag akut sudah diselesaikan. Diberi obat antasida dan PPI. Hindari makanan pedas dan asam, makan teratur." },
        { id: "h13", date: "2026-02-05", diagnosis: "Konsultasi", doctor: "Dr. Siti Nurhaliza", notes: "Konsultasi lanjutan, kondisi stabil." }
    ],
    "8": [
        { id: "h10", date: "2025-11-15", diagnosis: "Sakit Kepala Migrain", doctor: "Dr. Siti Nurhaliza", notes: "Penanganan migrain sudah diselesaikan. Diberi obat pereda nyeri dan anti migrain. Kurangi stress, tidur cukup, dan hindari pemicu migrain." }
    ],
    "9": [
        { id: "h7", date: "2026-01-18", diagnosis: "Checkup", doctor: "Dr. Ahmad Dahlan", notes: "Pemeriksaan kesehatan, appointment dibatalkan oleh pasien." }
    ],
    "10": [
        { id: "h8", date: "2026-01-22", diagnosis: "Konsultasi", doctor: "Dr. Siti Nurhaliza", notes: "Konsultasi dibatalkan, pasien tidak hadir." }
    ],
};


export let appointments = [
    { id: "a1", patientId: "1", patientName: "Budi Santoso", date: "2026-01-15", time: "09:00", doctor: "Dr. Siti Nurhaliza", status: "completed", type: "Checkup" },
    { id: "a2", patientId: "2", patientName: "Dul Aziz", date: "2026-01-20", time: "10:00", doctor: "Dr. Budi Santoso", status: "completed", type: "Konsultasi" },

    { id: "a7", patientId: "9", patientName: "Ical Maulana", date: "2026-01-18", time: "08:30", doctor: "Dr. Ahmad Dahlan", status: "cancelled", type: "Checkup" },
    { id: "a8", patientId: "10", patientName: "Agus Susanto", date: "2026-01-22", time: "15:00", doctor: "Dr. Siti Nurhaliza", status: "cancelled", type: "Konsultasi" },

    { id: "a11", patientId: "4", patientName: "Baron Wijaya", date: "2026-02-03", time: "09:00", doctor: "Dr. Rina Marlina", status: "scheduled", type: "Perawatan Gigi" },
    { id: "a12", patientId: "5", patientName: "Reno Prasetyo", date: "2026-02-03", time: "10:30", doctor: "Dr. Ahmad Dahlan", status: "scheduled", type: "Checkup" },
    { id: "a13", patientId: "6", patientName: "Krisna Putra", date: "2026-02-05", time: "13:00", doctor: "Dr. Siti Nurhaliza", status: "scheduled", type: "Konsultasi" },
]