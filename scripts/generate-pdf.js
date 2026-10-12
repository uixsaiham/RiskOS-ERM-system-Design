import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const mdPath = path.join(rootDir, 'docs', 'RISKOS_SYSTEM_DOCUMENTATION.md')
const htmlPath = path.join(rootDir, 'docs', 'temp_doc_for_pdf.html')
const pdfPath = path.join(rootDir, 'docs', 'RiskOS_System_Documentation.pdf')

console.log('Reading markdown documentation...')
const markdownContent = fs.readFileSync(mdPath, 'utf8')

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
})

const htmlBody = marked.parse(markdownContent)

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RiskOS — Comprehensive Enterprise System Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <style>
    @page {
      size: A4 portrait;
      margin: 16mm 14mm 16mm 14mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.55;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }

    /* Cover / Header section */
    .doc-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .doc-badge {
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 8.5pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }

    h1 {
      font-size: 24pt;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      margin: 0 0 10px 0;
      line-height: 1.15;
    }

    h2 {
      font-size: 15pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 36px;
      margin-bottom: 14px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 12pt;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #1e293b;
      margin-top: 24px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    h4 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #334155;
      margin-top: 16px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }

    p {
      margin-top: 0;
      margin-bottom: 10px;
      color: #334155;
    }

    strong {
      color: #0f172a;
      font-weight: 600;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5pt;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 4px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      background: #f8fafc;
      color: #0f172a;
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      overflow-x: auto;
      margin-bottom: 14px;
      line-height: 1.45;
      page-break-inside: avoid;
    }

    pre code {
      background: transparent;
      padding: 0;
      border: none;
      font-size: inherit;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    th {
      background-color: #f8fafc;
      color: #475569;
      font-weight: 600;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      border-bottom: 2px solid #94a3b8;
    }

    td {
      padding: 7px 10px;
      border: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background-color: #fcfdfe;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 20px;
      color: #334155;
    }

    li {
      margin-bottom: 4px;
    }

    blockquote {
      margin: 12px 0;
      padding: 8px 14px;
      background: #f8fafc;
      border-left: 3px solid #3b82f6;
      border-radius: 0 6px 6px 0;
      color: #475569;
      font-size: 9pt;
    }

    /* Mermaid diagrams container */
    .mermaid {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      margin: 14px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 24px 0;
    }

    /* Page break helpers */
    .page-break {
      page-break-before: always;
    }

    /* Footer styling */
    .doc-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      margin-top: 30px;
      font-size: 8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="content">
    ${htmlBody}
  </div>

  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      themeVariables: {
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif'
      }
    });

    // Replace <pre><code class="language-mermaid"> with <div class="mermaid">
    document.querySelectorAll('pre code.language-mermaid').forEach(function(el) {
      var pre = el.parentElement;
      var div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = el.textContent;
      pre.parentElement.replaceChild(div, pre);
    });
  </script>
</body>
</html>`

fs.writeFileSync(htmlPath, fullHtml, 'utf8')
console.log('Generated styled HTML at:', htmlPath)

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

console.log('Rendering to PDF using Google Chrome...')
const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=9000 --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${htmlPath}"`

try {
  execSync(cmd, { stdio: 'inherit' })
  console.log('✅ PDF generated successfully at:', pdfPath)
  // Remove temporary HTML file
  fs.unlinkSync(htmlPath)
} catch (err) {
  console.error('Error rendering PDF:', err)
  process.exit(1)
}

