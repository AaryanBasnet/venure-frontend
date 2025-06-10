import React from "react";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
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
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full text-white py-2 rounded-md transition ${
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
