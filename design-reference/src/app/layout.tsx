import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  Home, 
  BookA, 
  Layers, 
  GraduationCap, 
  Users, 
  Bot, 
  Crown,
  LogOut,
  UserCircle,
  Palette,
  Eye,
  EyeOff,
  Headphones
} from "lucide-react";
import { cn } from "./utils/cn";
import { useAppContext } from "./context";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dictionary", label: "Dictionary", icon: BookA },
  { path: "/flashcards", label: "Flashcards", icon: Layers },
  { path: "/ielts", label: "IELTS", icon: GraduationCap },
  { path: "/podcasts", label: "Podcasts", icon: Headphones },
  { path: "/community", label: "Cộng đồng", icon: Users },
  { path: "/ai-tutor", label: "AI Tutor", icon: Bot },
];

export const MainLayout = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(true);

  return (
    <div className="flex h-screen bg-transparent text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Cosmic Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-blue-900/20 blur-[100px]" />
      </div>

      {/* Sidebar Taskbar */}
      <aside className="hidden md:flex relative z-10 w-64 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-wide">
            E-Learning
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 flex flex-col gap-4">
          <NavLink
            to="/upgrade"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-white/5 text-amber-400 hover:bg-white/10 border border-amber-500/20"
              )
            }
          >
            <Crown className="w-5 h-5" />
            Nâng cấp Pro
          </NavLink>
          
          <div className="flex justify-center gap-6 text-xs text-slate-500 border-t border-white/5 pt-4">
            <NavLink to="/legal/terms" className="hover:text-indigo-400 transition-colors">Điều khoản</NavLink>
            <NavLink to="/legal/privacy" className="hover:text-indigo-400 transition-colors">Bảo mật</NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        {/* Top Header - Transparent and floating on top right */}
        <header className="absolute top-0 right-0 z-50 p-4 md:p-6 flex items-center justify-end w-full pointer-events-none">
          {showUserInfo ? (
            <div className="pointer-events-auto flex items-center gap-2">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex items-center gap-3 outline-none bg-black/40 hover:bg-black/60 p-2 pr-4 rounded-full transition-colors cursor-pointer border border-white/10 backdrop-blur-md shadow-lg">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-indigo-500/50 object-cover shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                  <div className="flex flex-col items-start hidden sm:flex">
                    <span className="text-sm font-bold text-white leading-tight">{user.name}</span>
                    <span className="text-xs font-medium text-indigo-400 leading-tight">{user.level}</span>
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-[#0f1123] border border-white/10 rounded-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50 text-slate-200"
                    sideOffset={8}
                    align="end"
                  >
                    <DropdownMenu.Item 
                      className="flex items-center gap-2 px-3 py-2.5 text-sm outline-none cursor-pointer rounded-lg hover:bg-indigo-500/20 focus:bg-indigo-500/20"
                      onClick={() => navigate('/profile')}
                    >
                      <UserCircle className="w-4 h-4" />
                      Quản lý hồ sơ
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="flex items-center gap-2 px-3 py-2.5 text-sm outline-none cursor-pointer rounded-lg hover:bg-indigo-500/20 focus:bg-indigo-500/20"
                      onClick={() => navigate('/settings')}
                    >
                      <Palette className="w-4 h-4" />
                      Cài đặt giao diện
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-[1px] bg-white/10 my-1" />
                    <DropdownMenu.Item 
                      className="flex items-center gap-2 px-3 py-2.5 text-sm outline-none cursor-pointer rounded-lg text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10"
                      onClick={() => navigate('/login')}
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <button 
                onClick={() => setShowUserInfo(false)}
                className="p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-md shadow-lg"
                title="Ẩn thông tin"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowUserInfo(true)}
              className="pointer-events-auto p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-md shadow-lg"
              title="Hiện thông tin"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-24 custom-scrollbar pb-28 md:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f1123]/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex items-center overflow-x-auto custom-scrollbar pb-safe gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 shrink-0 min-w-[64px]",
                isActive
                  ? "text-indigo-400 scale-110 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  : "text-slate-500 hover:text-slate-300"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
