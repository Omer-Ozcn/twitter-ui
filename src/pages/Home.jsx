import React, { useState } from "react";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur px-4 py-3 border-b border-gray-800">
         <h1 className="text-xl font-bold text-white">Ana Sayfa</h1>
      </div>
      
      <TweetForm onTweetAdded={() => setRefreshKey(k => k + 1)} />
      
      <div className="h-2 bg-gray-900 border-b border-gray-800"></div>
      
      <TweetList fetchUrl="/tweets" refreshKey={refreshKey} />
    </>
  );
}