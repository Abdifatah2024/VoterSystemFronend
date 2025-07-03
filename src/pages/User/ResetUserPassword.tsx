import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  resetUserPassword,
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
