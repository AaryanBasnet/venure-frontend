// src/hooks/useSubmitContact.js
import { useMutation } from "@tanstack/react-query";
import { submitContactService } from "../services/contactService";

const useSubmitContact = () => {
  return useMutation({
    mutationKey: ["submit_contact"],
    mutationFn: submitContactService,
  });
};

export default useSubmitContact;
