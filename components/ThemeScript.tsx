export function ThemeScript() {
  const code = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add('theme-' + theme);
  } catch (e) {}
})();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
