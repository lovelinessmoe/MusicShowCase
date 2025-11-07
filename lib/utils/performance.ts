/**
 * 性能监控工具
 * 用于跟踪和记录关键性能指标
 */

/**
 * 记录资源加载时间
 * @param resourceName - 资源名称
 * @param startTime - 开始时间
 */
export function logResourceLoadTime(resourceName: string, startTime: number): void {
  if (typeof window === 'undefined') return;
  
  const loadTime = performance.now() - startTime;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${resourceName} loaded in ${loadTime.toFixed(2)}ms`);
  }
  
  // 可以在这里添加分析工具集成（如 Google Analytics）
}

/**
 * 测量 Web Vitals 指标
 * 使用 Performance Observer API 监控关键性能指标
 */
export function measureWebVitals(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    // 监控 Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Performance] LCP:', lastEntry.startTime.toFixed(2), 'ms');
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // 监控 First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Performance] FID:', fid.toFixed(2), 'ms');
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // 监控 Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Performance] CLS:', clsScore.toFixed(4));
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.error('[Performance] Error setting up performance monitoring:', error);
  }
}

/**
 * 获取导航时间信息
 * @returns 导航时间对象或 null
 */
export function getNavigationTiming(): PerformanceNavigationTiming | null {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const [navigationEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  return navigationEntry || null;
}

/**
 * 记录页面加载性能指标
 */
export function logPageLoadMetrics(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const timing = getNavigationTiming();
    
    if (timing && process.env.NODE_ENV === 'development') {
      console.log('[Performance] Page Load Metrics:');
      console.log('  DNS Lookup:', (timing.domainLookupEnd - timing.domainLookupStart).toFixed(2), 'ms');
      console.log('  TCP Connection:', (timing.connectEnd - timing.connectStart).toFixed(2), 'ms');
      console.log('  Request Time:', (timing.responseStart - timing.requestStart).toFixed(2), 'ms');
      console.log('  Response Time:', (timing.responseEnd - timing.responseStart).toFixed(2), 'ms');
      console.log('  DOM Processing:', (timing.domComplete - timing.domInteractive).toFixed(2), 'ms');
      console.log('  Total Load Time:', (timing.loadEventEnd - timing.fetchStart).toFixed(2), 'ms');
    }
  });
}
