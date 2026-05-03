import React, { useState, useEffect, useRef } from "react";
import { Bot, Sparkles, Send, Mic, MicOff, PhoneCall, Volume2, Lock, Calendar, MessageSquare, ChevronLeft, MoreVertical, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SPEAKING_TOPICS = [
  { day: 1, title: "Giới thiệu bản thân", difficulty: "Dễ", locked: false, description: "Hỏi và trả lời về Tên tuổi, Quê quán, Sở thích." },
  { day: 2, title: "Thời gian rảnh rỗi", difficulty: "Dễ", locked: false, description: "Nói về những hoạt động bạn làm khi rảnh rỗi." },
  { day: 3, title: "Miêu tả một người bạn", difficulty: "Dễ", locked: false, description: "Mô tả ngoại hình và tính cách của ai đó." },
  { day: 4, title: "Gọi món tại nhà hàng", difficulty: "Trung bình", locked: false, description: "Giao tiếp cơ bản khi đi ăn uống, gọi món, tính tiền." },
  { day: 5, title: "Hỏi và chỉ đường", difficulty: "Trung bình", locked: false, description: "Làm sao để đến một địa điểm lạ trong thành phố." },
  { day: 6, title: "Kế hoạch tương lai", difficulty: "Trung bình", locked: false, description: "Dự định nghề nghiệp, học tập trong 5 năm tới." },
  { day: 7, title: "Trải nghiệm du lịch", difficulty: "Trung bình", locked: false, description: "Kể về một chuyến đi đáng nhớ nhất của bạn." },
  { day: 8, title: "Bảo vệ môi trường", difficulty: "Khó", locked: false, description: "Bày tỏ quan điểm về ô nhiễm và biến đổi khí hậu." },
  { day: 9, title: "Tác động của công nghệ", difficulty: "Khó", locked: false, description: "Tranh luận về AI, mạng xã hội và cuộc sống số." },
  { day: 10, title: "Định nghĩa Thành công", difficulty: "Rất Khó", locked: false, description: "Thảo luận về các khái niệm trừu tượng, triết lý." },
];

export const AITutor = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'speaking'>('chat');
  const [activeDay, setActiveDay] = useState<typeof SPEAKING_TOPICS[0] | null>(null);

  // Chat State
  const [messages, setMessages] = useState([
    { id: 1, text: "Chào bạn! Tôi là AI Tutor cá nhân của bạn. Hôm nay bạn muốn học về chủ đề gì hay có thắc mắc nào về ngữ pháp, từ vựng không?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");

  // Speaking State
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [callTranscript, setCallTranscript] = useState([
    { id: 1, text: "Hello! I'm your AI speaking partner. Let's practice English together. Ready to start?", sender: "ai" }
  ]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [callTranscript, isRecording, isAiSpeaking]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, newMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "Câu hỏi rất hay! Để tôi giải thích chi tiết hơn cho bạn...", 
        sender: "ai" 
      }]);
    }, 1000);
  };

  // Mock Speaking Interaction
  const handleFinishCall = () => {
    setIsRecording(false);
    setIsEvaluating(true);
    setShowEvaluation(true);
    
    // Mock API processing time
    setTimeout(() => {
      setIsEvaluating(false);
    }, 2000);
  };

  const handleToggleMic = () => {
    if (isAiSpeaking) return; // Prevent user speaking while AI is speaking
    
    if (isRecording) {
      // Stop recording and send message
      setIsRecording(false);
      const userMsg = { id: Date.now(), text: "Yes, I am ready to practice. Let's start with the first topic.", sender: "user" };
      setCallTranscript(prev => [...prev, userMsg]);
      
      // Simulate AI Processing & Responding
      setTimeout(() => {
        setIsAiSpeaking(true);
        setTimeout(() => {
          setIsAiSpeaking(false);
          setCallTranscript(prev => [...prev, { 
            id: Date.now(), 
            text: `Great! For today's topic, tell me a little bit about yourself. What is your name and where are you from?`, 
            sender: "ai" 
          }]);
        }, 3000); // 3 seconds AI speaking duration
      }, 500);
    } else {
      setIsRecording(true);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Dễ': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Trung bình': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Khó': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Rất Khó': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-13rem)] md:h-[calc(100vh-8rem)] flex flex-col relative z-0">
      {!activeDay ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI Tutor Cá Nhân
            </h1>
            <p className="text-slate-400 mt-2">Hỏi đáp Ngữ Pháp & Luyện Nói 1-1 cùng Trí Tuệ Nhân Tạo</p>
          </div>

          <div className="flex bg-[#0f1123]/80 p-1.5 rounded-xl border border-white/10 w-full max-w-sm mx-auto mb-6 backdrop-blur">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-all ${
                activeTab === 'chat' 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Trợ giảng Text
            </button>
            <button 
              onClick={() => setActiveTab('speaking')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-all ${
                activeTab === 'speaking' 
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PhoneCall className="w-4 h-4" /> Luyện nói 1-1
            </button>
          </div>

          {activeTab === 'chat' ? (
            <div className="flex-1 bg-[#0f1123] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex gap-4 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                        <Bot className="w-5 h-5 text-indigo-400" />
                      </div>
                    )}
                    <div className={`px-6 py-4 rounded-2xl max-w-[80%] text-[15px] leading-relaxed shadow-lg ${
                      m.sender === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm' 
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm backdrop-blur-sm'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-10">
                <form onSubmit={handleSendChat} className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Hỏi AI về ngữ pháp, từ vựng hoặc chữa bài tập..." 
                    className="w-full bg-[#0a0c1a] border border-white/20 rounded-xl py-4 pl-6 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                  <Sparkles className="absolute left-4 -top-3 w-4 h-4 text-amber-400 opacity-50" />
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPEAKING_TOPICS.map((topic, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={topic.day}
                    onClick={() => !topic.locked && setActiveDay(topic)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col group ${
                      topic.locked 
                        ? 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed' 
                        : 'bg-[#0f1123] border-white/10 hover:border-rose-500/50 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          topic.locked ? 'bg-slate-800 text-slate-500' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {topic.locked ? <Lock className="w-5 h-5" /> : `N.${topic.day}`}
                        </div>
                        <div>
                          <h3 className="font-bold text-white group-hover:text-rose-400 transition-colors">Ngày {topic.day}</h3>
                          <p className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> Topic Mới</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-200 mb-2">{topic.title}</h4>
                    <p className="text-sm text-slate-400 flex-1">{topic.description}</p>
                    
                    {!topic.locked && (
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <button className="flex items-center gap-2 text-rose-400 text-sm font-bold group-hover:text-rose-300">
                          Bắt đầu luyện tập <PhoneCall className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* The Active Voice Call Room */
        <div className="flex-1 bg-[#060813] border border-white/10 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur flex items-center justify-between px-4 md:px-6 relative z-20 shrink-0">
            <button 
              onClick={() => setActiveDay(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden md:inline">Đổi chủ đề</span>
            </button>
            <div className="text-center absolute left-1/2 -translate-x-1/2">
              <h2 className="font-bold text-white text-sm md:text-base truncate">Ngày {activeDay.day}: {activeDay.title}</h2>
              <p className="text-xs text-rose-400 flex justify-center items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Đang mô phỏng Gọi
              </p>
            </div>
            <button className="p-2 text-slate-400 hover:text-white rounded-full">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
            {/* Transcript / Subtitles */}
            <div className="flex-1 w-full bg-[#060813]/80 flex flex-col relative h-full">
              <div className="p-6 pb-0 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Live Transcript
                </h4>
              </div>
              
              <div 
                ref={transcriptRef}
                className="flex-1 overflow-y-auto space-y-6 custom-scrollbar px-6 pb-6 pr-4"
              >
                <AnimatePresence initial={false}>
                  {callTranscript.map((msg, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed ${
                        msg.sender === 'ai' 
                          ? 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm'
                          : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isRecording && (
                    <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end gap-3 mt-4">
                      <div className="p-4 rounded-2xl bg-indigo-600/50 border border-indigo-500/30 text-white rounded-tr-sm italic text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-ping" />
                        Đang ghi âm (Mô phỏng)... Nhấn Dừng để gửi
                      </div>
                    </motion.div>
                  )}

                  {isAiSpeaking && (
                    <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 rounded-tl-sm text-sm italic flex items-center gap-2">
                        <Volume2 className="w-4 h-4 animate-pulse text-indigo-400" />
                        AI đang phản hồi...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call Controls */}
              {!showEvaluation && (
                <div className="p-6 pt-2 flex justify-center z-20 shrink-0">
                  <div className="bg-[#0f1123]/95 backdrop-blur-xl border border-white/10 p-3 rounded-full flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <button 
                      onClick={handleFinishCall}
                      className="w-12 h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                      title="Nộp bài & Kết thúc"
                    >
                      <PhoneCall className="w-5 h-5 rotate-[135deg]" />
                    </button>

                    <button 
                      disabled={isAiSpeaking}
                      onClick={handleToggleMic}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
                        isAiSpeaking 
                          ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                          : isRecording 
                            ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-110' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <button className="w-12 h-12 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full flex items-center justify-center transition-colors" title="Bật/Tắt âm thanh AI">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Evaluation Panel */}
            {showEvaluation && (
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="absolute inset-0 z-40 bg-[#060813] overflow-y-auto custom-scrollbar flex flex-col"
              >
                {isEvaluating ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="font-medium animate-pulse">AI đang chấm điểm và phân tích lỗi sai...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="sticky top-0 bg-[#060813]/90 backdrop-blur-md border-b border-white/10 p-4 px-6 flex items-center justify-between z-10 shrink-0">
                      <button 
                        onClick={() => setShowEvaluation(false)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Quay lại luyện nói
                      </button>
                      <h3 className="text-base font-bold text-white flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                        <Sparkles className="w-4 h-4 text-indigo-400" /> Kết quả Đánh giá
                      </h3>
                    </div>
                    
                    <div className="p-6 md:p-8 max-w-3xl mx-auto w-full space-y-8">
                      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6 flex items-center justify-between">
                        <div>
                          <h4 className="text-slate-300 font-medium mb-1">Điểm IELTS Ước tính</h4>
                          <p className="text-sm text-slate-500">Dựa trên từ vựng, ngữ pháp và phát âm</p>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-[#0a0c1a] border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                          <span className="text-3xl font-black text-emerald-400">6.5</span>
                        </div>
                      </div>
                      
                      {/* Corrections */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-indigo-400" /> Chi tiết Sửa lỗi & Góp ý
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">✕</div>
                              <div>
                                <p className="text-[15px] text-slate-400 line-through">I goes to school every day.</p>
                                <p className="text-[15px] text-emerald-400 mt-2 font-medium flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">✓</span> 
                                  I <strong className="text-white">go</strong> to school every day.
                                </p>
                                <div className="mt-3 bg-black/40 p-3 rounded-xl border border-white/5">
                                  <p className="text-sm text-slate-400">
                                    <strong className="text-white">Lỗi ngữ pháp:</strong> Với chủ ngữ "I", động từ "go" ở thì hiện tại đơn giữ nguyên mẫu, không thêm "es".
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">!</div>
                              <div>
                                <p className="text-[15px] text-slate-300 font-medium">Gợi ý Nâng cấp Từ vựng</p>
                                <p className="text-[15px] text-indigo-300 mt-2">
                                  Thay vì dùng từ <span className="bg-white/10 px-1.5 py-0.5 rounded text-white">"very good"</span>, bạn có thể gây ấn tượng mạnh hơn với giám khảo bằng cách dùng <strong className="text-white bg-indigo-500/20 px-1.5 py-0.5 rounded">"excellent"</strong> hoặc <strong className="text-white bg-indigo-500/20 px-1.5 py-0.5 rounded">"outstanding"</strong>.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/[0.07] transition-colors md:col-span-2">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                <Volume2 className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[15px] text-slate-300 font-medium">Nhận xét Phát âm</p>
                                <p className="text-[15px] text-slate-400 mt-2">
                                  Phát âm của bạn khá rõ ràng và dễ nghe. Tuy nhiên, chú ý nhấn trọng âm đúng chỗ hơn ở những từ có nhiều âm tiết như <strong className="text-white">"com-FOR-ta-ble"</strong> (thay vì com-for-TA-ble). Hãy cố gắng nối âm (linking sounds) để câu nói tự nhiên hơn nhé!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4">
                        <button 
                          onClick={() => setShowEvaluation(false)}
                          className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
                        >
                          Luyện tập lại
                        </button>
                        <button 
                          onClick={() => {
                            setActiveDay(null);
                            setShowEvaluation(false);
                          }}
                          className="flex-1 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                        >
                          Hoàn thành Chủ đề
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
