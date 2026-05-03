import React, { createContext, useContext, useState } from "react";

export type Word = {
  id: string;
  en: string;
  vn: string;
  example: string;
  topic?: string;
};

export type UserProfile = {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  level: string;
  streak: number;
  plan?: string;
  joined?: string;
};

export type SiteSettings = {
  title: string;
  themeMode: string;
  primaryColor: string;
  backgroundTheme: string;
  fontFamily: string;
  borderRadius: string;
};

interface AppContextType {
  flashcards: Word[];
  addFlashcard: (word: Omit<Word, "id">) => void;
  removeFlashcard: (id: string) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  usersList: UserProfile[];
  setUsersList: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const defaultUser: UserProfile = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256",
  level: "B2 Upper Intermediate",
  streak: 15,
  plan: "Cơ bản",
  joined: "12/03/2026"
};

const defaultUsersList: UserProfile[] = [
  defaultUser,
  { id: 2, name: "Trần Thị B", email: "tranthib@gmail.com", level: "C1 Advanced", streak: 5, plan: "Cao cấp", joined: "15/03/2026", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" },
  { id: 3, name: "Lê Minh C", email: "leminhc_study@yahoo.com", level: "B1 Intermediate", streak: 20, plan: "Cơ bản", joined: "20/04/2026", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" },
  { id: 4, name: "Phạm Hoàng D", email: "phamd1999@gmail.com", level: "C1 Advanced", streak: 30, plan: "Nâng cao", joined: "22/04/2026", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100" },
  { id: 5, name: "Đỗ Mai E", email: "domai_english@gmail.com", level: "A2 Pre-Intermediate", streak: 2, plan: "Cơ bản", joined: "25/04/2026", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100" },
];

const defaultFlashcards: Word[] = [
  { id: "1", en: "Cosmos", vn: "Vũ trụ", example: "He sat staring up at the cosmos.", topic: "Space" },
  { id: "2", en: "Fascinate", vn: "Mê hoặc, quyến rũ", example: "Space exploration has always fascinated me.", topic: "General" }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashcards, setFlashcards] = useState<Word[]>(defaultFlashcards);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [usersList, setUsersList] = useState<UserProfile[]>(defaultUsersList);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    title: "E-Learning",
    themeMode: "dark",
    primaryColor: "#6366f1", // indigo-500
    backgroundTheme: "default",
    fontFamily: "Inter, sans-serif",
    borderRadius: "1rem"
  });

  const addFlashcard = (word: Omit<Word, "id">) => {
    const newWord = { ...word, id: Math.random().toString(36).substring(2, 9) };
    setFlashcards((prev) => [...prev, newWord]);
  };

  const removeFlashcard = (id: string) => {
    setFlashcards((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <AppContext.Provider value={{ flashcards, addFlashcard, removeFlashcard, user, setUser, usersList, setUsersList, siteSettings, setSiteSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
