// // import React, { useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../Redux/store";
// // import { fetchVotersByClan } from "../../Redux/VoterSlice/voterSlice";
// // import { FiSearch, FiLoader, FiAlertCircle, FiDownload } from "react-icons/fi";
// // import toast from "react-hot-toast";
// // import * as XLSX from "xlsx";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";

// // const clans = [
// //   {
// //     title: "Baho-Muuse",
// //     subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
// //   },
// //   {
// //     title: "Baho-Jibriil",
// //     subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
// //   },
// //   {
// //     title: "Baho-Isxaaq",
// //     subclans: ["Ciye", "Galab", "Biniin"],
// //   },
// // ];

// // const translations = {
// //   en: {
// //     title: "Search Voters by Clan",
// //     selectClan: "Select Clan",
// //     selectSubclan: "Select Subclan",
// //     allSubclans: "All Subclans",
// //     search: "Search",
// //     noResults: "No voters found for this clan.",
// //     loading: "Loading voters...",
// //     error: "Error:",
// //     summaryTitle: "Summary",
// //     city: "City",
// //     district: "District",
// //     hasVoterId: "Has Voter ID",
// //     wantsChange: "Wants Change",
// //     downloadExcel: "Download Excel",
// //     downloadPDF: "Download PDF",
// //     no: "No.",
// //     fullName: "Full Name",
// //     phone: "Phone",
// //     registeredPlace: "Registered Place",
// //     newRegistration: "New Registration",
// //     desiredRegistration: "Desired Registration",
// //   },
// //   so: {
// //     title: "Raadi Codbixiyeyaasha Qabiilka",
// //     selectClan: "Dooro Qabiilka",
// //     selectSubclan: "Dooro Jilibka",
// //     allSubclans: "Dhammaan Jilibyada",
// //     search: "Raadi",
// //     noResults: "Ma jiro codbixiye laga helay qabiilka.",
// //     loading: "Waxaa lagu rarayaa xogta codbixiyeyaasha...",
// //     error: "Khalad:",
// //     summaryTitle: "Warbixin Kooban",
// //     city: "Magaalada",
// //     district: "Degmada",
// //     hasVoterId: "Kaadhka Codbixinta",
// //     wantsChange: "Rabta in goobta laga bedelo",
// //     downloadExcel: "Soo dejiso Excel",
// //     downloadPDF: "Soo dejiso PDF",
// //     no: "Lamb.",
// //     fullName: "Magaca Buuxa",
// //     phone: "Telefoon",
// //     registeredPlace: "Goobta Diiwaangelinta",
// //     newRegistration: "Diiwaangelin Cusub",
// //     desiredRegistration: "Goobta La Rabo",
// //   },
// // };

// // const VoterClanSearch: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { voters, loading, error } = useAppSelector((state) => state.voter);

// //   const [lang, setLang] = useState<"so" | "en">("so");
// //   const t = translations[lang];

// //   const [clanTitle, setClanTitle] = useState("");
// //   const [clanSubtitle, setClanSubtitle] = useState("");

// //   const handleSearch = () => {
// //     if (!clanTitle) {
// //       toast.error(
// //         lang === "so"
// //           ? "Fadlan dooro qabiilka si aan ku tusno xogta aad rabto."
// //           : "Please select a clan to display the data you want."
// //       );
// //       return;
// //     }
// //     dispatch(fetchVotersByClan({ clanTitle, clanSubtitle: clanSubtitle || undefined }));
// //   };

// //   const exportExcel = () => {
// //     const data = voters.map((voter) => ({
// //       [t.fullName]: voter.fullName,
// //       [t.phone]: voter.phoneNumber,
// //       [t.city]: voter.city,
// //       [t.district]: voter.district,
// //       [t.hasVoterId]: voter.hasVoterId ? "Yes" : "No",
// //       [t.registeredPlace]: voter.registeredPlace || "-",
// //       [t.wantsChange]: voter.wantsToChangeRegistration ? "Yes" : "No",
// //       [t.newRegistration]: voter.newRegistrationPlace || "-",
// //       [t.desiredRegistration]: voter.desiredRegistrationPlace || "-",
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(data);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");
// //     XLSX.writeFile(workbook, "voters.xlsx");
// //   };

