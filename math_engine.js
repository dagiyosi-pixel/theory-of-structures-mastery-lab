// COTM 3101: Theory of Structures - Mathematical Rendering & KaTeX Engine
// Provides high-contrast, publication-grade math rendering with graceful offline fallbacks.

function cleanLatexFormula(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  if (s.startsWith('$$') && s.endsWith('$$')) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith('$') && s.endsWith('$')) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function formatFormula(latex, isDisplay = true) {
  if (!latex) return '';
  const clean = cleanLatexFormula(latex);
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

function formatStepFormulaText(text) {
  if (!text) return '';
  let str = String(text);
  // If string already has LaTeX delimiters, return as-is
  if (str.includes('$') || str.includes('\\(')) return str;

  // Enhance math characters for readability if math symbols exist
  str = str.replace(/∑\s*M_([A-Za-z0-9]+)/g, '$\\sum M_{$1}$')
           .replace(/∑\s*F_([xyz])/g, '$\\sum F_{$1}$')
           .replace(/R_([A-Za-z0-9]+)/g, '$R_{$1}$')
           .replace(/M_([A-Za-z0-9]{2})/g, '$M_{$1}$')
           .replace(/⟹/g, '&nbsp;$\\implies$&nbsp;')
           .replace(/·/g, ' $\\cdot$ ')
           .replace(/θ_([A-Za-z0-9]+)/g, '$\\theta_{$1}$')
           .replace(/Δ_([A-Za-z0-9]+)/g, '$\\Delta_{$1}$');
  return str;
}

function renderMathInDOM(root) {
  const container = root || document.getElementById('viewport') || document.body;
  if (!container) return;
  if (typeof renderMathInElement !== 'undefined') {
    try {
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
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
