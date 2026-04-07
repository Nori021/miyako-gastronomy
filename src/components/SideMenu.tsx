"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import schedules from "@/data/schedules.json";

export default function SideMenu() {
  const { student, setStudent, sideMenuOpen, setSideMenuOpen } = useApp();
  const router = useRouter();

  const doneCount = schedules.filter((s) => s.status === "done").length;
  const attended = student?.attendance.length ?? 0;

  useEffect(() => {
    if (sideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sideMenuOpen]);

  if (!sideMenuOpen) return null;

  const menuSections = [
    {
      title: "プロフィールの設定",
      icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
      action: () => { setSideMenuOpen(false); router.push("/mypage"); },
    },
    {
      title: "宿題リスト",
      icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
      action: () => { setSideMenuOpen(false); router.push("/homework"); },
    },
    {
      title: "講義一覧",
      icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
      action: () => { setSideMenuOpen(false); router.push("/schedule"); },
    },
    {
      title: "ゲスト講師",
      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
      action: () => { setSideMenuOpen(false); router.push("/guests"); },
    },
    {
      title: "AIに質問",
      icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
      action: () => { setSideMenuOpen(false); router.push("/ai-chat"); },
    },
  ];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setSideMenuOpen(false)}
      />

      {/* Menu Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-white overflow-y-auto animate-[slideIn_0.3s_ease-out]">
        {/* Close button */}
        <button
          onClick={() => setSideMenuOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ink-light hover:text-ink z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Section */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-terracotta-light flex items-center justify-center">
              <span className="font-serif text-terracotta font-semibold text-lg">
                {student?.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-ink text-base">{student?.name}</p>
              <p className="text-xs text-ink-light">{student?.role}</p>
            </div>
          </div>

          {/* Attendance Points Card */}
          <div className="bg-ocean-light rounded-xl px-4 py-3 mt-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink-light">出席状況</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-xl font-bold text-ocean">{attended}</span>
                <span className="text-xs text-ink-light">/ {doneCount} 回</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-sand/60 mx-5" />

        {/* Menu Items */}
        <div className="py-2">
          {menuSections.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-ivory transition-colors text-left"
            >
              <svg className="w-5 h-5 text-ink-light" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-sm text-ink flex-1">{item.title}</span>
              <svg className="w-4 h-4 text-ink-light/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>

        <div className="h-px bg-sand/60 mx-5" />

        {/* Help Section */}
        <div className="py-2">
          <div className="px-5 py-3.5">
            <p className="text-xs text-ink-light/50">ヘルプ・サポート</p>
          </div>
          <button
            onClick={() => { setSideMenuOpen(false); router.push("/ai-chat"); }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-ivory transition-colors text-left"
          >
            <svg className="w-5 h-5 text-ink-light" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span className="text-sm text-ink">AIに質問</span>
            <svg className="w-4 h-4 text-ink-light/30 ml-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-sand/60 mx-5" />

        {/* Logout */}
        <div className="px-5 py-4">
          <button
            onClick={() => {
              setSideMenuOpen(false);
              setStudent(null);
              router.push("/");
            }}
            className="flex items-center gap-2 text-sm text-ink-light border border-sand rounded-lg px-4 py-2.5 hover:bg-ivory transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            ログアウト
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
