// components/notifications/NotificationBell.js
import { useState, useEffect, useRef } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const bellRef = useRef(null);

  // Handle toggle functionality
  const togglePanel = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  // Handle clicks outside both the bell and panel
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (event) => {
      // Only close if click is outside both the bell button and the panel
      // The panel component has its own click handling
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        // We don't need to do anything here, as the panel and overlay have their own handlers
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPanelOpen]);

  return (
    <div className="relative" ref={bellRef}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={togglePanel}
        aria-label="Notifications"
        aria-expanded={isPanelOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            isPanelOpen ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[15px] h-5 px-1.5 text-xs font-bold leading-none text-white transform translate-x-[80%] -translate-y-[40%] bg-red-600 rounded-full shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isPanelOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-20"
          onClick={() => {setIsPanelOpen(false)
            console.log('2')
          }}
        />
      )}

      <NotificationPanel
        isOpen={isPanelOpen}
        onClose={() => {setIsPanelOpen(false)
            console.log('3')
        }}
      />
    </div>
  );
}
