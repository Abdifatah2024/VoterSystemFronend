// // // import { useFormik } from "formik";
// // // import * as yup from "yup";
// // // import { useAppDispatch, useAppSelector } from "../../Redux/store";
// // // import { login } from "../../Redux/auth/LoginSlice";
// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { Toaster, toast } from "react-hot-toast";
// // // import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from "react-icons/fi";
// // // import { motion } from "framer-motion";

// // // const Login = () => {
// // //   const dispatch = useAppDispatch();
// // //   const navigate = useNavigate();
// // //   const { loading, error, isAuthenticated } = useAppSelector(
// // //     (state) => state.loginSlice
// // //   );

// // //   const [showPassword, setShowPassword] = useState(false);

// // //   useEffect(() => {
// // //     if (error) {
// // //       toast.error(error);
// // //     }
// // //     if (isAuthenticated) {
// // //       toast.success("Login successful!");
// // //       navigate("/dashboard");
// // //     }
// // //   }, [error, isAuthenticated, navigate]);

// // //   const formik = useFormik({
// // //     initialValues: {
// // //       email: "",
// // //       password: "",
// // //     },
// // //     validationSchema: yup.object({
// // //       email: yup.string().email("Invalid email").required("Required"),
// // //       password: yup.string().min(5, "Min 5 characters").required("Required"),
// // //     }),
// // //     onSubmit: (values) => {
// // //       dispatch(login(values));
// // //     },
// // //   });

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
// // //       <Toaster position="top-center" />
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 30 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.6 }}
// // //         className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 relative z-10"
// // //       >
// // //         <h2 className="text-3xl font-bold text-center text-indigo-700">
// // //           Login to Your Account
// // //         </h2>

// // //         <form onSubmit={formik.handleSubmit} className="space-y-5">
// // //           {/* Email */}
// // //           <div>
// // //             <label className="block text-sm font-medium mb-1">Email</label>
// // //             <div className="relative">
// // //               <FiMail className="absolute left-3 top-3 text-gray-400" />
// // //               <input
// // //                 id="email"
// // //                 name="email"
// // //                 type="email"
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 value={formik.values.email}
// // //                 disabled={loading}
// // //                 className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 ${
// // //                   formik.touched.email && formik.errors.email
// // //                     ? "border-red-500 focus:ring-red-400"
// // //                     : "border-gray-300 focus:ring-indigo-400"
// // //                 }`}
// // //                 placeholder="you@example.com"
// // //               />
// // //             </div>
// // //             {formik.touched.email && formik.errors.email && (
// // //               <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
// // //             )}
// // //           </div>

// // //           {/* Password */}
// // //           <div>
// // //             <label className="block text-sm font-medium mb-1">Password</label>
// // //             <div className="relative">
// // //               <FiLock className="absolute left-3 top-3 text-gray-400" />
// // //               <input
// // //                 id="password"
// // //                 name="password"
// // //                 type={showPassword ? "text" : "password"}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 value={formik.values.password}
// // //                 disabled={loading}
// // //                 placeholder="Enter your password"
// // //                 className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 ${
// // //                   formik.touched.password && formik.errors.password
// // //                     ? "border-red-500 focus:ring-red-400"
// // //                     : "border-gray-300 focus:ring-indigo-400"
// // //                 }`}
// // //               />
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowPassword(!showPassword)}
// // //                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
// // //                 aria-label="Toggle password visibility"
// // //               >
// // //                 {showPassword ? <FiEyeOff /> : <FiEye />}
// // //               </button>
// // //             </div>
// // //             {formik.touched.password && formik.errors.password && (
// // //               <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
// // //             )}
// // //           </div>

