import { MainLayout } from './components/layout/MainLayout'
import { motion } from 'motion/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Flame, Target, Calendar, Trophy, Star } from 'lucide-react'

const data = [
  { name: 'T2', hours: 1.5, score: 65 },
  { name: 'T3', hours: 2.0, score: 70 },
  { name: 'T4', hours: 1.0, score: 68 },
  { name: 'T5', hours: 2.5, score: 75 },
  { name: 'T6', hours: 3.0, score: 82 },
  { name: 'T7', hours: 4.0, score: 88 },
  { name: 'CN', hours: 2.5, score: 85 },
]

export default function Home() {
  const user = {
    name: 'Nguyễn Văn A',
    streak: 15,
    level: 'B2 Upper Intermediate',
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Chào mừng trở lại, {user.name}!
            </h2>
            <p className="text-slate-400 mt-2">Tiếp tục hành trình chinh phục tiếng Anh của bạn nào.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Flame className="w-6 h-6 text-orange-500" />}
            title="Chuỗi ngày học"
            value={`${user.streak} ngày`}
            subtitle="Đang giữ phong độ tốt!"
            bg="bg-orange-500/10"
            border="border-orange-500/20"
          />
          <StatCard
            icon={<Trophy className="w-6 h-6 text-indigo-400" />}
            title="Cấp độ hiện tại"
            value={user.level}
            subtitle="Top 15% học viên"
            bg="bg-indigo-500/10"
            border="border-indigo-500/20"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-emerald-400" />}
            title="Mục tiêu"
            value="IELTS 7.5"
            subtitle="Đạt được: 65%"
            bg="bg-emerald-500/10"
            border="border-emerald-500/20"
          />
          <StatCard
            icon={<Calendar className="w-6 h-6 text-purple-400" />}
            title="Lịch học tuần này"
            value="12h / 15h"
            subtitle="Còn 3 giờ nữa"
            bg="bg-purple-500/10"
            border="border-purple-500/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-0">
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl min-w-0">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-400" />
              Tiến trình học tập
            </h3>
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs key="defs">
                    <linearGradient key="lg" id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop key="stop1" offset="5%" stopColor="#818cf8" stopOpacity={0.6}/>
                      <stop key="stop2" offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis key="xaxis" dataKey="name" stroke="#cbd5e1" tick={{fill: '#cbd5e1'}} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis" stroke="#cbd5e1" tick={{fill: '#cbd5e1'}} axisLine={false} tickLine={false} />
                  <Tooltip key="tooltip"
                    contentStyle={{ backgroundColor: 'rgba(15, 17, 35, 0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#c7d2fe' }}
                  />
                  <Area key="area" type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6">Nhiệm vụ hôm nay</h3>
            <div className="space-y-4">
              <TaskItem title="Hoàn thành 2 bài Reading" status="done" />
              <TaskItem title="Ôn tập 50 từ vựng Flashcard" status="pending" />
              <TaskItem title="Tham gia thi thử Listening" status="pending" />
              <TaskItem title="Luyện nói với AI Tutor" status="pending" />
            </div>
            <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 font-medium transition-colors border border-white/5">
              Xem tất cả
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

const StatCard = ({ icon, title, value, subtitle, bg, border }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-6 rounded-2xl border bg-black/40 backdrop-blur-md shadow-lg ${border}`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
      {icon}
    </div>
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <h4 className="text-2xl font-bold text-slate-100 mt-1">{value}</h4>
    <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
  </motion.div>
)

const TaskItem = ({ title, status }: { title: string, status: 'done' | 'pending' }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
      status === 'done' ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-500'
    }`}>
      {status === 'done' && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={`text-sm ${status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
      {title}
    </span>
  </div>
)
