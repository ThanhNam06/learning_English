import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  PlusCircle,
  BarChart3,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  ChevronRight,
  Trash2,
  Crown,
  Palette,
  Globe,
  Image as ImageIcon,
  Save
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from "recharts";
import { motion } from "motion/react";
import { useAppContext } from "../context";

const chartData = [
  { month: "Tháng 1", participants: 1200 },
  { month: "Tháng 2", participants: 2100 },
  { month: "Tháng 3", participants: 1800 },
  { month: "Tháng 4", participants: 2400 },
  { month: "Tháng 5", participants: 3200 },
  { month: "Tháng 6", participants: 4100 },
  { month: "Tháng 7", participants: 3800 },
];

const mockTests = [
  { id: 1, name: "Cambridge IELTS 18 - Test 1", type: "Academic", status: "Active", participants: 4520, date: "20/04/2026" },
  { id: 2, name: "Cambridge IELTS 18 - Test 2", type: "Academic", status: "Active", participants: 3100, date: "22/04/2026" },
  { id: 3, name: "IELTS General Training 15", type: "General", status: "Draft", participants: 0, date: "25/04/2026" },
  { id: 4, name: "IELTS Mock Test (Tháng 4)", type: "Academic", status: "Active", participants: 1250, date: "26/04/2026" },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usersList, setUsersList } = useAppContext();
  const [activeTab, setActiveTab] = useState<"dashboard" | "tests" | "users">("dashboard");
  const [isAddingTest, setIsAddingTest] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handlePlanChange = (id: number | undefined, newPlan: string) => {
    if (!id) return;
    setUsersList(prev => prev.map(user => user.id === id ? { ...user, plan: newPlan } : user));
  };

  const handleDeleteUser = (id: number | undefined) => {
    if (!id) return;
    setUsersList(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0c1a] text-slate-200 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-[#0f1123] flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <span className="font-bold text-white text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-white tracking-wide">E-Learning</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Tổng quan" 
            active={activeTab === "dashboard"} 
            onClick={() => { setActiveTab("dashboard"); setIsAddingTest(false); }} 
          />
          <NavItem 
            icon={<FileText className="w-5 h-5" />} 
            label="Quản lý Bài thi" 
            active={activeTab === "tests"} 
            onClick={() => setActiveTab("tests")} 
          />
          <NavItem 
            icon={<Users className="w-5 h-5" />} 
            label="Người dùng" 
            active={activeTab === "users"} 
            onClick={() => setActiveTab("users")} 
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 bg-[#0f1123]/80 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-2xl font-bold text-white">
            {activeTab === "dashboard" && "Tổng quan hệ thống"}
            {activeTab === "tests" && "Quản lý Bài thi IELTS"}
            {activeTab === "users" && "Quản lý Người dùng"}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 text-white w-64"
              />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">Admin Vũ</p>
                <p className="text-xs text-indigo-400">Super Admin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150" alt="Admin" className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto relative">
          {/* Background FX */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Tổng Người Dùng" value="12,450" trend="+15%" trendUp={true} icon={<Users className="w-6 h-6 text-indigo-400" />} />
                <StatCard title="Lượt Thi Đã Làm" value="48,200" trend="+22%" trendUp={true} icon={<FileText className="w-6 h-6 text-emerald-400" />} />
                <StatCard title="Số Bài Thi IELTS" value="142" trend="+5" trendUp={true} icon={<CheckCircle2 className="w-6 h-6 text-purple-400" />} />
                <StatCard title="Thời Gian Học TB" value="1.5 giờ/ngày" trend="-2%" trendUp={false} icon={<Clock className="w-6 h-6 text-amber-400" />} />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0f1123] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                    Biểu đồ Người tham gia các bài thi
                  </h3>
                  <div className="h-80 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs key="defs">
                          <linearGradient key="grad" id="colorPart" x1="0" y1="0" x2="0" y2="1">
                            <stop key="stop1" offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop key="stop2" offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis key="xaxis" dataKey="month" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis key="yaxis" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip key="tooltip" contentStyle={{ backgroundColor: '#0f1123', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                        <Area key="area" type="monotone" dataKey="participants" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorPart)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#0f1123] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-6">Bài thi mới cập nhật</h3>
                  <div className="space-y-4 flex-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-200 truncate">Cambridge IELTS {19 - i} Test {i}</p>
                          <p className="text-xs text-slate-500 truncate">2 ngày trước</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 text-indigo-300 rounded-xl text-sm font-semibold transition-colors">
                    Xem tất cả
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tests" && !isAddingTest && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f1123] p-4 rounded-2xl border border-white/10 shadow-lg">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài thi..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <button 
                  onClick={() => setIsAddingTest(true)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                  <PlusCircle className="w-5 h-5" /> Thêm Bài Thi Mới
                </button>
              </div>

              <div className="bg-[#0f1123] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/40 text-slate-400 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Tên bài thi</th>
                        <th className="px-6 py-4 font-semibold">Loại</th>
                        <th className="px-6 py-4 font-semibold">Lượt làm</th>
                        <th className="px-6 py-4 font-semibold">Trạng thái</th>
                        <th className="px-6 py-4 font-semibold">Ngày tạo</th>
                        <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-white/5 divide-white/5">
                      {mockTests.map((test) => (
                        <tr key={test.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                <FileText className="w-4 h-4" />
                              </div>
                              <span className="font-semibold text-slate-200">{test.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{test.type}</td>
                          <td className="px-6 py-4 font-medium text-slate-300">{test.participants.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              test.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                              {test.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">{test.date}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-slate-500">
                  <span>Hiển thị 1 - 4 trong 142 bài thi</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5">Trước</button>
                    <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium">1</button>
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5">2</button>
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5">3</button>
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5">Tiếp</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tests" && isAddingTest && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
              <div className="bg-[#0f1123] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-black/20 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <PlusCircle className="w-6 h-6 text-indigo-400" /> Thêm Bài Thi Mới
                  </h3>
                  <button 
                    onClick={() => setIsAddingTest(false)}
                    className="text-slate-400 hover:text-white px-4 py-2 hover:bg-white/5 rounded-xl transition-colors text-sm font-semibold"
                  >
                    Hủy bỏ
                  </button>
                </div>
                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Tên bộ đề (VD: Cambridge 18 Test 1)</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Nhập tên bộ đề..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Phân loại</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                        <option>Academic (Học thuật)</option>
                        <option>General Training (Tổng quát)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-300">Nội dung 4 kỹ năng</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Listening', 'Reading', 'Writing', 'Speaking'].map((skill) => (
                        <div key={skill} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between group hover:border-indigo-500/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                              <FileText className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-200">{skill}</p>
                              <p className="text-xs text-slate-500">Chưa tải lên file nào</p>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                            Upload PDF/Audio
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Mô tả thêm (Tùy chọn)</label>
                    <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Ghi chú về bộ đề..."></textarea>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button onClick={() => setIsAddingTest(false)} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-semibold transition-colors">
                      Lưu Nháp
                    </button>
                    <button onClick={() => setIsAddingTest(false)} className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                      Đăng Bài Thi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f1123] p-4 rounded-2xl border border-white/10 shadow-lg">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm người dùng..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Tổng cộng: <strong className="text-white">{usersList.length}</strong> người dùng</span>
                </div>
              </div>

              <div className="bg-[#0f1123] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/40 text-slate-400 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Học viên</th>
                        <th className="px-6 py-4 font-semibold">Gói cước</th>
                        <th className="px-6 py-4 font-semibold">Ngày tham gia</th>
                        <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-white/5 divide-white/5">
                      {usersList.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                              <div>
                                <p className="font-semibold text-slate-200">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative inline-block w-full">
                              <select
                                value={user.plan}
                                onChange={(e) => handlePlanChange(user.id, e.target.value)}
                                className={`appearance-none bg-transparent w-full pr-8 py-1 rounded-full text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center gap-1 cursor-pointer ${
                                  user.plan === 'Cao cấp'
                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    : user.plan === 'Nâng cao'
                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                } px-3`}
                              >
                                <option value="Cơ bản" className="bg-[#0f1123] text-slate-200">Cơ bản</option>
                                <option value="Nâng cao" className="bg-[#0f1123] text-purple-400">Nâng cao</option>
                                <option value="Cao cấp" className="bg-[#0f1123] text-amber-400">Cao cấp</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                <ChevronRight className="w-3 h-3 rotate-90" />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">{user.joined}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20 tooltip-trigger"
                              title="Xóa tài khoản"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {usersList.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                            Không tìm thấy người dùng nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-slate-500">
                  <span>Hiển thị 1 - {usersList.length} người dùng</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 opacity-50 cursor-not-allowed">Trước</button>
                    <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium">1</button>
                    <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 opacity-50 cursor-not-allowed">Tiếp</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      active 
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, trend, trendUp, icon }: any) => (
  <div className="bg-[#0f1123] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
        {icon}
      </div>
      <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
        trendUp ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      }`}>
        {trendUp ? '↑' : '↓'} {trend}
      </div>
    </div>
    <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
    <h2 className="text-3xl font-bold text-white">{value}</h2>
  </div>
);
