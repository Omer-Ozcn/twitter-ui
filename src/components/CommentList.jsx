import React, { useEffect, useState } from "react";
import api from "../api";
import Avatar from "./Avatar"; // YENİ EKLENDİ
import { formatTimeAgo } from "../utils/dateUtils";

export default function CommentList({ tweetId, refreshTrigger }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get("/comments/byTweet", { params: { tweetId } });
        setComments(Array.isArray(res.data) ? res.data : []);
      } catch (err) { console.error(err); }
    };
    fetchComments();
  }, [tweetId, refreshTrigger]);

  if (comments.length === 0) return null;

  return (
    <div className="mt-4 space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-3">
           <div className="flex-shrink-0">
              {/* AVATAR GÜNCELLENDİ */}
              <Avatar username={c.username} className="w-8 h-8" />
           </div>
           <div>
             <div className="flex items-center gap-2 text-xs text-gray-500">
               <span className="text-white font-bold">{c.username}</span>
               <span>· {formatTimeAgo(c.createdAt)}</span>
             </div>
             <p className="text-sm text-gray-300 mt-0.5">{c.content}</p>
           </div>
        </div>
      ))}
    </div>
  );
}