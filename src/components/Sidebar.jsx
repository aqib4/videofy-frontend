import React from 'react'
import { Bell, Home, User, Video } from 'lucide-react'
import useAuthUser from '../hooks/useAuthUser'

function Sidebar() {
  const currentPath = window.location.pathname
  const {authUser}=useAuthUser();
  const MenuItm = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Friends", path: "/about", icon: <User /> },
    { name: "Notifications", path: "/contact", icon: <Bell /> }
  ]

  return (
    <aside className="hidden lg:block w-56 h-screen sticky top-0 bg-black shadow-lg text-white p-2 overflow-hidden">
       {/* logo */}
      <div className="flex items-center justify-center gap-2">
        <Video color="#1DB548" className="size-5 xl:size-12" />
        <span className="font-mono font-semibold text-lg md:text-3xl xl:text-4xl text-[#1DB548]">
          VIDEOFY
        </span>
      </div>
      <ul>
        {MenuItm.map((item) => {
          const isActive = currentPath === item.path

          return (
            <li
              key={item.name}
              className={`flex items-center gap-2 rounded-full py-3 pr-8 pl-2 transition duration-200 
                hover:bg-gray-700 ${isActive ? "bg-gray-800" : ""}`}
            >
              {item.icon}
              <a href={item.path}>{item.name}</a>
            </li>
          )
        })}
      </ul>
      <img src={authUser?.profilePic} alt="profilePic" />
    </aside>
  )
}

export default Sidebar
