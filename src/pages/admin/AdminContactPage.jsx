import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import useGetContact from "../../hooks/useGetContact";

export default function AdminContactPage() {
  // Using mock data for demonstration
  // const contacts = mockContacts;
  const { data: contacts = [] } = useGetContact();
  const isLoading = false;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedContact, setSelectedContact] = useState(null);

  const filtered = contacts.filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(search.toLowerCase()) ||
      contact.email?.toLowerCase().includes(search.toLowerCase()) ||
      contact.message?.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone?.includes(search);

    const matchesStatus = statusFilter === "all";

    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const getStatusCount = (status) => {
    return contacts.filter((c) => c.status === status).length;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const truncateMessage = (message, maxLength = 100) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-2">
                Contact Submissions
              </h1>
              <p className="text-slate-600">
                Manage and respond to customer inquiries
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">
                    Total Messages
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {contacts.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-80 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>

              <select
                className="px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">
                Loading contact submissions...
              </p>
            </div>
          </div>
        ) : sorted.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">
                No contact submissions found
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Contact Info
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Submitted
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sorted.map((contact) => (
                    <tr
                      key={contact._id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-slate-800">
                            {contact.name}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Mail className="w-3 h-3" />
                            {contact.email || "—"}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="max-w-md text-slate-700 cursor-pointer hover:text-blue-600 transition-colors"
                          title={contact.message}
                          onClick={() => setSelectedContact(contact)}
                        >
                          {truncateMessage(contact.message)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-500">
                          {formatDate(contact.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              <div className="p-4 space-y-4">
                {sorted.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">
                          {contact.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                          <Mail className="w-3 h-3" />
                          {contact.email || "—"}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <p
                      className="text-slate-700 mb-3 text-sm leading-relaxed cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {truncateMessage(contact.message, 150)}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
