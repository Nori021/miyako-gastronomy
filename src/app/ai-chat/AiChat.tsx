"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import guests from "@/data/guests.json";
import mockResponses from "@/data/mock-responses.json";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const sampleQuestions: Record<number, string[]> = {
  1: [
    "宮古島の食の未来についてどう思いますか？",
    "琉球ガストロノミーとは何ですか？",
    "マドリードフュージョンでの経験を教えてください",
  ],
  2: [
    "宮古島の旬の食材を教えてください",
    "おすすめの島野菜はありますか？",
    "生産者とのつながりについて教えてください",
  ],
  3: [
    "世界基準のホスピタリティとは何ですか？",
    "VIPが求める体験とは？",
    "宮古島のホスピタリティの強みは？",
  ],
  4: [
    "地域ブランドの作り方を教えてください",
    "宮古島を地域ブランドにするには？",
    "まちづくりで大切なことは何ですか？",
  ],
};

function getMockResponse(guestId: number, question: string): string {
  const guestData =
    mockResponses[String(guestId) as keyof typeof mockResponses];
  if (!guestData) return "申し訳ありません。回答を準備中です。";

  const responses = guestData.responses;

  for (const r of responses) {
    if (
      r.keywords.length > 0 &&
      r.keywords.some((kw) => question.includes(kw))
    ) {
      return r.response;
    }
  }

  return responses[responses.length - 1].response;
}

export default function AiChat() {
  const { student } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialGuestId = searchParams.get("guestId");

  const [selectedGuestId, setSelectedGuestId] = useState<number>(
    initialGuestId ? Number(initialGuestId) : 1
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedGuest = guests.find((g) => g.id === selectedGuestId);

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedGuestId]);

  if (!student) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    const response = getMockResponse(selectedGuestId, text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  const samples = sampleQuestions[selectedGuestId] ?? [];

  return (
    <>
      <Header title="AI質問" />
      <main className="flex-1 max-w-lg mx-auto w-full flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
        {/* Guest Selector */}
        <div className="px-4 py-3 border-b border-sand/60 bg-white">
          <select
            value={selectedGuestId}
            onChange={(e) => setSelectedGuestId(Number(e.target.value))}
            className="w-full bg-ivory border border-sand rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-terracotta/40 transition-colors"
          >
            {guests.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} — {g.theme}
              </option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-terracotta-light flex items-center justify-center mx-auto mb-3">
                <span className="font-serif text-terracotta font-semibold text-xl">
                  {selectedGuest?.name.charAt(0)}
                </span>
              </div>
              <p className="font-semibold text-sm text-ink mb-0.5">
                {selectedGuest?.name}
              </p>
              <p className="text-xs text-ink-light">
                AIが{selectedGuest?.name}さんの視点で回答します
              </p>

              <div className="mt-6 space-y-2">
                {samples.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left bg-white border border-sand/60 text-ink text-sm px-4 py-3 rounded-xl hover:border-terracotta/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-terracotta-light flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <span className="font-serif text-terracotta text-[10px] font-semibold">
                    {selectedGuest?.name.charAt(0)}
                  </span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-terracotta text-white rounded-br-sm"
                    : "bg-white border border-sand/60 text-ink rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-terracotta-light flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <span className="font-serif text-terracotta text-[10px] font-semibold">
                  {selectedGuest?.name.charAt(0)}
                </span>
              </div>
              <div className="bg-white border border-sand/60 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-ink-light/30 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-ink-light/30 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <div className="w-1.5 h-1.5 bg-ink-light/30 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-sand/60 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="質問を入力..."
              className="flex-1 bg-ivory border border-sand rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-terracotta/40 transition-colors placeholder:text-ink-light/30"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta/80 transition-colors disabled:opacity-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
