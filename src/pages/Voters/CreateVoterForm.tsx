// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import { createVoter, clearVoterState } from "../../Redux/VoterSlice/voterSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { FiUserPlus, FiLoader } from "react-icons/fi";

// const clans = [
//   {
//     title: "Baho-Muuse",
//     subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
//   },
//   {
//     title: "Baho-Jibriil",
//     subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
//   },
//   {
//     title: "Baho-Isxaaq",
//     subclans: ["Ciye", "Galab", "Biniin"],
//   },
// ];

// const cities = [
//   {
//     name: "Hargeisa",
//     districts: [
//       "Axmed Dhagax",
//       "Maxamuud Haybe",
//       "Maxamed Mooge",
//       "26 June",
//       "Ibraahim Koodbuur",
//       "Gacan Libaax",
//       "Macallin Haaruun",
//       "New Hargeysa",
//     ],
//   },
//   {
//     name: "Salaxley",
//     districts: [
//       "Ina guuxaa",
//       "Kaam-tuug",
//       "Dhimbilriyaale",
//       "Qoolcadey",
//       "Bali-case",
//       "Jabaase",
//       "Toon",
//       "Galoole",
//       "Hunduli",
//       "Duudku",
//     ],
//   },
// ];

// const translations = {
//   en: {
//     title: "Register Voter",
//     subtitle: "Fill in the details to register a voter.",
//     fullName: "Full Name",
//     gender: "Select Gender",
//     male: "Male",
//     female: "Female",
//     age: "Age in Years",
//     phone: "Phone Number",
//     city: "Select City",
//     district: "Select District",
//     address: "Address",
//     clan: "Select Clan",
//     subclan: "Select Sub-clan",
//     hasVoterId: "Has Voter ID",
//     wantsChange: "Wants to Change Registration",
//     registeredPlace: "Registered Place",
//     newRegistrationPlace: "New Registration Place",
//     desiredRegistrationPlace: "Desired Registration Place",
//     register: "Register Voter",
//     registering: "Creating...",
//     success: "Voter registered successfully!",
//     validAgeError: "Please enter a valid age.",
//     otherCity: "Other City (Please specify)",
//     districtInput: "District",
//   },
//   so: {
//     title: "Diiwaan geli Codbixiye",
//     subtitle: "Buuxi xogta si aad u diiwaangeliso codbixiye.",
//     fullName: "Magaca oo dhameystiran",
//     gender: "Dooro Jinsiga",
//     male: "Lab",
//     female: "Dheddig",
//     age: "Da'da (Sanado)",
//     phone: "Lambarka Taleefanka",
//     city: "Dooro Magaalada",
//     district: "Dooro Degmada",
//     address: "Cinwaanka",
//     clan: "Dooro Bahda",
//     subclan: "Dooro Ardaaga",
//     hasVoterId: "Wuu leeyahay Aqoonsi Codbixiye",
//     wantsChange: "Wuxuu doonayaa inuu beddelo goobta",
//     registeredPlace: "Goobtii hore loogu diiwaangashanaa",
//     newRegistrationPlace: "Goobta cusub ee diiwaangelinta",
//     desiredRegistrationPlace: "Goobta uu rabo in uu bedesho",
//     register: "Diiwaan geli Codbixiye",
//     registering: "Waxaa la abuurayaa...",
//     success: "Codbixiyahaa si guul leh ayaad u diiwaangelisey!, Mahadsanid",
//     validAgeError: "Fadlan geli da'd sax ah.",
//     otherCity: "Magaalada kale (Fadlan caddee)",
//     districtInput: "Degmada",
//   },
// };

// type Language = "en" | "so";

// interface VoterFormState {
//   fullName: string;
//   gender: string;
//   age: string;
//   phoneNumber: string;
//   city: string;
//   otherCity: string;
//   district: string;
//   address: string;
//   hasVoterId: boolean;
//   registeredPlace: string;
//   wantsToChangeRegistration: boolean;
//   newRegistrationPlace: string;
//   desiredRegistrationPlace: string;
//   clanTitle: string;
//   clanSubtitle: string;
// }

// const RegisterVoter: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, success, error } = useAppSelector((state) => state.voter);

//   const [language, setLanguage] = useState<Language>("so");
//   const t = translations[language];

//   const [form, setForm] = useState<VoterFormState>({
//     fullName: "",
//     gender: "",
//     age: "",
//     phoneNumber: "",
//     city: "",
//     otherCity: "",
//     district: "",
//     address: "",
//     hasVoterId: false,
//     registeredPlace: "",
//     wantsToChangeRegistration: false,
//     newRegistrationPlace: "",
//     desiredRegistrationPlace: "",
//     clanTitle: "",
//     clanSubtitle: "",
//   });

