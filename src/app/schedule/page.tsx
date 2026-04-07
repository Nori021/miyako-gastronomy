"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import schedules from "@/data/schedules.json";
import guests from "@/data/guests.json";

export default function SchedulePage() {
  const { student } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  return (
    <>
      <Header title="講義一覧" />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-sand" />

          <div className="space-y-2">
            {schedules.map((s) => {
              const guest = s.guestId
                ? guests.find((g) => g.id === s.guestId)
                : null;
              const isDone = s.status === "done";
              const attended = student.attendance.includes(s.id);

              return (
                <div key={s.id} className="relative flex gap-3">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-[23px] flex justify-center pt-4 relative z-10">
                    <div
                      className={`w-[9px] h-[9px] rounded-full border-2 ${
                        isDone
                          ? "bg-terracotta border-terracotta"
                          : "bg-ivory border-ink-light/30"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => isDone && router.push(`/schedule/${s.id}`)}
                    disabled={!isDone}
                    className={`flex-1 text-left rounded-xl px-4 py-3.5 transition-all ${
                      isDone
                        ? "bg-white border border-sand/60 hover:border-terracotta/30 active:scale-[0.99]"
                        : "bg-sand/20 border border-sand/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-semibold tracking-wider ${isDone ? "text-terracotta" : "text-ink-light/30"}`}>
                            No.{String(s.id).padStart(2, "0")}
                          </span>
                          {isDone && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              attended
                                ? "bg-sage-light text-sage"
                                : "bg-terracotta-light text-terracotta"
                            }`}>
                              {attended ? "出席" : "欠席"}
                            </span>
                          )}
                        </div>
                        <p className={`font-serif text-sm font-semibold ${isDone ? "text-ink" : "text-ink-light/30"}`}>
                          {s.title}
                        </p>
                        <p className={`text-xs mt-1 ${isDone ? "text-ink-light" : "text-ink-light/25"}`}>
                          {s.date} — {s.location}
                        </p>
                        {guest && isDone && (
                          <p className="text-xs text-ocean mt-1">
                            {guest.name}
                          </p>
                        )}
                      </div>
                      <div className="ml-2 mt-1 flex-shrink-0">
                        {isDone ? (
                          <svg className="w-4 h-4 text-ink-light/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-ink-light/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
