import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../../api/api";
import socket from "../../../lib/socket";

/**
 * Manages the user's notification feed — both persisted history and real-time.
 *
 * Design:
 *   • Persisted notifications are fetched via TanStack Query (cacheable, deduped).
 *   • Incoming socket events prepend directly to the query cache — no separate
 *     useState array, so the unreadCount badge and list update atomically.
 *   • Each incoming notification also fires a toast so the user gets feedback
 *     even when the dropdown is closed.
 *
 * The socket connection itself is owned by AuthProvider.
 * This hook only subscribes to events — it never calls connectSocket.
 */
export const useNotifications = (userId) => {
  const queryClient = useQueryClient();

  // ── Persisted notification list ───────────────────────────────────────────
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notification");
      return res.data.data ?? [];
    },
    enabled: !!userId,
    staleTime: 1000 * 30, // re-fetch every 30 s to catch any missed socket events
  });

  // ── Real-time subscription ────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    const handleNew = (notif) => {
      // Prepend to cache — same key as the query above, so the list re-renders
      queryClient.setQueryData(["notifications"], (old = []) => [notif, ...old]);

      toast.info(notif.message || "You have a new notification", {
        autoClose: 6000,
        icon: "🔔",
      });
    };

    socket.on("newNotification", handleNew);
    return () => socket.off("newNotification", handleNew);
  }, [userId, queryClient]);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const markReadMutation = useMutation({
    mutationFn: (id) => api.patch(`/notification/${id}/read`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["notifications"], (old = []) =>
        old.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    },
    onError: () => toast.error("Could not mark notification as read."),
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => api.patch("/notification/read-all"),
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (old = []) =>
        old.map((n) => ({ ...n, read: true }))
      );
    },
    onError: () => toast.error("Could not mark all notifications as read."),
  });

  const notifications = query.data ?? [];

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    isPending: query.isPending,
    // Expose simple functions — callers don't need to know about useMutation
    markRead: (id) => markReadMutation.mutate(id),
    markAllRead: () => markAllReadMutation.mutate(),
  };
};
