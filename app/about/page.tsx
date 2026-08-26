import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 dudu — 前端工程师，关注 AI 与开发者工具。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <div className="eyebrow mb-4">关于 · 序</div>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight">
          关于我
        </h1>
        <hr className="rule-double mt-8" />
      </header>

      <section className="prose prose-neutral max-w-none prose-headings:font-serif">
        <p>
        你好，我是 <strong>dudu</strong> —— 前端工程师，正在准备 2026 秋招。
        兴趣方向是 <em>AI + 前端</em>：把大模型与 Agent 能力融合进开发者工具与产品，
        探索能真正提高生产力的用法。
      </p>

      <h2>正在做的</h2>
      <ul>
        <li>
          <a href="/projects/fedrill">FEDrill</a> ——
          前端秋招 AI 教练，覆盖手撕题、算法与八股，正在做 MVP。
        </li>
        <li>
          本站 · dudu.dev —— 记录学习、项目复盘与技术思考的地方。
        </li>
      </ul>

      <h2>技术栈</h2>
      <ul>
        <li><strong>擅长</strong>：HTML/CSS/JS、React、Next.js、TypeScript、Tailwind</li>
        <li><strong>在学</strong>：RSC、Server Actions、MCP、Agent 系统设计、Monaco Editor</li>
        <li><strong>工具</strong>：Vercel、pnpm、Git、Claude Code</li>
      </ul>

      <h2>联系</h2>
      <ul>
        <li>GitHub: <a href="https://github.com/dudu212">dudu212</a></li>
        <li>本站文章有 RSS，也可以直接在 GitHub 上找到我</li>
      </ul>

      <hr />

      <p className="text-sm text-muted">
        这个页面是占位内容，具体信息我会逐步完善。
      </p>
      </section>
    </div>
  );
}
