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

passwordInput.addEventListener('input', () => {
  const pwd = passwordInput.value;
  hintList.forEach((li) => {
    const rule = li.dataset.rule;
    if (ruleMap[rule]?.test(pwd)) {
      li.classList.add('valid');
      li.classList.remove('invalid');
    } else {
      li.classList.remove('valid');
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

    if (pwd === "") {
      li.classList.remove('valid', 'invalid');
      return;
    }

    if (ruleMap[rule]?.test(pwd)) {
      li.classList.add('valid');
      li.classList.remove('invalid');
    } else {
      li.classList.remove('valid');
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

    toggleIcon.src = isPassword
      ? '../img/onboarding/visibility_off.svg'
      : '../img/onboarding/visibility.svg';
    toggleIcon.alt = isPassword ? 'hide password' : 'show password';
  });
});
