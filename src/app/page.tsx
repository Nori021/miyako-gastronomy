"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import students from "@/data/students.json";

export default function LoginPage() {
  const router = useRouter();
  const { setStudent } = useApp();

  const handleSelect = (s: (typeof students)[number]) => {
    setStudent(s);
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-ink-light uppercase mb-3">
            Miyakojima
          </p>
          <h1 className="font-serif text-3xl font-semibold text-ink leading-tight">
            ガストロノミー大学
          </h1>
          <div className="w-8 h-px bg-terracotta mx-auto mt-4 mb-3" />
          <p className="text-sm text-ink-light">
            受講生を選択してください
          </p>
        </div>

        {/* Student Cards */}
        <div className="w-full max-w-sm space-y-3">
          {students.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className="w-full bg-white border border-sand/80 rounded-lg px-5 py-4 text-left hover:border-terracotta/40 hover:bg-terracotta-light/30 transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta-light transition-colors">
                  <span className="font-serif text-sm font-semibold text-ink">
                    {s.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink text-sm">{s.name}</p>
                  <p className="text-xs text-ink-light mt-0.5">
                    {s.role}
                    <span className="text-sand mx-1.5">|</span>
                    {s.location}
                  </p>
                </div>
                <svg className="w-4 h-4 text-ink-light/30 group-hover:text-terracotta transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-[10px] tracking-[0.2em] text-ink-light/40 uppercase">
          Miyakojima Gastronomy University 2025-2026
        </p>
      </div>
    </div>
  );
}
