import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchAllUsers, deleteUser, updateUser } from "../../Redux/User/userRegisterSlice";
import { FiLoader, FiAlertCircle, FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";

const translations = {
  en: {
    title: "User List",
    subtitle: "A comprehensive overview of all registered system users in a tabular format.",
    loading: "Loading users data...",
    loadingNote: "Please wait a moment.",
    errorTitle: "Error!",
    emptyTitle: "No Users Found",
    emptyText: "It looks like there are no registered users in the system yet.",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    role: "Role",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this user?",
    cancel: "Cancel",
    saveChanges: "Save Changes",
  },
  so: {
    title: "Liiska Isticmaalayaasha",
    subtitle: "Waa Xogta guud oo dhammeystiran oo ku saabsan dhammaan isticmaalayaasha Barnaamijkan.",
    loading: "Xogta isticmaalayaasha ayaa soo dhacaysa ee fadlan yara sug!...",
    loadingNote: "Fadlan sug daqiiqad.",
    errorTitle: "waxa jira cilad!",
    emptyTitle: "Ma jiraan Isticmaalayaal",
    emptyText: "Wax isticmaalayaal diiwaangashan nidaamka weli ma jiraan.",
    fullName: "Magaca Buuxa",
    email: "Email",
    phone: "Lambarka Taleefanka",
    role: "Doorka Isticmaalaha",
    actions: "Hawlaha",
    edit: "Wax ka beddel",
    delete: "Tirtir",
    confirmDelete: "Ma hubtaa inaad tirtirayso isticmaalahan?",
    cancel: "Jooji",
    saveChanges: "Kaydi isbeddelada",
  },
};

type Language = "en" | "so";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.userRegister);

  const [language, setLanguage] = useState<Language>("so");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<typeof users[0] | null>(null);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "USER" as "USER" | "ADMIN",
  });

  const t = translations[language];

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id)).then(() => dispatch(fetchAllUsers()));
    setConfirmDeleteId(null);
  };

  const handleEditOpen = (user: typeof users[0]) => {
    setEditUser(user);
    setEditData({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      role: user.role === "ADMIN" ? "ADMIN" : "USER",
    });
  };

  const handleEditSave = () => {
    if (editUser) {
      dispatch(updateUser({ id: editUser.id, data: editData })).then(() => {
        dispatch(fetchAllUsers());
        setEditUser(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6 sm:p-8 font-inter">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option value="en">English</option>
            <option value="so">Somali</option>
          </select>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-4">
            <FiUsers className="text-indigo-600 text-5xl" /> {t.title}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">{t.subtitle}</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 bg-blue-50 rounded-lg shadow-inner">
            <FiLoader className="animate-spin h-10 w-10 text-blue-500 mb-3" />
            <p className="text-lg text-gray-700 font-semibold">{t.loading}</p>
            <p className="text-sm text-gray-500 mt-1">{t.loadingNote}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative shadow-md flex items-center gap-3"
            role="alert"
          >
            <FiAlertCircle className="text-2xl" />
            <div>
              <strong className="font-bold">{t.errorTitle}</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Empty */}
        {(!users || users.length === 0) && !loading && !error && (
          <div
            className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-8 rounded-lg text-center shadow-md"
            role="status"
          >
            <FiUsers className="inline-block text-5xl mb-4 text-yellow-600" />
            <p className="text-xl font-semibold mb-2">{t.emptyTitle}</p>
            <p className="text-gray-700">{t.emptyText}</p>
          </div>
        )}

        {/* Users Table */}
        {users && users.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-indigo-600 text-white uppercase text-sm">
                  <tr>
                    <th className="py-3 px-4">{t.fullName}</th>
                    <th className="py-3 px-4">{t.email}</th>
                    <th className="py-3 px-4">{t.phone}</th>
                    <th className="py-3 px-4">{t.role}</th>
                    <th className="py-3 px-4">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{user.fullName}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.phoneNumber || "-"}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-3">
                        <button
                          onClick={() => handleEditOpen(user)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                        >
                          <FiEdit2 /> {t.edit}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(user.id)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        >
                          <FiTrash2 /> {t.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <p className="text-gray-800 mb-4">{t.confirmDelete}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full space-y-4">
              <h2 className="text-xl font-semibold">{t.edit}</h2>
              <input
                type="text"
                placeholder={t.fullName}
                value={editData.fullName}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder={t.email}
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder={t.phone}
                value={editData.phoneNumber}
                onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value as "ADMIN" | "USER" })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {t.saveChanges}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
