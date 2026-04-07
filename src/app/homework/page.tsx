"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import schedules from "@/data/schedules.json";
import homework from "@/data/homework.json";

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-sand/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-terracotta rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-ink-light font-medium w-10 text-right">{pct}%</span>
    </div>
  );
}

function CheckItem({
  label,
  checked,
  onToggle,
  note,
  onNoteChange,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  note: string;
  onNoteChange: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2">
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-0.5 group"
        >
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              checked
                ? "bg-terracotta border-terracotta"
                : "border-sand group-hover:border-terracotta/40"
            }`}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            )}
          </div>
        </button>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left flex items-center gap-1"
          >
            <span
              className={`text-sm leading-relaxed transition-colors flex-1 ${
                checked ? "text-ink-light/50 line-through" : "text-ink"
              }`}
            >
              {label}
            </span>
            <svg
              className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${
                note ? "text-terracotta" : "text-ink-light/20"
              } ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {open && (
            <textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="メモを入力..."
              rows={3}
              className="mt-2 w-full bg-ivory border border-sand rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-light/30 focus:outline-none focus:border-terracotta/40 resize-none transition-colors"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeworkPage() {
  const { student, homeworkChecks, toggleHomework, homeworkNotes, setHomeworkNote } = useApp();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  // Show done lectures + the next upcoming one
  const visibleSchedules = schedules.filter(
    (s) => s.status === "done" || s.status === "upcoming"
  );

  // Calculate overall progress
  let totalItems = 0;
  let doneItems = 0;
  homework.forEach((hw) => {
    const allItems = [...hw.review, ...hw.preview];
    totalItems += allItems.length;
    allItems.forEach((_, idx) => {
      const type = idx < hw.review.length ? "review" : "preview";
      const itemIdx = idx < hw.review.length ? idx : idx - hw.review.length;
      const key = `${hw.scheduleId}-${type}-${itemIdx}`;
      if (homeworkChecks[key]) doneItems++;
    });
  });

  return (
    <>
      <Header title="宿題リスト" />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5 space-y-5">
        {/* Overall Progress */}
        <section className="bg-terracotta-light/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-ink">全体の進捗</p>
            <p className="text-xs text-ink-light">
              <span className="font-serif text-base font-bold text-terracotta">{doneItems}</span>
              <span className="mx-0.5">/</span>
              {totalItems} 項目
            </p>
          </div>
          <ProgressBar done={doneItems} total={totalItems} />
        </section>

        {/* Lecture Homework Cards */}
        <div className="space-y-3">
          {visibleSchedules.map((schedule) => {
            const hw = homework.find((h) => h.scheduleId === schedule.id);
            if (!hw) return null;

            const isUpcoming = schedule.status === "upcoming";
            const isExpanded = expandedId === schedule.id;

            // Count per-lecture progress
            const reviewDone = hw.review.filter(
              (_, i) => homeworkChecks[`${schedule.id}-review-${i}`]
            ).length;
            const previewDone = hw.preview.filter(
              (_, i) => homeworkChecks[`${schedule.id}-preview-${i}`]
            ).length;
            const lectureTotal = hw.review.length + hw.preview.length;
            const lectureDone = reviewDone + previewDone;

            return (
              <div
                key={schedule.id}
                className="bg-white border border-sand/60 rounded-xl overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : schedule.id)}
                  className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-ivory/50 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isUpcoming ? "bg-ocean-light" : lectureDone === lectureTotal ? "bg-sage-light" : "bg-terracotta-light"
                    }`}
                  >
                    {lectureDone === lectureTotal && !isUpcoming ? (
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <span className={`font-serif text-sm font-bold ${isUpcoming ? "text-ocean" : "text-terracotta"}`}>
                        {schedule.id}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-ink truncate">{schedule.title}</p>
                      {isUpcoming && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-ocean-light text-ocean flex-shrink-0">
                          次回
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-sand/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            lectureDone === lectureTotal && !isUpcoming ? "bg-sage" : "bg-terracotta"
                          }`}
                          style={{ width: `${lectureTotal > 0 ? (lectureDone / lectureTotal) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-ink-light">{lectureDone}/{lectureTotal}</span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-ink-light/30 transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-sand/40">
                    {/* Review Section */}
                    {hw.review.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg className="w-4 h-4 text-ocean" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                          <p className="text-xs font-semibold text-ocean">復習</p>
                          <span className="text-[10px] text-ink-light ml-auto">{reviewDone}/{hw.review.length}</span>
                        </div>
                        <div className="pl-1">
                          {hw.review.map((item, idx) => (
                            <CheckItem
                              key={`review-${idx}`}
                              label={item}
                              checked={!!homeworkChecks[`${schedule.id}-review-${idx}`]}
                              onToggle={() => toggleHomework(`${schedule.id}-review-${idx}`)}
                              note={homeworkNotes[`${schedule.id}-review-${idx}`] ?? ""}
                              onNoteChange={(text) => setHomeworkNote(`${schedule.id}-review-${idx}`, text)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Preview Section */}
                    {hw.preview.length > 0 && (
                      <div className={hw.review.length > 0 ? "mt-3 pt-3 border-t border-sand/30" : "mt-3"}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                          </svg>
                          <p className="text-xs font-semibold text-terracotta">予習</p>
                          <span className="text-[10px] text-ink-light ml-auto">{previewDone}/{hw.preview.length}</span>
                        </div>
                        <div className="pl-1">
                          {hw.preview.map((item, idx) => (
                            <CheckItem
                              key={`preview-${idx}`}
                              label={item}
                              checked={!!homeworkChecks[`${schedule.id}-preview-${idx}`]}
                              onToggle={() => toggleHomework(`${schedule.id}-preview-${idx}`)}
                              note={homeworkNotes[`${schedule.id}-preview-${idx}`] ?? ""}
                              onNoteChange={(text) => setHomeworkNote(`${schedule.id}-preview-${idx}`, text)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
