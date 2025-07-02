import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { fetchDemographicsSummary, clearDemographicsState } from "../../Redux/VoterSlice/demographicsSlice";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}


const translations = {
  en: {
    title: "Somaliland Voter Demographics",
    totalVoters: "Comprehensive voter registration analysis",
    genderRatio: "Gender Ratio",
    male: "Male",
    female: "Female",
    withVoterID: "With Voter ID",
    coverage: "coverage",
    largestCity: "Largest City",
    largestAgeGroup: "Largest Age Group",
    ageDistribution: "Age Distribution",
    cityDistribution: "City Distribution",
    voterIdStatus: "Voter ID Status",
    withVoterIdLabel: "With Voter ID",
    withoutVoterIdLabel: "Without Voter ID",
    note: "Only",
    haveRegisteredIDs: "voters have registered IDs",
    topDistricts: "Top 10 Districts",
    clanRepresentation: "Clan Representation (10 Clans)"
  },
  so: {
    title: "Tirakoobka Diiwaangelinta Cod-bixiyeyaasha Somaliland",
    totalVoters: "Falanqeyn dhamaystiran oo diiwaangelinta cod-bixiyeyaasha",
    genderRatio: "Qaybinta Jinsiga",
    male: "Rag",
    female: "Dumar",
    withVoterID: "Leh Kaarka Cod-bixiyaha",
    coverage: "daboolid",
    largestCity: "Magaalada Ugu Weyn",
    largestAgeGroup: "Kooxda Da'da Ugu Badan",
    ageDistribution: "Qaybinta Da'da",
    cityDistribution: "Qaybinta Magaalooyinka",
    voterIdStatus: "Xaaladda Kaarka Cod-bixiyaha",
    withVoterIdLabel: "Leh Kaarka",
    withoutVoterIdLabel: "Aan lahayn Kaarka",
    note: "Kaliya",
    haveRegisteredIDs: "cod-bixiyeyaasha haysta kaadhka",
    topDistricts: "Degmooyinka Ugu Sarreeya (10)",
    clanRepresentation: "Qabiillada (10 Qabiil)"
  }
};

const DemographicsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: RootState) => state.demographicsSlice);

  const defaultLang = "so";
  const [lang, setLang] = React.useState<"en" | "so">(defaultLang);
  const t = translations[lang];

  useEffect(() => {
    dispatch(fetchDemographicsSummary());
    return () => {
      dispatch(clearDemographicsState());
    };
  }, [dispatch]);

  const calculatePercentage = (value: number) => {
    return data ? ((value / data.totalVoters) * 100).toFixed(1) : "0";
  };

  const getColor = (index: number) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-yellow-500",
      "bg-red-500", "bg-purple-500", "bg-pink-500",
      "bg-indigo-500", "bg-teal-500", "bg-orange-500",
      "bg-cyan-500"
    ];
    return colors[index % colors.length];
  };

