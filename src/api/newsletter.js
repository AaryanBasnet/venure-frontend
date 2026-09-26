import instance from "./api";

export const subscribeToNewsletter = async (email) => {
  return await instance.post("/newsletter", { email });
};
