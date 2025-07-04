// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../../Redux/store";
// import {
//   fetchUsersVotersSummary,
//   clearRegisterState,
// } from "../../Redux/User/userRegisterSlice";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";

// // 🔄 Translations
// const translations = {
//   so: {
//     title: "Warbixinta Isticmaalayaasha iyo Codbixiyayaasha",
//     totalVoters: "Codbixiyayaasha Guud",
//     genderSummary: "Tirakoobka Jinsiga",
//     citySummary: "Tirakoobka Magaalooyinka",
//     districtSummary: "Tirakoobka Degmooyinka",
//     viewVoters: "Eeg Liiska Codbixiyayaasha",
//     noData: "Xog ma jiro",
//     exportPdf: "Soo Degso PDF",
//     exportExcel: "Soo Degso Excel",
//     filterUser: "Shaandhee Isticmaalaha",
//     startDate: "Taariikhda Bilowga",
//     endDate: "Taariikhda Dhamaadka",
//   },
//   en: {
//     title: "Users & Voters Report",
//     totalVoters: "Total Voters",
//     genderSummary: "Gender Summary",
//     citySummary: "City Summary",
//     districtSummary: "District Summary",
//     viewVoters: "View Voters List",
//     noData: "No data",
//     exportPdf: "Download PDF",
//     exportExcel: "Download Excel",
//     filterUser: "Filter by User",
//     startDate: "Start Date",
//     endDate: "End Date",
//   },
// };

// export const UsersVotersSummary: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, usersVotersSummary } = useSelector(
//     (state: RootState) => state.userRegister
//   );

//   const [language, setLanguage] = useState<"so" | "en">("so");
//   const t = translations[language];

//   const [selectedUserId, setSelectedUserId] = useState<number | "all">("all");
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");

//   useEffect(() => {
//     dispatch(fetchUsersVotersSummary());
//     return () => {
//       dispatch(clearRegisterState());
//     };
//   }, [dispatch]);

//   const filteredData =
//     selectedUserId === "all"
//       ? usersVotersSummary
//       : usersVotersSummary.filter((u) => u.userId === selectedUserId);

//   const dateFilteredData = filteredData.map((user) => ({
//     ...user,
//     voters: user.voters.filter((v) => {
//       const created = new Date(v.createdAt).getTime();
//       const start = startDate ? new Date(startDate).getTime() : null;
//       const end = endDate ? new Date(endDate).getTime() : null;

//       if (start && created < start) return false;
//       if (end && created > end) return false;
//       return true;
//     }),
//   }));

// const exportPdf = () => {
//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text(t.title, 14, 14);

//   dateFilteredData.forEach((user, index) => {
//     const startY = doc.lastAutoTable?.finalY
//       ? doc.lastAutoTable.finalY + 10
//       : 24 + index * 10;

//     // Add user full name, email, and total voters
//     doc.setFontSize(12);
//     doc.text(`${user.userFullName}`, 14, startY);
//     doc.setFontSize(10);
//     doc.text(`${user.email}`, 14, startY + 5);
//     doc.text(`${t.totalVoters}: ${user.totalVoters}`, 14, startY + 10);

//     // Add summaries
//     autoTable(doc, {
//       startY: startY + 16,
//       headStyles: { fontStyle: "bold" },
//       head: [[t.genderSummary, t.citySummary, t.districtSummary]],
//       body: [
//         [
//           Object.entries(user.genderSummary)
//             .map(([k, v]) => `${k}: ${v}`)
//             .join(", "),
//           Object.entries(user.citySummary)
//             .map(([k, v]) => `${k}: ${v}`)
//             .join(", "),
//           Object.entries(user.districtSummary)
//             .map(([k, v]) => `${k}: ${v}`)
//             .join(", "),
//         ],
//       ],
//     });

