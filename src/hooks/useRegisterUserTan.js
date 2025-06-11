
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { registerUserService } from '../services/authServices'
import { toast } from 'react-toastify'

export default function useRegisterUserTan() {
  return useMutation(
    {
        mutationFn: registerUserService, 
        mutationKey: ['register'],
        onSuccess: (data) => {
            toast.success(data.message || "Registration Successful")
        },

        onError: (err)=> {
                            toast.error(err.message || "Registration Failed")

        }
    }
  )
}
