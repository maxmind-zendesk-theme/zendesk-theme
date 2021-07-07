document.addEventListener('DOMContentLoaded', () => {
  // Key map
  const ENTER = 13;
  const ESCAPE = 27;
  const SPACE = 32;
  const UP = 38;
  const DOWN = 40;
  const TAB = 9;

  function Dropdown (toggle, menu) {
    this.toggle = toggle;
    this.menu = menu;

    this.menuPlacement = {
      end: menu.classList.contains('dropdown-menu-end'),
      top: menu.classList.contains('dropdown-menu-top'),
    };

    this.toggle.addEventListener('click', this.clickHandler.bind(this));
    this.toggle.addEventListener('keydown', this.toggleKeyHandler.bind(this));
    this.menu.addEventListener('keydown', this.menuKeyHandler.bind(this));
  }

  Dropdown.prototype = {

    clickHandler: function () {
      if (this.isExpanded) {
        this.dismiss();
      } else {
        this.open();
      }
    },

    dismiss: function () {
      if (!this.isExpanded) return;

      this.menu.setAttribute('aria-expanded', false);
      this.menu.classList.remove('dropdown-menu-end', 'dropdown-menu-top');
    },

    focusNextMenuItem: function (currentItem) {
      if (!this.menuItems.length) return;

      const currentIndex = this.menuItems.indexOf(currentItem);
      const nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;

      // eslint-disable-next-line security/detect-object-injection
      this.menuItems[nextIndex].focus();
    },

    focusPreviousMenuItem: function (currentItem) {
      if (!this.menuItems.length) return;

      const currentIndex = this.menuItems.indexOf(currentItem);
      const previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

      // eslint-disable-next-line security/detect-object-injection
      this.menuItems[previousIndex].focus();
    },

    handleOverflow: function () {
      const rect = this.menu.getBoundingClientRect();

      const overflow = {
        bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight,
        right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
      };

      if (overflow.right || this.menuPlacement.end) {
        this.menu.classList.add('dropdown-menu-end');
      }

      if (overflow.bottom || this.menuPlacement.top) {
        this.menu.classList.add('dropdown-menu-top');
      }

      if (this.menu.getBoundingClientRect().top < 0) {
        this.menu.classList.remove('dropdown-menu-top');
      }
    },

    get isExpanded () {
      return this.menu.getAttribute('aria-expanded') === 'true';
    },

    get menuItems () {
      return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
    },

    menuKeyHandler: function (e) {
      const firstItem = this.menuItems[0];
      const lastItem = this.menuItems[this.menuItems.length - 1];
      const currentElement = e.target;

      switch (e.keyCode) {
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
        case DOWN:
          e.preventDefault();
          this.focusNextMenuItem(currentElement);
          break;
        case UP:
          e.preventDefault();
          this.focusPreviousMenuItem(currentElement);
          break;
        case TAB:
          if (e.shiftKey) {
            if (currentElement === firstItem) {
              this.dismiss();
            } else {
              e.preventDefault();
              this.focusPreviousMenuItem(currentElement);
            }
          } else if (currentElement === lastItem) {
            this.dismiss();
          } else {
            e.preventDefault();
            this.focusNextMenuItem(currentElement);
          }
          break;
        case ENTER:
        case SPACE:
          e.preventDefault();
          currentElement.click();
          break;
      }
    },

    open: function () {
      if (this.isExpanded) return;

      this.menu.setAttribute('aria-expanded', true);
      this.handleOverflow();
    },

    toggleKeyHandler: function (e) {
      switch (e.keyCode) {
        case ENTER:
        case SPACE:
        case DOWN:
          e.preventDefault();
          this.open();
          this.focusNextMenuItem();
          break;
        case UP:
          e.preventDefault();
          this.open();
          this.focusPreviousMenuItem();
          break;
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
      }
    },
  };

  const dropdowns = [];
  const dropdownToggles = Array.prototype.slice.call(document.querySelectorAll('.dropdown-toggle'));

  dropdownToggles.forEach(function (toggle) {
    const menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains('dropdown-menu')) {
      dropdowns.push(new Dropdown(toggle, menu));
    }
  });

  document.addEventListener('click', function (evt) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.toggle.contains(evt.target)) {
        dropdown.dismiss();
      }
    });
  });
});
