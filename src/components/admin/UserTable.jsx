import React from "react";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

const UserTable = ({
  users,
  openActionMenu,
  setOpenActionMenu,
  handleBlockUser,
  handleDeleteClick,
}) => {
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Register Date</th>
              <th className="px-6 py-4 text-center">Phone</th>
              <th className="px-6 py-4 text-center">Account Type</th>
              <th className="px-6 py-4 text-center">Bookings</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                >
                  {/* Name + Email + Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {user.avatar ? (
                        <div className="relative ">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br p-1 shadow-2xl">
                            <img
                              src={`${avatarBaseUrl}${user.avatar}`}
                              alt={`${user.name}'s avatar`}
                              className="w-full h-full rounded-full object-cover bg-white"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+";
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg uppercase border-2 border-blue-200 shadow-sm">
                          {user.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <div className="text-base font-semibold text-gray-900 truncate max-w-xs">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Register Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Phone (centered) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center font-medium">
                    {user.phone || "-"}
                  </td>

                  {/* Account Type (centered) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center font-medium">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-tight ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "seller"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>

                  {/* Bookings Count (centered) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center font-bold">
                    {user.bookingCount ?? 0}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right relative">
                    <button
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === user._id ? null : user._id
                        )
                      }
                      aria-label="Open user action menu"
                      className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                      <FiMoreVertical size={24} />
                    </button>

                    {openActionMenu === user._id && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 transform origin-top-right animate-fadeIn"
                        role="menu"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleBlockUser(user);
                              setOpenActionMenu(null);
                            }}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left transition-colors duration-150"
                            role="menuitem"
                          >
                            <MdBlock className="text-lg" /> Block User
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteClick(user);
                              setOpenActionMenu(null);
                            }}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left transition-colors duration-150"
                            role="menuitem"
                          >
                            <FiTrash2 className="text-lg" /> Delete User
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-gray-500 py-10 italic text-lg"
                >
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
