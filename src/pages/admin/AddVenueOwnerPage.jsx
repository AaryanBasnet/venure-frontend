import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiTrash2,
  FiPlus,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import SearchInput from "../../components/SearchInput"; // Import the new component

// --- MOCK VENUE OWNER DATA ---
const initialOwners = [
  {
    _id: "owner1",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    phone: "555-0101",
    avatar: "https://i.pravatar.cc/150?u=owner1",
    registerDate: "06/15/2023",
    venuesManaged: 3,
    status: "Active",
  },
  {
    _id: "owner2",
    name: "Marcus Holloway",
    email: "marcus.h@example.com",
    phone: "555-0102",
    avatar: "https://i.pravatar.cc/150?u=owner2",
    registerDate: "05/20/2023",
    venuesManaged: 1,
    status: "Active",
  },
  {
    _id: "owner3",
    name: "Clara Oswald",
    email: "clara.o@example.com",
    phone: "555-0103",
    avatar: "https://i.pravatar.cc/150?u=owner3",
    registerDate: "04/01/2023",
    venuesManaged: 5,
    status: "Blocked",
  },
];

// --- MAIN COMPONENT ---
const AdminVenueOwnerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [owners, setOwners] = useState(initialOwners);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [ownerToDelete, setOwnerToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOwnerForm, setNewOwnerForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const filteredOwners = useMemo(() => {
    return owners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, owners]);

  const handleDeleteClick = (owner) => {
    setOwnerToDelete(owner);
    setOpenActionMenu(null);
  };

  const confirmDeleteOwner = () => {
    console.log("Deleting owner:", ownerToDelete.name);
    setOwners(owners.filter((o) => o._id !== ownerToDelete._id));
    setOwnerToDelete(null);
  };

  const handleBlockUser = (owner) => {
    console.log("Blocking owner:", owner.name);
    setOwners(
      owners.map((o) =>
        o._id === owner._id
          ? { ...o, status: o.status === "Active" ? "Blocked" : "Active" }
          : o
      )
    );
    setOpenActionMenu(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewOwnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOwnerSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new owner:", newOwnerForm);
    // Here you would typically send the data to your backend API
    const newOwner = {
      _id: `owner${owners.length + 1}`,
      ...newOwnerForm,
      avatar: `https://i.pravatar.cc/150?u=owner${owners.length + 1}`,
      registerDate: new Date().toLocaleDateString(),
      venuesManaged: 0,
      status: "Active",
    };
    setOwners([newOwner, ...owners]);
    setIsAddModalOpen(false);
    setNewOwnerForm({ name: "", email: "", password: "", phone: "" }); // Reset form
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
      {/* --- Header --- */}
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
            <FiPlus />
            Add Venue Owner
          </button>
        </div>
      </div>

      {/* --- Owners Table --- */}
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
              {filteredOwners.map((owner) => (
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
                              onClick={() => handleBlockUser(owner)}
                              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <MdBlock />{" "}
                              {owner.status === "Active" ? "Block" : "Unblock"}{" "}
                              Owner
                            </button>
                            <button
                              onClick={() => handleDeleteClick(owner)}
                              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <FiTrash2 /> Delete Owner
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

      {/* --- Add Owner Modal --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 flex justify-between items-center border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Venue Owner
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddOwnerSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newOwnerForm.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={newOwnerForm.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={newOwnerForm.password}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newOwnerForm.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Owner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
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
              <strong>{ownerToDelete.name}</strong>? This action cannot be
              undone.
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
                onClick={confirmDeleteOwner}
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

export default AdminVenueOwnerPage;