//     // Add voters table
//     autoTable(doc, {
//       startY: doc.lastAutoTable.finalY + 6,
//       headStyles: { fontStyle: "bold" },
//       head: [["#", "Name", "Gender", "City", "District"]],
//       body: user.voters.map((v, idx) => [
//         idx + 1,
//         v.fullName,
//         v.gender,
//         v.city,
//         v.district,
//       ]),
//     });
//   });

//   doc.save("users_voters_summary.pdf");
// };


//   const exportExcel = () => {
//     const wb = XLSX.utils.book_new();

//     dateFilteredData.forEach((user) => {
//       const wsData = [
//         [`${t.title}`],
//         [`${user.userFullName}`],
//         [`${user.email}`],
//         [],
//         ["#", "Name", "Gender", "City", "District"],
//         ...user.voters.map((v, idx) => [
//           idx + 1,
//           v.fullName,
//           v.gender,
//           v.city,
//           v.district,
//         ]),
//       ];

//       const ws = XLSX.utils.aoa_to_sheet(wsData);
//       XLSX.utils.book_append_sheet(wb, ws, user.userFullName.slice(0, 20));
//     });

//     XLSX.writeFile(wb, "users_voters_summary.xlsx");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">{t.title}</h1>
//         <div className="space-x-2">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value as "so" | "en")}
//             className="border px-2 py-1 rounded"
//           >
//             <option value="so">Soomaali</option>
//             <option value="en">English</option>
//           </select>
//         </div>
//       </div>

//       {loading && <div className="text-gray-600 animate-pulse">Loading...</div>}
//       {error && <div className="text-red-500">Error: {error}</div>}

//       <div className="flex flex-wrap gap-2 items-center">
//         <label className="text-sm">{t.filterUser}:</label>
//         <select
//           value={selectedUserId}
//           onChange={(e) =>
//             setSelectedUserId(
//               e.target.value === "all" ? "all" : Number(e.target.value)
//             )
//           }
//           className="border px-2 py-1 rounded"
//         >
//           <option value="all">All</option>
//           {usersVotersSummary.map((u) => (
//             <option key={u.userId} value={u.userId}>
//               {u.userFullName}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border px-2 py-1 rounded"
//           placeholder={t.startDate}
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border px-2 py-1 rounded"
//           placeholder={t.endDate}
//         />

//         <button
//           onClick={exportPdf}
//           className="bg-blue-600 text-white px-3 py-1 rounded"
//         >
//           {t.exportPdf}
//         </button>
//         <button
//           onClick={exportExcel}
//           className="bg-green-600 text-white px-3 py-1 rounded"
//         >
//           {t.exportExcel}
//         </button>
//       </div>

//       {dateFilteredData.map((user) => (
//         <div
//           key={user.userId}
//           className="border border-gray-200 rounded-lg p-4 shadow-sm"
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-lg font-bold">{user.userFullName}</h2>
//               <p className="text-sm text-gray-500">{user.email}</p>
//             </div>
//             <p className="text-sm font-medium">
//               {t.totalVoters}: {user.totalVoters}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//             <SummaryTable title={t.genderSummary} data={user.genderSummary} t={t} />
//             <SummaryTable title={t.citySummary} data={user.citySummary} t={t} />
//             <SummaryTable title={t.districtSummary} data={user.districtSummary} t={t} />
//           </div>

//           <details className="mt-4">
//             <summary className="cursor-pointer text-blue-600">{t.viewVoters}</summary>
//             <ul className="mt-2 space-y-1">
//               {user.voters.map((voter) => (
//                 <li key={voter.id} className="text-sm">
//                   • {voter.fullName} ({voter.gender}) — {voter.city} / {voter.district}
//                 </li>
//               ))}
//             </ul>
//           </details>
//         </div>
//       ))}
//     </div>
//   );
// };

// interface SummaryTableProps {
//   title: string;
//   data: Record<string, number>;
//   t: typeof translations["so"];
// }

