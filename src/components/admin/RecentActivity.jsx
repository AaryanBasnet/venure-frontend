import React from "react";
import {
  UserCircle2,
  Calendar,
  Building2,
  DollarSign,
  Terminal,
} from "lucide-react";
import { useActivityLogs } from "../../hooks/admin/useActivityLogs";
import dayjs from "../../utils/dayjsConfig"; // <-- dayjs configured

const iconMap = {
  user: UserCircle2,
  booking: Calendar,
  venue: Building2,
  payment: DollarSign,
  system: Terminal,
};

const colorMap = {
  user: "text-blue-500",
  booking: "text-rose-500",
  venue: "text-emerald-500",
  payment: "text-yellow-500",
  system: "text-slate-500",
};

const RecentActivity = () => {
  const { data: recentActivities = [], isLoading } = useActivityLogs();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activities
          </h3>
          <p className="text-sm text-gray-600">Latest platform activities</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-md bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="text-sm text-gray-500">No recent activities.</div>
        ) : (
          recentActivities.slice(0, 6).map((activity) => {
            const Icon = iconMap[activity.type] || Terminal;
            const iconColor = colorMap[activity.type] || "text-slate-500";

            return (
              <div
                key={activity._id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dayjs(activity.createdAt).fromNow()}
                    {activity.createdBy?.name && ` • ${activity.createdBy.name}`}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
