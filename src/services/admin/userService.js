import {
  deleteUserApi,
  getAllUserApi,
  getCustomersCount,
} from "../../api/admin/userApi";

export const getAllUserService = async (params) => {
  try {
    const response = await getAllUserApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "User Fetch Fail" };
  }
};

export const deleteUserService = async (userId) => {
  try {
    const res = await deleteUserApi(userId);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "User data Fail" };
  }
};

export const getCustomerCountService = async () => {
  try {
    const res = await getCustomersCount();
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Cannot receive Customer Count" };
  }
};
