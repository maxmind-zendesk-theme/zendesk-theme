document.addEventListener('DOMContentLoaded', () => {
  const $headerCheckbox = document.getElementById('header-checkbox');
  const $sidebar = document.querySelector('.header-sidebar');
  const $body = document.querySelector('body');

  const $navCategoryHeaders = document.querySelectorAll('.nav-category-header');

  $navCategoryHeaders.forEach(navDropdown => {
    navDropdown.addEventListener('click', () => {
      navDropdown.parentElement.classList.contains('is-open')
        ? navDropdown.parentElement.classList.remove('is-open')
        : navDropdown.parentElement.classList.add('is-open');

      navDropdown.parentElement.classList.contains('is-closed')
        ? navDropdown.parentElement.classList.remove('is-closed')
        : navDropdown.parentElement.classList.add('is-closed');
    });
  });

  const $headerSearch = document.querySelector('.header-search > .search');
  const $headerSearchBtn = document.querySelector('.search-mobile-btn');
  const $headerSearchQuery = document.querySelector('.header-search > .search > #query');

  function headerCheckboxToggle () {
    $headerCheckbox.classList.toggle('closed');
    $headerCheckbox.classList.toggle('open');

    $body.classList.contains('blur-background')
      ? $body.classList.remove('blur-background')
      : $body.classList.add('blur-background');

    $sidebar.classList.contains('header-sidebar-hidden')
      ? $sidebar.classList.remove('header-sidebar-hidden')
      : $sidebar.classList.add('header-sidebar-hidden');
  }

  $headerCheckbox.addEventListener('click', headerCheckboxToggle);

  $headerSearchBtn.addEventListener('click', () => {
    $headerSearch.classList.add('search-mobile-open');
    $headerSearchQuery.focus();
  });

  function searchMobileToggle () {
    if ($headerSearchQuery === document.activeElement) {
      $headerSearch.classList.add('search-mobile-open');
      $headerCheckbox.style.visibility = 'hidden';
      $headerSearchBtn.style.visibility = 'hidden';
    } else {
      $headerSearch.classList.remove('search-mobile-open');
      $headerCheckbox.style.visibility = 'visible';
      $headerSearchBtn.style.visibility = 'visible';
    }
  }

  document.body.addEventListener('click', searchMobileToggle);
});
