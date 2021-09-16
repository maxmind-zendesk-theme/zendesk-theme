document.addEventListener('DOMContentLoaded', () => {
  const $publicCategoriesSection = document.querySelector('.categories-section--public');
  const $privateCategoriesSection = document.querySelector('.categories-section--private');
  const $toggleBtn = document.querySelector('.categories-toggle-btn');

  function showVisibleCategories () {
    if ($toggleBtn.innerText === 'Switch to Private') {
      $publicCategoriesSection.classList.remove('active');
      $privateCategoriesSection.classList.add('active');
      $toggleBtn.innerText = 'Switch to Public';
    } else if ($toggleBtn.innerText === 'Switch to Public') {
      $publicCategoriesSection.classList.add('active');
      $privateCategoriesSection.classList.remove('active');
      $toggleBtn.innerText = 'Switch to Private';
    }
  }

  $toggleBtn.addEventListener('click', showVisibleCategories);
});
