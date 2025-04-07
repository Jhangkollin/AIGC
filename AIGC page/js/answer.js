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




