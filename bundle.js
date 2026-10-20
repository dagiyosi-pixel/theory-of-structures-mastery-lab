// Single-file HTML Bundler for Theory of Structures Mastery Lab
// Inlines all CSS, JS, KaTeX engines, and course data into standalone.html.

const fs = require('fs');
const path = require('path');

console.log('Bundling standalone.html...');

let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('styles.css', 'utf8');
let katexCss = fs.readFileSync('katex.min.css', 'utf8');

// Update KaTeX font paths in standalone.html to CDN fallback so fonts load if online,
// while falling back to system serif (Times New Roman / Cambria Math) when offline.
katexCss = katexCss.replace(/url\(fonts\//g, 'url(https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/fonts/');

let katexJs = fs.readFileSync('katex.min.js', 'utf8');
let autoRenderJs = fs.readFileSync('auto-render.min.js', 'utf8');
let mathEngineJs = fs.readFileSync('math_engine.js', 'utf8');
let visualsJs = fs.readFileSync('visuals.js', 'utf8');
let solversJs = fs.readFileSync('solvers.js', 'utf8');
let dataJs = fs.readFileSync('data.js', 'utf8');
let appJs = fs.readFileSync('app.js', 'utf8');

// Replace CSS links with inlined style
const combinedCss = `<style>\n${katexCss}\n\n${css}\n</style>`;
html = html.replace(/<link rel="stylesheet" href="katex\.min\.css" \/>\s*<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?" \/>/, combinedCss);

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
${appJs}
  </script>
`;

html = html.replace(
  /<script src="math_engine\.js"><\/script>\s*<script src="visuals\.js"><\/script>\s*<script src="solvers\.js"><\/script>\s*<script src="data\.js"><\/script>\s*<script src="app\.js(?:\?[^"]*)?"><\/script>/,
  combinedScripts
);

fs.writeFileSync('standalone.html', html, 'utf8');
const stats = fs.statSync('standalone.html');
console.log(`Successfully generated standalone.html! (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
