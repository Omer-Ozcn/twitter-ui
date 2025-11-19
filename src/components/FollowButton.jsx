import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function FollowButton({ targetUserId, targetUsername, onChange }) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || user.id === targetUserId) return null;

  useEffect(() => {
    checkFollowStatus();
  }, [targetUserId]);

  const checkFollowStatus = async () => {
    try {
      const res = await api.get("/follow/isFollowing", {
        params: { followerId: user.id, followingId: targetUserId }
      });
      setIsFollowing(res.data.following);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await api.post("/follow/unfollow", { followerId: user.id, followingId: targetUserId });
        setIsFollowing(false);
      } else {
        await api.post("/follow", { followerId: user.id, followingId: targetUserId });
        setIsFollowing(true);
      }
      onChange && onChange();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-1.5 rounded-full font-bold text-sm transition ${
        isFollowing 
          ? "border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-900/10" 
          : "bg-white text-black hover:bg-gray-200"
      }`}
    >
      {loading ? "..." : isFollowing ? "Takip Ediliyor" : "Takip Et"}
    </button>
  );
}