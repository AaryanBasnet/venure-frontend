import instance from "../api";

export const getCustomersCount = () => {
  console.log("Customer Count", getCustomersCount);
  return instance.get("/admin/user/getCustomerCount");
};

export const getAllUserApi = (params) => {
  return instance.get("/admin/user/getAll", { params });
};

export const deleteUserApi = async (userId) =>
  instance.delete(`/admin/user/${userId}`);
