import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Headphones, BookOpen, PenTool, Mic, PlayCircle, Trophy, BarChart2 } from "lucide-react";

export const IELTS = () => {
  const navigate = useNavigate();

  const skills = [
    { 
      id: "listening", 
      title: "Listening", 
      icon: Headphones, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      desc: "4 parts, 40 questions. Luyện tập khả năng nghe hiểu với nhiều giọng điệu khác nhau."
    },
    { 
      id: "reading", 
      title: "Reading", 
      icon: BookOpen, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      desc: "3 sections, 40 questions. Nâng cao tốc độ đọc và khả năng tìm kiếm thông tin."
    },
    { 
      id: "writing", 
      title: "Writing", 
      icon: PenTool, 
      color: "text-amber-400", 
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      desc: "2 tasks. Luyện tập viết bài phân tích biểu đồ và nghị luận xã hội."
    },
    { 
      id: "speaking", 
      title: "Speaking", 
      icon: Mic, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      desc: "3 parts. Tự tin giao tiếp với AI chấm điểm phát âm và ngữ pháp theo thời gian thực."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium">
              <Trophy className="w-4 h-4" />
              Chương trình chuẩn IELTS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Chinh phục mục tiêu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">IELTS 7.5+</span>
            </h1>
            <p className="text-lg text-slate-300">
              Làm bài thi thử chuẩn format, chấm điểm bằng AI thông minh, và nhận phân tích chi tiết để cải thiện từng kỹ năng.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/ielts/list/full')}
            className="flex-shrink-0 group relative px-8 py-4 bg-indigo-500 rounded-2xl font-bold text-lg text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <PlayCircle className="w-6 h-6" />
              Thi Full Test ngay
            </div>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f1123] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <BarChart2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Điểm thi thử gần nhất</p>
            <p className="text-2xl font-bold text-white">6.5 Overall</p>
          </div>
        </div>
        <div className="bg-[#0f1123] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Số bài thi đã làm</p>
            <p className="text-2xl font-bold text-white">12 Đề</p>
          </div>
        </div>
        <div className="bg-[#0f1123] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Kỹ năng mạnh nhất</p>
            <p className="text-2xl font-bold text-white">Reading (7.5)</p>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Luyện từng kỹ năng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <motion.div 
              key={skill.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-[#0f1123] border ${skill.border} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
              onClick={() => navigate(`/ielts/list/${skill.id}`)}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${skill.bg} blur-[50px] -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-xl ${skill.bg} ${skill.color}`}>
                    <skill.icon className="w-8 h-8" />
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10">
                    Làm bài
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-slate-400">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
