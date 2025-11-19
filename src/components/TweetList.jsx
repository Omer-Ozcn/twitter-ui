import React, { useEffect, useState } from "react";
import api from "../api";
import TweetItem from "./TweetItem";

export default function TweetList({ fetchUrl, refreshKey }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
      const url = fetchUrl || "/tweets";
      const res = await api.get(url);
      setTweets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Tweet fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [fetchUrl, refreshKey]);

  if (loading) return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;
  
  if (tweets.length === 0) {
    return (
      <div className="p-8 text-center flex flex-col items-center">
         <div className="text-4xl mb-2">📭</div>
         <p className="text-gray-500">Burada henüz tweet yok.</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} onUpdate={fetchTweets} />
      ))}
    </div>
  );
}