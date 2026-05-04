import React, { useState } from "react";
import { useAppContext } from "../context";
import { Camera, Save, UserCircle } from "lucide-react";

export const Profile = () => {
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, name: formData.name, email: formData.email, avatar: avatarUrl });
    alert("Cập nhật hồ sơ thành công!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload via generic unsplash for demonstration
    const fakeNewAvatar = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256";
    setAvatarUrl(fakeNewAvatar);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#0f1123] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background Banner */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-80" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 pt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img 
                  src={avatarUrl} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-full border-4 border-[#0f1123] object-cover bg-slate-800"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
              <span className="px-3 py-1 mt-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                {user.level}
              </span>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSave} className="flex-1 w-full space-y-6 pt-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Họ và Tên</label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  <Save className="w-5 h-5" />
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