//   useEffect(() => {
//     if (success) {
//       toast.success(t.success);
//       dispatch(clearVoterState());
//       navigate("/ListAll");
//     }
//     if (error) {
//       toast.error(error);
//     }
//   }, [success, error, dispatch, navigate, t.success]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;
//     if (name === "city") {
//       setForm({
//         ...form,
//         city: value,
//         otherCity: "",
//         district: "",
//       });
//     } else if (name === "clanTitle") {
//       setForm({
//         ...form,
//         clanTitle: value,
//         clanSubtitle: "",
//       });
//     } else if (type === "checkbox") {
//       const target = e.target as HTMLInputElement;
//       setForm({
//         ...form,
//         [name]: target.checked,
//       });
//     } else {
//       setForm({
//         ...form,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const currentDate = new Date();
//     const ageNumber = parseInt(form.age, 10);
//     if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 120) {
//       toast.error(t.validAgeError);
//       return;
//     }
//     const birthYear = currentDate.getFullYear() - ageNumber;
//     const dateOfBirth = new Date(
//       birthYear,
//       currentDate.getMonth(),
//       currentDate.getDate()
//     );
//     const payload = {
//       ...form,
//       dateOfBirth: dateOfBirth.toISOString(),
//       city: form.city === "Other" ? form.otherCity : form.city,
//     };
//     dispatch(createVoter(payload));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4 font-inter">
//       <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//         <div className="flex justify-end mb-2">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value as Language)}
//             className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
//           >
//             <option value="en">English</option>
//             <option value="so">Somali</option>
//           </select>
//         </div>

//         <div className="mb-6 text-center">
//           <FiUserPlus className="text-blue-500 text-5xl mx-auto mb-3" />
//           <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
//           <p className="text-gray-600 text-sm">{t.subtitle}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             { name: "fullName", type: "text", label: t.fullName },
//             { name: "age", type: "number", label: t.age },
//             { name: "phoneNumber", type: "text", label: t.phone },
//             { name: "address", type: "text", label: t.address },
//           ].map((field) => (
//             <div key={field.name}>
//               <label className="block text-sm font-medium mb-1">{field.label}</label>
//               <input
//                 name={field.name}
//                 type={field.type}
//                 placeholder={field.label}
//                 value={form[field.name as keyof VoterFormState] as string}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           ))}

//           {/* Gender */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.gender}</label>
//             <select
//               name="gender"
//               value={form.gender}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               <option value="">{t.gender}</option>
//               <option value="Male">{t.male}</option>
//               <option value="Female">{t.female}</option>
//             </select>
//           </div>

//           {/* City */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.city}</label>
//             <select
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               <option value="">{t.city}</option>
//               {cities.map((c) => (
//                 <option key={c.name} value={c.name}>
//                   {c.name}
//                 </option>
//               ))}
//               <option value="Other">{t.otherCity}</option>
//             </select>
//           </div>

//           {/* Other City */}
//           {form.city === "Other" && (
//             <div>
//               <label className="block text-sm font-medium mb-1">{t.otherCity}</label>
//               <input
//                 name="otherCity"
//                 type="text"
//                 placeholder={t.otherCity}
//                 value={form.otherCity}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           )}

//           {/* District */}
//           {form.city && form.city !== "Other" ? (
//             <div>
//               <label className="block text-sm font-medium mb-1">{t.district}</label>
//               <select
//                 name="district"
//                 value={form.district}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
//               >
//                 <option value="">{t.district}</option>
//                 {cities
//                   .find((c) => c.name === form.city)
//                   ?.districts.map((d) => (
//                     <option key={d} value={d}>
//                       {d}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           ) : form.city === "Other" ? (
//             <div>
//               <label className="block text-sm font-medium mb-1">{t.districtInput}</label>
//               <input
//                 name="district"
//                 type="text"
//                 placeholder={t.districtInput}
//                 value={form.district}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           ) : null}

