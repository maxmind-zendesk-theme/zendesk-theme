document.addEventListener('DOMContentLoaded', () => {
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });
});
