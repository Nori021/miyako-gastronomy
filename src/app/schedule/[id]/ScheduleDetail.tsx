"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import schedules from "@/data/schedules.json";
import guests from "@/data/guests.json";
import minutes from "@/data/minutes.json";

type Tab = "minutes" | "video" | "memo";

export default function ScheduleDetail({ id }: { id: number }) {
  const { student, memos, setMemo, watchedVideos, markVideoWatched } = useApp();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("minutes");
  const [memoText, setMemoText] = useState("");

  const schedule = schedules.find((s) => s.id === id);
  const guest = schedule?.guestId
    ? guests.find((g) => g.id === schedule.guestId)
    : null;
  const minute = minutes.find((m) => m.scheduleId === id);
  const isDone = schedule?.status === "done";

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  useEffect(() => {
    if (memos[id]) setMemoText(memos[id]);
  }, [id, memos]);

  if (!student || !schedule) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "minutes", label: "議事録" },
    { key: "video", label: "動画" },
    { key: "memo", label: "メモ" },
  ];

  return (
    <>
      <Header title={`No.${String(schedule.id).padStart(2, "0")}`} />
      <main className="flex-1 max-w-lg mx-auto w-full px-5 py-6 space-y-5">
        {/* Info */}
        <section>
          <p className="text-[10px] tracking-[0.2em] text-ink-light uppercase mb-2">
            {isDone ? "Completed" : "Upcoming"}
          </p>
          <h2 className="font-serif text-2xl font-semibold text-ink leading-tight">
            {schedule.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-light">
            <span>{schedule.date}</span>
            <span>{schedule.location}</span>
          </div>
        </section>

        {/* Guest */}
        {guest && (
          <section className="flex items-center gap-4 bg-white border border-sand/60 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-terracotta-light flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-terracotta font-semibold">{guest.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-ink text-sm">{guest.name}</p>
              <p className="text-xs text-ink-light truncate">{guest.title}</p>
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="flex border-b border-sand">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 pb-3 text-sm transition-colors relative ${
                tab === t.key
                  ? "text-ink font-semibold"
                  : "text-ink-light/50"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-terracotta rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <section className="min-h-[200px]">
          {tab === "minutes" &&
            (isDone && minute ? (
              <div className="text-sm text-ink leading-[1.9] tracking-wide">
                {minute.content}
              </div>
            ) : isDone ? (
              <p className="text-sm text-ink-light/50 text-center py-12">
                議事録はまだアップされていません
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-ink-light/30">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
                </svg>
                <p className="text-xs">講義終了後に公開されます</p>
              </div>
            ))}

          {tab === "video" &&
            (isDone ? (
              <div>
                <div
                  className="relative bg-ink rounded-xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer group"
                  onClick={() => markVideoWatched(id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 border-2 border-white/60 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-xs mt-3 tracking-wider">
                      第{schedule.id}回 {schedule.title}
                    </p>
                  </div>
                  {watchedVideos.includes(id) && (
                    <span className="absolute top-3 right-3 bg-sage text-white text-[10px] px-2 py-0.5 rounded-full tracking-wider">
                      視聴済
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-ink-light/30">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
                </svg>
                <p className="text-xs">講義終了後に公開されます</p>
              </div>
            ))}

          {tab === "memo" && (
            <div>
              <textarea
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                placeholder="この講義の振り返りメモを入力..."
                className="w-full h-36 bg-white border border-sand rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-terracotta/40 transition-colors placeholder:text-ink-light/30"
              />
              <button
                onClick={() => setMemo(id, memoText)}
                className="mt-3 bg-ink text-white text-sm px-6 py-2.5 rounded-lg hover:bg-ink/80 transition-colors"
              >
                保存する
              </button>
              {memos[id] && (
                <p className="text-xs text-sage mt-2">保存済み</p>
              )}
            </div>
          )}
        </section>

        <button
          onClick={() => router.back()}
          className="text-xs text-ink-light flex items-center gap-1 hover:text-ink transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          戻る
        </button>
      </main>
      <BottomNav />
    </>
  );
}
