import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  FiUser,
  FiAward,
  FiFileText,
  FiAlertCircle,
  FiPlusCircle,
  FiTrello,
  FiChevronDown,
  FiLoader,
} from "react-icons/fi";

import { fetchVoterDashboardSummary } from "../Redux/VoterSlice/voterSummarySlice";
import type { RootState, AppDispatch } from "../Redux/store";
import type { Role } from "../types/Login";

interface JwtPayload {
  userId: number;
  userName: string;
  role: string;
  exp: number;
  iat: number;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome back",
    totalVoters: "Total Voters",
    withVoterId: "With Voter ID",
    withoutVoterId: "Without Voter ID",
    changeRequests: "Change Requests",
    newRegistrations: "New Registrations",
    detailsTitle: "Registration Details",
    noData: "No summary data available",
    loading: "Loading...",
    error: "Failed to load data.",
  },
  so: {
    dashboard: "Dashboard",
    welcome: "Ku soo dhowow Barnaamijka xog kaydinta Muuse dhimbil",
    totalVoters: "Tirada Dadka la Diwaangaliyey",
    withVoterId: "Tirada leh Aqoonsi Codbixiye",
    withoutVoterId: "Tirada aan lahayn kaadhka codbixinta",
    changeRequests: "Inta Codsatey bedelashada Goobta",
    newRegistrations: "Diiwaangelin Cusub",
    detailsTitle: "Faahfaahinta Dheraad ah",
    noData: "Ma jiraan xog la heli karo",
    loading: "Fadlan sug...",
    error: "Xogta lama shubin.",
  },
};

