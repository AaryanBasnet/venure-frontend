import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useRegisterUserTan from "../../hooks/useRegisterUserTan";

export default function RegisterForm() {
  const { mutate, data, error, isPending, isSuccess, isError } =
    useRegisterUserTan();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{9,15}$/, "Phone number must be 9-15 digits")
        .required("Phone is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border px-3 py-2 rounded"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-600 text-sm">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 rounded"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          className="w-full border px-3 py-2 rounded"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-600 text-sm">{formik.errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border px-3 py-2 rounded"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-600 text-sm">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        {isPending ? "Registering..." : "Register"}
      </button>

      {/* API response messages */}
      {isError && <p className="text-red-600 text-sm">{error.message}</p>}
      {isSuccess && <p className="text-green-600 text-sm">{data.message}</p>}
    </form>
  );
}
