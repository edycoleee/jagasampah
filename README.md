APLIKASI JAGA SAMPAH
1. LANDING
2. REGISTER (username, email, password) => default user
3. FORGOT PASSWORD (email)
4. LOGIN (email, password)
5. DASHBOARD (logout)
(username, tipe user, nama bidang, bagian , no telp, email)
6. SIDE MENU
(Dashboard, Profile Pengguna, Residu TPA, Pengelolaan TPA, Sampah 3R, 
Data Bank Sampah, Data Driver, Data User, Lapor Sampah)
(Laporan => TPA harian, 3Rharian)
7. PROFILE PENGGUNA (Data Pengguna, Update Email & Password)
CRUD Data Pengguna
(User Name, Nama Bidang, Tugas, No Telp, Email, 
Default TPA, Default TPST, Default Bank Sampah) 
8. Residu TPA Harian
User CRUD 
(lokasi TPA, Tanggal, No Kendaraan, Driver, Jenis, Asal
Vol Rit, Faktor Kali, Vol M3, Vol Ton)
Cari Data by TPA dan Tanggal
Cari Data by No Kendaraan
admin Uploud CSV data sampah
loading file => Uploud Content Data to Database
9. Pengelolaan Sampah TPA
CRUD (lokasi TPA, Tanggal, Organik(Daun dll), Plastik
Kertas, Kaca, Karet, Kayu, Lain2)
Cari Data by TPA dan Tanggal
10. Sampah 3R
CRUD (Lokasi Bank Sampah, Tanggal, Organik(Daun dll), Plastik
Kertas, Kaca, Karet, Kayu, Lain2)
Cari Data by Tanggal
11. Data Bank Sampah
CRUD (Nama, Pengelola, Alamat, Lokasi, Kecamatan, Desa, Langitude,
 Longitude, SK Penetapan, Keterangan)
Cari by Kecamatan
12. Data Driver
CRUD (Nama, Nomor Kendaraan, Jenis, Asal Sampah, Faktor Kali)
Cari by No Kendaraan
13. Data User
RU (tipe user : admin / user)
14. Lapor Sampah
User Lapor CR (Latitude, longitude, Lokasi, No HP, Keterangan
Gambar1, Gambar2)
Admin Tindak Lanjut CRUD (proses, tgl Jadwal, Ket Jadwal,
tgl jemput, ket Jemput, Gambar)
15. Laporan TPA Harian
16. Laporan Sampah 3R Harian
------------------------------------------------------
"dependencies": {
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.56",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "firebase": "^7.24.0",
    "leaflet": "^1.7.1",
    "moment": "^2.29.1",
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-leaflet": "^2.7.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "xlsx": "^0.16.8"
  }
--------------------------------------------------------