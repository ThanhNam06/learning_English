import React, { useState } from "react";
import { motion } from "motion/react";
import { Palette, Sun, Moon, Image as ImageIcon, Save, CheckCircle2, Type } from "lucide-react";
import { useAppContext } from "../context";

export const Settings = () => {
  const { siteSettings, setSiteSettings } = useAppContext();
  const [tempSettings, setTempSettings] = useState(siteSettings);
  const [isSaved, setIsSaved] = useState(false);

  const backgroundThemes = [
    { id: "default", name: "Mặc định (Vũ trụ)", preview: "linear-gradient(to right, #0f1123, #060813)", url: "" },
    { id: "abstract", name: "Trừu tượng", preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" },
    { id: "nature", name: "Thiên nhiên", preview: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80" },
    { id: "lofi", name: "Lofi Chill", preview: "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)", url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80" },
    { id: "focus", name: "Tập trung", preview: "linear-gradient(to right, #434343 0%, #000000 100%)", url: "https://images.unsplash.com/photo-1497215848521-f0fa800b40eb?auto=format&fit=crop&w=800&q=80" },
    { id: "geometric", name: "Khối Hình học", preview: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
    { id: "synthwave", name: "Retro Synthwave", preview: "linear-gradient(to bottom, #fc00ff 0%, #00dbde 100%)", url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80" },
    { id: "watercolor", name: "Màu Nước", preview: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)", url: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=800&q=80" },
    { id: "cyberpunk", name: "Thành phố Cyberpunk", preview: "linear-gradient(to right, #f83600 0%, #f9d423 100%)", url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80" },
    { id: "space", name: "Thiên Hà Sâu", preview: "linear-gradient(to top, #09203f 0%, #537895 100%)", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80" },
    { id: "anime_sky", name: "Bầu trời Anime", preview: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80" },
    { id: "minimalist", name: "Trắng tinh giản", preview: "#f8fafc", url: "" },
  ];

  const fonts = [
    { id: "Inter, sans-serif", name: "Inter (Mặc định)" },
    { id: "'Roboto', sans-serif", name: "Roboto (Hiện đại)" },
    { id: "'Playfair Display', serif", name: "Playfair (Sang trọng)" },
    { id: "'Comic Sans MS', cursive", name: "Comic Sans (Vui nhộn)" },
    { id: "'Fira Code', monospace", name: "Fira Code (Code)" },
    { id: "'Nunito', sans-serif", name: "Nunito (Tròn trịa)" },
  ];

  const colors = [
    { hex: '#6366f1', name: 'Indigo' },
    { hex: '#8b5cf6', name: 'Purple' },
    { hex: '#ec4899', name: 'Pink' },
    { hex: '#14b8a6', name: 'Teal' },
    { hex: '#f59e0b', name: 'Amber' },
    { hex: '#ef4444', name: 'Rose' },
    { hex: '#3b82f6', name: 'Blue' },
    { hex: '#10b981', name: 'Emerald' },
    { hex: '#a855f7', name: 'Violet' },
    { hex: '#f97316', name: 'Orange' },
    { hex: '#84cc16', name: 'Lime' },
    { hex: '#06b6d4', name: 'Cyan' },
  ];

  const handleSave = () => {
    setSiteSettings(tempSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Palette className="w-8 h-8 text-indigo-400" />
          Cá nhân hoá giao diện
        </h1>
        <p className="text-slate-400">Tùy chỉnh không gian học tập theo cách bạn muốn để đạt cảm hứng cao nhất.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Theme Mode */}
        <div className="bg-black/20 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            {tempSettings.themeMode === 'dark' ? <Moon className="w-6 h-6 text-indigo-400" /> : <Sun className="w-6 h-6 text-indigo-400" />}
            <h3 className="text-xl font-bold text-white">Chế độ Sáng / Tối</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setTempSettings(prev => ({...prev, themeMode: 'dark'}))}
              className={`p-6 rounded-xl border flex items-center gap-4 transition-all ${tempSettings.themeMode === 'dark' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
            >
              <div className="w-12 h-12 rounded-full bg-[#0a0c1a] border border-white/20 shadow-inner flex items-center justify-center"><Moon className="w-5 h-5 text-indigo-400" /></div>
              <div className="text-left">
                <span className="font-bold text-lg text-slate-200 block">Dark Mode</span>
                <span className="text-sm text-slate-400">Giao diện vũ trụ tối</span>
              </div>
            </button>
            <button 
              onClick={() => setTempSettings(prev => ({...prev, themeMode: 'light'}))}
              className={`p-6 rounded-xl border flex items-center gap-4 transition-all ${tempSettings.themeMode === 'light' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 shadow-inner flex items-center justify-center"><Sun className="w-5 h-5 text-amber-500" /></div>
              <div className="text-left">
                <span className="font-bold text-lg text-slate-200 block">Light Mode</span>
                <span className="text-sm text-slate-400">Giao diện sáng rực rỡ</span>
              </div>
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div className="bg-black/20 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Màu sắc chủ đạo</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setTempSettings(prev => ({...prev, primaryColor: color.hex}))}
                  className={`w-14 h-14 rounded-full transition-all flex items-center justify-center ${tempSettings.primaryColor === color.hex ? 'ring-4 ring-white ring-offset-4 ring-offset-[#0f1123] scale-110 shadow-lg' : 'hover:scale-105 shadow-md'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {tempSettings.primaryColor === color.hex && <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Background Theme */}
        <div className="bg-black/20 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Theme Hình nền</h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgroundThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTempSettings(prev => ({...prev, backgroundTheme: theme.id}))}
                className={`relative h-28 rounded-xl overflow-hidden border-2 transition-all flex items-end p-3 ${
                  tempSettings.backgroundTheme === theme.id 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                    : 'border-transparent hover:border-white/20'
                }`}
              >
                {/* Background image preview */}
                <div 
                  className="absolute inset-0 z-0 opacity-80"
                  style={{ 
                    background: theme.url ? `url(${theme.url}) center/cover no-repeat` : theme.preview
                  }}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                
                <div className="relative z-20 flex items-center justify-between w-full">
                  <span className="font-semibold text-white text-sm drop-shadow-md">{theme.name}</span>
                  {tempSettings.backgroundTheme === theme.id && <CheckCircle2 className="w-4 h-4 text-indigo-400 drop-shadow-md" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Family Selection */}
        <div className="bg-black/20 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Type className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Kiểu Chữ</h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => setTempSettings(prev => ({...prev, fontFamily: font.id}))}
                className={`p-4 rounded-xl border transition-all text-left ${
                  tempSettings.fontFamily === font.id 
                    ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                    : 'bg-black/40 border-white/10 hover:border-white/30'
                }`}
                style={{ fontFamily: font.id }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-slate-200">{font.name}</span>
                  {tempSettings.fontFamily === font.id && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                </div>
                <span className="text-sm text-slate-400">Giao diện E-Learning</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave} 
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2"
          >
            {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />} 
            {isSaved ? "Đã lưu!" : "Lưu Cài Đặt"}
          </button>
        </div>

      </motion.div>
    </div>
  );
};