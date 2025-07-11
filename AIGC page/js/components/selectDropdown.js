document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const menu = select.querySelector('.select-menu');
    const items = menu.querySelectorAll('li');

    trigger.addEventListener('click', () => {
      const isOpen = menu.classList.contains('active');
      closeAllMenus();
      if (!isOpen) {
        menu.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        select.setAttribute('data-open', 'true');
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        const label = item.textContent;
        trigger.querySelector('.select-label').textContent = label;
        select.dataset.selected = value;
        menu.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        select.removeAttribute('data-open');
        console.log('選擇了：', value);
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) closeAllMenus();
  });

  function closeAllMenus() {
    document.querySelectorAll('.select-menu.active').forEach(menu => {
      menu.classList.remove('active');
    });
    document.querySelectorAll('.select-trigger[aria-expanded="true"]').forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.custom-select[data-open="true"]').forEach(select => {
      select.removeAttribute('data-open');
    });
  }
});
