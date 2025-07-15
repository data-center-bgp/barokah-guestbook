import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { type GuestBookEntry } from "../types";

const RecentEntries: React.FC = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const ENTRIES_PER_PAGE = 10;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);

        // Get total count first
        const { count, error: countError } = await supabase
          .from("guest_book")
          .select("*", { count: "exact", head: true });

        if (countError) throw countError;
        setTotalEntries(count || 0);

        // Get paginated data
        const from = (currentPage - 1) * ENTRIES_PER_PAGE;
        const to = from + ENTRIES_PER_PAGE - 1;

        const { data, error } = await supabase
          .from("guest_book")
          .select("*")
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        setEntries(data || []);
      } catch (error) {
        console.error("Error fetching entries:", error);
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const totalPages = Math.ceil(totalEntries / ENTRIES_PER_PAGE);
  const startEntry = (currentPage - 1) * ENTRIES_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * ENTRIES_PER_PAGE, totalEntries);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // For the "Try Again" button in error state
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-fetch by changing currentPage state
    setCurrentPage((current) => current);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 rounded-full border-corporate-yellow border-t-transparent animate-spin"></div>
            <p className="text-lg text-gray-600">Loading entries...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mb-2 text-lg text-red-600">Error Loading Data</p>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 mt-4 transition-colors rounded-lg bg-corporate-yellow text-corporate-black hover:bg-corporate-yellow-light"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... rest of your component remains the same
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-8 text-white bg-corporate-black">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Recent Entries</h1>
              <p className="mt-2 text-corporate-yellow-light">
                Guest book entries - Read only view
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Total Entries</p>
              <p className="text-2xl font-bold text-corporate-yellow">
                {totalEntries}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {totalEntries === 0 ? (
          <div className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No Entries Found
            </h3>
            <p className="text-gray-600">
              There are no guest book entries to display.
            </p>
          </div>
        ) : (
          <>
            {/* Pagination Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startEntry}</span> to{" "}
                <span className="font-medium">{endEntry}</span> of{" "}
                <span className="font-medium">{totalEntries}</span> entries
              </div>
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Guest Info
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Company
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Visit Details
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Meeting With
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Purpose
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Date & Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.nama}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entry.asal_perusahaan}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">{entry.tujuan_bu}</div>
                            <div className="text-gray-500">
                              {entry.divisi_bu}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entry.orang_yang_dituju}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-corporate-yellow text-corporate-black">
                            {entry.keperluan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div>{formatDate(entry.tanggal)}</div>
                            <div className="text-gray-500">
                              {formatTime(entry.waktu)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={page === "..."}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        page === currentPage
                          ? "bg-corporate-yellow text-corporate-black"
                          : page === "..."
                          ? "bg-white text-gray-400 cursor-default"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentEntries;
