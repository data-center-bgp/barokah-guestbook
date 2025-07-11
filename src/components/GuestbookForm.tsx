import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import { type GuestBookEntry, KEPERLUAN_OPTIONS } from "../types";

interface GuestbookFormProps {
  onEntryAdded: () => void;
}

const GuestbookForm: React.FC<GuestbookFormProps> = ({ onEntryAdded }) => {
  const [formData, setFormData] = useState<
    Omit<GuestBookEntry, "id" | "created_at">
  >({
    nama: "",
    asal_perusahaan: "",
    tanggal: new Date().toISOString().split("T")[0],
    waktu: new Date().toTimeString().slice(0, 5),
    tujuan_bu: "",
    divisi_bu: "",
    orang_yang_dituju: "",
    keperluan: "",
    keterangan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("guest_book").insert([formData]);

      if (error) throw error;

      // Reset form
      setFormData({
        nama: "",
        asal_perusahaan: "",
        tanggal: new Date().toISOString().split("T")[0],
        waktu: new Date().toTimeString().slice(0, 5),
        tujuan_bu: "",
        divisi_bu: "",
        orang_yang_dituju: "",
        keperluan: "",
        keterangan: "",
      });

      onEntryAdded();
    } catch (error) {
      console.error("Error adding guest entry:", error);
      alert("Error adding guest entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-corporate-lg fade-in">
      {/* Header */}
      <div className="px-8 py-6 text-white border-b-4 bg-corporate-black border-corporate-yellow">
        <h2 className="text-2xl font-semibold">Guest Registration</h2>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Company Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="nama"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="asal_perusahaan"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="asal_perusahaan"
                name="asal_perusahaan"
                value={formData.asal_perusahaan}
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="tanggal"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="waktu"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="waktu"
                name="waktu"
                value={formData.waktu}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
              />
            </div>
          </div>

          {/* Business Unit and Division Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="tujuan_bu"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Business Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tujuan_bu"
                name="tujuan_bu"
                value={formData.tujuan_bu}
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
                placeholder="Target business unit"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="divisi_bu"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Division <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="divisi_bu"
                name="divisi_bu"
                value={formData.divisi_bu}
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
                placeholder="Target division"
              />
            </div>
          </div>

          {/* Person to Meet and Purpose Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="orang_yang_dituju"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Person to Meet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="orang_yang_dituju"
                name="orang_yang_dituju"
                value={formData.orang_yang_dituju}
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
                placeholder="Name of person to meet"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="keperluan"
                className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
              >
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <select
                id="keperluan"
                name="keperluan"
                value={formData.keperluan}
                onChange={handleChange}
                className="w-full px-4 py-3 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
                required
              >
                <option value="">Select purpose</option>
                {KEPERLUAN_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label
              htmlFor="keterangan"
              className="block text-sm font-semibold tracking-wide uppercase text-corporate-black"
            >
              Additional Remarks
            </label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="w-full px-4 py-3 placeholder-gray-400 transition-all duration-300 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-corporate-yellow focus:border-corporate-yellow text-corporate-black"
              rows={3}
              placeholder="Any additional information (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 text-lg font-semibold tracking-wide uppercase transition-all duration-300 rounded-lg bg-gradient-to-r from-corporate-yellow to-corporate-yellow-light text-corporate-black hover:shadow-corporate-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-gray-400 disabled:text-white"
          >
            {isSubmitting ? "Registering..." : "Register Guest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestbookForm;