// const SummaryTable: React.FC<SummaryTableProps> = ({ title, data, t }) => (
//   <div>
//     <h3 className="font-semibold mb-2">{title}</h3>
//     {Object.keys(data).length === 0 ? (
//       <p className="text-sm text-gray-400">{t.noData}</p>
//     ) : (
//       <table className="text-sm w-full border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1 text-left">Key</th>
//             <th className="border px-2 py-1 text-left">Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(data).map(([key, count]) => (
//             <tr key={key}>
//               <td className="border px-2 py-1">{key}</td>
//               <td className="border px-2 py-1">{count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// );

// export default UsersVotersSummary;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import {
  fetchUsersVotersSummary,
  clearRegisterState,
} from "../../Redux/User/userRegisterSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// 🔄 Translations
const translations = {
  so: {
    title: "Warbixinta Isticmaalayaasha iyo Codbixiyayaasha",
    totalVoters: "Codbixiyayaasha Guud",
    genderSummary: "Tirakoobka Jinsiga",
    citySummary: "Tirakoobka Magaalooyinka",
    districtSummary: "Tirakoobka Degmooyinka",
    viewVoters: "Eeg Liiska Codbixiyayaasha",
    noData: "Xog ma jiro",
    exportPdf: "Soo Degso PDF",
    exportExcel: "Soo Degso Excel",
    filterUser: "Shaandhee Isticmaalaha",
    startDate: "Taariikhda Bilowga",
    endDate: "Taariikhda Dhammaadka",
    reportMode: "Nooca Warbixinta",
    summaryOnly: "Kaliya Tirakoobka",
    summaryDetails: "Tirakoob + Faahfaahin",
  },
  en: {
    title: "Users & Voters Report",
    totalVoters: "Total Voters",
    genderSummary: "Gender Summary",
    citySummary: "City Summary",
    districtSummary: "District Summary",
    viewVoters: "View Voters List",
    noData: "No data",
    exportPdf: "Download PDF",
    exportExcel: "Download Excel",
    filterUser: "Filter by User",
    startDate: "Start Date",
    endDate: "End Date",
    reportMode: "Report Mode",
    summaryOnly: "Summary Only",
    summaryDetails: "Summary + Details",
  },
};

