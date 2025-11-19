import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import FollowButton from "../components/FollowButton";
import TweetItem from "../components/TweetItem";
import UserList from "../components/UserList";
import Avatar from "../components/Avatar"; // YENİ EKLENDİ
import { formatFullDate } from "../utils/dateUtils";

export default function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [likedTweets, setLikedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweetsRefresh, setTweetsRefresh] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [modalUsers, setModalUsers] = useState([]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${username}/profile`);
      setProfile(res.data);
      if (res.data.user) {
         const statsRes = await api.get("/follow/stats", { params: { userId: res.data.user.id } });
         setStats(statsRes.data);
      }
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    setActiveTab("tweets");
  }, [username, tweetsRefresh]);

  useEffect(() => {
    if (activeTab === "likes" && profile?.user?.id) {
      api.get(`/likes/user/${profile.user.id}`)
        .then(res => setLikedTweets(Array.isArray(res.data) ? res.data : []))
        .catch(err => console.error("Likes fetch error", err));
    }
  }, [activeTab, profile?.user?.id, tweetsRefresh]);

  const openListModal = async (type) => {
    if (!profile?.user?.id) return;
    try {
      const endpoint = type === "followers" 
        ? `/follow/${profile.user.id}/followers` 
        : `/follow/${profile.user.id}/following`;
      
      const res = await api.get(endpoint);
      setModalUsers(res.data);
      setModalType(type);
    } catch (err) {
      console.error("List fetch error", err);
    }
  };

  if (loading && !profile) return <div className="text-white p-8 text-center">Yükleniyor...</div>;
  if (!profile) return <div className="text-white p-8 text-center">Kullanıcı bulunamadı.</div>;

  const { user, tweets } = profile;

  return (
    <div>
      <div className="sticky top-0 bg-black/80 backdrop-blur z-10 px-4 py-2 border-b border-gray-800 flex items-center gap-4">
        <div onClick={() => window.history.back()} className="cursor-pointer p-2 rounded-full hover:bg-gray-800">
           <svg viewBox="0 0 24 24" className="w-5 h-5 text-white"><path fill="currentColor" d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"/></svg>
        </div>
        <div>
           <h1 className="text-xl font-bold text-white">{user.username}</h1>
           <p className="text-xs text-gray-500">{tweets.length} Tweet</p>
        </div>
      </div>

      <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700"></div>

      <div className="px-4 pb-4 border-b border-gray-800 relative">
        <div className="flex justify-between items-start">
           <div className="-mt-16">
              {/* BÜYÜK AVATAR GÜNCELLENDİ */}
              <div className="w-32 h-32 rounded-full p-1 bg-black">
                 <Avatar username={user.username} className="w-full h-full" />
              </div>
           </div>
           
           <div className="mt-4">
             {currentUser?.username === user.username ? (
               <button className="border border-gray-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-white/10 transition">Profili Düzenle</button>
             ) : (
               <FollowButton 
                 targetUserId={user.id} 
                 targetUsername={user.username} 
                 onChange={fetchProfile} 
               />
             )}
           </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-white">{user.username}</h2>
          <p className="text-gray-500">@{user.username}</p>
          
          {user.bio && <p className="text-white mt-3">{user.bio}</p>}
          
          <div className="mt-3 text-gray-500 text-sm flex items-center gap-2">
            <span>📅</span>
            <span>{formatFullDate(user.createdAt)} tarihinde katıldı</span>
          </div>
        
          <div className="flex gap-4 mt-3 text-sm text-gray-500">
             <button onClick={() => openListModal("following")} className="hover:underline cursor-pointer hover:text-white transition">
               <strong className="text-white">{stats?.followingCount || 0}</strong> Takip Edilen
             </button>
             <button onClick={() => openListModal("followers")} className="hover:underline cursor-pointer hover:text-white transition">
               <strong className="text-white">{stats?.followersCount || 0}</strong> Takipçi
             </button>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-800">
        <div 
          onClick={() => setActiveTab("tweets")}
          className={`flex-1 text-center p-4 hover:bg-white/5 cursor-pointer relative transition ${activeTab === "tweets" ? "text-white font-bold" : "text-gray-500"}`}
        >
           <span>Tweetler</span>
           {activeTab === "tweets" && <div className="absolute bottom-0 left-0 w-full flex justify-center"><div className="h-1 w-16 bg-blue-500 rounded-full"></div></div>}
        </div>
        <div 
          onClick={() => setActiveTab("likes")}
          className={`flex-1 text-center p-4 hover:bg-white/5 cursor-pointer relative transition ${activeTab === "likes" ? "text-white font-bold" : "text-gray-500"}`}
        >
          <span>Beğeniler</span>
          {activeTab === "likes" && <div className="absolute bottom-0 left-0 w-full flex justify-center"><div className="h-1 w-16 bg-blue-500 rounded-full"></div></div>}
        </div>
      </div>

      <div>
        {activeTab === "tweets" ? (
          tweets.length > 0 ? (
              tweets.map(tweet => (
              <TweetItem key={tweet.id} tweet={tweet} onUpdate={() => setTweetsRefresh(p => p+1)} />
              ))
          ) : (
              <div className="p-8 text-center text-gray-500">Bu kullanıcı henüz tweet atmamış.</div>
          )
        ) : (
          likedTweets.length > 0 ? (
              likedTweets.map(tweet => (
              <TweetItem key={tweet.id} tweet={tweet} onUpdate={() => setTweetsRefresh(p => p+1)} />
              ))
          ) : (
              <div className="p-8 text-center text-gray-500">Henüz beğenilmiş bir tweet yok.</div>
          )
        )}
      </div>

      {modalType && (
        <UserList
          title={modalType === "followers" ? "Takipçiler" : "Takip Edilenler"} 
          users={modalUsers} 
          onClose={() => setModalType(null)} 
        />
      )}
    </div>
  );
}