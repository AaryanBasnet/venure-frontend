// services/contactService.js

import { submitContact } from "../api/contact";


export const submitContactService = async (formData) => {
  const res = await submitContact(formData);
  return res.data;
};
