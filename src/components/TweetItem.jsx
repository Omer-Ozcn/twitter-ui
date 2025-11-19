import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import CommentList from "./CommentList";
import Avatar from "./Avatar"; // YENİ EKLENDİ
import { formatTimeAgo } from "../utils/dateUtils";

export default function TweetItem({ tweet, onUpdate }) {
  const { user } = useAuth();
  const location = useLocation();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentRefresh, setCommentRefresh] = useState(0);

  const isProfilePage = location.pathname.startsWith("/profile/");
  const profileUsername = isProfilePage ? location.pathname.split("/")[2] : null;
  const isRetweetContent = tweet.retweet || tweet.isRetweet;

  const handleLike = async () => {
    try {
      if (tweet.likedByCurrentUser) await api.post(`/likes/${tweet.id}/dislike`);
      else await api.post(`/likes/${tweet.id}`);
      onUpdate();
    } catch (err) { console.error(err); }
  };

  const handleRetweet = async () => {
    try {
      if (tweet.retweetedByCurrentUser) await api.delete(`/retweets/by-tweet/${tweet.id}`);
      else await api.post(`/retweets/${tweet.id}`);
      onUpdate();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    try {
      await api.delete(`/tweets/${tweet.id}`);
      onUpdate();
    } catch (err) { console.error(err); }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await api.post("/comments", { tweetId: tweet.id, content: commentText });
      setCommentText("");
      onUpdate(); 
      setCommentRefresh(prev => prev + 1); 
    } catch (err) { console.error(err); }
  };

  return (
    <article className="border-b border-gray-800 hover:bg-white/5 transition cursor-pointer">
      {isRetweetContent && isProfilePage && (
        <div className="px-4 pt-2 flex items-center gap-2 text-gray-500 text-xs font-bold">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
          </svg>
          <span>{profileUsername} Retweetledi</span>
        </div>
      )}

      <div className="px-4 py-3 flex gap-3">
        <Link to={`/profile/${tweet.username}`} className="flex-shrink-0">
          {/* AVATAR GÜNCELLENDİ */}
          <Avatar username={tweet.username} className="w-10 h-10 hover:opacity-90" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link to={`/profile/${tweet.username}`} className="font-bold text-white hover:underline">{tweet.username}</Link>
              <span className="text-gray-500">@{tweet.username}</span>
              <span className="text-gray-500">· {formatTimeAgo(tweet.createdAt)}</span>
            </div>
            {user?.username === tweet.username && (
              <button onClick={(e) => { e.stopPropagation(); handleDelete(); }} className="text-gray-500 hover:text-red-500 text-xs">
                Sil
              </button>
            )}
          </div>

          <p className="text-white mt-1 text-[15px] whitespace-pre-wrap break-words">{tweet.content}</p>

          <div className="flex items-center justify-between mt-3 max-w-md text-gray-500 text-sm" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 hover:text-blue-400 group transition">
              <span>💬</span> {tweet.commentCount}
            </button>
            <button onClick={handleRetweet} className={`flex items-center gap-2 hover:text-green-400 transition ${tweet.retweetedByCurrentUser ? "text-green-500" : ""}`}>
              <span>🔁</span> {tweet.retweetCount}
            </button>
            <button onClick={handleLike} className={`flex items-center gap-2 hover:text-pink-500 transition ${tweet.likedByCurrentUser ? "text-pink-500" : ""}`}>
              <span>❤️</span> {tweet.likeCount}
            </button>
          </div>

          {showComments && (
            <div className="mt-3 pt-3 border-t border-gray-800" onClick={e => e.stopPropagation()}>
              <CommentList tweetId={tweet.id} refreshTrigger={commentRefresh} />
              <form onSubmit={submitComment} className="mt-3 flex gap-3 items-center">
                 <Avatar username={user.username} className="w-8 h-8" />
                 <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Yanıtını gönder..." className="flex-1 bg-black border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
                 <button disabled={!commentText} className="text-blue-500 font-bold text-sm disabled:opacity-50">Yanıtla</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}