
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchVotersByClan } from "../../Redux/VoterSlice/voterSlice";
import {
  FiSearch,
  FiLoader,
  FiAlertCircle,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  
} from "react-icons/fi";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const clans = [
  {
    title: "Baho-Muuse",
    subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
  },
  {
    title: "Baho-Jibriil",
    subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
  },
  {
    title: "Baho-Isxaaq",
    subclans: ["Ciye", "Galab", "Biniin"],
  },
];

const translations = {
  en: {
    title: "Search Voters by Clan",
    selectClan: "Select Clan",
    selectSubclan: "Select Subclan",
    allSubclans: "All Subclans",
    search: "Search",
    noResults: "No voters found for this clan.",
    loading: "Loading voters...",
    error: "Error:",
    summaryTitle: "Summary",
    city: "City",
    district: "District",
    hasVoterId: "Has Voter ID",
    wantsChange: "Wants Change",
    downloadExcel: "Download Excel",
    downloadPDF: "Download PDF",
    no: "No.",
    fullName: "Full Name",
    phone: "Phone",
    registeredPlace: "Registered Place",
    newRegistration: "New Registration",
    desiredRegistration: "Desired Registration",
    totalVoters: "Total Voters",
    yes: "Yes",
    noValue: "No",
  },
  so: {
    title: "Raadi Codbixiyeyaasha Qabiilka",
    selectClan: "Dooro Qabiilka",
    selectSubclan: "Dooro Jilibka",
    allSubclans: "Dhammaan Jilibyada",
    search: "Raadi",
    noResults: "Ma jiro codbixiye laga helay qabiilka.",
    loading: "Waxaa lagu rarayaa xogta codbixiyeyaasha...",
    error: "Khalad:",
    summaryTitle: "Warbixin Kooban",
    city: "Magaalada",
    district: "Degmada",
    hasVoterId: "Kaadhka Codbixinta",
    wantsChange: "Rabta in goobta laga bedelo",
    downloadExcel: "Soo dejiso Excel",
    downloadPDF: "Soo dejiso PDF",
    no: "Lamb.",
    fullName: "Magaca Buuxa",
    phone: "Telefoon",
    registeredPlace: "Goobta Diiwaangelinta",
    newRegistration: "Diiwaangelin Cusub",
    desiredRegistration: "Goobta La Rabo",
    totalVoters: "Wadarta Codbixiyeyaasha",
    yes: "Haa",
    noValue: "Maya",
  },
};

const VoterClanSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { voters, loading, error } = useAppSelector((state) => state.voter);

  const [lang, setLang] = useState<"so" | "en">("so");
  const t = translations[lang];

  const [clanTitle, setClanTitle] = useState("");
  const [clanSubtitle, setClanSubtitle] = useState("");
  const [showSummary, setShowSummary] = useState(true);

  const handleSearch = () => {
    if (!clanTitle) {
      toast.error(
        lang === "so"
          ? "Fadlan dooro qabiilka si aan ku tusno xogta aad rabto."
          : "Please select a clan to display the data you want."
      );
      return;
    }
    dispatch(
      fetchVotersByClan({ clanTitle, clanSubtitle: clanSubtitle || undefined })
    );
  };

  const selectedClan = clans.find((c) => c.title === clanTitle);

  const cityCounts = new Map<string, number>();
  const districtCounts = new Map<string, number>();
  let hasVoterIdYes = 0;
  let hasVoterIdNo = 0;
  let wantsChangeYes = 0;

  voters.forEach((voter) => {
    cityCounts.set(voter.city, (cityCounts.get(voter.city) || 0) + 1);
    districtCounts.set(
      voter.district,
      (districtCounts.get(voter.district) || 0) + 1
    );
    if (voter.hasVoterId) hasVoterIdYes++;
    else hasVoterIdNo++;
    if (voter.wantsToChangeRegistration) wantsChangeYes++;
  });

  const exportExcel = () => {
    const data = voters.map((voter) => ({
      [t.fullName]: voter.fullName,
      [t.phone]: voter.phoneNumber,
      [t.city]: voter.city,
      [t.district]: voter.district,
      [t.hasVoterId]: voter.hasVoterId ? t.yes : t.noValue,
      [t.registeredPlace]: voter.registeredPlace || "-",
      [t.wantsChange]: voter.wantsToChangeRegistration ? t.yes : t.noValue,
      [t.newRegistration]: voter.newRegistrationPlace || "-",
      [t.desiredRegistration]: voter.desiredRegistrationPlace || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");
    XLSX.writeFile(workbook, "voters.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(t.title, 14, 15);
    const tableData = voters.map((voter, index) => [
      index + 1,
      voter.fullName,
      voter.phoneNumber,
      voter.city,
      voter.district,
      voter.hasVoterId ? t.yes : t.noValue,
      voter.registeredPlace || "-",
      voter.wantsToChangeRegistration ? t.yes : t.noValue,
      voter.newRegistrationPlace || "-",
      voter.desiredRegistrationPlace || "-",
    ]);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          t.no,
          t.fullName,
          t.phone,
          t.city,
          t.district,
          t.hasVoterId,
          t.registeredPlace,
          t.wantsChange,
          t.newRegistration,
          t.desiredRegistration,
        ],
      ],
      body: tableData,
    });
    doc.save("voters_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-inter">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
        <div className="flex justify-end mb-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "so" | "en")}
            className="bg-indigo-600 text-white text-xs rounded px-2 py-1"
          >
            <option value="so">Af-Soomaali</option>
            <option value="en">English</option>
          </select>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-6">
          <FiSearch className="text-indigo-600 text-4xl" /> {t.title}
        </h2>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-sm font-medium">{t.selectClan}</label>
            <select
              value={clanTitle}
              onChange={(e) => {
                setClanTitle(e.target.value);
                setClanSubtitle("");
              }}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="">{t.selectClan}</option>
              {clans.map((clan) => (
                <option key={clan.title} value={clan.title}>
                  {clan.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-sm font-medium">{t.selectSubclan}</label>
            <select
              value={clanSubtitle}
              onChange={(e) => setClanSubtitle(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              disabled={!selectedClan}
            >
              <option value="">{t.allSubclans}</option>
              {selectedClan &&
                selectedClan.subclans.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white w-full lg:w-auto px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <FiSearch /> {t.search}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 text-blue-700">
            <FiLoader className="animate-spin h-8 w-8 mb-2" />
            <p>{t.loading}</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            <FiAlertCircle className="text-2xl" />
            <span>
              <strong>{t.error}</strong> {error}
            </span>
          </div>
        )}

        {!loading && voters.length === 0 && !error && (
          <p className="text-gray-600">{t.noResults}</p>
        )}

        {!loading && voters.length > 0 && (
          <>
            <div className="flex justify-between flex-wrap gap-2 mb-4">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
              >
                {showSummary ? <FiChevronUp /> : <FiChevronDown />}
                {showSummary ? "Hide Summary" : "Show Summary"}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={exportExcel}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <FiDownload /> {t.downloadExcel}
                </button>
                <button
                  onClick={exportPDF}
                  className="bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700 flex items-center gap-2"
                >
                  <FiDownload /> {t.downloadPDF}
                </button>
              </div>
            </div>

            {showSummary && (
              <div className="bg-indigo-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">{t.city}</h3>
                  {Array.from(cityCounts.entries()).map(([city, count]) => (
                    <p key={city} className="text-sm">
                      {city}: <span className="font-medium">{count}</span>
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.district}</h3>
                  {Array.from(districtCounts.entries()).map(
                    ([district, count]) => (
                      <p key={district} className="text-sm">
                        {district}: <span className="font-medium">{count}</span>
                      </p>
                    )
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.hasVoterId}</h3>
                  <p className="text-sm">
                    {t.yes}: <span className="font-medium">{hasVoterIdYes}</span>
                  </p>
                  <p className="text-sm">
                    {t.noValue}:{" "}
                    <span className="font-medium">{hasVoterIdNo}</span>
                  </p>
                  <h3 className="font-semibold mt-4 mb-2">{t.wantsChange}</h3>
                  <p className="text-sm">
                    {t.yes}:{" "}
                    <span className="font-medium">{wantsChangeYes}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-gray-700 border">
                <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm font-bold">
                  <tr>
                    <th className="py-3 px-4">{t.no}</th>
                    <th className="py-3 px-4">{t.fullName}</th>
                    <th className="py-3 px-4">{t.phone}</th>
                    <th className="py-3 px-4">{t.city}</th>
                    <th className="py-3 px-4">{t.district}</th>
                    <th className="py-3 px-4">{t.hasVoterId}</th>
                    <th className="py-3 px-4">{t.registeredPlace}</th>
                    <th className="py-3 px-4">{t.wantsChange}</th>
                    <th className="py-3 px-4">{t.newRegistration}</th>
                    <th className="py-3 px-4">{t.desiredRegistration}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {voters.map((voter, index) => (
                    <tr key={voter.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{voter.fullName}</td>
                      <td className="py-2 px-4">{voter.phoneNumber}</td>
                      <td className="py-2 px-4">{voter.city}</td>
                      <td className="py-2 px-4">{voter.district}</td>
                      <td className="py-2 px-4">
                        {voter.hasVoterId ? t.yes : t.noValue}
                      </td>
                      <td className="py-2 px-4">
                        {voter.registeredPlace || "-"}
                      </td>
                      <td className="py-2 px-4">
                        {voter.wantsToChangeRegistration ? t.yes : t.noValue}
                      </td>
                      <td className="py-2 px-4">
                        {voter.newRegistrationPlace || "-"}
                      </td>
                      <td className="py-2 px-4">
                        {voter.desiredRegistrationPlace || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoterClanSearch;