const downloadExcel = () => {
  if (!data) return;
  const wb = XLSX.utils.book_new();
  const wsData: any[] = [];

  // Total Voters
  wsData.push(["Total Voters", data.totalVoters]);
  wsData.push([]);

  // Gender
  wsData.push(["Gender", "Count", "Percentage"]);
  wsData.push([
    "Male",
    data.genderCounts.male,
    `${calculatePercentage(data.genderCounts.male)}%`
  ]);
  wsData.push([
    "Female",
    data.genderCounts.female,
    `${calculatePercentage(data.genderCounts.female)}%`
  ]);
  wsData.push([]);

  // Voter ID Status
  wsData.push(["Voter ID Status", "Count", "Percentage"]);
  wsData.push([
    "With Voter ID",
    data.voterIdStatus.withVoterId,
    `${calculatePercentage(data.voterIdStatus.withVoterId)}%`
  ]);
  wsData.push([
    "Without Voter ID",
    data.voterIdStatus.withoutVoterId,
    `${calculatePercentage(data.voterIdStatus.withoutVoterId)}%`
  ]);
  wsData.push([]);

  // Largest City
  const largestCity =
    [...data.votersPerCity].sort((a, b) => b.count - a.count)[0];
  wsData.push(["Largest City", largestCity.city, largestCity.count]);
  wsData.push([]);

  // Largest Age Group
  const largestAgeGroup =
    Object.entries(data.ageGroups).sort((a, b) => b[1] - a[1])[0];
  wsData.push(["Largest Age Group", largestAgeGroup[0], largestAgeGroup[1]]);
  wsData.push([]);

  // All Clans
  wsData.push(["Clan Title", "Clan Subtitle", "Count", "Percentage"]);
  data.clans.forEach((clan) => {
    wsData.push([
      clan.clanTitle,
      clan.clanSubtitle,
      clan.count,
      `${calculatePercentage(clan.count)}%`
    ]);
  });
  wsData.push([]);

  // All Cities
  wsData.push(["City", "Count", "Percentage"]);
  data.votersPerCity.forEach((city) => {
    wsData.push([
      city.city,
      city.count,
      `${calculatePercentage(city.count)}%`
    ]);
  });
  wsData.push([]);

  // Top Districts
  wsData.push(["District", "City", "Count", "Percentage"]);
  data.cityDistrict.slice(0, 10).forEach((district) => {
    wsData.push([
      district.district,
      district.city,
      district.count,
      `${calculatePercentage(district.count)}%`
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Demographics Summary");
  XLSX.writeFile(wb, "demographics_summary.xlsx");
};


const downloadPDF = () => {
  if (!data) return;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`${t.title}`, 14, 15);

  doc.setFontSize(12);
  doc.text(`Total Voters: ${data.totalVoters.toLocaleString()}`, 14, 25);

  // Gender Table
  autoTable(doc, {
    head: [["Gender", "Count", "Percentage"]],
    body: [
      ["Male", data.genderCounts.male.toLocaleString(), `${calculatePercentage(data.genderCounts.male)}%`],
      ["Female", data.genderCounts.female.toLocaleString(), `${calculatePercentage(data.genderCounts.female)}%`]
    ],
    startY: 35
  });

  // Voter ID Table
  autoTable(doc, {
    head: [["Voter ID Status", "Count", "Percentage"]],
    body: [
      ["With Voter ID", data.voterIdStatus.withVoterId.toLocaleString(), `${calculatePercentage(data.voterIdStatus.withVoterId)}%`],
      ["Without Voter ID", data.voterIdStatus.withoutVoterId.toLocaleString(), `${calculatePercentage(data.voterIdStatus.withoutVoterId)}%`]
    ],
    startY: doc.lastAutoTable.finalY + 10
  });

  // Largest City
  autoTable(doc, {
    head: [["Largest City", "Voters"]],
    body: [
      [data.votersPerCity[0]?.city || "N/A", data.votersPerCity[0]?.count?.toLocaleString() || "0"]
    ],
    startY: doc.lastAutoTable.finalY + 10
  });

  // Largest Age Group
  const sortedAge = Object.entries(data.ageGroups).sort(([, a], [, b]) => b - a);
  const [topAgeGroup, topAgeCount] = sortedAge[0];
  autoTable(doc, {
    head: [["Largest Age Group", "Voters"]],
    body: [
      [topAgeGroup, topAgeCount.toLocaleString()]
    ],
    startY: doc.lastAutoTable.finalY + 10
  });

  // Top 10 Districts Table
  const topDistricts = data.cityDistrict.slice(0, 10).map(d => [
    d.city,
    d.district,
    d.count.toLocaleString(),
    `${calculatePercentage(d.count)}%`
  ]);

  autoTable(doc, {
    head: [["City", "District", "Count", "Percentage"]],
    body: topDistricts,
    startY: doc.lastAutoTable.finalY + 10
  });

  doc.save("demographics_summary.pdf");
};




  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading voter demographics data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-2xl mx-auto mt-8">
      <div className="flex">
        <div className="text-red-500">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error loading data: {error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={downloadExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
          >
            Download Excel
          </button>
          <button
            onClick={downloadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Download PDF
          </button>
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "so")}
          className="border p-1 rounded"
        >
          <option value="so">Somali</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
        {data && (
          <p className="text-gray-600">
            {t.totalVoters} - {data.totalVoters.toLocaleString()} {lang === "en" ? "total voters" : "cod-bixiyeyaal"}
          </p>
        )}
      </div>

      {/* === All the JSX sections from previous answer === */}
      {data && (
        <>
          {/* Here insert the full JSX sections from my previous message */}
          {/* (Summary Cards, Grids, City Distribution, Clan Representation, etc.) */}
          {data && (
  <>
    {/* Summary Cards */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Gender Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-500">
        <h3 className="text-lg font-medium text-gray-700 mb-2">{t.genderRatio}</h3>
        <div className="flex justify-center space-x-4">
          <div>
            <p className="text-2xl font-bold text-blue-500">{data.genderCounts.male.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{t.male} ({calculatePercentage(data.genderCounts.male)}%)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-500">{data.genderCounts.female.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{t.female} ({calculatePercentage(data.genderCounts.female)}%)</p>
          </div>
        </div>
      </div>

      {/* Voter ID Status */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-green-500">
        <h3 className="text-lg font-medium text-gray-700 mb-2">{t.withVoterID}</h3>
        <p className="text-4xl font-bold text-green-600">{data.voterIdStatus.withVoterId}</p>
        <p className="text-sm text-gray-600">{calculatePercentage(data.voterIdStatus.withVoterId)}% {t.coverage}</p>
      </div>

      {/* Largest City */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-purple-500">
        <h3 className="text-lg font-medium text-gray-700 mb-2">{t.largestCity}</h3>
        {data.votersPerCity.length > 0 ? (
          <>
            <p className="text-2xl font-bold text-purple-600">{data.votersPerCity[0].city}</p>
            <p className="text-sm text-gray-600">{data.votersPerCity[0].count.toLocaleString()} {lang === "en" ? "voters" : "cod-bixiyeyaal"}</p>
          </>
        ) : (
          <p className="text-sm text-gray-600">N/A</p>
        )}
      </div>

      {/* Largest Age Group */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-orange-500">
        <h3 className="text-lg font-medium text-gray-700 mb-2">{t.largestAgeGroup}</h3>
        <p className="text-2xl font-bold text-orange-600">51+ Years</p>
        <p className="text-sm text-gray-600">{data.ageGroups["51+"].toLocaleString()} {lang === "en" ? "voters" : "cod-bixiyeyaal"}</p>
      </div>
    </div>

    {/* Main Content Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Clan Representation */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">{t.clanRepresentation}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.clans.map((clan, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{clan.clanTitle}</h3>
                      <p className="text-gray-600 text-sm">{clan.clanSubtitle}</p>
                    </div>
                    <span className="font-bold bg-gray-100 px-3 py-1 rounded-full">{clan.count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 flex-1">
                      <div
                        className={`h-2.5 rounded-full ${getColor(index)}`}
                        style={{ width: `${calculatePercentage(clan.count)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">{calculatePercentage(clan.count)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">{t.ageDistribution}</h2>
            <div className="grid grid-cols-4 gap-4 h-64 items-end">
              {Object.entries(data.ageGroups).map(([range, count], index) => {
                const maxCount = Math.max(...Object.values(data.ageGroups));
                const height = (count / maxCount) * 100;
                return (
                  <div key={range} className="flex flex-col items-center">
                    <div
                      className={`w-full ${getColor(index)} rounded-t-lg hover:opacity-80 transition-opacity`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <p className="text-sm font-medium mt-2">{range}</p>
                    <p className="text-xs text-gray-600">{count.toLocaleString()}</p>
                    <p className="text-xs font-semibold">{calculatePercentage(count)}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* City Distribution */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">{t.cityDistribution}</h2>
            <div className="space-y-4">
              {data.votersPerCity.map((city, index) => (
                <div key={city.city} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{city.city}</h3>
                    <span className="font-bold">{city.count.toLocaleString()} ({calculatePercentage(city.count)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${index % 2 === 0 ? "bg-blue-500" : "bg-green-500"}`}
                      style={{ width: `${calculatePercentage(city.count)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Voter ID Status */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">{t.voterIdStatus}</h2>
            <div className="space-y-4">
              {[
                ["withVoterId", t.withVoterIdLabel],
                ["withoutVoterId", t.withoutVoterIdLabel]
              ].map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{label}</span>
                    <span className="font-bold">
                      {data.voterIdStatus[key as keyof typeof data.voterIdStatus]} ({calculatePercentage(data.voterIdStatus[key as keyof typeof data.voterIdStatus])}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${key === "withVoterId" ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${calculatePercentage(data.voterIdStatus[key as keyof typeof data.voterIdStatus])}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-yellow-700 text-sm">
                {t.note} {data.voterIdStatus.withVoterId} {lang === "en" ? "voters" : "cod-bixiyeyaal"} ({calculatePercentage(data.voterIdStatus.withVoterId)}%) {t.haveRegisteredIDs}
              </p>
            </div>
          </div>
        </div>

        {/* Top Districts */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">{t.topDistricts}</h2>
            <div className="space-y-3">
              {data.cityDistrict.slice(0, 10).map((district, index) => (
                <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium">{district.district}</p>
                    <p className="text-sm text-gray-600">{district.city}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{district.count}</span>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      ({calculatePercentage(district.count)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}

        </>
      )}
    </div>
  );
};

export default DemographicsDashboard;
