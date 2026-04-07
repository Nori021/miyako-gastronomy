"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import guests from "@/data/guests.json";

const themeColors: Record<string, { bg: string; text: string; iconBg: string }> = {
  "琉球ガストロノミー": { bg: "bg-terracotta-light", text: "text-terracotta", iconBg: "bg-terracotta-light" },
  "食材・生産者": { bg: "bg-sage-light", text: "text-sage", iconBg: "bg-sage-light" },
  "ホスピタリティ": { bg: "bg-ocean-light", text: "text-ocean", iconBg: "bg-ocean-light" },
  "地域ブランド": { bg: "bg-ocean-light", text: "text-ocean-dark", iconBg: "bg-ocean-light" },
};

export default function GuestsPage() {
  const { student } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  return (
    <>
      <Header title="ゲスト講師" />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5 space-y-3">
        {guests.map((g) => {
          const colors = themeColors[g.theme] ?? { bg: "bg-sand", text: "text-ink-light", iconBg: "bg-sand" };
          return (
            <button
              key={g.id}
              onClick={() => router.push(`/guests/${g.id}`)}
              className="w-full text-left bg-white border border-sand/60 rounded-xl p-4 hover:border-terracotta/30 transition-all active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`font-serif ${colors.text} font-semibold text-lg`}>
                    {g.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink text-sm">{g.name}</p>
                    <span className={`text-[10px] tracking-wider ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                      {g.theme}
                    </span>
                  </div>
                  <p className="text-xs text-ink-light mt-0.5 truncate">{g.title}</p>
                </div>
                <svg className="w-4 h-4 text-ink-light/20 group-hover:text-terracotta transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          );
        })}
      </main>
      <BottomNav />
    </>
  );
}
