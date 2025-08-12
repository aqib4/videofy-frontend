import { Bell, Home, Mail, User, Video } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { Link } from "react-router";

function Sidebar() {
  const currentPath = window.location.pathname;

  // Get the authenticated user
  const { authUser } = useAuthUser();
  
  const MenuItm = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Friends", path: "/friends", icon: <User /> },
    { name: "Notifications", path: "/notification", icon: <Bell /> },
  ];

  return (
    <aside
      className={"hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-black shadow-2xl text-white p-2 overflow-hidden"}
    >
      {/* logo */}
      <Link to="/">
        <div className="flex items-center justify-center gap-2">
          <Video color="#1DB548" className="size-5 xl:size-12" />
          <span className="font-mono font-semibold text-lg md:text-3xl xl:text-4xl text-[#1DB548]">
            VIDEOFY
          </span>
        </div>
      </Link>

      <ul className="flex-1 flex flex-col gap-3 mt-5">
        {MenuItm.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <li
              key={item.name}
              className={`flex items-center gap-3 font-sans rounded-full py-3 pr-8 pl-2 transition duration-200 hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`}
            >
              {item.icon}
              <Link to={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-3 mx-4 mt-4 border-t pt-4">
        <img
          src={authUser?.profilePic}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-sans font-medium">{authUser?.fullname}</span>
          <p className="text-primary/70 flex items-center gap-1">
            <span className="size-3 rounded-full bg-success inline-block" />
            Online
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
