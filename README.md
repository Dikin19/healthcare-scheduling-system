# Healthcare Scheduling System

hi, ini adalah aplikasi scheduling untuk manage data pasien dan jadwal konsultasi. dibikin pake React + Vite.

## setup awal

install dulu dependencies-nya:

```bash
npm install
```

## fitur yang ada

- **daftar pasien** - lihat semua data pasien dalam bentuk tabel, bisa search.
- **detail pasien** - info lengkap tiap pasie dan riwayat appointment
- **form tambah/edit pasien** - tambahin pasien baru atau edit data yang udah ada
- **kalender** - view jadwal appointment pasien per hari/minggu/bulan
- **workflow builder** - bikin alur kerja custom buat scheduling

## cara jalanin

development mode:

```bash
npm run dev
```

terus buka browser ke `http://localhost:5173`

build production:

```bash
npm run build
```

preview build hasil:

```bash
npm run preview
```

## tech stack

- React 19
- Vite
- Tailwind CSS
- Zustand (state management)
- Apollo Client + GraphQL
- React Router

## catatan

- data masih pake mock GraphQL
- kalo ada error pas install, coba hapus `node_modules` sama `package-lock.json` terus install ulang


- Terimakasih dan Semoga berjalan dengan lancar dan selamat mencoba.

## Muhamad Sodikin
