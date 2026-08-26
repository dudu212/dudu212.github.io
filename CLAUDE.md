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
pnpm lint    # eslint(通过 eslint-config-next 使用 flat config)
```

**没有配置测试运行器。**

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

### 主题

`components/ThemeScript.tsx` 在 `<head>` 里注入一段阻塞式内联脚本,根据 `localStorage.theme`(缺省时读 `prefers-color-scheme`)在首次绘制前给 `<html>` 打上 class —— 防止主题闪烁。`<ThemeToggle />` 写入同一个 key。设计 token 以 CSS 变量的形式集中在 `app/globals.css`(`--background`、`--foreground`、`--muted`、`--border`、`--accent`、`--card`)—— Tailwind 4 是 CSS-first,**没有 `tailwind.config.*` 文件**。

### 路径别名

`@/*` → 仓库根目录(见 `tsconfig.json`)。使用 `@/lib/...`、`@/components/...`、`@/content/...` —— 动态 MDX import 依赖这个别名。

## 本仓库的特殊约定

- 站点语言是中文(`lang="zh-CN"`、`locale: zh_CN`),组件文案和 MDX 内容都用中文。改动面向用户的字符串时,保持相同语气。
- `next-env.d.ts` 提供环境类型 `PageProps<"/route">` / `LayoutProps<"/">` —— 页面/布局签名直接用这些类型,不要手写 `{ params: Promise<{ slug: string }> }`(Next 16 里 `params` 是 Promise,记得 `await`)。
- 存在 `.env.local.example`,复制为 `.env.local` 用作本地环境变量。
