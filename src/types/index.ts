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

export type KeperluanType = (typeof KEPERLUAN_OPTIONS)[number];
