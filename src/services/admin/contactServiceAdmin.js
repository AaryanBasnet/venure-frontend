// src/services/admin/contactService.js
import { getAllContacts } from "../../api/contact";

export const getAllContactsService = async () => {
  const res = await getAllContacts();
  return res.data.data;
};
