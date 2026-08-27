> **注意:** `AGENTS.md` 提示本仓库使用 **Next.js 16**,与旧版本相比有破坏性变更。写框架相关代码前先查阅 `node_modules/next/dist/docs/`,不要依赖训练数据里的记忆。

@AGENTS.md

# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库工作时提供指引。

## 常用命令

包管理器是 **pnpm** (`packageManager: pnpm@11.17.0`),不要使用 npm/yarn。

```bash
pnpm dev     # next dev(Turbopack)→ http://localhost:3000
pnpm build   # 生产构建
pnpm start   # 启动生产服务
pnpm lint    # eslint(⚠️ 当前缺 eslint.config,会报错;类型/语法校验以 `pnpm exec tsc --noEmit` 为准)
```

**没有配置测试运行器。** 无浏览器时,可用 Edge 无头截图目测:`msedge --headless=new --screenshot=out.png --window-size=1366,860 http://localhost:3000`。

## 架构

内容驱动的个人站点。页面本身很薄,关键逻辑在于 `content/` 下的 MDX 如何变成路由。

### 内容 → 路由 的流水线

`content/posts/*.mdx` 和 `content/projects/*.mdx` 是 `/blog/*` 与 `/projects/*` 的数据源。链路如下:

1. **`lib/posts.ts` / `lib/projects.ts`** — 用 `fs.readdirSync` 读取内容目录,用 `gray-matter` 解析 frontmatter,返回带类型的元数据(`PostMeta`、`ProjectMeta`)。`posts.ts` 过滤掉 `published === false` 的文章;`projects.ts` 先按 `featured` 优先排序,再按日期倒序。
2. **`app/blog/[slug]/page.tsx` / `app/projects/[slug]/page.tsx`** — 设置 `dynamicParams = false`,用 `getPostSlugs()` / `getProjectSlugs()` 填充 `generateStaticParams`,正文通过**动态 import** 加载:`await import(\`@/content/posts/${slug}.mdx\`)`。文件名(去掉 `.mdx`)就是 slug。
3. **`next.config.ts`** — 用 `@next/mdx` 包裹配置,启用 `remark-gfm`。`pageExtensions` 包含 `md`/`mdx`,让 MDX 文件可以直接作为页面。
4. **`mdx-components.tsx`**(位于仓库根目录 —— **Next.js 16 使用 App Router + MDX 时必须存在**) — 全局 MDX 元素覆盖:`<a>` 站内链接自动转成 `next/link`,外链自动加 `target="_blank"`;`<img>` 自动加 `loading="lazy"`。

**新增内容 = 往 `content/{posts,projects}/` 下丢一个 MDX 文件**,frontmatter 符合 `PostMeta` / `ProjectMeta` 的字段结构即可。不需要改路由,也没有 manifest 需要维护。

### Frontmatter 字段约定

**只在 `lib/posts.ts` / `lib/projects.ts` 里读取,没有 schema 校验**。类型之外的字段会被静默忽略。

- 文章 (`PostMeta`):`title`、`date`、`description?`、`tags?`、`category?` (`blog` | `notes`)、`published?`(默认 true)。
- 项目 (`ProjectMeta`):`title`、`tagline`、`date?`、`status?` (`active` | `paused` | `archived`)、`tags?`、`repo?`、`demo?`、`featured?`。

### 首页与视觉组件

首页 `app/page.tsx` 只取数据,渲染客户端组件 `components/BookHero.tsx`:

- **`BookHero`**(client)—— 全屏「书封面」,点「翻开本书」用 CSS `rotateY` 软翻(`.book-stage.is-open` 触发 `.leaf-cover` 翻转 + 光泽);翻开后是「卷内目录」:两条 `Carousel`(精选作品 / 近期文章)。
- **`Carousel`**(client)—— 横向轮播 + 走马灯圆点;**非当前页用 `inert`**(勿改回 `aria-hidden`,那会让屏外可聚焦链接产生 a11y 冲突)。
- **`ProfileDrawer`**(client,挂在 `layout` 全站可用)—— 右缘朱砂书签,点开从右滑出个人信息面板。

改这些交互/样式时,几何在组件 JSX,动效与令牌在 `app/globals.css`(`.book-stage`/`.leaf-cover`/`.carousel-*`)。**纯 CSS 无法做真实纸张卷曲**,真曲面需 WebGL,勿反复在 CSS 里尝试。

### RSS 与站点常量

`app/rss.xml/route.ts` 用 `getAllPosts()` 生成 RSS 2.0(`force-static`)。站点级常量在 `lib/site.ts`:`SITE_URL` 读环境变量 `NEXT_PUBLIC_SITE_URL`(回退 vercel 子域),被 `layout` 的 `metadataBase`、OG 图与 RSS 复用 —— 需要绝对 URL 时从这里取,别再写死。

### 主题与设计系统

**做旧「文库本」视觉,亮色单主题**(已移除深色/切换)。`components/ThemeScript.tsx` 在首绘前固定给 `<html>` 加 `theme-light`(防闪烁)。字体在 `layout` 用 `next/font` 装载:中文思源宋体(Noto Serif SC)+ 拉丁 Newsreader + Geist Mono,合成 `--font-serif` / `--font-mono`。

设计令牌集中在 `app/globals.css`,Tailwind 4 是 CSS-first(**无 `tailwind.config.*`**):`--background`(旧纸)、`--foreground`(铅墨)、`--muted`、`--border`、`--rule`(书页双细线)、`--accent`(**朱砂印**)、`--card`(内页)、`--vellum*`(硫酸纸/毛玻璃)。配套工具类:`.vellum`、`.seal`、`.rule-double`、`.eyebrow`、`.book-stage/.leaf-*`、`.carousel-*`;所有动效都在 `@media (prefers-reduced-motion: reduce)` 里关掉。改视觉优先改这些变量。

### 路径别名

`@/*` → 仓库根目录(见 `tsconfig.json`)。使用 `@/lib/...`、`@/components/...`、`@/content/...` —— 动态 MDX import 依赖这个别名。

## 本仓库的特殊约定

- 站点语言是中文(`lang="zh-CN"`、`locale: zh_CN`),组件文案和 MDX 内容都用中文。改动面向用户的字符串时,保持相同语气。
- `next-env.d.ts` 提供环境类型 `PageProps<"/route">` / `LayoutProps<"/">` —— 页面/布局签名直接用这些类型,不要手写 `{ params: Promise<{ slug: string }> }`(Next 16 里 `params` 是 Promise,记得 `await`)。
- 存在 `.env.local.example`,复制为 `.env.local` 用作本地环境变量。
