import React from 'react';

export default function Avatar({ username, className }) {
  // Kullanıcı adı yoksa varsayılan bir seed kullan
  const seed = username || "default";
  
  // DiceBear API kullanarak kullanıcıya özel avatar URL'i oluştur
  // 'avataaars' stili Twitter tarzına çok uygundur. 
  // Alternatif stiller: 'bottts', 'miniavs', 'identicon'
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;

  return (
    <img
      src={avatarUrl}
      alt={username}
      className={`rounded-full bg-gray-800 object-cover ${className}`}
    />
  );
}