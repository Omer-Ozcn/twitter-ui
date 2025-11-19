import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Giriş başarısız. Bilgilerini kontrol et.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Twitter'a giriş yap</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
          <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition">Giriş Yap</button>
        </form>
        
        <p className="text-gray-500 text-sm mt-6 text-center">
          Hesabın yok mu? <Link to="/register" className="text-blue-500 hover:underline">Kaydol</Link>
        </p>
      </div>
    </div>
  );
}