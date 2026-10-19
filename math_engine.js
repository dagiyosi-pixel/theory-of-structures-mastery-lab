// COTM 3101: Theory of Structures - Mathematical Rendering & KaTeX Engine
// Provides high-contrast, publication-grade math rendering with graceful offline fallbacks.

function formatFormula(latex, isDisplay = true) {
  if (!latex) return '';
  const clean = latex.trim();
  if (typeof katex !== 'undefined') {
    try {
      return katex.renderToString(clean, {
        displayMode: isDisplay,
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
    }
  }
  return '<span class="fallback-math ' + (isDisplay ? 'math-display' : 'math-inline') + '">' + renderFallbackMath(clean, isDisplay) + '</span>';
}

function renderFallbackMath(latex, isDisplay = false) {
  if (!latex) return '';
  let s = latex;

  // Replace common LaTeX symbols with Unicode
  s = s.replace(/\\theta/g, 'θ')
       .replace(/\\alpha/g, 'α')
       .replace(/\\Delta/g, 'Δ')
       .replace(/\\delta/g, 'δ')
       .replace(/\\Sigma/g, 'Σ')
       .replace(/\\sum/g, '∑')
       .replace(/\\int/g, '∫')
       .replace(/\\iint/g, '∬')
       .replace(/\\cdot/g, ' · ')
       .replace(/\\times/g, ' × ')
       .replace(/\\approx/g, ' ≈ ')
       .replace(/\\le/g, ' ≤ ')
       .replace(/\\ge/g, ' ≥ ')
       .replace(/\\ne/g, ' ≠ ')
       .replace(/\\infty/g, ' ∞ ')
       .replace(/\\pm/g, ' ± ')
       .replace(/\\implies/g, ' ⟹ ')
       .replace(/\\iff/g, ' ⟺ ')
       .replace(/\\quad/g, '&emsp;')
       .replace(/\\,/g, ' ');

  // Handle \frac{num}{den}
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="m-frac"><span class="m-num">$1</span><span class="m-den">$2</span></span>');
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="m-frac"><span class="m-num">$1</span><span class="m-den">$2</span></span>');

  // Handle \bar{x}
  s = s.replace(/\\bar\{([^}]+)\}/g, '<span class="m-bar">$1</span>');

  // Handle subscripts and superscripts
  s = s.replace(/_\{([^}]+)\}/g, '<span class="m-sub">$1</span>');
  s = s.replace(/_([a-zA-Z0-9+\-]+)/g, '<span class="m-sub">$1</span>');
  s = s.replace(/\^\{([^}]+)\}/g, '<span class="m-sup">$1</span>');
  s = s.replace(/\^([a-zA-Z0-9+\-]+)/g, '<span class="m-sup">$1</span>');

  // Clean remaining braces and commands
  s = s.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
       .replace(/\\left\[/g, '[').replace(/\\right\]/g, ']')
       .replace(/\\left\\\{/g, '{').replace(/\\right\\\}/g, '}')
       .replace(/\\text\{([^}]+)\}/g, '<span class="m-text">$1</span>')
       .replace(/[{}]/g, '');

  return s;
}

function renderMathInDOM(root) {
  const container = root || document.getElementById('viewport') || document.body;
  if (typeof renderMathInElement !== 'undefined') {
    try {
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        throwOnError: false
      });
    } catch (e) {
      console.warn('Auto-render error:', e);
    }
  }
}

function copyFormulaLatex(encoded, btn) {
  const text = decodeURIComponent(encoded);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied! ✓';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = '📋 Copy LaTeX';
        btn.classList.remove('copied');
      }, 2000);
    });
  } else {
    prompt('Copy LaTeX formula:', text);
  }
}