//           {/* Clan */}
//           <div>
//             <label className="block text-sm font-medium mb-1">{t.clan}</label>
//             <select
//               name="clanTitle"
//               value={form.clanTitle}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
//             >
//               <option value="">{t.clan}</option>
//               {clans.map((clan) => (
//                 <option key={clan.title} value={clan.title}>
//                   {clan.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sub-clan */}
//           {form.clanTitle && (
//             <div>
//               <label className="block text-sm font-medium mb-1">{t.subclan}</label>
//               <select
//                 name="clanSubtitle"
//                 value={form.clanSubtitle}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
//               >
//                 <option value="">{t.subclan}</option>
//                 {clans
//                   .find((clan) => clan.title === form.clanTitle)
//                   ?.subclans.map((sub) => (
//                     <option key={sub} value={sub}>
//                       {sub}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}

//           {/* Checkboxes */}
//           <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="hasVoterId"
//                 checked={form.hasVoterId}
//                 onChange={handleChange}
//               />
//               <span className="text-sm">{t.hasVoterId}</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="wantsToChangeRegistration"
//                 checked={form.wantsToChangeRegistration}
//                 onChange={handleChange}
//               />
//               <span className="text-sm">{t.wantsChange}</span>
//             </label>
//           </div>

//           {/* Registration Place */}
//           {form.hasVoterId ? (
//             <div className="col-span-1 md:col-span-2">
//               <label className="block text-sm font-medium mb-1">{t.registeredPlace}</label>
//               <input
//                 name="registeredPlace"
//                 type="text"
//                 placeholder={t.registeredPlace}
//                 value={form.registeredPlace}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           ) : (
//             <div className="col-span-1 md:col-span-2">
//               <label className="block text-sm font-medium mb-1">{t.newRegistrationPlace}</label>
//               <input
//                 name="newRegistrationPlace"
//                 type="text"
//                 placeholder={t.newRegistrationPlace}
//                 value={form.newRegistrationPlace}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           )}

//           {form.wantsToChangeRegistration && (
//             <div className="col-span-1 md:col-span-2">
//               <label className="block text-sm font-medium mb-1">{t.desiredRegistrationPlace}</label>
//               <input
//                 name="desiredRegistrationPlace"
//                 type="text"
//                 placeholder={t.desiredRegistrationPlace}
//                 value={form.desiredRegistrationPlace}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
//               />
//             </div>
//           )}

//           {/* Submit */}
//           <div className="col-span-1 md:col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <FiLoader className="animate-spin" /> {t.registering}
//                 </>
//               ) : (
//                 t.register
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterVoter;
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { createVoter, clearVoterState } from "../../Redux/VoterSlice/voterSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUserPlus, FiLoader } from "react-icons/fi";

const clans = [
  {
    title: "Baho-Muuse",
    subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
  },
  {
    title: "Baho-Jibriil",
    subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
  },
  {
    title: "Baho-Isxaaq",
    subclans: ["Ciye", "Galab", "Biniin"],
  },
];

const cities = [
  {
    name: "Hargeisa",
    districts: [
      "Axmed Dhagax",
      "Maxamuud Haybe",
      "Maxamed Mooge",
      "26 June",
      "Ibraahim Koodbuur",
      "Gacan Libaax",
      "Macallin Haaruun",
      "New Hargeysa",
    ],
  },
  {
    name: "Salaxley",
    districts: [
      "Ina guuxaa",
      "Kaam-tuug",
      "Dhimbilriyaale",
      "Qoolcadey",
      "Bali-case",
      "Jabaase",
      "Toon",
      "Galoole",
      "Hunduli",
      "Duudku",
    ],
  },
];

