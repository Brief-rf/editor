mermaid.initialize({ startOnLoad: false });

const renderer = new marked.Renderer();
renderer.code = function (code, language) {
  if ((code.match(/^sequenceDiagram/) || code.match(/^graph/)) && language.match(/^mermaid/)) {
    return `<div class="mermaid">${code}</div>`;
  }

  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return `<pre><code class="language-${validLanguage}">${code}</code></pre>`;
};

function renderMd(mdSourceEl, mdOutputEl) {
  mdOutputEl.innerHTML = marked(mdSourceEl.value, { renderer });
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
  document.querySelectorAll('.mermaid').forEach((block) => {
    try {
      mermaid.init(undefined, block);
    } catch (e) {
      block.innerHTML = '<p><span class="material-icons">warning</span>Error in Mermaid syntax</p>';
      block.classList.add('mermaid--error');
    }
  });
}
