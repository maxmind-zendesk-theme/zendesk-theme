
document.addEventListener('DOMContentLoaded', () => {
  const $publicCategoriesSection = document.querySelector('.categories-section--public');
  const $privateCategoriesSection = document.querySelector('.categories-section--private');
  const $toggleBtn = document.querySelector('.categories-toggle-btn');

  const privateBtn = 'Switch to Private';
  const publicBtn = 'Switch to Public';

  function showPublicCategories () {
    sessionStorage.setItem('toggle', 'showingPublic');
    $publicCategoriesSection.classList.add('active');
    $privateCategoriesSection.classList.remove('active');
    $toggleBtn.innerText = privateBtn;
  }

  function showPrivateCategories () {
    sessionStorage.setItem('toggle', 'showingPrivate');
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

    console.log(sessionStorage);
  }

  function showVisibleCategories () {
    if ($toggleBtn.innerText === privateBtn && sessionStorage.getItem('toggle') === 'showingPrivate') {
      showPublicCategories();
    } else if ($toggleBtn.innerText === publicBtn && sessionStorage.getItem('toggle') === 'showingPublic') {
      showPrivateCategories();
    }

    if (sessionStorage.getItem('toggle') === 'showingPublic') {
      showPrivateCategories();
    } else if (sessionStorage.getItem('toggle') === 'showingPrivate') {
      showPublicCategories();
    }

    console.log(sessionStorage);
  }

  $toggleBtn.addEventListener('click', showVisibleCategories);
});