// //   const exportPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text(t.title, 14, 15);

// //     // Summary
// //     const summaryRows: string[][] = [];
// //     summaryRows.push([t.city, ""]);
// //     cityCounts.forEach((count, city) => {
// //       summaryRows.push([city, String(count)]);
// //     });
// //     summaryRows.push(["", ""]);
// //     summaryRows.push([t.district, ""]);
// //     districtCounts.forEach((count, district) => {
// //       summaryRows.push([district, String(count)]);
// //     });
// //     summaryRows.push(["", ""]);
// //     summaryRows.push([`${t.hasVoterId} (Yes)`, String(hasVoterIdYes)]);
// //     summaryRows.push([`${t.hasVoterId} (No)`, String(hasVoterIdNo)]);
// //     summaryRows.push([`${t.wantsChange} (Yes)`, String(wantsChangeYes)]);

// //     autoTable(doc, {
// //       startY: 20,
// //       head: [[t.summaryTitle, "Count"]],
// //       body: summaryRows,
// //     });

// //     // Table
// //     const tableData = voters.map((voter, index) => [
// //       index + 1,
// //       voter.fullName,
// //       voter.phoneNumber,
// //       voter.city,
// //       voter.district,
// //       voter.hasVoterId ? "Yes" : "No",
// //       voter.registeredPlace || "-",
// //       voter.wantsToChangeRegistration ? "Yes" : "No",
// //       voter.newRegistrationPlace || "-",
// //       voter.desiredRegistrationPlace || "-",
// //     ]);

// //     autoTable(doc, {
// //       startY: doc.lastAutoTable.finalY + 10,
// //       head: [[
// //         t.no,
// //         t.fullName,
// //         t.phone,
// //         t.city,
// //         t.district,
// //         t.hasVoterId,
// //         t.registeredPlace,
// //         t.wantsChange,
// //         t.newRegistration,
// //         t.desiredRegistration,
// //       ]],
// //       body: tableData,
// //     });

// //     doc.save("voters_report.pdf");
// //   };

// //   const selectedClan = clans.find((c) => c.title === clanTitle);

// //   const cityCounts = new Map<string, number>();
// //   const districtCounts = new Map<string, number>();
// //   let hasVoterIdYes = 0;
// //   let hasVoterIdNo = 0;
// //   let wantsChangeYes = 0;

// //   voters.forEach((voter) => {
// //     cityCounts.set(voter.city, (cityCounts.get(voter.city) || 0) + 1);
// //     districtCounts.set(voter.district, (districtCounts.get(voter.district) || 0) + 1);
// //     if (voter.hasVoterId) hasVoterIdYes++;
// //     else hasVoterIdNo++;
// //     if (voter.wantsToChangeRegistration) wantsChangeYes++;
// //   });

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-inter">
// //       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
// //         {/* Language Switch */}
// //         <div className="flex justify-end mb-4">
// //           <select
// //             value={lang}
// //             onChange={(e) => setLang(e.target.value as "so" | "en")}
// //             className="bg-indigo-600 text-white text-xs rounded px-2 py-1"
// //           >
// //             <option value="so">Af-Soomaali</option>
// //             <option value="en">English</option>
// //           </select>
// //         </div>

// //         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-6">
// //           <FiSearch className="text-indigo-600 text-4xl" /> {t.title}
// //         </h2>

