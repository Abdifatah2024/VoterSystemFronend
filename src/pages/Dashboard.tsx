import React, { useState } from "react";
import {
  FiUser,
  FiAward,
  FiFileText,
  FiAlertCircle,
  FiPlusCircle,
  FiDownload,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";

const translations = {
  en: {
    title: "Voter Management Report",
    summary: "System Status Summary",
    actions: "Quick Actions",
    noData: "No voter data available",
    addVoter: "Add Voter",
    importData: "Import Data",
    features: [
      "Voter Registration",
      "ID Tracking",
      "Change Requests",
      "Bulk Import",
      "Demographics",
      "Data Export",
    ]
  },
  so: {
    title: "Warbixinta Maareynta Codbixiyeyaasha",
    summary: "Warbixinta Xaaladda Nidaamka",
    actions: "Ficil Degdeg ah",
    noData: "Xog codbixin lama helin",
    addVoter: "Ku dar Codbixiye",
    importData: "Soo dejinta Xogta",
    features: [
      "Diiwaangelinta",
      "Raadinta Aqoonsiga",
      "Codsiyada Beddelka",
      "Soo dejinta Xogta",
      "Tirakoobka",
      "Dhoofinta Xogta",
    ]
  },
};

type Language = "en" | "so";

const CompactDashboard: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none bg-gray-100 border-0 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="so">SO</option>
            </select>
            <FiChevronDown className="absolute right-2 top-2 h-3 w-3 text-gray-500" />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatusCard 
            icon={<FiUser className="text-blue-500" />}
            title="Total Voters"
            value=""
            trend="%"
          />
          <StatusCard 
            icon={<FiCheckCircle className="text-green-500" />}
            title="Verified IDs"
            value=""
            trend="%"
          />
          <StatusCard 
            icon={<FiFileText className="text-yellow-500" />}
            title="Pending Requests"
            value=""
            trend="%"
          />
        </div>

        {/* Features List */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t.summary}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm p-2 hover:bg-gray-50 rounded">
                <span className="w-5 h-5 mr-2 text-gray-400">
                  {getFeatureIcon(index)}
                </span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="border-t pt-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t.actions}
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100">
              <FiPlusCircle className="mr-1" /> {t.addVoter}
            </button>
            <button className="flex items-center text-sm bg-gray-50 text-gray-600 px-3 py-2 rounded hover:bg-gray-100">
              <FiDownload className="mr-1" /> {t.importData}
            </button>
          </div>
        </div>

        {/* Data Status */}
        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
          <FiAlertCircle className="mr-1" /> {t.noData}
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="flex justify-between items-start">
      <div className="text-gray-500">{icon}</div>
      <span className={`text-xs font-medium ${
        trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend}
      </span>
    </div>
    <div className="mt-1">
      <div className="font-semibold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{title}</div>
    </div>
  </div>
);

function getFeatureIcon(index: number) {
  const icons = [
    <FiUser />,
    <FiAward />,
    <FiFileText />,
    <FiDownload />,
    <FiUser />,
    <FiDownload />,
  ];
  return icons[index % icons.length];
}

export default CompactDashboard;