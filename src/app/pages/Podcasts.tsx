import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Headphones, Play, Pause, FastForward, Rewind, Settings2, SkipBack, SkipForward, PlayCircle, BarChart2, CheckCircle2 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const MOCK_PODCASTS = [
  { id: 1, title: "A1: Introducing Yourself & Hobbies", level: "A1", duration: 180, image: "https://images.unsplash.com/photo-1516280440502-a2267ea107aa?auto=format&fit=crop&w=300&h=300" },
  { id: 2, title: "A1: Ordering Food at a Restaurant", level: "A1", duration: 240, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&h=300" },
  { id: 3, title: "A2: Booking a Hotel Room", level: "A2", duration: 300, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&h=300" },
  { id: 4, title: "A2: Daily Routines & Commute", level: "A2", duration: 280, image: "https://images.unsplash.com/photo-1506869640319-baa1f38bfeb3?auto=format&fit=crop&w=300&h=300" },
  { id: 5, title: "B1: A Job Interview Roleplay", level: "B1", duration: 420, image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=300&h=300" },
  { id: 6, title: "B1: Discussing Future Plans", level: "B1", duration: 390, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&h=300" },
  { id: 7, title: "B2: The Impact of Artificial Intelligence", level: "B2", duration: 600, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&h=300" },
  { id: 8, title: "B2: Climate Change Solutions", level: "B2", duration: 580, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&h=300" },
  { id: 9, title: "C1: Analyzing Global Economic Trends", level: "C1", duration: 900, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&h=300" },
  { id: 10, title: "C1: Philosophy of Modern Art", level: "C1", duration: 850, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&h=300" },
  { id: 11, title: "C2: Nuances of British & American Humor", level: "C2", duration: 1200, image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=300&h=300" },
  { id: 12, title: "C2: Ethical Dilemmas in Bioengineering", level: "C2", duration: 1500, image: "https://images.unsplash.com/photo-1532187863486-abf9db090b8f?auto=format&fit=crop&w=300&h=300" },
];

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const Podcasts = () => {
  const [activeLevel, setActiveLevel] = useState("B1");
  const [activePodcast, setActivePodcast] = useState<typeof MOCK_PODCASTS[0] | null>(null);
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Filtered Podcasts
  const filteredPodcasts = MOCK_PODCASTS.filter(p => p.level === activeLevel);

  // Play Podcast
  const handlePlay = (podcast: typeof MOCK_PODCASTS[0]) => {
    if (activePodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(podcast);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  // Mock Audio Progression
  useEffect(() => {
    if (!isPlaying || !activePodcast) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= activePodcast.duration) {
          setIsPlaying(false);
          return activePodcast.duration;
        }
        return p + 1; // 1 second simulation
      });
    }, 1000 / playbackRate);
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, activePodcast]);

  // Handle Seek Bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleSkip = (seconds: number) => {
    if (!activePodcast) return;
    setProgress(p => {
      const newP = p + seconds;
      if (newP < 0) return 0;
      if (newP > activePodcast.duration) return activePodcast.duration;
      return newP;
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Headphones className="w-8 h-8 text-indigo-400" />
          English Podcasts
        </h1>
        <p className="text-slate-400">Luyện nghe (Listening) qua các bài podcast được phân loại chuẩn theo khung tham chiếu châu Âu (CEFR).</p>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap gap-3">
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-6 py-2.5 rounded-xl font-bold text-lg transition-all flex flex-col items-center justify-center ${
              activeLevel === level
                ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                : 'bg-black/20 border border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            {level}
            <span className="text-[10px] uppercase font-medium opacity-70 mt-0.5 tracking-wider">
              {level === "A1" || level === "A2" ? "Beginner" : level === "B1" || level === "B2" ? "Intermediate" : "Advanced"}
            </span>
          </button>
        ))}
      </div>

      {/* Podcast List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast, idx) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group bg-black/40 backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer transition-all ${
              activePodcast?.id === podcast.id ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-white/10 hover:border-white/30'
            }`}
            onClick={() => handlePlay(podcast)}
          >
            <div className="relative h-48 w-full">
              <img src={podcast.image} alt={podcast.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1123] to-transparent" />
              <button 
                className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  activePodcast?.id === podcast.id && isPlaying 
                    ? 'bg-indigo-500 text-white scale-110' 
                    : 'bg-white/20 text-white backdrop-blur-md group-hover:bg-indigo-500 group-hover:scale-110'
                }`}
              >
                {activePodcast?.id === podcast.id && isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
              </button>
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20 flex items-center gap-1.5">
                <BarChart2 className="w-3 h-3 text-indigo-400" />
                Level {podcast.level}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors">{podcast.title}</h3>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> {formatTime(podcast.duration)} phút
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Player */}
      <AnimatePresence>
        {activePodcast && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-[#0a0c1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[100] flex flex-col gap-3"
          >
            {/* Info & Controls Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 min-w-0">
                <img src={activePodcast.image} alt="Thumbnail" className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{activePodcast.title}</h4>
                  <p className="text-xs text-indigo-400">Level {activePodcast.level}</p>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center w-full md:w-auto gap-3 md:gap-4 shrink-0">
                <button onClick={() => handleSkip(-10)} className="text-slate-400 hover:text-white transition-colors" title="Tua lùi 10s">
                  <Rewind className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
                </button>
                <button onClick={() => handleSkip(10)} className="text-slate-400 hover:text-white transition-colors" title="Tua tới 10s">
                  <FastForward className="w-5 h-5" />
                </button>
                
                {/* Speed Dropdown */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="ml-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors border border-white/5 outline-none">
                    <Settings2 className="w-4 h-4" /> {playbackRate}x
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content 
                      className="min-w-[120px] bg-[#0f1123] border border-white/10 rounded-xl p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[110]"
                      sideOffset={8}
                    >
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                        <DropdownMenu.Item 
                          key={speed}
                          onClick={() => setPlaybackRate(speed)}
                          className={`flex items-center justify-between px-3 py-2 text-sm outline-none cursor-pointer rounded-lg hover:bg-indigo-500/20 ${playbackRate === speed ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
                        >
                          {speed}x
                          {playbackRate === speed && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={activePodcast.duration} 
                value={progress}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                style={{
                  backgroundImage: `linear-gradient(to right, #6366f1 ${(progress / activePodcast.duration) * 100}%, transparent ${(progress / activePodcast.duration) * 100}%)`
                }}
              />
              <span>{formatTime(activePodcast.duration)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
