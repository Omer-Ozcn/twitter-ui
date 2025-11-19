import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar"; // YENİ EKLENDİ

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-20 xl:w-64 sticky top-0 h-screen border-r border-gray-800 px-2 xl:px-4 py-4">
      <Link to="/" className="mb-6 flex justify-center xl:justify-start p-2">
        <div className="w-12 h-12 rounded-full hover:bg-gray-900 flex items-center justify-center transition">
           <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </div>
      </Link>

      <nav className="space-y-2 flex-1">
        <NavItem to="/" label="Ana Sayfa" active={isActive("/")}>
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill={isActive("/") ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isActive("/") ? "0" : "2"}><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" /></svg>
        </NavItem>

        <NavItem to={`/profile/${user.username}`} label="Profil" active={isActive(`/profile/${user.username}`)}>
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill={isActive(`/profile/${user.username}`) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isActive(`/profile/${user.username}`) ? "0" : "2"}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        </NavItem>
      </nav>

      <div className="mt-auto">
        <button onClick={logout} className="w-full flex items-center justify-center xl:justify-start gap-3 p-3 hover:bg-gray-900 rounded-full transition group">
           {/* AVATAR GÜNCELLENDİ */}
           <Avatar username={user.username} className="w-10 h-10" />
           
           <div className="hidden xl:block text-left">
             <p className="text-white text-sm font-bold">{user.username}</p>
             <p className="text-gray-500 text-xs group-hover:text-red-500">Çıkış Yap</p>
           </div>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, children, label, active }) {
  return (
    <Link to={to} className="flex items-center justify-center xl:justify-start gap-4 p-3 rounded-full hover:bg-gray-900 transition group">
      <div className={active ? "text-white" : "text-white group-hover:text-white"}>
        {children}
      </div>
      <span className={`hidden xl:block text-xl ${active ? "font-bold" : "font-normal"}`}>{label}</span>
    </Link>
  );
}