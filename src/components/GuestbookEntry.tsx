import React from "react";
import type { GuestBookEntry } from "../types";

interface GuestbookEntryProps {
  entry: GuestBookEntry;
}

const GuestbookEntry: React.FC<GuestbookEntryProps> = ({ entry }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-corporate hover:-translate-y-1 fade-in relative overflow-hidden group">
      {/* Yellow accent bar */}
      <div className="absolute left-0 top-0 w-1 h-full bg-corporate-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <h3 className="text-xl font-semibold text-corporate-black">
          {entry.nama}
        </h3>
        <div className="bg-corporate-yellow-lighter text-corporate-black px-4 py-2 rounded-full text-sm font-medium border border-corporate-yellow whitespace-nowrap">
          {formatDate(entry.tanggal)} • {formatTime(entry.waktu)}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Company
          </span>
          <p className="text-sm font-medium text-corporate-black">
            {entry.asal_perusahaan}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Business Unit
          </span>
          <p className="text-sm font-medium text-corporate-black">
            {entry.tujuan_bu}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Division
          </span>
          <p className="text-sm font-medium text-corporate-black">
            {entry.divisi_bu}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Meeting With
          </span>
          <p className="text-sm font-medium text-corporate-black">
            {entry.orang_yang_dituju}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Purpose
          </span>
          <span className="inline-block bg-corporate-black text-corporate-yellow px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {entry.keperluan}
          </span>
        </div>

        {entry.keterangan && (
          <div className="sm:col-span-2 lg:col-span-3 space-y-1 pt-4 border-t border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Remarks
            </span>
            <p className="text-sm text-corporate-black">{entry.keterangan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestbookEntry;
