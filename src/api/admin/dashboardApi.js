import instance from "../api";

export const fetchActivityLogs = async () => {
  return await instance.get("/activity");
};
