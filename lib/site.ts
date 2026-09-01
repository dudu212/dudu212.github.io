// 站点级常量。部署时通过 NEXT_PUBLIC_SITE_URL 注入真实域名;
// 未设置时回退到 GitHub Pages 域名。
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://dudu212.github.io";

export const SITE_NAME = "dudu";
export const SITE_TITLE = "dudu · 前端 & AI";
export const SITE_DESCRIPTION =
  "前端工程师，关注 AI、开发者工具与工程实践。分享学习笔记与项目复盘。";
