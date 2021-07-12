document.addEventListener('DOMContentLoaded', () => {
  const $visibleCategoriesForm = document.querySelector('.categories-toggle__form');
  const $publicCategoriesSection = document.querySelector('.categories-section--public');
  const $privateCategoriesSection = document.querySelector('.categories-section--private');

  const toggleVisibleCaterories = () => {
    $publicCategoriesSection.classList.toggle('active');
    $privateCategoriesSection.classList.toggle('active');
  };

  $visibleCategoriesForm.addEventListener('change', toggleVisibleCaterories);
});
