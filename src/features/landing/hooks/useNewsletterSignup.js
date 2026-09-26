import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "../../../api/newsletter";

export function useNewsletterSignup() {
  return useMutation({
    mutationKey: ["newsletter_subscribe"],
    mutationFn: subscribeToNewsletter,
  });
}
