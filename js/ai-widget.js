(function () {
  function initWidgetLogic() {
    const widget = document.getElementById('ai_widget');
    const panel = document.getElementById('aigc-also-ask');
    const closeBtn = panel?.querySelector('.close');
    if (!widget || !panel || !closeBtn) return false;

    panel.classList.remove('active');
    widget.classList.remove('hidden');

    
    let hasShown = false;
    let userInteracted = false;
    const triggerOffset = 600;

    function checkPosition() {
      if (hasShown) return;

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const scrollable = document.body.scrollHeight > window.innerHeight;

      console.log('[ai-widget] scrollTop:', scrollTop, 'scrollable:', scrollable);

      if ((userInteracted && scrollTop > triggerOffset) || !scrollable) {
        widget.classList.add('visible');
        widget.classList.remove('hidden');
        hasShown = true;
        window.removeEventListener('scroll', checkPosition);
      }
    }

    window.addEventListener('scroll', () => {
      if (!userInteracted) userInteracted = true;
      checkPosition();
    });

    let forceFallback = 0;
    const fallbackInterval = setInterval(() => {
      if (hasShown) return clearInterval(fallbackInterval);
      forceFallback++;
      checkPosition();
      if (forceFallback > 20) clearInterval(fallbackInterval);
    }, 500);


    widget.addEventListener('click', () => {
      widget.classList.add('hidden');
      panel.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
      widget.classList.remove('hidden');
    });

    setTimeout(() => {
      if (!hasShown) checkPosition();
    }, 1000);

    return true;
  }

  function waitForMount(retry = 0) {
    if (initWidgetLogic()) return;
    if (retry > 20) return;
    setTimeout(() => waitForMount(retry + 1), 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    waitForMount();
  });
})();