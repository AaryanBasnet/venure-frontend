import React, { useState, useMemo } from "react";
import { FiMoreVertical, FiTrash2, FiPlus, FiAlertTriangle } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import SearchInput from '../../components/SearchInput'; // Import the new component

// --- Mock User Data (Replace with your API data) ---
const users = [
    {
        _id: 'user1',
        name: "Joshua Anderson",
        email: "josh.anderson@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        registerDate: "07/09/2023",
        accountType: "Normal",
        followers: 605,
        status: "Inactive",
    },
    {
        _id: 'user2',
        name: "James Robert",
        email: "james.robert@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
        registerDate: "05/09/2023",
        accountType: "Normal",
        followers: 0,
        status: "Active",
    },
  // ... more users
];

// --- Main Component ---
const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenActionMenu(null); 
  };

  const confirmDeleteUser = () => {
    console.log("Deleting user:", userToDelete.name);
    // Add your actual delete logic here
    setUserToDelete(null); 
  };
  
  const handleBlockUser = (user) => {
    console.log("Blocking user:", user.name);
    // Add your block logic here
    setOpenActionMenu(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <SearchInput 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"
            />
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <FiPlus/>
                User Applications
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Register Date</th>
                        <th className="px-6 py-3">Account Type</th>
                        <th className="px-6 py-3 text-center">Followers</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.registerDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.accountType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{user.followers}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2.5 py-1 text-xs leading-5 font-semibold rounded-full ${
                                    user.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                <div className="relative inline-block text-left">
                                    <button onClick={() => setOpenActionMenu(openActionMenu === user._id ? null : user._id)}>
                                        <FiMoreVertical size={20} className="text-gray-500 hover:text-gray-800" />
                                    </button>
                                    {openActionMenu === user._id && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                            role="menu"
                                        >
                                            <div className="py-1">
                                                <button onClick={() => handleBlockUser(user)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <MdBlock/> Block User
                                                </button>
                                                <button onClick={() => handleDeleteClick(user)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                    <FiTrash2/> Delete User
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
      
      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Delete User</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
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
