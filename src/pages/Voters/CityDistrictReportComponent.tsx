import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityDistrictReport } from "../../Redux/VoterSlice/voterSummarySlice";
import type { RootState, AppDispatch } from "../../Redux/store";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FiBox,
  FiLoader,
  FiDownload,
  FiAlertCircle,
  FiPieChart,
  FiBarChart2,
  FiTrendingUp,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Translations
const translations = {
  en: {
    reportTitle: "District Voter Report",
    district: "District",
    totalVoters: "Total Registered",
    withVoterId: "With Voter ID",
    withoutVoterId: "Without Voter ID",
    wantsChange: "Requests Change",
    loadingReport: "Loading report data...",
    errorFetching: "Error fetching report:",
    noData: "No report data available.",
    ensureData: "Data might be unavailable or there was an issue. Please try again later.",
    grandTotal: "Grand Total",
    downloadPDF: "Download PDF",
    downloadExcel: "Download Excel",
    analyticsTitle: "Voter Registration Analytics",
    topDistricts: "Top 5 Districts by Registration",
    highestWithID: "Highest With Voter ID",
    lowestWithoutID: "Lowest Without Voter ID",
    voterIdCoverage: "Voter ID Coverage",
    percentageCoverage: "Percentage Coverage",
    total: "Total",
    withID: "With ID",
    withoutID: "Without ID",
    showAnalytics: "Show Analytics",
    hideAnalytics: "Hide Analytics",
  },
  so: {
    reportTitle: "Warbixinta Degmooyinka Codbixiyeyaasha",
    district: "Degmo",
    totalVoters: "Wadarta la diwaangaliyey",
    withVoterId: "Haysta Kaadhka Codbixinta",
    withoutVoterId: "Aan haysan Kaadhka Cod-bixinta",
    wantsChange: "Codsaday in laga bedelo goobta",
    loadingReport: "Xogta warbixinta ayaa soo dhacaysa...",
    errorFetching: "Khalad ayaa dhacay marka xogta la soo qaadayey:",
    noData: "Ma jiraan xog warbixin ah oo la heli karo.",
    ensureData: "Xogtu ma diyaar ahayn ama cilad ayaa dhacday. Fadlan isku day mar kale.",
    grandTotal: "Wadarta Guud",
    downloadPDF: "Soo Degso PDF",
    downloadExcel: "Soo Degso Excel",
    analyticsTitle: "Falanqaynta Diwaangalinta Codbixiyeyaasha",
    topDistricts: "Degmoyinka ugu Badan Diwaangelinta",
    highestWithID: "Degmooyinka ugu Badan ee haysta Aqoonsiga Codbixinta",
    lowestWithoutID: "Degmooyinka Ugu Yar ee Aan lahyn kaadhka codbixinta",
    voterIdCoverage: "Qaabka Aqoonsiga Codbixiyeyaasha",
    percentageCoverage: "Qadarka Qaabeynta",
    total: "Wadarta",
    withID: "Leh Aqoonsi",
    withoutID: "Aan Aqoonsi Lahayn",
    showAnalytics: "Muuji Falanqaynta",
    hideAnalytics: "Qari Falanqaynta",
  },
};

type Language = "en" | "so";

const CityDistrictReportComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [language, setLanguage] = useState<Language>("so");
  const [showAnalytics, setShowAnalytics] = useState(true);
  const t = translations[language];

  const {
    cityDistrictReport,
    cityDistrictLoading,
    cityDistrictError,
  } = useSelector((state: RootState) => state.voterSummary);

  useEffect(() => {
    dispatch(fetchCityDistrictReport());
  }, [dispatch]);

  // Process district data (remove city grouping)
  const districtData = cityDistrictReport.flatMap(item => 
    item.district ? [{
      district: item.district,
      totalVoters: item.totalVoters,
      withVoterId: item.withVoterId,
      withoutVoterId: item.withoutVoterId,
      wantsToChangeRegistration: item.wantsToChangeRegistration ?? 0
    }] : []
  );

  // Sort data for different views
  const sortedByTotal = [...districtData].sort((a, b) => b.totalVoters - a.totalVoters);
  const sortedByWithID = [...districtData].sort((a, b) => b.withVoterId - a.withVoterId);
  const sortedByWithoutID = [...districtData].sort((a, b) => a.withoutVoterId - b.withoutVoterId);

  // Get top 5 for each category
  const top5ByTotal = sortedByTotal.slice(0, 5);
  const top5WithID = sortedByWithID.slice(0, 5);
  const top5LowestWithoutID = sortedByWithoutID.slice(0, 5);

  // Calculate totals
  const totals = districtData.reduce(
    (acc, item) => {
      acc.totalVoters += item.totalVoters;
      acc.withVoterId += item.withVoterId;
      acc.withoutVoterId += item.withoutVoterId;
      acc.wantsToChangeRegistration += item.wantsToChangeRegistration;
      return acc;
    },
    {
      totalVoters: 0,
      withVoterId: 0,
      withoutVoterId: 0,
      wantsToChangeRegistration: 0,
    }
  );

  // Analytics Calculations
  const voterIdCoveragePercentage = totals.totalVoters > 0 
    ? Math.round((totals.withVoterId / totals.totalVoters) * 100) 
    : 0;

  // Data for charts
  const topDistrictsChartData = {
    labels: top5ByTotal.map(district => district.district),
    datasets: [
      {
        label: t.totalVoters,
        data: top5ByTotal.map(district => district.totalVoters),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const highestWithIDChartData = {
    labels: top5WithID.map(district => district.district),
    datasets: [
      {
        label: t.withVoterId,
        data: top5WithID.map(district => district.withVoterId),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lowestWithoutIDChartData = {
    labels: top5LowestWithoutID.map(district => district.district),
    datasets: [
      {
        label: t.withoutVoterId,
        data: top5LowestWithoutID.map(district => district.withoutVoterId),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const voterIdPieData = {
    labels: [t.withID, t.withoutID],
    datasets: [
      {
        data: [totals.withVoterId, totals.withoutVoterId],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Excel Export
  const handleDownloadExcel = () => {
    const wsData = [
      [
        t.district,
        t.totalVoters,
        t.withVoterId,
        t.withoutVoterId,
        t.wantsChange,
      ],
      ...sortedByTotal.map((item) => [
        item.district ?? "Unknown",
        item.totalVoters,
        item.withVoterId,
        item.withoutVoterId,
        item.wantsToChangeRegistration,
      ]),
      [
        t.grandTotal,
        totals.totalVoters,
        totals.withVoterId,
        totals.withoutVoterId,
        totals.wantsToChangeRegistration,
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "district-voter-report.xlsx");
  };

  // PDF Export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t.reportTitle, 14, 20);

    autoTable(doc, {
      startY: 28,
      head: [[
        t.district,
        t.totalVoters,
        t.withVoterId,
        t.withoutVoterId,
        t.wantsChange
      ]],
      body: [
        ...sortedByTotal.map((item) => [
          item.district ?? "Unknown",
          item.totalVoters.toLocaleString(),
          item.withVoterId.toLocaleString(),
          item.withoutVoterId.toLocaleString(),
          item.wantsToChangeRegistration.toLocaleString(),
        ]),
        [
          t.grandTotal,
          totals.totalVoters.toLocaleString(),
          totals.withVoterId.toLocaleString(),
          totals.withoutVoterId.toLocaleString(),
          totals.wantsToChangeRegistration.toLocaleString(),
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [39, 174, 96] },
    });

    doc.save("district-voter-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 md:p-10 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
        {/* Header and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white shadow-sm focus:outline-none"
          >
            <option value="en">English</option>
            <option value="so">Somali</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              {showAnalytics ? <FiEyeOff /> : <FiEye />}
              {showAnalytics ? t.hideAnalytics : t.showAnalytics}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 transition"
            >
              <FiDownload /> {t.downloadPDF}
            </button>
            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
            >
              <FiDownload /> {t.downloadExcel}
            </button>
          </div>
        </div>

        {/* Content */}
        {cityDistrictLoading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-emerald-50 rounded-lg shadow-inner text-emerald-700">
            <FiLoader className="animate-spin h-12 w-12 mb-4" />
            <p className="text-xl font-semibold">{t.loadingReport}</p>
          </div>
        ) : cityDistrictError ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg relative shadow-md flex items-center gap-3"
            role="alert"
          >
            <FiAlertCircle className="text-3xl" />
            <div>
              <strong className="font-bold">{t.errorFetching}</strong>
              <span className="block sm:inline ml-2 text-lg">{cityDistrictError}</span>
            </div>
          </div>
        ) : districtData.length === 0 ? (
          <div
            className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-10 rounded-lg text-center shadow-md"
            role="status"
          >
            <FiBox className="inline-block text-6xl mb-5 text-yellow-600" />
            <p className="text-2xl font-bold mb-3">{t.noData}</p>
            <p className="text-gray-700 text-lg">{t.ensureData}</p>
          </div>
        ) : (
          <>
            {/* Analytics Dashboard - Conditionally Rendered */}
            {showAnalytics && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiTrendingUp className="text-emerald-600" />
                  {t.analyticsTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Summary Cards */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{t.totalVoters}</h3>
                    <p className="text-3xl font-bold text-gray-800">{totals.totalVoters.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{t.withVoterId}</h3>
                    <p className="text-3xl font-bold text-emerald-600">{totals.withVoterId.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ({voterIdCoveragePercentage}% {t.percentageCoverage})
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{t.withoutVoterId}</h3>
                    <p className="text-3xl font-bold text-amber-600">{totals.withoutVoterId.toLocaleString()}</p>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Top Districts Bar Chart */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiBarChart2 className="text-blue-500" />
                      {t.topDistricts}
                    </h3>
                    <div className="h-64">
                      <Bar 
                        data={topDistrictsChartData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Highest With ID */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiBarChart2 className="text-green-500" />
                      {t.highestWithID}
                    </h3>
                    <div className="h-64">
                      <Bar 
                        data={highestWithIDChartData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Lowest Without ID */}
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiBarChart2 className="text-red-500" />
                      {t.lowestWithoutID}
                    </h3>
                    <div className="h-64">
                      <Bar 
                        data={lowestWithoutIDChartData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Voter ID Coverage Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiPieChart className="text-purple-500" />
                    {t.voterIdCoverage}
                  </h3>
                  <div className="h-64">
                    <Pie 
                      data={voterIdPieData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Report Table */}
            <div className="mt-8 bg-white rounded-lg shadow-xl border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-emerald-50 text-emerald-800 uppercase text-sm font-bold">
                  <tr>
                    <th className="py-4 px-6">{t.district}</th>
                    <th className="py-4 px-6 text-right">{t.totalVoters}</th>
                    <th className="py-4 px-6 text-right">{t.withVoterId}</th>
                    <th className="py-4 px-6 text-right">{t.withoutVoterId}</th>
                    <th className="py-4 px-6 text-right">{t.wantsChange}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedByTotal.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-6">{item.district}</td>
                      <td className="py-3 px-6 text-right">{item.totalVoters.toLocaleString()}</td>
                      <td className="py-3 px-6 text-right">{item.withVoterId.toLocaleString()}</td>
                      <td className="py-3 px-6 text-right">{item.withoutVoterId.toLocaleString()}</td>
                      <td className="py-3 px-6 text-right">{item.wantsToChangeRegistration.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-emerald-50 font-semibold">
                  <tr>
                    <td className="py-4 px-6">{t.grandTotal}</td>
                    <td className="py-4 px-6 text-right">{totals.totalVoters.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">{totals.withVoterId.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">{totals.withoutVoterId.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">{totals.wantsToChangeRegistration.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CityDistrictReportComponent;