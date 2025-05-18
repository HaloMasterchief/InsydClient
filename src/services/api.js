// services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const fetchNotifications = async (userId, page = 1, limit = 20) => {
  try {
    const response = await fetch(
      `${API_URL}/notifications?userId=${userId}&page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markAsRead = async (notificationId, userId) => {
  try {
    const response = await fetch(
      `${API_URL}/notifications/${notificationId}/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    return await response.json();
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const markAllAsRead = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/notifications/read-all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to mark all notifications as read");
    }

    return await response.json();
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