// // //           {/* Submit */}
// // //           <button
// // //             type="submit"
// // //             disabled={loading || !formik.isValid}
// // //             className={`w-full flex items-center justify-center py-2 px-4 rounded text-white font-medium transition ${
// // //               loading || !formik.isValid
// // //                 ? "bg-indigo-300 cursor-not-allowed"
// // //                 : "bg-indigo-600 hover:bg-indigo-700"
// // //             }`}
// // //           >
// // //             {loading ? (
// // //               <svg
// // //                 className="animate-spin h-5 w-5 mr-2"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <circle
// // //                   className="opacity-25"
// // //                   cx="12"
// // //                   cy="12"
// // //                   r="10"
// // //                   stroke="currentColor"
// // //                   strokeWidth="4"
// // //                 ></circle>
// // //                 <path
// // //                   className="opacity-75"
// // //                   fill="currentColor"
// // //                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
// // //                 ></path>
// // //               </svg>
// // //             ) : (
// // //               <>
// // //                 Sign In <FiLogIn className="ml-2" />
// // //               </>
// // //             )}
// // //           </button>
// // //         </form>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // import { useFormik } from "formik";
// // import * as yup from "yup";
// // import { useAppDispatch, useAppSelector } from "../../Redux/store";
// // import { login } from "../../Redux/auth/LoginSlice";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Toaster, toast } from "react-hot-toast";
// // import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from "react-icons/fi";
// // import { motion } from "framer-motion";

// // const translations = {
// //   en: {
// //     loginTitle: "Login to Your Account",
// //     email: "Email",
// //     password: "Password",
// //     placeholderEmail: "you@example.com",
// //     placeholderPassword: "Enter your password",
// //     signIn: "Sign In",
// //     loginSuccess: "Login successful!",
// //     invalidEmail: "Invalid email",
// //     required: "Required",
// //     minPassword: "Min 5 characters",
// //   },
// //   so: {
// //     loginTitle: "Geli Akoonkaaga",
// //     email: "Email",
// //     password: "Furaha Sirta",
// //     placeholderEmail: "adiga@tusaale.com",
// //     placeholderPassword: "Gali furaha sirta",
// //     signIn: "Soo Gal",
// //     loginSuccess: "Si guul leh ayaad u gashay!",
// //     invalidEmail: "Email-ka sax ma aha",
// //     required: "Waa loo baahan yahay",
// //     minPassword: "Ugu yaraan 5 xaraf",
// //   },
// // };

// // const Login = () => {
// //   const dispatch = useAppDispatch();
// //   const navigate = useNavigate();
// //   const { loading, error, isAuthenticated } = useAppSelector(
// //     (state) => state.loginSlice
// //   );

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [language, setLanguage] = useState<"en" | "so">("en");
// //   const t = translations[language];

// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error);
// //     }
// //     if (isAuthenticated) {
// //       toast.success(t.loginSuccess);
// //       navigate("/dashboard");
// //     }
// //   }, [error, isAuthenticated, navigate, t.loginSuccess]);

// //   const formik = useFormik({
// //     initialValues: {
// //       email: "",
// //       password: "",
// //     },
// //     validationSchema: yup.object({
// //       email: yup
// //         .string()
// //         .email(t.invalidEmail)
// //         .required(t.required),
// //       password: yup
// //         .string()
// //         .min(5, t.minPassword)
// //         .required(t.required),
// //     }),
// //     onSubmit: (values) => {
// //       dispatch(login(values));
// //     },
// //   });

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
// //       <Toaster position="top-center" />
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 relative z-10"
// //       >
// //         {/* Language Selector */}
// //         <div className="flex justify-end mb-2">
// //           <select
// //             value={language}
// //             onChange={(e) => setLanguage(e.target.value as "en" | "so")}
// //             className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
// //           >
// //             <option value="en">English</option>
// //             <option value="so">Somali</option>
// //           </select>
// //         </div>

// //         <h2 className="text-3xl font-bold text-center text-indigo-700">
// //           {t.loginTitle}
// //         </h2>

