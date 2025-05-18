// pages/index.js
import Layout from "../components/layout/Layout";
import EventGenerator from "../components/demo/EventGenerator";
import { mockUsers } from "../utils/mockData";
import Image from "next/image";
export default function Home({ currentUserId }) {
  const currentUser = mockUsers.find((user) => user.id === currentUserId);

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <Image
            src={
              currentUser?.avatar ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-xl font-bold">
              Welcome, {currentUser?.name || "User"}
            </h1>
            <p className="text-gray-600">{currentUser?.role || "Architect"}</p>
          </div>
        </div>
      </div>

      <EventGenerator currentUserId={currentUserId} />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">About This Demo</h2>
        <p className="text-gray-600">
          This is a proof of concept for the linkedinNew notification system.
          The system supports various types of notifications that are common in
          professional social networks.
        </p>
        <p className="text-gray-600 mt-2">Key features demonstrated:</p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Real-time notification badge count</li>
          <li>Notification dropdown panel</li>
          <li>Mark notifications as read (individually or all at once)</li>
          <li>
            Different notification types (follows, likes, comments, mentions,
            jobs)
          </li>
          <li>Simple polling mechanism to check for new notifications</li>
        </ul>
      </div>
    </Layout>
  );
}
