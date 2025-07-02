// 密碼驗證回饋
const passwordInput = document.getElementById('password');
const hintList = document.querySelectorAll('.password-hint li');

const ruleMap = {
  length: /.{8,}/,
  lower: /[a-z]/,
  upper: /[A-Z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

// 即時檢查
passwordInput.addEventListener('input', () => {
  const pwd = passwordInput.value;
  hintList.forEach((li) => {
    const rule = li.dataset.rule;
    if (ruleMap[rule]?.test(pwd)) {
      li.classList.add('valid');
      li.classList.remove('invalid');
    } else {
      li.classList.remove('valid');
      // 不主動加 invalid，避免干擾使用者輸入時的體驗
    }
  });
});

// 提交驗證（強制標示錯誤）
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;

  if (!email || !password) return;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // 可以加個紅框提示，不使用 alert
    return;
  }

  let allPassed = true;

  hintList.forEach((li) => {
    const rule = li.dataset.rule;
    if (!ruleMap[rule].test(password)) {
      li.classList.remove('valid');
      li.classList.add('invalid');
      allPassed = false;
    }
  });
});

// 當密碼欄位清空還原未驗證狀態
passwordInput.addEventListener('input', () => {
  const pwd = passwordInput.value;

  hintList.forEach((li) => {
    const rule = li.dataset.rule;

    // 若密碼欄位清空，移除所有 .valid/.invalid 狀態
    if (pwd === "") {
      li.classList.remove('valid', 'invalid');
      return;
    }

    // 即時比對規則
    if (ruleMap[rule]?.test(pwd)) {
      li.classList.add('valid');
      li.classList.remove('invalid');
    } else {
      li.classList.remove('valid');
      // 保持干淨輸入體驗：不主動加 invalid
    }
  });
});

// 顯示/隱藏密碼
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const toggleIcon = passwordInput?.nextElementSibling;

  if (!passwordInput || !toggleIcon) return;

  toggleIcon.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    // 圖示切換：自行準備對應 SVG 路徑
    toggleIcon.src = isPassword
      ? '../img/onboarding/visibility_off.svg'
      : '../img/onboarding/visibility.svg';
    toggleIcon.alt = isPassword ? 'hide password' : 'show password';
  });
});
