document.addEventListener("DOMContentLoaded", () => {
  const pasteBtn = document.querySelector(".paste-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const urlInput = document.querySelector(".url-input");
  const hintText = document.querySelector(".hint-text");
  const generateBtn = document.querySelector(".generate-btn");
  const goBackBtn = document.querySelector(".go-back");
  const defaultSection = document.querySelector(".default");
  const resultSection = document.querySelector(".generate-result");
  const topicList = document.querySelector(".topic-list");
  const placeholders = topicList.querySelectorAll(".loading-placeholder");
  const topicLinks = topicList.querySelectorAll(".topic-link");

  function isValidURL(url) {
    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  function updateHintColor() {
    const value = urlInput.value.trim();
    hintText.style.color = value === "" || isValidURL(value) ? "" : "red";
  }

  function toggleClearBtn() {
    clearBtn.style.display = urlInput.value.trim() ? "inline-flex" : "none";
  }

  pasteBtn.addEventListener("click", async () => {
    let text = "";
    try {
      text = await navigator.clipboard.readText();

      if (!text) {
        throw new Error("剪貼簿是空的");
      }

      urlInput.value = text;
      toggleClearBtn();
      updateHintColor();

      // 顯示「已貼上」通知（需 HTTPS 或 localhost）
      if (Notification.permission === "granted") {
        const notification = new Notification("已貼上");
        setTimeout(() => notification.close(), 1000);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            const notification = new Notification("已貼上");
            setTimeout(() => notification.close(), 1000);
          }
        });
      }
    } catch (err) {
      console.error("讀取剪貼簿失敗：", err);
      if (!text) {
        alert("無法讀取剪貼簿內容，請手動貼上。");
      } else {
        // 若讀取成功但仍報錯，保留貼上內容並略過 alert
        urlInput.value = text;
        toggleClearBtn();
        updateHintColor();
      }
    }
  });

  urlInput.addEventListener("input", () => {
    toggleClearBtn();
    updateHintColor();
  });

  clearBtn.addEventListener("click", () => {
    urlInput.value = "";
    toggleClearBtn();
    updateHintColor();
    urlInput.focus();
  });

  generateBtn.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!isValidURL(url)) {
      updateHintColor();
      alert("請輸入正確的 URL 格式");
      return;
    }

    // 切換畫面
    defaultSection.style.display = "none";
    resultSection.style.display = "block";

    // 顯示 loading，隱藏主題與返回按鈕
    placeholders.forEach(p => p.style.display = "block");
    topicLinks.forEach(link => {
      link.classList.remove("show");
      link.style.display = "none";
    });
    goBackBtn.classList.remove("show");
    goBackBtn.style.display = "none";

    // 一秒後，顯示主題與按鈕
    setTimeout(() => {
      placeholders.forEach(p => p.style.display = "none");
      topicLinks.forEach(link => {
        link.style.display = "flex";
        requestAnimationFrame(() => {
          link.classList.add("show");
        });
      });
      goBackBtn.style.display = "flex";
      requestAnimationFrame(() => {
        goBackBtn.classList.add("show");
      });
    }, 1000);
  });

  goBackBtn.addEventListener("click", () => {
    resultSection.style.display = "none";
    defaultSection.style.display = "block";

    topicLinks.forEach(link => {
      link.classList.remove("show");
      link.style.display = "none";
    });

    goBackBtn.classList.remove("show");
    goBackBtn.style.display = "none";

    placeholders.forEach(p => p.style.display = "block");

    // 清空 input 並重設狀態
    urlInput.value = "";
    toggleClearBtn();
    updateHintColor();
  });

  // 初始化
  toggleClearBtn();
  updateHintColor();
});

// 文章資料庫下拉選單
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const selected = dropdown.querySelector(".dropdown__selected");
  const menu = dropdown.querySelector(".dropdown__menu");
  const items = dropdown.querySelectorAll(".dropdown__item");

  // 初始化：根據 data-value 設定 active 樣式（可選）
  const initialValue = selected.getAttribute("data-value");
  items.forEach(item => {
    if (item.getAttribute("data-value") === initialValue) {
      item.classList.add("active");
    }
  });

  // 點擊展開選單
  selected.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // 點選某個選項
  items.forEach(item => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent;
      selected.setAttribute("data-value", item.getAttribute("data-value"));

      // 標記目前選取項目
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      menu.classList.remove("active");
    });
  });

  // 點擊外部關閉選單
  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
});

