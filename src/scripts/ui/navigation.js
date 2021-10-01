document.addEventListener('DOMContentLoaded', () => {
  const $headerCheckbox = document.getElementById('header-checkbox');
  const $headerSearch = document.querySelector('.header-search > .search');
  const $headerSearchBtn = document.querySelector('.search-mobile-btn');
  const $headerSearchQuery = document.querySelector('.header-search > .search > #query');

  $headerCheckbox.addEventListener('click', () => {
    $headerCheckbox.classList.toggle('closed');
    $headerCheckbox.classList.toggle('open');
  });

  $headerSearchBtn.addEventListener('click', () => {
    $headerSearch.classList.add('search-mobile-open');
    $headerSearchQuery.focus();
  });
});
