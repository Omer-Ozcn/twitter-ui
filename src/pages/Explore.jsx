import React from "react";

export default function Explore() {
  return (
    <div>
      {/* Arama Kutusu (Header) */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur px-4 py-3 border-b border-gray-800">
         <div className="bg-gray-900 rounded-full px-4 py-2 flex items-center gap-3 focus-within:bg-black focus-within:ring-1 focus-within:ring-blue-500 border border-transparent focus-within:border-blue-500 transition">
            <span className="text-gray-500">🔍</span>
            <input type="text" placeholder="Twitter'da Ara" className="bg-transparent outline-none text-white w-full text-sm placeholder-gray-500" />
         </div>
      </div>

      {/* Gündem Listesi */}
      <div className="mt-2">
        <h2 className="font-bold text-xl px-4 py-3 text-white">İlgini çekebilecek gündemler</h2>
        
        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition border-b border-gray-800">
          <p className="text-xs text-gray-500 flex justify-between">
            <span>Yazılım · Gündemdekiler</span>
            <span>...</span>
          </p>
          <p className="font-bold text-white mt-0.5">#JavaSpring</p>
          <p className="text-xs text-gray-500 mt-0.5">12.5B Tweet</p>
        </div>

        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition border-b border-gray-800">
          <p className="text-xs text-gray-500 flex justify-between">
            <span>Teknoloji · Gündemdekiler</span>
            <span>...</span>
          </p>
          <p className="font-bold text-white mt-0.5">#ReactJS</p>
          <p className="text-xs text-gray-500 mt-0.5">8.2B Tweet</p>
        </div>

        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition border-b border-gray-800">
          <p className="text-xs text-gray-500 flex justify-between">
             <span>Spor · Gündemdekiler</span>
             <span>...</span>
          </p>
          <p className="font-bold text-white mt-0.5">#Basketbol</p>
          <p className="text-xs text-gray-500 mt-0.5">50.1B Tweet</p>
        </div>
        
        <div className="hover:bg-white/5 px-4 py-3 cursor-pointer transition border-b border-gray-800">
          <p className="text-xs text-gray-500 flex justify-between">
             <span>Türkiye · Gündemdekiler</span>
             <span>...</span>
          </p>
          <p className="font-bold text-white mt-0.5">#YapayZeka</p>
          <p className="text-xs text-gray-500 mt-0.5">22.4B Tweet</p>
        </div>
      </div>
    </div>
  );
}