// //         {/* Selection */}
// //         <div className="flex flex-col md:flex-row gap-4 mb-6">
// //           <div className="flex-1 flex flex-col">
// //             <label className="mb-1 text-sm font-medium">{t.selectClan}</label>
// //             <select
// //               value={clanTitle}
// //               onChange={(e) => {
// //                 setClanTitle(e.target.value);
// //                 setClanSubtitle("");
// //               }}
// //               className="border border-gray-300 rounded-md px-4 py-2 w-full"
// //             >
// //               <option value="">{t.selectClan}</option>
// //               {clans.map((clan) => (
// //                 <option key={clan.title} value={clan.title}>
// //                   {clan.title}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="flex-1 flex flex-col">
// //             <label className="mb-1 text-sm font-medium">{t.selectSubclan}</label>
// //             <select
// //               value={clanSubtitle}
// //               onChange={(e) => setClanSubtitle(e.target.value)}
// //               className="border border-gray-300 rounded-md px-4 py-2 w-full"
// //               disabled={!selectedClan}
// //             >
// //               <option value="">{t.allSubclans}</option>
// //               {selectedClan &&
// //                 selectedClan.subclans.map((sub) => (
// //                   <option key={sub} value={sub}>
// //                     {sub}
// //                   </option>
// //                 ))}
// //             </select>
// //           </div>

// //           <div className="flex items-end gap-2">
// //             <button
// //               onClick={handleSearch}
// //               className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2 h-[42px]"
// //             >
// //               <FiSearch /> {t.search}
// //             </button>
// //             {voters.length > 0 && (
// //               <>
// //                 <button
// //                   onClick={exportExcel}
// //                   className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
// //                 >
// //                   <FiDownload /> {t.downloadExcel}
// //                 </button>
// //                 <button
// //                   onClick={exportPDF}
// //                   className="bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700 flex items-center gap-2"
// //                 >
// //                   <FiDownload /> {t.downloadPDF}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Loading */}
// //         {loading && (
// //           <div className="flex flex-col items-center justify-center py-8 text-blue-700">
// //             <FiLoader className="animate-spin h-8 w-8 mb-2" />
// //             <p>{t.loading}</p>
// //           </div>
// //         )}

// //         {/* Error */}
// //         {error && (
// //           <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
// //             <FiAlertCircle className="text-2xl" />
// //             <span>
// //               <strong>{t.error}</strong> {error}
// //             </span>
// //           </div>
// //         )}

// //         {/* No Results */}
// //         {!loading && voters.length === 0 && !error && (
// //           <p className="text-gray-600">{t.noResults}</p>
// //         )}

