import instance from "../api"

export const getAllUserApi = (params) => instance.get("/admin/user/getAll", {params})
export const deleteUserApi = async(userId) => instance.delete(`/admin/user/${userId}`)

