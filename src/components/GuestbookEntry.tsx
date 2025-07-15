// This feature is disabled for now //

// import React from "react";
// import type { GuestBookEntry } from "../types";

// interface GuestbookEntryProps {
//   entry: GuestBookEntry;
// }

// const GuestbookEntry: React.FC<GuestbookEntryProps> = ({ entry }) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("id-ID", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString: string) => {
//     return timeString.slice(0, 5);
//   };

//   return (
//     <div className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-corporate hover:-translate-y-1 fade-in group">
//       {/* Yellow accent bar */}
//       <div className="absolute top-0 left-0 w-1 h-full transition-transform duration-300 origin-top transform scale-y-0 bg-corporate-yellow group-hover:scale-y-100"></div>

//       {/* Header */}
//       <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-start">
//         <h3 className="text-xl font-semibold text-corporate-black">
//           {entry.nama}
//         </h3>
//         <div className="px-4 py-2 text-sm font-medium border rounded-full bg-corporate-yellow-lighter text-corporate-black border-corporate-yellow whitespace-nowrap">
//           {formatDate(entry.tanggal)} • {formatTime(entry.waktu)}
//         </div>
//       </div>

//       {/* Details Grid */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="space-y-1">
//           <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//             Company
//           </span>
//           <p className="text-sm font-medium text-corporate-black">
//             {entry.asal_perusahaan}
//           </p>
//         </div>

//         <div className="space-y-1">
//           <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//             Business Unit
//           </span>
//           <p className="text-sm font-medium text-corporate-black">
//             {entry.tujuan_bu}
//           </p>
//         </div>

//         <div className="space-y-1">
//           <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//             Division
//           </span>
//           <p className="text-sm font-medium text-corporate-black">
//             {entry.divisi_bu}
//           </p>
//         </div>

//         <div className="space-y-1">
//           <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//             Meeting With
//           </span>
//           <p className="text-sm font-medium text-corporate-black">
//             {entry.orang_yang_dituju}
//           </p>
//         </div>

//         <div className="space-y-1">
//           <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//             Purpose
//           </span>
//           <span className="inline-block px-2 py-1 mx-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-corporate-black text-corporate-yellow">
//             {entry.keperluan}
//           </span>
//         </div>

//         {entry.keterangan && (
//           <div className="pt-4 space-y-1 border-t border-gray-200 sm:col-span-2 lg:col-span-3">
//             <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
//               Remarks
//             </span>
//             <p className="text-sm text-corporate-black">{entry.keterangan}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GuestbookEntry;
