import { Suspense } from "react";
import AiChat from "./AiChat";

export default function AiChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">読み込み中...</div>}>
      <AiChat />
    </Suspense>
  );
}
