import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PerformanceMonitor } from "../components/PerformanceMonitor";

export const metadata: Metadata = {
  title: "Music Showcase - Nightcall by Reverie",
  description: "A beautiful music player showcasing Nightcall by Reverie",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNS 预解析以加速外部资源加载 */}
        <link rel="dns-prefetch" href="https://oss.ashes.vip" />
        {/* 预连接到 OSS 域名以减少延迟 */}
        <link rel="preconnect" href="https://oss.ashes.vip" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {/* 性能监控组件（仅在开发环境） */}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
