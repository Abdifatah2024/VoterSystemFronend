import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  fetchAllVotersBasicInfo,
  fetchVoterBasicInfo,
  updateVoterBasicInfo,
  clearVoterState,
} from "../../Redux/VoterSlice/voterSlice";
import { FiEdit2, FiLoader, FiSave, FiX, FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const cities = [
  {
    name: "Hargeisa",
    districts: [
      "Axmed Dhagax",
      "Maxamuud Haybe",
      "Maxamed Mooge",
      "26 June",
      "Ibraahim Koodbuur",
      "Gacan Libaax",
      "Macallin Haaruun",
      "New Hargeysa",
    ],
  },
  {
    name: "Salaxley",
    districts: [
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
  },
];

const VoterManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { voters, selectedVoter, loading, error, success } = useAppSelector(
    (state) => state.voter
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    district: "",
    hasVoterId: "",
  });

  const [editData, setEditData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    district: "",
    hasVoterId: false,
    registeredPlace: "",
    wantsToChangeRegistration: false,
    desiredRegistrationPlace: "",
  });

  // Fetch voters
  useEffect(() => {
    dispatch(fetchAllVotersBasicInfo());
  }, [dispatch]);

  // When voter selected
  useEffect(() => {
    if (selectedVoter) {
      setEditData({
        fullName: selectedVoter.fullName,
        phoneNumber: selectedVoter.phoneNumber,
        city: selectedVoter.city,
        district: selectedVoter.district,
        hasVoterId: selectedVoter.hasVoterId,
        registeredPlace: selectedVoter.registeredPlace || "",
        wantsToChangeRegistration: selectedVoter.wantsToChangeRegistration,
        desiredRegistrationPlace: selectedVoter.desiredRegistrationPlace || "",
      });
      setEditModalOpen(true);
    }
  }, [selectedVoter]);

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success("Voter updated successfully!");
      dispatch(clearVoterState());
      dispatch(fetchAllVotersBasicInfo());
      setEditModalOpen(false);
    }
  }, [success, dispatch]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearVoterState());
    }
  }, [error, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (name === "city") {
      setEditData({
        ...editData,
        city: value,
        district: "",
      });
    } else {
      setEditData({
        ...editData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleUpdate = () => {
    if (!selectedVoter) return;
    dispatch(updateVoterBasicInfo({ voterId: selectedVoter.id, data: editData }));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredVoters.map((v) => ({
        "Full Name": v.fullName,
        Phone: v.phoneNumber,
        City: v.city,
        District: v.district,
        "Has Voter ID": v.hasVoterId ? "Yes" : "No",
        "Registered Place": v.registeredPlace || "",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Voters");
    XLSX.writeFile(wb, "voters.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Voter List", 14, 15);
    autoTable(doc, {
      head: [
        [
          "Full Name",
          "Phone",
          "City",
          "District",
          "Has Voter ID",
          "Registered Place",
        ],
      ],
      body: filteredVoters.map((v) => [
        v.fullName,
        v.phoneNumber,
        v.city,
        v.district,
        v.hasVoterId ? "Yes" : "No",
        v.registeredPlace || "",
      ]),
      startY: 20,
    });
    doc.save("voters.pdf");
  };

  const filteredVoters = voters.filter((voter) => {
    const matchCity = filters.city ? voter.city === filters.city : true;
    const matchDistrict = filters.district ? voter.district === filters.district : true;
    const matchVoterId =
      filters.hasVoterId === "yes"
        ? voter.hasVoterId
        : filters.hasVoterId === "no"
        ? !voter.hasVoterId
        : true;
    return matchCity && matchDistrict && matchVoterId;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold">Voter Management</h2>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700"
          >
            <FiDownload /> Export Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-red-600 text-white text-sm px-3 py-1.5 rounded hover:bg-red-700"
          >
            <FiDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <select
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Filter by City</option>
          {cities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Filter by District</option>
          {cities.flatMap((c) => c.districts).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          name="hasVoterId"
          value={filters.hasVoterId}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Has Voter ID?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <FiLoader className="animate-spin" /> Loading...
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded mb-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">Has Voter ID</th>
              <th className="py-3 px-4">Registered Place</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredVoters.map((voter) => (
              <tr key={voter.id}>
                <td className="py-2 px-4">{voter.fullName}</td>
                <td className="py-2 px-4">{voter.phoneNumber}</td>
                <td className="py-2 px-4">{voter.city}</td>
                <td className="py-2 px-4">{voter.district}</td>
                <td className="py-2 px-4">
                  {voter.hasVoterId ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </td>
                <td className="py-2 px-4">{voter.registeredPlace || "-"}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => dispatch(fetchVoterBasicInfo(voter.id))}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <FiEdit2 /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded shadow p-6 relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
            <h3 className="text-lg font-semibold mb-4">Edit Voter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form fields */}
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  name="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <select
                  name="city"
                  value={editData.city}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded bg-white"
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {editData.city && (
                <div>
                  <label className="block text-sm mb-1">District</label>
                  <select
                    name="district"
                    value={editData.district}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded bg-white"
                  >
                    <option value="">Select District</option>
                    {cities
                      .find((c) => c.name === editData.city)
                      ?.districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  name="hasVoterId"
                  type="checkbox"
                  checked={editData.hasVoterId}
                  onChange={handleChange}
                />
                <label className="text-sm">Has Voter ID</label>
              </div>
              {editData.hasVoterId && (
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Registered Place</label>
                  <input
                    name="registeredPlace"
                    value={editData.registeredPlace}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  name="wantsToChangeRegistration"
                  type="checkbox"
                  checked={editData.wantsToChangeRegistration}
                  onChange={handleChange}
                />
                <label className="text-sm">Wants to Change Registration</label>
              </div>
              {editData.wantsToChangeRegistration && (
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Desired Registration Place</label>
                  <input
                    name="desiredRegistrationPlace"
                    value={editData.desiredRegistrationPlace}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              )}
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterManagement;
