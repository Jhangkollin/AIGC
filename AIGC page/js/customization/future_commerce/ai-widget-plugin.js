(function () {
  function loadCSS(href, callback) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => callback && callback();
    link.onerror = () => console.warn('CSS load failed:', href);
    document.head.appendChild(link);
  }

  function injectWidgetHTML() {
    const trigger = document.createElement('div');
    trigger.id = 'ai_widget';
    trigger.classList.add('hidden');
    trigger.innerHTML = '<img src="../img/customization/future_commerce/widget_icon_fc.svg" width="28px" height="28px" alt="ai-widget">';
    document.body.appendChild(trigger);

    const panel = document.createElement('div');
    panel.id = 'aigc-also-ask';
    panel.setAttribute('data-uuid', '1e90c935-a90f-4b5c-ae1d-92b35c86ce81');
    panel.innerHTML = `
      <div class="head">
        <div class="logo">
          <img src="../img/customization/future_commerce/fc_ai_icon.svg" width="18px" height="18px" alt="ai-widget">
          <p>你想知道哪些？AI來解答：</p>
        </div>
        <div class="close">
          <img src="../img/customization/future_commerce/close_small.svg" width="28px" height="28px" alt="hide widget">
        </div>
      </div>
      <div class="question-title">關於這篇文章，你可能還想知道</div>
      <ul>
        <li>
          <a class="question-link" href="https://ai.mlyticsaigc.com/..." target="_blank">
            <span class="question-text">在全球化的背景下，人才和資金的流動如何影響各國的經濟政策和移民政策？</span>
            <span><img src="../img/call_made.svg" width="16px" height="16px" alt="link"></span>
          </a>
        </li>
         <li>
            <a class="question-link" href="https://ai.mlyticsaigc.com/..." target="_blank">
              <span class="question-text">在美國，那些通過工作簽證或綠卡來的外籍勞工，如何在法律身份、文化認同和職場權益間尋求平衡？</span>
              <span><img src="../img/call_made.svg" width="16px" height="16px" alt="link"></span>
            </a>
          </li>
          <li>
            <a class="question-link" href="https://ai.mlyticsaigc.com/answer.html?u=https://www.mlytics.com/blog/how-can-ai-optimize-digital-assets-for-media-in-southeast-asia/&amp;t=What are the most significant challenges that Southeast Asian media companies face when implementing AI for digital asset management, and how can these be mitigated?" target="_blank">
              <span class="question-text">「美國夢」這個概念對於外籍勞工來說意味著什麼？   </span>
              <span><img src="../img/call_made.svg" width="16px" height="16px" alt="link"/></span>
            </a>
          </li>
          <li>
            <a class="question-link" href="https://ai.mlyticsaigc.com/answer.html?u=https://www.mlytics.com/blog/how-can-ai-optimize-digital-assets-for-media-in-southeast-asia/&amp;t=How does AI-powered metadata enrichment improve the searchability and organization of large digital asset libraries for media companies?" target="_blank">
              <span class="question-text">在推動職場多元化和包容性的同時，如何確保這些政策不會被濫用或誤解，進而導致對某些群體（如外籍勞工）的剝削？    </span>
              <span><img src="../img/call_made.svg" width="16px" height="16px" alt="link"/></span>
            </a>
          </li>
          <li>
            <a class="question-link" href="https://ai.mlyticsaigc.com/answer.html?u=https://www.mlytics.com/blog/how-can-ai-optimize-digital-assets-for-media-in-southeast-asia/&amp;t=What are the most significant challenges that Southeast Asian media companies face when implementing AI for digital asset management, and how can these be mitigated?" target="_blank">
              <span class="question-text">「美國夢」這個概念對於外籍勞工來說意味著什麼？   </span>
              <span><img src="../img/call_made.svg" width="16px" height="16px" alt="link"/></span>
            </a>
          </li>
      </ul>
    `;
    document.body.appendChild(panel);
  }

  function initWidget() {
    const widget = document.getElementById('ai_widget');
    const panel = document.getElementById('aigc-also-ask');
    const closeBtn = panel?.querySelector('.close');
    if (!widget || !panel || !closeBtn) return false;

    
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
    if (initWidget()) return;
    if (retry > 20) return;
    setTimeout(() => waitForMount(retry + 1), 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadCSS('../css/widget.css', () => {
      injectWidgetHTML();
      waitForMount();
    });
  });
})();