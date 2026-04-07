import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import SideMenu from "@/components/SideMenu";

export const metadata: Metadata = {
  title: "宮古島ガストロノミー大学",
  description: "宮古島ガストロノミー大学 生徒向けシステム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProvider>
          {children}
          <SideMenu />
        </AppProvider>
      </body>
    </html>
  );
}
