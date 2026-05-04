import React, { useState } from "react";
import { Search, Volume2, Plus, Bookmark, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context";
import { cn } from "../utils/cn";

const MOCK_DICTIONARY: Record<string, any> = {
  "universe": {
    en: "Universe",
    vn: "Vũ trụ",
    phonetic: "/ˈjuːnɪvɜːs/",
    type: "noun",
    enDef: "All existing matter and space considered as a whole; the cosmos.",
    vnDef: "Toàn bộ vật chất và không gian tồn tại; vũ trụ.",
    example: "The universe is continually expanding.",
    topic: "Science"
  },
  "mystic": {
    en: "Mystic",
    vn: "Huyền bí",
    phonetic: "/ˈmɪstɪk/",
    type: "adjective",
    enDef: "Inspiring a sense of spiritual mystery, awe, and fascination.",
    vnDef: "Tạo cảm giác về sự huyền bí tâm linh, sự kính sợ và mê hoặc.",
    example: "The mystic beauty of the night sky.",
    topic: "General"
  }
};

export const Dictionary = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [added, setAdded] = useState(false);
  
  const { addFlashcard, flashcards } = useAppContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const key = query.toLowerCase().trim();
    if (MOCK_DICTIONARY[key]) {
      setResult(MOCK_DICTIONARY[key]);
      setAdded(flashcards.some(f => f.en.toLowerCase() === key));
    } else {
      setResult(null);
    }
    setSearched(true);
  };

  const handleAddFlashcard = () => {
    if (!result || added) return;
    addFlashcard({
      en: result.en,
      vn: result.vn,
      example: result.example,
      topic: result.topic
    });
    setAdded(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Từ Điển Vũ Trụ
        </h1>
        <p className="text-slate-400">Tra cứu nhanh chóng. Từ Anh-Việt & Anh-Anh kèm ví dụ.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập từ cần tra cứu (thử: 'universe', 'mystic')..."
          className="w-full bg-[#0f1123] border-2 border-white/10 rounded-2xl py-5 pl-14 pr-6 text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all"
        />
        <button 
          type="submit"
          className="absolute inset-y-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 rounded-xl font-medium transition-colors"
        >
          Tra từ
        </button>
      </form>

      <AnimatePresence mode="wait">
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0f1123] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {result ? (
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-100 mb-2 flex items-end gap-4">
                      {result.en}
                      <span className="text-xl font-normal text-indigo-300">{result.phonetic}</span>
                    </h2>
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 italic">
                      {result.type}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 transition-colors">
                      <Volume2 className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleAddFlashcard}
                      disabled={added}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
                        added 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed" 
                          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                      )}
                    >
                      {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {added ? "Đã thêm" : "Thêm vào Flashcard"}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                      <Bookmark className="w-5 h-5" />
                      Nghĩa Anh - Anh (EN-EN)
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">{result.enDef}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                      <Bookmark className="w-5 h-5" />
                      Nghĩa Anh - Việt (EN-VN)
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">{result.vnDef}</p>
                    <p className="text-2xl font-bold text-slate-100 mt-2">{result.vn}</p>
                  </div>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2">Ví dụ (Example)</h4>
                  <p className="text-xl text-slate-200 italic font-serif">"{result.example}"</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-xl">Không tìm thấy từ này trong cơ sở dữ liệu.</p>
                <p className="text-sm mt-2">Vui lòng kiểm tra lại chính tả hoặc thử một từ khác.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