// //         {/* Summary */}
// //         {!loading && voters.length > 0 && (
// //           <div className="bg-indigo-50 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div>
// //               <h3 className="font-semibold mb-2">{t.city}</h3>
// //               {Array.from(cityCounts.entries()).map(([city, count]) => (
// //                 <p key={city} className="text-sm">
// //                   {city}: <span className="font-medium">{count}</span>
// //                 </p>
// //               ))}
// //             </div>
// //             <div>
// //               <h3 className="font-semibold mb-2">{t.district}</h3>
// //               {Array.from(districtCounts.entries()).map(([district, count]) => (
// //                 <p key={district} className="text-sm">
// //                   {district}: <span className="font-medium">{count}</span>
// //                 </p>
// //               ))}
// //             </div>
// //             <div>
// //               <h3 className="font-semibold mb-2">{t.hasVoterId}</h3>
// //               <p className="text-sm">
// //                 Haysata: <span className="font-medium">{hasVoterIdYes}</span>
// //               </p>
// //               <p className="text-sm">
// //                 Aan Haysan: <span className="font-medium">{hasVoterIdNo}</span>
// //               </p>
// //               <h3 className="font-semibold mt-4 mb-2">{t.wantsChange}</h3>
// //               <p className="text-sm">
// //                 Yes: <span className="font-medium">{wantsChangeYes}</span>
// //               </p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Voter Table */}
// //         {!loading && voters.length > 0 && (
// //           <div className="overflow-x-auto mt-4">
// //             <table className="min-w-full text-left text-gray-700 border">
// //               <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm font-bold">
// //                 <tr>
// //                   <th className="py-3 px-4">{t.no}</th>
// //                   <th className="py-3 px-4">{t.fullName}</th>
// //                   <th className="py-3 px-4">{t.phone}</th>
// //                   <th className="py-3 px-4">{t.city}</th>
// //                   <th className="py-3 px-4">{t.district}</th>
// //                   <th className="py-3 px-4">{t.hasVoterId}</th>
// //                   <th className="py-3 px-4">{t.registeredPlace}</th>
// //                   <th className="py-3 px-4">{t.wantsChange}</th>
// //                   <th className="py-3 px-4">{t.newRegistration}</th>
// //                   <th className="py-3 px-4">{t.desiredRegistration}</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {voters.map((voter, index) => (
// //                   <tr key={voter.id} className="hover:bg-gray-50">
// //                     <td className="py-2 px-4">{index + 1}</td>
// //                     <td className="py-2 px-4">{voter.fullName}</td>
// //                     <td className="py-2 px-4">{voter.phoneNumber}</td>
// //                     <td className="py-2 px-4">{voter.city}</td>
// //                     <td className="py-2 px-4">{voter.district}</td>
// //                     <td className="py-2 px-4">{voter.hasVoterId ? "Yes" : "No"}</td>
// //                     <td className="py-2 px-4">{voter.registeredPlace || "-"}</td>
// //                     <td className="py-2 px-4">{voter.wantsToChangeRegistration ? "Yes" : "No"}</td>
// //                     <td className="py-2 px-4">{voter.newRegistrationPlace || "-"}</td>
// //                     <td className="py-2 px-4">{voter.desiredRegistrationPlace || "-"}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VoterClanSearch;
// import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import { fetchVotersByClan } from "../../Redux/VoterSlice/voterSlice";
// import { FiSearch, FiLoader, FiAlertCircle, FiDownload, FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const clans = [
//   {
//     title: "Baho-Muuse",
//     subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
//   },
//   {
//     title: "Baho-Jibriil",
//     subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
//   },
//   {
//     title: "Baho-Isxaaq",
//     subclans: ["Ciye", "Galab", "Biniin"],
//   },
// ];

// const translations = {
//   en: {
//     title: "Search Voters by Clan",
//     selectClan: "Select Clan",
//     selectSubclan: "Select Subclan",
//     allSubclans: "All Subclans",
//     search: "Search",
//     noResults: "No voters found for this clan.",
//     loading: "Loading voters...",
//     error: "Error:",
//     summaryTitle: "Summary",
//     city: "City",
//     district: "District",
//     hasVoterId: "Has Voter ID",
//     wantsChange: "Wants Change",
//     downloadExcel: "Download Excel",
//     downloadPDF: "Download PDF",
//     no: "No.",
//     fullName: "Full Name",
//     phone: "Phone",
//     registeredPlace: "Registered Place",
//     newRegistration: "New Registration",
//     desiredRegistration: "Desired Registration",
//     filterTitle: "Filter Voters",
//     filterCity: "Filter by City",
//     filterDistrict: "Filter by District",
//     filterVoterId: "Has Voter ID",
//     all: "All",
//     yes: "Yes",
//     no: "No",
//     applyFilters: "Apply Filters",
//     clearFilters: "Clear Filters",
//     showSummary: "Show Summary",
//     hideSummary: "Hide Summary",
//     totalVoters: "Total Voters",
//   },
//   so: {
//     title: "Raadi Codbixiyeyaasha Qabiilka",
//     selectClan: "Dooro Qabiilka",
//     selectSubclan: "Dooro Jilibka",
//     allSubclans: "Dhammaan Jilibyada",
//     search: "Raadi",
//     noResults: "Ma jiro codbixiye laga helay qabiilka.",
//     loading: "Waxaa lagu rarayaa xogta codbixiyeyaasha...",
//     error: "Khalad:",
//     summaryTitle: "Warbixin Kooban",
//     city: "Magaalada",
//     district: "Degmada",
//     hasVoterId: "Kaadhka Codbixinta",
//     wantsChange: "Rabta in goobta laga bedelo",
//     downloadExcel: "Soo dejiso Excel",
//     downloadPDF: "Soo dejiso PDF",
//     no: "Lamb.",
//     fullName: "Magaca Buuxa",
//     phone: "Telefoon",
//     registeredPlace: "Goobta Diiwaangelinta",
//     newRegistration: "Diiwaangelin Cusub",
//     desiredRegistration: "Goobta La Rabo",
//     filterTitle: "Kala sooc Codbixiyeyaasha",
//     filterCity: "Kala sooc Magaalada",
//     filterDistrict: "Kala sooc Degmada",
//     filterVoterId: "Kaadhka Codbixinta",
//     all: "Dhammaan",
//     yes: "Haa",
//     no: "Maya",
//     applyFilters: "Ku dabee",
//     clearFilters: "Tirtir",
//     showSummary: "Muuji Warbixin Kooban",
//     hideSummary: "Qari Warbixin Kooban",
//     totalVoters: "Wadarta Codbixiyeyaasha",
//   },
// };

