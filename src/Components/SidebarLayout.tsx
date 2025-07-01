// import { useState, useEffect, useRef } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import {
//   AiOutlineDashboard,
//   AiOutlineUser,
//   AiOutlineTeam,
//   AiOutlineAppstore,
//   AiOutlineDown,
//   AiOutlineUp,
//   AiOutlineMenu,
//   AiOutlineClose,
// } from "react-icons/ai";
// import type { RootState } from "../Redux/store";

// type MenuItem = {
//   titleKey: keyof typeof translations["en"];
//   path?: string;
//   subItems?: MenuItem[];
//   icon: React.ReactNode;
// };

// const translations = {
//   en: {
//     dashboard: "Dashboard",
//     voters: "Voters",
//     register: "Register",
//     RegisterWithExcel: "Register With Excel",
//     cityDistrict: "City and District",
//     allList: "All List",
//     searchClan: "Search Clan",
//     users: "Users",
//     createUser: "Create User",
//     userList: "User List",
//     adminResetPassword: "Admin Password Reset",
//   },
//   so: {
//     dashboard: "Dashboard-ka",
//     voters: "Codbixiyeyaasha",
//     register: "Diiwaan-geli",
//     RegisterWithExcel: "Ku Diiwaan-geli Excel",
//     cityDistrict: "Magaalo & Degmo",
//     allList: "Dhammaan Liiska",
//     searchClan: "Raadi Ardaaga",
//     users: "Isticmaalayaasha",
//     createUser: "Abuur Isticmaale",
//     userList: "Liiska Isticmaalayaasha",
//     adminResetPassword: "Admin-ka Beddelka Furaha",
//   },
// };

// interface JwtPayload {
//   userId: number;
//   role: "ADMIN" | "USER";
//   exp: number;
//   iat: number;
// }

// const SidebarLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [openDropdowns, setOpenDropdowns] = useState<boolean[]>([]);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const [lang, setLang] = useState<"so" | "en">("so");
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//   const t = translations[lang];

//   // Get token and decode
//   const reduxToken = useSelector(
//     (state: RootState) => state.loginSlice.data.Access_token
//   );
//   const token = reduxToken || localStorage.getItem("Access_token");

//   let userRole: "ADMIN" | "USER" = "USER";
//   if (token) {
//     try {
//       const decoded = jwtDecode<JwtPayload>(token);
//       userRole = decoded.role;
//     } catch (e) {
//       console.error("Failed to decode token:", e);
//     }
//   }

//   useEffect(() => {
//     const handleResize = () => setIsOpen(window.innerWidth >= 1024);
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         window.innerWidth < 1024
//       ) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     document.addEventListener("mousedown", handleClickOutside);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Full menu
//   const menuItems: MenuItem[] = [
//     {
//       titleKey: "dashboard",
//       icon: <AiOutlineDashboard />,
//       path: "/dashboard",
//     },
//     {
//       titleKey: "voters",
//       icon: <AiOutlineTeam />,
//       subItems: [
//         {
//           titleKey: "register",
//           icon: <AiOutlineAppstore />,
//           path: "/RegisterPerson",
//         },
//         {
//           titleKey: "RegisterWithExcel",
//           icon: <AiOutlineTeam />,
//           path: "/RegisterEcxel",
//         },
//         {
//           titleKey: "cityDistrict",
//           icon: <AiOutlineTeam />,
//           path: "/CityAndDistrict",
//         },
//         {
//           titleKey: "allList",
//           icon: <AiOutlineTeam />,
//           path: "/ListAll",
//         },
//         {
//           titleKey: "searchClan",
//           icon: <AiOutlineTeam />,
//           path: "/VoterByClan",
//         },
//       ],
//     },
//     {
//       titleKey: "users",
//       icon: <AiOutlineUser />,
//       subItems: [
//         { titleKey: "createUser", icon: <AiOutlineUser />, path: "/RegisterUser" },
//         { titleKey: "userList", icon: <AiOutlineUser />, path: "/UserList" },
//         { titleKey: "adminResetPassword", icon: <AiOutlineUser />, path: "/admin/reset-user-password" },
//       ],
//     },
//   ];

//   // Filter menu for USER role
//   const filteredMenu =
//     userRole === "USER"
//       ? menuItems
//           .map((item) => {
//             if (item.titleKey === "users") {
//               return null; // Hide Users section
//             }
//             if (item.titleKey === "voters") {
//               const filteredSubItems = item.subItems?.filter((sub) =>
//                 ["/RegisterPerson", "/RegisterEcxel"].includes(sub.path || "")
//               );
//               return { ...item, subItems: filteredSubItems };
//             }
//             return item;
//           })
//           .filter(Boolean) as MenuItem[]
//       : menuItems;

