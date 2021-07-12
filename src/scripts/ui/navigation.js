document.addEventListener('DOMContentLoaded', () => {
  const $headerCheckbox = document.getElementById('header-checkbox');

  $headerCheckbox.addEventListener('click', () => {
    $headerCheckbox.classList.toggle('closed');
    $headerCheckbox.classList.toggle('open');
  });
});
