import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, Lock, GraduationCap, ArrowRight, ShieldAlert, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context";

export const Login = () => {
  const navigate = useNavigate();
  const { siteSettings } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // 3 secret passwords for admin mode
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass1 === "admin" && pass2 === "123" && pass3 === "456") {
      navigate("/admin");
    } else {
      setAdminError("Mã bảo mật không chính xác. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#060812] flex items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div 
            onDoubleClick={() => setIsAdminMode(!isAdminMode)}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-6 cursor-pointer select-none"
            title="Double click for secret mode"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {isAdminMode ? "Hệ thống Quản trị" : `Chào mừng tới ${siteSettings.title}`}
          </h1>
          <p className="text-slate-400 mt-2">
            {isAdminMode ? "Khu vực giới hạn. Yêu cầu mã bảo mật cấp 3." : "Đăng nhập để tiếp tục hành trình học tiếng Anh"}
          </p>
        </div>

        <div className="bg-[#0f1123]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isAdminMode ? (
              <motion.form 
                key="admin-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleAdminLogin} 
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-2 mb-6 text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="font-semibold text-sm">Chế độ Quản trị viên (Admin Mode)</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Mã bảo mật lớp 1", value: pass1, setter: setPass1 },
                    { label: "Mã bảo mật lớp 2", value: pass2, setter: setPass2 },
                    { label: "Mã bảo mật lớp 3", value: pass3, setter: setPass3 },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs font-medium text-slate-400 ml-1">{field.label}</label>
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="password"
                          required
                          value={field.value}
                          onChange={(e) => {
                            field.setter(e.target.value);
                            setAdminError("");
                          }}
                          placeholder="••••••••"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {adminError && <p className="text-rose-400 text-sm text-center">{adminError}</p>}

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-400 hover:to-orange-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] flex items-center justify-center gap-2 group mt-8"
                >
                  Xác thực & Truy cập <Lock className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="user-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Quên mật khẩu?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group"
                >
                  Đăng nhập <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-8 text-center text-sm text-slate-400">
                  Chưa có tài khoản?{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 font-semibold">Đăng ký ngay</a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