// //         <form onSubmit={formik.handleSubmit} className="space-y-5">
// //           {/* Email */}
// //           <div>
// //             <label className="block text-sm font-medium mb-1">{t.email}</label>
// //             <div className="relative">
// //               <FiMail className="absolute left-3 top-3 text-gray-400" />
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 value={formik.values.email}
// //                 disabled={loading}
// //                 className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 ${
// //                   formik.touched.email && formik.errors.email
// //                     ? "border-red-500 focus:ring-red-400"
// //                     : "border-gray-300 focus:ring-indigo-400"
// //                 }`}
// //                 placeholder={t.placeholderEmail}
// //               />
// //             </div>
// //             {formik.touched.email && formik.errors.email && (
// //               <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
// //             )}
// //           </div>

// //           {/* Password */}
// //           <div>
// //             <label className="block text-sm font-medium mb-1">{t.password}</label>
// //             <div className="relative">
// //               <FiLock className="absolute left-3 top-3 text-gray-400" />
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 value={formik.values.password}
// //                 disabled={loading}
// //                 placeholder={t.placeholderPassword}
// //                 className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 ${
// //                   formik.touched.password && formik.errors.password
// //                     ? "border-red-500 focus:ring-red-400"
// //                     : "border-gray-300 focus:ring-indigo-400"
// //                 }`}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
// //                 aria-label="Toggle password visibility"
// //               >
// //                 {showPassword ? <FiEyeOff /> : <FiEye />}
// //               </button>
// //             </div>
// //             {formik.touched.password && formik.errors.password && (
// //               <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
// //             )}
// //           </div>

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             disabled={loading || !formik.isValid}
// //             className={`w-full flex items-center justify-center py-2 px-4 rounded text-white font-medium transition ${
// //               loading || !formik.isValid
// //                 ? "bg-indigo-300 cursor-not-allowed"
// //                 : "bg-indigo-600 hover:bg-indigo-700"
// //             }`}
// //           >
// //             {loading ? (
// //               <svg
// //                 className="animate-spin h-5 w-5 mr-2"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <circle
// //                   className="opacity-25"
// //                   cx="12"
// //                   cy="12"
// //                   r="10"
// //                   stroke="currentColor"
// //                   strokeWidth="4"
// //                 ></circle>
// //                 <path
// //                   className="opacity-75"
// //                   fill="currentColor"
// //                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
// //                 ></path>
// //               </svg>
// //             ) : (
// //               <>
// //                 {t.signIn} <FiLogIn className="ml-2" />
// //               </>
// //             )}
// //           </button>
// //         </form>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import { login } from "../../Redux/auth/LoginSlice";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from "react-icons/fi";
// import { motion } from "framer-motion";

// const translations = {
//   en: {
//     loginTitle: "Login to Your Account",
//     email: "Email",
//     password: "Password",
//     placeholderEmail: "you@example.com",
//     placeholderPassword: "Enter your password",
//     signIn: "Sign In",
//     loginSuccess: "Login successful!",
//     changePassword: "You must change your password before continuing.",
//     invalidEmail: "Invalid email",
//     required: "Required",
//     minPassword: "Min 5 characters",
//   },
//   so: {
//     loginTitle: "Geli Akoonkaaga",
//     email: "Email",
//     password: "Furaha Sirta",
//     placeholderEmail: "adiga@tusaale.com",
//     placeholderPassword: "Gali furaha sirta",
//     signIn: "Soo Gal",
//     loginSuccess: "Si guul leh ayaad u gashay!",
//     changePassword: "Fadlan beddel furaha sirta kahor intaadan sii wadin.",
//     invalidEmail: "Email-ka sax ma aha",
//     required: "Waa loo baahan yahay",
//     minPassword: "Ugu yaraan 5 xaraf",
//   },
// };

// const Login = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, error, isAuthenticated, user } = useAppSelector(
//     (state) => state.loginSlice
//   );

