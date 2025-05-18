// contexts/NotificationContext.js
import { createContext, useState, useEffect, useCallback } from "react";
import { fetchNotifications, markAsRead, markAllAsRead } from "../services/api";

export const NotificationContext = createContext({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  fetchUserNotifications: () => {},
  markNotificationAsRead: () => {},
  markAllNotificationsAsRead: () => {},
});

export const NotificationProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserNotifications = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchNotifications(userId);
      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    } catch (err) {
      setError("Failed to load notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const markNotificationAsRead = useCallback(
    async (notificationId) => {
      if (!userId) return;

      try {
        await markAsRead(notificationId, userId);

        // Update local state
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );

        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      } catch (err) {
        setError("Failed to mark notification as read");
        console.error(err);
      }
    },
    [userId]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      await markAllAsRead(userId);

      // Update local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, read: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      setError("Failed to mark all notifications as read");
      console.error(err);
    }
  }, [userId]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!userId) return;

    fetchUserNotifications();

    const intervalId = setInterval(() => {
      fetchUserNotifications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [userId, fetchUserNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchUserNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
