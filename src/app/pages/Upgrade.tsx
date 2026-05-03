import React from "react";
import { CheckCircle2, Crown, Zap, Star } from "lucide-react";
import { motion } from "motion/react";

export const Upgrade = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nâng cấp <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Pro</span>
        </h1>
        <p className="text-lg text-slate-400">
          Mở khóa toàn bộ tiềm năng học tập. Trải nghiệm không giới hạn với AI Tutor và kho tàng đề thi IELTS độc quyền.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Basic Plan */}
        <PlanCard 
          title="Cơ Bản"
          price="Miễn phí"
          period="Mãi mãi"
          desc="Dành cho người mới bắt đầu"
          features={[
            "Truy cập từ điển cơ bản",
            "Tạo tối đa 100 Flashcards",
            "Thi thử IELTS (1 đề/tuần)",
            "Cộng đồng giao tiếp cơ bản"
          ]}
          btnText="Đang sử dụng"
          isActive={false}
          icon={Star}
          color="text-slate-300"
        />

        {/* Advanced Plan */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
            PHỔ BIẾN NHẤT
          </div>
          <PlanCard 
            title="Nâng Cao"
            price="199.000đ"
            period="/tháng"
            desc="Dành cho người học nghiêm túc"
            features={[
              "Mọi tính năng của Cơ Bản",
              "Flashcards không giới hạn",
              "Thi thử IELTS không giới hạn",
              "Chấm điểm Speaking/Writing bằng AI",
              "AI Tutor (50 câu hỏi/ngày)"
            ]}
            btnText="Nâng cấp ngay"
            isActive={true}
            icon={Zap}
            color="text-indigo-400"
            highlight={true}
          />
        </div>

        {/* Premium Plan */}
        <PlanCard 
          title="Cao Cấp"
          price="399.000đ"
          period="/tháng"
          desc="Trải nghiệm VIP toàn diện"
          features={[
            "Mọi tính năng của Nâng Cao",
            "AI Tutor không giới hạn",
            "Lộ trình học cá nhân hóa",
            "1-on-1 với giáo viên thực (2h/tháng)",
            "Ưu tiên hỗ trợ 24/7"
          ]}
          btnText="Chọn Cao Cấp"
          isActive={false}
          icon={Crown}
          color="text-amber-400"
        />
      </div>
    </div>
  );
};

const PlanCard = ({ title, price, period, desc, features, btnText, isActive, icon: Icon, color, highlight = false }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all ${
      highlight 
        ? 'bg-gradient-to-b from-indigo-900/40 to-[#0f1123] border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)] scale-105 z-10' 
        : 'bg-[#0f1123] border-white/10'
    }`}
  >
    <div className="mb-8">
      <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-white/5 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        {period && <span className="text-slate-400 font-medium">{period}</span>}
      </div>
    </div>

    <ul className="flex-1 space-y-4 mb-8">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-slate-300">
          <CheckCircle2 className={`w-5 h-5 shrink-0 ${highlight ? 'text-indigo-400' : 'text-slate-500'}`} />
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <button className={`w-full py-4 rounded-xl font-bold transition-all ${
      isActive
        ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
    }`}>
      {btnText}
    </button>
  </motion.div>
);
