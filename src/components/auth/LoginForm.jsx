import React from 'react'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser()
    // validation schema YUP
    const validationSchema = Yup.object(
        {
            email: Yup.string().email("Invalid email").required("Email required"),
            password: Yup.string().min(8, "Min 8 character required").required("Password required")
        }
    )
    const formik = useFormik(
        {
            initialValues: {
                // states of input
                email: "",
                password: ""
            },
            validationSchema: validationSchema,
            onSubmit: (data) => {
                // data is an object of state of values, email, password
                mutate(data,)
            }
        }
    )
    return (
        <div>
            LoginForm
            <form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input
                    type='email' // optional 
                    name='email' // should match the state of formik
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    value={formik.values.email} // should match the state
                >
                </input>
                {
                    formik.touched.email && formik.errors.email &&
                    <p>{formik.errors.email}</p>
                }
                <label>Password</label>
                <input
                    type='password'
                    name='password' // state
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    value={formik.values.password}
                >
                </input>
                {
                    formik.touched.password && formik.errors.password && 
                    <p>{formik.errors.password}</p>
                }
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}