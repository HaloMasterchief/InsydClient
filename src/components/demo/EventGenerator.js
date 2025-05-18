// components/demo/EventGenerator.js
import { useState } from "react";
import { createEvent } from "../../services/api";
import { mockUsers, mockPosts, mockJobs } from "../../utils/mockData";

export default function EventGenerator({ currentUserId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateEvent = async (type) => {
    setLoading(true);
    setSuccess(false);

    try {
      let eventData = {
        type,
        targetUserId: currentUserId,
      };

      // Random user as actor (except current user)
      const filteredUsers = mockUsers.filter(
        (user) => user.id !== currentUserId
      );
      const randomActor =
        filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      eventData.actorId = randomActor.id;

      // Add type-specific data
      switch (type) {
        case "follow":
          // No additional data needed
          break;

        case "like":
        case "comment":
        case "mention":
          // Add random post
          const randomPost =
            mockPosts[Math.floor(Math.random() * mockPosts.length)];
          eventData.entityId = randomPost.id;

          if (type === "comment") {
            eventData.metadata = {
              comment: `This is a great post about ${randomPost.title.toLowerCase()}! Thanks for sharing.`,
            };
          }
          break;

        case "job":
          // Add random job
          const randomJob =
            mockJobs[Math.floor(Math.random() * mockJobs.length)];
          eventData.entityId = randomJob.id;
          eventData.metadata = {
            title: randomJob.title,
            company: randomJob.company,
          };
          break;

        default:
          break;
      }

      await createEvent(eventData);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to generate event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Demo: Generate Notifications</h2>

      <p className="text-sm text-gray-600 mb-4">
        Click the buttons below to simulate different types of events that will
        generate notifications.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => generateEvent("follow")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Someone Follows You
        </button>

        <button
          onClick={() => generateEvent("like")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Like on Your Post
        </button>

        <button
          onClick={() => generateEvent("comment")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Comment on Your Post
        </button>

        <button
          onClick={() => generateEvent("mention")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Mention in Post
        </button>

        
      </div>

      {loading && (
        <p className="mt-4 text-sm text-gray-600">Generating notification...</p>
      )}

      {success && (
        <p className="mt-4 text-sm text-green-600">
          Notification generated successfully! Check the notification bell.
        </p>
      )}
    </div>
  );
}
