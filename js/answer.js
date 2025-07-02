// 載入狀態
const loadingEl = document.querySelector('.loading-text');
let dotCount = 0;
const maxDots = 3;

setInterval(() => {
  dotCount = (dotCount + 1) % (maxDots + 1);
  loadingEl.setAttribute('data-dots', '.'.repeat(dotCount));
}, 150); // 每 500 毫秒變化一次
// ––––––––––––––––––––––––––––––––––

// 側邊欄開合
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector('.nav_toggle');
  const closeBtn = document.querySelector('.side_nav_close');
  const sideNav = document.querySelector('.side_nav');

  toggleBtn.addEventListener('click', () => {
    const isOpen = sideNav.classList.toggle('slide_open');

    // 如果側邊欄打開，隱藏按鈕
    if (isOpen) {
      toggleBtn.style.display = 'none';
    }
  });

  closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('slide_open');

    // 顯示回來按鈕
    toggleBtn.style.display = 'inline-block';
  });
});


// ––––––––––––––––––––––––––––––––––
// 資料來源左右滑動按鍵
document.addEventListener("DOMContentLoaded", function () {
  const frame = document.querySelector(".frame");
  const container = frame.querySelector(".data_source");
  const prevBtn = frame.querySelector(".prev_btn");
  const nextBtn = frame.querySelector(".next_btn");
  const card = container.querySelector(".data_card");

  const cardWidth = card.offsetWidth; // 滑動的距離
  const gap = parseInt(getComputedStyle(card).paddingLeft) * 2; // 內間距
  const scrollAmount = cardWidth + gap;

  function updateButtons() {
    // 檢查是否到頭或到底
    prevBtn.disabled = container.scrollLeft <= 0;
    nextBtn.disabled = container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1;
  }

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  container.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  updateButtons(); // 初始檢查
});

// ––––––––––––––––––––––––––––––––––

// icon 狀態切換
document.querySelectorAll('.clickable').forEach(function(clickable) {
  clickable.addEventListener('click', function() {
    var fillImages = clickable.querySelectorAll('.fill');
    
    fillImages.forEach(function(img) {
      // Toggle opacity between 0 and 1
      img.style.opacity = img.style.opacity === '1' ? '0' : '1';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Select all cancel buttons
  const cancelButtons = document.querySelectorAll('.cancel');
  
  // Loop through each cancel button
  cancelButtons.forEach(function(cancelButton) {
    // When a cancel button is clicked
    cancelButton.addEventListener('click', function() {
      // Find the closest .interactive element
      const interactiveElement = this.closest('.interactive');
      
      // Find the .fill image inside the .show_form within the same .interactive
      const fillImage = interactiveElement.querySelector('.show_form .fill');
      
      // Change the opacity of the .fill image to 0 (make it transparent)
      if (fillImage) {
        fillImage.style.opacity = '0';
      }
    });
  });
});

// 表單操作
document.querySelectorAll('.interactive').forEach(function(interactive) {
  // Find the show_form button and the cancel button
  const showFormButton = interactive.querySelector('.show_form');
  const cancelButton = interactive.querySelector('.cancel');
  const formContainer = interactive.querySelector('.form-container');
  
  // Toggle form visibility when clicking the show_form button
  if (showFormButton) {
    showFormButton.addEventListener('click', function() {
      // Toggle the form-container display between 'none' and 'block'
      if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
      } else {
        formContainer.style.display = 'none';
      }
    });
  }

  // Hide form when clicking the cancel button
  if (cancelButton) {
    cancelButton.addEventListener('click', function() {
      formContainer.style.display = 'none';
    });
  }
});

// ––––––––––––––––––––––––––––––––––

// 提交表單後處理（使用 AJAX 提交）
function submitForm(event) {
  event.preventDefault();  // 阻止表單的默認提交行為

  // 取得表單資料
  const formData = new FormData(document.querySelector('form'));

  // 使用 fetch 發送 POST 請求
  fetch('/submit-feedback', {  // 注意修改這裡的 URL 為你的後端處理路徑
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())  // 預期後端返回 JSON 格式的響應
  .then(data => {
    // 隱藏 .form-container
    formContainer.style.display = 'none';

    // 顯示 .submit_feedback 文字
    resultElement.style.display = 'block';
    
    // 設置提交後的結果文字
    resultElement.innerText = 'Thank you for your feedback.'; // 可以根據需要修改
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.history_section');
  if (!section) return;              // 尚待驗證：確定 DOM 存在

  // 建立媒體查詢物件
  const mq = window.matchMedia('(max-width: 440px)');

  // 切換函式：判斷符合或取消
  const toggleSideNav = (e) => {
    if (e.matches) {
      section.classList.add('side_nav');
    } else {
      section.classList.remove('side_nav');
    }
  };

  // ① 頁面首次載入即執行一次
  toggleSideNav(mq);
  // ② 監聽視窗尺寸變化
  mq.addEventListener('change', toggleSideNav);
});


// 打字機擬仿 AI 效果

const typingCharCount = 350; // 打字機動畫字數
const typingDuration = 3000; // 展示全文倒數秒數

// 複製 main_column
const original = document.querySelector('.main_column');
const clone = original.cloneNode(true);
const output = document.getElementById('output_column');
output.innerHTML = '';
output.appendChild(clone);

// 把 clone 內所有 text node 抽出來
function getTextNodes(node) {
  const textNodes = [];
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  return textNodes;
}

// 初始全部隱藏
function hideAllTextNodes(textNodes) {
  textNodes.forEach(node => {
    const span = document.createElement('span');
    span.textContent = node.textContent;
    span.style.visibility = 'hidden';
    node.parentNode.replaceChild(span, node);
  });
}

// 顯示前 N 字
function revealTextByTyping(textSpans, count, duration, callback) {
  const flatChars = [];
  textSpans.forEach(span => {
    const chars = span.textContent.split('').map(char => {
      const c = document.createElement('span');
      c.textContent = char;
      c.style.visibility = 'hidden';
      span.appendChild(c);
      return c;
    });
    span.textContent = '';
    chars.forEach(c => span.appendChild(c));
    flatChars.push(...chars);
  });

  const delay = duration / count;
  let i = 0;
  const interval = setInterval(() => {
    if (i < count && i < flatChars.length) {
      flatChars[i].style.visibility = 'visible';
      i++;
    } else {
      clearInterval(interval);
      callback(i);
    }
  }, delay);
}

// 顯示剩餘文字
function revealRemaining(flatChars, fromIndex) {
  for (let i = fromIndex; i < flatChars.length; i++) {
    flatChars[i].style.visibility = 'visible';
  }
}

// 動畫主流程
const spans = getTextNodes(clone);
hideAllTextNodes(spans);

const spanElems = Array.from(output.querySelectorAll('span'));
revealTextByTyping(spanElems, typingCharCount, typingDuration, (revealed) => {
  setTimeout(() => {
    revealRemaining(spanElems.flatMap(span => Array.from(span.childNodes)), revealed);
  }, 200); // 小延遲
});
