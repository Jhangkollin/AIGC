document.querySelectorAll('.article').forEach(article => {
	article.addEventListener('click', function() {
		// Remove 'active' class from all articles
		document.querySelectorAll('.article').forEach(a => a.classList.remove('active'));

		// Add 'active' class to the clicked article
		this.classList.add('active');
	});
});

document.addEventListener('DOMContentLoaded', function () {
	// 获取所有 .article 元素
	const articles = document.querySelectorAll('.first_chooice .article');

	// 遍历每个 .article 元素并绑定点击事件
	articles.forEach(function (article) {
		article.addEventListener('click', function () {
			// 获取文章标题
			const articleTitle = article.querySelector('h4').textContent;

			// 隐藏 .first_chooice
			const firstChoice = document.querySelector('.first_chooice');
			if (firstChoice) {
				firstChoice.style.display = 'none';
			}

			// 显示 .after_chooice
			const afterChoice = document.querySelectorAll('.after_chooice');
			afterChoice.forEach(function (choice) {
				choice.style.display = 'block';
			});

			// 更新 select 元素的内容
			const selectElement = document.querySelector('#options');
			if (selectElement) {
				// 创建一个新的 option 元素
				const newOption = document.createElement('option');
				newOption.value = articleTitle; // 使用文章标题作为值
				newOption.textContent = articleTitle; // 使用文章标题作为选项文本

				// 在 select 元素中添加这个新的 option
				selectElement.appendChild(newOption);

				// 使这个新选项成为选中的选项
				selectElement.value = articleTitle;
			}
		});
	});
});