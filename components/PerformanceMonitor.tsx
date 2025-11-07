'use client';

import { useEffect } from 'react';
import { measureWebVitals, logPageLoadMetrics } from '@/lib/utils/performance';

/**
 * 性能监控组件
 * 在开发环境中监控和记录关键性能指标
 * 在生产环境中不执行任何操作以避免性能开销
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // 仅在开发环境或启用性能监控时运行
    if (process.env.NODE_ENV === 'development') {
      // 测量 Web Vitals
      measureWebVitals();
      
      // 记录页面加载指标
      logPageLoadMetrics();
    }
  }, []);

  // 不渲染任何 UI
  return null;
}