//   const toggleDropdown = (index: number) => {
//     setOpenDropdowns((prev) => {
//       const newState = [...prev];
//       newState[index] = !newState[index];
//       return newState;
//     });
//   };

//   const isActive = (path?: string) => path && location.pathname === path;
//   const isChildActive = (subItems?: MenuItem[]) =>
//     subItems?.some((subItem) => isActive(subItem.path));

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div
//         ref={sidebarRef}
//         className={`bg-blue-700 text-white p-5 pt-8 duration-300 ${
//           isOpen ? "w-64" : "w-20"
//         } fixed h-full shadow-lg z-50 transition-all`}
//       >
//         {/* Toggle & Language */}
//         <div className="flex justify-between mb-6 items-center">
//           {isOpen && (
//             <select
//               value={lang}
//               onChange={(e) => setLang(e.target.value as "so" | "en")}
//               className="bg-blue-600 text-white text-xs rounded px-2 py-1"
//             >
//               <option value="so">Af-Soomaali</option>
//               <option value="en">English</option>
//             </select>
//           )}
//           <button
//             onClick={toggleSidebar}
//             className="text-xl p-2 hover:bg-blue-600 rounded-lg"
//           >
//             {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex flex-col h-full">
//           <ul className="space-y-2 flex-1 overflow-y-auto">
//             {filteredMenu.map((item, index) => (
//               <li key={item.titleKey}>
//                 {item.subItems ? (
//                   <div className="relative">
//                     <button
//                       onClick={() => toggleDropdown(index)}
//                       onMouseEnter={() => !isOpen && setHoveredItem(item.titleKey)}
//                       onMouseLeave={() => setHoveredItem(null)}
//                       className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition ${
//                         isActive(item.path) || isChildActive(item.subItems)
//                           ? "bg-blue-800"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg">{item.icon}</span>
//                         {isOpen && <span>{t[item.titleKey]}</span>}
//                       </div>
//                       {isOpen && (
//                         <span className="text-sm">
//                           {openDropdowns[index] ? <AiOutlineUp /> : <AiOutlineDown />}
//                         </span>
//                       )}
//                     </button>

//                     {!isOpen && hoveredItem === item.titleKey && (
//                       <div className="absolute left-full ml-2 px-3 py-2 bg-blue-700 text-white text-sm rounded shadow z-50">
//                         {t[item.titleKey]}
//                       </div>
//                     )}

//                     {isOpen && openDropdowns[index] && (
//                       <ul className="ml-6 mt-1 space-y-1 border-l-2 border-blue-600 pl-3">
//                         {item.subItems.map((sub) => (
//                           <li key={sub.titleKey}>
//                             <Link
//                               to={sub.path || "#"}
//                               className={`flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-blue-600 transition ${
//                                 isActive(sub.path) ? "bg-blue-800" : ""
//                               }`}
//                             >
//                               <span className="text-lg">{sub.icon}</span>
//                               <span>{t[sub.titleKey]}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={item.path || "#"}
//                     className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition ${
//                       isActive(item.path) ? "bg-blue-800" : ""
//                     }`}
//                   >
//                     <span className="text-lg">{item.icon}</span>
//                     {isOpen && <span>{t[item.titleKey]}</span>}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <div className={`flex-1 transition-all ${isOpen ? "ml-64" : "ml-20"}`}>
//         <main className="p-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;
import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineAppstore,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLock,
} from "react-icons/ai";
import type { RootState } from "../Redux/store";

type MenuItem = {
  titleKey: keyof typeof translations["en"];
  path?: string;
  subItems?: MenuItem[];
  icon: React.ReactNode;
};

