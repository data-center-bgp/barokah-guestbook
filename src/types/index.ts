export interface GuestBookEntry {
  id?: number;
  created_at?: string;
  nama: string;
  asal_perusahaan: string;
  tanggal: string;
  waktu: string;
  tujuan_bu: string;
  divisi_bu: string;
  orang_yang_dituju: string;
  keperluan: string;
  keterangan?: string;
}

export const KEPERLUAN_OPTIONS = [
  "Meeting",
  "Audit",
  "Kunjungan Lapangan",
  "Dinas",
  "Pengiriman",
  "Lainnya",
] as const;

export const BUSINESS_UNIT_OPTIONS = [
  "Corporate",
  "Shipping",
  "Shipyard",
  "Shorebase",
  "Fuel",
  "Gas",
  "TST",
  "Supply Chain",
  "Agro",
];

export type KeperluanType = (typeof KEPERLUAN_OPTIONS)[number];
export type BusinessUnitType = (typeof BUSINESS_UNIT_OPTIONS)[number];
