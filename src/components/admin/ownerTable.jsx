import React from "react";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

const OwnerTable = ({
  owners,
  isLoading,
  isError,
  openActionMenu,
  setOpenActionMenu,
  handleDeleteClick,
  handleUpdateStatus,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        Loading venue owners...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600 text-sm">
        Failed to fetch venue owners.
      </div>
    );
  }
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {owners.map((owner) => (
              <tr key={owner._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    {owner.avatar ? (
                      <img
                        src={`${avatarBaseUrl}${owner.avatar}`}
                        alt={`${owner.name}'s avatar`}
                        className="w-full h-full rounded-full object-cover bg-white"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+";
                        }}
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg uppercase border-2 border-blue-200 shadow-sm">
                        {owner.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div>
                      <div className="text-base font-semibold text-gray-900 truncate max-w-xs">
                        {owner.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {owner.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>{owner.email}</div>
                  <div className="text-xs text-gray-400">
                    {owner.phone || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === owner._id ? null : owner._id
                        )
                      }
                    >
                      <FiMoreVertical
                        size={20}
                        className="text-gray-500 hover:text-gray-800"
                      />
                    </button>
                    {openActionMenu === owner._id && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() =>
                              handleUpdateStatus(owner._id, owner.status)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <MdBlock />
                            {owner.status === "Active" ? "Block" : "Unblock"}
                          </button>
                          <button
                            onClick={() => handleDeleteClick(owner)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerTable;