//   const [showPassword, setShowPassword] = useState(false);
//   const [language, setLanguage] = useState<"en" | "so">("so");
//   const t = translations[language];

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//     if (isAuthenticated) {
//       if (user?.requirePasswordChange) {
//         toast(t.changePassword, { icon: "🔒" });
//         navigate("/ChangePassword");
//       } else {
//         toast.success(t.loginSuccess);
//         navigate("/dashboard");
//       }
//     }
//   }, [error, isAuthenticated, user, navigate, t]);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: yup.object({
//       email: yup.string().email(t.invalidEmail).required(t.required),
//       password: yup.string().min(5, t.minPassword).required(t.required),
//     }),
//     onSubmit: (values) => {
//       dispatch(login(values));
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
//       <Toaster position="top-center" />
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 relative z-10"
//       >
//         {/* Language Selector */}
//         <div className="flex justify-end mb-2">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value as "en" | "so")}
//             className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
//           >
//             <option value="en">English</option>
//             <option value="so">Somali</option>
//           </select>
//         </div>

//         <h2 className="text-3xl font-bold text-center text-indigo-700">
//           {t.loginTitle}
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.email}</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//                 disabled={loading}
//                 className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 ${
//                   formik.touched.email && formik.errors.email
//                     ? "border-red-500 focus:ring-red-400"
//                     : "border-gray-300 focus:ring-indigo-400"
//                 }`}
//                 placeholder={t.placeholderEmail}
//               />
//             </div>
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-sm text-red-600 mt-1">
//                 {formik.errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.password}</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 disabled={loading}
//                 placeholder={t.placeholderPassword}
//                 className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 ${
//                   formik.touched.password && formik.errors.password
//                     ? "border-red-500 focus:ring-red-400"
//                     : "border-gray-300 focus:ring-indigo-400"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <p className="text-sm text-red-600 mt-1">
//                 {formik.errors.password}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading || !formik.isValid}
//             className={`w-full flex items-center justify-center py-2 px-4 rounded text-white font-medium transition ${
//               loading || !formik.isValid
//                 ? "bg-indigo-300 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mr-2"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 ></path>
//               </svg>
//             ) : (
//               <>
//                 {t.signIn} <FiLogIn className="ml-2" />
//               </>
//             )}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { login } from "../../Redux/auth/LoginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

const translations = {
  en: {
    loginTitle: "Login to Your Account",
    email: "Email",
    password: "Password",
    placeholderEmail: "you@example.com",
    placeholderPassword: "Enter your password",
    signIn: "Sign In",
    loginSuccess: "Login successful!",
    changePassword: "You must change your password before continuing.",
    invalidEmail: "Invalid email",
    required: "Required",
    minPassword: "Min 5 characters",
  },
  so: {
    loginTitle: "Geli Akoonkaaga",
    email: "Email",
    password: "Furaha Sirta",
    placeholderEmail: "adiga@tusaale.com",
    placeholderPassword: "Gali furaha sirta",
    signIn: "Soo Gal",
    loginSuccess: "Si guul leh ayaad u gashay!",
    changePassword: "Fadlan beddel furaha sirta kahor intaadan sii wadin.",
    invalidEmail: "Email-ka sax ma aha",
    required: "Waa loo baahan yahay",
    minPassword: "Ugu yaraan 5 xaraf",
  },
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, requirePasswordChange } =
    useAppSelector((state) => state.loginSlice);

  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "so">("so");
  const t = translations[language];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      if (requirePasswordChange) {
        toast(t.changePassword, { icon: "🔒" });
        navigate("/ChangePassword");
      } else {
        toast.success(t.loginSuccess);
        navigate("/dashboard");
      }
    }
  }, [error, isAuthenticated, requirePasswordChange, navigate, t]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email(t.invalidEmail).required(t.required),
      password: yup.string().min(5, t.minPassword).required(t.required),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 relative overflow-hidden">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 relative z-10"
      >
        {/* Language Selector */}
        <div className="flex justify-end mb-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "so")}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option value="en">English</option>
            <option value="so">Somali</option>
          </select>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-700">
          {t.loginTitle}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">{t.email}</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled={loading}
                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
                placeholder={t.placeholderEmail}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">{t.password}</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={loading}
                placeholder={t.placeholderPassword}
                className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !formik.isValid}
            className={`w-full flex items-center justify-center py-2 px-4 rounded text-white font-medium transition ${
              loading || !formik.isValid
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2"
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
            ) : (
              <>
                {t.signIn} <FiLogIn className="ml-2" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
