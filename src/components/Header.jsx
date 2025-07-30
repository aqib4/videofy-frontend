import React, { useState } from "react";
import {
  Video,
  Bell,
  Citrus,
  LogOut,
  MenuIcon,
  X,
  SettingsIcon,
  Logs,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import Loader from "./Loader";
import ThemeModal from "./themeModal";
import { Link } from "react-router";
function Header() {
  const { authUser } = useAuthUser();
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  const currentPath = window.location.pathname;
  if (isPending) {
    return <Loader />;
  }

  return (
    <nav className="bg-black relative flex justify-between items-center py-2 px-3 md:px-8">
      {/* Logo */}
      {currentPath === "/chat/:id" ? (
        <Link to={"/"} className="flex items-center justify-center gap-2">
          <Video color="#1DB548" className="size-5 xl:size-12" />
          <span className="font-mono font-semibold text-lg md:text-3xl xl:text-4xl text-[#1DB548]">
            VIDEOFY
          </span>
        </Link>
      ) : (
        <div className="flex-1"></div>
      )}

      {/* Mobile Menu Icon */}
      <MenuIcon
        onClick={() => setModal(!modal)}
        className="lg:hidden size-8 text-white/75 hover:text-white cursor-pointer transition duration-300"
      />

      {/* Notifications and Profile Pic (Mobile) */}
      <div className="lg:hidden flex items-center gap-2">
        <Bell className="w-6 h-6 text-white/55 hover:text-white cursor-pointer transition duration-200" />
        <img
          src={authUser?.profilePic}
          alt="profile"
          className="w-10 h-10 rounded-full"
          onClick={() => setProfileModal(!profileModal)}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex  items-center justify-equal gap-6">
        <Bell className="w-6 h-6 text-white/55 hover:text-white cursor-pointer transition duration-200" />
        <ThemeModal/>
        <img
          src={authUser?.profilePic}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />

        <LogOut
          onClick={handleLogout}
          className="w-6 h-6 text-white/55 hover:text-white cursor-pointer transition duration-200"
        />

      </div>

      {/* Mobile Menu */}
      {modal && (
        <div className="relative">
          <ul className="bg-black text-white w-[55%] fixed top-0 left-0 min-h-screen z-999 flex flex-col p-8">
            <li className="text-xl font-sans hover:text-[#1DB548] hover:border-b-[1px] hover:border-blue-100 hover:transition hover:duration-300">
              Home
            </li>
            <li className="text-xl font-sans hover:text-[#1DB548] hover:transition hover:duration-300">
              Friends
            </li>
            <li className="flex-1 absolute bottom-2 w-6 h-6 text-white/55 hover:text-white cursor-pointer transition duration-200">
              <LogOut onClick={handleLogout} />
            </li>
            <X
              onClick={() => setModal(!modal)}
              className="absolute top-2 right-2 text-white"
            />
          </ul>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="bg-black absolute top-16 mx-auto w-[90%] p-2 rounded-lg shadow-lg z-50">
          <div className="flex gap-3 my-2">
            <img src={authUser?.profilePic} alt="" className="size-12" />
            <div>
              <h3 className="text-white font-sans text-[1.1rem]">
                {authUser?.fullname}
              </h3>
              <p className="text-white/70 font-sans text-[1.1rem]">
                {authUser?.email}
              </p>
            </div>
          </div>
          <hr color="gray" />
          <div className="flex flex-col gap-4 mt-2 p-2">
            <span className="flex gap-1 text-white">
              <SettingsIcon className="text-white" />
              Settings
            </span>
            <span className="flex gap-1 text-white">
              <Logs className="text-white" />
              Preferences
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-error text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* theme selctor modal */}
      {/* {themeModal && (
          <div className="w-64 absolute top-12 right-28 p-2 bg-black">
            <select className="w-[100%] bg-transparent" name="" id="">
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
              <option>
                Default
              </option>
            </select>
          </div>
      )} */}
    </nav>
  );
}

export default Header;
