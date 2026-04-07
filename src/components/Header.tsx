"use client";

import { useApp } from "@/lib/context";

export default function Header({ title }: { title?: string }) {
  const { student, setSideMenuOpen } = useApp();

  return (
    <header className="bg-white border-b border-sand/60 sticky top-0 z-40">
      <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
        {/* Left: Menu button */}
        <button
          onClick={() => setSideMenuOpen(true)}
          className="flex items-center gap-1.5 text-ink-light hover:text-ink transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
            <span className="font-serif text-xs font-semibold text-ink">
              {student?.name.charAt(0) ?? "?"}
            </span>
          </div>
          <span className="text-xs">メニュー</span>
        </button>

        {/* Center: Title */}
        <h1 className="font-serif text-sm font-semibold text-ink absolute left-1/2 -translate-x-1/2">
          {title ?? "ガストロノミー大学"}
        </h1>

        {/* Right: Notification */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-ink-light hover:text-ink transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-ink-light hover:text-ink transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
