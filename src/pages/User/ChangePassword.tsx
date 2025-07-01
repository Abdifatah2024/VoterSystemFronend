import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { changePassword, clearChangePasswordState } from "../../Redux/User/changePasswordSlice";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useAppSelector((state) => state.changePassword);

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully. Please log in again.");
      dispatch(clearChangePasswordState());
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Delay to allow the toast to appear
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required("Old password is required"),
      newPassword: yup
        .string()
        .min(6, "Minimum 6 characters")
        .required("New password is required"),
    }),
    onSubmit: (values) => {
      dispatch(changePassword(values));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700">Change Password</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              className={`w-full px-3 py-2 border rounded ${
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className={`w-full px-3 py-2 border rounded ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.newPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className={`w-full py-2 px-4 rounded text-white font-medium flex items-center justify-center transition ${
              loading || !formik.isValid
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
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
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
