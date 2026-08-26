export function ThemeScript() {
  // 文库本主题:亮色单主题。始终应用 theme-light。
  const code = `
(function() {
  try {
    document.documentElement.classList.remove('theme-dark');
    document.documentElement.classList.add('theme-light');
  } catch (e) {}
})();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
