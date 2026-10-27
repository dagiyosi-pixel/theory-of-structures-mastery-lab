// Single-file HTML Bundler for Theory of Structures Mastery Lab
// Inlines all CSS, JS, KaTeX engines, fonts, and course data into standalone.html.

const fs = require('fs');
const path = require('path');

console.log('Bundling standalone.html with embedded offline KaTeX fonts...');

const baseDir = __dirname;
const resolve = (f) => path.join(baseDir, f);

let html = fs.readFileSync(resolve('index.html'), 'utf8');
let css = fs.readFileSync(resolve('styles.css'), 'utf8');
let katexCss = fs.readFileSync(resolve('katex.min.css'), 'utf8');

// Inline core WOFF2 fonts as Base64 data URIs for 100% offline standalone usage on mobile
const coreFonts = [
  'KaTeX_Main-Regular.woff2',
  'KaTeX_Math-Italic.woff2',
  'KaTeX_Main-Bold.woff2',
  'KaTeX_Size1-Regular.woff2',
  'KaTeX_Size2-Regular.woff2',
  'KaTeX_AMS-Regular.woff2'
];

coreFonts.forEach(fontName => {
  const fontPath = resolve(path.join('fonts', fontName));
  if (fs.existsSync(fontPath)) {
    const b64 = fs.readFileSync(fontPath).toString('base64');
    const regex = new RegExp(`url\\(fonts\\/${fontName}\\)`, 'g');
    katexCss = katexCss.replace(regex, `url('data:font/woff2;base64,${b64}')`);
  }
});

// CDN fallback for non-inlined secondary fonts
katexCss = katexCss.replace(/url\(fonts\//g, 'url(https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/fonts/');

let katexJs = fs.readFileSync(resolve('katex.min.js'), 'utf8');
let autoRenderJs = fs.readFileSync(resolve('auto-render.min.js'), 'utf8');
let mathEngineJs = fs.readFileSync(resolve('math_engine.js'), 'utf8');
let visualsJs = fs.readFileSync(resolve('visuals.js'), 'utf8');
let solversJs = fs.readFileSync(resolve('solvers.js'), 'utf8');
let dataJs = fs.readFileSync(resolve('data.js'), 'utf8');
let qbJs = fs.readFileSync(resolve('question_bank.js'), 'utf8');
let appJs = fs.readFileSync(resolve('app.js'), 'utf8');

// Replace CSS links with inlined style
const combinedCss = `<style>\n${katexCss}\n\n${css}\n</style>`;
html = html.replace(/<link rel="stylesheet" href="katex\.min\.css" \/>\s*<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?" \/>/, () => combinedCss);

// Remove external script tags in head
html = html.replace(/<script src="katex\.min\.js"><\/script>\s*<script src="auto-render\.min\.js"><\/script>/, '');

// Replace bottom scripts with inlined scripts
const combinedScripts = `
  <script>
${katexJs}
  </script>
  <script>
${autoRenderJs}
  </script>
  <script>
${mathEngineJs}
  </script>
  <script>
${visualsJs}
  </script>
  <script>
${solversJs}
  </script>
  <script>
${dataJs}
  </script>
  <script>
${qbJs}
  </script>
  <script>
${appJs}
  </script>
`;

html = html.replace(
  /<script src="math_engine\.js"><\/script>\s*<script src="visuals\.js"><\/script>\s*<script src="solvers\.js"><\/script>\s*<script src="data\.js"><\/script>\s*<script src="question_bank\.js"><\/script>\s*<script src="app\.js(?:\?[^"]*)?"><\/script>/,
  () => combinedScripts
);

const outPath = resolve('standalone.html');
fs.writeFileSync(outPath, html, 'utf8');
const stats = fs.statSync(outPath);
console.log(`Successfully generated standalone.html! (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
