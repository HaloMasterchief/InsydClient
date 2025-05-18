// components/layout/Header.js
import Link from "next/link";
import NotificationBell from "../notifications/NotificationBell";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              {/* Your logo/site name */}
            </Link>
            {/* <span className="ml-2 text-sm text-gray-500">for Architecture</span> */}
          </div>

          <div className="flex items-center space-x-6">
            {" "}
            {/* Added space-x-6 for spacing */}
            <NotificationBell />
            <div className="ml-[20px] ">
              {" "}
              {/* Removed ml-4 class since we're using space-x-6 above */}
              <Image
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User profile"
                className="h-8 w-8 rounded-full"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
