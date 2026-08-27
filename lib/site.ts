// 站点级常量。部署时在 Vercel 设置 NEXT_PUBLIC_SITE_URL 为真实域名;
// 本地/未设置时回退到 vercel 默认子域。
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://dudu-site.vercel.app";

export const SITE_NAME = "dudu";
export const SITE_TITLE = "dudu · 前端 & AI";
export const SITE_DESCRIPTION =
  "前端工程师，关注 AI、开发者工具与工程实践。分享学习笔记与项目复盘。";
