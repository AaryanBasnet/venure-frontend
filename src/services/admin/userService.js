import { deleteUserApi, getAllUserApi } from "../../api/admin/userApi";

export const getAllUserService = async (params) => {
    try{
        const response = await getAllUserApi(params)
        return response.data
    }catch(err){
        console.log(err)
        throw err.response?.data || { 'message' : 'User Fetch Fail' }
    }


   


}

 export const deleteUserService = async (userId)=> {
    try {
        const res = await deleteUserApi(userId)
    return res.data;
        
    } catch (error) {

        console.log(err)
        throw err.response?.data || { 'message' : 'User data Fail' }
        
    }
 }