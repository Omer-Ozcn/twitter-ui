import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Kayıt başarılı! Giriş yapabilirsin.");
      navigate("/login");
    } catch (err) {
      setError("Kayıt başarısız. Kullanıcı adı veya email alınmış olabilir.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Hesap oluştur</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Kullanıcı Adı" onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
          <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
          <input type="password" placeholder="Şifre" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-600 transition">Kaydol</button>
        </form>
        
        <p className="text-gray-500 text-sm mt-6 text-center">
          Zaten hesabın var mı? <Link to="/login" className="text-blue-500 hover:underline">Giriş yap</Link>
        </p>
      </div>
    </div>
  );
}