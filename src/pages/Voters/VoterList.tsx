import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  fetchAllVoters,
  updateVoter,
  deleteVoter,
} from "../../Redux/VoterSlice/voterSlice";
import type { Voter } from "../../Redux/VoterSlice/voterSlice";
import { normalizeVoterData } from "./normalizeVoterData";
import toast from "react-hot-toast";
import {
  FiList,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VoterList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { voters, loading, error } = useAppSelector((state) => state.voter);

  const [lang, setLang] = useState<"en" | "so">("so");
  const t = {
    title: lang === "so" ? "Liiska Codbixiyeyaasha" : "Voter List",
    subtitle:
      lang === "so"
        ? "Ka raadso, ka tafatir, oo maamul dhammaan codbixiyeyaasha diiwaangashan."
        : "Search, edit, and manage all registered voters.",
    loading: lang === "so" ? "Codbixiyeyaasha ayaa la soo rarayaa..." : "Loading voter data...",
    noVoters: lang === "so" ? "Codbixiye lama helin." : "No voters found.",
    error: lang === "so" ? "Khalad" : "Error",
    confirmDelete:
      lang === "so"
        ? "Ma hubtaa inaad tirtirayso codbixiyahan?"
        : "Are you sure you want to delete this voter?",
    save: lang === "so" ? "Kaydi" : "Save",
    cancel: lang === "so" ? "Jooji" : "Cancel",
    edit: lang === "so" ? "Tafatir" : "Edit",
    delete: lang === "so" ? "Tirtir" : "Delete",
    fullName: lang === "so" ? "Magaca Buuxa" : "Full Name",
    phone: lang === "so" ? "Telefoon" : "Phone",
    city: lang === "so" ? "Magaalada" : "City",
    district: lang === "so" ? "Degmada" : "District",
    actions: lang === "so" ? "Hawlaha" : "Actions",
    allCities: lang === "so" ? "Dhammaan Magaalooyinka" : "All Cities",
    allDistricts: lang === "so" ? "Dhammaan Degmooyinka" : "All Districts",
    citySummary: lang === "so" ? "Tirada Magaalada" : "Voters per City",
    districtSummary: lang === "so" ? "Tirada Degmada" : "Voters per District",
    downloadExcel: lang === "so" ? "Soo Degso Excel" : "Download Excel",
    downloadPDF: lang === "so" ? "Soo Degso PDF" : "Download PDF",
    downloadSummaryExcel: lang === "so" ? "Soo Degso Dulmar Excel" : "Download Summary Excel",
    toggleSummary: lang === "so" ? "Fur/Iska Xir Dulmar" : "Toggle Summary",
  };

  const [editVoterId, setEditVoterId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Voter>>({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showSummary, setShowSummary] = useState(true);

  const cityDistrictMap: Record<string, string[]> = {
    Hargeisa: [
      "Axmed Dhagax",
      "Maxamuud Haybe",
      "Maxamed Mooge",
      "26 June",
      "Ibraahim Koodbuur",
      "Gacan Libaax",
      "Macallin Haaruun",
      "New Hargeysa",
    ],
    Salaxley: [
      "Ina guuxaa",
      "Kaam-tuug",
      "Dhimbilriyaale",
      "Qoolcadey",
      "Bali-case",
      "Jabaase",
      "Toon",
      "Galoole",
      "Hunduli",
      "Duudku",
    ],
  };

  useEffect(() => {
    dispatch(fetchAllVoters());
  }, [dispatch]);

  const startEdit = (voter: Voter) => {
    setEditVoterId(voter.id);
    setEditData({
      fullName: voter.fullName,
      phoneNumber: voter.phoneNumber,
      city: voter.city,
      district: voter.district,
    });
  };

  const cancelEdit = () => {
    setEditVoterId(null);
    setEditData({});
  };

  const handleUpdate = async () => {
    if (!editVoterId) return;
    const normalized = normalizeVoterData(editData);
    try {
      await dispatch(
        updateVoter({
          voterId: editVoterId,
          data: normalized,
        })
      ).unwrap();
      toast.success(`${t.save} ${t.fullName}`);
      cancelEdit();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t.error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await dispatch(deleteVoter(id)).unwrap();
        toast.success(`${t.delete} ${t.fullName}`);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error(t.error);
        }
      }
    }
  };

  const uniqueCities = Object.keys(cityDistrictMap);
  const filteredDistricts =
    selectedCity && cityDistrictMap[selectedCity]
      ? cityDistrictMap[selectedCity]
      : Array.from(new Set(voters.map((v) => v.district))).sort();

  const filteredVoters = voters.filter(
    (v) =>
      (!selectedCity || v.city === selectedCity) &&
      (!selectedDistrict || v.district === selectedDistrict)
  );

  const cityCounts = filteredVoters.reduce((acc: Record<string, number>, v) => {
    acc[v.city] = (acc[v.city] || 0) + 1;
    return acc;
  }, {});
  const districtCounts = filteredVoters.reduce((acc: Record<string, number>, v) => {
    acc[v.district] = (acc[v.district] || 0) + 1;
    return acc;
  }, {});

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredVoters);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");
    XLSX.writeFile(workbook, "voters.xlsx");
  };

  const handleSummaryExcelDownload = () => {
    const rows = [
      ["Summary Type", "Name", "Count"],
      ...Object.entries(cityCounts).map(([name, count]) => ["City", name, count]),
      ...Object.entries(districtCounts).map(([name, count]) => ["District", name, count]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    XLSX.writeFile(workbook, "summary.xlsx");
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text(t.title, 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [["Type", "Name", "Count"]],
      body: [
        ...Object.entries(cityCounts).map(([name, count]) => ["City", name, String(count)]),
        ...Object.entries(districtCounts).map(([name, count]) => ["District", name, String(count)]),
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [[t.fullName, t.phone, t.city, t.district]],
      body: filteredVoters.map((v) => [
        v.fullName,
        v.phoneNumber,
        v.city,
        v.district,
      ]),
    });
    doc.save("voters.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FiList className="text-indigo-600 text-4xl" /> {t.title}
            </h2>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "en" | "so")}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="so">Af-Soomaali</option>
              <option value="en">English</option>
            </select>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
            >
              {showSummary ? <FiChevronUp /> : <FiChevronDown />}
              {t.toggleSummary}
            </button>
            <button
              onClick={handleExcelDownload}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              <FiDownload /> {t.downloadExcel}
            </button>
            <button
              onClick={handleSummaryExcelDownload}
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
            >
              <FiDownload /> {t.downloadSummaryExcel}
            </button>
            <button
              onClick={handlePDFDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              <FiDownload /> {t.downloadPDF}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col md:flex-row gap-2">
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedDistrict("");
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="">{t.allCities}</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="">{t.allDistricts}</option>
            {filteredDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        {showSummary && !loading && filteredVoters.length > 0 && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{t.citySummary}</h3>
              <ul className="space-y-1 text-blue-900">
                {Object.entries(cityCounts).map(([c, count]) => (
                  <li key={c} className="flex justify-between">
                    <span>{c}</span>
                    <span className="font-bold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-2">{t.districtSummary}</h3>
              <ul className="space-y-1 text-green-900">
                {Object.entries(districtCounts).map(([d, count]) => (
                  <li key={d} className="flex justify-between">
                    <span>{d}</span>
                    <span className="font-bold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && filteredVoters.length > 0 && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-700">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700 uppercase text-sm font-bold">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">{t.fullName}</th>
                  <th className="py-2 px-4">{t.phone}</th>
                  <th className="py-2 px-4">{t.city}</th>
                  <th className="py-2 px-4">{t.district}</th>
                  <th className="py-2 px-4">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredVoters.map((v, i) => (
                  <tr key={v.id}>
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">
                      {editVoterId === v.id ? (
                        <input
                          type="text"
                          value={editData.fullName || ""}
                          onChange={(e) =>
                            setEditData((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        v.fullName
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editVoterId === v.id ? (
                        <input
                          type="text"
                          value={editData.phoneNumber || ""}
                          onChange={(e) =>
                            setEditData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        v.phoneNumber
                      )}
                    </td>
                    <td className="py-2 px-4">{v.city}</td>
                    <td className="py-2 px-4">{v.district}</td>
                    <td className="py-2 px-4 space-x-2">
                      {editVoterId === v.id ? (
                        <>
                          <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                          >
                            {t.save}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                          >
                            {t.cancel}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(v)}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            {t.edit}
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                          >
                            {t.delete}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Data */}
        {!loading && filteredVoters.length === 0 && (
          <p className="text-gray-600 text-center mt-6">{t.noVoters}</p>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-gray-600 text-center mt-6">{t.loading}</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center mt-6">{t.error}</p>
        )}
      </div>
    </div>
  );
};

export default VoterList;
