import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestRoutes() {
  
   const {user, loading} = useContext(AuthContext);

   if (loading) return <>loading</>

   if(user?.role==="Admin")
    return <Navigate to ="/admin/dashboard" />
    if(user?.role==="Customer")
        return <Navigate to="/user/homepage" />

    if(user) return <Navigate to ="/" />
    return <Outlet />;

  
}
