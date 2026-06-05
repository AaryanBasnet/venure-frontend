import React from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm({ onForgotPassword }) {
  const { mutate, isPending } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(8, "Min 8 characters required")
      .required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login to Your Account
      </h2>
      <form
        className="space-y-4"
        onSubmit={formik.handleSubmit}
        aria-label="Login form"
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-poppins font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            aria-required="true"
            aria-describedby={
              formik.touched.email && formik.errors.email
                ? "email-error"
                : undefined
            }
            aria-invalid={
              formik.touched.email && !!formik.errors.email ? "true" : "false"
            }
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-poppins font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-required="true"
            aria-describedby={
              formik.touched.password && formik.errors.password
                ? "password-error"
                : undefined
            }
            aria-invalid={
              formik.touched.password && !!formik.errors.password
                ? "true"
                : "false"
            }
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p
              id="password-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center font-poppins justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-poppins text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={`w-full text-white font-poppins py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isPending
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </>
  );
}
