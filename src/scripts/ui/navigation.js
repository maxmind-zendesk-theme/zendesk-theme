document.addEventListener('DOMContentLoaded', () => {
  const $headerCheckbox = document.getElementById('header-checkbox');
  const $sidebar = document.querySelector('.header-sidebar');
  const $mainWrapper = document.querySelector('.main-wrapper');
  const $navCategoryHeaders = document.querySelectorAll('.nav-category-header');

  $navCategoryHeaders.forEach(navDropdown => {
    navDropdown.addEventListener('click', () => {
      navDropdown.parentElement.classList.toggle('is-open');
      navDropdown.parentElement.classList.toggle('is-closed');

      if (navDropdown.parentElement.getAttribute('aria-expanded') === 'false') {
        navDropdown.parentElement.setAttribute('aria-expanded', 'true');
      } else if (navDropdown.parentElement.getAttribute('aria-expanded') === 'true') {
        navDropdown.parentElement.setAttribute('aria-expanded', 'false');
      }
    });

    navDropdown.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        navDropdown.click();
      }
    });
  });

  const $headerSearch = document.querySelector('.header-search > .search');
  const $headerSearchBtn = document.querySelector('.search-mobile-btn');
  const $headerSearchQuery = document.querySelector('.header-search > .search > #query');

  function headerCheckboxToggle () {
    $headerCheckbox.classList.toggle('closed');
    $headerCheckbox.classList.toggle('open');

    $mainWrapper.classList.contains('blur-background')
      ? $mainWrapper.classList.remove('blur-background')
      : $mainWrapper.classList.add('blur-background');

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
