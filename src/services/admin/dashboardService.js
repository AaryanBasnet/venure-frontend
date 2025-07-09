import { fetchActivityLogs } from "../../api/admin/dashboardApi"



export const fetchActivityLogsService = async () => {
    const res = await fetchActivityLogs();
    return res.data;
}