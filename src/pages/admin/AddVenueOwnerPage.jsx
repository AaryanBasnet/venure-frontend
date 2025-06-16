import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiMoreVertical,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import SearchInput from "../../components/common/SearchInput";
import AddOwnerModal from "../../components/modal/AddOwnerModal";
// import { getVenueOwners, deleteVenueOwner, updateOwnerStatus } from '../../services/venueOwnerService';

const AdminVenueOwnerPage = () => {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [ownerToDelete, setOwnerToDelete] = useState(null);

  // Function to fetch data from the service layer
  const fetchOwners = async () => {
    setLoading(true);
    try {
      const data = await getVenueOwners();
      setOwners(data);
    } catch (error) {
      console.error("Failed to fetch owners", error);
      // Optionally set an error state to show in the UI
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchOwners();
  }, []);

  // This callback is passed to the modal and triggered on successful form submission
  const handleOwnerAdded = (newOwner) => {
    setOwners((prev) => [newOwner, ...prev]); // Optimistically update the UI
    setIsAddModalOpen(false); // Close the modal
  };

  const handleDeleteClick = (owner) => {
    setOwnerToDelete(owner);
    setOpenActionMenu(null);
  };

  const confirmDelete = async () => {
    await deleteVenueOwner(ownerToDelete._id);
    setOwners((prev) => prev.filter((o) => o._id !== ownerToDelete._id));
    setOwnerToDelete(null);
  };

  const handleUpdateStatus = async (ownerId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
    await updateOwnerStatus(ownerId, newStatus);
    setOwners((prev) =>
      prev.map((o) => (o._id === ownerId ? { ...o, status: newStatus } : o))
    );
    setOpenActionMenu(null);
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Venues Managed</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredOwners.map((owner) => (
                  <tr
                    key={owner._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={owner.avatar}
                          alt={owner.name}
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {owner.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>{owner.email}</div>
                      <div className="text-xs text-gray-400">{owner.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                      {owner.venuesManaged}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 text-xs leading-5 font-semibold rounded-full ${
                          owner.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {owner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
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
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="py-1">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(owner._id, owner.status)
                                }
                                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <MdBlock />{" "}
                                {owner.status === "Active"
                                  ? "Block"
                                  : "Unblock"}
                              </button>
                              <button
                                onClick={() => handleDeleteClick(owner)}
                                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <FiTrash2 /> Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddOwnerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOwnerAdded={handleOwnerAdded}
      />

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
