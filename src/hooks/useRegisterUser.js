import React, { useState } from 'react'
import { registerUserService } from '../services/authServices';

export default function useRegisterUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const register = async(formData)=> {
        setIsLoading(true)
        setError
        setData(null)
        try{
            const response = await registerUserService(formData)
            setData(response)
            return response

        } catch (err) {
            setError(err)
            return null

        }finally {
            setIsLoading(false)
        }
    }
  return (
    register,
    isLoading,
    data,
    error
  )
}
