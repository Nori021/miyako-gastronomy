"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import guests from "@/data/guests.json";
import schedules from "@/data/schedules.json";

export default function GuestDetail({ id }: { id: number }) {
  const { student } = useApp();
  const router = useRouter();

  const guest = guests.find((g) => g.id === id);
  const guestSchedules = schedules.filter((s) => s.guestId === id);

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student || !guest) return null;

  return (
    <>
      <Header title="ゲスト" />
      <main className="flex-1 max-w-lg mx-auto w-full px-5 py-6 space-y-6">
        {/* Profile */}
        <section className="text-center">
          <div className="w-20 h-20 rounded-full bg-terracotta-light flex items-center justify-center mx-auto mb-4">
            <span className="font-serif text-terracotta font-semibold text-2xl">
              {guest.name.charAt(0)}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-ink">{guest.name}</h2>
          <p className="text-xs text-ink-light mt-1">{guest.title}</p>
          <div className="mt-3 inline-block text-[10px] tracking-wider text-ocean bg-ocean-light px-3 py-1 rounded-full">
            {guest.theme}
          </div>
        </section>

        <div className="w-12 h-px bg-sand mx-auto" />

        {/* Bio */}
        <section>
          <p className="text-sm text-ink leading-[1.9] tracking-wide">{guest.bio}</p>
        </section>

        {/* Related Lectures */}
        {guestSchedules.length > 0 && (
          <section>
            <h3 className="text-[10px] tracking-[0.2em] text-ink-light uppercase mb-3">
              Lectures
            </h3>
            <div className="space-y-2">
              {guestSchedules.map((s) => (
                <button
                  key={s.id}
                  onClick={() => s.status === "done" && router.push(`/schedule/${s.id}`)}
                  className="w-full text-left bg-white border border-sand/60 rounded-lg px-4 py-3 hover:border-terracotta/30 transition-all"
                >
                  <p className="text-sm text-ink">
                    No.{String(s.id).padStart(2, "0")}「{s.title}」
                  </p>
                  <p className="text-[10px] text-ink-light mt-0.5">{s.date}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* AI Chat Button */}
        <button
          onClick={() => router.push(`/ai-chat?guestId=${guest.id}`)}
          className="w-full bg-ink text-white py-3.5 px-4 rounded-xl hover:bg-ink/80 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z" />
          </svg>
          {guest.name}さんにAIで質問する
        </button>

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
