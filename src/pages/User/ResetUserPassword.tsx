// // import { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../Redux/store";
// // import {
// //   resetUserPassword,
// //   clearResetPasswordState,
// // } from "../../Redux/User/changePasswordSlice";
// // import { fetchAllUsers } from "../../Redux/User/userRegisterSlice";
// // import { toast, Toaster } from "react-hot-toast";

// // const ResetUserPassword = () => {
// //   const dispatch = useAppDispatch();
// //   const { adminLoading, adminSuccess, adminError, newPassword } = useAppSelector(
// //     (state) => state.changePassword
// //   );
// //   const { users, loading: usersLoading } = useAppSelector(
// //     (state) => state.userRegister
// //   );

// //   const [selectedUserId, setSelectedUserId] = useState<number | "">("");

// //   useEffect(() => {
// //     dispatch(fetchAllUsers());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (adminSuccess) {
// //       toast.success("Password reset successfully!");
// //       setSelectedUserId("");
// //       dispatch(clearResetPasswordState());
// //     }
// //     if (adminError) {
// //       toast.error(adminError);
// //       dispatch(clearResetPasswordState());
// //     }
// //   }, [adminSuccess, adminError, dispatch]);

// //   const handleReset = () => {
// //     if (!selectedUserId) {
// //       toast.error("Please select a user.");
// //       return;
// //     }
// //     dispatch(resetUserPassword({ userId: Number(selectedUserId) }));
// //   };

// //   const handleCopy = () => {
// //     if (newPassword) {
// //       navigator.clipboard.writeText(newPassword);
// //       toast.success("Password copied to clipboard!");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
// //       <Toaster position="top-center" />
// //       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
// //         <h2 className="text-2xl font-bold text-center text-indigo-700">
// //           Admin Reset User Password
// //         </h2>
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Select User</label>
// //             {usersLoading ? (
// //               <p className="text-sm text-gray-500">Loading users...</p>
// //             ) : (
// //               <select
// //                 value={selectedUserId}
// //                 onChange={(e) =>
// //                   setSelectedUserId(e.target.value ? Number(e.target.value) : "")
// //                 }
// //                 className="w-full px-3 py-2 border rounded border-gray-300"
// //               >
// //                 <option value="">-- Select a user --</option>
// //                 {users.map((user) => (
// //                   <option key={user.id} value={user.id}>
// //                     {user.fullName} ({user.email})
// //                   </option>
// //                 ))}
// //               </select>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleReset}
// //             disabled={adminLoading || !selectedUserId}
// //             className={`w-full py-2 px-4 rounded text-white font-medium flex items-center justify-center transition ${
// //               adminLoading
// //                 ? "bg-indigo-300 cursor-not-allowed"
// //                 : "bg-indigo-600 hover:bg-indigo-700"
// //             }`}
// //           >
// //             {adminLoading ? (
// //               <>
// //                 <svg
// //                   className="animate-spin h-5 w-5 mr-2 text-white"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <circle
// //                     className="opacity-25"
// //                     cx="12"
// //                     cy="12"
// //                     r="10"
// //                     stroke="currentColor"
// //                     strokeWidth="4"
// //                   ></circle>
// //                   <path
// //                     className="opacity-75"
// //                     fill="currentColor"
// //                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
// //                   ></path>
// //                 </svg>
// //                 Resetting...
// //               </>
// //             ) : (
// //               "Reset Password"
// //             )}
// //           </button>

