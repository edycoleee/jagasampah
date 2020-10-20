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

export const CL_ASALSAMPAH = [
  "TPS",
  "PASAR",
  "PERUMAHAN",
  "PERUSAHAAN",
  "JALAN",
  "LAINNYA",
];

export const CL_JNSKENDARAAN1 = [
  "CONTAINER",
  "DUMP TRUCK",
  "RODA3",
  "PICKUP",
  "TRUK KAYU",
  "LAINNYA",
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
//export const CL_DRIVER = ["TRIHADI", "ARIF", "KUSNADI", "KUSNIN", "LAINNYA"];

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
