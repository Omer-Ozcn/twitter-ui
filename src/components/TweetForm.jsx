import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar"; // YENİ EKLENDİ

export default function TweetForm({ onTweetAdded }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await api.post("/tweets", { content });
      setContent("");
      onTweetAdded();
    } catch (err) {
      console.error(err);
      alert("Tweet gönderilemedi!");
    }
  };

  if (!user) return null;

  return (
    <div className="border-b border-gray-800 p-4 flex gap-4">
      <div className="flex-shrink-0">
        {/* AVATAR GÜNCELLENDİ */}
        <Avatar username={user.username} className="w-10 h-10" />
      </div>
      <form onSubmit={handleSubmit} className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Neler oluyor?"
          className="w-full bg-transparent text-xl text-white placeholder-gray-500 outline-none resize-none py-2 h-24"
        />
        <div className="flex justify-end pt-2 border-t border-gray-800">
          <button 
            type="submit" 
            disabled={!content.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-2 rounded-full disabled:opacity-50 transition"
          >
            Tweetle
          </button>
        </div>
      </form>
    </div>
  );
}