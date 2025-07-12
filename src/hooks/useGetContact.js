// src/hooks/useGetContact.js
import { useQuery } from "@tanstack/react-query";
import { getAllContactsService } from "../services/admin/contactServiceAdmin.js";

const useGetContact = () => {
  return useQuery({
    queryKey: ["adminContacts"],
    queryFn: getAllContactsService,
  });
};

export default useGetContact;
