// 資料來源無圖片
window.onload = function() {
  const images = document.querySelectorAll('img');

  images.forEach(function(img) {
    // 如果 img 的 src 为空，则替换为默认图片
    if (!img.src || img.src === '') {
      img.src = '../img/nopic.png';
    }
  });
}

// ––––––––––––––––––––––––––––––––––

document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('url');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');

  // 當按下送出按鈕時，隱藏送出按鈕，顯示清除按鈕
  submitBtn.addEventListener('click', function() {
    submitBtn.style.display = 'none';  // 隱藏送出按鈕
    resetBtn.style.display = 'inline-block';  // 顯示清除按鈕
  });

  // 當按下清除按鈕時，清空輸入框並隱藏清除按鈕，顯示送出按鈕
  resetBtn.addEventListener('click', function() {
    urlInput.value = '';  // 清空輸入框
    resetBtn.style.display = 'none';  // 隱藏清除按鈕
    submitBtn.style.display = 'inline-block';  // 顯示送出按鈕
  });
});

