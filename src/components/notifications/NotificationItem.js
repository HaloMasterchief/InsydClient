// components/notifications/NotificationItem.js
import { useNotifications } from "../../hooks/useNotifications";
import { formatTimeAgo } from "../../utils/formatters";
import Image from "next/image";

export default function NotificationItem({ notification }) {
  const { markNotificationAsRead } = useNotifications();

  const handleClick = () => {
    if (!notification.read) {
      markNotificationAsRead(notification._id);
    }
  };

  return (
    <div
      className={`px-5 py-4 border-b hover:bg-gray-50 cursor-pointer w-full ${
        notification.read ? "bg-white" : "bg-blue-50"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={`https://randomuser.me/api/portraits/${
              notification.actorId % 2 === 0 ? "women" : "men"
            }/${notification.actorId.replace(/\D/g, "") % 70 || 1}.jpg`}
            alt="User"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${
              !notification.read
                ? "font-semibold text-gray-900"
                : "text-gray-800"
            }`}
          >
            {notification.content}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0 ml-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );
}
