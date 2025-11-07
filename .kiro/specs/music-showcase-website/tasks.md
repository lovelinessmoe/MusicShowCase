# 实现计划

- [x] 1. 初始化 Next.js 项目并配置基础设置
  - 创建 Next.js 14+ 项目使用 App Router、TypeScript 和 Tailwind CSS
  - 配置 next.config.js 支持外部图片域名 (oss.ashes.vip)
  - 设置 TypeScript 配置和路径别名
  - 配置 Tailwind CSS 主题和自定义样式
  - _需求: 1.4, 3.1, 4.4_

- [x] 2. 创建数据模型和类型定义
  - 定义 Track 接口在 lib/types/track.ts
  - 创建 tracks 数据配置文件在 lib/data/tracks.ts
  - 实现 getTrackById 和 getAllTracks 辅助函数
  - 添加初始 Nightcall - Reverie 曲目数据
  - _需求: 3.1, 3.2, 3.3_

- [x] 3. 实现音频播放核心逻辑
- [x] 3.1 创建 useAudioPlayer 自定义 Hook
  - 实现 HTMLAudioElement 引用管理
  - 实现播放/暂停状态管理
  - 实现当前时间和总时长状态
  - 实现音量控制状态
  - _需求: 2.1, 2.2, 2.3, 2.5_

- [x] 3.2 添加音频事件监听器
  - 监听 timeupdate 事件更新播放进度
  - 监听 loadedmetadata 事件获取音频时长
  - 监听 ended 事件处理播放结束
  - 监听 error 事件处理加载错误
  - _需求: 2.4, 4.2_

- [x] 3.3 实现播放控制方法
  - 实现 play() 和 pause() 方法
  - 实现 togglePlayPause() 方法
  - 实现 seek(time: number) 方法用于跳转
  - 实现 setVolume(volume: number) 方法
  - _需求: 2.1, 2.2, 2.3, 2.5_

- [ ]* 3.4 编写 useAudioPlayer Hook 单元测试
  - 测试播放/暂停切换功能
  - 测试进度跳转功能
  - 测试音量控制功能
  - 测试错误处理逻辑
  - _需求: 2.1, 2.2, 2.3, 2.5_

- [x] 4. 创建 UI 组件
- [x] 4.1 实现 AlbumCover 组件
  - 使用 Next.js Image 组件优化图片加载
  - 添加图片加载占位符
  - 实现图片加载错误处理和回退
  - 根据 isPlaying 状态添加动画效果
  - _需求: 1.1, 1.2, 1.5, 4.1, 5.2_

- [x] 4.2 实现 TrackInfo 组件
  - 显示歌曲标题
  - 显示艺术家名称
  - 应用响应式文字样式
  - _需求: 1.1, 1.3, 1.4_

- [x] 4.3 实现 ProgressBar 组件
  - 渲染可视化进度条
  - 显示当前时间和总时长（格式化为 mm:ss）
  - 实现可拖动的进度滑块
  - 处理点击和拖动事件触发 onSeek 回调
  - _需求: 2.3, 2.4_

- [x] 4.4 实现 AudioControls 组件
  - 创建播放/暂停切换按钮
  - 创建音量控制滑块
  - 添加按钮 hover 和 active 状态样式
  - 实现无障碍访问属性（ARIA 标签）
  - _需求: 2.1, 2.2, 2.5_

- [ ]* 4.5 编写组件单元测试
  - 测试 AlbumCover 图片渲染和错误处理
  - 测试 TrackInfo 数据显示
  - 测试 ProgressBar 交互事件
  - 测试 AudioControls 按钮点击事件
  - _需求: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. 实现主 MusicPlayer 组件
  - 创建 MusicPlayer 容器组件
  - 集成 useAudioPlayer Hook
  - 组合所有子组件（AlbumCover, TrackInfo, ProgressBar, AudioControls）
  - 传递状态和回调函数给子组件
  - 添加隐藏的 audio 元素
  - _需求: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 6. 实现页面布局和样式
- [x] 6.1 创建主页面 app/page.tsx
  - 从 tracks 数据获取 Nightcall - Reverie 曲目
  - 渲染 MusicPlayer 组件并传递 track 数据
  - 实现居中卡片式布局
  - 添加页面元数据（title, description）
  - _需求: 1.1, 1.4, 3.1, 3.2_

- [x] 6.2 实现响应式设计
  - 配置移动端布局（< 640px）：280px 专辑封面
  - 配置平板布局（640px - 1024px）：400px 专辑封面
  - 配置桌面布局（> 1024px）：500px 专辑封面
  - 确保所有组件在不同屏幕尺寸下正常显示
  - _需求: 1.4, 5.5_

- [x] 6.3 应用视觉设计和动画
  - 实现深色渐变背景
  - 添加半透明卡片背景和模糊效果
  - 实现播放时专辑封面动画（旋转或脉动）
  - 添加按钮 hover 动画和过渡效果
  - 添加页面加载淡入动画
  - _需求: 5.1, 5.2, 5.3, 5.4_

- [x] 7. 实现错误处理和用户反馈
  - 在 useAudioPlayer 中添加错误状态管理
  - 显示音频加载失败的错误消息
  - 在 AlbumCover 中实现图片加载失败回退
  - 添加加载指示器（音频缓冲时）
  - _需求: 1.5, 4.2_

- [x] 8. 性能优化
  - 实现音频文件预加载
  - 优化 Next.js Image 组件配置
  - 添加适当的 loading 和 priority 属性
  - 配置静态导出选项（如需要）
  - _需求: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 9. 集成测试和端到端测试
  - 测试完整播放流程（加载 → 播放 → 暂停 → 跳转）
  - 测试音量控制流程
  - 测试错误场景（无效 URL、网络错误）
  - 测试响应式布局在不同设备上的表现
  - _需求: 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 4.2_

- [x] 10. 文档和部署准备
  - 创建 README.md 包含项目说明和运行指南
  - 添加代码注释说明关键逻辑
  - 配置部署设置（Vercel 或其他平台）
  - 验证生产构建正常工作
  - _需求: 3.1, 3.2, 3.3, 3.4, 3.5_