// const VoterClanSearch: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { voters, loading, error } = useAppSelector((state) => state.voter);

//   const [lang, setLang] = useState<"so" | "en">("so");
//   const t = translations[lang];

//   const [clanTitle, setClanTitle] = useState("");
//   const [clanSubtitle, setClanSubtitle] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [showSummary, setShowSummary] = useState(true);

//   // Filter states
//   const [cityFilter, setCityFilter] = useState("");
//   const [districtFilter, setDistrictFilter] = useState("");
//   const [voterIdFilter, setVoterIdFilter] = useState<"all" | "yes" | "no">("all");

//   const handleSearch = () => {
//     if (!clanTitle) {
//       toast.error(
//         lang === "so"
//           ? "Fadlan dooro qabiilka si aan ku tusno xogta aad rabto."
//           : "Please select a clan to display the data you want."
//       );
//       return;
//     }
//     dispatch(fetchVotersByClan({ clanTitle, clanSubtitle: clanSubtitle || undefined }));
//   };

//   // Get unique cities and districts for filter dropdowns
//   const uniqueCities = Array.from(new Set(voters.map(voter => voter.city)));
//   const uniqueDistricts = Array.from(new Set(voters.map(voter => voter.district)));

//   // Apply filters to voters
//   const filteredVoters = voters.filter(voter => {
//     return (
//       (cityFilter === "" || voter.city === cityFilter) &&
//       (districtFilter === "" || voter.district === districtFilter) &&
//       (voterIdFilter === "all" || 
//        (voterIdFilter === "yes" && voter.hasVoterId) || 
//        (voterIdFilter === "no" && !voter.hasVoterId))
//     );
//   });

//   // Clear all filters
//   const clearFilters = () => {
//     setCityFilter("");
//     setDistrictFilter("");
//     setVoterIdFilter("all");
//   };

//   // Calculate summary data
//   const cityCounts = new Map<string, number>();
//   const districtCounts = new Map<string, number>();
//   let hasVoterIdYes = 0;
//   let hasVoterIdNo = 0;
//   let wantsChangeYes = 0;

//   filteredVoters.forEach((voter) => {
//     cityCounts.set(voter.city, (cityCounts.get(voter.city) || 0) + 1);
//     districtCounts.set(voter.district, (districtCounts.get(voter.district) || 0) + 1);
//     if (voter.hasVoterId) hasVoterIdYes++;
//     else hasVoterIdNo++;
//     if (voter.wantsToChangeRegistration) wantsChangeYes++;
//   });

//   const selectedClan = clans.find((c) => c.title === clanTitle);

