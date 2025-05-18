// pages/_app.js
import "../../styles/globals.css";
import { NotificationProvider } from "../contexts/NotificationContext";

function MyApp({ Component, pageProps }) {
  // Hardcoded user ID for demo purposes
  const currentUserId = "user1";

  return (
    <NotificationProvider userId={currentUserId}>
      <Component {...pageProps} currentUserId={currentUserId} />
    </NotificationProvider>
  );
}

export default MyApp;
