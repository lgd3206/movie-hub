import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './globals.css'

export const metadata = {
  title: '影视资源搜索',
  description: '影视资源搜索平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "影视资源搜索平台",
  description: "提供最新最全的影视资源搜索服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}