//   // Export to Excel
//   const exportExcel = () => {
//     const data = filteredVoters.map((voter) => ({
//       [t.fullName]: voter.fullName,
//       [t.phone]: voter.phoneNumber,
//       [t.city]: voter.city,
//       [t.district]: voter.district,
//       [t.hasVoterId]: voter.hasVoterId ? t.yes : t.no,
//       [t.registeredPlace]: voter.registeredPlace || "-",
//       [t.wantsChange]: voter.wantsToChangeRegistration ? t.yes : t.no,
//       [t.newRegistration]: voter.newRegistrationPlace || "-",
//       [t.desiredRegistration]: voter.desiredRegistrationPlace || "-",
//     }));

//     // Add summary sheet
//     const summaryData = [
//       { [t.summaryTitle]: t.city, Count: "" },
//       ...Array.from(cityCounts.entries()).map(([city, count]) => ({
//         [t.summaryTitle]: city,
//         Count: count
//       })),
//       { [t.summaryTitle]: "", Count: "" },
//       { [t.summaryTitle]: t.district, Count: "" },
//       ...Array.from(districtCounts.entries()).map(([district, count]) => ({
//         [t.summaryTitle]: district,
//         Count: count
//       })),
//       { [t.summaryTitle]: "", Count: "" },
//       { [t.summaryTitle]: `${t.hasVoterId} (${t.yes})`, Count: hasVoterIdYes },
//       { [t.summaryTitle]: `${t.hasVoterId} (${t.no})`, Count: hasVoterIdNo },
//       { [t.summaryTitle]: `${t.wantsChange} (${t.yes})`, Count: wantsChangeYes },
//     ];

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const summarySheet = XLSX.utils.json_to_sheet(summaryData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");
//     XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
//     XLSX.writeFile(workbook, "voters_report.xlsx");
//   };

//   // Export to PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
    
//     // Title
//     doc.setFontSize(16);
//     doc.text(t.title, 14, 15);
//     doc.setFontSize(12);
//     doc.text(`${t.totalVoters}: ${filteredVoters.length}`, 14, 22);
    
//     // Summary section
//     if (showSummary) {
//       doc.setFontSize(14);
//       doc.text(t.summaryTitle, 14, 30);
      
//       // City counts
//       doc.setFontSize(12);
//       doc.text(t.city, 14, 38);
//       let yPos = 44;
//       cityCounts.forEach((count, city) => {
//         doc.text(`${city}: ${count}`, 20, yPos);
//         yPos += 6;
//       });
      
//       // District counts
//       yPos += 6;
//       doc.text(t.district, 14, yPos);
//       yPos += 6;
//       districtCounts.forEach((count, district) => {
//         doc.text(`${district}: ${count}`, 20, yPos);
//         yPos += 6;
//       });
      
//       // Voter ID and change requests
//       yPos += 6;
//       doc.text(`${t.hasVoterId} (${t.yes}): ${hasVoterIdYes}`, 14, yPos);
//       yPos += 6;
//       doc.text(`${t.hasVoterId} (${t.no}): ${hasVoterIdNo}`, 14, yPos);
//       yPos += 6;
//       doc.text(`${t.wantsChange} (${t.yes}): ${wantsChangeYes}`, 14, yPos);
//       yPos += 12;
//     } else {
//       yPos = 30;
//     }

//     // Table data
//     const tableData = filteredVoters.map((voter, index) => [
//       index + 1,
//       voter.fullName,
//       voter.phoneNumber,
//       voter.city,
//       voter.district,
//       voter.hasVoterId ? t.yes : t.no,
//       voter.registeredPlace || "-",
//       voter.wantsToChangeRegistration ? t.yes : t.no,
//       voter.newRegistrationPlace || "-",
//       voter.desiredRegistrationPlace || "-",
//     ]);

//     autoTable(doc, {
//       startY: yPos,
//       head: [[
//         t.no,
//         t.fullName,
//         t.phone,
//         t.city,
//         t.district,
//         t.hasVoterId,
//         t.registeredPlace,
//         t.wantsChange,
//         t.newRegistration,
//         t.desiredRegistration,
//       ]],
//       body: tableData,
//       styles: { fontSize: 8 },
//       headStyles: { fillColor: [39, 174, 96] },
//     });

//     doc.save("voters_report.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-inter">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
//         {/* Language Switch */}
//         <div className="flex justify-end mb-4">
//           <select
//             value={lang}
//             onChange={(e) => setLang(e.target.value as "so" | "en")}
//             className="bg-indigo-600 text-white text-xs rounded px-2 py-1"
//           >
//             <option value="so">Af-Soomaali</option>
//             <option value="en">English</option>
//           </select>
//         </div>

//         <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-6">
//           <FiSearch className="text-indigo-600 text-4xl" /> {t.title}
//         </h2>

//         {/* Selection */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="flex-1 flex flex-col">
//             <label className="mb-1 text-sm font-medium">{t.selectClan}</label>
//             <select
//               value={clanTitle}
//               onChange={(e) => {
//                 setClanTitle(e.target.value);
//                 setClanSubtitle("");
//               }}
//               className="border border-gray-300 rounded-md px-4 py-2 w-full"
//             >
//               <option value="">{t.selectClan}</option>
//               {clans.map((clan) => (
//                 <option key={clan.title} value={clan.title}>
//                   {clan.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex-1 flex flex-col">
//             <label className="mb-1 text-sm font-medium">{t.selectSubclan}</label>
//             <select
//               value={clanSubtitle}
//               onChange={(e) => setClanSubtitle(e.target.value)}
//               className="border border-gray-300 rounded-md px-4 py-2 w-full"
//               disabled={!selectedClan}
//             >
//               <option value="">{t.allSubclans}</option>
//               {selectedClan &&
//                 selectedClan.subclans.map((sub) => (
//                   <option key={sub} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div className="flex items-end gap-2">
//             <button
//               onClick={handleSearch}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2 h-[42px]"
//             >
//               <FiSearch /> {t.search}
//             </button>
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div className="mb-6 border border-gray-200 rounded-lg p-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <h3 className="font-medium flex items-center gap-2">
//               <FiFilter className="text-indigo-600" />
//               {t.filterTitle}
//             </h3>
//             {showFilters ? <FiChevronUp /> : <FiChevronDown />}
//           </div>

//           {showFilters && (
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">{t.filterCity}</label>
//                 <select
//                   value={cityFilter}
//                   onChange={(e) => setCityFilter(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 >
//                   <option value="">{t.all}</option>
//                   {uniqueCities.map(city => (
//                     <option key={city} value={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">{t.filterDistrict}</label>
//                 <select
//                   value={districtFilter}
//                   onChange={(e) => setDistrictFilter(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 >
//                   <option value="">{t.all}</option>
//                   {uniqueDistricts.map(district => (
//                     <option key={district} value={district}>{district}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">{t.filterVoterId}</label>
//                 <select
//                   value={voterIdFilter}
//                   onChange={(e) => setVoterIdFilter(e.target.value as "all" | "yes" | "no")}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 >
//                   <option value="all">{t.all}</option>
//                   <option value="yes">{t.yes}</option>
//                   <option value="no">{t.no}</option>
//                 </select>
//               </div>

//               <div className="md:col-span-3 flex gap-2">
//                 <button
//                   onClick={clearFilters}
//                   className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
//                 >
//                   {t.clearFilters}
//                 </button>
//                 <div className="flex-1"></div>
//                 <span className="text-sm text-gray-600 flex items-center">
//                   {t.totalVoters}: {filteredVoters.length}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-8 text-blue-700">
//             <FiLoader className="animate-spin h-8 w-8 mb-2" />
//             <p>{t.loading}</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
//             <FiAlertCircle className="text-2xl" />
//             <span>
//               <strong>{t.error}</strong> {error}
//             </span>
//           </div>
//         )}

//         {/* No Results */}
//         {!loading && filteredVoters.length === 0 && !error && (
//           <p className="text-gray-600">{t.noResults}</p>
//         )}

//         {/* Summary and Export Buttons */}
//         {!loading && filteredVoters.length > 0 && (
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <button
//                 onClick={() => setShowSummary(!showSummary)}
//                 className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
//               >
//                 {showSummary ? <FiChevronUp /> : <FiChevronDown />}
//                 {showSummary ? t.hideSummary : t.showSummary}
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={exportExcel}
//                   className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
//                 >
//                   <FiDownload /> {t.downloadExcel}
//                 </button>
//                 <button
//                   onClick={exportPDF}
//                   className="bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700 flex items-center gap-2"
//                 >
//                   <FiDownload /> {t.downloadPDF}
//                 </button>
//               </div>
//             </div>

//             {/* Summary Section */}
//             {showSummary && (
//               <div className="bg-indigo-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <h3 className="font-semibold mb-2">{t.city}</h3>
//                   {Array.from(cityCounts.entries()).map(([city, count]) => (
//                     <p key={city} className="text-sm">
//                       {city}: <span className="font-medium">{count}</span>
//                     </p>
//                   ))}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">{t.district}</h3>
//                   {Array.from(districtCounts.entries()).map(([district, count]) => (
//                     <p key={district} className="text-sm">
//                       {district}: <span className="font-medium">{count}</span>
//                     </p>
//                   ))}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">{t.hasVoterId}</h3>
//                   <p className="text-sm">
//                     {t.yes}: <span className="font-medium">{hasVoterIdYes}</span>
//                   </p>
//                   <p className="text-sm">
//                     {t.no}: <span className="font-medium">{hasVoterIdNo}</span>
//                   </p>
//                   <h3 className="font-semibold mt-4 mb-2">{t.wantsChange}</h3>
//                   <p className="text-sm">
//                     {t.yes}: <span className="font-medium">{wantsChangeYes}</span>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Voter Table */}
//         {!loading && filteredVoters.length > 0 && (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full text-left text-gray-700 border">
//               <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm font-bold">
//                 <tr>
//                   <th className="py-3 px-4">{t.no}</th>
//                   <th className="py-3 px-4">{t.fullName}</th>
//                   <th className="py-3 px-4">{t.phone}</th>
//                   <th className="py-3 px-4">{t.city}</th>
//                   <th className="py-3 px-4">{t.district}</th>
//                   <th className="py-3 px-4">{t.hasVoterId}</th>
//                   <th className="py-3 px-4">{t.registeredPlace}</th>
//                   <th className="py-3 px-4">{t.wantsChange}</th>
//                   <th className="py-3 px-4">{t.newRegistration}</th>
//                   <th className="py-3 px-4">{t.desiredRegistration}</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredVoters.map((voter, index) => (
//                   <tr key={voter.id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4">{index + 1}</td>
//                     <td className="py-2 px-4">{voter.fullName}</td>
//                     <td className="py-2 px-4">{voter.phoneNumber}</td>
//                     <td className="py-2 px-4">{voter.city}</td>
//                     <td className="py-2 px-4">{voter.district}</td>
//                     <td className="py-2 px-4">{voter.hasVoterId ? t.yes : t.no}</td>
//                     <td className="py-2 px-4">{voter.registeredPlace || "-"}</td>
//                     <td className="py-2 px-4">{voter.wantsToChangeRegistration ? t.yes : t.no}</td>
//                     <td className="py-2 px-4">{voter.newRegistrationPlace || "-"}</td>
//                     <td className="py-2 px-4">{voter.desiredRegistrationPlace || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoterClanSearch;
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
  FiFilter,
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
