# dudu-site

个人博客与作品集，前端 & AI 方向。

## 技术栈

- [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)（CSS-first，无 config 文件）
- [MDX](https://mdxjs.com/) + [gray-matter](https://github.com/jonschlinkert/gray-matter) 驱动内容
- TypeScript · pnpm · 部署 Vercel

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3000

其它命令：

```bash
pnpm build   # 生产构建
pnpm start   # 启动生产服务
pnpm lint    # ESLint
```

## 目录结构

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根 layout（Header/Footer/字体/主题）
│   ├── page.tsx            # 首页（Hero + 精选项目 + 最新文章）
│   ├── globals.css         # Tailwind + 主题 CSS 变量
│   ├── blog/               # 博客列表 + [slug] 详情
│   ├── projects/           # 项目列表 + [slug] 详情
│   └── about/              # 关于我
├── components/             # Header / Footer / ThemeToggle / PostCard
├── content/
│   ├── posts/*.mdx         # 博客文章
│   └── projects/*.mdx      # 项目介绍
├── lib/
│   ├── posts.ts            # getAllPosts
│   └── projects.ts         # getAllProjects
├── mdx-components.tsx      # MDX 元素映射（Next.js 16 必需）
└── public/                 # 静态资源
```

## 如何添加新文章

在 `content/posts/` 下新建 `.mdx` 文件，顶部加 frontmatter：

```markdown
---
title: "文章标题"
date: "2026-08-20"
description: "一句话摘要，会显示在列表和 meta description 里"
tags: ["ai", "前端"]
category: "blog"          # blog | notes
published: true           # 未完成的草稿设为 false
---

正文用 Markdown / MDX 写，可以直接嵌 React 组件。
```

保存后：
- Dev 环境自动刷新
- 文件名（去 `.mdx`）就是 slug，例如 `mcp-first-look.mdx` → `/blog/mcp-first-look`

## 如何添加新项目

在 `content/projects/` 下新建 `.mdx`，frontmatter：

```markdown
---
title: "项目名"
tagline: "一句话说清项目是什么"
date: "2026-08-05"
status: "active"          # active | paused | archived
featured: true            # 是否在首页 "精选项目" 展示
tags: ["nextjs", "ai"]
repo: "https://github.com/..."
demo: "https://..."
---

项目详情正文。
```

## 主题

深色/浅色由 `<ThemeToggle />` 切换，写入 `localStorage.theme`。首次访问跟随系统 `prefers-color-scheme`。防闪烁靠 `<ThemeScript />` 在 `<body>` 之前同步设置 `<html>` 的 class。

设计 token 集中在 [`app/globals.css`](./app/globals.css) 的 CSS 变量：
- `--background` / `--foreground`
- `--muted` / `--border` / `--accent` / `--card`

改主题只改这几个变量就行。

## 部署

Vercel 直连 GitHub 自动部署。第一次：

1. 在 GitHub 新建 repo（例如 `dudu-site`）
2. `git remote add origin git@github.com:<user>/<repo>.git && git push -u origin main`
3. 到 [vercel.com](https://vercel.com/) → Import Project → 选这个 repo
4. 保持默认（Next.js 会被自动识别）即可

## License

MIT
