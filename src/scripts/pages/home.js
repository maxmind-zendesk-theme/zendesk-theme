document.addEventListener('DOMContentLoaded', () => {
  const $publicCategoriesSection = document.querySelector('.categories-section--public');
  const $privateCategoriesSection = document.querySelector('.categories-section--private');
  const $toggleBtn = document.querySelector('.categories-toggle-btn');

  const privateBtn = 'Switch to Private';
  const publicBtn = 'Switch to Public';

  function showPublicCategories () {
    sessionStorage.setItem('toggle', 'showingPrivate');
    $publicCategoriesSection.classList.add('active');
    $privateCategoriesSection.classList.remove('active');
    $toggleBtn.innerText = privateBtn;
  }

  function showPrivateCategories () {
    sessionStorage.setItem('toggle', 'showingPublic');
    $publicCategoriesSection.classList.remove('active');
    $privateCategoriesSection.classList.add('active');
    $toggleBtn.innerText = publicBtn;
  }

  if (typeof (Storage) !== 'undefined') {
    if (sessionStorage.length === 0) {
      sessionStorage.setItem('toggle', 'showingPublic');
    } else {
      if (sessionStorage.getItem('toggle') === 'showingPublic') {
        showPublicCategories();
      } else if (sessionStorage.getItem('toggle') === 'showingPrivate') {
        showPrivateCategories();
      }
    }
  }

  function showVisibleCategories () {
    if ($toggleBtn.innerText === privateBtn) {
      showPublicCategories();
    } else if ($toggleBtn.innerText === publicBtn) {
      showPrivateCategories();
    }

    if (sessionStorage.getItem('toggle') === 'showingPublic') {
      showPublicCategories();
    } else if (sessionStorage.getItem('toggle') === 'showingPrivate') {
      showPrivateCategories();
    }
  }

  $toggleBtn.addEventListener('click', showVisibleCategories);
});
