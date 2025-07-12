import instance from "./api";

export const getAllContacts = async () => {
  return await instance.get("/contact/admin");
};

export const submitContact = async (formData) => {
  return await instance.post("/contact", formData);
};