const translations = {
  en: {
    title: "Register Voter",
    subtitle: "Fill in the details to register a voter.",
    fullName: "Full Name",
    gender: "Select Gender",
    male: "Male",
    female: "Female",
    age: "Age in Years",
    phone: "Phone Number",
    phonePrefix: "Prefix",
    phoneRest: "7 digits",
    phoneHint:
      "Please enter a 9-digit Somaliland number. Example: 634740303 (prefix 63/65/67 + 7 digits).",
    city: "Select City",
    district: "Select District",
    address: "Address",
    clan: "Select Clan",
    subclan: "Select Sub-clan",
    hasVoterId: "Has Voter ID",
    wantsChange: "Wants to Change Registration",
    registeredPlace: "Registered Place",
    newRegistrationPlace: "New Registration Place",
    desiredRegistrationPlace: "Desired Registration Place",
    register: "Register Voter",
    registering: "Creating...",
    success: "Voter registered successfully!",
    validAgeError: "Please enter a valid age.",
    otherCity: "Other City (Please specify)",
    districtInput: "District",
    phoneInvalid:
      "Phone must start with 63, 65, or 67 and have exactly 7 more digits (total 9). Example: 634740303.",
  },
  so: {
    title: "Diiwaan geli Codbixiye",
    subtitle: "Buuxi xogta si aad u diiwaangeliso codbixiye.",
    fullName: "Magaca oo dhameystiran",
    gender: "Dooro Jinsiga",
    male: "Lab",
    female: "Dheddig",
    age: "Da'da (Sanado)",
    phone: "Lambarka Taleefanka",
    phonePrefix: "Laba-dii hore (63/65/67)",
    phoneRest: "7 tiro",
    phoneHint:
      "Fadlan u diwaan geli lambarka qaabkan 634740303 (laba-dii hore 63/65/67 + 7 tiro). Mahadsanid.",
    city: "Dooro Magaalada",
    district: "Dooro Degmada",
    address: "Cinwaanka",
    clan: "Dooro Bahda",
    subclan: "Dooro Ardaaga",
    hasVoterId: "Wuu leeyahay Aqoonsi Codbixiye",
    wantsChange: "Wuxuu doonayaa inuu beddelo goobta",
    registeredPlace: "Goobtii hore loogu diiwaangashanaa",
    newRegistrationPlace: "Goobta cusub ee diiwaangelinta",
    desiredRegistrationPlace: "Goobta uu rabo in uu bedesho",
    register: "Diiwaan geli Codbixiye",
    registering: "Waxaa la abuurayaa...",
    success:
      "Codbixiyahaa si guul leh ayaad u diiwaangelisey!, Mahadsanid",
    validAgeError: "Fadlan geli da'd sax ah.",
    otherCity: "Magaalada kale (Fadlan caddee)",
    districtInput: "Degmada",
    phoneInvalid:
      "Lambarku waa inuu ku bilaabmaa 63, 65 ama 67, wuxuuna ahaanayaa 9 tiro (7 kale kadib). Tusaale: 634740303.",
  },
};

type Language = "en" | "so";

interface VoterFormState {
  fullName: string;
  gender: string;
  age: string;
  phoneNumber: string; // final combined 9-digit number
  city: string;
  otherCity: string;
  district: string;
  address: string;
  hasVoterId: boolean;
  registeredPlace: string;
  wantsToChangeRegistration: boolean;
  newRegistrationPlace: string;
  desiredRegistrationPlace: string;
  clanTitle: string;
  clanSubtitle: string;
}

const allowedPrefixes = ["63", "65", "67"] as const;
type AllowedPrefix = (typeof allowedPrefixes)[number];

