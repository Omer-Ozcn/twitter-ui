import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar"; // YENİ EKLENDİ

export default function UserList({ title, users, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-black border border-gray-700 w-full max-w-md rounded-2xl overflow-hidden max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="currentColor" d="M13.414 12L19 17.586 17.586 19 12 13.414 6.414 19 5 17.586 10.586 12 5 6.414 6.414 5 12 10.586 17.586 5 19 6.414z"/></svg>
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-2">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Henüz kimse yok.</p>
          ) : (
            users.map((user) => (
              <Link 
                key={user.id} 
                to={`/profile/${user.username}`} 
                onClick={onClose}
                className="flex items-center gap-3 p-3 hover:bg-gray-900 rounded-lg transition"
              >
                {/* AVATAR GÜNCELLENDİ */}
                <Avatar username={user.username} className="w-10 h-10" />
                
                <div>
                  <div className="font-bold text-white">{user.username}</div>
                  <div className="text-gray-500 text-sm">@{user.username}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}