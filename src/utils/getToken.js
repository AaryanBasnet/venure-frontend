// src/utils/getToken.js
export const getVenueOwnerAuth = async (request) => {
  const res = await request.post("http://localhost:5051/api/auth/login", {
    data: {
      email: "testowner@gmail.com",
      password: "Test1234",
    },
  });

  const json = await res.json();
  console.log("Login response body:", json);

  const { token, userData } = json;

  if (!token || !userData) {
    throw new Error("Login failed or token/user missing");
  }

  // Normalize user object
  const user = {
    ...userData,
    _id: userData._id || userData.id,
    role: userData.role,
  };

  return { token, user };
};