const RegisterVoter: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useAppSelector((state) => state.voter);

  const [language, setLanguage] = useState<Language>("so");
  const t = translations[language];

  // Keep all data; add UI controls for phone prefix + rest (7 digits).
  const [form, setForm] = useState<VoterFormState>({
    fullName: "",
    gender: "",
    age: "",
    phoneNumber: "", // will be composed from prefix+rest on submit and on change
    city: "",
    otherCity: "",
    district: "",
    address: "",
    hasVoterId: false,
    registeredPlace: "",
    wantsToChangeRegistration: false,
    newRegistrationPlace: "",
    desiredRegistrationPlace: "",
    clanTitle: "",
    clanSubtitle: "",
  });

  // New UI-only pieces for phone
  const [phonePrefix, setPhonePrefix] = useState<AllowedPrefix>("63"); // default 63
  const [phoneRest, setPhoneRest] = useState<string>(""); // must be 7 digits

  useEffect(() => {
    if (success) {
      toast.success(t.success);
      dispatch(clearVoterState());
      navigate("/ListAll");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate, t.success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "city") {
      setForm((prev) => ({
        ...prev,
        city: value,
        otherCity: "",
        district: "",
      }));
      return;
    }

    if (name === "clanTitle") {
      setForm((prev) => ({
        ...prev,
        clanTitle: value,
        clanSubtitle: "",
      }));
      return;
    }

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    // Prevent user from directly typing phoneNumber (we control via prefix/rest),
    // but keep compatibility if input name ever equals "phoneNumber"
    if (name === "phoneNumber") {
      return; // ignore; controlled by prefix/rest
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhonePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrefix = e.target.value as AllowedPrefix;
    setPhonePrefix(newPrefix);
    // update composed phoneNumber in form
    setForm((prev) => ({
      ...prev,
      phoneNumber: `${newPrefix}${phoneRest}`,
    }));
  };

  const handlePhoneRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // restrict to digits only and max length 7
    const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
    setPhoneRest(digits);
    setForm((prev) => ({
      ...prev,
      phoneNumber: `${phonePrefix}${digits}`,
    }));
  };

  const validPhone = (prefix: string, rest: string) => {
    return (
      allowedPrefixes.includes(prefix as AllowedPrefix) &&
      /^[0-9]{7}$/.test(rest)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // age validation
    const currentDate = new Date();
    const ageNumber = parseInt(form.age, 10);
    if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 120) {
      toast.error(t.validAgeError);
      return;
    }

    // phone validation
    if (!validPhone(phonePrefix, phoneRest)) {
      toast.error(t.phoneInvalid);
      return;
    }

    const birthYear = currentDate.getFullYear() - ageNumber;
    const dateOfBirth = new Date(
      birthYear,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const payload = {
      ...form,
      // ensure we send the composed 9-digit number
      phoneNumber: `${phonePrefix}${phoneRest}`,
      dateOfBirth: dateOfBirth.toISOString(),
      city: form.city === "Other" ? form.otherCity : form.city,
    };

    dispatch(createVoter(payload));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4 font-inter">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
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

        <div className="mb-6 text-center">
          <FiUserPlus className="text-blue-500 text-5xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600 text-sm">{t.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { name: "fullName", type: "text", label: t.fullName },
            { name: "age", type: "number", label: t.age },
            // phone moved to custom UI below; keep row alignment by skipping here
            { name: "address", type: "text", label: t.address },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.label}
                value={form[field.name as keyof VoterFormState] as string}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          ))}

          {/* Phone Number (prefix select + 7 digit input) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              {t.phone}
            </label>
            <div className="flex gap-3">
              <select
                aria-label={t.phonePrefix}
                value={phonePrefix}
                onChange={handlePhonePrefixChange}
                className="w-24 px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
              >
                {allowedPrefixes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <input
                aria-label={t.phoneRest}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={7}
                placeholder={t.phoneRest}
                value={phoneRest}
                onChange={handlePhoneRestChange}
                required
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t.phoneHint}
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">{t.gender}</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
            >
              <option value="">{t.gender}</option>
              <option value="Male">{t.male}</option>
              <option value="Female">{t.female}</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">{t.city}</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
            >
              <option value="">{t.city}</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="Other">{t.otherCity}</option>
            </select>
          </div>

          {/* Other City */}
          {form.city === "Other" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.otherCity}
              </label>
              <input
                name="otherCity"
                type="text"
                placeholder={t.otherCity}
                value={form.otherCity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          )}

          {/* District */}
          {form.city && form.city !== "Other" ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.district}
              </label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
              >
                <option value="">{t.district}</option>
                {cities
                  .find((c) => c.name === form.city)
                  ?.districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
            </div>
          ) : form.city === "Other" ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.districtInput}
              </label>
              <input
                name="district"
                type="text"
                placeholder={t.districtInput}
                value={form.district}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          ) : null}

          {/* Clan */}
          <div>
            <label className="block text-sm font-medium mb-1">{t.clan}</label>
            <select
              name="clanTitle"
              value={form.clanTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
            >
              <option value="">{t.clan}</option>
              {clans.map((clan) => (
                <option key={clan.title} value={clan.title}>
                  {clan.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-clan */}
          {form.clanTitle && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.subclan}
              </label>
              <select
                name="clanSubtitle"
                value={form.clanSubtitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white"
              >
                <option value="">{t.subclan}</option>
                {clans
                  .find((clan) => clan.title === form.clanTitle)
                  ?.subclans.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Checkboxes */}
          <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hasVoterId"
                checked={form.hasVoterId}
                onChange={handleChange}
              />
              <span className="text-sm">{t.hasVoterId}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="wantsToChangeRegistration"
                checked={form.wantsToChangeRegistration}
                onChange={handleChange}
              />
              <span className="text-sm">{t.wantsChange}</span>
            </label>
          </div>

          {/* Registration Place */}
          {form.hasVoterId ? (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                {t.registeredPlace}
              </label>
              <input
                name="registeredPlace"
                type="text"
                placeholder={t.registeredPlace}
                value={form.registeredPlace}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          ) : (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                {t.newRegistrationPlace}
              </label>
              <input
                name="newRegistrationPlace"
                type="text"
                placeholder={t.newRegistrationPlace}
                value={form.newRegistrationPlace}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          )}

          {form.wantsToChangeRegistration && (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                {t.desiredRegistrationPlace}
              </label>
              <input
                name="desiredRegistrationPlace"
                type="text"
                placeholder={t.desiredRegistrationPlace}
                value={form.desiredRegistrationPlace}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
          )}

          {/* Submit */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" /> {t.registering}
                </>
              ) : (
                t.register
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVoter;

