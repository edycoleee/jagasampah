export const CL_TPA = ["KALIKONDANG", "CANDISARI", "BERAHAN", "LAINNYA"];
export const CL_TPST = ["TPSTSATU", "TPSTDUA", "TPSTTIGA", "TPSTEMPAT"];
export const CL_USER = [
  {
    c_username: "",
    c_tipeuser: ["user", "admin"],
    c_bidang: "",
    c_bagian: "",
    c_nohp: "",
    c_email: "",
    c_createdAt: "",
    c_defTPA: "",
    c_defTPST: "",
    c_defAsal: "",
  },
];

export const CL_KELOLABANK = ["SISWA", "KELMASY", "PEGAWAI", "SWASTA"];
export const CL_BANKSAMPAH = [
  {
    c_nama: "",
    c_alamat: "",
    c_tempat: "",
    c_kecamatan: "",
    c_desa: "",
    c_lang: "",
    c_long: "",
    c_Sktetap: "",
    c_pengelola: "",
    c_keterangan: "",
    c_createdAt: "",
    c_user: "",
  },
];
export const CL_SAMPAH3R = [
  {
    n_plastik: "",
    n_organik: "",
    n_kertas: "",
    n_kaca: "",
    n_karet: "",
    n_kayu: "",
    n_lain: "",
    c_tanggal: "",
    c_bulan: "",
    c_tahun: "",
    c_user: "",
    c_nama: "",
    c_idbank: "",
    nmBank: "",
    c_createdAt: "",
  },
];

export const CL_JNSKENDARAAN = [
  {
    kendaraan: "CONTAINER",
    fkali: 6,
  },
  {
    kendaraan: "DUMP TRUCK",
    fkali: 7,
  },
  {
    kendaraan: "RODA3",
    fkali: 1,
  },
  {
    kendaraan: "PICKUP",
    fkali: 1.5,
  },
  {
    kendaraan: "TRUK KAYU",
    fkali: 8,
  },
  {
    kendaraan: "LAINNYA",
    fkali: 6,
  },
];

export const CL_DRIVER = [
  {
    c_driver: "",
    c_nopol: "",
    c_kendaraan: "",
    c_jenis: "",
    c_fkali: 0,
  },
];

export const CL_SAMPAHHARIAN = [
  {
    c_tanggal: "",
    c_bulan: "",
    c_tahun: "",
    d_tanggal: "",
    c_createdAt: "",
    c_user: "",
    c_driver: "",
    c_nopol: "",
    c_kendaraan: "",
    c_jenis: "",
    c_asal: "",
    n_jmlrit: "",
    n_volm3: "",
    n_volton: "",
    c_tpa: "",
  },
];

export const CL_SAMPAHBULANAN = [
  {
    c_tanggal: "",
    c_bulan: "",
    c_tahun: "",
    d_tanggal: "",
    c_createdAt: "",
    c_user: "",
    c_tpa: "",
    n_jmlrit: "",
    n_volm3: "",
    n_voltonm: "",
  },
];

export const CL_SAMPAH3R1 = [
  {
    c_tanggal: "",
    c_bulan: "",
    c_tahun: "",
    d_tanggal: "",
    c_createdAt: "",
    c_user: "",
    c_asal: "",
    n_plastik: "",
    n_organik: "",
    n_kertas: "",
    n_kaca: "",
    n_karet: "",
    n_kayu: "",
    n_lain2: "",
    n_total: "",
  },
];

export const PROSESLAPOR = ["lapor", "uploud", "jadwal", "jemput"];
export const CL_LAPOR = [
  {
    c_tanggal: "",
    c_bulan: "",
    c_tahun: "",
    c_createdAt: "",
    c_user: "",
    c_lokasi: "",
    c_noHP: "",
    c_lat: "",
    c_lon: "",
    c_ket: "",
    c_namafile1: "",
    c_fileImg1: "",
    c_namafile2: "",
    c_fileImg2: "",
    c_namafile3: "",
    c_fileImg3: "",
    proses: "",
    c_tgljadwal: "",
    c_ketjadwal: "",
    c_tgljemput: "",
    c_ketjemput: "",
    c_userclose: "",
  },
];

export const CL_KECAMTAN = [
  {
    Kecamatan1: {
      DESA: ["DESA1", "DESA2", "DESA3", "DESA4", "DESA5"],
    },
  },
  {
    Kecamatan2: {
      DESA: ["DESA1", "DESA2", "DESA3", "DESA4", "DESA5"],
    },
  },
];

export const CL_BULAN = [
  {
    nama: "Januari",
    kode: "01",
  },
  {
    nama: "Februari",
    kode: "02",
  },
  {
    nama: "Maret",
    kode: "03",
  },
  {
    nama: "April",
    kode: "04",
  },
  {
    nama: "Mei",
    kode: "05",
  },
  {
    nama: "Juni",
    kode: "06",
  },
  {
    nama: "Juli",
    kode: "07",
  },
  {
    nama: "Agustus",
    kode: "08",
  },
  {
    nama: "September",
    kode: "09",
  },
  {
    nama: "Oktober",
    kode: "10",
  },
  {
    nama: "November",
    kode: "11",
  },
  {
    nama: "Desember",
    kode: "12",
  },
];
