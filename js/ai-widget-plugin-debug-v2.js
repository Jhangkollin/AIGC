
(function () {
  let retries = 0;
  const maxRetries = 10;

  const debugLog = (msg) => console.log('[widget-debug]', msg);

  function injectWidgetHTML() {
    if (document.getElementById('ai_widget')) return;

    const widget = document.createElement('div');
    widget.id = 'ai_widget';
    widget.style.position = 'fixed';
    widget.style.right = '20px';
    widget.style.top = '50%';
    widget.style.transform = 'translateY(-50%)';
    widget.style.background = '#fff';
    widget.style.padding = '12px';
    widget.style.borderRadius = '12px';
    widget.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    widget.style.cursor = 'pointer';
    widget.style.transition = 'all 0.3s';
    widget.style.zIndex = '9999';
    widget.style.visibility = 'hidden';
    widget.style.opacity = '0';

    const icon = document.createElement('div');
    icon.innerText = '🤖 widget';
    widget.appendChild(icon);
    document.body.appendChild(widget);

    // debug overlay
    const debugBox = document.createElement('div');
    debugBox.style.position = 'fixed';
    debugBox.style.top = '10px';
    debugBox.style.right = '10px';
    debugBox.style.background = 'rgba(0,0,0,0.8)';
    debugBox.style.color = '#0f0';
    debugBox.style.fontSize = '12px';
    debugBox.style.padding = '6px 10px';
    debugBox.style.borderRadius = '6px';
    debugBox.style.zIndex = '10000';
    debugBox.style.fontFamily = 'monospace';
    debugBox.id = 'widget-debug-box';
    document.body.appendChild(debugBox);

    // manual trigger button
    const button = document.createElement('button');
    button.innerText = '顯示 widget';
    button.style.marginTop = '8px';
    button.style.padding = '4px 8px';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.background = '#0f0';
    button.style.color = '#000';
    button.style.cursor = 'pointer';
    button.onclick = () => showWidget(widget);
    debugBox.appendChild(button);

    return widget;
  }

  function showWidget(widget) {
    widget.classList.add('visible');
    widget.style.visibility = 'visible';
    widget.style.opacity = '1';
  }

  function updateDebugBox(widget, scrollY) {
    const box = document.getElementById('widget-debug-box');
    const visible = widget.classList.contains('visible');
    box.innerHTML = `[scrollY: ${scrollY}]<br>widget: ${visible ? '✅ VISIBLE' : '⛔ HIDDEN'}`;
  }

  function initWidgetScrollTrigger(widget) {
    let hasShown = false;

    function checkScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      updateDebugBox(widget, scrollTop);
      if (!hasShown && scrollTop > 300) {
        showWidget(widget);
        hasShown = true;
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
  }

  function waitForInject() {
    const widget = injectWidgetHTML();
    if (widget) {
      debugLog('✅ widget injected');
      initWidgetScrollTrigger(widget);
    } else {
      retries++;
      debugLog(`⏳ inject retry ${retries}`);
      if (retries < maxRetries) {
        setTimeout(waitForInject, 500);
      } else {
        debugLog('❌ failed to inject widget after 10 retries');
      }
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    waitForInject();
  } else {
    document.addEventListener('DOMContentLoaded', waitForInject);
  }
})();
