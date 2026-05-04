import React, { useState } from "react";
import { Send, Users, Search, MoreVertical, Paperclip, Smile, MessageCircle, UserPlus, Filter, MapPin, Target, Heart, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

const MOCK_FRIENDS = [
  { id: 1, name: "Trần Bảo", status: "online", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150" },
  { id: 2, name: "Lê Minh", status: "offline", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150" },
  { id: 3, name: "Anna Nguyen", status: "online", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150" },
];

const MOCK_DISCOVER = [
  { id: 101, name: "Hoàng Phong", level: "B2 Upper", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150", goal: "IELTS 7.5", hobbies: ["Âm nhạc", "Công nghệ"] },
  { id: 102, name: "Mai Anh", level: "B1 Intermediate", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150", goal: "Giao tiếp", hobbies: ["Du lịch", "Phim ảnh"] },
  { id: 103, name: "Tuấn Vũ", level: "C1 Advanced", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150", goal: "Du học", hobbies: ["Thể thao", "Đọc sách"] },
  { id: 104, name: "Linh Chi", level: "A2 Basic", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150", goal: "TOEIC 800", hobbies: ["Game", "Âm nhạc"] },
  { id: 105, name: "Khánh Đan", level: "B2 Upper", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150", goal: "IELTS 7.0", hobbies: ["Ẩm thực", "Du lịch"] },
  { id: 106, name: "Minh Đức", level: "B1 Intermediate", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150", goal: "Giao tiếp", hobbies: ["Công nghệ", "Game"] },
];

export const Community = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'discover'>('chat');
  const [mobileView, setMobileView] = useState<'sidebar' | 'main'>('sidebar');
  
  // Chat State
  const [activeChat, setActiveChat] = useState(MOCK_FRIENDS[0]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi cậu, nay làm test Listening chưa?", sender: "them", time: "10:00 AM" },
    { id: 2, text: "Tớ mới làm xong nè, khó dã man =))", sender: "me", time: "10:05 AM" },
    { id: 3, text: "Được mấy chấm thế?", sender: "them", time: "10:06 AM" },
  ]);

  // Discover State
  const [filterGoal, setFilterGoal] = useState("");
  const [filterHobby, setFilterHobby] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: "me", time: "Now" }]);
    setMsg("");
  };

  const filteredUsers = MOCK_DISCOVER.filter(u => {
    if (filterGoal && !u.goal.toLowerCase().includes(filterGoal.toLowerCase())) return false;
    if (filterHobby && !u.hobbies.some(h => h.toLowerCase().includes(filterHobby.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-10rem)] max-h-[800px] flex rounded-2xl border border-white/10 bg-[#0f1123]/90 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      {/* Sidebar */}
      <div className={`${mobileView === 'sidebar' ? 'flex' : 'hidden md:flex'} w-full md:w-80 shrink-0 border-r border-white/10 flex-col bg-black/20 z-10`}>
        <div className="p-4 border-b border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Cộng đồng
          </h2>
          
          <div className="flex p-1 bg-white/5 rounded-xl">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chat' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" /> Tin nhắn
            </button>
            <button 
              onClick={() => setActiveTab('discover')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'discover' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Tìm bạn
            </button>
          </div>
        </div>

        {/* Sidebar Content based on Tab */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'chat' ? (
            <div className="p-2 space-y-1">
              <div className="px-3 pb-2 pt-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bạn bè..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>
              {MOCK_FRIENDS.map(friend => (
                <div 
                  key={friend.id}
                  onClick={() => { setActiveChat(friend); setMobileView('main'); }}
                  className={`flex items-center gap-3 p-3 mx-2 rounded-xl cursor-pointer transition-colors ${
                    activeChat.id === friend.id ? 'bg-indigo-500/20 border border-indigo-500/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    {friend.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0f1123] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-200 truncate">{friend.name}</h4>
                    <p className="text-xs text-slate-500 truncate">
                      {friend.status === 'online' ? 'Đang hoạt động' : 'Offline'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Bộ lọc tìm kiếm
                </label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 flex items-center gap-2"><Target className="w-4 h-4 text-indigo-400"/> Mục tiêu</label>
                    <select 
                      value={filterGoal}
                      onChange={(e) => setFilterGoal(e.target.value)}
                      className="w-full bg-[#0a0c1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Tất cả mục tiêu</option>
                      <option value="IELTS">Luyện thi IELTS</option>
                      <option value="TOEIC">Luyện thi TOEIC</option>
                      <option value="Giao tiếp">Giao tiếp</option>
                      <option value="Du học">Du học</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 flex items-center gap-2"><Heart className="w-4 h-4 text-rose-400"/> Sở thích</label>
                    <select 
                      value={filterHobby}
                      onChange={(e) => setFilterHobby(e.target.value)}
                      className="w-full bg-[#0a0c1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Tất cả sở thích</option>
                      <option value="Âm nhạc">Âm nhạc</option>
                      <option value="Phim ảnh">Phim ảnh</option>
                      <option value="Du lịch">Du lịch</option>
                      <option value="Công nghệ">Công nghệ</option>
                      <option value="Game">Game</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`${mobileView === 'main' ? 'flex' : 'hidden md:flex'} flex-1 flex-col relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-black/40`}>
        {activeTab === 'chat' ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-white/10 bg-[#0f1123]/95 backdrop-blur flex items-center justify-between px-6 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileView('sidebar')}
                  className="md:hidden p-2 -ml-3 text-slate-400 hover:text-white rounded-full hover:bg-white/5"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-slate-200">{activeChat.name}</h3>
                  <p className="text-xs text-emerald-400">Đang hoạt động</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar z-0">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    m.sender === 'me' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(79,70,229,0.2)]' 
                      : 'bg-white/10 text-slate-200 rounded-tl-sm border border-white/5'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{m.text}</p>
                    <span className={`text-[10px] mt-1 block ${m.sender === 'me' ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0f1123]/95 backdrop-blur border-t border-white/10 z-10">
              <form onSubmit={handleSend} className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-full p-1 pl-4">
                <button type="button" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button type="button" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input 
                  type="text" 
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Nhập tin nhắn..." 
                  className="flex-1 bg-transparent py-2 px-2 text-slate-200 focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={!msg.trim()}
                  className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Khám phá Bạn học</h2>
                <p className="text-slate-400">Tìm kiếm và kết bạn với những người có chung mục tiêu và sở thích để cùng tiến bộ.</p>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                  <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-300">Không tìm thấy ai phù hợp</h3>
                  <p className="text-slate-500">Thử thay đổi bộ lọc tìm kiếm nhé.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map((user, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={user.id} 
                      className="bg-[#0f1123] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors group flex flex-col"
                    >
                      <div className="h-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-16 h-16 rounded-full border-4 border-[#0f1123] absolute -bottom-8 left-4 object-cover bg-slate-800"
                        />
                      </div>
                      <div className="pt-10 p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-white">{user.name}</h3>
                        <p className="text-sm text-indigo-400 mb-4">{user.level}</p>
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start gap-2 text-sm text-slate-300">
                            <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Mục tiêu: {user.goal}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-slate-300">
                            <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div className="flex flex-wrap gap-1">
                              {user.hobbies.map((h, i) => (
                                <span key={i} className="px-2 py-0.5 bg-white/5 rounded-full text-xs">{h}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button className="w-full mt-6 py-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded-xl font-medium border border-indigo-500/20 transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                          <UserPlus className="w-4 h-4" /> Kết bạn
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
