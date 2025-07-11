// Setup website –––––––––––––––––––––––––––––––––––––––––––––––––––––
// 即時檢查 AIGC page url 輸入字元是否符合規則
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[data-url-check]');
  const errorMsg = document.querySelector('.error-message');

  const validPattern = /^[a-zA-Z0-9\-._~]*$/;

  input.addEventListener('input', () => {
    const value = input.value;

    if (value === '' || validPattern.test(value)) {
      input.setCustomValidity('');
      errorMsg.style.display = 'none';
    } else {
      input.setCustomValidity('Only alphanumeric characters and - _ . ~ are allowed.');
      errorMsg.style.display = 'block';
    }
  });
});

// Install wideget –––––––––––––––––––––––––––––––––––––––––––––––––––––

document.addEventListener('DOMContentLoaded', () => {
  const codeBox = document.querySelector('#code-box');
  const expandBtn = document.querySelector('#toggle-expand');
  const copyBtn = document.querySelector('.copy');
  const copiedMsg = document.querySelector('.copied-msg');

  let isExpanded = false;

  // 切換展開/收起
  expandBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    codeBox.classList.toggle('expanded', isExpanded);
    expandBtn.textContent = isExpanded ? 'Collapse' : 'Expand';
  });

  // 複製到剪貼簿
  copyBtn.addEventListener('click', () => {
    const text = codeBox.innerText;

    navigator.clipboard.writeText(text).then(() => {
      // 顯示 Copied
      copiedMsg.style.display = 'block';

      // 自動隱藏 Copied 提示
      setTimeout(() => {
        copiedMsg.style.display = 'none';
      }, 1500); // 1.5 秒後消失
    }).catch(err => {
      console.error('❌ 複製失敗', err);
    });
  });

  // 驗證手動安裝的文字回饋
  const btn = document.querySelector('#check-install');
  const successMsg = document.querySelector('.v-success');
  const failMsg = document.querySelector('.v-fail');

  btn.addEventListener('click', () => {
    // ❗模擬安裝成功（之後可換成真實 API 回應判斷）
    successMsg.style.display = 'inline';
    failMsg.style.display = 'none';
  });
});

// Usage authorization –––––––––––––––––––––––––––––––––––––––––––––––––––––

document.addEventListener('DOMContentLoaded', () => {
  const checkboxIds = ['trial-1', 'trial-2', 'trial-3'];
  const nextBtn = document.getElementById('nextBtn');

  // 讀取 localStorage 並還原 checkbox 狀態
  checkboxIds.forEach(id => {
    const checkbox = document.getElementById(id);
    const stored = localStorage.getItem(id);
    if (stored === 'true') checkbox.checked = true;
  });

  updateNextBtn(); // ← 這行是重點！！

  // 綁定監聽器
  checkboxIds.forEach(id => {
    const checkbox = document.getElementById(id);
    checkbox.addEventListener('change', () => {
      localStorage.setItem(id, checkbox.checked);
      updateNextBtn();
    });
  });

  function updateNextBtn() {
    const allChecked = checkboxIds.every(id => {
      const checkbox = document.getElementById(id);
      return checkbox.checked;
    });

    if (allChecked) {
      nextBtn.removeAttribute('disabled');
    } else {
      nextBtn.setAttribute('disabled', 'true');
    }
  }
});

// Setup complete ––––––––––––––––––––––––––––––––––––––––––––––––––––––

// Custmize/ Default 切換
document.addEventListener('DOMContentLoaded', () => {
  const customizeBtn = document.querySelector('.button-group button');
  const setupPanel = document.querySelector('.setup-panel');
  const coverImg = document.querySelector('img.cover');

  customizeBtn.addEventListener('click', () => {
    const isPanelVisible = setupPanel.style.display === 'block';

    if (isPanelVisible) {
      setupPanel.style.display = 'none';
      coverImg.style.display = 'block';
      customizeBtn.textContent = 'Customize';
    } else {
      setupPanel.style.display = 'block';
      coverImg.style.display = 'none';
      customizeBtn.textContent = 'Save';
    }
  });

  setupPanel.style.display = 'none';
});

// 上傳文件呼叫視窗
function triggerUpload(type) {
  const input = document.querySelector(`input[data-type="${type}"]`);
  if (input) input.click();
}

// 顯示上傳預覽圖
function handleFilePreview(input) {
  const file = input.files[0];
  if (!file || !file.type.startsWith('image/')) return;

  const previewId = input.getAttribute('data-preview');
  if (!previewId) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;

    previewContainer.innerHTML = ''; // 清空原圖

    const img = document.createElement('img');
    img.src = e.target.result;
    img.alt = 'Preview';

    previewContainer.appendChild(img);
  };
  reader.readAsDataURL(file);
}

// 選取版面樣式切換對應示意圖片
document.querySelectorAll('.panel').forEach(panel => {
  const selections = panel.querySelectorAll('.selection');
  const images = panel.querySelectorAll('.sample-img img');

  selections.forEach(sel => {
    sel.addEventListener('click', () => {
      selections.forEach(s => s.classList.remove('selected'));
      sel.classList.add('selected');

      const index = parseInt(sel.dataset.index);

      images.forEach((img, i) => {
        img.style.display = (i === index) ? 'block' : 'none';
      });
    });
  });

  const defaultSel = panel.querySelector('.selection.selected');
  if (defaultSel) {
    const index = parseInt(defaultSel.dataset.index);
    images.forEach((img, i) => {
      img.style.display = (i === index) ? 'block' : 'none';
    });
  }
});

