"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Student = {
  id: number;
  name: string;
  role: string;
  location: string;
  attendance: number[];
};

type AppContextType = {
  student: Student | null;
  setStudent: (s: Student | null) => void;
  memos: Record<number, string>;
  setMemo: (scheduleId: number, text: string) => void;
  watchedVideos: number[];
  markVideoWatched: (scheduleId: number) => void;
  sideMenuOpen: boolean;
  setSideMenuOpen: (open: boolean) => void;
  homeworkChecks: Record<string, boolean>;
  toggleHomework: (key: string) => void;
  homeworkNotes: Record<string, string>;
  setHomeworkNote: (key: string, text: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [memos, setMemos] = useState<Record<number, string>>({});
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [homeworkChecks, setHomeworkChecks] = useState<Record<string, boolean>>({});
  const [homeworkNotes, setHomeworkNotes] = useState<Record<string, string>>({});

  const setMemo = (scheduleId: number, text: string) => {
    setMemos((prev) => ({ ...prev, [scheduleId]: text }));
  };

  const markVideoWatched = (scheduleId: number) => {
    setWatchedVideos((prev) =>
      prev.includes(scheduleId) ? prev : [...prev, scheduleId]
    );
  };

  const toggleHomework = (key: string) => {
    setHomeworkChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setHomeworkNote = (key: string, text: string) => {
    setHomeworkNotes((prev) => ({ ...prev, [key]: text }));
  };

  return (
    <AppContext.Provider
      value={{ student, setStudent, memos, setMemo, watchedVideos, markVideoWatched, sideMenuOpen, setSideMenuOpen, homeworkChecks, toggleHomework, homeworkNotes, setHomeworkNote }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
