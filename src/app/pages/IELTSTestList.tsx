import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Clock, Users, ArrowLeft, PlayCircle, Settings, Target, X } from "lucide-react";

const MOCK_TESTS = [
  { id: "cam-18-1", title: "Cambridge IELTS 18 - Test 1", participants: 12500, duration: "60 phút", difficulty: "Hard" },
  { id: "cam-18-2", title: "Cambridge IELTS 18 - Test 2", participants: 9800, duration: "60 phút", difficulty: "Medium" },
  { id: "cam-18-3", title: "Cambridge IELTS 18 - Test 3", participants: 8400, duration: "60 phút", difficulty: "Medium" },
  { id: "cam-18-4", title: "Cambridge IELTS 18 - Test 4", participants: 7200, duration: "60 phút", difficulty: "Hard" },
  { id: "recent-actual-1", title: "Recent Actual Test - Vol 6 Test 1", participants: 15600, duration: "60 phút", difficulty: "Hard" },
];

export const IELTSTestList = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<{id: string, title: string} | null>(null);
  const [practiceTime, setPracticeTime] = useState(60);

  const getTitle = () => {
    if (type === 'full') return "Full Mock Tests";
    return `${type?.charAt(0).toUpperCase()}${type?.slice(1)} Practice Tests`;
  };

  const handleStartTest = (mode: 'practice' | 'exam') => {
    if (!selectedTest) return;
    const timeParam = mode === 'practice' && type !== 'full' ? `&time=${practiceTime}` : '';
    navigate(`/ielts/do-test/${type}/${selectedTest.id}?mode=${mode}${timeParam}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button 
        onClick={() => navigate('/ielts')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Quay lại
      </button>

      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{getTitle()}</h1>
        <p className="text-slate-400">Chọn một bộ đề để bắt đầu làm bài. Khi vào thi, hệ thống sẽ tự động chuyển sang chế độ tập trung.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_TESTS.map((test, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={test.id}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/50 transition-colors group cursor-pointer"
            onClick={() => setSelectedTest({ id: test.id, title: test.title })}
          >
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-indigo-400 transition-colors">{test.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {test.duration}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {test.participants.toLocaleString()} người đã làm</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    test.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <button 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 group-hover:bg-indigo-500 text-white rounded-xl font-medium transition-all border border-white/10 group-hover:border-indigo-500 shrink-0"
            >
              <PlayCircle className="w-5 h-5" /> Bắt đầu
            </button>
          </motion.div>
        ))}
      </div>

      {/* Mode Selection Modal */}
      <AnimatePresence>
        {selectedTest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTest(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f1123] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <div>
                  <h3 className="text-xl font-bold text-white">Bắt đầu làm bài</h3>
                  <p className="text-slate-400 text-sm mt-1">{selectedTest.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedTest(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Practice Mode */}
                <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col h-full group">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Thi thử (Practice)</h4>
                  <ul className="text-slate-400 text-sm space-y-2 mb-6 flex-1">
                    <li className="flex items-center gap-2">• Được phép tua phần nghe (Audio)</li>
                    <li className="flex items-center gap-2">• Được xem đáp án ngay sau khi làm</li>
                    <li className="flex items-center gap-2">• Áp lực thời gian thấp</li>
                  </ul>
                  
                  {type !== 'full' ? (
                    <div className="mb-6 space-y-2 mt-auto pt-4">
                      <label className="text-sm font-medium text-slate-300">Tùy chỉnh thời gian (Phút)</label>
                      <select 
                        value={practiceTime}
                        onChange={(e) => setPracticeTime(Number(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
                        disabled={type === 'full'}
                      >
                        <option value={30}>30 phút</option>
                        <option value={45}>45 phút</option>
                        <option value={60}>60 phút (Tiêu chuẩn)</option>
                        <option value={90}>90 phút</option>
                        <option value={120}>120 phút</option>
                        <option value={0}>Không giới hạn thời gian</option>
                      </select>
                    </div>
                  ) : (
                    <div className="mb-6 space-y-2 mt-auto pt-4"></div>
                  )}
                  
                  <button 
                    onClick={() => handleStartTest('practice')}
                    className={`w-full py-3 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white rounded-xl font-medium transition-all ${type === 'full' ? 'mt-auto pt-4' : ''}`}
                  >
                    Vào Thi Thử
                  </button>
                </div>

                {/* Real Exam Mode */}
                <div className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-rose-500/50 transition-all flex flex-col h-full group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full -z-10" />
                  <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Thi Thật (Real Exam)</h4>
                  <ul className="text-slate-400 text-sm space-y-2 mb-6 flex-1">
                    <li className="flex items-center gap-2">• <strong className="text-rose-400">Không</strong> được tua Audio</li>
                    <li className="flex items-center gap-2">• Thời gian chuẩn: 60 phút</li>
                    <li className="flex items-center gap-2">• Tính điểm vào bảng xếp hạng</li>
                    <li className="flex items-center gap-2">• Mô phỏng giao diện máy tính IDP/BC</li>
                  </ul>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => handleStartTest('exam')}
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                    >
                      Bắt Đầu Thi Thật
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