export const UsersVotersSummary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, usersVotersSummary } = useSelector(
    (state: RootState) => state.userRegister
  );

  const [language, setLanguage] = useState<"so" | "en">("so");
  const t = translations[language];

  const [selectedUserId, setSelectedUserId] = useState<number | "all">("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reportMode, setReportMode] = useState<"summary" | "details">("details");

  useEffect(() => {
    dispatch(fetchUsersVotersSummary());
    return () => {
      dispatch(clearRegisterState());
    };
  }, [dispatch]);

  const filteredData = usersVotersSummary.filter((u) => {
    if (selectedUserId !== "all" && u.userId !== selectedUserId) return false;
    return true;
  });

  const dateFilteredData = filteredData.map((user) => ({
    ...user,
    voters: user.voters.filter((voter) => {
      const created = new Date(voter.createdAt);
      if (startDate && created < new Date(startDate)) return false;
      if (endDate && created > new Date(endDate)) return false;
      return true;
    }),
  }));

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t.title, 14, 14);

    dateFilteredData.forEach((user, index) => {
      const startY = doc.lastAutoTable?.finalY
        ? doc.lastAutoTable.finalY + 10
        : 24 + index * 10;

      doc.setFontSize(12);
      doc.text(`${user.userFullName}`, 14, startY);
      doc.setFontSize(10);
      doc.text(`${user.email}`, 14, startY + 5);
      doc.text(`${t.totalVoters}: ${user.totalVoters}`, 14, startY + 10);

      autoTable(doc, {
        startY: startY + 16,
        headStyles: { fontStyle: "bold" },
        head: [[t.genderSummary, t.citySummary, t.districtSummary]],
        body: [
          [
            Object.entries(user.genderSummary)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
            Object.entries(user.citySummary)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
            Object.entries(user.districtSummary)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
          ],
        ],
      });

      if (reportMode === "details") {
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 6,
          headStyles: { fontStyle: "bold" },
          head: [["#", "Name", "Gender", "City", "District"]],
          body: user.voters.map((v, idx) => [
            idx + 1,
            v.fullName,
            v.gender,
            v.city,
            v.district,
          ]),
        });
      }
    });

    doc.save("users_voters_summary.pdf");
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    dateFilteredData.forEach((user) => {
      const wsData: any[][] = [
        [t.title],
        [user.userFullName],
        [user.email],
        [`${t.totalVoters}: ${user.totalVoters}`],
        [],
      ];

      wsData.push([
        t.genderSummary,
        Object.entries(user.genderSummary)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
      ]);
      wsData.push([
        t.citySummary,
        Object.entries(user.citySummary)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
      ]);
      wsData.push([
        t.districtSummary,
        Object.entries(user.districtSummary)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
      ]);

      if (reportMode === "details") {
        wsData.push([]);
        wsData.push(["#", "Name", "Gender", "City", "District"]);
        user.voters.forEach((v, idx) => {
          wsData.push([idx + 1, v.fullName, v.gender, v.city, v.district]);
        });
      }

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, user.userFullName.slice(0, 20));
    });

    XLSX.writeFile(wb, "users_voters_summary.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <div className="space-x-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "so" | "en")}
            className="border px-2 py-1 rounded"
          >
            <option value="so">Soomaali</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {loading && <div className="text-gray-600 animate-pulse">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="flex flex-wrap gap-2 items-center">
        <label className="text-sm">{t.filterUser}:</label>
        <select
          value={selectedUserId}
          onChange={(e) =>
            setSelectedUserId(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          {usersVotersSummary.map((u) => (
            <option key={u.userId} value={u.userId}>
              {u.userFullName}
            </option>
          ))}
        </select>

        <label className="text-sm">{t.startDate}:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <label className="text-sm">{t.endDate}:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <label className="text-sm">{t.reportMode}:</label>
        <select
          value={reportMode}
          onChange={(e) => setReportMode(e.target.value as "summary" | "details")}
          className="border px-2 py-1 rounded"
        >
          <option value="summary">{t.summaryOnly}</option>
          <option value="details">{t.summaryDetails}</option>
        </select>

        <button
          onClick={exportPdf}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {t.exportPdf}
        </button>
        <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {t.exportExcel}
        </button>
      </div>

      {dateFilteredData.map((user) => (
        <div
          key={user.userId}
          className="border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{user.userFullName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <p className="text-sm font-medium">
              {t.totalVoters}: {user.totalVoters}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <SummaryTable title={t.genderSummary} data={user.genderSummary} t={t} />
            <SummaryTable title={t.citySummary} data={user.citySummary} t={t} />
            <SummaryTable title={t.districtSummary} data={user.districtSummary} t={t} />
          </div>

          {reportMode === "details" && (
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600">{t.viewVoters}</summary>
              <ul className="mt-2 space-y-1">
                {user.voters.map((voter) => (
                  <li key={voter.id} className="text-sm">
                    • {voter.fullName} ({voter.gender}) — {voter.city} / {voter.district}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      ))}
    </div>
  );
};

interface SummaryTableProps {
  title: string;
  data: Record<string, number>;
  t: typeof translations["so"];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ title, data, t }) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    {Object.keys(data).length === 0 ? (
      <p className="text-sm text-gray-400">{t.noData}</p>
    ) : (
      <table className="text-sm w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Key</th>
            <th className="border px-2 py-1 text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, count]) => (
            <tr key={key}>
              <td className="border px-2 py-1">{key}</td>
              <td className="border px-2 py-1">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default UsersVotersSummary;

