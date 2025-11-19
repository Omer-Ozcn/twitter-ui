import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function MobileNavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around items-center h-14 z-50 px-2 pb-safe">
      {/* 1. Ana Sayfa */}
      <Link to="/" className="p-2 rounded-full hover:bg-gray-900">
        <svg 
          viewBox="0 0 24 24" 
          className={`w-7 h-7 ${isActive("/") ? "fill-white" : "fill-none stroke-white stroke-2"}`}
        >
          <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" />
        </svg>
      </Link>

      {/* 2. Keşfet / Arama */}
      <Link to="/explore" className="p-2 rounded-full hover:bg-gray-900">
        <svg viewBox="0 0 24 24" className={`w-7 h-7 ${isActive("/explore") ? "fill-white stroke-white stroke-1" : "fill-none stroke-white stroke-2"}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </Link>

      {/* 3. Profil */}
      <Link to={`/profile/${user.username}`} className="p-2 rounded-full hover:bg-gray-900">
        <div className={`rounded-full border-2 ${isActive(`/profile/${user.username}`) ? "border-white" : "border-transparent"}`}>
           <Avatar username={user.username} className="w-6 h-6" />
        </div>
      </Link>

      {/* 4. Çıkış Yap */}
      <button onClick={logout} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-900">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      </button>
    </div>
  );
}