type Language = "en" | "so";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [language, setLanguage] = useState<Language>("so");
  const t = translations[language];
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const reduxToken = useSelector(
    (state: RootState) => state.loginSlice.data.Access_token
  );
  const token = reduxToken || localStorage.getItem("Access_token");

  let userInfo: { userName: string; role: string } = {
    userName: "Unknown",
    role: "Unknown",
  };

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userInfo = {
        userName: decoded.userName,
        role: decoded.role as Role,
      };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const { summary, loading, error } = useSelector(
    (state: RootState) => state.voterSummary
  );

  useEffect(() => {
    dispatch(fetchVoterDashboardSummary());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 md:p-10 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            <option value="en">English</option>
            <option value="so">Somali</option>
          </select>
        </div>

        {/* Header */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-4 mb-2">
            <FiTrello className="text-blue-600 text-5xl" /> {t.dashboard}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
            <p className="text-gray-700 text-lg">
              {t.welcome},{" "}
              <span className="font-bold text-indigo-700">
                {userInfo.userName}
              </span>
            </p>
            <span className="inline-block mt-3 sm:mt-0 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold shadow-md">
              {userInfo.role}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<FiUser className="text-indigo-600" size={28} />}
            title={t.totalVoters}
            value={summary?.total || 0}
            loading={loading}
          />
          <StatCard
            icon={<FiAward className="text-green-600" size={28} />}
            title={t.withVoterId}
            value={summary?.withVoterId || 0}
            loading={loading}
          />
          <StatCard
            icon={<FiAlertCircle className="text-orange-600" size={28} />}
            title={t.withoutVoterId}
            value={summary?.withoutVoterId || 0}
            loading={loading}
          />
          <StatCard
            icon={<FiFileText className="text-blue-600" size={28} />}
            title={t.changeRequests}
            value={summary?.changeRequests || 0}
            loading={loading}
          />
        </div>

        {/* Collapsible Details Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full px-8 py-5 flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors duration-200 border-b border-gray-200"
            aria-expanded={isDetailsOpen}
            aria-controls="voter-details-content"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <FiFileText className="text-purple-600 text-2xl" /> {t.detailsTitle}
            </h2>
            <FiChevronDown
              className={`w-6 h-6 text-gray-600 transform transition-transform duration-250 ${
                isDetailsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            id="voter-details-content"
            className={`transition-all duration-300 ease-in-out ${
              isDetailsOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {loading ? (
              <div className="p-8 text-gray-500 text-center flex flex-col items-center justify-center">
                <FiLoader className="animate-spin text-4xl mb-3 text-blue-500" />
                <p className="text-lg">{t.loading}</p>
              </div>
            ) : error ? (
              <div className="p-8 bg-red-50 text-red-700 rounded-b-xl flex items-center justify-center gap-3">
                <FiAlertCircle className="text-3xl" />
                <p className="font-medium text-lg">{t.error}</p>
              </div>
            ) : summary && summary.total > 0 ? (
              <div className="divide-y divide-gray-200 px-2 py-4">
                <SummaryRow
                  icon={<FiUser size={20} className="text-indigo-500" />}
                  label={t.totalVoters}
                  value={summary.total}
                  percentage={100}
                />
                <SummaryRow
                  icon={<FiAward size={20} className="text-green-500" />}
                  label={t.withVoterId}
                  value={summary.withVoterId}
                  percentage={Math.round(
                    (summary.withVoterId / summary.total) * 100
                  )}
                />
                <SummaryRow
                  icon={<FiAlertCircle size={20} className="text-orange-500" />}
                  label={t.withoutVoterId}
                  value={summary.withoutVoterId}
                  percentage={Math.round(
                    (summary.withoutVoterId / summary.total) * 100
                  )}
                />
                <SummaryRow
                  icon={<FiFileText size={20} className="text-blue-500" />}
                  label={t.changeRequests}
                  value={summary.changeRequests}
                />
                <SummaryRow
                  icon={<FiPlusCircle size={20} className="text-purple-500" />}
                  label={t.newRegistrations}
                  value={summary.withoutVoterId}
                />
              </div>
            ) : (
              <div className="p-8 text-gray-500 text-center flex flex-col items-center justify-center">
                <FiAlertCircle className="text-4xl mb-3 text-yellow-500" />
                <p className="text-lg font-medium">{t.noData}</p>
                <p className="text-sm text-gray-600 mt-1">Please ensure data is available or try fetching again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

// Stat Card Component (unchanged from previous enhancement)
const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
  loading?: boolean;
}> = ({ icon, title, value, loading = false }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 flex items-center">
    <div className={`p-4 rounded-full flex items-center justify-center mr-4 
                ${title.includes("Total") ? 'bg-indigo-100 text-indigo-600 ring-indigo-200' :
                  title.includes("With") ? 'bg-green-100 text-green-600 ring-green-200' :
                  title.includes("Without") ? 'bg-orange-100 text-orange-600 ring-orange-200' :
                  title.includes("Change") ? 'bg-blue-100 text-blue-600 ring-blue-200' :
                  'bg-gray-100 text-gray-600 ring-gray-200'} ring-2
                `}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {value.toLocaleString()}
        </p>
      )}
    </div>
  </div>
);

// Summary Row Component (with increased percentage size)
const SummaryRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  percentage?: number;
}> = ({ icon, label, value, percentage }) => (
  <div className="px-8 py-4 flex items-center justify-between border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
    <div className="flex items-center">
      <span className="mr-4 text-xl">{icon}</span>
      <span className="font-medium text-gray-700 text-lg">{label}</span>
    </div>
    <div className="flex items-center">
      {percentage !== undefined && (
        // Adjusted height to h-4 (16px) for more space
        <div className="w-32 bg-gray-200 rounded-full h-4 mr-4 overflow-hidden relative">
          <div
            className="bg-indigo-500 h-full rounded-full absolute top-0 left-0"
            style={{ width: `${percentage}%` }}
          ></div>
           {/* Increased text size to text-sm and changed color to white */}
           <span className="absolute inset-0 flex items-center justify-center text-sm text-white font-semibold drop-shadow-sm">
              {percentage}%
           </span>
        </div>
      )}
      <span className="font-bold text-gray-900 text-lg min-w-[70px] text-right">
        {value.toLocaleString()}
      </span>
    </div>
  </div>
);

export default Dashboard;