"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import schedules from "@/data/schedules.json";

function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate + "T00:00:00+09:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return <p className="font-serif text-terracotta text-base font-semibold">本日開催</p>;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="flex items-baseline gap-1">
      <span className="font-serif text-3xl font-bold text-ink">{days}</span>
      <span className="text-xs text-ink-light">日</span>
      <span className="font-serif text-xl font-bold text-ink ml-1">{hours}</span>
      <span className="text-xs text-ink-light">時間</span>
    </div>
  );
}

const announcements = [
  {
    id: 1,
    date: "2026.04.07",
    text: "第8回（最終発表）の会場は宮古島市中央公民館です。発表準備をお願いします。",
  },
  {
    id: 2,
    date: "2026.03.20",
    text: "第7回「地域ブランドの作り方」の議事録をアップしました。",
  },
];

export default function HomePage() {
  const { student } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  const upcoming = schedules.find((s) => s.status === "upcoming");
  const doneCount = schedules.filter((s) => s.status === "done").length;
  const attended = student.attendance.length;
  const pct = doneCount > 0 ? Math.round((attended / doneCount) * 100) : 0;

  return (
    <>
      <Header />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5 space-y-5">
        {/* Profile Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-terracotta-light flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-terracotta font-semibold text-sm">
              {student.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{student.name}</p>
            <p className="text-xs text-ink-light">{student.role} | {student.location}</p>
          </div>
        </div>

        {/* Attendance Points Card */}
        <section className="bg-ocean-light rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-light mb-1">出席状況</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-ocean">{attended}</span>
                <span className="text-sm text-ink-light">/ {doneCount} 回</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-ocean/20 flex items-center justify-center bg-white">
              <span className="font-serif text-sm font-bold text-ocean">{pct}%</span>
            </div>
          </div>
        </section>

        {/* Quick Menu Grid */}
        <section>
          <h2 className="text-xs font-semibold text-ink mb-3 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
            学びのメニュー
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/schedule")}
              className="bg-white border border-sand/60 rounded-xl p-4 text-left hover:border-terracotta/30 active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-terracotta-light flex items-center justify-center mb-2.5">
                <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-ink">講義一覧</p>
              <p className="text-[10px] text-ink-light mt-0.5">スケジュール確認</p>
            </button>

            <button
              onClick={() => router.push("/guests")}
              className="bg-white border border-sand/60 rounded-xl p-4 text-left hover:border-terracotta/30 active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-ocean-light flex items-center justify-center mb-2.5">
                <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-ink">ゲスト紹介</p>
              <p className="text-[10px] text-ink-light mt-0.5">講師プロフィール</p>
            </button>

            <button
              onClick={() => router.push("/homework")}
              className="bg-white border border-sand/60 rounded-xl p-4 text-left hover:border-terracotta/30 active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-sage-light flex items-center justify-center mb-2.5">
                <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-ink">宿題リスト</p>
              <p className="text-[10px] text-ink-light mt-0.5">復習・予習チェック</p>
            </button>

            <button
              onClick={() => router.push("/ai-chat")}
              className="bg-white border border-sand/60 rounded-xl p-4 text-left hover:border-terracotta/30 active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-terracotta-light flex items-center justify-center mb-2.5">
                <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-ink">AI質問</p>
              <p className="text-[10px] text-ink-light mt-0.5">ゲストに質問</p>
            </button>
          </div>
        </section>

        {/* Next Lecture Countdown Banner */}
        {upcoming && (
          <section className="bg-white border border-sand/60 rounded-2xl overflow-hidden">
            <div className="bg-terracotta/5 px-4 py-2 border-b border-sand/40">
              <p className="text-[10px] tracking-[0.15em] text-terracotta font-semibold uppercase">
                Next Lecture
              </p>
            </div>
            <div className="p-4">
              <Countdown targetDate={upcoming.date} />
              <div className="mt-3 pt-3 border-t border-sand/40">
                <p className="font-serif text-sm font-semibold text-ink">
                  第{upcoming.id}回「{upcoming.title}」
                </p>
                <p className="text-xs text-ink-light mt-1">
                  {upcoming.date} — {upcoming.location}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Announcements */}
        <section>
          <h2 className="text-xs font-semibold text-ink mb-3 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
            </svg>
            お知らせ
          </h2>
          <div className="space-y-2">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="bg-white border border-sand/60 rounded-xl px-4 py-3.5"
              >
                <p className="text-[10px] text-ink-light/50 tracking-wider mb-1">{a.date}</p>
                <p className="text-sm text-ink leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
