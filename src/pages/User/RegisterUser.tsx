// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import { registerUser, clearRegisterState } from "../../Redux/User/userRegisterSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"; // Import toast for notifications
// import {
//   FiUserPlus,
//   FiUser,
//   FiMail,
//   FiLock,
//   FiPhone,
//   FiTag,
//   FiLoader,
// } from "react-icons/fi"; // Import icons

// // Define a type for the roles to be used in the form state
// type UserRole = "USER" | "ADMIN";

// const RegisterUser = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, success, error } = useAppSelector((state) => state.userRegister);

//   // Explicitly type the useState hook for the form state
//   const [form, setForm] = useState<{
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     role: UserRole; // Use the UserRole type here
//   }>({
//     fullName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     role: "USER", // Initial value is a valid UserRole
//   });

//   useEffect(() => {
//     if (success) {
//       toast.success("User registered successfully!", { duration: 3000 });
//       dispatch(clearRegisterState());
//       navigate("/dashboard");
//     }
//     if (error) {
//       toast.error(error, { duration: 5000 });
//     }
//   }, [success, error, navigate, dispatch]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     // When updating the role, cast e.target.value to UserRole.
//     // This asserts to TypeScript that the value from the select will be one of the valid roles.
//     if (e.target.name === "role") {
//       setForm({ ...form, [e.target.name]: e.target.value as UserRole });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Dispatch the form data. TypeScript now knows 'form.role' is compatible.
//     dispatch(registerUser(form));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
//       <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//         {/* Header Section */}
//         <div className="mb-6 text-center">
//           <FiUserPlus className="text-blue-500 text-5xl mx-auto mb-3" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-1">Register Account</h2>
//           <p className="text-gray-600 text-sm">Fill in the details to create a new user.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label htmlFor="fullName" className="sr-only">Full Name</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 <FiUser />
//               </span>
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 placeholder="Full Name"
//                 value={form.fullName}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="sr-only">Email Address</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 <FiMail />
//               </span>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 <FiLock />
//               </span>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 <FiPhone />
//               </span>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="text"
//                 placeholder="Phone Number (Optional)"
//                 value={form.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//               />
//             </div>
//           </div>

//           {/* Role Select */}
//           <div>
//             <label htmlFor="role" className="sr-only">Role</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
//                 <FiTag />
//               </span>
//               <select
//                 id="role"
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//               >
//                 <option value="USER">User</option>
//                 <option value="ADMIN">Admin</option>
//               </select>
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//                 <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <FiLoader className="animate-spin text-white" /> Registering...
//               </>
//             ) : (
//               "Register Account"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterUser;
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { registerUser, clearRegisterState } from "../../Redux/User/userRegisterSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiUserPlus,
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiTag,
  FiLoader,
} from "react-icons/fi";

// Translation dictionaries
const translations = {
  en: {
    title: "Register Account",
    subtitle: "Fill in the details to create a new user.",
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
    phoneNumber: "Phone Number (Optional)",
    role: "Role",
    user: "User",
    admin: "Admin",
    register: "Register Account",
    registering: "Registering...",
    success: "User registered successfully!",
  },
  so: {
    title: "Diiwaan geli Akoon",
    subtitle: "Buuxi xogta si aad u abuurto isticmaale cusub.",
    fullName: "Magaca oo dhameystiran",
    email: "Cinwaanka Email-ka",
    password: "Furaha Sirta",
    phoneNumber: "Lambarka Taleefanka (Ikhtiyaari)",
    role: "Doorka Isticmaalka",
    user: "Isticmaale (Awood xadidan)",
    admin: "Maamule (Awood dhameystiran)",
    register: "Diiwaan geli Akoon",
    registering: "Waxaa la diiwaangelinayaa...",
    success: "Isticmaalaha si guul leh ayaa loo diiwaangeliyey!, Hambalyo",
  },
};

// Define a type for the roles to be used in the form state
type UserRole = "USER" | "ADMIN";
type Language = "en" | "so";

const RegisterUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useAppSelector((state) => state.userRegister);

const [language, setLanguage] = useState<Language>("so");
  const t = translations[language];

  const [form, setForm] = useState<{
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
  }>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "USER",
  });

  useEffect(() => {
    if (success) {
      toast.success(t.success, { duration: 3000 });
      dispatch(clearRegisterState());
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error, { duration: 5000 });
    }
  }, [success, error, navigate, dispatch, t.success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "role") {
      setForm({ ...form, [e.target.name]: e.target.value as UserRole });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        {/* Language Selector */}
        <div className="flex justify-end mb-2">
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
        <div className="mb-6 text-center">
          <FiUserPlus className="text-blue-500 text-5xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
          <p className="text-gray-600 text-sm">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              {t.fullName}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <FiUser />
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder={t.fullName}
                value={form.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t.email}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <FiMail />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t.email}
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              {t.password}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <FiLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={t.password}
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              {t.phoneNumber}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <FiPhone />
              </span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder={t.phoneNumber}
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-500"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              {t.role}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <FiTag />
              </span>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white"
              >
                <option value="USER">{t.user}</option>
                <option value="ADMIN">{t.admin}</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-white" /> {t.registering}
              </>
            ) : (
              t.register
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
