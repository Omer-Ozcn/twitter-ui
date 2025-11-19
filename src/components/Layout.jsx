import React from "react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import MobileNavBar from "./MobileNavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="flex w-full max-w-[1265px]">
        {/* Masaüstü Sol Menü */}
        <Sidebar />
        
        {/* Orta İçerik */}
        {/* pb-14 ve md:pb-0 ekledik: Mobilde alt menü için boşluk bırakır, masaüstünde sıfırlar */}
        <main className="flex-1 border-x border-gray-800 min-w-0 w-full max-w-[600px] pb-16 md:pb-0">
          {children}
        </main>
        
        {/* Masaüstü Sağ Menü */}
        <RightSidebar />

        {/* Mobil Alt Menü */}
        <MobileNavBar />
      </div>
    </div>
  );
}