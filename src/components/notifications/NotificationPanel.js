// components/notifications/NotificationPanel.js
import { useRef, useEffect } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount, loading, markAllNotificationsAsRead } =
    useNotifications();
  const panelRef = useRef();

  // Handle clicks outside the panel
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-[400px] bg-white border shadow-xl rounded-md max-h-[80vh] overflow-y-auto z-50"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
      }}
      onClick={(e) => {
        console.log("1");
        e.stopPropagation()
        
      }} // Prevent clicks from bubbling up to overlay
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium text-gray-800">Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      {loading && (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      )}

      {!loading && notifications.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No notifications yet
        </div>
      )}

      <div className="w-full">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}
