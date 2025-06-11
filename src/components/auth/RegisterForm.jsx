import React from "react";
import useRegisterUserTan from "../../hooks/useRegisterUserTan";

export default function RegisterForm() {
  const { mutate, data, error, isPending, isSuccess, isError } =
    useRegisterUserTan();

  const handleSubmit = (e) => {
    e.preventDefault(); // Optional: prevent default if used inside a form

    const formData = {
      name: "Klein Morretti",
      email: "klein@gmail.com",
      password: "Secret123",
      phone: "765457689",
    };

    mutate(formData); // No need to store the result from mutate
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>

      {/* Conditional rendering */}
      {isError && <p style={{ color: "red" }}>{error.message}</p>}
      {isSuccess && <p style={{ color: "green" }}>{data.message}</p>}
    </div>
  );
}
