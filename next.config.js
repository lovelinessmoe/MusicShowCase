/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.ashes.vip',
        port: '',
        pathname: '/**',
      },
    ],
    // 优化图片格式和质量 - AVIF 优先，WebP 作为后备
    formats: ['image/avif', 'image/webp'],
    // 设置设备尺寸以优化响应式图片
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最小化缓存时间以优化性能
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // 禁用静态图片导入优化（如果不需要）
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 性能优化：启用 React 严格模式
  reactStrictMode: true,
  // 性能优化：启用 SWC 压缩
  swcMinify: true,
  // 编译器优化
  compiler: {
    // 移除 console.log（生产环境）
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // 性能优化：启用实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // 压缩选项
  compress: true,
  // 生成 ETags 以优化缓存
  generateEtags: true,
  // 页面扩展名
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // 如果需要静态导出，取消注释以下行
  // output: 'export',
  // 如果使用静态导出，需要禁用图片优化
  // images: {
  //   unoptimized: true,
  // },
};

module.exports = nextConfig;
