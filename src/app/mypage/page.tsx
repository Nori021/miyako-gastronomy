"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AttendanceChart from "@/components/AttendanceChart";
import schedules from "@/data/schedules.json";

function Section({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-sand/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-ivory/50 transition-colors"
      >
        <svg className="w-5 h-5 text-ink-light" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        <span className="text-sm text-ink flex-1 text-left">{title}</span>
        <svg
          className={`w-4 h-4 text-ink-light/40 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

export default function MyPage() {
  const { student, setStudent, memos, watchedVideos } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  const doneSchedules = schedules.filter((s) => s.status === "done");
  const doneCount = doneSchedules.length;
  const attended = student.attendance.length;
  const memoEntries = Object.entries(memos).filter(([, v]) => v.trim());

  return (
    <>
      <Header title="マイページ" />
      <main className="flex-1 max-w-lg mx-auto w-full py-5">
        {/* Profile Card */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-14 h-14 rounded-full bg-terracotta-light flex items-center justify-center">
              <span className="font-serif text-terracotta font-semibold text-xl">
                {student.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-ink text-lg">{student.name}</p>
              <p className="text-xs text-ink-light mt-0.5">
                {student.role}
                <span className="text-sand mx-1.5">|</span>
                {student.location}
              </p>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-ocean-light rounded-xl p-4">
            <AttendanceChart attended={attended} total={doneCount} />
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="bg-white border-t border-b border-sand/60">
          <Section
            title="出席履歴"
            icon="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            defaultOpen
          >
            <div className="bg-ivory rounded-xl overflow-hidden">
              {doneSchedules.map((s, idx) => {
                const wasPresent = student.attendance.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between px-4 py-3 ${
                      idx < doneSchedules.length - 1 ? "border-b border-sand/40" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm text-ink">
                        No.{String(s.id).padStart(2, "0")}「{s.title}」
                      </p>
                      <p className="text-[10px] text-ink-light mt-0.5">{s.date}</p>
                    </div>
                    <span
                      className={`text-[10px] tracking-wider px-2.5 py-1 rounded-full font-medium ${
                        wasPresent
                          ? "bg-sage-light text-sage"
                          : "bg-terracotta-light text-terracotta"
                      }`}
                    >
                      {wasPresent ? "出席" : "欠席"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section
            title="視聴済み動画"
            icon="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.508c0-.51.55-.826.997-.577L15.6 11.42c.44.245.44.88 0 1.125l-4.853 2.489a.66.66 0 01-.997-.577V9.508z"
          >
            {watchedVideos.length === 0 ? (
              <p className="text-sm text-ink-light/40 py-2">
                まだ動画を視聴していません
              </p>
            ) : (
              <div className="bg-ivory rounded-xl overflow-hidden">
                {watchedVideos.map((vid, idx) => {
                  const s = schedules.find((sc) => sc.id === vid);
                  if (!s) return null;
                  return (
                    <div
                      key={vid}
                      className={`flex items-center gap-2 px-4 py-3 ${
                        idx < watchedVideos.length - 1 ? "border-b border-sand/40" : ""
                      }`}
                    >
                      <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <p className="text-sm text-ink">
                        No.{String(s.id).padStart(2, "0")}「{s.title}」
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>

          <Section
            title="メモ"
            icon="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          >
            {memoEntries.length === 0 ? (
              <p className="text-sm text-ink-light/40 py-2">
                まだメモを入力していません
              </p>
            ) : (
              <div className="space-y-2">
                {memoEntries.map(([scheduleId, text]) => {
                  const s = schedules.find(
                    (sc) => sc.id === Number(scheduleId)
                  );
                  return (
                    <div
                      key={scheduleId}
                      className="bg-ivory rounded-xl px-4 py-3"
                    >
                      <p className="text-[10px] text-ocean tracking-wider mb-1.5">
                        No.{String(s?.id).padStart(2, "0")}「{s?.title}」
                      </p>
                      <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>
        </div>

        {/* Logout */}
        <div className="px-5 py-6">
          <button
            onClick={() => {
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
      </main>
      <BottomNav />
    </>
  );
}
