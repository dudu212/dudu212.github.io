# dudu-site

个人博客与作品集,前端 & AI 方向。做旧「文库本」视觉:旧纸底纹、思源宋体、朱砂印、硫酸纸(毛玻璃),首页是一本可翻开的书。

## 技术栈

- [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)(CSS-first,无 config 文件)
- [MDX](https://mdxjs.com/) + [gray-matter](https://github.com/jonschlinkert/gray-matter) 驱动内容
- 字体:Noto Serif SC(思源宋体)· Newsreader · Geist Mono(均走 `next/font`)
- TypeScript · pnpm · 部署 Vercel

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3000

其它命令:

```bash
pnpm build   # 生产构建
pnpm start   # 启动生产服务
pnpm lint    # ESLint(注:当前缺 eslint.config,校验以 pnpm exec tsc --noEmit 为准)
```

## 目录结构

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根 layout(字体/Header/Footer/个人主页抽屉/主题脚本)
│   ├── page.tsx            # 首页(仅取数据,渲染 <BookHero />)
│   ├── globals.css         # Tailwind + 文库本设计令牌与工具类
│   ├── icon.svg            # favicon(朱砂印)
│   ├── opengraph-image.tsx # OG 分享图(next/og 生成书封)
│   ├── rss.xml/route.ts    # RSS 2.0 订阅
│   ├── blog/               # 博客列表 + [slug] 详情
│   ├── projects/           # 项目列表 + [slug] 详情
│   └── about/              # 关于我
├── components/
│   ├── BookHero.tsx        # 首页翻页封面(点击翻开)+ 两条轮播
│   ├── Carousel.tsx        # 横向轮播 + 走马灯圆点(非当前页 inert)
│   ├── ProfileDrawer.tsx   # 侧边书签「个人主页」抽屉
│   ├── Header.tsx / Footer.tsx
│   └── ThemeScript.tsx     # 首绘前锁定亮色主题(防闪烁)
├── content/
│   ├── posts/*.mdx         # 博客文章
│   └── projects/*.mdx      # 项目介绍
├── lib/
│   ├── posts.ts            # getAllPosts / getPostSlugs
│   ├── projects.ts         # getAllProjects / getProjectSlugs
│   └── site.ts             # SITE_URL 等站点常量(读 NEXT_PUBLIC_SITE_URL)
├── mdx-components.tsx       # MDX 元素映射(Next.js 16 必需)
└── public/                 # 静态资源
```

## 设计与主题

**亮色单主题**的做旧文库本。设计令牌集中在 [`app/globals.css`](./app/globals.css) 的 CSS 变量,主要有:

- `--background`(旧纸)/ `--foreground`(铅墨)/ `--muted`
- `--border` / `--rule`(书页双细线)/ `--accent`(朱砂印)/ `--card`(内页)
- `--vellum*`(硫酸纸/毛玻璃叠层)

工具类:`.vellum`(硫酸纸卡片)、`.seal`(朱砂印)、`.rule-double`(双细线)、`.eyebrow`(mono 卷标)、`.book-stage/.leaf-cover/.leaf-inner`(翻页封面)、`.carousel-*`(轮播)。全部动效尊重 `prefers-reduced-motion`。

改主题只改这几个变量即可。

## 如何添加新文章

在 `content/posts/` 下新建 `.mdx` 文件,顶部加 frontmatter:

```markdown
---
title: "文章标题"
date: "2026-08-20"
description: "一句话摘要,会显示在列表、meta description 与 RSS 里"
tags: ["ai", "前端"]
category: "blog"          # blog | notes
published: true           # 未完成的草稿设为 false
---

正文用 Markdown / MDX 写,可以直接嵌 React 组件。
```

保存后:Dev 环境自动刷新;文件名(去 `.mdx`)就是 slug,例如 `mcp-first-look.mdx` → `/blog/mcp-first-look`。新文章会自动进入博客列表、首页轮播和 RSS。

## 如何添加新项目

在 `content/projects/` 下新建 `.mdx`,frontmatter:

```markdown
---
title: "项目名"
tagline: "一句话说清项目是什么"
date: "2026-08-05"
status: "active"          # active | paused | archived
featured: true            # 是否在首页「精选作品」轮播展示
tags: ["nextjs", "ai"]
repo: "https://github.com/..."
demo: "https://..."
---

项目详情正文。
```

## 部署(Vercel)

1. 在 GitHub 新建 repo(例如 `dudu-site`),推送本仓库:
   ```bash
   git remote add origin git@github.com:<user>/dudu-site.git
   git push -u origin main
   ```
2. 到 [vercel.com](https://vercel.com/) → Import Project → 选这个 repo(Next.js 会被自动识别,无需改配置)。
3. 在 Vercel 项目的 **Settings → Environment Variables** 添加:
   - `NEXT_PUBLIC_SITE_URL` = 你的正式域名(如 `https://dudu.dev`)。用于 OG 分享图与 RSS 的绝对链接;不设则回退到 `https://dudu-site.vercel.app`。
4. 之后推送到 `main` 即自动部署。

## License

MIT
