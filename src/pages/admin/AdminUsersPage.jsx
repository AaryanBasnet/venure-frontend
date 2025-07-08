import React, { useState, useMemo } from "react";
import { FiPlus, FiAlertTriangle } from "react-icons/fi";
import SearchInput from "../../components/common/SearchInput";
import { useAdminUser } from "../../hooks/admin/useAdminUser";
import UserTable from "../../components/admin/UserTable";
import { useDeleteUser } from "../../hooks/admin/useDeleteUser";
import { useDebounce } from "../../hooks/useDebounce";

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
    const debouncedSearch = useDebounce(searchQuery, 500); // 500ms delay
  const { mutate: deleteUser } = useDeleteUser();

  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useAdminUser(
    page,
    limit,
    debouncedSearch
  );
  const users = data?.data || [];
  const totalUsers = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  // const filteredUsers = useMemo(() => {
  //   if (!searchQuery) return users;
  //   return users.filter(
  //     (user) =>
  //       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       user.email.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [searchQuery, users]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenActionMenu(null);
  };

  const handleBlockUser = (user) => {
    console.log("Block user:", user.name);
    setOpenActionMenu(null);
  };

  const confirmDeleteUser = () => {
    if (userToDelete?._id) {
      deleteUser(userToDelete._id);
      setUserToDelete(null);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading users...
      </div>
    );
  if (isError)
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        <FiAlertTriangle className="inline-block mr-2 text-red-600" size={20} />
        Error fetching users. Please try again later.
      </div>
    );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          User Management
        </h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <SearchInput
            value={searchQuery}
            onChange={(e) => {
              setPage(1);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search by name or email"
            className="flex-grow sm:flex-grow-0 sm:min-w-[250px]"
          />
        </div>
      </div>

      <UserTable
        users={users}
        openActionMenu={openActionMenu}
        setOpenActionMenu={setOpenActionMenu}
        handleBlockUser={handleBlockUser}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <span className="text-gray-700 text-sm sm:text-base">
          Showing{" "}
          <span className="font-semibold">{(page - 1) * limit + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(page * limit, totalUsers)}
          </span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold text-sm">
            {page}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center animate-scaleIn">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-5">
              <FiAlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Confirm Deletion
            </h3>
            <p className="mt-2 text-md text-gray-600 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-red-700">{userToDelete.name}</strong>?
              This action is permanent and cannot be undone.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                className="flex-1 px-5 py-2.5 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-5 py-2.5 text-lg font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
                onClick={confirmDeleteUser}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