const translations = {
  en: {
    dashboard: "Dashboard",
    voters: "Voters",
    register: "Register",
    RegisterWithExcel: "Register With Excel",
    cityDistrict: "City and District",
    allList: "All List",
    searchClan: "Search Clan",
    users: "Admin Users",
    userSelf: "My Account",
    createUser: "Create User",
    userList: "User List",
    adminResetPassword: "Admin Password Reset",
    changePassword: "Change Password",
  },
  so: {
    dashboard: "Dashboard-ka",
    voters: "Codbixiyeyaasha",
    register: "Diiwaan-geli",
    RegisterWithExcel: "Ku Diiwaan-geli Excel",
    cityDistrict: "Magaalo & Degmo",
    allList: "Dhammaan Liiska",
    searchClan: "Raadi Ardaaga",
    users: "Maamulayaasha",
    userSelf: "Akaawnkayga",
    createUser: "Abuur Isticmaale",
    userList: "Liiska Isticmaalayaasha",
    adminResetPassword: "Admin-ka Beddelka Furaha",
    changePassword: "Beddel Furaha",
  },
};

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER";
  exp: number;
  iat: number;
}

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [lang, setLang] = useState<"so" | "en">("so");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const t = translations[lang];

  const reduxToken = useSelector(
    (state: RootState) => state.loginSlice.data.Access_token
  );
  const token = reduxToken || localStorage.getItem("Access_token");

  let userRole: "ADMIN" | "USER" = "USER";
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userRole = decoded.role;
    } catch (e) {
      console.error("Failed to decode token:", e);
    }
  }

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 1024);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    {
      titleKey: "dashboard",
      icon: <AiOutlineDashboard />,
      path: "/dashboard",
    },
    {
      titleKey: "voters",
      icon: <AiOutlineTeam />,
      subItems: [
        { titleKey: "register", icon: <AiOutlineAppstore />, path: "/RegisterPerson" },
        { titleKey: "RegisterWithExcel", icon: <AiOutlineTeam />, path: "/RegisterEcxel" },
        { titleKey: "cityDistrict", icon: <AiOutlineTeam />, path: "/CityAndDistrict" },
        { titleKey: "allList", icon: <AiOutlineTeam />, path: "/ListAll" },
        { titleKey: "searchClan", icon: <AiOutlineTeam />, path: "/VoterByClan" },
      ],
    },
    userRole === "ADMIN"
      ? {
          titleKey: "users",
          icon: <AiOutlineUser />,
          subItems: [
            { titleKey: "createUser", icon: <AiOutlineUser />, path: "/RegisterUser" },
            { titleKey: "userList", icon: <AiOutlineUser />, path: "/UserList" },
            { titleKey: "adminResetPassword", icon: <AiOutlineUser />, path: "/admin/reset-user-password" },
          ],
        }
      : null,
    {
      titleKey: "changePassword",
      icon: <AiOutlineLock />,
      path: "/ChangePassword",
    },
  ].filter(Boolean) as MenuItem[];

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const isActive = (path?: string) => path && location.pathname === path;
  const isChildActive = (subItems?: MenuItem[]) =>
    subItems?.some((subItem) => isActive(subItem.path));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        ref={sidebarRef}
        className={`bg-blue-700 text-white p-5 pt-8 duration-300 ${
          isOpen ? "w-64" : "w-20"
        } fixed h-full shadow-lg z-50 transition-all`}
      >
        {/* Toggle & Language */}
        <div className="flex justify-between mb-6 items-center">
          {isOpen && (
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "so" | "en")}
              className="bg-blue-600 text-white text-xs rounded px-2 py-1"
            >
              <option value="so">Af-Soomaali</option>
              <option value="en">English</option>
            </select>
          )}
          <button
            onClick={toggleSidebar}
            className="text-xl p-2 hover:bg-blue-600 rounded-lg"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col h-full">
          <ul className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <li key={item.titleKey}>
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      onMouseEnter={() => !isOpen && setHoveredItem(item.titleKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition ${
                        isActive(item.path) || isChildActive(item.subItems)
                          ? "bg-blue-800"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        {isOpen && (
                          <span>
                            {item.titleKey === "users" && userRole === "USER"
                              ? t.userSelf
                              : t[item.titleKey]}
                          </span>
                        )}
                      </div>
                      {isOpen && (
                        <span className="text-sm">
                          {openDropdowns[index] ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      )}
                    </button>
                    {!isOpen && hoveredItem === item.titleKey && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-blue-700 text-white text-sm rounded shadow z-50">
                        {item.titleKey === "users" && userRole === "USER"
                          ? t.userSelf
                          : t[item.titleKey]}
                      </div>
                    )}
                    {isOpen && openDropdowns[index] && (
                      <ul className="ml-6 mt-1 space-y-1 border-l-2 border-blue-600 pl-3">
                        {item.subItems.map((sub) => (
                          <li key={sub.titleKey}>
                            <Link
                              to={sub.path || "#"}
                              className={`flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-blue-600 transition ${
                                isActive(sub.path) ? "bg-blue-800" : ""
                              }`}
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span>{t[sub.titleKey]}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition ${
                      isActive(item.path) ? "bg-blue-800" : ""
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isOpen && <span>{t[item.titleKey]}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`flex-1 transition-all ${isOpen ? "ml-64" : "ml-20"}`}>
        <main className="p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
