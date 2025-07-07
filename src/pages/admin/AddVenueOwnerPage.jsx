import React, { useState, useMemo } from "react";
import {
  FiPlus,
  FiMoreVertical,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import SearchInput from "../../components/common/SearchInput";
// import AddOwnerModal from "../../components/modal/AddOwnerModal";
import AddOwnerModal from "../../components/modal/AddOwnerModal";// modal folder name changed for deployment
import { useAdminUser } from "../../hooks/admin/useAdminUser";
import { useDeleteUser } from "../../hooks/admin/useDeleteUser";
import OwnerTable from "../../components/admin/ownerTable";

const AdminVenueOwnerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [ownerToDelete, setOwnerToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError, refetch } = useAdminUser(page, limit);
  const { mutate: deleteUser } = useDeleteUser();

  const venueOwners = useMemo(() => {
    return (data?.data || []).filter(
      (user) => user.role?.toLowerCase() === "venueowner"
    );
  }, [data]);

  const totalOwners = venueOwners.length;
  const totalPages = Math.ceil((data?.pagination?.total || 1) / limit);

  const filteredOwners = useMemo(() => {
    return venueOwners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [venueOwners, searchQuery]);

  const handleDeleteClick = (owner) => {
    setOwnerToDelete(owner);
    setOpenActionMenu(null);
  };

  const confirmDelete = () => {
    if (!ownerToDelete) return;
    deleteUser(ownerToDelete._id, {
      onSuccess: () => {
        setOwnerToDelete(null);
        refetch();
      },
    });
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Venue Owners</h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FiPlus /> Add Owner
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <OwnerTable
            owners={filteredOwners}
            isLoading={isLoading}
            isError={isError}
            openActionMenu={openActionMenu}
            setOpenActionMenu={setOpenActionMenu}
            handleDeleteClick={handleDeleteClick}
            handleUpdateStatus={() => {}}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <AddOwnerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOwnerAdded={() => {
          setIsAddModalOpen(false);
          refetch();
        }}
      />

      {/* Delete Confirmation Modal */}
      {ownerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <FiAlertTriangle
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-4">
              Delete Owner
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <strong>{ownerToDelete.name}</strong>?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setOwnerToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVenueOwnerPage;