// //           {newPassword && (
// //             <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
// //               <p className="text-sm text-green-800 mb-2">
// //                 New password generated:
// //               </p>
// //               <div className="flex items-center justify-between">
// //                 <span className="font-mono text-sm">{newPassword}</span>
// //                 <button
// //                   onClick={handleCopy}
// //                   className="ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded"
// //                 >
// //                   Copy
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResetUserPassword;
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import {
//   resetUserPassword,
//   clearResetPasswordState,
// } from "../../Redux/User/changePasswordSlice";
// import { fetchAllUsers } from "../../Redux/User/userRegisterSlice";
// import { toast, Toaster } from "react-hot-toast";

// const translations = {
//   en: {
//     title: "Admin Reset User Password",
//     selectUser: "Select User",
//     loadingUsers: "Loading users...",
//     selectPlaceholder: "-- Select a user --",
//     resetPassword: "Reset Password",
//     resetting: "Resetting...",
//     newPassword: "New password generated:",
//     copy: "Copy",
//     errorSelect: "Please select a user.",
//     successReset: "Password reset successfully!",
//     successCopy: "Password copied to clipboard!",
//   },
//   so: {
//     title: "Maamulaha Dib u dejinta Furaha Isticmaalaha",
//     selectUser: "Dooro Isticmaale",
//     loadingUsers: "Isticmaalayaal ayaa soo dhacaya...",
//     selectPlaceholder: "-- Dooro Isticmaale --",
//     resetPassword: "Dib u dejin Furaha",
//     resetting: "Dib u dejinaya...",
//     newPassword: "Furaha cusub ayaa la sameeyey:",
//     copy: "Koobi",
//     errorSelect: "Fadlan dooro isticmaale.",
//     successReset: "Furaha waxaa si guul leh dib loogu dejiyey!",
//     successCopy: "Furaha ayaa la koobiyey!",
//   },
// };

// type Language = "en" | "so";

// const ResetUserPassword = () => {
//   const dispatch = useAppDispatch();
//   const { adminLoading, adminSuccess, adminError, newPassword } = useAppSelector(
//     (state) => state.changePassword
//   );
//   const { users, loading: usersLoading } = useAppSelector(
//     (state) => state.userRegister
//   );

//   const [selectedUserId, setSelectedUserId] = useState<number | "">("");
//   const [language, setLanguage] = useState<Language>("so");

//   const t = translations[language];

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   useEffect(() => {
//     if (adminSuccess) {
//       toast.success(t.successReset);
//       setSelectedUserId("");
//       dispatch(clearResetPasswordState());
//     }
//     if (adminError) {
//       toast.error(adminError);
//       dispatch(clearResetPasswordState());
//     }
//   }, [adminSuccess, adminError, dispatch, t.successReset]);

//   const handleReset = () => {
//     if (!selectedUserId) {
//       toast.error(t.errorSelect);
//       return;
//     }
//     dispatch(resetUserPassword({ userId: Number(selectedUserId) }));
//   };

//   const handleCopy = () => {
//     if (newPassword) {
//       navigator.clipboard.writeText(newPassword);
//       toast.success(t.successCopy);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
//       <Toaster position="top-center" />
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
//         {/* Title and Language */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-indigo-700">{t.title}</h2>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value as Language)}
//             className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
//           >
//             <option value="so">Af-Soomaali</option>
//             <option value="en">English</option>
//           </select>
//         </div>

//         <div className="space-y-4">
//           {/* User Dropdown */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.selectUser}</label>
//             {usersLoading ? (
//               <p className="text-sm text-gray-500">{t.loadingUsers}</p>
//             ) : (
//               <select
//                 value={selectedUserId}
//                 onChange={(e) =>
//                   setSelectedUserId(e.target.value ? Number(e.target.value) : "")
//                 }
//                 className="w-full px-3 py-2 border rounded border-gray-300"
//               >
//                 <option value="">{t.selectPlaceholder}</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.fullName} ({user.email})
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* Reset Button */}
//           <button
//             onClick={handleReset}
//             disabled={adminLoading || !selectedUserId}
//             className={`w-full py-2 px-4 rounded text-white font-medium flex items-center justify-center transition ${
//               adminLoading
//                 ? "bg-indigo-300 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {adminLoading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   ></path>
//                 </svg>
//                 {t.resetting}
//               </>
//             ) : (
//               t.resetPassword
//             )}
//           </button>

//           {/* New Password */}
//           {newPassword && (
//             <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
//               <p className="text-sm text-green-800 mb-2">{t.newPassword}</p>
//               <div className="flex items-center justify-between">
//                 <span className="font-mono text-sm">{newPassword}</span>
//                 <button
//                   onClick={handleCopy}
//                   className="ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded"
//                 >
//                   {t.copy}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetUserPassword;
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  resetUserPassword,
  clearResetPasswordState,
} from "../../Redux/User/changePasswordSlice";
import { fetchAllUsers } from "../../Redux/User/userRegisterSlice";
import { toast, Toaster } from "react-hot-toast";

const ResetUserPassword = () => {
  const dispatch = useAppDispatch();
  const { adminLoading, adminSuccess, adminError, newPassword, message } =
    useAppSelector((state) => state.changePassword);
  const { users, loading: usersLoading } = useAppSelector(
    (state) => state.userRegister
  );

  const [selectedUserId, setSelectedUserId] = useState<number | "">("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (adminSuccess) {
      toast.success("Password reset successfully!");
      setSelectedUserId("");
    }
    if (adminError) {
      toast.error(adminError);
    }
  }, [adminSuccess, adminError]);

  const handleReset = () => {
    if (!selectedUserId) {
      toast.error("Please select a user.");
      return;
    }
    dispatch(resetUserPassword({ userId: Number(selectedUserId) }));
  };

  const handleCopy = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      toast.success("Password copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Admin Reset User Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select User</label>
            {usersLoading ? (
              <p className="text-sm text-gray-500">Loading users...</p>
            ) : (
              <select
                value={selectedUserId}
                onChange={(e) =>
                  setSelectedUserId(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3 py-2 border rounded border-gray-300"
              >
                <option value="">-- Select a user --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} ({user.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={handleReset}
            disabled={adminLoading || !selectedUserId}
            className={`w-full py-2 px-4 rounded text-white font-medium flex items-center justify-center transition ${
              adminLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {adminLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Show success message */}
          {message && (
            <div className="p-3 bg-green-50 border border-green-300 rounded">
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

          {/* Show new password */}
          {newPassword && (
            <div className="mt-2 p-3 bg-green-50 border border-green-300 rounded">
              <p className="text-sm text-green-800 mb-2">
                New Password:
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{newPassword}</span>
                <button
                  onClick={handleCopy}
                  className="ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetUserPassword;
