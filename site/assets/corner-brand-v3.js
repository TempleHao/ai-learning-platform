// Consistent, transparent Scheme 1 corner mark. Runs after legacy page scripts.
(() => {
  function mountCorner() {
    document.querySelectorAll('.global-corner-logo').forEach(node => node.remove());
    if (document.querySelector('.corner-brand-v3')) return;
    const link = document.createElement('a');
    link.className = 'corner-brand-v3';
    link.href = '/ai-learning-platform/';
    link.setAttribute('aria-label', '返回 AI Learning OS 首页');
    const img = document.createElement('img');
    img.src = '/ai-learning-platform/assets/brand/corner-scheme1-v3.webp';
    img.alt = '';
    img.width = 40;
    img.height = 36;
    img.decoding = 'async';
    link.appendChild(img);
    document.body.appendChild(link);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountCorner, { once: true });
  else mountCorner();
})();
