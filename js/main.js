$(document).ready(function () {
  const $btn = $('.all-theme-button');
  const $menu = $('.fixed-menu');
  const $bg = $('.fixed-menu-bg');
  const $gamburger = $('.gamburger');
  const $tag_body = $('body');

  let isOpen = false;
  let closeTimeout;

  function openMenu() {
    clearTimeout(closeTimeout);
    $menu.addClass('active');
    $bg.addClass('active');
    $btn.addClass('active');
    $gamburger.addClass('active');
    $tag_body.addClass('no-scroll');
    isOpen = true;
  }

  function closeMenu() {
    $menu.removeClass('active');
    $bg.removeClass('active');
    $btn.removeClass('active');
    $gamburger.removeClass('active');
    $tag_body.removeClass('no-scroll');
    isOpen = false;
  }

function isDesktop() {
  return $(window).width() > 1200;
}

function isTablet() {
  return $(window).width() <= 1200 && $(window).width() > 550;
}

function isMobile() {
  return $(window).width() <= 600;
}

  // =========================
  // DESKTOP (hover)
  // =========================
  $btn.on('mouseenter', function () {
    if (isDesktop()) {
      openMenu();
    }
  });

  $btn.on('mouseleave', function () {
    if (isDesktop()) {
      closeTimeout = setTimeout(closeMenu, 200);
    }
  });

  $menu.on('mouseenter', function () {
    if (isDesktop()) {
      clearTimeout(closeTimeout);
    }
  });

  $menu.on('mouseleave', function () {
    if (isDesktop()) {
      closeTimeout = setTimeout(closeMenu, 200);
    }
  });

  // =========================
  // TABLET (click)
  // =========================
  $btn.on('click', function (e) {
    if (isTablet()) {
      e.preventDefault();
      isOpen ? closeMenu() : openMenu();
    }
  });

  // =========================
  // MOBILE (gamburger click)
  // =========================
  $gamburger.on('click', function (e) {
    if (isMobile()) {
      e.preventDefault();
      isOpen ? closeMenu() : openMenu();
    }
  });

  // =========================
  // КЛИК ВНЕ МЕНЮ
  // =========================
  $(document).on('click', function (e) {
    if (!isDesktop() && isOpen) {
      if (
        !$(e.target).closest('.fixed-menu, .all-theme-button, .gamburger').length
      ) {
        closeMenu();
      }
    }
  });

  // =========================
  // РЕСАЙЗ
  // =========================
  $(window).on('resize', function () {
    closeMenu(); // чтобы не было багов при смене режима
  });
});






















$(document).ready(function () {
  const $btn = $('.search-button');
  const $search = $('.fixed-search-module');
  const $bg = $('.fixed-search-bg');
  const $close = $('.fixed-search-module-close-button');
  const $tag_body = $('body');
  const $tag_header = $('header');

  let isOpen = false;
  let isInputFocused = false;

  function openSearch() {
    $search.addClass('active');
    $bg.addClass('active');
    $btn.addClass('active');
    $tag_body.addClass('no-scroll');
    $tag_header.addClass('no-click');
    isOpen = true;
  }

  function closeSearch() {
    $search.removeClass('active');
    $bg.removeClass('active');
    $btn.removeClass('active');
    $tag_body.removeClass('no-scroll');
    $tag_header.removeClass('no-click');
    isOpen = false;
  }

  // =========================
  // CLICK (ВСЕ УСТРОЙСТВА)
  // =========================
  $btn.on('click', function (e) {
    e.preventDefault();
    isOpen ? closeSearch() : openSearch();
  });

  // =========================
  // КНОПКА ЗАКРЫТИЯ
  // =========================
  $close.on('click', function () {
    closeSearch();
  });

  // =========================
  // КЛИК ВНЕ
  // =========================
  $(document).on('click', function (e) {
    if (isOpen) {
      if (
        !$(e.target).closest('.fixed-search-module, .search-button').length
      ) {
        closeSearch();
      }
    }
  });

  // =========================
  // INPUT (если вернёшь)
  // =========================
  $(document).on('focus', '.fixed-search-input', function () {
    isInputFocused = true;
  });

  $(document).on('blur', '.fixed-search-input', function () {
    isInputFocused = false;
  });

  // =========================
  // РЕСАЙЗ (фикс Android)
  // =========================
  $(window).on('resize', function () {
    if (isInputFocused) return;

    closeSearch();
  });
});














$(document).ready(function () {

  function isMobile() {
    return window.innerWidth < 600;
  }

  function initFooterAccordion() {
    $('.ftg-item').each(function () {
      const $item = $(this);
      const $title = $item.find('.ftg-item-name');
      const $list = $item.find('ul');

      if (isMobile()) {
        // прячем список
        $list.hide();
        $item.removeClass('active');
      } else {
        // показываем обратно
        $list.show();
        $item.removeClass('active');
      }
    });
  }

  // первый запуск
  initFooterAccordion();

  // клик
  $(document).on('click', '.ftg-item-name', function () {
    if (isMobile()) {
      const $item = $(this).closest('.ftg-item');
      const $list = $item.find('ul');

      $item.toggleClass('active');
      $list.stop(true, true).slideToggle(200);
    }
  });

  // resize (динамически)
  $(window).on('resize', function () {
    initFooterAccordion();
  });

});










$(document).ready(function () {

  const $directory = $('.directory-a');
  const $lang = $('.header-lang');
  const $target = $('.place-for-lang-mob');

  // запоминаем исходные места
  const $directoryParent = $directory.parent();
  const $directoryNext = $directory.next();

  const $langParent = $lang.parent();
  const $langNext = $lang.next();

  function isMobile() {
    return window.innerWidth <= 600;
  }

  function moveElements() {
    if (isMobile()) {
      // переносим в моб. контейнер
      if (!$directory.hasClass('moved')) {
        $target.append($directory);
        $directory.addClass('moved');
      }

      if (!$lang.hasClass('moved')) {
        $target.append($lang);
        $lang.addClass('moved');
      }

    } else {
      // возвращаем обратно

      if ($directory.hasClass('moved')) {
        if ($directoryNext.length) {
          $directoryNext.before($directory);
        } else {
          $directoryParent.append($directory);
        }
        $directory.removeClass('moved');
      }

      if ($lang.hasClass('moved')) {
        if ($langNext.length) {
          $langNext.before($lang);
        } else {
          $langParent.append($lang);
        }
        $lang.removeClass('moved');
      }
    }
  }

  // первый запуск
  moveElements();

  // при изменении экрана
  $(window).on('resize', function () {
    moveElements();
  });

});






let lastScroll = 0;
const header = document.querySelector('header');
const scrollThreshold = 10;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentScroll = window.scrollY;
  if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hide');
    document.body.classList.add('hide-header');
  } else {
    header.classList.remove('hide');
    document.body.classList.remove('hide-header');
  }
  lastScroll = currentScroll;
});

function openMenu() {
  isMenuOpen = true;
}

function closeMenu() {
  isMenuOpen = false;
  setTimeout(() => {
    lastScroll = window.scrollY;
  }, 50);
}

// ТOGGLE для кнопок (открыть/закрыть)
document.querySelectorAll('.search-button, .gamburger').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
});

// Закрытие по overlay и кнопкам × (остаётся как было)
document.querySelectorAll('.fixed-search-bg, .fixed-menu-bg').forEach(el => {
  el.addEventListener('click', closeMenu);
});
document.querySelectorAll('.fixed-search-close, .fixed-menu-close').forEach(btn => {
  btn.addEventListener('click', closeMenu);
});