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
          你好，我是 <strong>dudu</strong>，一个写前端的人，也在认真地把 AI
          收进日常的开发流程里。如果把 dudu.dev
          当成一本书，这一页就是它的序——记下我此刻在做什么、用什么、以及怎么找到我。
        </p>
        <p>
          我关心的一直是同一件事：<em>把大模型与 Agent 的能力，落成开发者真正用得上的工具</em>，
          而不是停在演示里。
        </p>

        <h2>此刻在做</h2>
        <ul>
          <li>
            <a href="/projects/fedrill">FEDrill</a> ——
            面向前端秋招的 AI 教练，把「手撕题、算法、八股」揉进一套可持续的训练流，
            让 AI 扮演耐心又严格的面试官。正在打磨 MVP。
          </li>
          <li>
            本站 · dudu.dev —— 学习笔记、项目复盘与技术思考的存放处；
            新文章会同步进博客与 RSS。
          </li>
        </ul>

        <h2>手艺</h2>
        <ul>
          <li><strong>顺手</strong>：HTML/CSS/JS、React、Next.js、TypeScript、Tailwind</li>
          <li><strong>在练</strong>：RSC、Server Actions、MCP、Agent 系统设计、Monaco Editor</li>
          <li><strong>常用工具</strong>：Vercel、pnpm、Git、Claude Code</li>
        </ul>

        <h2>如何找到我</h2>
        <ul>
          <li>GitHub —— <a href="https://github.com/dudu212">dudu212</a></li>
          <li>订阅 —— 本站文章有 <a href="/rss.xml">RSS</a></li>
        </ul>
      </section>
    </div>
  );
}
