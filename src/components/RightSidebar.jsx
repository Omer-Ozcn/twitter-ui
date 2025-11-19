import React from "react";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 pl-8 py-4 sticky top-0 h-screen">
      <div className="bg-gray-900 rounded-full px-4 py-3 flex items-center gap-3 focus-within:bg-black focus-within:ring-1 focus-within:ring-blue-500 border border-transparent focus-within:border-blue-500 transition">
        <span className="text-gray-500">🔍</span>
        <input type="text" placeholder="Ara" className="bg-transparent outline-none text-white w-full text-sm placeholder-gray-500" />
      </div>

      <div className="mt-4 bg-gray-900 rounded-2xl overflow-hidden">
        <h2 className="font-bold text-xl px-4 py-3">İlgini çekebilecek gündemler</h2>
        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition">
          <p className="text-xs text-gray-500">Yazılım · Gündemdekiler</p>
          <p className="font-bold">#JavaSpring</p>
          <p className="text-xs text-gray-500">12.5B Tweet</p>
        </div>
        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition">
          <p className="text-xs text-gray-500">Teknoloji · Gündemdekiler</p>
          <p className="font-bold">#ReactJS</p>
          <p className="text-xs text-gray-500">8.2B Tweet</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-4 px-2">© 2025 Twitter Clone - Ömer Özcan</p>
    </aside>
  );
}