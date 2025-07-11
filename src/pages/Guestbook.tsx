import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { type GuestBookEntry } from "../types";
import GuestbookForm from "../components/GuestbookForm";
import GuestbookEntry from "../components/GuestbookEntry";

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("guest_book")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [refreshTrigger]);

  const handleEntryAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="px-6 py-12 mx-auto max-w-7xl">
      <div className="grid items-start grid-cols-1 gap-12 xl:grid-cols-2">
        {/* Form Section */}
        <div>
          <GuestbookForm onEntryAdded={handleEntryAdded} />
        </div>

        {/* Entries Section */}
        <div className="flex flex-col max-h-screen overflow-hidden bg-white border border-gray-200 rounded-xl shadow-corporate-lg fade-in">
          {/* Header */}
          <div className="px-8 py-6 text-white border-b-4 bg-corporate-black border-corporate-yellow">
            <h2 className="text-2xl font-semibold">Recent Visitors</h2>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block w-8 h-8 border-b-2 rounded-full animate-spin border-corporate-yellow"></div>
                <p className="mt-4 text-gray-600">Loading guest entries...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="py-12 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-corporate-yellow-lighter">
                  <svg
                    className="w-8 h-8 text-corporate-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="italic text-gray-600">
                  No guest entries yet. Be the first to sign in!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <GuestbookEntry key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
