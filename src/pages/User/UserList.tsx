// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux/store";
// import { fetchAllUsers } from "../../Redux/User/userRegisterSlice";

// const UserList = () => {
//   const dispatch = useAppDispatch();
//   const { users, loading, error } = useAppSelector((state) => state.userRegister);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">User List</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {(!users || users.length === 0) && !loading && !error && (
//         <p className="text-gray-600">No users found.</p>
//       )}

//       {users && users.length > 0 && (
//         <ul className="space-y-2">
//           {users.map((user) => (
//             <li key={user.id} className="border p-3 rounded">
//               <strong>{user.fullName}</strong> ({user.email}) — {user.role}
//               <div className="text-sm text-gray-600">
//                 Phone: {user.phoneNumber || "-"}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserList;
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchAllUsers } from "../../Redux/User/userRegisterSlice";
import { FiLoader, FiAlertCircle, FiUsers } from "react-icons/fi"; // Keep essential icons

const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.userRegister);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6 sm:p-8 font-inter">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-4">
            <FiUsers className="text-indigo-600 text-5xl" /> User List
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            A comprehensive overview of all registered system users in a tabular format.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 bg-blue-50 rounded-lg shadow-inner">
            <FiLoader className="animate-spin h-10 w-10 text-blue-500 mb-3" />
            <p className="text-lg text-gray-700 font-semibold">Loading users data...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait a moment.</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative shadow-md flex items-center gap-3"
            role="alert"
          >
            <FiAlertCircle className="text-2xl" />
            <div>
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!users || users.length === 0) && !loading && !error && (
          <div
            className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-8 rounded-lg text-center shadow-md"
            role="status"
          >
            <FiUsers className="inline-block text-5xl mb-4 text-yellow-600" />
            <p className="text-xl font-semibold mb-2">No Users Found</p>
            <p className="text-gray-700">
              It looks like there are no registered users in the system yet.
            </p>
          </div>
        )}

        {/* User List Table */}
        {users && users.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-indigo-600 text-white uppercase text-sm">
                  <tr>
                    <th className="py-3 px-4 rounded-tl-lg">Full Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4 rounded-tr-lg">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-3 px-4 font-medium">{user.fullName}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.phoneNumber || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;