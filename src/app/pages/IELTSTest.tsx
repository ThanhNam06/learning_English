import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, Play, Pause, Volume2, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const IELTSTest = () => {
  const { type, testId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'exam';
  const customTime = searchParams.get('time');

  const getSkillTime = (skill: string) => {
    switch(skill) {
      case 'listening': return 1800; // 30m
      case 'reading': return 3600; // 60m
      case 'writing': return 3600; // 60m
      case 'speaking': return 900; // 15m
      default: return 3600;
    }
  };

  const [currentSkill, setCurrentSkill] = useState<'listening' | 'reading' | 'writing' | 'speaking'>(
    type === 'full' ? 'listening' : (type as any)
  );
  const [isOnBreak, setIsOnBreak] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(getSkillTime(type === 'full' ? 'listening' : (type as any)));
  const [submitted, setSubmitted] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evalTab, setEvalTab] = useState<'listening' | 'reading' | 'writing' | 'speaking'>(
    type === 'full' ? 'listening' : (type as any)
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const stateRef = React.useRef({ type, currentSkill, isOnBreak });
  useEffect(() => {
    stateRef.current = { type, currentSkill, isOnBreak };
  }, [type, currentSkill, isOnBreak]);

  const handleFinishTest = () => {
    if (type === 'full' && currentSkill !== 'speaking') {
      setIsOnBreak(true);
      setTimeLeft(600); // 10 min break
    } else {
      setSubmitted(true);
      setShowEvaluation(true);
      setIsEvaluating(true);
      setTimeout(() => setIsEvaluating(false), 2000);
    }
  };

  const handleFinishBreak = () => {
    const nextSkillMapping: Record<string, 'listening' | 'reading' | 'writing' | 'speaking'> = {
      'listening': 'reading',
      'reading': 'writing',
      'writing': 'speaking',
    };
    const next = nextSkillMapping[currentSkill];
    setCurrentSkill(next);
    setIsOnBreak(false);
    setTimeLeft(getSkillTime(next));
  };

  useEffect(() => {
    if (customTime && customTime !== '0') {
      setTimeLeft(Number(customTime) * 60);
    } else if (customTime === '0') {
      setTimeLeft(999999); // "Unlimited"
    } else if (type !== 'full') {
      setTimeLeft(getSkillTime(currentSkill));
    }
  }, [customTime, currentSkill, type]);

  useEffect(() => {
    if (submitted || timeLeft === 999999) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const { type, currentSkill, isOnBreak } = stateRef.current;
          if (isOnBreak) {
            const nextSkillMapping: Record<string, string> = {
              'listening': 'reading',
              'reading': 'writing',
              'writing': 'speaking',
            };
            const next = nextSkillMapping[currentSkill];
            setCurrentSkill(next as any);
            setIsOnBreak(false);
            return getSkillTime(next);
          } else {
            if (type === 'full' && currentSkill !== 'speaking') {
              setIsOnBreak(true);
              return 600;
            } else {
              setSubmitted(true);
              setShowEvaluation(true);
              setIsEvaluating(true);
              setTimeout(() => setIsEvaluating(false), 2000);
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft === 999999]);

  // Mock audio progress for practice mode
  useEffect(() => {
    if (currentSkill === 'listening' && mode === 'exam') {
      setAudioPlaying(true);
    }
  }, [currentSkill, mode]);

  useEffect(() => {
    if (!audioPlaying) return;
    const interval = setInterval(() => {
      setAudioProgress(p => (p >= 100 ? 0 : p + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [audioPlaying]);

  const formatTime = (seconds: number) => {
    if (seconds === 999999) return "Không giới hạn";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isReading = currentSkill === 'reading';
  const isListening = currentSkill === 'listening';
  const isWriting = currentSkill === 'writing';
  const isSpeaking = currentSkill === 'speaking';

  if (isOnBreak) {
    return (
      <div className="h-[100dvh] w-full bg-[#060813] flex flex-col items-center justify-center space-y-6 text-slate-200 p-6 text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mb-2 md:mb-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
          <Clock className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Nghỉ giải lao</h2>
        <p className="text-slate-400 text-base md:text-lg max-w-md">Bạn đã hoàn thành xong kỹ năng. Hãy thư giãn một chút trước khi bước vào phần tiếp theo!</p>
        <div className="text-5xl md:text-6xl font-mono text-indigo-400 font-bold my-6 md:my-8">
          {formatTime(timeLeft)}
        </div>
        <button 
          onClick={handleFinishBreak}
          className="px-6 py-3 md:px-8 md:py-3 mt-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10 text-sm md:text-base"
        >
          Bỏ qua nghỉ giải lao & Tiếp tục ngay
        </button>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#060813] text-slate-200 overflow-hidden font-sans">
      {/* Test Header */}
      <div className="h-16 border-b border-white/10 bg-[#0a0c1a] flex items-center justify-between px-4 md:px-8 shrink-0 shadow-lg relative z-20">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setShowExitConfirm(true)} 
            className="flex items-center gap-1 md:gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline text-sm md:text-base">Thoát</span>
          </button>
          <div className="h-4 md:h-6 w-px bg-white/10" />
          <h2 className="font-bold text-sm md:text-lg text-white capitalize truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
            {type === 'full' ? `Full Test - ${currentSkill}` : `${type} Test`}
            <span className="text-slate-500 text-xs md:text-sm font-normal ml-1 md:ml-2 lowercase hidden sm:inline">({testId})</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          {type !== 'full' && (
            <div className={`flex items-center gap-1.5 md:gap-2 font-mono text-base md:text-xl ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-indigo-400'}`}>
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              {formatTime(timeLeft)}
            </div>
          )}
          <button 
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 md:px-6 md:py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm md:text-base font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)] whitespace-nowrap"
          >
            Nộp bài
          </button>
        </div>
      </div>

      {/* Test Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative z-10 custom-scrollbar">
        {/* Left/Top pane: Reading Passage / Context or Listening Audio */}
        <div className={`${isReading || isWriting || isSpeaking ? 'w-full md:w-1/2' : 'hidden'} border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-10 lg:p-12 md:overflow-y-auto custom-scrollbar bg-[#0a0c1a] h-auto md:h-full`}>
          
          {isReading && (
            <>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Passage 1: The Cosmic Expansion</h3>
              <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-base md:text-lg space-y-4 md:space-y-6">
                <p>
                  The universe is expanding. This simple fact, discovered by Edwin Hubble in the 1920s, revolutionized our understanding of the cosmos. For millennia, astronomers believed the universe was static and unchanging. But Hubble's observations of distant galaxies revealed a startling truth: they are all moving away from us, and from each other.
                </p>
                <p>
                  This expansion is not just the motion of galaxies through space; it is the expansion of space itself. Imagine a balloon with dots drawn on it. As the balloon is inflated, the dots move farther apart. The dots aren't moving across the surface of the balloon; the surface itself is stretching. This is a 2D analogy for our 3D universe.
                </p>
                <p>
                  In 1998, two independent teams of astronomers made an even more shocking discovery. By observing distant supernovae, they found that the expansion of the universe is not slowing down, as one might expect due to gravity, but is actually accelerating. The mysterious force driving this acceleration has been dubbed "dark energy."
                </p>
                <p>
                  Dark energy is currently estimated to make up about 68% of the total energy density of the universe. Dark matter, another mysterious substance that interacts gravitationally but does not emit or absorb light, makes up about 27%. Ordinary matter—the stuff that makes up stars, planets, and us—accounts for less than 5%.
                </p>
              </div>
            </>
          )}

          {isWriting && (
            <>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Task 1</h3>
              <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-base md:text-lg space-y-4 md:space-y-6">
                <p>
                  You should spend about 20 minutes on this task.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl mt-4">
                  <p className="font-bold text-indigo-300">
                    The chart below shows the global sales of different types of digital games from 2000 to 2006.
                  </p>
                  <p className="mt-2 text-slate-400 text-sm md:text-base">
                    Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                  </p>
                </div>
                <div className="h-48 md:h-64 w-full bg-white/5 border border-white/10 rounded-xl mt-4 md:mt-6 flex items-center justify-center text-slate-500 text-sm md:text-base">
                  [Bar Chart Placeholder]
                </div>
                <p>
                  Write at least 150 words.
                </p>
              </div>
            </>
          )}

          {isSpeaking && (
            <>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Speaking Part 1</h3>
              <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-base md:text-lg space-y-4 md:space-y-6">
                <div className="p-5 md:p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mt-4">
                  <p className="font-bold text-white text-base md:text-lg">
                    The examiner will ask you some questions about yourself, your home, work or studies and familiar topics.
                  </p>
                  <ul className="mt-3 md:mt-4 list-disc pl-4 md:pl-5 space-y-1.5 md:space-y-2 text-indigo-200 text-sm md:text-base">
                    <li>Where are you from?</li>
                    <li>Do you work or study?</li>
                    <li>What do you like most about your hometown?</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right/Bottom pane: Questions */}
        <div className={`${isReading || isWriting || isSpeaking ? 'w-full md:w-1/2' : 'w-full max-w-4xl mx-auto'} p-5 md:p-10 lg:p-12 md:overflow-y-auto custom-scrollbar bg-[#060813] h-auto md:h-full`}>
          
          {isListening && (
            <div className={`mb-8 md:mb-10 ${mode === 'exam' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-indigo-500/10 border-indigo-500/20'} border rounded-2xl p-4 md:p-6`}>
              <h3 className={`text-lg md:text-xl font-bold ${mode === 'exam' ? 'text-rose-400' : 'text-white'} mb-3 md:mb-4 flex items-center gap-2`}>
                {mode === 'exam' ? <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-rose-400" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />}
                {mode === 'exam' ? 'Thi thật: Đang phát âm thanh' : 'Listening Audio (Luyện tập)'}
              </h3>
              
              {mode !== 'exam' ? (
                <div className="flex items-center gap-3 md:gap-4">
                  <button 
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg transition-colors shrink-0"
                  >
                    {audioPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 ml-1 fill-current" />}
                  </button>
                  
                  <div className="flex-1">
                    <div 
                      className="h-3 md:h-4 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        setAudioProgress(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                      }}
                    >
                      <div 
                        className="h-full bg-indigo-400 transition-none group-hover:bg-indigo-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 md:mt-2 text-[10px] md:text-xs text-slate-400 font-mono">
                      <span>{formatTime(Math.floor(audioProgress * 0.6))}</span>
                      <span>30:00</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-rose-400/80 text-xs md:text-sm flex items-start gap-2">
                  Bạn đang ở chế độ Thi Thật. Âm thanh tự động phát, không hiển thị thanh tiến trình và không được phép tua.
                </div>
              )}
            </div>
          )}

          {(isReading || isListening) && (
            <>
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-xl p-3 md:p-4 mb-6 md:mb-8 flex gap-2 md:gap-3">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm leading-relaxed">Questions 1-4: Do the following statements agree with the information given in the passage?</p>
              </div>

              <div className="space-y-8 md:space-y-10">
                <QuestionItem 
                  num={1} 
                  q="Edwin Hubble discovered that the universe is static." 
                  type="TF" 
                />
                <QuestionItem 
                  num={2} 
                  q="The balloon analogy illustrates how galaxies move through existing space." 
                  type="TF" 
                />
                <QuestionItem 
                  num={3} 
                  q="Dark energy was discovered by observing distant supernovae." 
                  type="TF" 
                />
                <QuestionItem 
                  num={4} 
                  q="Ordinary matter constitutes the majority of the universe's energy density." 
                  type="TF" 
                />
              </div>
            </>
          )}

          {isWriting && (
            <div className="h-full flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h4 className="text-base md:text-lg font-bold text-white">Your Answer</h4>
                <span className="text-xs md:text-sm text-slate-400 font-mono">Word count: 0</span>
              </div>
              <textarea 
                className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-sm md:text-base text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Start writing here..."
              ></textarea>
            </div>
          )}

          {isSpeaking && (
            <div className="h-full flex flex-col items-center justify-center space-y-6 md:space-y-8 min-h-[300px]">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-indigo-500/20 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] animate-pulse relative">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-20"></div>
                <Volume2 className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" />
              </div>
              <div className="text-center space-y-1.5 md:space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-white">Listening to examiner...</h4>
                <p className="text-sm md:text-base text-slate-400">Please wait for the beep before you speak.</p>
              </div>
            </div>
          )}

          <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
            <button className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-xl hover:bg-white/10 w-full sm:w-auto text-sm md:text-base">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> Section trước
            </button>
            <button className="flex items-center justify-center sm:justify-end gap-2 px-8 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 rounded-xl transition-colors w-full sm:w-auto text-sm md:text-base">
              Section tiếp theo <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Evaluation Panel */}
      <AnimatePresence>
        {showEvaluation && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-0 z-40 bg-[#060813] overflow-y-auto custom-scrollbar flex flex-col"
          >
            {isEvaluating ? (
              <div className="h-[100dvh] flex flex-col items-center justify-center text-slate-400 gap-4 p-4 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-sm md:text-base font-medium animate-pulse">Hệ thống đang chấm điểm. Kết quả sẽ có trong ít phút...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-[100dvh]">
                <div className="sticky top-0 bg-[#060813]/90 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-center z-10 shrink-0">
                  <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" /> Kết quả Đánh giá
                  </h3>
                </div>
                
                <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
                  <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-2">Hoàn thành bài thi!</h4>
                      <p className="text-sm md:text-base text-slate-400">Dưới đây là điểm số và phân tích chi tiết bài làm của bạn.</p>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-slate-400 mb-1">Số câu đúng</p>
                        <p className="text-xl md:text-2xl font-bold text-white">32<span className="text-sm md:text-lg text-slate-500">/40</span></p>
                      </div>
                      <div className="w-px h-10 md:h-12 bg-white/10" />
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-slate-400 mb-1">Điểm IELTS</p>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0a0c1a] border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] mx-auto">
                          <span className="text-xl md:text-2xl font-black text-emerald-400">7.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Analysis */}
                  <div className="space-y-5 md:space-y-6">
                    {type === 'full' && (
                      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                        {(['listening', 'reading', 'writing', 'speaking'] as const).map(skill => (
                          <button
                            key={skill}
                            onClick={() => setEvalTab(skill)}
                            className={`px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all capitalize ${evalTab === skill ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'}`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    )}

                    <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 capitalize">
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" /> Chi tiết Sửa lỗi & Giải thích - {evalTab}
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {(evalTab === 'reading' || evalTab === 'listening') && (
                        <>
                          <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-colors">
                            <div className="flex items-start gap-3 md:gap-4">
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 md:mt-1 text-xs md:text-base">✕</div>
                              <div className="flex-1 space-y-2 md:space-y-3">
                                <div className="flex items-center gap-2 md:gap-3">
                                  <span className="text-xs md:text-sm font-bold text-slate-500">Câu 2</span>
                                  <p className="text-sm md:text-base text-slate-300">The balloon analogy illustrates how galaxies move through existing space.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                  <div className="bg-black/30 p-3 md:p-4 rounded-xl border border-white/5">
                                    <p className="text-xs md:text-sm text-slate-400 mb-1">Đáp án của bạn:</p>
                                    <p className="text-sm md:text-base font-bold text-rose-400">TRUE</p>
                                  </div>
                                  <div className="bg-emerald-500/10 p-3 md:p-4 rounded-xl border border-emerald-500/20">
                                    <p className="text-xs md:text-sm text-emerald-600/70 mb-1">Đáp án đúng:</p>
                                    <p className="text-sm md:text-base font-bold text-emerald-400">FALSE</p>
                                  </div>
                                </div>
                                
                                <div className="bg-indigo-500/10 p-3 md:p-4 rounded-xl border border-indigo-500/20 mt-3 md:mt-4">
                                  <p className="text-xs md:text-sm text-slate-300">
                                    <strong className="text-indigo-300">Giải thích:</strong> Đoạn văn chỉ rõ "The dots aren't moving across the surface of the balloon; the surface itself is stretching." (Các chấm không di chuyển trên bề mặt quả bóng; chính bản thân bề mặt đang giãn ra).
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {evalTab === 'writing' && (
                        <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-colors">
                          <h5 className="font-bold text-base md:text-lg text-emerald-400 border-b border-white/10 pb-2">Writing Task 1 Feedback</h5>
                          <div className="space-y-3 md:space-y-4">
                            <div className="bg-amber-500/10 p-3 md:p-4 rounded-xl border border-amber-500/20">
                              <p className="text-xs md:text-sm text-amber-600/70 mb-1">Grammar & Accuracy</p>
                              <p className="text-sm md:text-base text-amber-200">
                                Câu của bạn: <span className="line-through opacity-70">The chart showing that</span> the global sales decreased.<br/>
                                <span className="text-emerald-400 font-medium">Sửa lại:</span> The chart <span className="font-bold text-emerald-400 underline">shows</span> that the global sales decreased.
                              </p>
                            </div>
                            <div className="bg-indigo-500/10 p-3 md:p-4 rounded-xl border border-indigo-500/20 mt-3 md:mt-4">
                              <p className="text-xs md:text-sm text-slate-300">
                                <strong className="text-indigo-300">Nhận xét:</strong> Bạn cần chú ý chia động từ chính trong câu thay vì dùng V-ing đóng vai trò phân từ. Ngoài ra, cách chia đoạn văn hợp lý nhưng phần kết luận còn thiếu ý so sánh chính.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {evalTab === 'speaking' && (
                        <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/[0.07] transition-colors">
                          <h5 className="font-bold text-base md:text-lg text-indigo-400 border-b border-white/10 pb-2">Speaking Part 1 Feedback</h5>
                          <div className="space-y-3 md:space-y-4">
                            <div className="bg-rose-500/10 p-3 md:p-4 rounded-xl border border-rose-500/20">
                              <p className="text-xs md:text-sm text-rose-600/70 mb-1">Pronunciation / Phát âm</p>
                              <p className="text-sm md:text-base text-rose-200">
                                Lỗi phát âm từ: <strong>"Environment"</strong> (bạn đọc là en-vi-ron-ment thay vì in-vai-ron-ment). Chú ý nhấn trọng âm rơi vào âm tiết thứ 2.
                              </p>
                            </div>
                            <div className="bg-emerald-500/10 p-3 md:p-4 rounded-xl border border-emerald-500/20 mt-3 md:mt-4">
                              <p className="text-xs md:text-sm text-emerald-600/70 mb-1">Fluency / Độ trôi chảy</p>
                              <p className="text-sm md:text-base text-emerald-100">
                                Tốc độ nói tốt, không có nhiều khoảng ngập ngừng (uhm, ah). Có sử dụng được các từ nối cơ bản như "well, to be honest, basically".
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={() => navigate('/')}
                      className="w-full py-3 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    >
                      Quay về trang chủ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1123] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <div className="p-5 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 md:mb-4">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Xác nhận nộp bài</h3>
                <p className="text-sm md:text-base text-slate-400">
                  Bạn có chắc chắn muốn nộp bài ngay bây giờ? 
                  {timeLeft > 0 && " Bạn vẫn còn thời gian để xem lại các câu trả lời."}
                </p>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex gap-3 justify-end">
                <button 
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    handleFinishTest();
                  }}
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
                >
                  Nộp bài ngay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1123] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <div className="p-5 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 md:mb-4">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Thoát bài thi</h3>
                <p className="text-sm md:text-base text-slate-400">
                  Bạn có chắc chắn muốn thoát? Kết quả làm bài sẽ không được lưu lại và quá trình của bạn sẽ bị mất.
                </p>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex gap-3 justify-end">
                <button 
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Tiếp tục làm bài
                </button>
                <button 
                  onClick={() => {
                    setShowExitConfirm(false);
                    navigate('/');
                  }}
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-medium bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
                >
                  Đồng ý thoát
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuestionItem = ({ num, q, type }: { num: number, q: string, type: string }) => {
  const [ans, setAns] = useState<string | null>(null);

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex gap-3 md:gap-4">
        <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.2)] text-sm md:text-base">
          {num}
        </span>
        <p className="text-sm md:text-base lg:text-lg text-slate-200 pt-0.5 md:pt-1 leading-relaxed">{q}</p>
      </div>
      
      {type === 'TF' && (
        <div className="ml-10 md:ml-12 flex flex-wrap gap-2 md:gap-4">
          {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
            <button
              key={opt}
              onClick={() => setAns(opt)}
              className={`px-4 py-2 md:px-6 md:py-2.5 rounded-xl border text-xs md:text-sm lg:text-base font-medium transition-all ${
                ans === opt 
                  ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105' 
                  : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
