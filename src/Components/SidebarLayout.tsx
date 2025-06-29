// import { useState, useEffect, useRef } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { AiOutlineMenu, AiOutlineClose, AiOutlineDashboard, AiOutlineTeam, AiOutlineSetting } from "react-icons/ai";

// const SidebarLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef<HTMLDivElement>(null);

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

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div
//         ref={sidebarRef}
//         className={`bg-blue-700 text-white p-5 pt-8 duration-300 ${
//           isOpen ? "w-64" : "w-20"
//         } fixed h-full shadow-lg z-50 transition-all`}
//       >
//         {/* Toggle Button */}
//         <div className="flex justify-end items-center mb-8">
//           <button
//             onClick={toggleSidebar}
//             className="text-xl p-2 hover:bg-blue-600 rounded-lg text-white"
//           >
//             {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col h-[calc(100%-100px)]">
//           <ul className="space-y-2 flex-1 overflow-y-auto">
//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition ${
//                     isActive ? "bg-blue-800" : ""
//                   }`
//                 }
//               >
//                 <AiOutlineDashboard className="text-lg" />
//                 {isOpen && <span className="font-medium">Dashboard</span>}
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard/voters"
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition ${
//                     isActive ? "bg-blue-800" : ""
//                   }`
//                 }
//               >
//                 <AiOutlineTeam className="text-lg" />
//                 {isOpen && <span className="font-medium">Voters</span>}
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard/settings"
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition ${
//                     isActive ? "bg-blue-800" : ""
//                   }`
//                 }
//               >
//                 <AiOutlineSetting className="text-lg" />
//                 {isOpen && <span className="font-medium">Settings</span>}
//               </NavLink>
//             </li>
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
import { AiOutlineDashboard, AiOutlineUser, AiOutlineDown, AiOutlineUp, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

type MenuItem = {
  title: string;
  path?: string;
  subItems?: MenuItem[];
  icon: React.ReactNode;
};

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: <AiOutlineUser />,
      subItems: [
        { title: "Create User", icon: <AiOutlineUser />, path: "/RegisterUser" },
        { title: "User List", icon: <AiOutlineUser />, path: "/UserList" },
      ],
    },
  ];

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
        {/* Toggle Button */}
        <div className="flex justify-end mb-6">
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
              <li key={item.title}>
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      onMouseEnter={() => !isOpen && setHoveredItem(item.title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex w-full items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition ${
                        isActive(item.path) || isChildActive(item.subItems) ? "bg-blue-800" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        {isOpen && <span>{item.title}</span>}
                      </div>
                      {isOpen && (
                        <span className="text-sm">
                          {openDropdowns[index] ? <AiOutlineUp /> : <AiOutlineDown />}
                        </span>
                      )}
                    </button>

                    {!isOpen && hoveredItem === item.title && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-blue-700 text-white text-sm rounded shadow z-50">
                        {item.title}
                      </div>
                    )}

                    {isOpen && openDropdowns[index] && (
                      <ul className="ml-6 mt-1 space-y-1 border-l-2 border-blue-600 pl-3">
                        {item.subItems.map((sub) => (
                          <li key={sub.title}>
                            <Link
                              to={sub.path || "#"}
                              className={`flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-blue-600 transition ${
                                isActive(sub.path) ? "bg-blue-800" : ""
                              }`}
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span>{sub.title}</span>
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
                    {isOpen && <span>{item.title}</span>}
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
