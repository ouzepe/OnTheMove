/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/swiper/modules/a11y.mjs":
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/a11y.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ A11y)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");




function A11y({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: true,
      wrapperLiveRegion: true
    }
  });
  swiper.a11y = {
    clicked: false
  };
  let liveRegion = null;
  let preventFocusHandler;
  let focusTargetSlideEl;
  let visibilityChangedTimestamp = new Date().getTime();
  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(notification, message);
  }
  function getRandomNumber(size = 16) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el, role) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el, description) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElControls(el, controls) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-controls', controls);
    });
  }
  function addElLabel(el, label) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el, id) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el, live) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', true);
    });
  }
  function enableEl(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y;
    const targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
      const prevEls = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.navigation.prevEl);
      const nextEls = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.navigation.nextEl);
      if (nextEls.includes(targetEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (prevEls.includes(targetEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
    }
    if (swiper.pagination && targetEl.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    const params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach(bulletEl => {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bulletEl) + 1));
        }
      }
      if (bulletEl.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }
  const initNavEl = (el, wrapperId, message) => {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  const handlePointerDown = e => {
    if (focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target)) {
      preventFocusHandler = true;
    }
    swiper.a11y.clicked = true;
  };
  const handlePointerUp = () => {
    preventFocusHandler = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  const onVisibilityChange = e => {
    visibilityChangedTimestamp = new Date().getTime();
  };
  const handleFocus = e => {
    if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus) return;
    if (new Date().getTime() - visibilityChangedTimestamp < 100) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(swiper.getSlideIndexWhenGrid(parseInt(slideEl.getAttribute('data-swiper-slide-index'))), 0);
      } else {
        swiper.slideTo(swiper.getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0);
      }
      preventFocusHandler = false;
    });
  };
  const initSlides = () => {
    const params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    const slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach((slideEl, index) => {
        const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
        const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  const init = () => {
    const params = swiper.params.a11y;
    swiper.el.append(liveRegion);

    // Container
    const containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }
    if (params.containerRole) {
      addElRole(containerEl, params.containerRole);
    }

    // Wrapper
    const wrapperEl = swiper.wrapperEl;
    const wrapperId = params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`;
    addElId(wrapperEl, wrapperId);
    if (params.wrapperLiveRegion) {
      const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
      addElLive(wrapperEl, live);
    }

    // Slide
    initSlides();

    // Navigation
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(prevEl);
    if (nextEl) {
      nextEl.forEach(el => initNavEl(el, wrapperId, params.nextSlideMessage));
    }
    if (prevEl) {
      prevEl.forEach(el => initNavEl(el, wrapperId, params.prevSlideMessage));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.addEventListener('visibilitychange', onVisibilityChange);
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion) liveRegion.remove();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(prevEl);
    if (nextEl) {
      nextEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }
    if (prevEl) {
      prevEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    // Tab focus
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('focus', handleFocus, true);
      swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
      swiper.el.removeEventListener('pointerup', handlePointerUp, true);
    }
  }
  on('beforeInit', () => {
    liveRegion = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.c)('span', swiper.params.a11y.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
  });
  on('afterInit', () => {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/autoplay.css":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/autoplay.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/swiper/modules/autoplay.mjs":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/autoplay.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autoplay)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayTimeLeft;
  let autoplayStartTime = new Date().getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.find(slideEl => slideEl.classList.contains('swiper-slide-active'));
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
    return currentSlideDelay;
  };
  const run = delayForce => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };
  const start = () => {
    autoplayStartTime = new Date().getTime();
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit('autoplayStop');
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit('autoplayPause');
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };
  const onPointerEnter = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('pointerenter', onPointerEnter);
      swiper.el.removeEventListener('pointerleave', onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.addEventListener('visibilitychange', onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on('_freeModeStaticRelease', () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on('_freeModeNoMomentumRelease', () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on('touchEnd', () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on('slideChange', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/controller.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/controller.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
function Controller({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  swiper.controller = {
    control: undefined
  };
  function LinearSpline(x, y) {
    const binarySearch = function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    let i1;
    let i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t, byController) {
    const controlled = swiper.controller.control;
    let multiplier;
    let controlledTranslate;
    const Swiper = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;

      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }
      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    const Swiper = swiper.constructor;
    const controlled = swiper.controller.control;
    let i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.n)(() => {
            c.updateAutoHeight();
          });
        }
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(c.wrapperEl, () => {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', () => {
    if (typeof window !== 'undefined' && (
    // eslint-disable-line
    typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
      const controlElements = typeof swiper.params.controller.control === 'string' ? [...document.querySelectorAll(swiper.params.controller.control)] : [swiper.params.controller.control];
      controlElements.forEach(controlElement => {
        if (!swiper.controller.control) swiper.controller.control = [];
        if (controlElement && controlElement.swiper) {
          swiper.controller.control.push(controlElement.swiper);
        } else if (controlElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onControllerSwiper = e => {
            swiper.controller.control.push(e.detail[0]);
            swiper.update();
            controlElement.removeEventListener(eventName, onControllerSwiper);
          };
          controlElement.addEventListener(eventName, onControllerSwiper);
        }
      });
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', () => {
    removeSpline();
  });
  on('resize', () => {
    removeSpline();
  });
  on('observerUpdate', () => {
    removeSpline();
  });
  on('setTranslate', (_s, translate, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', (_s, duration, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate,
    setTransition
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-cards.mjs":
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cards.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCards)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectCards({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  const setTranslate = () => {
    const {
      slides,
      activeIndex,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = rtl ? -swiper.translate : swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;
      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${(params.rotate || swiper.isHorizontal() ? -25 : 0) * subProgress * Math.abs(progress)}%`;
      }
      if (progress < 0) {
        // next
        tX = `calc(${tX}px ${rtl ? '-' : '+'} (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        // prev
        tX = `calc(${tX}px ${rtl ? '-' : '+'} (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }
      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;

      /* eslint-disable */
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
      /* eslint-enable */

      if (params.slideShadows) {
        // Set shadows
        let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl) {
          shadowEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('cards', slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'cards',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      _loopSwapReset: false,
      watchSlidesProgress: true,
      loopAdditionalSlides: swiper.params.cardsEffect.rotate ? 3 : 2,
      centeredSlides: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-coverflow.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/effect-coverflow.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCoverflow)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");





function EffectCoverflow({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  const setTranslate = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    const r = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(swiper);
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i];
      const slideSize = slidesSizesGrid[i];
      const slideOffset = slideEl.swiperSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      let translateZ = -translate * Math.abs(offsetMultiplier);
      let stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${r(rotateX)}deg) rotateY(${r(rotateY)}deg) scale(${scale})`;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        let shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
        let shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
        if (!shadowBeforeEl) {
          shadowBeforeEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('coverflow', slideEl, isHorizontal ? 'left' : 'top');
        }
        if (!shadowAfterEl) {
          shadowAfterEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('coverflow', slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'coverflow',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-creative.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/swiper/modules/effect-creative.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCreative)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectCreative({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const getTranslateValue = value => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };
  const setTranslate = () => {
    const {
      slides,
      wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;
    const rotateFix = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.a)(swiper);
    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      const offset = slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      });
      // set rotates
      r.forEach((value, index) => {
        let val = data.rotate[index] * Math.abs(progress * multiplier);
        r[index] = val;
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const translateString = t.join(', ');
      const rotateString = `rotateX(${rotateFix(r[0])}deg) rotateY(${rotateFix(r[1])}deg) rotateZ(${rotateFix(r[2])}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

      // Set shadows
      if (custom && data.shadow || !custom) {
        let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl && data.shadow) {
          shadowEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('creative', slideEl);
        }
        if (shadowEl) {
          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'creative',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-cube.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cube.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCube)
/* harmony export */ });
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function EffectCube({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  const createSlideShadows = (slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    let shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}`.split(' '));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}`.split(' '));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    // create new ones
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach(slideEl => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  const setTranslate = () => {
    const {
      el,
      wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
      browser
    } = swiper;
    const r = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.a)(swiper);
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    let cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.wrapperEl.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', 'swiper-cube-shadow');
          swiper.wrapperEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = `${swiperWidth}px`;
      } else {
        cubeShadowEl = el.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', 'swiper-cube-shadow');
          el.append(cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      const transform = `rotateX(${r(isHorizontal ? 0 : -slideAngle)}deg) rotateY(${r(isHorizontal ? slideAngle : 0)}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
    wrapperEl.style['-webkit-transform-origin'] = `50% 50% -${swiperSize / 2}px`;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${params.shadowScale})`;
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-89.99deg)`;
      }
    }
    const zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${r(swiper.isHorizontal() ? 0 : wrapperRotate)}deg) rotateY(${r(swiper.isHorizontal() ? -wrapperRotate : 0)}deg)`;
    wrapperEl.style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
  };
  const setTransition = duration => {
    const {
      el,
      slides
    } = swiper;
    slides.forEach(slideEl => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(subEl => {
        subEl.style.transitionDuration = `${duration}ms`;
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      const shadowEl = el.querySelector('.swiper-cube-shadow');
      if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
    }
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__.e)({
    effect: 'cube',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-fade.css":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/swiper/modules/effect-fade.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFade)
/* harmony export */ });
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");





function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_2__.e)({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__.e)({
    effect: 'fade',
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/effect-flip.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-flip.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFlip)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectFlip({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  const createSlideShadows = (slideEl, progress) => {
    let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('flip', slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('flip', slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    // Set shadows
    swiper.params.flipEffect;
    swiper.slides.forEach(slideEl => {
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress);
    });
  };
  const setTranslate = () => {
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.flipEffect;
    const rotateFix = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.a)(swiper);
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateFix(rotateX)}deg) rotateY(${rotateFix(rotateY)}deg)`;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'flip',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/free-mode.mjs":
/*!***************************************************!*\
  !*** ./node_modules/swiper/modules/free-mode.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ freeMode)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function freeMode({
  swiper,
  extendParams,
  emit,
  once
}) {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchStart() {
    if (swiper.params.cssMode) return;
    const translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }
  function onTouchMove() {
    if (swiper.params.cssMode) return;
    const {
      touchEventsData: data,
      touches
    } = swiper;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)()
    });
  }
  function onTouchEnd({
    currentPos
  }) {
    if (swiper.params.cssMode) return;
    const {
      params,
      wrapperEl,
      rtlTranslate: rtl,
      snapGrid,
      touchEventsData: data
    } = swiper;
    // Time diff
    const touchEndTime = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();
        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      let momentumDuration = 1000 * params.freeMode.momentumRatio;
      const momentumDistance = swiper.velocity * momentumDuration;
      let newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        let nextSlide;
        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', () => {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(() => {
            swiper.setTranslate(afterBouncePosition);
            (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      emit('_freeModeStaticRelease');
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/grid.mjs":
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/grid.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Grid)
/* harmony export */ });
function Grid({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;
  let wasMultiRow;
  const getSpaceBetween = () => {
    let spaceBetween = swiper.params.spaceBetween;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }
    return spaceBetween;
  };
  const initSlides = slides => {
    const {
      slidesPerView
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
    slidesPerRow = slidesNumberEvenToRows / rows;
  };
  const unsetSlides = () => {
    if (swiper.slides) {
      swiper.slides.forEach(slide => {
        if (slide.swiperSlideGridSet) {
          slide.style.height = '';
          slide.style[swiper.getDirectionLabel('margin-top')] = '';
        }
      });
    }
  };
  const updateSlide = (i, slide, slides) => {
    const {
      slidesPerGroup
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    // Set slides order
    let newSlideOrderIndex;
    let column;
    let row;
    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.style.order = newSlideOrderIndex;
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.row = row;
    slide.column = column;
    slide.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
    slide.style[swiper.getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && `${spaceBetween}px` : '';
    slide.swiperSlideGridSet = true;
  };
  const updateWrapperSize = (slideSize, snapGrid) => {
    const {
      centeredSlides,
      roundLengths
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows
    } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style[swiper.getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push(...newSlidesGrid);
    }
  };
  const onInit = () => {
    wasMultiRow = swiper.params.grid && swiper.params.grid.rows > 1;
  };
  const onUpdate = () => {
    const {
      params,
      el
    } = swiper;
    const isMultiRow = params.grid && params.grid.rows > 1;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      numFullColumns = 1;
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (params.grid.fill === 'column') {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    wasMultiRow = isMultiRow;
  };
  on('init', onInit);
  on('update', onUpdate);
  swiper.grid = {
    initSlides,
    unsetSlides,
    updateSlide,
    updateWrapperSize
  };
}




/***/ }),

/***/ "./node_modules/swiper/modules/hash-navigation.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/swiper/modules/hash-navigation.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashNavigation)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function HashNavigation({
  swiper,
  extendParams,
  emit,
  on
}) {
  let initialized = false;
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex(_s, hash) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          const slideWithHash = swiper.slides.find(slideEl => slideEl.getAttribute('data-hash') === hash);
          if (!slideWithHash) return 0;
          const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
          return index;
        }
        return swiper.getSlideIndex((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
      }
    }
  });
  const onHashChange = () => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
      if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
      swiper.slideTo(newIndex);
    }
  };
  const setHash = () => {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, `#${activeSlideHash}` || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  const init = () => {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (swiper.params.hashNavigation.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  const destroy = () => {
    if (swiper.params.hashNavigation.watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };
  on('init', () => {
    if (swiper.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/history.mjs":
/*!*************************************************!*\
  !*** ./node_modules/swiper/modules/history.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


function History({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });
  let initialized = false;
  let paths = {};
  const slugify = text => {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };
  const getPathValues = urlOverride => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    let location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return {
      key,
      value
    };
  };
  const setHistory = (key, index) => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!initialized || !swiper.params.history.enabled) return;
    let location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    const slide = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`) : swiper.slides[index];
    let value = slugify(slide.getAttribute('data-history'));
    if (swiper.params.history.root.length > 0) {
      let root = swiper.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = `${root}/${key ? `${key}/` : ''}${value}`;
    } else if (!location.pathname.includes(key)) {
      value = `${key ? `${key}/` : ''}${value}`;
    }
    if (swiper.params.history.keepQuery) {
      value += location.search;
    }
    const currentState = window.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      window.history.replaceState({
        value
      }, null, value);
    } else {
      window.history.pushState({
        value
      }, null, value);
    }
  };
  const scrollToSlide = (speed, value, runCallbacks) => {
    if (value) {
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides[i];
        const slideHistory = slugify(slide.getAttribute('data-history'));
        if (slideHistory === value) {
          const index = swiper.getSlideIndex(slide);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };
  const setHistoryPopState = () => {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };
  const init = () => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!swiper.params.history) return;
    if (!window.history || !window.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  const destroy = () => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!swiper.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };
  on('init', () => {
    if (swiper.params.history.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/swiper/modules/index.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A11y: () => (/* reexport safe */ _a11y_mjs__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Autoplay: () => (/* reexport safe */ _autoplay_mjs__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   Controller: () => (/* reexport safe */ _controller_mjs__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   EffectCards: () => (/* reexport safe */ _effect_cards_mjs__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   EffectCoverflow: () => (/* reexport safe */ _effect_coverflow_mjs__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   EffectCreative: () => (/* reexport safe */ _effect_creative_mjs__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   EffectCube: () => (/* reexport safe */ _effect_cube_mjs__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   EffectFade: () => (/* reexport safe */ _effect_fade_mjs__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   EffectFlip: () => (/* reexport safe */ _effect_flip_mjs__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   FreeMode: () => (/* reexport safe */ _free_mode_mjs__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   Grid: () => (/* reexport safe */ _grid_mjs__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   HashNavigation: () => (/* reexport safe */ _hash_navigation_mjs__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   History: () => (/* reexport safe */ _history_mjs__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   Keyboard: () => (/* reexport safe */ _keyboard_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Manipulation: () => (/* reexport safe */ _manipulation_mjs__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   Mousewheel: () => (/* reexport safe */ _mousewheel_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Navigation: () => (/* reexport safe */ _navigation_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Pagination: () => (/* reexport safe */ _pagination_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   Parallax: () => (/* reexport safe */ _parallax_mjs__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Scrollbar: () => (/* reexport safe */ _scrollbar_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Thumbs: () => (/* reexport safe */ _thumbs_mjs__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   Virtual: () => (/* reexport safe */ _virtual_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Zoom: () => (/* reexport safe */ _zoom_mjs__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var _virtual_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtual.mjs */ "./node_modules/swiper/modules/virtual.mjs");
/* harmony import */ var _keyboard_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard.mjs */ "./node_modules/swiper/modules/keyboard.mjs");
/* harmony import */ var _mousewheel_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mousewheel.mjs */ "./node_modules/swiper/modules/mousewheel.mjs");
/* harmony import */ var _navigation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation.mjs */ "./node_modules/swiper/modules/navigation.mjs");
/* harmony import */ var _pagination_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagination.mjs */ "./node_modules/swiper/modules/pagination.mjs");
/* harmony import */ var _scrollbar_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scrollbar.mjs */ "./node_modules/swiper/modules/scrollbar.mjs");
/* harmony import */ var _parallax_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parallax.mjs */ "./node_modules/swiper/modules/parallax.mjs");
/* harmony import */ var _zoom_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./zoom.mjs */ "./node_modules/swiper/modules/zoom.mjs");
/* harmony import */ var _controller_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controller.mjs */ "./node_modules/swiper/modules/controller.mjs");
/* harmony import */ var _a11y_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./a11y.mjs */ "./node_modules/swiper/modules/a11y.mjs");
/* harmony import */ var _history_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./history.mjs */ "./node_modules/swiper/modules/history.mjs");
/* harmony import */ var _hash_navigation_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hash-navigation.mjs */ "./node_modules/swiper/modules/hash-navigation.mjs");
/* harmony import */ var _autoplay_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./autoplay.mjs */ "./node_modules/swiper/modules/autoplay.mjs");
/* harmony import */ var _thumbs_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./thumbs.mjs */ "./node_modules/swiper/modules/thumbs.mjs");
/* harmony import */ var _free_mode_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./free-mode.mjs */ "./node_modules/swiper/modules/free-mode.mjs");
/* harmony import */ var _grid_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./grid.mjs */ "./node_modules/swiper/modules/grid.mjs");
/* harmony import */ var _manipulation_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./manipulation.mjs */ "./node_modules/swiper/modules/manipulation.mjs");
/* harmony import */ var _effect_fade_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./effect-fade.mjs */ "./node_modules/swiper/modules/effect-fade.mjs");
/* harmony import */ var _effect_cube_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./effect-cube.mjs */ "./node_modules/swiper/modules/effect-cube.mjs");
/* harmony import */ var _effect_flip_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./effect-flip.mjs */ "./node_modules/swiper/modules/effect-flip.mjs");
/* harmony import */ var _effect_coverflow_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./effect-coverflow.mjs */ "./node_modules/swiper/modules/effect-coverflow.mjs");
/* harmony import */ var _effect_creative_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./effect-creative.mjs */ "./node_modules/swiper/modules/effect-creative.mjs");
/* harmony import */ var _effect_cards_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./effect-cards.mjs */ "./node_modules/swiper/modules/effect-cards.mjs");
























/***/ }),

/***/ "./node_modules/swiper/modules/keyboard.mjs":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/keyboard.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



/* eslint-disable consistent-return */
function Keyboard({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });
  function handle(event) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtl
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea'))) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
        return undefined;
      }
      const el = swiper.el;
      const swiperWidth = el.clientWidth;
      const swiperHeight = el.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }
  on('init', () => {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable,
    disable
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/manipulation.mjs":
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Manipulation)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function appendSlide(slides) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  const appendElement = slideEl => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, slideEl);
      slidesEl.append(tempDOM.children[0]);
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, '');
    } else {
      slidesEl.append(slideEl);
    }
  };
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}

function prependSlide(slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndex + 1;
  const prependElement = slideEl => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, slideEl);
      slidesEl.prepend(tempDOM.children[0]);
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, '');
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) prependElement(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}

function addSlide(index, slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  const baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  const slidesBuffer = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = swiper.slides[i];
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) slidesEl.append(slides[i]);
    }
    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }
  for (let i = 0; i < slidesBuffer.length; i += 1) {
    slidesEl.append(slidesBuffer[i]);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeSlide(slidesIndexes) {
  const swiper = this;
  const {
    params,
    activeIndex
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;
  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeAllSlides() {
  const swiper = this;
  const slidesIndexes = [];
  for (let i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}

function Manipulation({
  swiper
}) {
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper)
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/mousewheel.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/mousewheel.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mousewheel)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



/* eslint-disable consistent-return */
function Mousewheel({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: 'swiper-no-mousewheel'
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];
  function normalize(e) {
    // Reasonable defaults
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0; // spinX, spinY
    let pX = 0;
    let pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    }

    // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).
    if (newEvent.delta >= 6 && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    }
    // If user is scrolling towards the end:
    //   If the slider hasn't hit the latest slide or
    //   if the slider is a loop and
    //   if the slider isn't moving right now:
    //     Go to next slide and
    //     emit a scroll event.
    // Else (the user is scrolling towards the beginning) and
    // if the slider hasn't hit the first slide or
    // if the slider is a loop and
    // if the slider isn't moving right now:
    //   Go to prev slide and
    //   emit a scroll event.
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    }
    // If you got here is because an animation has been triggered so store the current time
    lastScrollTime = new window.Date().getTime();
    // Return false as a default
    return false;
  }
  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }
    return false;
  }
  function handle(event) {
    let e = event;
    let disableParentSwiper = true;
    if (!swiper.enabled) return;

    // Ignore event if the target or its parents have the swiper-no-mousewheel class
    if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;

    // Get the scroll positions
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

    // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      // Register the new event in a variable which stores the relevant data
      const newEvent = {
        time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event
      };

      // Keep the most recent events
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }

      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
      recentWheelEvents.push(newEvent);

      // If there is at least one previous recorded event:
      //   If direction has changed or
      //   if the scroll is quicker than the previous one:
      //     Animate the slider.
      // Else (this is the first time the wheel is moved):
      //     Animate the slider.
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }

      // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:

      // If we recently snapped after a momentum scroll, then ignore wheel events
      // to give time for the deceleration to finish. Stop ignoring after 500 msecs
      // or if it's a new scroll (larger delta or inverse sign as last event before
      // an end-of-momentum snap).
      const newEvent = {
        time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;
        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: newEvent.direction < 0 ? 'next' : 'prev',
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          // When wheel scrolling starts with sticky (aka snap) enabled, then detect
          // the end of a momentum scroll by storing recent (N=15?) wheel events.
          // 1. do all N events have decreasing or same (absolute value) delta?
          // 2. did all N events arrive in the last M (M=500?) msecs?
          // 3. does the earliest event have an (absolute value) delta that's
          //    at least P (P=1?) larger than the most recent event's delta?
          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
          // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
          // Snap immediately and ignore remaining wheel events in this scroll.
          // See comment above for "remaining wheel events in this scroll" determination.
          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
          clearTimeout(timeout);
          timeout = undefined;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }

          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            // We're at the end of the deceleration of a momentum scroll, so there's no need
            // to wait for more events. Snap ASAP on the next tick.
            // Also, because there's some remaining momentum we'll bias the snap in the
            // direction of the ongoing scroll because it's better UX for the scroll to snap
            // in the same direction as the scroll instead of reversing to snap.  Therefore,
            // if it's already scrolled more than 20% in the current direction, keep going.
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
              if (swiper.destroyed || !swiper.params) return;
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }

          if (!timeout) {
            // if we get here, then we haven't detected the end of a momentum scroll, so
            // we'll consider a scroll "complete" when there haven't been any wheel events
            // for 500ms.
            timeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
              if (swiper.destroyed || !swiper.params) return;
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        }

        // Emit event
        if (!ignoreWheelEvents) emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplay.disableOnInteraction) swiper.autoplay.stop();
        // Return page scroll on edge positions
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  }
  function events(method) {
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]('mouseenter', handleMouseEnter);
    targetEl[method]('mouseleave', handleMouseLeave);
    targetEl[method]('wheel', handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events('addEventListener');
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events('removeEventListener');
    swiper.mousewheel.enabled = false;
    return true;
  }
  on('init', () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on('destroy', () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/navigation.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/navigation.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



const arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: true,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg
  };
  function getEl(el) {
    let res;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === 'string' && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    // if (Array.isArray(res) && res.length === 1) res = res[0];
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(el);
    el.forEach(subEl => {
      if (subEl) {
        subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
        if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update() {
    // Update Navigation Buttons
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const initButton = (el, dir) => {
      if (el) {
        if (params.addIcons && el.matches('.swiper-button-next,.swiper-button-prev') && !el.querySelector('svg')) {
          const tempEl = document.createElement('div');
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(tempEl, arrowSvg);
          el.appendChild(tempEl.querySelector('svg'));
          tempEl.remove();
        }
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(' '));
      }
    };
    nextEl.forEach(el => initButton(el, 'next'));
    prevEl.forEach(el => initButton(el, 'prev'));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(' '));
    };
    nextEl.forEach(el => destroyButton(el, 'next'));
    prevEl.forEach(el => destroyButton(el, 'prev'));
  }
  on('init', () => {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    if (swiper.enabled) {
      update();
      return;
    }
    [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.add(swiper.params.navigation.lockClass));
  });
  on('click', (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find(pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(' '));
    init();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(' '));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/pagination.css":
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/pagination.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/swiper/modules/pagination.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/pagination.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");




function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
  const pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: number => number,
      formatFractionTotal: number => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl) return;
    bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function getMoveDirection(prevIndex, nextIndex, length) {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return 'next';
    } else if (nextIndex === prevIndex - 1) {
      return 'previous';
    }
    return;
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === 'next') {
        swiper.slideNext();
      } else if (moveDirection === 'previous') {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    // Current/Total
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
        el.forEach(subEl => {
          subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(bulletEl => {
        const classesToRemove = [...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`)].map(s => typeof s === 'string' && s.includes(' ') ? s.split(' ') : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el.length > 1) {
        bullets.forEach(bullet => {
          const bulletIndex = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(' '));
          } else if (swiper.isElement) {
            bullet.setAttribute('part', 'bullet');
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(' '));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
          }
          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(bullet => {
          bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === 'fraction') {
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.currentClass)).forEach(fractionEl => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.totalClass)).forEach(totalEl => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === 'progressbar') {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.progressbarFillClass)).forEach(progressEl => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === 'custom' && params.renderCustom) {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(subEl, params.renderCustom(swiper, current + 1, total));
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render() {
    // Render Container
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el = swiper.pagination.el;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          // prettier-ignore
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el.forEach(subEl => {
      if (params.type !== 'custom') {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(subEl, paginationHTML || '');
      }
      if (params.type === 'bullets') {
        swiper.pagination.bullets.push(...subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.bulletClass)));
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', el[0]);
    }
  }
  function init() {
    swiper.params.pagination = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        el = el.find(subEl => {
          if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.d)(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        });
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(...(params.clickableClass || '').split(' '));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || '').split(' '));
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
  }
  on('changeDirection', () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', () => {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    update();
  });
  on('snapGridLengthChange', () => {
    render();
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass));
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/parallax.mjs":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/parallax.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parallax)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function Parallax({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    parallax: {
      enabled: false
    }
  });
  const elementsSelector = '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]';
  const setTransform = (el, progress) => {
    const {
      rtl
    } = swiper;
    const rtlFactor = rtl ? -1 : 1;
    const p = el.getAttribute('data-swiper-parallax') || '0';
    let x = el.getAttribute('data-swiper-parallax-x');
    let y = el.getAttribute('data-swiper-parallax-y');
    const scale = el.getAttribute('data-swiper-parallax-scale');
    const opacity = el.getAttribute('data-swiper-parallax-opacity');
    const rotate = el.getAttribute('data-swiper-parallax-rotate');
    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }
    if (x.indexOf('%') >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${x * progress * rtlFactor}px`;
    }
    if (y.indexOf('%') >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${y * progress}px`;
    }
    if (typeof opacity !== 'undefined' && opacity !== null) {
      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      el.style.opacity = currentOpacity;
    }
    let transform = `translate3d(${x}, ${y}, 0px)`;
    if (typeof scale !== 'undefined' && scale !== null) {
      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      transform += ` scale(${currentScale})`;
    }
    if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
      const currentRotate = rotate * progress * -1;
      transform += ` rotate(${currentRotate}deg)`;
    }
    el.style.transform = transform;
  };
  const setTranslate = () => {
    const {
      el,
      slides,
      progress,
      snapGrid,
      isElement
    } = swiper;
    const elements = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(el, elementsSelector);
    if (swiper.isElement) {
      elements.push(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(swiper.hostEl, elementsSelector));
    }
    elements.forEach(subEl => {
      setTransform(subEl, progress);
    });
    slides.forEach((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl.querySelectorAll(`${elementsSelector}, [data-swiper-parallax-rotate]`).forEach(subEl => {
        setTransform(subEl, slideProgress);
      });
    });
  };
  const setTransition = (duration = swiper.params.speed) => {
    const {
      el,
      hostEl
    } = swiper;
    const elements = [...el.querySelectorAll(elementsSelector)];
    if (swiper.isElement) {
      elements.push(...hostEl.querySelectorAll(elementsSelector));
    }
    elements.forEach(parallaxEl => {
      let parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
    });
  };
  on('beforeInit', () => {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', (_swiper, duration) => {
    if (!swiper.params.parallax.enabled) return;
    setTransition(duration);
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/scrollbar.mjs":
/*!***************************************************!*\
  !*** ./node_modules/swiper/modules/scrollbar.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scrollbar)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");





function Scrollbar({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  let isTouched = false;
  let timeout = null;
  let dragTimeout = null;
  let dragStartPos;
  let dragSize;
  let trackSize;
  let divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: `swiper-scrollbar-horizontal`,
      verticalClass: `swiper-scrollbar-vertical`
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar,
      rtlTranslate: rtl
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    const params = swiper.params.scrollbar;
    const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
      dragEl.style.width = `${newSize}px`;
    } else {
      dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
      dragEl.style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(timeout);
      el.style.opacity = 1;
      timeout = setTimeout(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
  }
  function updateSize() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    dragEl.style.width = '';
    dragEl.style.height = '';
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }
    if (swiper.isHorizontal()) {
      dragEl.style.width = `${dragSize}px`;
    } else {
      dragEl.style.height = `${dragSize}px`;
    }
    if (divider >= 1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
    if (swiper.params.scrollbar.hide) {
      el.style.opacity = 0;
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
    }
  }
  function getPointerPosition(e) {
    return swiper.isHorizontal() ? e.clientX : e.clientY;
  }
  function setDragPosition(e) {
    const {
      scrollbar,
      rtlTranslate: rtl
    } = swiper;
    const {
      el
    } = scrollbar;
    let positionRatio;
    positionRatio = (getPointerPosition(e) - (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    isTouched = true;
    dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
    e.preventDefault();
    e.stopPropagation();
    wrapperEl.style.transitionDuration = '100ms';
    dragEl.style.transitionDuration = '100ms';
    setDragPosition(e);
    clearTimeout(dragTimeout);
    el.style.transitionDuration = '0ms';
    if (params.hide) {
      el.style.opacity = 1;
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = 'none';
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    if (!isTouched) return;
    if (e.preventDefault && e.cancelable) e.preventDefault();else e.returnValue = false;
    setDragPosition(e);
    wrapperEl.style.transitionDuration = '0ms';
    el.style.transitionDuration = '0ms';
    dragEl.style.transitionDuration = '0ms';
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el
    } = scrollbar;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = '';
      wrapperEl.style.transitionDuration = '';
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    const {
      scrollbar,
      params
    } = swiper;
    const el = scrollbar.el;
    if (!el) return;
    const target = el;
    const activeListener = params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    const passiveListener = params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    target[eventMethod]('pointerdown', onDragStart, activeListener);
    document[eventMethod]('pointermove', onDragMove, activeListener);
    document[eventMethod]('pointerup', onDragEnd, passiveListener);
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('off');
  }
  function init() {
    const {
      scrollbar,
      el: swiperEl
    } = swiper;
    swiper.params.scrollbar = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_2__.c)(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: 'swiper-scrollbar'
    });
    const params = swiper.params.scrollbar;
    if (!params.el) return;
    let el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = document.querySelectorAll(params.el);
      if (!el.length) return;
    } else if (!el) {
      el = params.el;
    }
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
      el = swiperEl.querySelector(params.el);
    }
    if (el.length > 0) el = el[0];
    el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    let dragEl;
    if (el) {
      dragEl = el.querySelector((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_3__.c)(swiper.params.scrollbar.dragClass));
      if (!dragEl) {
        dragEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.scrollbar.dragClass);
        el.append(dragEl);
      }
    }
    Object.assign(scrollbar, {
      el,
      dragEl
    });
    if (params.draggable) {
      enableDraggable();
    }
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.lockClass));
    }
  }
  function destroy() {
    const params = swiper.params.scrollbar;
    const el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass));
    }
    disableDraggable();
  }
  on('changeDirection', () => {
    if (!swiper.scrollbar || !swiper.scrollbar.el) return;
    const params = swiper.params.scrollbar;
    let {
      el
    } = swiper.scrollbar;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(el);
    el.forEach(subEl => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', () => {
    if (swiper.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock changeDirection', () => {
    updateSize();
  });
  on('setTranslate', () => {
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    setTransition(duration);
  });
  on('enable disable', () => {
    const {
      el
    } = swiper.scrollbar;
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.lockClass));
    }
  });
  on('destroy', () => {
    destroy();
  });
  const enable = () => {
    swiper.el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    init();
    updateSize();
    setTranslate();
  };
  const disable = () => {
    swiper.el.classList.add(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/thumbs.mjs":
/*!************************************************!*\
  !*** ./node_modules/swiper/modules/thumbs.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Thumb)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Thumb({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  let initialized = false;
  let swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init() {
    const {
      thumbs: thumbsParams
    } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      if (thumbsParams.swiper.destroyed) {
        initialized = false;
        return false;
      }
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.p)(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    return true;
  }
  function update(initial) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;

    // Activate thumbs
    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach(slideEl => slideEl.classList.remove(thumbActiveClass));
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach(slideEl => {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + i]) {
          thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
        }
      }
    }
    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      const currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsSwiper.params.loop) {
        const newThumbsSlide = thumbsSwiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') === `${swiper.realIndex}`);
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }
  on('beforeInit', () => {
    const {
      thumbs
    } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
      const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
      const getThumbsElementAndInit = () => {
        const thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init();
          update(true);
        } else if (thumbsElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onThumbsSwiper = e => {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener(eventName, onThumbsSwiper);
            init();
            update(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener(eventName, onThumbsSwiper);
        }
        return thumbsElement;
      };
      const watchForThumbsToAppear = () => {
        if (swiper.destroyed) return;
        const thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init();
      update(true);
    }
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init,
    update
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/virtual.mjs":
/*!*************************************************!*\
  !*** ./node_modules/swiper/modules/virtual.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Virtual)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Virtual({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      slidesPerViewAutoSlideSize: 320,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  let cssModeTimeout;
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  const tempDOM = document.createElement('div');
  function renderSlide(slide, index) {
    const params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // eslint-disable-next-line
    let slideEl;
    if (params.renderSlide) {
      slideEl = params.renderSlide.call(swiper, slide, index);
      if (typeof slideEl === 'string') {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(tempDOM, slideEl);
        slideEl = tempDOM.children[0];
      }
    } else if (swiper.isElement) {
      slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('swiper-slide');
    } else {
      slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.slideClass);
    }
    slideEl.setAttribute('data-swiper-slide-index', index);
    if (!params.renderSlide) {
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(slideEl, slide);
    }
    if (params.cache) {
      swiper.virtual.cache[index] = slideEl;
    }
    return slideEl;
  }
  function update(force, beforeInit, forceActiveIndex) {
    const {
      slidesPerGroup,
      centeredSlides,
      slidesPerView,
      loop: isLoop,
      initialSlide
    } = swiper.params;
    if (beforeInit && !isLoop && initialSlide > 0) {
      return;
    }
    const {
      addSlidesBefore,
      addSlidesAfter,
      slidesPerViewAutoSlideSize
    } = swiper.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset
    } = swiper.virtual;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }
    const activeIndex = typeof forceActiveIndex === 'undefined' ? swiper.activeIndex || 0 : forceActiveIndex;
    let offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
    let slidesPerViewNumeric;
    if (slidesPerView === 'auto') {
      if (slidesPerViewAutoSlideSize) {
        let swiperSize = swiper.size;
        if (!swiperSize) {
          swiperSize = swiper.isHorizontal() ? swiper.el.getBoundingClientRect().width : swiper.el.getBoundingClientRect().height;
        }
        slidesPerViewNumeric = Math.max(1, Math.ceil(swiperSize / slidesPerViewAutoSlideSize));
      } else {
        slidesPerViewNumeric = 1;
      }
    } else {
      slidesPerViewNumeric = slidesPerView;
    }
    let slidesAfter;
    let slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerViewNumeric / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerViewNumeric / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerViewNumeric + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerViewNumeric : slidesPerGroup) + addSlidesBefore;
    }
    let from = activeIndex - slidesBefore;
    let to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0];
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0];
    }
    Object.assign(swiper.virtual, {
      from,
      to,
      offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore,
      slidesAfter
    });
    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit('virtualUpdate');
    }
    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach(slideEl => {
          slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
        });
      }
      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset,
        from,
        to,
        slides: function getSlides() {
          const slidesToRender = [];
          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()
      });
      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    const prependIndexes = [];
    const appendIndexes = [];
    const getSlideIndex = index => {
      let slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        // eslint-disable-next-line
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };
    if (force) {
      swiper.slides.filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`)).forEach(slideEl => {
        slideEl.remove();
      });
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          const slideIndex = getSlideIndex(i);
          swiper.slides.filter(el => el.matches(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`)).forEach(slideEl => {
            slideEl.remove();
          });
        }
      }
    }
    const loopFrom = isLoop ? -slides.length : 0;
    const loopTo = isLoop ? slides.length * 2 : slides.length;
    for (let i = loopFrom; i < loopTo; i += 1) {
      if (i >= from && i <= to) {
        const slideIndex = getSlideIndex(i);
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(slideIndex);
        } else {
          if (i > previousTo) appendIndexes.push(slideIndex);
          if (i < previousFrom) prependIndexes.push(slideIndex);
        }
      }
    }
    appendIndexes.forEach(index => {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
        const index = prependIndexes[i];
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort((a, b) => b - a);
      prependIndexes.forEach(index => {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(slideEl => {
      slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
    });
    onRendered();
  }
  function appendSlide(slides) {
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    const activeIndex = swiper.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      const cache = swiper.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach(cachedIndex => {
        const cachedEl = cache[cachedIndex];
        const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
        if (cachedElIndex) {
          cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
          // shift cache indexes
          Object.keys(swiper.virtual.cache).forEach(key => {
            if (key > slidesIndexes) {
              swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
              swiper.virtual.cache[key - 1].setAttribute('data-swiper-slide-index', key - 1);
              delete swiper.virtual.cache[key];
            }
          });
        }
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
        // shift cache indexes
        Object.keys(swiper.virtual.cache).forEach(key => {
          if (key > slidesIndexes) {
            swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
            swiper.virtual.cache[key - 1].setAttribute('data-swiper-slide-index', key - 1);
            delete swiper.virtual.cache[key];
          }
        });
      }
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', () => {
    if (!swiper.params.virtual.enabled) return;
    let domSlidesAssigned;
    if (typeof swiper.passedParams.virtual.slides === 'undefined') {
      const slides = [...swiper.slidesEl.children].filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
      if (slides && slides.length) {
        swiper.virtual.slides = [...slides];
        domSlidesAssigned = true;
        slides.forEach((slideEl, slideIndex) => {
          slideEl.setAttribute('data-swiper-slide-index', slideIndex);
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = swiper.params.virtual.slides;
    }
    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    update(false, true);
  });
  on('setTranslate', () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode) {
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update
  });
}




/***/ }),

/***/ "./node_modules/swiper/modules/zoom.mjs":
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/zoom.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Zoom)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Zoom({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    zoom: {
      enabled: false,
      limitToOriginalSize: false,
      maxRatio: 3,
      minRatio: 1,
      panOnMouseMove: false,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  });
  swiper.zoom = {
    enabled: false
  };
  let currentScale = 1;
  let isScaling = false;
  let isPanningWithMouse = false;
  let mousePanStart = {
    x: 0,
    y: 0
  };
  const mousePanSensitivity = -3; // Negative to invert pan direction
  let fakeGestureTouched;
  let fakeGestureMoved;
  const evCache = [];
  const gesture = {
    originX: 0,
    originY: 0,
    slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    imageEl: undefined,
    imageWrapEl: undefined,
    maxRatio: 3
  };
  const image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  const velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };
  let scale = 1;
  Object.defineProperty(swiper.zoom, 'scale', {
    get() {
      return scale;
    },
    set(value) {
      if (scale !== value) {
        const imageEl = gesture.imageEl;
        const slideEl = gesture.slideEl;
        emit('zoomChange', value, imageEl, slideEl);
      }
      scale = value;
    }
  });
  function getDistanceBetweenTouches() {
    if (evCache.length < 2) return 1;
    const x1 = evCache[0].pageX;
    const y1 = evCache[0].pageY;
    const x2 = evCache[1].pageX;
    const y2 = evCache[1].pageY;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  }
  function getMaxRatio() {
    const params = swiper.params.zoom;
    const maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    if (params.limitToOriginalSize && gesture.imageEl && gesture.imageEl.naturalWidth) {
      const imageMaxRatio = gesture.imageEl.naturalWidth / gesture.imageEl.offsetWidth;
      return Math.min(imageMaxRatio, maxRatio);
    }
    return maxRatio;
  }
  function getScaleOrigin() {
    if (evCache.length < 2) return {
      x: null,
      y: null
    };
    const box = gesture.imageEl.getBoundingClientRect();
    return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x - window.scrollX) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y - window.scrollY) / currentScale];
  }
  function getSlideSelector() {
    return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  }
  function eventWithinSlide(e) {
    const slideSelector = getSlideSelector();
    if (e.target.matches(slideSelector)) return true;
    if (swiper.slides.filter(slideEl => slideEl.contains(e.target)).length > 0) return true;
    return false;
  }
  function eventWithinZoomContainer(e) {
    const selector = `.${swiper.params.zoom.containerClass}`;
    if (e.target.matches(selector)) return true;
    if ([...swiper.hostEl.querySelectorAll(selector)].filter(containerEl => containerEl.contains(e.target)).length > 0) return true;
    return false;
  }

  // Events
  function onGestureStart(e) {
    if (e.pointerType === 'mouse') {
      evCache.splice(0, evCache.length);
    }
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    evCache.push(e);
    if (evCache.length < 2) {
      return;
    }
    fakeGestureTouched = true;
    gesture.scaleStart = getDistanceBetweenTouches();
    if (!gesture.slideEl) {
      gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
      if (!gesture.imageWrapEl) {
        gesture.imageEl = undefined;
        return;
      }
      gesture.maxRatio = getMaxRatio();
    }
    if (gesture.imageEl) {
      const [originX, originY] = getScaleOrigin();
      gesture.originX = originX;
      gesture.originY = originY;
      gesture.imageEl.style.transitionDuration = '0ms';
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache[pointerIndex] = e;
    if (evCache.length < 2) {
      return;
    }
    fakeGestureMoved = true;
    gesture.scaleMove = getDistanceBetweenTouches();
    if (!gesture.imageEl) {
      return;
    }
    zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
    }
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function onGestureEnd(e) {
    if (!eventWithinSlide(e)) return;
    if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
    if (!fakeGestureTouched || !fakeGestureMoved) {
      return;
    }
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!gesture.imageEl) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale > 1 && gesture.slideEl) {
      gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    } else if (zoom.scale <= 1 && gesture.slideEl) {
      gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    }
    if (zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
      gesture.slideEl = undefined;
    }
  }
  let allowTouchMoveTimeout;
  function allowTouchMove() {
    swiper.touchEventsData.preventTouchMoveFromPointerMove = false;
  }
  function preventTouchMove() {
    clearTimeout(allowTouchMoveTimeout);
    swiper.touchEventsData.preventTouchMoveFromPointerMove = true;
    allowTouchMoveTimeout = setTimeout(() => {
      if (swiper.destroyed) return;
      allowTouchMove();
    });
  }
  function onTouchStart(e) {
    const device = swiper.device;
    if (!gesture.imageEl) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    const event = evCache.length > 0 ? evCache[0] : e;
    image.touchesStart.x = event.pageX;
    image.touchesStart.y = event.pageY;
  }
  function onTouchMove(e) {
    const isMouseEvent = e.pointerType === 'mouse';
    const isMousePan = isMouseEvent && swiper.params.zoom.panOnMouseMove;
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) {
      return;
    }
    const zoom = swiper.zoom;
    if (!gesture.imageEl) {
      return;
    }
    if (!image.isTouched || !gesture.slideEl) {
      if (isMousePan) onMouseMove(e);
      return;
    }
    if (isMousePan) {
      onMouseMove(e);
      return;
    }
    if (!image.isMoved) {
      image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      image.startX = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(gesture.imageWrapEl, 'x') || 0;
      image.startY = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(gesture.imageWrapEl, 'y') || 0;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      gesture.imageWrapEl.style.transitionDuration = '0ms';
    }
    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
    image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
    const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
    if (touchesDiff > 5) {
      swiper.allowClick = false;
    }
    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    preventTouchMove();
    image.isMoved = true;
    const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
    const {
      originX,
      originY
    } = gesture;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
    }
    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
    }

    // Velocity
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTouchEnd() {
    const zoom = swiper.zoom;
    evCache.length = 0;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    let momentumDurationX = 300;
    let momentumDurationY = 300;
    const momentumDistanceX = velocity.x * momentumDurationX;
    const newPositionX = image.currentX + momentumDistanceX;
    const momentumDistanceY = velocity.y * momentumDurationY;
    const newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY;
    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTransitionEnd() {
    const zoom = swiper.zoom;
    if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
      if (gesture.imageEl) {
        gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
      }
      if (gesture.imageWrapEl) {
        gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
      }
      gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
      zoom.scale = 1;
      currentScale = 1;
      gesture.slideEl = undefined;
      gesture.imageEl = undefined;
      gesture.imageWrapEl = undefined;
      gesture.originX = 0;
      gesture.originY = 0;
    }
  }
  function onMouseMove(e) {
    // Only pan if zoomed in and mouse panning is enabled
    if (currentScale <= 1 || !gesture.imageWrapEl) return;
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
    const currentTransform = window.getComputedStyle(gesture.imageWrapEl).transform;
    const matrix = new window.DOMMatrix(currentTransform);
    if (!isPanningWithMouse) {
      isPanningWithMouse = true;
      mousePanStart.x = e.clientX;
      mousePanStart.y = e.clientY;
      image.startX = matrix.e;
      image.startY = matrix.f;
      image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      return;
    }
    const deltaX = (e.clientX - mousePanStart.x) * mousePanSensitivity;
    const deltaY = (e.clientY - mousePanStart.y) * mousePanSensitivity;
    const scaledWidth = image.width * currentScale;
    const scaledHeight = image.height * currentScale;
    const slideWidth = gesture.slideWidth;
    const slideHeight = gesture.slideHeight;
    const minX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
    const maxX = -minX;
    const minY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
    const maxY = -minY;
    const newX = Math.max(Math.min(image.startX + deltaX, maxX), minX);
    const newY = Math.max(Math.min(image.startY + deltaY, maxY), minY);
    gesture.imageWrapEl.style.transitionDuration = '0ms';
    gesture.imageWrapEl.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
    mousePanStart.x = e.clientX;
    mousePanStart.y = e.clientY;
    image.startX = newX;
    image.startY = newY;
    image.currentX = newX;
    image.currentY = newY;
  }
  function zoomIn(e) {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (e && e.target) {
        gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      }
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.touchAction = 'none';
    }
    gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    let touchX;
    let touchY;
    let offsetX;
    let offsetY;
    let diffX;
    let diffY;
    let translateX;
    let translateY;
    let imageWidth;
    let imageHeight;
    let scaledWidth;
    let scaledHeight;
    let translateMinX;
    let translateMinY;
    let translateMaxX;
    let translateMaxY;
    let slideWidth;
    let slideHeight;
    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.pageX;
      touchY = e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }
    const prevScale = currentScale;
    const forceZoomRatio = typeof e === 'number' ? e : null;
    if (currentScale === 1 && forceZoomRatio) {
      touchX = undefined;
      touchY = undefined;
      image.touchesStart.x = undefined;
      image.touchesStart.y = undefined;
    }
    const maxRatio = getMaxRatio();
    zoom.scale = forceZoomRatio || maxRatio;
    currentScale = forceZoomRatio || maxRatio;
    if (e && !(currentScale === 1 && forceZoomRatio)) {
      slideWidth = gesture.slideEl.offsetWidth;
      slideHeight = gesture.slideEl.offsetHeight;
      offsetX = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(gesture.slideEl).left + window.scrollX;
      offsetY = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(gesture.slideEl).top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      imageHeight = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      if (prevScale > 0 && forceZoomRatio && typeof image.currentX === 'number' && typeof image.currentY === 'number') {
        translateX = image.currentX * zoom.scale / prevScale;
        translateY = image.currentY * zoom.scale / prevScale;
      } else {
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;
      }
      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }
      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    if (forceZoomRatio && zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
    }
    image.currentX = translateX;
    image.currentY = translateY;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function zoomOut() {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
      } else {
        gesture.slideEl = swiper.slides[swiper.activeIndex];
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = '';
      swiper.wrapperEl.style.touchAction = '';
    }
    zoom.scale = 1;
    currentScale = 1;
    image.currentX = undefined;
    image.currentY = undefined;
    image.touchesStart.x = undefined;
    image.touchesStart.y = undefined;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
    gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    gesture.slideEl = undefined;
    gesture.originX = 0;
    gesture.originY = 0;
    if (swiper.params.zoom.panOnMouseMove) {
      mousePanStart = {
        x: 0,
        y: 0
      };
      if (isPanningWithMouse) {
        isPanningWithMouse = false;
        image.startX = 0;
        image.startY = 0;
      }
    }
  }

  // Toggle Zoom
  function zoomToggle(e) {
    const zoom = swiper.zoom;
    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }
  function getListeners() {
    const passiveListener = swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    const activeListenerWithCapture = swiper.params.passiveListeners ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener,
      activeListenerWithCapture
    };
  }

  // Attach/Detach Events
  function enable() {
    const zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();

    // Scale image
    swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
      swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  function disable() {
    const zoom = swiper.zoom;
    if (!zoom.enabled) return;
    zoom.enabled = false;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();

    // Scale image
    swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
      swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  on('init', () => {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    disable();
  });
  on('touchStart', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchEnd();
  });
  on('doubleTap', (_s, e) => {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable,
    disable,
    in: zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}




/***/ }),

/***/ "./node_modules/swiper/shared/classes-to-selector.mjs":
/*!************************************************************!*\
  !*** ./node_modules/swiper/shared/classes-to-selector.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ classesToSelector)
/* harmony export */ });
function classesToSelector(classes = '') {
  return `.${classes.trim().replace(/([\.:!+\/()[\]])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
}




/***/ }),

/***/ "./node_modules/swiper/shared/create-element-if-not-defined.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/shared/create-element-if-not-defined.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ createElementIfNotDefined)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('div', checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}




/***/ }),

/***/ "./node_modules/swiper/shared/create-shadow.mjs":
/*!******************************************************!*\
  !*** ./node_modules/swiper/shared/create-shadow.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ createShadow)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function createShadow(suffix, slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}${suffix ? ` swiper-slide-shadow-${suffix}` : ''}`;
  const shadowContainer = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.g)(slideEl);
  let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(' ').join('.')}`);
  if (!shadowEl) {
    shadowEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('div', shadowClass.split(' '));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}




/***/ }),

/***/ "./node_modules/swiper/shared/effect-init.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/shared/effect-init.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectInit)
/* harmony export */ });
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on('beforeInit', () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate _virtualUpdated', () => {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      swiper.slides.forEach(slideEl => {
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => shadowEl.remove());
      });
      // create new one
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}




/***/ }),

/***/ "./node_modules/swiper/shared/effect-target.mjs":
/*!******************************************************!*\
  !*** ./node_modules/swiper/shared/effect-target.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectTarget)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function effectTarget(effectParams, slideEl) {
  const transformEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.g)(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style['-webkit-backface-visibility'] = 'hidden';
  }
  return transformEl;
}




/***/ }),

/***/ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/shared/effect-virtual-transition-end.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectVirtualTransitionEnd)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides
}) {
  const {
    activeIndex
  } = swiper;
  const getSlide = el => {
    if (!el.parentElement) {
      // assume shadow root
      const slide = swiper.slides.find(slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode);
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter(transformEl => {
        const el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach(el => {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}




/***/ }),

/***/ "./node_modules/swiper/shared/ssr-window.esm.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/shared/ssr-window.esm.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getWindow),
/* harmony export */   g: () => (/* binding */ getDocument)
/* harmony export */ });
/**
 * SSR Window 5.0.1
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2025, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: June 27, 2025
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}
function extend(target = {}, src = {}) {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ''
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
function getDocument() {
  const doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}




/***/ }),

/***/ "./node_modules/swiper/shared/swiper-core.mjs":
/*!****************************************************!*\
  !*** ./node_modules/swiper/shared/swiper-core.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Swiper),
/* harmony export */   d: () => (/* binding */ defaults)
/* harmony export */ });
/* harmony import */ var _ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



let support;
function calcSupport() {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  return {
    smoothScroll: document.documentElement && document.documentElement.style && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support = getSupport();
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const platform = window.navigator.platform;
  const ua = userAgent || window.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === 'Win32';
  let macos = platform === 'MacIntel';

  // iPadOs 13 fix
  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  }

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }

  // Export object
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

let browser;
function calcBrowser() {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    const ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      const [major, minor] = ua.split('Version/')[1].split(' ')[0].split('.').map(num => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

function Resize({
  swiper,
  on,
  emit
}) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(entries => {
      animationFrame = window.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };
  on('init', () => {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const attach = (target, options = {}) => {
    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    const observer = new ObserverFunc(mutations => {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: swiper.isElement || (typeof options.childList === 'undefined' ? true : options).childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    // Observe container
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });

    // Observe wrapper
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach(observer => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

/* eslint-disable no-underscore-dangle */

var eventsEmitter = {
  on(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    function onceHandler(...args) {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(eventHandler => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};

function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }

  // Subtract paddings
  width = width - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-left') || 0, 10) - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-right') || 0, 10);
  height = height - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-top') || 0, 10) - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}

function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  const swiperSize = swiper.size - offsetBefore - offsetAfter;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;

  // reset margins
  slides.forEach(slideEl => {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-before', '');
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-after', '');
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }

  // Calc slides
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides[i];
    if (slide) {
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide, slides);
      }
      if ((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(slide, 'display') === 'none') continue; // eslint-disable-line
    }

    if (isVirtual && params.slidesPerView === 'auto') {
      if (params.virtual.slidesPerViewAutoSlideSize) {
        slideSize = params.virtual.slidesPerViewAutoSlideSize;
      }
      if (slideSize && slide) {
        if (params.roundLengths) slideSize = Math.floor(slideSize);
        slide.style[swiper.getDirectionLabel('width')] = `${slideSize}px`;
      }
    } else if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slide.style[swiper.getDirectionLabel('width')] = ``;
      }
      const slideStyles = getComputedStyle(slide);
      const currentTransform = slide.style.transform;
      const currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(slide, 'width', true) : (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(slide, 'height', true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slide) {
        slide.style[swiper.getDirectionLabel('width')] = `${slideSize}px`;
      }
    }
    if (slide) {
      slide.swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : swiper.getDirectionLabel('marginRight');
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(slideEl => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map(snap => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (offsetBefore || 0) + (offsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit('slidesUpdated');
  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}

function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = index => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach(slide => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}

function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  // eslint-disable-next-line
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

function updateProgress(translate) {
  const swiper = this;
  if (typeof translate === 'undefined') {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

const toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = selector => {
    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.find(slideEl => slideEl.column === activeIndex);
      nextSlide = slides.find(slideEl => slideEl.column === activeIndex + 1);
      prevSlide = slides.find(slideEl => slideEl.column === activeIndex - 1);
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      // Next Slide
      nextSlide = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.r)(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }

      // Prev Slide
      prevSlide = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.t)(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach(slideEl => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}

const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        // init later
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl) lazyEl.remove();
  }
};
const unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};
const preload = swiper => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};

function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = aIndex => {
    let realIndex = aIndex - swiper.virtual.slidesBefore;
    if (realIndex < 0) {
      realIndex = swiper.virtual.slides.length + realIndex;
    }
    if (realIndex >= swiper.virtual.slides.length) {
      realIndex -= swiper.virtual.slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;

  // Get real index
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find(slideEl => slideEl.column === activeIndex);
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute('data-swiper-slide-index'), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute('data-swiper-slide-index');
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }
}

function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach(pathEl => {
      if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};

function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  let currentTranslate = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

function setTranslate(translate, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

function minTranslate() {
  return -this.snapGrid[0];
}

function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.u)({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth'
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}

var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};

function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : '';
  }
  swiper.emit('setTransition', duration, byController);
}

function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && dir === 'reset') {
    swiper.emit(`slideResetTransition${step}`);
  } else if (runCallbacks && activeIndex !== previousIndex) {
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === 'next') {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}

function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'Start'
  });
}

function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'End'
  });
}

var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};

function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate = -snapGrid[snapIndex];
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);
  let direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset';

  // initial virtual
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  // Update Index
  if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.u)({
          swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth'
      });
    }
    return true;
  }
  const browser = getBrowser();
  const isSafari = browser.isSafari;
  if (isVirtual && !initial && isSafari && swiper.isElement) {
    swiper.virtual.update(false, false, slideIndex);
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}

function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides,
        slidesOffsetBefore,
        slidesOffsetAfter
      } = swiper.params;
      const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (bothDirections && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (bothDirections) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && bothDirections && swiper.params.slidesPerView !== 'auto' && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? 'prev' : 'next' : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? 'next' : 'prev';
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === 'next' ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === 'next' ? swiper.realIndex : undefined
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}

/* eslint no-unused-vars: "off" */
function slideNext(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'next'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slidePrev(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'prev'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map(val => normalize(val));
  const isFreeMode = params.freeMode && params.freeMode.enabled;
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && (params.cssMode || isFreeMode)) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideReset(speed, runCallbacks = true, internal) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideToClosest(speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      swiper.slideToLoop(realIndex);
    } else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};

function loopCreate(slideRealIndex, initial) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute('data-swiper-slide-index', index);
    });
  };
  const clearBlankSlides = () => {
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideBlankClass}`);
    slides.forEach(el => {
      el.remove();
    });
    if (slides.length > 0) {
      swiper.recalcSlides();
      swiper.updateSlides();
    }
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) {
    clearBlankSlides();
  }
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = amountOfSlides => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('swiper-slide', [params.slideBlankClass]) : (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else {
    initSlides();
  }
  const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
  swiper.loopFix({
    slideRealIndex,
    direction: bothDirections ? undefined : 'next',
    initial
  });
}

function loopFix({
  slideRealIndex,
  slideTo = true,
  direction,
  setTranslate,
  activeSlideIndex,
  initial,
  byController,
  byMousewheel
} = {}) {
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides,
    slidesOffsetBefore,
    slidesOffsetAfter,
    initialSlide
  } = params;
  const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo) {
      if (!bothDirections && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (bothDirections && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === 'auto') {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (bothDirections && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters');
  } else if (gridEnabled && params.grid.fill === 'row') {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`');
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
  let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(slides.find(el => el.classList.contains(params.slideActiveClass)));
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === 'next' || !direction;
  const isPrev = direction === 'prev' || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (bothDirections && typeof setTranslate === 'undefined' ? -slidesPerView / 2 + 0.5 : 0);
  // prepend last slides before start
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i = slides.length - 1; i >= 0; i -= 1) {
          if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
        }
        // slides.forEach((slide, slideIndex) => {
        //   if (slide.column === colIndexToPrepend) prependSlidesIndexes.push(slideIndex);
        // });
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    if (isInitialOverflow) {
      slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
    }
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide, slideIndex) => {
          if (slide.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2) {
    if (appendSlidesIndexes.includes(activeSlideIndex)) {
      appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
    if (prependSlidesIndexes.includes(activeSlideIndex)) {
      prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach(c => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
      });
    }
  }
  swiper.emit('loopFix');
}

function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach(slideEl => {
    const index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach(slideEl => {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach(slideEl => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}

var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};

function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)() || el === (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event, startX) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart(event) {
  const swiper = this;
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === 'pointerdown') {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === 'touchstart' && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === 'touchstart') {
    // don't proceed touch event
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === 'wrapper') {
    if (!(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.w)(targetEl, swiper.wrapperEl)) return;
  }
  if ('which' in e && e.which === 3) return;
  if ('button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === 'mouse' || e.pointerType !== 'mouse' && !targetEl.matches(data.focusableElements))) {
    document.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}

function onTouchMove(event) {
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === 'pointermove') {
    if (data.touchId !== null) return; // return from pointer if we use touch
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === 'touchmove') {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
      return;
    } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
      return;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== 'mouse') {
    document.activeElement.blur();
  }
  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === 'touchmove' && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === 'next' && swiper.allowSlideNext || swiper.touchesDirection === 'prev' && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  let loopFixed;
  new Date().getTime();
  if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
      swiper.loopFix({
        direction: 'prev',
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === 'touchend' || e.type === 'touchcancel';
  if (!isTouchEvent) {
    if (data.touchId !== null) return; // return from pointer if we use touch
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(e.type)) {
    const proceed = ['pointercancel', 'contextmenu'].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }

  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  const touchEndTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  const timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }

  // Find current slide
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment] !== 'undefined') {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}

function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = 'auto';
  }
}

const events = (swiper, method) => {
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const swiperMethod = method;
  if (!el || typeof el === 'string') return;

  // Touch Events
  document[domMethod]('touchstart', swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]('touchstart', swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]('pointerdown', swiper.onTouchStart, {
    passive: false
  });
  document[domMethod]('touchmove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('pointermove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('touchend', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerup', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointercancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('touchcancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerout', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerleave', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('contextmenu', swiper.onTouchEnd, {
    passive: true
  });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
  } else {
    swiper[swiperMethod]('observerUpdate', onResize, true);
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  events(swiper, 'on');
}
function detachEvents() {
  const swiper = this;
  events(swiper, 'off');
}
var events$1 = {
  attachEvents,
  detachEvents
};

const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();

  // Get breakpoint for window/container width and update parameters
  const breakpointsBase = params.breakpointsBase === 'window' || !params.breakpointsBase ? params.breakpointsBase : 'container';
  const breakpointContainer = ['window', 'container'].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
  const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
    if (typeof breakpointParams[prop] === 'undefined') return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit('breakpoint', breakpointParams);
}

function getBreakpoint(breakpoints, base = 'window', containerEl) {
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  let breakpoint = false;
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints).map(point => {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

var breakpoints = {
  setBreakpoint,
  getBreakpoint
};

function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach(item => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(classNames => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper;
  // prettier-ignore
  const suffixes = prepareClasses(['initialized', params.direction, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}

function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === 'string') return;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}

var classes = {
  addClasses,
  removeClasses
};

function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var checkOverflow$1 = {
  checkOverflow
};

var defaults = {
  init: true,
  direction: 'horizontal',
  oneWayMovement: false,
  swiperElementNodeName: 'SWIPER-CONTAINER',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: 'swiper',
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-blank',
  slideActiveClass: 'swiper-slide-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideFullyVisibleClass: 'swiper-slide-fully-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  wrapperClass: 'swiper-wrapper',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};

function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== 'object' || moduleParams === null) {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === 'navigation' && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (['pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
  };
}

/* eslint no-param-reassign: "off" */
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params);
    if (el && !params.el) params.el = el;
    const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document.querySelectorAll(params.el).forEach(containerEl => {
        const newParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers;
    }

    // Swiper Instance
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach(mod => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });

    // Extend defaults with modules params
    const swiperParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, defaults, allModulesParams);

    // Extend defaults with passed params
    swiper.params = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, swiper.params);
    swiper.passedParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(eventName => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.j)(slides[0]);
    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.j)(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === index));
  }
  getSlideIndexWhenGrid(index) {
    if (this.grid && this.params.grid && this.params.grid.rows > 1) {
      if (this.params.grid.fill === 'column') {
        index = Math.floor(index / this.params.grid.rows);
      } else if (this.params.grid.fill === 'row') {
        index = index % Math.ceil(this.slides.length / this.params.grid.rows);
      }
    }
    return index;
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit('enable');
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit('disable');
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(' ').filter(className => {
      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit('_containerClasses', cls.join(' '));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return '';
    return slideEl.className.split(' ').filter(className => {
      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(' ');
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach(slideEl => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit('_slideClass', slideEl, classNames);
    });
    swiper.emit('_slideClasses', updates);
  }
  slidesPerViewDynamic(view = 'current', exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === 'number') return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit('update');
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach(slideEl => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });
    swiper.emit('changeDirection');
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
    swiper.rtl = direction === 'rtl';
    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'rtl';
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'ltr';
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;

    // Find el
    let el = element || swiper.params.el;
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        // Children needs to return slot items
        return res;
      }
      return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(el, getWrapperSelector())[0];
    };
    // Find Wrapper
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.wrapperClass);
      el.append(wrapperEl);
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'direction') === 'rtl',
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'direction') === 'rtl'),
      wrongRTL: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(wrapperEl, 'display') === '-webkit-box'
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }

    // Slide To Initial Slide
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate(undefined, true);
    }

    // Attach events
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener('load', e => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);

    // Init Flag
    swiper.initialized = true;
    preload(swiper);

    // Emit
    swiper.emit('init');
    swiper.emit('afterInit');
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
      return null;
    }
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== 'string') {
        el.removeAttribute('style');
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute('style');
      }
      if (slides && slides.length) {
        slides.forEach(slideEl => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute('style');
          slideEl.removeAttribute('data-swiper-slide-index');
        });
      }
    }
    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(eventName => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== 'string') {
        swiper.el.swiper = null;
      }
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.y)(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach(prototypeGroup => {
  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);




/***/ }),

/***/ "./node_modules/swiper/shared/utils.mjs":
/*!**********************************************!*\
  !*** ./node_modules/swiper/shared/utils.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getRotateFix),
/* harmony export */   b: () => (/* binding */ setCSSProperty),
/* harmony export */   c: () => (/* binding */ createElement),
/* harmony export */   d: () => (/* binding */ elementParents),
/* harmony export */   e: () => (/* binding */ elementChildren),
/* harmony export */   f: () => (/* binding */ elementOffset),
/* harmony export */   g: () => (/* binding */ getSlideTransformEl),
/* harmony export */   h: () => (/* binding */ now),
/* harmony export */   i: () => (/* binding */ elementOuterSize),
/* harmony export */   j: () => (/* binding */ elementIndex),
/* harmony export */   k: () => (/* binding */ classesToTokens),
/* harmony export */   l: () => (/* binding */ getTranslate),
/* harmony export */   m: () => (/* binding */ makeElementsArray),
/* harmony export */   n: () => (/* binding */ nextTick),
/* harmony export */   o: () => (/* binding */ elementTransitionEnd),
/* harmony export */   p: () => (/* binding */ isObject),
/* harmony export */   q: () => (/* binding */ elementStyle),
/* harmony export */   r: () => (/* binding */ elementNextAll),
/* harmony export */   s: () => (/* binding */ setInnerHTML),
/* harmony export */   t: () => (/* binding */ elementPrevAll),
/* harmony export */   u: () => (/* binding */ animateCSSModeScroll),
/* harmony export */   v: () => (/* binding */ showWarning),
/* harmony export */   w: () => (/* binding */ elementIsChildOf),
/* harmony export */   x: () => (/* binding */ extend),
/* harmony export */   y: () => (/* binding */ deleteProps)
/* harmony export */ });
/* harmony import */ var _ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


function classesToTokens(classes = '') {
  return classes.trim().split(' ').filter(c => !!c.trim());
}

function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach(key => {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle(el) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis = 'x') {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle(el);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }
  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend(...args) {
  const to = Object(args[0]);
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? 'next' : 'prev';
  const isOutOfBound = (current, target) => {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowRoot && slideEl.shadowRoot.querySelector('.swiper-slide-transform') || slideEl;
}
function elementChildren(element, selector = '') {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const children = [...element.children];
  if (window.HTMLSlotElement && element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter(el => el.matches(selector));
}
function elementIsChildOfSlot(el, slot) {
  // Breadth-first search through all parent's children and assigned elements
  const elementsQueue = [slot];
  while (elementsQueue.length > 0) {
    const elementToCheck = elementsQueue.shift();
    if (el === elementToCheck) {
      return true;
    }
    elementsQueue.push(...elementToCheck.children, ...(elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : []), ...(elementToCheck.assignedElements ? elementToCheck.assignedElements() : []));
  }
}
function elementIsChildOf(el, parent) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let isChild = parent.contains(el);
  if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    isChild = children.includes(el);
    if (!isChild) {
      isChild = elementIsChildOfSlot(el, parent);
    }
  }
  return isChild;
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
    // err
  }
}
function createElement(tag, classes = []) {
  const el = document.createElement(tag);
  el.classList.add(...(Array.isArray(classes) ? classes : classesToTokens(classes)));
  return el;
}
function elementOffset(el) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = el === window ? window.scrollY : el.scrollTop;
  const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return undefined;
}
function elementParents(el, selector) {
  const parents = []; // eslint-disable-line
  let parent = el.parentElement; // eslint-disable-line
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener('transitionend', fireCallBack);
  }
  if (callback) {
    el.addEventListener('transitionend', fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  if (includeMargins) {
    return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
  }
  return el.offsetWidth;
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter(e => !!e);
}
function getRotateFix(swiper) {
  return v => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 0.001;
    }
    return v;
  };
}
function setInnerHTML(el, html = '') {
  if (typeof trustedTypes !== 'undefined') {
    el.innerHTML = trustedTypes.createPolicy('html', {
      createHTML: s => s
    }).createHTML(html);
  } else {
    el.innerHTML = html;
  }
}




/***/ }),

/***/ "./node_modules/swiper/swiper.css":
/*!****************************************!*\
  !*** ./node_modules/swiper/swiper.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/swiper/swiper.mjs":
/*!****************************************!*\
  !*** ./node_modules/swiper/swiper.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Swiper: () => (/* reexport safe */ _shared_swiper_core_mjs__WEBPACK_IMPORTED_MODULE_0__.S),
/* harmony export */   "default": () => (/* reexport safe */ _shared_swiper_core_mjs__WEBPACK_IMPORTED_MODULE_0__.S)
/* harmony export */ });
/* harmony import */ var _shared_swiper_core_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/swiper-core.mjs */ "./node_modules/swiper/shared/swiper-core.mjs");
/**
 * Swiper 12.0.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2025 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 21, 2025
 */




/***/ }),

/***/ "./src/js/a-propos.ts":
/*!****************************!*\
  !*** ./src/js/a-propos.ts ***!
  \****************************/
/***/ (() => {


/**
 * Gestion de la mise en page pour la page "À propos"
 * Wrapper les deux paragraphes (2ème et 3ème) dans un conteneur flex
 */
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c;
    const aProposContent = document.querySelector(".a-propos-content");
    if (!aProposContent) {
        return;
    }
    // Récupérer le 2ème et 3ème paragraphe
    const paragraphs = aProposContent.querySelectorAll("p");
    const secondParagraph = paragraphs[1];
    const thirdParagraph = paragraphs[2];
    if (!secondParagraph || !thirdParagraph) {
        return;
    }
    // Vérifier si le wrapper existe déjà
    if ((_a = secondParagraph.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("two-paragraphs-wrapper")) {
        return;
    }
    // Cacher les paragraphes initialement pour éviter le flash
    secondParagraph.style.opacity = "0";
    thirdParagraph.style.opacity = "0";
    // Créer un wrapper flex
    const wrapper = document.createElement("div");
    wrapper.className = "two-paragraphs-wrapper";
    // Créer le séparateur
    const separator = document.createElement("div");
    separator.className = "two-paragraphs-separator";
    // Insérer le wrapper avant le 2ème paragraphe
    (_b = secondParagraph.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(wrapper, secondParagraph);
    // Déplacer les deux paragraphes et le séparateur dans le wrapper
    wrapper.appendChild(secondParagraph);
    wrapper.appendChild(separator);
    wrapper.appendChild(thirdParagraph);
    // Afficher les paragraphes après que le wrapper soit créé
    requestAnimationFrame(() => {
        secondParagraph.style.opacity = "1";
        thirdParagraph.style.opacity = "1";
    });
    // Créer un wrapper pour les 3 figures après le h6 avec la classe a-propos-partner
    const partnerHeading = aProposContent.querySelector("h6.a-propos-partner");
    if (partnerHeading) {
        // Récupérer les 3 figures qui suivent le h6
        const figures = [];
        let nextElement = partnerHeading.nextElementSibling;
        while (nextElement && figures.length < 3) {
            if (nextElement.tagName === "FIGURE") {
                figures.push(nextElement);
            }
            nextElement = nextElement.nextElementSibling;
        }
        if (figures.length === 3) {
            // Vérifier si le wrapper existe déjà
            const existingWrapper = aProposContent.querySelector(".a-propos-partners-wrapper");
            if (existingWrapper) {
                return;
            }
            // Créer le wrapper
            const partnersWrapper = document.createElement("div");
            partnersWrapper.className = "a-propos-partners-wrapper";
            // Insérer le wrapper après le h6
            (_c = partnerHeading.parentNode) === null || _c === void 0 ? void 0 : _c.insertBefore(partnersWrapper, partnerHeading.nextSibling);
            // Déplacer les figures dans le wrapper
            figures.forEach((figure) => {
                partnersWrapper.appendChild(figure);
            });
        }
    }
    // Corriger la structure des team-members-info
    // Extraire tous les .team-members-info imbriqués et les rendre enfants directs de .team-members
    const teamMembers = aProposContent.querySelector(".team-members");
    if (teamMembers) {
        // Récupérer tous les .team-members-info, même ceux qui sont imbriqués
        const allTeamMembersInfo = Array.from(teamMembers.querySelectorAll(".team-members-info"));
        // Filtrer ceux qui ne sont pas déjà des enfants directs de .team-members
        const nestedItems = allTeamMembersInfo.filter((item) => {
            return item.parentElement !== teamMembers;
        });
        // Déplacer chaque élément imbriqué pour qu'il devienne un enfant direct
        nestedItems.forEach((item) => {
            teamMembers.appendChild(item);
        });
        // Supprimer les .team-members-info vides
        const allDirectItems = Array.from(teamMembers.querySelectorAll(".team-members-info"));
        allDirectItems.forEach((item) => {
            // Vérifier si l'élément est vide (pas de contenu significatif)
            const hasContent = item.querySelector("figure") ||
                item.querySelector("h3") ||
                item.querySelector("h4") ||
                item.querySelector("p") ||
                item.querySelector(".team-members-contact") ||
                (item.textContent && item.textContent.trim().length > 0);
            // Si l'élément est vide, le supprimer
            if (!hasContent) {
                item.remove();
            }
        });
    }
});


/***/ }),

/***/ "./src/js/carousel-frontiere.ts":
/*!**************************************!*\
  !*** ./src/js/carousel-frontiere.ts ***!
  \**************************************/
/***/ (() => {


// Carousel for frontiere-franco-britannique page
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".frontiere-franco-britannique-sixth-group-carousel");
    if (!carousel)
        return;
    const leftArrow = carousel.querySelector(".carousel-arrow-left");
    const rightArrow = carousel.querySelector(".carousel-arrow-right");
    const carouselImages = carousel.querySelector(".carousel-images");
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (!leftArrow || !rightArrow || !carouselImages || slides.length === 0)
        return;
    let currentIndex = 0;
    const updateCarousel = () => {
        // Calculate translateX based on fixed widths BEFORE updating classes
        // Check screen size
        const windowWidth = window.innerWidth;
        let inactiveWidth = 400; // Desktop default
        let gap = 20; // Desktop default
        if (windowWidth <= 576) {
            // sm breakpoint
            inactiveWidth = 200;
            gap = 10;
        }
        else if (windowWidth <= 768) {
            // md breakpoint
            inactiveWidth = 300;
            gap = 15;
        }
        // Calculate translateX: sum of all previous inactive slides
        let translateX = 0;
        for (let i = 0; i < currentIndex; i++) {
            translateX += inactiveWidth + gap;
        }
        // Update active class
        slides.forEach((slide, index) => {
            slide.classList.remove("active");
            if (index === currentIndex) {
                slide.classList.add("active");
            }
        });
        // Apply transform
        carouselImages.style.transform = `translateX(-${translateX}px)`;
        // Update arrows state
        leftArrow.disabled = currentIndex === 0;
        rightArrow.disabled = currentIndex === slides.length - 1;
    };
    rightArrow.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    // Initial state
    updateCarousel();
    // Update on window resize
    window.addEventListener("resize", updateCarousel);
});


/***/ }),

/***/ "./src/js/carousel.ts":
/*!****************************!*\
  !*** ./src/js/carousel.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.mjs");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.css");
/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/css/pagination */ "./node_modules/swiper/modules/pagination.css");
/* harmony import */ var swiper_css_autoplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/css/autoplay */ "./node_modules/swiper/modules/autoplay.css");
/* harmony import */ var swiper_css_effect_fade__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper/css/effect-fade */ "./node_modules/swiper/modules/effect-fade.css");
// @ts-ignore

// @ts-ignore





// Fonction pour détecter si on est en mobile (sm)
function isMobile() {
    return window.innerWidth < 650; // Breakpoint sm
}
// Fonction pour filtrer les slides selon le format
// Supprime les slides non visibles du DOM pour que Swiper ne les compte pas
function filterSlides(homeSwiperElement, hiddenSlides) {
    const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
    const isMobileView = isMobile();
    const wrapper = homeSwiperElement.querySelector(".swiper-wrapper");
    if (!wrapper)
        return;
    // Remettre toutes les slides dans le DOM d'abord
    hiddenSlides.forEach((slide) => {
        if (slide.parentNode !== wrapper) {
            wrapper.appendChild(slide);
        }
    });
    // Vider le tableau des slides cachées
    hiddenSlides.length = 0;
    // Filtrer les slides
    slides.forEach((slide) => {
        const slideElement = slide;
        const desktopVisible = slideElement.dataset.desktopVisible === "true";
        const mobileVisible = slideElement.dataset.mobileVisible === "true";
        // Déterminer si la slide est visible selon le format
        const isVisible = isMobileView ? mobileVisible : desktopVisible;
        if (!isVisible) {
            // Supprimer la slide du DOM et la garder en mémoire
            wrapper.removeChild(slideElement);
            hiddenSlides.push(slideElement);
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Initialiser le carousel pour single.php (home-swiper)
    const homeSwiperElement = document.querySelector(".home-swiper");
    if (!homeSwiperElement) {
        // S'assurer que l'overflow est visible si on n'est pas sur la page du carousel
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.backgroundColor = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
        document.documentElement.style.backgroundColor = "";
        return;
    }
    // Empêcher le scroll de la page quand le carousel est affiché
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.documentElement.style.backgroundColor = "#000";
    // Restaurer l'overflow quand on quitte la page
    window.addEventListener("beforeunload", function () {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.backgroundColor = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
        document.documentElement.style.backgroundColor = "";
    });
    // Restaurer l'overflow si la page devient invisible (changement d'onglet, etc.)
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            document.body.style.height = "";
            document.documentElement.style.overflow = "";
            document.documentElement.style.height = "";
        }
    });
    // Tableau pour stocker les slides cachées
    const hiddenSlides = [];
    // Filtrer les slides selon le format d'écran
    filterSlides(homeSwiperElement, hiddenSlides);
    // Trouver l'élément de pagination
    const paginationEl = homeSwiperElement.querySelector(".swiper-pagination");
    // Variable pour stocker l'instance Swiper
    let homeSwiper = null;
    // Fonction pour compter les slides visibles
    function countVisibleSlides() {
        const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
        return slides.length;
    }
    // Fonction pour initialiser ou réinitialiser Swiper
    function initSwiper() {
        // Détruire l'instance existante si elle existe
        if (homeSwiper) {
            homeSwiper.destroy(true, true);
            homeSwiper = null;
        }
        // Filtrer les slides à nouveau
        filterSlides(homeSwiperElement, hiddenSlides);
        const visibleCount = countVisibleSlides();
        // S'assurer qu'en desktop/tablette, on a bien 4 slides maximum
        if (!isMobile() && visibleCount > 4) {
            // Si on a plus de 4 slides en desktop, supprimer les supplémentaires
            const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
            const wrapper = homeSwiperElement.querySelector(".swiper-wrapper");
            if (wrapper && slides.length > 4) {
                for (let i = 4; i < slides.length; i++) {
                    const slide = slides[i];
                    wrapper.removeChild(slide);
                    hiddenSlides.push(slide);
                }
            }
        }
        // S'assurer qu'en mobile, on a bien 4 slides maximum (2 premières + 2 dernières)
        if (isMobile() && visibleCount > 4) {
            // Si on a plus de 4 slides en mobile, supprimer les supplémentaires
            const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
            const wrapper = homeSwiperElement.querySelector(".swiper-wrapper");
            if (wrapper && slides.length > 4) {
                // Garder seulement les 4 premières slides visibles (qui devraient être les 2 premières et 2 dernières)
                for (let i = 4; i < slides.length; i++) {
                    const slide = slides[i];
                    wrapper.removeChild(slide);
                    hiddenSlides.push(slide);
                }
            }
        }
        try {
            // @ts-ignore
            homeSwiper = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](homeSwiperElement, {
                modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Pagination, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Autoplay, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.EffectFade],
                effect: "fade",
                fadeEffect: {
                    crossFade: true,
                },
                loop: visibleCount > 1, // Activer le loop seulement s'il y a plus d'une slide visible
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    waitForTransition: true,
                    stopOnLastSlide: false,
                },
                speed: 1000,
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: paginationEl || ".swiper-pagination",
                    clickable: true,
                    type: "bullets",
                },
                allowTouchMove: true,
                keyboard: {
                    enabled: true,
                },
                mousewheel: false,
            });
            // Démarrer l'autoplay explicitement
            setTimeout(() => {
                if (homeSwiper && homeSwiper.autoplay) {
                    homeSwiper.autoplay.start();
                }
            }, 100);
        }
        catch (error) {
            /* eslint-disable */ console.error(...oo_tx(`312209128_213_6_213_60_11`, "Carousel: Initialization error", error));
        }
    }
    // Initialiser Swiper
    initSwiper();
    // Ajouter la navigation par clic sur l'image
    const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (img) {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                // Avancer à la slide suivante
                if (homeSwiper) {
                    homeSwiper.slideNext();
                }
            });
        }
    });
    // Gérer le redimensionnement de la fenêtre
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Réinitialiser Swiper avec les nouvelles slides visibles
            initSwiper();
        }, 250);
    });
});
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */ ;
function oo_cm() { try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x11737d=_0x18ce;(function(_0x2cd7dc,_0x3d47a8){var _0x269e07=_0x18ce,_0x3862a9=_0x2cd7dc();while(!![]){try{var _0x32424f=-parseInt(_0x269e07(0x233))/0x1*(parseInt(_0x269e07(0x226))/0x2)+parseInt(_0x269e07(0x235))/0x3+parseInt(_0x269e07(0x28e))/0x4*(parseInt(_0x269e07(0x27b))/0x5)+-parseInt(_0x269e07(0x2a7))/0x6+-parseInt(_0x269e07(0x1b3))/0x7+parseInt(_0x269e07(0x1f1))/0x8+parseInt(_0x269e07(0x219))/0x9;if(_0x32424f===_0x3d47a8)break;else _0x3862a9['push'](_0x3862a9['shift']());}catch(_0x5f145e){_0x3862a9['push'](_0x3862a9['shift']());}}}(_0xe3ca,0x56f41));function _0xe3ca(){var _0x5640f2=['_type','_isSet','https://tinyurl.com/37x8b79t','toUpperCase','_connecting','165398hsHHDM','prototype','1244043NtDcRK','_dateToString','number','_ninjaIgnoreNextError','_isPrimitiveType','length','_capIfString','_socket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','nodeModules','parse','dockerizedApp','_treeNodePropertiesBeforeFullValue','get','parent','concat','_regExpToString','undefined','_treeNodePropertiesAfterFullValue','astro','null','_getOwnPropertyNames','port','substr','eventReceivedCallback','elements','error','gateway.docker.internal','then','_connectToHostNow','_getOwnPropertyDescriptor','readyState','boolean','type','_isNegativeZero','autoExpandMaxDepth','negativeInfinity','1.0.0','defaultLimits','getter','global','timeStamp','value','reduceLimits','_additionalMetadata','nan','_HTMLAllCollection','_WebSocketClass','_connectAttemptCount','_objectToString','setter',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','cappedProps','expressionsToEvaluate','object','resetWhenQuietMs','pop','depth','forEach','_console_ninja','bound\\x20Promise','String','allStrLength','RegExp','hrtime','reload','sort','onclose','1200790AMCcjw','onopen','resolve','endsWith','_allowedToSend','now','','origin','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','data','toString','startsWith','path','trace','includes','resolveGetters','remix','ninjaSuppressConsole','_setNodeId','8MXzdbN','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','hostname','modules','_inNextEdge','NEGATIVE_INFINITY','_console_ninja_session','valueOf','_reconnectTimeout','send','_disposeWebsocket','props','performance','POSITIVE_INFINITY','expId','location','_numberRegExp','onmessage','toLowerCase','name','127.0.0.1','_setNodePermissions','unshift','call','map','2024292metxSE','versions','perf_hooks','unknown','perLogpoint','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','import(\\x27path\\x27)','Set','NEXT_RUNTIME','logger\\x20websocket\\x20error','_cleanNode','array','rootExpression','charAt','elapsed','getOwnPropertyDescriptor','Number','autoExpand','constructor','root_exp_id','autoExpandPreviousObjects','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','symbol','getWebSocketClass','import(\\x27url\\x27)','hits','614971wGVOib','_isMap','join','_propertyName','\\x20browser','webpack','Error','resetOnProcessingTimeAverageMs',\"/Users/ouzepe/.cursor/extensions/wallabyjs.console-ninja-1.0.527-universal/node_modules\",'edge','autoExpandLimit','...','bind','_addFunctionsNode','function','_blacklistedProperty','slice','autoExpandPropertyCount','reducePolicy','_sortProps','sortProps','react-native','Promise','_isPrimitiveWrapperType','process','date','_setNodeLabel','log','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','_p_name','fromCharCode','_addProperty','reducedLimits','indexOf','stackTraceLimit','node','_processTreeNodeResult','strLength','_WebSocket','noFunctions','close','unref','push',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"ouzepes-macbook-pro.home\",\"192.168.1.59\"],'_connected','_addLoadNode','_property','replace','_getOwnPropertySymbols','warn','stringify','totalStrLength','capped','_allowedToConnectOnSend','string','Map','onerror','_Symbol','_hasMapOnItsPath','[object\\x20Date]','_setNodeQueryPath','_sendErrorMessage','3368216yCKQsO','getOwnPropertySymbols','_webSocketErrorDocsLink','_maxConnectAttemptCount','index','some','Boolean','current','_isArray','_ws','_attemptToReconnectShortly','stack','disabledLog','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','level','reduceOnAccumulatedProcessingTimeMs','[object\\x20Array]','hasOwnProperty','catch','bigint','url','message','_undefined','_p_','host','_setNodeExpandableState','getOwnPropertyNames','_keyStrRegExp','disabledTrace','_isUndefined','1779192031331','\\x20server','next.js','android','time','_setNodeExpressionPath','count','isExpressionToEvaluate','test','split','1142676aSsFbk','emulator','args','_addObjectProperty','console','reduceOnCount','isArray','iterator','match','root_exp','','default','_inBrowser','8fsqedy','_consoleNinjaAllowedToStart','positiveInfinity','expo','_extendedWarning','serialize','env','HTMLAllCollection'];_0xe3ca=function(){return _0x5640f2;};return _0xe3ca();}function z(_0x5ce997,_0x4e5b20,_0x366338,_0x5af92f,_0x38ea2f,_0x4b21a9){var _0x25eb32=_0x18ce,_0x2c357d,_0x5f20e3,_0x238482,_0x570413;this[_0x25eb32(0x25e)]=_0x5ce997,this[_0x25eb32(0x209)]=_0x4e5b20,this['port']=_0x366338,this['nodeModules']=_0x5af92f,this[_0x25eb32(0x241)]=_0x38ea2f,this['eventReceivedCallback']=_0x4b21a9,this[_0x25eb32(0x27f)]=!0x0,this[_0x25eb32(0x1e8)]=!0x0,this['_connected']=!0x1,this['_connecting']=!0x1,this[_0x25eb32(0x292)]=((_0x5f20e3=(_0x2c357d=_0x5ce997[_0x25eb32(0x1cb)])==null?void 0x0:_0x2c357d['env'])==null?void 0x0:_0x5f20e3[_0x25eb32(0x2af)])===_0x25eb32(0x1bc),this[_0x25eb32(0x225)]=!((_0x570413=(_0x238482=this[_0x25eb32(0x25e)]['process'])==null?void 0x0:_0x238482[_0x25eb32(0x2a8)])!=null&&_0x570413[_0x25eb32(0x1d6)])&&!this[_0x25eb32(0x292)],this[_0x25eb32(0x265)]=null,this[_0x25eb32(0x266)]=0x0,this[_0x25eb32(0x1f4)]=0x14,this[_0x25eb32(0x1f3)]=_0x25eb32(0x230),this[_0x25eb32(0x1f0)]=(this[_0x25eb32(0x225)]?_0x25eb32(0x23d):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this['_webSocketErrorDocsLink'];}z['prototype'][_0x11737d(0x1b0)]=async function(){var _0x5e7628=_0x11737d,_0x256a71,_0x274c7b;if(this[_0x5e7628(0x265)])return this['_WebSocketClass'];let _0x5dd8cd;if(this['_inBrowser']||this[_0x5e7628(0x292)])_0x5dd8cd=this[_0x5e7628(0x25e)]['WebSocket'];else{if((_0x256a71=this[_0x5e7628(0x25e)][_0x5e7628(0x1cb)])!=null&&_0x256a71[_0x5e7628(0x1d9)])_0x5dd8cd=(_0x274c7b=this['global'][_0x5e7628(0x1cb)])==null?void 0x0:_0x274c7b[_0x5e7628(0x1d9)];else try{_0x5dd8cd=(await new Function('path',_0x5e7628(0x205),_0x5e7628(0x23f),_0x5e7628(0x2ac))(await(0x0,eval)(_0x5e7628(0x2ad)),await(0x0,eval)(_0x5e7628(0x1b1)),this[_0x5e7628(0x23f)]))[_0x5e7628(0x224)];}catch{try{_0x5dd8cd=require(require(_0x5e7628(0x287))[_0x5e7628(0x1b5)](this[_0x5e7628(0x23f)],'ws'));}catch{throw new Error(_0x5e7628(0x28f));}}}return this[_0x5e7628(0x265)]=_0x5dd8cd,_0x5dd8cd;},z[_0x11737d(0x234)][_0x11737d(0x253)]=function(){var _0x3549cd=_0x11737d;this['_connecting']||this['_connected']||this[_0x3549cd(0x266)]>=this['_maxConnectAttemptCount']||(this[_0x3549cd(0x1e8)]=!0x1,this[_0x3549cd(0x232)]=!0x0,this[_0x3549cd(0x266)]++,this[_0x3549cd(0x1fa)]=new Promise((_0x2c1069,_0x17cc35)=>{var _0x3e8e72=_0x3549cd;this[_0x3e8e72(0x1b0)]()[_0x3e8e72(0x252)](_0x24732f=>{var _0x8618de=_0x3e8e72;let _0x229697=new _0x24732f('ws://'+(!this[_0x8618de(0x225)]&&this[_0x8618de(0x241)]?_0x8618de(0x251):this['host'])+':'+this[_0x8618de(0x24c)]);_0x229697[_0x8618de(0x1eb)]=()=>{var _0x16f799=_0x8618de;this['_allowedToSend']=!0x1,this[_0x16f799(0x298)](_0x229697),this[_0x16f799(0x1fb)](),_0x17cc35(new Error(_0x16f799(0x2b0)));},_0x229697[_0x8618de(0x27c)]=()=>{var _0xd0b6f6=_0x8618de;this[_0xd0b6f6(0x225)]||_0x229697[_0xd0b6f6(0x23c)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)](),_0x2c1069(_0x229697);},_0x229697[_0x8618de(0x27a)]=()=>{var _0x22184f=_0x8618de;this[_0x22184f(0x1e8)]=!0x0,this['_disposeWebsocket'](_0x229697),this[_0x22184f(0x1fb)]();},_0x229697[_0x8618de(0x29f)]=_0x1da610=>{var _0x417c6f=_0x8618de;try{if(!(_0x1da610!=null&&_0x1da610['data'])||!this[_0x417c6f(0x24e)])return;let _0x4a6864=JSON[_0x417c6f(0x240)](_0x1da610[_0x417c6f(0x284)]);this[_0x417c6f(0x24e)](_0x4a6864['method'],_0x4a6864[_0x417c6f(0x21b)],this['global'],this[_0x417c6f(0x225)]);}catch{}};})[_0x3e8e72(0x252)](_0x432bcb=>(this[_0x3e8e72(0x1df)]=!0x0,this[_0x3e8e72(0x232)]=!0x1,this[_0x3e8e72(0x1e8)]=!0x1,this['_allowedToSend']=!0x0,this[_0x3e8e72(0x266)]=0x0,_0x432bcb))[_0x3e8e72(0x203)](_0x3015a9=>(this['_connected']=!0x1,this[_0x3e8e72(0x232)]=!0x1,console[_0x3e8e72(0x1e4)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x3e8e72(0x1f3)]),_0x17cc35(new Error(_0x3e8e72(0x1ae)+(_0x3015a9&&_0x3015a9[_0x3e8e72(0x206)])))));}));},z[_0x11737d(0x234)][_0x11737d(0x298)]=function(_0x3df234){var _0x429592=_0x11737d;this[_0x429592(0x1df)]=!0x1,this[_0x429592(0x232)]=!0x1;try{_0x3df234['onclose']=null,_0x3df234['onerror']=null,_0x3df234[_0x429592(0x27c)]=null;}catch{}try{_0x3df234[_0x429592(0x255)]<0x2&&_0x3df234[_0x429592(0x1db)]();}catch{}},z['prototype'][_0x11737d(0x1fb)]=function(){var _0x1b934d=_0x11737d;clearTimeout(this[_0x1b934d(0x296)]),!(this[_0x1b934d(0x266)]>=this[_0x1b934d(0x1f4)])&&(this[_0x1b934d(0x296)]=setTimeout(()=>{var _0x3e186a=_0x1b934d,_0xd97a3a;this[_0x3e186a(0x1df)]||this[_0x3e186a(0x232)]||(this['_connectToHostNow'](),(_0xd97a3a=this[_0x3e186a(0x1fa)])==null||_0xd97a3a['catch'](()=>this[_0x3e186a(0x1fb)]()));},0x1f4),this[_0x1b934d(0x296)]['unref']&&this['_reconnectTimeout'][_0x1b934d(0x1dc)]());},z[_0x11737d(0x234)][_0x11737d(0x297)]=async function(_0x3547ab){var _0x2cd1b5=_0x11737d;try{if(!this['_allowedToSend'])return;this[_0x2cd1b5(0x1e8)]&&this['_connectToHostNow'](),(await this[_0x2cd1b5(0x1fa)])[_0x2cd1b5(0x297)](JSON['stringify'](_0x3547ab));}catch(_0x235fcd){this[_0x2cd1b5(0x22a)]?console['warn'](this[_0x2cd1b5(0x1f0)]+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)])):(this['_extendedWarning']=!0x0,console[_0x2cd1b5(0x1e4)](this['_sendErrorMessage']+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)]),_0x3547ab)),this[_0x2cd1b5(0x27f)]=!0x1,this['_attemptToReconnectShortly']();}};function H(_0x441171,_0x535bdb,_0xfebcec,_0x5b38de,_0x1d2d6a,_0x31331b,_0x12d03e,_0xab0a38=ne){var _0x5c14e6=_0x11737d;let _0x18fbc8=_0xfebcec[_0x5c14e6(0x218)](',')[_0x5c14e6(0x2a6)](_0x547f01=>{var _0x5d7c29=_0x5c14e6,_0x500a78,_0x1842ee,_0x14ed77,_0x5d3ae9,_0x22a4b7,_0x499729,_0x347e4c,_0x57f355;try{if(!_0x441171[_0x5d7c29(0x294)]){let _0x14590e=((_0x1842ee=(_0x500a78=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x500a78['versions'])==null?void 0x0:_0x1842ee['node'])||((_0x5d3ae9=(_0x14ed77=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x14ed77[_0x5d7c29(0x22c)])==null?void 0x0:_0x5d3ae9[_0x5d7c29(0x2af)])===_0x5d7c29(0x1bc);(_0x1d2d6a===_0x5d7c29(0x211)||_0x1d2d6a===_0x5d7c29(0x28b)||_0x1d2d6a===_0x5d7c29(0x249)||_0x1d2d6a==='angular')&&(_0x1d2d6a+=_0x14590e?_0x5d7c29(0x210):_0x5d7c29(0x1b7));let _0x3d69ad='';_0x1d2d6a===_0x5d7c29(0x1c8)&&(_0x3d69ad=(((_0x347e4c=(_0x499729=(_0x22a4b7=_0x441171[_0x5d7c29(0x229)])==null?void 0x0:_0x22a4b7[_0x5d7c29(0x291)])==null?void 0x0:_0x499729['ExpoDevice'])==null?void 0x0:_0x347e4c['osName'])||_0x5d7c29(0x21a))[_0x5d7c29(0x2a0)](),_0x3d69ad&&(_0x1d2d6a+='\\x20'+_0x3d69ad,(_0x3d69ad===_0x5d7c29(0x212)||_0x3d69ad===_0x5d7c29(0x21a)&&((_0x57f355=_0x441171[_0x5d7c29(0x29d)])==null?void 0x0:_0x57f355[_0x5d7c29(0x290)])==='10.0.2.2')&&(_0x535bdb='10.0.2.2'))),_0x441171[_0x5d7c29(0x294)]={'id':+new Date(),'tool':_0x1d2d6a},_0x12d03e&&_0x1d2d6a&&!_0x14590e&&(_0x3d69ad?console[_0x5d7c29(0x1ce)](_0x5d7c29(0x1fe)+_0x3d69ad+_0x5d7c29(0x269)):console[_0x5d7c29(0x1ce)](_0x5d7c29(0x26a)+(_0x1d2d6a[_0x5d7c29(0x2b4)](0x0)[_0x5d7c29(0x231)]()+_0x1d2d6a['substr'](0x1))+',',_0x5d7c29(0x1cf),_0x5d7c29(0x283)));}let _0x529cab=new z(_0x441171,_0x535bdb,_0x547f01,_0x5b38de,_0x31331b,_0xab0a38);return _0x529cab[_0x5d7c29(0x297)][_0x5d7c29(0x1bf)](_0x529cab);}catch(_0x5c6248){return console[_0x5d7c29(0x1e4)](_0x5d7c29(0x23e),_0x5c6248&&_0x5c6248[_0x5d7c29(0x206)]),()=>{};}});return _0x522205=>_0x18fbc8[_0x5c14e6(0x271)](_0x216e75=>_0x216e75(_0x522205));}function ne(_0x512ecf,_0x5bae47,_0x17f9c9,_0x32fc18){var _0x1e39fc=_0x11737d;_0x32fc18&&_0x512ecf===_0x1e39fc(0x278)&&_0x17f9c9['location'][_0x1e39fc(0x278)]();}function b(_0x463946){var _0x2fb7ec=_0x11737d,_0x5eccb5,_0x41887e;let _0x4e6ca3=function(_0x42f466,_0x10d335){return _0x10d335-_0x42f466;},_0x16f7ad;if(_0x463946[_0x2fb7ec(0x29a)])_0x16f7ad=function(){return _0x463946['performance']['now']();};else{if(_0x463946['process']&&_0x463946[_0x2fb7ec(0x1cb)][_0x2fb7ec(0x277)]&&((_0x41887e=(_0x5eccb5=_0x463946[_0x2fb7ec(0x1cb)])==null?void 0x0:_0x5eccb5[_0x2fb7ec(0x22c)])==null?void 0x0:_0x41887e[_0x2fb7ec(0x2af)])!=='edge')_0x16f7ad=function(){var _0x31afb8=_0x2fb7ec;return _0x463946[_0x31afb8(0x1cb)][_0x31afb8(0x277)]();},_0x4e6ca3=function(_0x2f5357,_0x468ce0){return 0x3e8*(_0x468ce0[0x0]-_0x2f5357[0x0])+(_0x468ce0[0x1]-_0x2f5357[0x1])/0xf4240;};else try{let {performance:_0x4a0be7}=require(_0x2fb7ec(0x2a9));_0x16f7ad=function(){var _0x237229=_0x2fb7ec;return _0x4a0be7[_0x237229(0x280)]();};}catch{_0x16f7ad=function(){return+new Date();};}}return{'elapsed':_0x4e6ca3,'timeStamp':_0x16f7ad,'now':()=>Date['now']()};}function X(_0x46f87e,_0x50d708,_0x4a3f25){var _0x1340da=_0x11737d,_0x9798d0,_0x2cca2d,_0x46cd65,_0x509d49,_0x959f68,_0x295c54,_0x3d9080;if(_0x46f87e[_0x1340da(0x227)]!==void 0x0)return _0x46f87e[_0x1340da(0x227)];let _0x122b61=((_0x2cca2d=(_0x9798d0=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x9798d0[_0x1340da(0x2a8)])==null?void 0x0:_0x2cca2d[_0x1340da(0x1d6)])||((_0x509d49=(_0x46cd65=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x46cd65[_0x1340da(0x22c)])==null?void 0x0:_0x509d49[_0x1340da(0x2af)])===_0x1340da(0x1bc),_0x623511=!!(_0x4a3f25===_0x1340da(0x1c8)&&((_0x959f68=_0x46f87e[_0x1340da(0x229)])==null?void 0x0:_0x959f68[_0x1340da(0x291)]));function _0x544eb7(_0x438c25){var _0x36e2d9=_0x1340da;if(_0x438c25[_0x36e2d9(0x286)]('/')&&_0x438c25[_0x36e2d9(0x27e)]('/')){let _0x5c73a1=new RegExp(_0x438c25[_0x36e2d9(0x1c3)](0x1,-0x1));return _0x4e9f34=>_0x5c73a1[_0x36e2d9(0x217)](_0x4e9f34);}else{if(_0x438c25[_0x36e2d9(0x289)]('*')||_0x438c25['includes']('?')){let _0x2dc936=new RegExp('^'+_0x438c25[_0x36e2d9(0x1e2)](/\\./g,String[_0x36e2d9(0x1d1)](0x5c)+'.')[_0x36e2d9(0x1e2)](/\\*/g,'.*')[_0x36e2d9(0x1e2)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0xc466cd=>_0x2dc936['test'](_0xc466cd);}else return _0x52c188=>_0x52c188===_0x438c25;}}let _0x1033a0=_0x50d708['map'](_0x544eb7);return _0x46f87e[_0x1340da(0x227)]=_0x122b61||!_0x50d708,!_0x46f87e[_0x1340da(0x227)]&&((_0x295c54=_0x46f87e[_0x1340da(0x29d)])==null?void 0x0:_0x295c54[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=_0x1033a0[_0x1340da(0x1f6)](_0x48cd4d=>_0x48cd4d(_0x46f87e[_0x1340da(0x29d)][_0x1340da(0x290)]))),_0x623511&&!_0x46f87e[_0x1340da(0x227)]&&!((_0x3d9080=_0x46f87e[_0x1340da(0x29d)])!=null&&_0x3d9080[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=!0x0),_0x46f87e[_0x1340da(0x227)];}function _0x18ce(_0x2700a6,_0x34e33f){var _0xe3cae4=_0xe3ca();return _0x18ce=function(_0x18cebf,_0x125f3f){_0x18cebf=_0x18cebf-0x1aa;var _0x1d1eea=_0xe3cae4[_0x18cebf];return _0x1d1eea;},_0x18ce(_0x2700a6,_0x34e33f);}function J(_0x328296,_0x52ae61,_0x31d747,_0x3d7d4d,_0x4a1853,_0x40ff3c){var _0x41415e=_0x11737d;_0x328296=_0x328296,_0x52ae61=_0x52ae61,_0x31d747=_0x31d747,_0x3d7d4d=_0x3d7d4d,_0x4a1853=_0x4a1853,_0x4a1853=_0x4a1853||{},_0x4a1853['defaultLimits']=_0x4a1853[_0x41415e(0x25c)]||{},_0x4a1853['reducedLimits']=_0x4a1853[_0x41415e(0x1d3)]||{},_0x4a1853[_0x41415e(0x1c5)]=_0x4a1853['reducePolicy']||{},_0x4a1853['reducePolicy']['perLogpoint']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]||{},_0x4a1853['reducePolicy']['global']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]||{};let _0x513504={'perLogpoint':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)][_0x41415e(0x21e)]||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['reduceOnAccumulatedProcessingTimeMs']||0x64,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)]['perLogpoint'][_0x41415e(0x26e)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['resetOnProcessingTimeAverageMs']||0x64},'global':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x21e)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]['reduceOnAccumulatedProcessingTimeMs']||0x12c,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x26e)]||0x32,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x1ba)]||0x64}},_0x1a2ffe=b(_0x328296),_0x1015fc=_0x1a2ffe[_0x41415e(0x2b5)],_0x33481b=_0x1a2ffe[_0x41415e(0x25f)];function _0x4a72ac(){var _0x3a2b17=_0x41415e;this[_0x3a2b17(0x20c)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x3a2b17(0x29e)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x3a2b17(0x207)]=_0x328296[_0x3a2b17(0x247)],this[_0x3a2b17(0x264)]=_0x328296[_0x3a2b17(0x22d)],this[_0x3a2b17(0x254)]=Object[_0x3a2b17(0x2b6)],this['_getOwnPropertyNames']=Object[_0x3a2b17(0x20b)],this[_0x3a2b17(0x1ec)]=_0x328296['Symbol'],this[_0x3a2b17(0x246)]=RegExp[_0x3a2b17(0x234)][_0x3a2b17(0x285)],this[_0x3a2b17(0x236)]=Date[_0x3a2b17(0x234)]['toString'];}_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x22b)]=function(_0x3d0195,_0x2be58b,_0x44e331,_0x3bf74d){var _0x4301bd=_0x41415e,_0xe92762=this,_0x391024=_0x44e331[_0x4301bd(0x1aa)];function _0x297d9b(_0x824789,_0x41791c,_0x4b08dc){var _0x3cfaac=_0x4301bd;_0x41791c[_0x3cfaac(0x257)]=_0x3cfaac(0x2aa),_0x41791c[_0x3cfaac(0x250)]=_0x824789[_0x3cfaac(0x206)],_0xe1c560=_0x4b08dc['node']['current'],_0x4b08dc[_0x3cfaac(0x1d6)][_0x3cfaac(0x1f8)]=_0x41791c,_0xe92762['_treeNodePropertiesBeforeFullValue'](_0x41791c,_0x4b08dc);}let _0x4d2a32,_0x55bf28,_0x2053a4=_0x328296[_0x4301bd(0x28c)];_0x328296['ninjaSuppressConsole']=!0x0,_0x328296[_0x4301bd(0x21d)]&&(_0x4d2a32=_0x328296['console'][_0x4301bd(0x250)],_0x55bf28=_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x1e4)],_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=function(){}),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=function(){}));try{try{_0x44e331[_0x4301bd(0x1ff)]++,_0x44e331['autoExpand']&&_0x44e331[_0x4301bd(0x1ad)]['push'](_0x2be58b);var _0xdfca62,_0x4e45e6,_0x3f997c,_0x40e762,_0x490004=[],_0x4ccf97=[],_0x44d923,_0x254431=this[_0x4301bd(0x22e)](_0x2be58b),_0x330fb3=_0x254431===_0x4301bd(0x2b2),_0x4e3900=!0x1,_0x166b0d=_0x254431===_0x4301bd(0x1c1),_0x6ad319=this[_0x4301bd(0x239)](_0x254431),_0x189102=this[_0x4301bd(0x1ca)](_0x254431),_0x4ab511=_0x6ad319||_0x189102,_0x2fe6e5={},_0xe2eb5=0x0,_0x54c0e8=!0x1,_0xe1c560,_0x4e5928=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x44e331[_0x4301bd(0x270)]){if(_0x330fb3){if(_0x4e45e6=_0x2be58b['length'],_0x4e45e6>_0x44e331['elements']){for(_0x3f997c=0x0,_0x40e762=_0x44e331[_0x4301bd(0x24f)],_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));_0x3d0195['cappedElements']=!0x0;}else{for(_0x3f997c=0x0,_0x40e762=_0x4e45e6,_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));}_0x44e331[_0x4301bd(0x1c4)]+=_0x4ccf97[_0x4301bd(0x23a)];}if(!(_0x254431===_0x4301bd(0x24a)||_0x254431==='undefined')&&!_0x6ad319&&_0x254431!=='String'&&_0x254431!=='Buffer'&&_0x254431!==_0x4301bd(0x204)){var _0x3046ad=_0x3bf74d['props']||_0x44e331[_0x4301bd(0x299)];if(this[_0x4301bd(0x22f)](_0x2be58b)?(_0xdfca62=0x0,_0x2be58b['forEach'](function(_0x14123b){var _0x112688=_0x4301bd;if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x112688(0x216)]&&_0x44e331[_0x112688(0x1aa)]&&_0x44e331['autoExpandPropertyCount']>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}_0x4ccf97[_0x112688(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x112688(0x2ae),_0xdfca62++,_0x44e331,function(_0x46f38e){return function(){return _0x46f38e;};}(_0x14123b)));})):this[_0x4301bd(0x1b4)](_0x2be58b)&&_0x2be58b['forEach'](function(_0x35d7b2,_0x4f3b22){var _0x3d4777=_0x4301bd;if(_0xe2eb5++,_0x44e331[_0x3d4777(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x3d4777(0x216)]&&_0x44e331[_0x3d4777(0x1aa)]&&_0x44e331[_0x3d4777(0x1c4)]>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}var _0x3d8b44=_0x4f3b22[_0x3d4777(0x285)]();_0x3d8b44[_0x3d4777(0x23a)]>0x64&&(_0x3d8b44=_0x3d8b44[_0x3d4777(0x1c3)](0x0,0x64)+_0x3d4777(0x1be)),_0x4ccf97[_0x3d4777(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x3d4777(0x1ea),_0x3d8b44,_0x44e331,function(_0x11b7a8){return function(){return _0x11b7a8;};}(_0x35d7b2)));}),!_0x4e3900){try{for(_0x44d923 in _0x2be58b)if(!(_0x330fb3&&_0x4e5928['test'](_0x44d923))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)){if(_0xe2eb5++,_0x44e331[_0x4301bd(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}catch{}if(_0x2fe6e5['_p_length']=!0x0,_0x166b0d&&(_0x2fe6e5[_0x4301bd(0x1d0)]=!0x0),!_0x54c0e8){var _0xb11c96=[][_0x4301bd(0x245)](this[_0x4301bd(0x24b)](_0x2be58b))[_0x4301bd(0x245)](this[_0x4301bd(0x1e3)](_0x2be58b));for(_0xdfca62=0x0,_0x4e45e6=_0xb11c96[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)if(_0x44d923=_0xb11c96[_0xdfca62],!(_0x330fb3&&_0x4e5928[_0x4301bd(0x217)](_0x44d923[_0x4301bd(0x285)]()))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)&&!_0x2fe6e5[typeof _0x44d923!='symbol'?_0x4301bd(0x208)+_0x44d923[_0x4301bd(0x285)]():_0x44d923]){if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}}}}if(_0x3d0195['type']=_0x254431,_0x4ab511?(_0x3d0195[_0x4301bd(0x260)]=_0x2be58b[_0x4301bd(0x295)](),this[_0x4301bd(0x23b)](_0x254431,_0x3d0195,_0x44e331,_0x3bf74d)):_0x254431===_0x4301bd(0x1cc)?_0x3d0195['value']=this[_0x4301bd(0x236)]['call'](_0x2be58b):_0x254431==='bigint'?_0x3d0195['value']=_0x2be58b['toString']():_0x254431===_0x4301bd(0x276)?_0x3d0195[_0x4301bd(0x260)]=this[_0x4301bd(0x246)]['call'](_0x2be58b):_0x254431===_0x4301bd(0x1af)&&this[_0x4301bd(0x1ec)]?_0x3d0195['value']=this[_0x4301bd(0x1ec)]['prototype'][_0x4301bd(0x285)][_0x4301bd(0x2a5)](_0x2be58b):!_0x44e331['depth']&&!(_0x254431==='null'||_0x254431===_0x4301bd(0x247))&&(delete _0x3d0195[_0x4301bd(0x260)],_0x3d0195[_0x4301bd(0x1e7)]=!0x0),_0x54c0e8&&(_0x3d0195[_0x4301bd(0x26b)]=!0x0),_0xe1c560=_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)],_0x44e331[_0x4301bd(0x1d6)]['current']=_0x3d0195,this['_treeNodePropertiesBeforeFullValue'](_0x3d0195,_0x44e331),_0x4ccf97[_0x4301bd(0x23a)]){for(_0xdfca62=0x0,_0x4e45e6=_0x4ccf97[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)_0x4ccf97[_0xdfca62](_0xdfca62);}_0x490004['length']&&(_0x3d0195[_0x4301bd(0x299)]=_0x490004);}catch(_0x13a65c){_0x297d9b(_0x13a65c,_0x3d0195,_0x44e331);}this[_0x4301bd(0x262)](_0x2be58b,_0x3d0195),this[_0x4301bd(0x248)](_0x3d0195,_0x44e331),_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)]=_0xe1c560,_0x44e331[_0x4301bd(0x1ff)]--,_0x44e331[_0x4301bd(0x1aa)]=_0x391024,_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331['autoExpandPreviousObjects'][_0x4301bd(0x26f)]();}finally{_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=_0x4d2a32),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=_0x55bf28),_0x328296[_0x4301bd(0x28c)]=_0x2053a4;}return _0x3d0195;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e3)]=function(_0x37b1bc){var _0x51bfab=_0x41415e;return Object[_0x51bfab(0x1f2)]?Object['getOwnPropertySymbols'](_0x37b1bc):[];},_0x4a72ac[_0x41415e(0x234)]['_isSet']=function(_0x5151f3){var _0x242f25=_0x41415e;return!!(_0x5151f3&&_0x328296[_0x242f25(0x2ae)]&&this[_0x242f25(0x267)](_0x5151f3)==='[object\\x20Set]'&&_0x5151f3[_0x242f25(0x271)]);},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c2)]=function(_0x3b2ce2,_0x2fdf14,_0x2192c9){var _0x341e44=_0x41415e;if(!_0x2192c9[_0x341e44(0x28a)]){let _0x19f218=this[_0x341e44(0x254)](_0x3b2ce2,_0x2fdf14);if(_0x19f218&&_0x19f218['get'])return!0x0;}return _0x2192c9[_0x341e44(0x1da)]?typeof _0x3b2ce2[_0x2fdf14]=='function':!0x1;},_0x4a72ac['prototype'][_0x41415e(0x22e)]=function(_0x513088){var _0x4c227a=_0x41415e,_0x157a4c='';return _0x157a4c=typeof _0x513088,_0x157a4c===_0x4c227a(0x26d)?this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x201)?_0x157a4c=_0x4c227a(0x2b2):this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x1ee)?_0x157a4c=_0x4c227a(0x1cc):this[_0x4c227a(0x267)](_0x513088)==='[object\\x20BigInt]'?_0x157a4c=_0x4c227a(0x204):_0x513088===null?_0x157a4c=_0x4c227a(0x24a):_0x513088['constructor']&&(_0x157a4c=_0x513088[_0x4c227a(0x1ab)][_0x4c227a(0x2a1)]||_0x157a4c):_0x157a4c===_0x4c227a(0x247)&&this[_0x4c227a(0x264)]&&_0x513088 instanceof this['_HTMLAllCollection']&&(_0x157a4c=_0x4c227a(0x22d)),_0x157a4c;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x267)]=function(_0x2c336f){var _0x2c18c5=_0x41415e;return Object[_0x2c18c5(0x234)][_0x2c18c5(0x285)][_0x2c18c5(0x2a5)](_0x2c336f);},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveType']=function(_0x54e81f){var _0x4e444c=_0x41415e;return _0x54e81f===_0x4e444c(0x256)||_0x54e81f==='string'||_0x54e81f==='number';},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveWrapperType']=function(_0x13b047){var _0x2a1a18=_0x41415e;return _0x13b047===_0x2a1a18(0x1f7)||_0x13b047===_0x2a1a18(0x274)||_0x13b047===_0x2a1a18(0x2b7);},_0x4a72ac['prototype'][_0x41415e(0x1d2)]=function(_0x406e1a,_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d){var _0x2b12c8=this;return function(_0x4d95dc){var _0x3db731=_0x18ce,_0x1680b2=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f8)],_0xa0004b=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)],_0x4358a4=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)];_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)]=_0x1680b2,_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)]=typeof _0x190068==_0x3db731(0x237)?_0x190068:_0x4d95dc,_0x406e1a['push'](_0x2b12c8[_0x3db731(0x1e1)](_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d)),_0x4b4336[_0x3db731(0x1d6)]['parent']=_0x4358a4,_0x4b4336[_0x3db731(0x1d6)]['index']=_0xa0004b;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x21c)]=function(_0xb89524,_0x39b154,_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a){var _0x4eb9c2=_0x41415e,_0x57619d=this;return _0x39b154[typeof _0x2b0a10!=_0x4eb9c2(0x1af)?'_p_'+_0x2b0a10[_0x4eb9c2(0x285)]():_0x2b0a10]=!0x0,function(_0x592143){var _0x524fed=_0x4eb9c2,_0x5db0ea=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f8)],_0x48ef88=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)],_0x2db377=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)];_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x5db0ea,_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)]=_0x592143,_0xb89524['push'](_0x57619d[_0x524fed(0x1e1)](_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a)),_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x2db377,_0x1a5280['node'][_0x524fed(0x1f5)]=_0x48ef88;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e1)]=function(_0x404a98,_0x224eea,_0x2a8ac8,_0xc4ef24,_0x209e86){var _0x15e881=_0x41415e,_0x5e29e0=this;_0x209e86||(_0x209e86=function(_0x39e6bc,_0x370650){return _0x39e6bc[_0x370650];});var _0x1b0f9a=_0x2a8ac8['toString'](),_0xa4b58b=_0xc4ef24['expressionsToEvaluate']||{},_0x5493d4=_0xc4ef24[_0x15e881(0x270)],_0x159f07=_0xc4ef24[_0x15e881(0x216)];try{var _0x399d89=this[_0x15e881(0x1b4)](_0x404a98),_0x531278=_0x1b0f9a;_0x399d89&&_0x531278[0x0]==='\\x27'&&(_0x531278=_0x531278[_0x15e881(0x24d)](0x1,_0x531278[_0x15e881(0x23a)]-0x2));var _0x453454=_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b[_0x15e881(0x208)+_0x531278];_0x453454&&(_0xc4ef24[_0x15e881(0x270)]=_0xc4ef24[_0x15e881(0x270)]+0x1),_0xc4ef24[_0x15e881(0x216)]=!!_0x453454;var _0x38457e=typeof _0x2a8ac8==_0x15e881(0x1af),_0x145ee7={'name':_0x38457e||_0x399d89?_0x1b0f9a:this[_0x15e881(0x1b6)](_0x1b0f9a)};if(_0x38457e&&(_0x145ee7['symbol']=!0x0),!(_0x224eea===_0x15e881(0x2b2)||_0x224eea===_0x15e881(0x1b9))){var _0x4fc38b=this[_0x15e881(0x254)](_0x404a98,_0x2a8ac8);if(_0x4fc38b&&(_0x4fc38b['set']&&(_0x145ee7[_0x15e881(0x268)]=!0x0),_0x4fc38b[_0x15e881(0x243)]&&!_0x453454&&!_0xc4ef24['resolveGetters']))return _0x145ee7[_0x15e881(0x25d)]=!0x0,this['_processTreeNodeResult'](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x5c7867;try{_0x5c7867=_0x209e86(_0x404a98,_0x2a8ac8);}catch(_0x390630){return _0x145ee7={'name':_0x1b0f9a,'type':_0x15e881(0x2aa),'error':_0x390630[_0x15e881(0x206)]},this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x239e42=this[_0x15e881(0x22e)](_0x5c7867),_0x153dbf=this[_0x15e881(0x239)](_0x239e42);if(_0x145ee7['type']=_0x239e42,_0x153dbf)this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x2a2d3f=_0x15e881;_0x145ee7[_0x2a2d3f(0x260)]=_0x5c7867[_0x2a2d3f(0x295)](),!_0x453454&&_0x5e29e0['_capIfString'](_0x239e42,_0x145ee7,_0xc4ef24,{});});else{var _0x170491=_0xc4ef24[_0x15e881(0x1aa)]&&_0xc4ef24['level']<_0xc4ef24[_0x15e881(0x259)]&&_0xc4ef24[_0x15e881(0x1ad)][_0x15e881(0x1d4)](_0x5c7867)<0x0&&_0x239e42!==_0x15e881(0x1c1)&&_0xc4ef24[_0x15e881(0x1c4)]<_0xc4ef24[_0x15e881(0x1bd)];_0x170491||_0xc4ef24[_0x15e881(0x1ff)]<_0x5493d4||_0x453454?this['serialize'](_0x145ee7,_0x5c7867,_0xc4ef24,_0x453454||{}):this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x29be9c=_0x15e881;_0x239e42==='null'||_0x239e42==='undefined'||(delete _0x145ee7[_0x29be9c(0x260)],_0x145ee7['capped']=!0x0);});}return _0x145ee7;}finally{_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b,_0xc4ef24[_0x15e881(0x270)]=_0x5493d4,_0xc4ef24[_0x15e881(0x216)]=_0x159f07;}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x23b)]=function(_0x149305,_0x4e4404,_0x187b3d,_0x59debf){var _0x4cdb3b=_0x41415e,_0x74bcfb=_0x59debf[_0x4cdb3b(0x1d8)]||_0x187b3d['strLength'];if((_0x149305==='string'||_0x149305===_0x4cdb3b(0x274))&&_0x4e4404[_0x4cdb3b(0x260)]){let _0x1e9dcd=_0x4e4404['value'][_0x4cdb3b(0x23a)];_0x187b3d[_0x4cdb3b(0x275)]+=_0x1e9dcd,_0x187b3d[_0x4cdb3b(0x275)]>_0x187b3d[_0x4cdb3b(0x1e6)]?(_0x4e4404[_0x4cdb3b(0x1e7)]='',delete _0x4e4404['value']):_0x1e9dcd>_0x74bcfb&&(_0x4e4404[_0x4cdb3b(0x1e7)]=_0x4e4404[_0x4cdb3b(0x260)][_0x4cdb3b(0x24d)](0x0,_0x74bcfb),delete _0x4e4404['value']);}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1b4)]=function(_0x4cafd8){var _0x1f56d7=_0x41415e;return!!(_0x4cafd8&&_0x328296[_0x1f56d7(0x1ea)]&&this[_0x1f56d7(0x267)](_0x4cafd8)==='[object\\x20Map]'&&_0x4cafd8[_0x1f56d7(0x271)]);},_0x4a72ac['prototype']['_propertyName']=function(_0x556f90){var _0x1a47d0=_0x41415e;if(_0x556f90[_0x1a47d0(0x221)](/^\\d+$/))return _0x556f90;var _0x409087;try{_0x409087=JSON[_0x1a47d0(0x1e5)](''+_0x556f90);}catch{_0x409087='\\x22'+this[_0x1a47d0(0x267)](_0x556f90)+'\\x22';}return _0x409087[_0x1a47d0(0x221)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x409087=_0x409087[_0x1a47d0(0x24d)](0x1,_0x409087[_0x1a47d0(0x23a)]-0x2):_0x409087=_0x409087['replace'](/'/g,'\\x5c\\x27')[_0x1a47d0(0x1e2)](/\\\\\"/g,'\\x22')[_0x1a47d0(0x1e2)](/(^\"|\"$)/g,'\\x27'),_0x409087;},_0x4a72ac[_0x41415e(0x234)]['_processTreeNodeResult']=function(_0x2ce4bf,_0x28f550,_0x44eea1,_0x4515b9){var _0x294ebc=_0x41415e;this[_0x294ebc(0x242)](_0x2ce4bf,_0x28f550),_0x4515b9&&_0x4515b9(),this[_0x294ebc(0x262)](_0x44eea1,_0x2ce4bf),this[_0x294ebc(0x248)](_0x2ce4bf,_0x28f550);},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesBeforeFullValue']=function(_0x172a9d,_0x25c126){var _0x3dad14=_0x41415e;this[_0x3dad14(0x28d)](_0x172a9d,_0x25c126),this['_setNodeQueryPath'](_0x172a9d,_0x25c126),this['_setNodeExpressionPath'](_0x172a9d,_0x25c126),this['_setNodePermissions'](_0x172a9d,_0x25c126);},_0x4a72ac[_0x41415e(0x234)]['_setNodeId']=function(_0x1537f2,_0x3ab443){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1ef)]=function(_0x2427d1,_0x358bf3){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1cd)]=function(_0x54e5a6,_0x43bba0){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20e)]=function(_0x54acf6){var _0x335ec4=_0x41415e;return _0x54acf6===this[_0x335ec4(0x207)];},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesAfterFullValue']=function(_0x3d7e71,_0x54743f){var _0x59cd8a=_0x41415e;this['_setNodeLabel'](_0x3d7e71,_0x54743f),this['_setNodeExpandableState'](_0x3d7e71),_0x54743f[_0x59cd8a(0x1c7)]&&this[_0x59cd8a(0x1c6)](_0x3d7e71),this['_addFunctionsNode'](_0x3d7e71,_0x54743f),this[_0x59cd8a(0x1e0)](_0x3d7e71,_0x54743f),this['_cleanNode'](_0x3d7e71);},_0x4a72ac['prototype'][_0x41415e(0x262)]=function(_0x58500d,_0x2f1ff0){var _0x53b67e=_0x41415e;try{_0x58500d&&typeof _0x58500d['length']==_0x53b67e(0x237)&&(_0x2f1ff0[_0x53b67e(0x23a)]=_0x58500d[_0x53b67e(0x23a)]);}catch{}if(_0x2f1ff0[_0x53b67e(0x257)]===_0x53b67e(0x237)||_0x2f1ff0['type']==='Number'){if(isNaN(_0x2f1ff0[_0x53b67e(0x260)]))_0x2f1ff0[_0x53b67e(0x263)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];else switch(_0x2f1ff0[_0x53b67e(0x260)]){case Number[_0x53b67e(0x29b)]:_0x2f1ff0[_0x53b67e(0x228)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case Number['NEGATIVE_INFINITY']:_0x2f1ff0[_0x53b67e(0x25a)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case 0x0:this[_0x53b67e(0x258)](_0x2f1ff0[_0x53b67e(0x260)])&&(_0x2f1ff0['negativeZero']=!0x0);break;}}else _0x2f1ff0[_0x53b67e(0x257)]==='function'&&typeof _0x58500d[_0x53b67e(0x2a1)]==_0x53b67e(0x1e9)&&_0x58500d[_0x53b67e(0x2a1)]&&_0x2f1ff0[_0x53b67e(0x2a1)]&&_0x58500d[_0x53b67e(0x2a1)]!==_0x2f1ff0['name']&&(_0x2f1ff0['funcName']=_0x58500d[_0x53b67e(0x2a1)]);},_0x4a72ac[_0x41415e(0x234)]['_isNegativeZero']=function(_0x5c40e7){var _0x716367=_0x41415e;return 0x1/_0x5c40e7===Number[_0x716367(0x293)];},_0x4a72ac['prototype'][_0x41415e(0x1c6)]=function(_0x20eb48){var _0x1c5169=_0x41415e;!_0x20eb48[_0x1c5169(0x299)]||!_0x20eb48['props'][_0x1c5169(0x23a)]||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x2b2)||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x1ea)||_0x20eb48['type']==='Set'||_0x20eb48[_0x1c5169(0x299)][_0x1c5169(0x279)](function(_0x415953,_0x627e36){var _0x3dc3b7=_0x1c5169,_0x10fc8e=_0x415953[_0x3dc3b7(0x2a1)][_0x3dc3b7(0x2a0)](),_0x279c34=_0x627e36[_0x3dc3b7(0x2a1)]['toLowerCase']();return _0x10fc8e<_0x279c34?-0x1:_0x10fc8e>_0x279c34?0x1:0x0;});},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c0)]=function(_0x16876f,_0x162fd2){var _0x3d2a76=_0x41415e;if(!(_0x162fd2[_0x3d2a76(0x1da)]||!_0x16876f[_0x3d2a76(0x299)]||!_0x16876f['props']['length'])){for(var _0x2f6f65=[],_0x358cf7=[],_0x167b6c=0x0,_0x2108d8=_0x16876f['props'][_0x3d2a76(0x23a)];_0x167b6c<_0x2108d8;_0x167b6c++){var _0x3c39e8=_0x16876f[_0x3d2a76(0x299)][_0x167b6c];_0x3c39e8[_0x3d2a76(0x257)]===_0x3d2a76(0x1c1)?_0x2f6f65[_0x3d2a76(0x1dd)](_0x3c39e8):_0x358cf7[_0x3d2a76(0x1dd)](_0x3c39e8);}if(!(!_0x358cf7[_0x3d2a76(0x23a)]||_0x2f6f65[_0x3d2a76(0x23a)]<=0x1)){_0x16876f[_0x3d2a76(0x299)]=_0x358cf7;var _0x20ca6a={'functionsNode':!0x0,'props':_0x2f6f65};this['_setNodeId'](_0x20ca6a,_0x162fd2),this['_setNodeLabel'](_0x20ca6a,_0x162fd2),this['_setNodeExpandableState'](_0x20ca6a),this[_0x3d2a76(0x2a3)](_0x20ca6a,_0x162fd2),_0x20ca6a['id']+='\\x20f',_0x16876f[_0x3d2a76(0x299)][_0x3d2a76(0x2a4)](_0x20ca6a);}}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e0)]=function(_0x3123fd,_0x4647e8){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20a)]=function(_0x2ca82b){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1f9)]=function(_0x41db73){var _0x3b2dc0=_0x41415e;return Array[_0x3b2dc0(0x21f)](_0x41db73)||typeof _0x41db73==_0x3b2dc0(0x26d)&&this['_objectToString'](_0x41db73)==='[object\\x20Array]';},_0x4a72ac['prototype'][_0x41415e(0x2a3)]=function(_0x5900cd,_0x4da276){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x2b1)]=function(_0x3153d5){var _0x60e45=_0x41415e;delete _0x3153d5['_hasSymbolPropertyOnItsPath'],delete _0x3153d5['_hasSetOnItsPath'],delete _0x3153d5[_0x60e45(0x1ed)];},_0x4a72ac['prototype'][_0x41415e(0x214)]=function(_0x1c5b52,_0xeb8701){};let _0x1b1f6a=new _0x4a72ac(),_0x5ab55c={'props':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x299)]||0x64,'elements':_0x4a1853[_0x41415e(0x25c)]['elements']||0x64,'strLength':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1d8)]||0x400*0x32,'totalStrLength':_0x4a1853[_0x41415e(0x25c)]['totalStrLength']||0x400*0x32,'autoExpandLimit':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1bd)]||0x1388,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x259)]||0xa},_0x1bc32b={'props':_0x4a1853['reducedLimits'][_0x41415e(0x299)]||0x5,'elements':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x24f)]||0x5,'strLength':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1d8)]||0x100,'totalStrLength':_0x4a1853['reducedLimits'][_0x41415e(0x1e6)]||0x100*0x3,'autoExpandLimit':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1bd)]||0x1e,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x259)]||0x2};if(_0x40ff3c){let _0x465da0=_0x1b1f6a[_0x41415e(0x22b)][_0x41415e(0x1bf)](_0x1b1f6a);_0x1b1f6a['serialize']=function(_0x5bb6ac,_0xc8b820,_0x217e83,_0x48221d){return _0x465da0(_0x5bb6ac,_0x40ff3c(_0xc8b820),_0x217e83,_0x48221d);};}function _0x5d0dae(_0x36176c,_0x50f2a2,_0x31d836,_0x2f1b40,_0x356462,_0x21c4d){var _0x31131d=_0x41415e;let _0xc471d5,_0x41a687;try{_0x41a687=_0x33481b(),_0xc471d5=_0x31d747[_0x50f2a2],!_0xc471d5||_0x41a687-_0xc471d5['ts']>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x26e)]&&_0xc471d5[_0x31131d(0x215)]&&_0xc471d5['time']/_0xc471d5['count']<_0x513504[_0x31131d(0x2ab)][_0x31131d(0x1ba)]?(_0x31d747[_0x50f2a2]=_0xc471d5={'count':0x0,'time':0x0,'ts':_0x41a687},_0x31d747[_0x31131d(0x1b2)]={}):_0x41a687-_0x31d747[_0x31131d(0x1b2)]['ts']>_0x513504[_0x31131d(0x25e)][_0x31131d(0x26e)]&&_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]&&_0x31d747['hits']['time']/_0x31d747['hits']['count']<_0x513504['global'][_0x31131d(0x1ba)]&&(_0x31d747['hits']={});let _0x33ab9c=[],_0x32224c=_0xc471d5[_0x31131d(0x261)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]?_0x1bc32b:_0x5ab55c,_0x4ed7e1=_0x541a03=>{var _0x1d9f10=_0x31131d;let _0xb83276={};return _0xb83276[_0x1d9f10(0x299)]=_0x541a03[_0x1d9f10(0x299)],_0xb83276['elements']=_0x541a03['elements'],_0xb83276[_0x1d9f10(0x1d8)]=_0x541a03[_0x1d9f10(0x1d8)],_0xb83276[_0x1d9f10(0x1e6)]=_0x541a03[_0x1d9f10(0x1e6)],_0xb83276[_0x1d9f10(0x1bd)]=_0x541a03[_0x1d9f10(0x1bd)],_0xb83276[_0x1d9f10(0x259)]=_0x541a03[_0x1d9f10(0x259)],_0xb83276[_0x1d9f10(0x1c7)]=!0x1,_0xb83276[_0x1d9f10(0x1da)]=!_0x52ae61,_0xb83276[_0x1d9f10(0x270)]=0x1,_0xb83276['level']=0x0,_0xb83276[_0x1d9f10(0x29c)]=_0x1d9f10(0x1ac),_0xb83276[_0x1d9f10(0x2b3)]=_0x1d9f10(0x222),_0xb83276['autoExpand']=!0x0,_0xb83276['autoExpandPreviousObjects']=[],_0xb83276[_0x1d9f10(0x1c4)]=0x0,_0xb83276[_0x1d9f10(0x28a)]=_0x4a1853['resolveGetters'],_0xb83276[_0x1d9f10(0x275)]=0x0,_0xb83276[_0x1d9f10(0x1d6)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xb83276;};for(var _0x4872b1=0x0;_0x4872b1<_0x356462[_0x31131d(0x23a)];_0x4872b1++)_0x33ab9c['push'](_0x1b1f6a[_0x31131d(0x22b)]({'timeNode':_0x36176c===_0x31131d(0x213)||void 0x0},_0x356462[_0x4872b1],_0x4ed7e1(_0x32224c),{}));if(_0x36176c==='trace'||_0x36176c===_0x31131d(0x250)){let _0xbe35ed=Error[_0x31131d(0x1d5)];try{Error[_0x31131d(0x1d5)]=0x1/0x0,_0x33ab9c[_0x31131d(0x1dd)](_0x1b1f6a[_0x31131d(0x22b)]({'stackNode':!0x0},new Error()[_0x31131d(0x1fc)],_0x4ed7e1(_0x32224c),{'strLength':0x1/0x0}));}finally{Error[_0x31131d(0x1d5)]=_0xbe35ed;}}return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':_0x33ab9c,'id':_0x50f2a2,'context':_0x21c4d}]};}catch(_0x5f1a84){return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':[{'type':_0x31131d(0x2aa),'error':_0x5f1a84&&_0x5f1a84[_0x31131d(0x206)]}],'id':_0x50f2a2,'context':_0x21c4d}]};}finally{try{if(_0xc471d5&&_0x41a687){let _0x1e910a=_0x33481b();_0xc471d5[_0x31131d(0x215)]++,_0xc471d5[_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0xc471d5['ts']=_0x1e910a,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]++,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0x31d747[_0x31131d(0x1b2)]['ts']=_0x1e910a,(_0xc471d5[_0x31131d(0x215)]>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x21e)]||_0xc471d5[_0x31131d(0x213)]>_0x513504['perLogpoint'][_0x31131d(0x200)])&&(_0xc471d5['reduceLimits']=!0x0),(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x21e)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x200)])&&(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]=!0x0);}}catch{}}}return _0x5d0dae;}function G(_0x57f7c8){var _0x8989a5=_0x11737d;if(_0x57f7c8&&typeof _0x57f7c8==_0x8989a5(0x26d)&&_0x57f7c8[_0x8989a5(0x1ab)])switch(_0x57f7c8[_0x8989a5(0x1ab)][_0x8989a5(0x2a1)]){case _0x8989a5(0x1c9):return _0x57f7c8[_0x8989a5(0x202)](Symbol[_0x8989a5(0x220)])?Promise[_0x8989a5(0x27d)]():_0x57f7c8;case _0x8989a5(0x273):return Promise[_0x8989a5(0x27d)]();}return _0x57f7c8;}((_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x8035f7,_0x1eee1e,_0x4e67e7,_0x1dcc2b,_0x36ad0d,_0x5eec70,_0x325478)=>{var _0x417c2e=_0x11737d;if(_0x49a927[_0x417c2e(0x272)])return _0x49a927['_console_ninja'];let _0x493a09={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!X(_0x49a927,_0x4e67e7,_0x4fe531))return _0x49a927[_0x417c2e(0x272)]=_0x493a09,_0x49a927['_console_ninja'];let _0x1c6bc5=b(_0x49a927),_0x2b8f39=_0x1c6bc5[_0x417c2e(0x2b5)],_0x2d109f=_0x1c6bc5[_0x417c2e(0x25f)],_0x200f28=_0x1c6bc5[_0x417c2e(0x280)],_0x19208f={'hits':{},'ts':{}},_0xc7afd2=J(_0x49a927,_0x1dcc2b,_0x19208f,_0x8035f7,_0x325478,_0x4fe531==='next.js'?G:void 0x0),_0x118149=(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122)=>{var _0x3ee198=_0x417c2e;let _0x42dc9c=_0x49a927[_0x3ee198(0x272)];try{return _0x49a927[_0x3ee198(0x272)]=_0x493a09,_0xc7afd2(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122);}finally{_0x49a927[_0x3ee198(0x272)]=_0x42dc9c;}},_0x11bc8c=_0x374f3d=>{_0x19208f['ts'][_0x374f3d]=_0x2d109f();},_0x1c419e=(_0x19a11f,_0x5262fc)=>{var _0x3954f9=_0x417c2e;let _0x325002=_0x19208f['ts'][_0x5262fc];if(delete _0x19208f['ts'][_0x5262fc],_0x325002){let _0x493846=_0x2b8f39(_0x325002,_0x2d109f());_0x5bf617(_0x118149(_0x3954f9(0x213),_0x19a11f,_0x200f28(),_0x4202ca,[_0x493846],_0x5262fc));}},_0x2e039f=_0x5b0257=>{var _0x102273=_0x417c2e,_0x56d8f6;return _0x4fe531===_0x102273(0x211)&&_0x49a927['origin']&&((_0x56d8f6=_0x5b0257==null?void 0x0:_0x5b0257[_0x102273(0x21b)])==null?void 0x0:_0x56d8f6[_0x102273(0x23a)])&&(_0x5b0257[_0x102273(0x21b)][0x0][_0x102273(0x282)]=_0x49a927[_0x102273(0x282)]),_0x5b0257;};_0x49a927[_0x417c2e(0x272)]={'consoleLog':(_0xb0ef16,_0x4b56f2)=>{var _0x51186d=_0x417c2e;_0x49a927[_0x51186d(0x21d)][_0x51186d(0x1ce)]['name']!==_0x51186d(0x1fd)&&_0x5bf617(_0x118149(_0x51186d(0x1ce),_0xb0ef16,_0x200f28(),_0x4202ca,_0x4b56f2));},'consoleTrace':(_0xb88eb7,_0x523325)=>{var _0xc218c5=_0x417c2e,_0x514946,_0x272087;_0x49a927[_0xc218c5(0x21d)][_0xc218c5(0x1ce)][_0xc218c5(0x2a1)]!==_0xc218c5(0x20d)&&((_0x272087=(_0x514946=_0x49a927[_0xc218c5(0x1cb)])==null?void 0x0:_0x514946[_0xc218c5(0x2a8)])!=null&&_0x272087[_0xc218c5(0x1d6)]&&(_0x49a927[_0xc218c5(0x238)]=!0x0),_0x5bf617(_0x2e039f(_0x118149(_0xc218c5(0x288),_0xb88eb7,_0x200f28(),_0x4202ca,_0x523325))));},'consoleError':(_0x36ac47,_0x2b4a69)=>{var _0x24b679=_0x417c2e;_0x49a927[_0x24b679(0x238)]=!0x0,_0x5bf617(_0x2e039f(_0x118149('error',_0x36ac47,_0x200f28(),_0x4202ca,_0x2b4a69)));},'consoleTime':_0x2a2292=>{_0x11bc8c(_0x2a2292);},'consoleTimeEnd':(_0x186230,_0x3edf28)=>{_0x1c419e(_0x3edf28,_0x186230);},'autoLog':(_0x196e30,_0x4757f9)=>{var _0x14995c=_0x417c2e;_0x5bf617(_0x118149(_0x14995c(0x1ce),_0x4757f9,_0x200f28(),_0x4202ca,[_0x196e30]));},'autoLogMany':(_0x590664,_0x511674)=>{var _0x150948=_0x417c2e;_0x5bf617(_0x118149(_0x150948(0x1ce),_0x590664,_0x200f28(),_0x4202ca,_0x511674));},'autoTrace':(_0xf09034,_0x477842)=>{_0x5bf617(_0x2e039f(_0x118149('trace',_0x477842,_0x200f28(),_0x4202ca,[_0xf09034])));},'autoTraceMany':(_0x5dfffd,_0x37f583)=>{var _0x1a70f9=_0x417c2e;_0x5bf617(_0x2e039f(_0x118149(_0x1a70f9(0x288),_0x5dfffd,_0x200f28(),_0x4202ca,_0x37f583)));},'autoTime':(_0xa8fce3,_0x13dfa8,_0x217929)=>{_0x11bc8c(_0x217929);},'autoTimeEnd':(_0x48d600,_0x2b5f35,_0x5c28a8)=>{_0x1c419e(_0x2b5f35,_0x5c28a8);},'coverage':_0x2ec881=>{_0x5bf617({'method':'coverage','version':_0x8035f7,'args':[{'id':_0x2ec881}]});}};let _0x5bf617=H(_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x36ad0d,_0x5eec70),_0x4202ca=_0x49a927['_console_ninja_session'];return _0x49a927[_0x417c2e(0x272)];})(globalThis,_0x11737d(0x2a2),'52991',_0x11737d(0x1bb),_0x11737d(0x1b8),_0x11737d(0x25b),_0x11737d(0x20f),_0x11737d(0x1de),_0x11737d(0x281),_0x11737d(0x223),'1',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}});");
}
catch (e) {
    console.error(e);
} }
; /* istanbul ignore next */
function oo_oo(i, ...v) { try {
    oo_cm().consoleLog(i, v);
}
catch (e) { } return v; }
;
oo_oo; /* istanbul ignore next */
function oo_tr(i, ...v) { try {
    oo_cm().consoleTrace(i, v);
}
catch (e) { } return v; }
;
oo_tr; /* istanbul ignore next */
function oo_tx(i, ...v) { try {
    oo_cm().consoleError(i, v);
}
catch (e) { } return v; }
;
oo_tx; /* istanbul ignore next */
function oo_ts(v) { try {
    oo_cm().consoleTime(v);
}
catch (e) { } return v; }
;
oo_ts; /* istanbul ignore next */
function oo_te(v, i) { try {
    oo_cm().consoleTimeEnd(v, i);
}
catch (e) { } return v; }
;
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/


/***/ }),

/***/ "./src/js/contact.ts":
/*!***************************!*\
  !*** ./src/js/contact.ts ***!
  \***************************/
/***/ (() => {


document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".wpcf7-form");
    if (!contactForm) {
        return;
    }
    const submitButton = contactForm.querySelector(".wpcf7-submit");
    if (!submitButton) {
        return;
    }
    if (!submitButton.dataset.arrowAdded) {
        const parent = submitButton.parentElement;
        if (parent) {
            const wrapper = document.createElement("span");
            wrapper.className = "submit-button-wrapper";
            const arrowSvg = document.createElement("span");
            arrowSvg.className = "submit-arrow";
            arrowSvg.innerHTML = `<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V0L15 6L0 12ZM1.5 9.77084L10.9583 6L1.5 2.22917V4.5L6 6L1.5 7.5V9.77084Z" fill="#4a0b24"/></svg>`;
            parent.insertBefore(wrapper, submitButton);
            wrapper.appendChild(submitButton);
            wrapper.appendChild(arrowSvg);
            submitButton.dataset.arrowAdded = "true";
        }
    }
    const requiredFields = contactForm.querySelectorAll('input[aria-required="true"], textarea[aria-required="true"]');
    function checkRequiredFields() {
        let allFilled = true;
        requiredFields.forEach((field) => {
            const value = field.value.trim();
            if (!value) {
                allFilled = false;
            }
        });
        return allFilled;
    }
    function updateSubmitButton() {
        const allFilled = checkRequiredFields();
        submitButton.disabled = !allFilled;
    }
    requiredFields.forEach((field) => {
        field.addEventListener("input", updateSubmitButton);
        field.addEventListener("change", updateSubmitButton);
    });
    updateSubmitButton();
});


/***/ }),

/***/ "./src/js/disparus-show-all.ts":
/*!*************************************!*\
  !*** ./src/js/disparus-show-all.ts ***!
  \*************************************/
/***/ (() => {


document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-disparus-show-all]");
    const drawer = document.querySelector("#disparus-drawer");
    const drawerContent = document.querySelector("#disparus-drawer-content");
    const drawerClose = document.querySelector(".disparus-drawer-close");
    const closeDrawer = () => {
        if (!drawer)
            return;
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
    };
    const updateSeparators = () => {
        const items = Array.from(document.querySelectorAll(".disparus-article"));
        const visible = items.filter((item) => !item.classList.contains("is-hidden"));
        visible.forEach((item) => item.classList.remove("has-separator"));
        const isSm = window.matchMedia("(max-width: 767px)").matches;
        const columns = isSm ? 2 : 4;
        for (let i = 0; i < visible.length; i += 1) {
            const item = visible[i];
            const next = visible[i + 1];
            if (i % columns !== columns - 1 && next) {
                item.classList.add("has-separator");
            }
        }
    };
    updateSeparators();
    if (button) {
        button.addEventListener("click", () => {
            closeDrawer();
            const items = document.querySelectorAll(".disparus-article");
            const isExpanded = button.getAttribute("data-expanded") === "true";
            items.forEach((item, index) => {
                if (isExpanded && index >= 8) {
                    item.classList.add("is-hidden");
                }
                else if (!isExpanded && index >= 8) {
                    item.classList.remove("is-hidden");
                }
            });
            button.setAttribute("data-expanded", isExpanded ? "false" : "true");
            updateSeparators();
        });
    }
    if (drawerContent) {
        document.addEventListener("click", (event) => {
            var _a, _b, _c;
            const target = event.target;
            // Fermer le drawer si clic en dehors (pas sur un lien biographie ni dans le drawer)
            if ((drawer === null || drawer === void 0 ? void 0 : drawer.classList.contains("open")) &&
                !(target === null || target === void 0 ? void 0 : target.closest(".disparus-drawer")) &&
                !(target === null || target === void 0 ? void 0 : target.closest(".disparus-link"))) {
                closeDrawer();
                return;
            }
            const link = target === null || target === void 0 ? void 0 : target.closest(".disparus-link");
            if (!link)
                return;
            event.preventDefault();
            if (!drawer)
                return;
            const article = link.closest(".disparus-article");
            const data = article === null || article === void 0 ? void 0 : article.querySelector(".disparus-drawer-data");
            const title = (data === null || data === void 0 ? void 0 : data.dataset.drawerTitle) ||
                ((_a = article === null || article === void 0 ? void 0 : article.querySelector(".disparus-title")) === null || _a === void 0 ? void 0 : _a.textContent) ||
                "";
            const image = ((_b = data === null || data === void 0 ? void 0 : data.querySelector(".disparus-drawer-image")) === null || _b === void 0 ? void 0 : _b.outerHTML) || "";
            const body = ((_c = data === null || data === void 0 ? void 0 : data.querySelector(".disparus-drawer-body")) === null || _c === void 0 ? void 0 : _c.innerHTML) || "";
            drawerContent.innerHTML = `${image}<h2 class="disparus-drawer-title">${title}</h2>${body}`;
            drawerContent
                .querySelectorAll(".disparus-drawer-divider")
                .forEach((divider) => divider.remove());
            const titleEl = drawerContent.querySelector(".disparus-drawer-title");
            if (titleEl) {
                const divider = document.createElement("div");
                divider.className = "disparus-drawer-divider";
                titleEl.insertAdjacentElement("afterend", divider);
            }
            const paragraphs = drawerContent.querySelectorAll("p");
            if (paragraphs.length >= 1) {
                const divider = document.createElement("div");
                divider.className = "disparus-drawer-divider";
                paragraphs[0].insertAdjacentElement("afterend", divider);
            }
            if (paragraphs.length >= 2) {
                const divider = document.createElement("div");
                divider.className = "disparus-drawer-divider";
                paragraphs[1].insertAdjacentElement("afterend", divider);
            }
            drawer.classList.add("open");
            drawer.setAttribute("aria-hidden", "false");
        });
        if (drawerClose) {
            drawerClose.addEventListener("click", closeDrawer);
        }
    }
});


/***/ }),

/***/ "./src/js/interactive-map.ts":
/*!***********************************!*\
  !*** ./src/js/interactive-map.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("im-map");
    if (!mapElement) {
        return;
    }
    // Force les styles sur Samsung Internet pour éviter l'overlay blanc
    // Uniquement si pas d'admin bar (utilisateur non connecté)
    if (document.body.classList.contains("page-carte") &&
        !document.body.classList.contains("admin-bar")) {
        document.body.style.setProperty("background-color", "#4a0b24", "important");
        document.body.style.setProperty("background", "#4a0b24", "important");
        document.body.style.setProperty("overflow", "hidden", "important");
        // Force aussi sur le container
        const carteContainer = document.querySelector(".la-carte-container");
        if (carteContainer) {
            carteContainer.style.setProperty("background-color", "#4a0b24", "important");
            carteContainer.style.setProperty("background", "#4a0b24", "important");
        }
        // Force sur la map
        const imMap = document.getElementById("im-map");
        if (imMap) {
            imMap.style.setProperty("background-color", "#4a0b24", "important");
            imMap.style.setProperty("background", "#4a0b24", "important");
        }
    }
    const drawer = document.getElementById("im-drawer");
    // Déplacer le drawer à la fin de body pour qu'il soit au même niveau que #page :
    // son z-index (quand .open) le place alors au-dessus du header/menu.
    if (drawer && document.body.classList.contains("page-carte")) {
        document.body.appendChild(drawer);
    }
    const drawerContent = document.getElementById("drawer-content");
    const drawerClose = drawer === null || drawer === void 0 ? void 0 : drawer.querySelector(".im-drawer-close");
    const closeDrawer = () => {
        if (!drawer)
            return;
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("im-drawer-open");
        document.documentElement.classList.remove("im-drawer-open");
    };
    const openDrawer = () => {
        var _a;
        if (!drawer)
            return;
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
        document.body.classList.add("im-drawer-open");
        document.documentElement.classList.add("im-drawer-open");
        (_a = drawerClose === null || drawerClose === void 0 ? void 0 : drawerClose.focus) === null || _a === void 0 ? void 0 : _a.call(drawerClose);
    };
    if (drawerClose) {
        drawerClose.addEventListener("click", closeDrawer);
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            closeDrawer();
    });
    const imgWidth = 1023;
    const imgHeight = 650;
    const FRANCE = { x: 500, y: 300 };
    // Données des pins avec coordonnées x/y (clique sur la carte pour obtenir les coordonnées)
    const pinsData = IM_Settings.pins && IM_Settings.pins.length > 0
        ? IM_Settings.pins
        : [
            {
                x: 344.0465,
                y: 431.8514,
                title: "London",
                content: "Capitale du Royaume-Uni",
            },
            {
                x: 764.8055,
                y: 453.7027,
                title: "Paris",
                content: "Capitale de la France",
            },
            {
                x: 746.6169,
                y: 503.7213,
                title: "Calais",
                content: "Port français sur la Manche",
            },
        ];
    const pinIcon = `
        <svg class="pinIcon" width="60" height="68" viewBox="0 0 60 68" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="15.5" stroke="#F6F6F6" stroke-width="10"/>
            <path d="M30 65L22 52C25 53 27 53 30 53C33 53 35 53 38 52L30 65Z" fill="#F6F6F6"/>
        </svg>
    `;
    const map = L.map("im-map", {
        crs: L.CRS.Simple,
        zoomControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        minZoom: 0.4,
        maxZoom: 0.4,
    });
    let overlay;
    const markers = [];
    function updateMap() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scale = Math.max(vw / imgWidth, vh / imgHeight);
        const scaledW = imgWidth * scale;
        const scaledH = imgHeight * scale;
        const offsetX = (scaledW - vw) / 2;
        const offsetY = (scaledH - vh) / 2;
        const bounds = [
            [-offsetY, -offsetX],
            [scaledH - offsetY, scaledW - offsetX],
        ];
        if (!overlay) {
            overlay = L.imageOverlay(IM_Settings.imagePath, bounds).addTo(map);
        }
        else {
            overlay.setBounds(bounds);
        }
        map.fitBounds(bounds, { animate: false });
        map.setMaxBounds(bounds);
        map.options.maxBoundsViscosity = 1;
        const centerX = FRANCE.x * scale - offsetX;
        const centerY = FRANCE.y * scale - offsetY;
        map.setView([centerY, centerX], map.getZoom(), { animate: false });
        if (!markers.length) {
            pinsData.forEach((pin) => {
                // Convertir les coordonnées relatives à l'image en coordonnées Leaflet
                const x = pin.x * scale - offsetX;
                const y = pin.y * scale - offsetY;
                const marker = L.marker([y, x], {
                    icon: L.divIcon({
                        className: "",
                        html: `
              <div class="pin-container">
                <div class="pin-tooltip">${pin.tooltip_title}</div>
                <div class="pin">${pinIcon}</div>
              </div>
            `,
                        iconSize: [60, 68],
                        iconAnchor: [30, 68],
                    }),
                }).addTo(map);
                marker.on("click", () => {
                    if (drawerContent) {
                        // Construire le contenu : Image -> H1 avec SVG (site_title) -> Premier groupe uniquement
                        let content = "";
                        // 1. Image
                        if (pin.image) {
                            content += pin.image;
                        }
                        // 2. Titre du site en H1 avec icône SVG position
                        content += `
              <div class="drawer-title-wrapper">
                <svg class="drawer-title-icon" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83333 12.0625C7.20833 10.9514 8.24653 9.88194 8.94792 8.85417C9.64931 7.82639 10 6.86111 10 5.95833C10 4.70833 9.61111 3.68056 8.83333 2.875C8.05556 2.06944 7.05556 1.66667 5.83333 1.66667C4.61111 1.66667 3.61111 2.06944 2.83333 2.875C2.05556 3.68056 1.66667 4.70833 1.66667 5.95833C1.66667 6.86111 2.01736 7.82639 2.71875 8.85417C3.42014 9.88194 4.45833 10.9514 5.83333 12.0625ZM5.83333 14.1667C3.875 12.7222 2.41319 11.3194 1.44792 9.95833C0.482639 8.59722 0 7.26389 0 5.95833C0 4.22222 0.541667 2.79514 1.625 1.67708C2.70833 0.559028 4.11111 0 5.83333 0C7.55556 0 8.95833 0.559028 10.0417 1.67708C11.125 2.79514 11.6667 4.22222 11.6667 5.95833C11.6667 7.26389 11.184 8.59722 10.2188 9.95833C9.25347 11.3194 7.79167 12.7222 5.83333 14.1667ZM5.83333 7.5C6.29167 7.5 6.68403 7.3368 7.01042 7.01042C7.33681 6.68403 7.5 6.29167 7.5 5.83333C7.5 5.375 7.33681 4.98264 7.01042 4.65625C6.68403 4.32986 6.29167 4.16667 5.83333 4.16667C5.375 4.16667 4.98264 4.32986 4.65625 4.65625C4.32986 4.98264 4.16667 5.375 4.16667 5.83333C4.16667 6.29167 4.32986 6.68403 4.65625 7.01042C4.98264 7.3368 5.375 7.5 5.83333 7.5ZM0 16.6667V15H11.6667V16.6667H0Z" fill="#8F3544"/>
                </svg>
                <h1>${pin.site_title}</h1>
              </div>
            `;
                        // 3. Afficher uniquement le premier groupe
                        if (pin.groups && pin.groups.length > 0) {
                            content += pin.groups[0]; // Premier groupe seulement
                        }
                        drawerContent.innerHTML = content;
                        drawerContent.querySelectorAll(".wp-block-button__link").forEach((btn) => {
                            var _a;
                            if (!btn.getAttribute("href") || ((_a = btn.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.trim()) === "") {
                                btn.classList.add("disabled-button");
                            }
                        });
                    }
                    openDrawer();
                });
                markers.push(marker);
            });
        }
        else {
            markers.forEach((marker, i) => {
                const x = pinsData[i].x * scale - offsetX;
                const y = pinsData[i].y * scale - offsetY;
                marker.setLatLng([y, x]);
            });
        }
    }
    updateMap();
    window.addEventListener("resize", updateMap);
    // Debug: afficher les coordonnées Leaflet au clic (AVANT scale/offset)
    map.on("click", (e) => {
        closeDrawer();
        const latlng = e.latlng;
        // Récupérer le scale et offset actuels
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scale = Math.max(vw / imgWidth, vh / imgHeight);
        const scaledW = imgWidth * scale;
        const scaledH = imgHeight * scale;
        const offsetX = (scaledW - vw) / 2;
        const offsetY = (scaledH - vh) / 2;
        // Convertir les coordonnées Leaflet en coordonnées relatives à l'image
        const x = (latlng.lng + offsetX) / scale;
        const y = (latlng.lat + offsetY) / scale;
        /* eslint-disable */ console.log(...oo_oo(`1232912028_259_4_261_5_4`, `📍 Coordonnées pour pinsData: x: ${x.toFixed(4)}, y: ${y.toFixed(4)}`));
    });
});
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */ ;
function oo_cm() { try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x11737d=_0x18ce;(function(_0x2cd7dc,_0x3d47a8){var _0x269e07=_0x18ce,_0x3862a9=_0x2cd7dc();while(!![]){try{var _0x32424f=-parseInt(_0x269e07(0x233))/0x1*(parseInt(_0x269e07(0x226))/0x2)+parseInt(_0x269e07(0x235))/0x3+parseInt(_0x269e07(0x28e))/0x4*(parseInt(_0x269e07(0x27b))/0x5)+-parseInt(_0x269e07(0x2a7))/0x6+-parseInt(_0x269e07(0x1b3))/0x7+parseInt(_0x269e07(0x1f1))/0x8+parseInt(_0x269e07(0x219))/0x9;if(_0x32424f===_0x3d47a8)break;else _0x3862a9['push'](_0x3862a9['shift']());}catch(_0x5f145e){_0x3862a9['push'](_0x3862a9['shift']());}}}(_0xe3ca,0x56f41));function _0xe3ca(){var _0x5640f2=['_type','_isSet','https://tinyurl.com/37x8b79t','toUpperCase','_connecting','165398hsHHDM','prototype','1244043NtDcRK','_dateToString','number','_ninjaIgnoreNextError','_isPrimitiveType','length','_capIfString','_socket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','nodeModules','parse','dockerizedApp','_treeNodePropertiesBeforeFullValue','get','parent','concat','_regExpToString','undefined','_treeNodePropertiesAfterFullValue','astro','null','_getOwnPropertyNames','port','substr','eventReceivedCallback','elements','error','gateway.docker.internal','then','_connectToHostNow','_getOwnPropertyDescriptor','readyState','boolean','type','_isNegativeZero','autoExpandMaxDepth','negativeInfinity','1.0.0','defaultLimits','getter','global','timeStamp','value','reduceLimits','_additionalMetadata','nan','_HTMLAllCollection','_WebSocketClass','_connectAttemptCount','_objectToString','setter',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','cappedProps','expressionsToEvaluate','object','resetWhenQuietMs','pop','depth','forEach','_console_ninja','bound\\x20Promise','String','allStrLength','RegExp','hrtime','reload','sort','onclose','1200790AMCcjw','onopen','resolve','endsWith','_allowedToSend','now','','origin','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','data','toString','startsWith','path','trace','includes','resolveGetters','remix','ninjaSuppressConsole','_setNodeId','8MXzdbN','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','hostname','modules','_inNextEdge','NEGATIVE_INFINITY','_console_ninja_session','valueOf','_reconnectTimeout','send','_disposeWebsocket','props','performance','POSITIVE_INFINITY','expId','location','_numberRegExp','onmessage','toLowerCase','name','127.0.0.1','_setNodePermissions','unshift','call','map','2024292metxSE','versions','perf_hooks','unknown','perLogpoint','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','import(\\x27path\\x27)','Set','NEXT_RUNTIME','logger\\x20websocket\\x20error','_cleanNode','array','rootExpression','charAt','elapsed','getOwnPropertyDescriptor','Number','autoExpand','constructor','root_exp_id','autoExpandPreviousObjects','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','symbol','getWebSocketClass','import(\\x27url\\x27)','hits','614971wGVOib','_isMap','join','_propertyName','\\x20browser','webpack','Error','resetOnProcessingTimeAverageMs',\"/Users/ouzepe/.cursor/extensions/wallabyjs.console-ninja-1.0.527-universal/node_modules\",'edge','autoExpandLimit','...','bind','_addFunctionsNode','function','_blacklistedProperty','slice','autoExpandPropertyCount','reducePolicy','_sortProps','sortProps','react-native','Promise','_isPrimitiveWrapperType','process','date','_setNodeLabel','log','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','_p_name','fromCharCode','_addProperty','reducedLimits','indexOf','stackTraceLimit','node','_processTreeNodeResult','strLength','_WebSocket','noFunctions','close','unref','push',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"ouzepes-macbook-pro.home\",\"192.168.1.59\"],'_connected','_addLoadNode','_property','replace','_getOwnPropertySymbols','warn','stringify','totalStrLength','capped','_allowedToConnectOnSend','string','Map','onerror','_Symbol','_hasMapOnItsPath','[object\\x20Date]','_setNodeQueryPath','_sendErrorMessage','3368216yCKQsO','getOwnPropertySymbols','_webSocketErrorDocsLink','_maxConnectAttemptCount','index','some','Boolean','current','_isArray','_ws','_attemptToReconnectShortly','stack','disabledLog','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','level','reduceOnAccumulatedProcessingTimeMs','[object\\x20Array]','hasOwnProperty','catch','bigint','url','message','_undefined','_p_','host','_setNodeExpandableState','getOwnPropertyNames','_keyStrRegExp','disabledTrace','_isUndefined','1779192031331','\\x20server','next.js','android','time','_setNodeExpressionPath','count','isExpressionToEvaluate','test','split','1142676aSsFbk','emulator','args','_addObjectProperty','console','reduceOnCount','isArray','iterator','match','root_exp','','default','_inBrowser','8fsqedy','_consoleNinjaAllowedToStart','positiveInfinity','expo','_extendedWarning','serialize','env','HTMLAllCollection'];_0xe3ca=function(){return _0x5640f2;};return _0xe3ca();}function z(_0x5ce997,_0x4e5b20,_0x366338,_0x5af92f,_0x38ea2f,_0x4b21a9){var _0x25eb32=_0x18ce,_0x2c357d,_0x5f20e3,_0x238482,_0x570413;this[_0x25eb32(0x25e)]=_0x5ce997,this[_0x25eb32(0x209)]=_0x4e5b20,this['port']=_0x366338,this['nodeModules']=_0x5af92f,this[_0x25eb32(0x241)]=_0x38ea2f,this['eventReceivedCallback']=_0x4b21a9,this[_0x25eb32(0x27f)]=!0x0,this[_0x25eb32(0x1e8)]=!0x0,this['_connected']=!0x1,this['_connecting']=!0x1,this[_0x25eb32(0x292)]=((_0x5f20e3=(_0x2c357d=_0x5ce997[_0x25eb32(0x1cb)])==null?void 0x0:_0x2c357d['env'])==null?void 0x0:_0x5f20e3[_0x25eb32(0x2af)])===_0x25eb32(0x1bc),this[_0x25eb32(0x225)]=!((_0x570413=(_0x238482=this[_0x25eb32(0x25e)]['process'])==null?void 0x0:_0x238482[_0x25eb32(0x2a8)])!=null&&_0x570413[_0x25eb32(0x1d6)])&&!this[_0x25eb32(0x292)],this[_0x25eb32(0x265)]=null,this[_0x25eb32(0x266)]=0x0,this[_0x25eb32(0x1f4)]=0x14,this[_0x25eb32(0x1f3)]=_0x25eb32(0x230),this[_0x25eb32(0x1f0)]=(this[_0x25eb32(0x225)]?_0x25eb32(0x23d):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this['_webSocketErrorDocsLink'];}z['prototype'][_0x11737d(0x1b0)]=async function(){var _0x5e7628=_0x11737d,_0x256a71,_0x274c7b;if(this[_0x5e7628(0x265)])return this['_WebSocketClass'];let _0x5dd8cd;if(this['_inBrowser']||this[_0x5e7628(0x292)])_0x5dd8cd=this[_0x5e7628(0x25e)]['WebSocket'];else{if((_0x256a71=this[_0x5e7628(0x25e)][_0x5e7628(0x1cb)])!=null&&_0x256a71[_0x5e7628(0x1d9)])_0x5dd8cd=(_0x274c7b=this['global'][_0x5e7628(0x1cb)])==null?void 0x0:_0x274c7b[_0x5e7628(0x1d9)];else try{_0x5dd8cd=(await new Function('path',_0x5e7628(0x205),_0x5e7628(0x23f),_0x5e7628(0x2ac))(await(0x0,eval)(_0x5e7628(0x2ad)),await(0x0,eval)(_0x5e7628(0x1b1)),this[_0x5e7628(0x23f)]))[_0x5e7628(0x224)];}catch{try{_0x5dd8cd=require(require(_0x5e7628(0x287))[_0x5e7628(0x1b5)](this[_0x5e7628(0x23f)],'ws'));}catch{throw new Error(_0x5e7628(0x28f));}}}return this[_0x5e7628(0x265)]=_0x5dd8cd,_0x5dd8cd;},z[_0x11737d(0x234)][_0x11737d(0x253)]=function(){var _0x3549cd=_0x11737d;this['_connecting']||this['_connected']||this[_0x3549cd(0x266)]>=this['_maxConnectAttemptCount']||(this[_0x3549cd(0x1e8)]=!0x1,this[_0x3549cd(0x232)]=!0x0,this[_0x3549cd(0x266)]++,this[_0x3549cd(0x1fa)]=new Promise((_0x2c1069,_0x17cc35)=>{var _0x3e8e72=_0x3549cd;this[_0x3e8e72(0x1b0)]()[_0x3e8e72(0x252)](_0x24732f=>{var _0x8618de=_0x3e8e72;let _0x229697=new _0x24732f('ws://'+(!this[_0x8618de(0x225)]&&this[_0x8618de(0x241)]?_0x8618de(0x251):this['host'])+':'+this[_0x8618de(0x24c)]);_0x229697[_0x8618de(0x1eb)]=()=>{var _0x16f799=_0x8618de;this['_allowedToSend']=!0x1,this[_0x16f799(0x298)](_0x229697),this[_0x16f799(0x1fb)](),_0x17cc35(new Error(_0x16f799(0x2b0)));},_0x229697[_0x8618de(0x27c)]=()=>{var _0xd0b6f6=_0x8618de;this[_0xd0b6f6(0x225)]||_0x229697[_0xd0b6f6(0x23c)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)](),_0x2c1069(_0x229697);},_0x229697[_0x8618de(0x27a)]=()=>{var _0x22184f=_0x8618de;this[_0x22184f(0x1e8)]=!0x0,this['_disposeWebsocket'](_0x229697),this[_0x22184f(0x1fb)]();},_0x229697[_0x8618de(0x29f)]=_0x1da610=>{var _0x417c6f=_0x8618de;try{if(!(_0x1da610!=null&&_0x1da610['data'])||!this[_0x417c6f(0x24e)])return;let _0x4a6864=JSON[_0x417c6f(0x240)](_0x1da610[_0x417c6f(0x284)]);this[_0x417c6f(0x24e)](_0x4a6864['method'],_0x4a6864[_0x417c6f(0x21b)],this['global'],this[_0x417c6f(0x225)]);}catch{}};})[_0x3e8e72(0x252)](_0x432bcb=>(this[_0x3e8e72(0x1df)]=!0x0,this[_0x3e8e72(0x232)]=!0x1,this[_0x3e8e72(0x1e8)]=!0x1,this['_allowedToSend']=!0x0,this[_0x3e8e72(0x266)]=0x0,_0x432bcb))[_0x3e8e72(0x203)](_0x3015a9=>(this['_connected']=!0x1,this[_0x3e8e72(0x232)]=!0x1,console[_0x3e8e72(0x1e4)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x3e8e72(0x1f3)]),_0x17cc35(new Error(_0x3e8e72(0x1ae)+(_0x3015a9&&_0x3015a9[_0x3e8e72(0x206)])))));}));},z[_0x11737d(0x234)][_0x11737d(0x298)]=function(_0x3df234){var _0x429592=_0x11737d;this[_0x429592(0x1df)]=!0x1,this[_0x429592(0x232)]=!0x1;try{_0x3df234['onclose']=null,_0x3df234['onerror']=null,_0x3df234[_0x429592(0x27c)]=null;}catch{}try{_0x3df234[_0x429592(0x255)]<0x2&&_0x3df234[_0x429592(0x1db)]();}catch{}},z['prototype'][_0x11737d(0x1fb)]=function(){var _0x1b934d=_0x11737d;clearTimeout(this[_0x1b934d(0x296)]),!(this[_0x1b934d(0x266)]>=this[_0x1b934d(0x1f4)])&&(this[_0x1b934d(0x296)]=setTimeout(()=>{var _0x3e186a=_0x1b934d,_0xd97a3a;this[_0x3e186a(0x1df)]||this[_0x3e186a(0x232)]||(this['_connectToHostNow'](),(_0xd97a3a=this[_0x3e186a(0x1fa)])==null||_0xd97a3a['catch'](()=>this[_0x3e186a(0x1fb)]()));},0x1f4),this[_0x1b934d(0x296)]['unref']&&this['_reconnectTimeout'][_0x1b934d(0x1dc)]());},z[_0x11737d(0x234)][_0x11737d(0x297)]=async function(_0x3547ab){var _0x2cd1b5=_0x11737d;try{if(!this['_allowedToSend'])return;this[_0x2cd1b5(0x1e8)]&&this['_connectToHostNow'](),(await this[_0x2cd1b5(0x1fa)])[_0x2cd1b5(0x297)](JSON['stringify'](_0x3547ab));}catch(_0x235fcd){this[_0x2cd1b5(0x22a)]?console['warn'](this[_0x2cd1b5(0x1f0)]+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)])):(this['_extendedWarning']=!0x0,console[_0x2cd1b5(0x1e4)](this['_sendErrorMessage']+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)]),_0x3547ab)),this[_0x2cd1b5(0x27f)]=!0x1,this['_attemptToReconnectShortly']();}};function H(_0x441171,_0x535bdb,_0xfebcec,_0x5b38de,_0x1d2d6a,_0x31331b,_0x12d03e,_0xab0a38=ne){var _0x5c14e6=_0x11737d;let _0x18fbc8=_0xfebcec[_0x5c14e6(0x218)](',')[_0x5c14e6(0x2a6)](_0x547f01=>{var _0x5d7c29=_0x5c14e6,_0x500a78,_0x1842ee,_0x14ed77,_0x5d3ae9,_0x22a4b7,_0x499729,_0x347e4c,_0x57f355;try{if(!_0x441171[_0x5d7c29(0x294)]){let _0x14590e=((_0x1842ee=(_0x500a78=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x500a78['versions'])==null?void 0x0:_0x1842ee['node'])||((_0x5d3ae9=(_0x14ed77=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x14ed77[_0x5d7c29(0x22c)])==null?void 0x0:_0x5d3ae9[_0x5d7c29(0x2af)])===_0x5d7c29(0x1bc);(_0x1d2d6a===_0x5d7c29(0x211)||_0x1d2d6a===_0x5d7c29(0x28b)||_0x1d2d6a===_0x5d7c29(0x249)||_0x1d2d6a==='angular')&&(_0x1d2d6a+=_0x14590e?_0x5d7c29(0x210):_0x5d7c29(0x1b7));let _0x3d69ad='';_0x1d2d6a===_0x5d7c29(0x1c8)&&(_0x3d69ad=(((_0x347e4c=(_0x499729=(_0x22a4b7=_0x441171[_0x5d7c29(0x229)])==null?void 0x0:_0x22a4b7[_0x5d7c29(0x291)])==null?void 0x0:_0x499729['ExpoDevice'])==null?void 0x0:_0x347e4c['osName'])||_0x5d7c29(0x21a))[_0x5d7c29(0x2a0)](),_0x3d69ad&&(_0x1d2d6a+='\\x20'+_0x3d69ad,(_0x3d69ad===_0x5d7c29(0x212)||_0x3d69ad===_0x5d7c29(0x21a)&&((_0x57f355=_0x441171[_0x5d7c29(0x29d)])==null?void 0x0:_0x57f355[_0x5d7c29(0x290)])==='10.0.2.2')&&(_0x535bdb='10.0.2.2'))),_0x441171[_0x5d7c29(0x294)]={'id':+new Date(),'tool':_0x1d2d6a},_0x12d03e&&_0x1d2d6a&&!_0x14590e&&(_0x3d69ad?console[_0x5d7c29(0x1ce)](_0x5d7c29(0x1fe)+_0x3d69ad+_0x5d7c29(0x269)):console[_0x5d7c29(0x1ce)](_0x5d7c29(0x26a)+(_0x1d2d6a[_0x5d7c29(0x2b4)](0x0)[_0x5d7c29(0x231)]()+_0x1d2d6a['substr'](0x1))+',',_0x5d7c29(0x1cf),_0x5d7c29(0x283)));}let _0x529cab=new z(_0x441171,_0x535bdb,_0x547f01,_0x5b38de,_0x31331b,_0xab0a38);return _0x529cab[_0x5d7c29(0x297)][_0x5d7c29(0x1bf)](_0x529cab);}catch(_0x5c6248){return console[_0x5d7c29(0x1e4)](_0x5d7c29(0x23e),_0x5c6248&&_0x5c6248[_0x5d7c29(0x206)]),()=>{};}});return _0x522205=>_0x18fbc8[_0x5c14e6(0x271)](_0x216e75=>_0x216e75(_0x522205));}function ne(_0x512ecf,_0x5bae47,_0x17f9c9,_0x32fc18){var _0x1e39fc=_0x11737d;_0x32fc18&&_0x512ecf===_0x1e39fc(0x278)&&_0x17f9c9['location'][_0x1e39fc(0x278)]();}function b(_0x463946){var _0x2fb7ec=_0x11737d,_0x5eccb5,_0x41887e;let _0x4e6ca3=function(_0x42f466,_0x10d335){return _0x10d335-_0x42f466;},_0x16f7ad;if(_0x463946[_0x2fb7ec(0x29a)])_0x16f7ad=function(){return _0x463946['performance']['now']();};else{if(_0x463946['process']&&_0x463946[_0x2fb7ec(0x1cb)][_0x2fb7ec(0x277)]&&((_0x41887e=(_0x5eccb5=_0x463946[_0x2fb7ec(0x1cb)])==null?void 0x0:_0x5eccb5[_0x2fb7ec(0x22c)])==null?void 0x0:_0x41887e[_0x2fb7ec(0x2af)])!=='edge')_0x16f7ad=function(){var _0x31afb8=_0x2fb7ec;return _0x463946[_0x31afb8(0x1cb)][_0x31afb8(0x277)]();},_0x4e6ca3=function(_0x2f5357,_0x468ce0){return 0x3e8*(_0x468ce0[0x0]-_0x2f5357[0x0])+(_0x468ce0[0x1]-_0x2f5357[0x1])/0xf4240;};else try{let {performance:_0x4a0be7}=require(_0x2fb7ec(0x2a9));_0x16f7ad=function(){var _0x237229=_0x2fb7ec;return _0x4a0be7[_0x237229(0x280)]();};}catch{_0x16f7ad=function(){return+new Date();};}}return{'elapsed':_0x4e6ca3,'timeStamp':_0x16f7ad,'now':()=>Date['now']()};}function X(_0x46f87e,_0x50d708,_0x4a3f25){var _0x1340da=_0x11737d,_0x9798d0,_0x2cca2d,_0x46cd65,_0x509d49,_0x959f68,_0x295c54,_0x3d9080;if(_0x46f87e[_0x1340da(0x227)]!==void 0x0)return _0x46f87e[_0x1340da(0x227)];let _0x122b61=((_0x2cca2d=(_0x9798d0=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x9798d0[_0x1340da(0x2a8)])==null?void 0x0:_0x2cca2d[_0x1340da(0x1d6)])||((_0x509d49=(_0x46cd65=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x46cd65[_0x1340da(0x22c)])==null?void 0x0:_0x509d49[_0x1340da(0x2af)])===_0x1340da(0x1bc),_0x623511=!!(_0x4a3f25===_0x1340da(0x1c8)&&((_0x959f68=_0x46f87e[_0x1340da(0x229)])==null?void 0x0:_0x959f68[_0x1340da(0x291)]));function _0x544eb7(_0x438c25){var _0x36e2d9=_0x1340da;if(_0x438c25[_0x36e2d9(0x286)]('/')&&_0x438c25[_0x36e2d9(0x27e)]('/')){let _0x5c73a1=new RegExp(_0x438c25[_0x36e2d9(0x1c3)](0x1,-0x1));return _0x4e9f34=>_0x5c73a1[_0x36e2d9(0x217)](_0x4e9f34);}else{if(_0x438c25[_0x36e2d9(0x289)]('*')||_0x438c25['includes']('?')){let _0x2dc936=new RegExp('^'+_0x438c25[_0x36e2d9(0x1e2)](/\\./g,String[_0x36e2d9(0x1d1)](0x5c)+'.')[_0x36e2d9(0x1e2)](/\\*/g,'.*')[_0x36e2d9(0x1e2)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0xc466cd=>_0x2dc936['test'](_0xc466cd);}else return _0x52c188=>_0x52c188===_0x438c25;}}let _0x1033a0=_0x50d708['map'](_0x544eb7);return _0x46f87e[_0x1340da(0x227)]=_0x122b61||!_0x50d708,!_0x46f87e[_0x1340da(0x227)]&&((_0x295c54=_0x46f87e[_0x1340da(0x29d)])==null?void 0x0:_0x295c54[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=_0x1033a0[_0x1340da(0x1f6)](_0x48cd4d=>_0x48cd4d(_0x46f87e[_0x1340da(0x29d)][_0x1340da(0x290)]))),_0x623511&&!_0x46f87e[_0x1340da(0x227)]&&!((_0x3d9080=_0x46f87e[_0x1340da(0x29d)])!=null&&_0x3d9080[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=!0x0),_0x46f87e[_0x1340da(0x227)];}function _0x18ce(_0x2700a6,_0x34e33f){var _0xe3cae4=_0xe3ca();return _0x18ce=function(_0x18cebf,_0x125f3f){_0x18cebf=_0x18cebf-0x1aa;var _0x1d1eea=_0xe3cae4[_0x18cebf];return _0x1d1eea;},_0x18ce(_0x2700a6,_0x34e33f);}function J(_0x328296,_0x52ae61,_0x31d747,_0x3d7d4d,_0x4a1853,_0x40ff3c){var _0x41415e=_0x11737d;_0x328296=_0x328296,_0x52ae61=_0x52ae61,_0x31d747=_0x31d747,_0x3d7d4d=_0x3d7d4d,_0x4a1853=_0x4a1853,_0x4a1853=_0x4a1853||{},_0x4a1853['defaultLimits']=_0x4a1853[_0x41415e(0x25c)]||{},_0x4a1853['reducedLimits']=_0x4a1853[_0x41415e(0x1d3)]||{},_0x4a1853[_0x41415e(0x1c5)]=_0x4a1853['reducePolicy']||{},_0x4a1853['reducePolicy']['perLogpoint']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]||{},_0x4a1853['reducePolicy']['global']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]||{};let _0x513504={'perLogpoint':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)][_0x41415e(0x21e)]||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['reduceOnAccumulatedProcessingTimeMs']||0x64,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)]['perLogpoint'][_0x41415e(0x26e)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['resetOnProcessingTimeAverageMs']||0x64},'global':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x21e)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]['reduceOnAccumulatedProcessingTimeMs']||0x12c,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x26e)]||0x32,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x1ba)]||0x64}},_0x1a2ffe=b(_0x328296),_0x1015fc=_0x1a2ffe[_0x41415e(0x2b5)],_0x33481b=_0x1a2ffe[_0x41415e(0x25f)];function _0x4a72ac(){var _0x3a2b17=_0x41415e;this[_0x3a2b17(0x20c)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x3a2b17(0x29e)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x3a2b17(0x207)]=_0x328296[_0x3a2b17(0x247)],this[_0x3a2b17(0x264)]=_0x328296[_0x3a2b17(0x22d)],this[_0x3a2b17(0x254)]=Object[_0x3a2b17(0x2b6)],this['_getOwnPropertyNames']=Object[_0x3a2b17(0x20b)],this[_0x3a2b17(0x1ec)]=_0x328296['Symbol'],this[_0x3a2b17(0x246)]=RegExp[_0x3a2b17(0x234)][_0x3a2b17(0x285)],this[_0x3a2b17(0x236)]=Date[_0x3a2b17(0x234)]['toString'];}_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x22b)]=function(_0x3d0195,_0x2be58b,_0x44e331,_0x3bf74d){var _0x4301bd=_0x41415e,_0xe92762=this,_0x391024=_0x44e331[_0x4301bd(0x1aa)];function _0x297d9b(_0x824789,_0x41791c,_0x4b08dc){var _0x3cfaac=_0x4301bd;_0x41791c[_0x3cfaac(0x257)]=_0x3cfaac(0x2aa),_0x41791c[_0x3cfaac(0x250)]=_0x824789[_0x3cfaac(0x206)],_0xe1c560=_0x4b08dc['node']['current'],_0x4b08dc[_0x3cfaac(0x1d6)][_0x3cfaac(0x1f8)]=_0x41791c,_0xe92762['_treeNodePropertiesBeforeFullValue'](_0x41791c,_0x4b08dc);}let _0x4d2a32,_0x55bf28,_0x2053a4=_0x328296[_0x4301bd(0x28c)];_0x328296['ninjaSuppressConsole']=!0x0,_0x328296[_0x4301bd(0x21d)]&&(_0x4d2a32=_0x328296['console'][_0x4301bd(0x250)],_0x55bf28=_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x1e4)],_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=function(){}),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=function(){}));try{try{_0x44e331[_0x4301bd(0x1ff)]++,_0x44e331['autoExpand']&&_0x44e331[_0x4301bd(0x1ad)]['push'](_0x2be58b);var _0xdfca62,_0x4e45e6,_0x3f997c,_0x40e762,_0x490004=[],_0x4ccf97=[],_0x44d923,_0x254431=this[_0x4301bd(0x22e)](_0x2be58b),_0x330fb3=_0x254431===_0x4301bd(0x2b2),_0x4e3900=!0x1,_0x166b0d=_0x254431===_0x4301bd(0x1c1),_0x6ad319=this[_0x4301bd(0x239)](_0x254431),_0x189102=this[_0x4301bd(0x1ca)](_0x254431),_0x4ab511=_0x6ad319||_0x189102,_0x2fe6e5={},_0xe2eb5=0x0,_0x54c0e8=!0x1,_0xe1c560,_0x4e5928=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x44e331[_0x4301bd(0x270)]){if(_0x330fb3){if(_0x4e45e6=_0x2be58b['length'],_0x4e45e6>_0x44e331['elements']){for(_0x3f997c=0x0,_0x40e762=_0x44e331[_0x4301bd(0x24f)],_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));_0x3d0195['cappedElements']=!0x0;}else{for(_0x3f997c=0x0,_0x40e762=_0x4e45e6,_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));}_0x44e331[_0x4301bd(0x1c4)]+=_0x4ccf97[_0x4301bd(0x23a)];}if(!(_0x254431===_0x4301bd(0x24a)||_0x254431==='undefined')&&!_0x6ad319&&_0x254431!=='String'&&_0x254431!=='Buffer'&&_0x254431!==_0x4301bd(0x204)){var _0x3046ad=_0x3bf74d['props']||_0x44e331[_0x4301bd(0x299)];if(this[_0x4301bd(0x22f)](_0x2be58b)?(_0xdfca62=0x0,_0x2be58b['forEach'](function(_0x14123b){var _0x112688=_0x4301bd;if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x112688(0x216)]&&_0x44e331[_0x112688(0x1aa)]&&_0x44e331['autoExpandPropertyCount']>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}_0x4ccf97[_0x112688(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x112688(0x2ae),_0xdfca62++,_0x44e331,function(_0x46f38e){return function(){return _0x46f38e;};}(_0x14123b)));})):this[_0x4301bd(0x1b4)](_0x2be58b)&&_0x2be58b['forEach'](function(_0x35d7b2,_0x4f3b22){var _0x3d4777=_0x4301bd;if(_0xe2eb5++,_0x44e331[_0x3d4777(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x3d4777(0x216)]&&_0x44e331[_0x3d4777(0x1aa)]&&_0x44e331[_0x3d4777(0x1c4)]>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}var _0x3d8b44=_0x4f3b22[_0x3d4777(0x285)]();_0x3d8b44[_0x3d4777(0x23a)]>0x64&&(_0x3d8b44=_0x3d8b44[_0x3d4777(0x1c3)](0x0,0x64)+_0x3d4777(0x1be)),_0x4ccf97[_0x3d4777(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x3d4777(0x1ea),_0x3d8b44,_0x44e331,function(_0x11b7a8){return function(){return _0x11b7a8;};}(_0x35d7b2)));}),!_0x4e3900){try{for(_0x44d923 in _0x2be58b)if(!(_0x330fb3&&_0x4e5928['test'](_0x44d923))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)){if(_0xe2eb5++,_0x44e331[_0x4301bd(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}catch{}if(_0x2fe6e5['_p_length']=!0x0,_0x166b0d&&(_0x2fe6e5[_0x4301bd(0x1d0)]=!0x0),!_0x54c0e8){var _0xb11c96=[][_0x4301bd(0x245)](this[_0x4301bd(0x24b)](_0x2be58b))[_0x4301bd(0x245)](this[_0x4301bd(0x1e3)](_0x2be58b));for(_0xdfca62=0x0,_0x4e45e6=_0xb11c96[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)if(_0x44d923=_0xb11c96[_0xdfca62],!(_0x330fb3&&_0x4e5928[_0x4301bd(0x217)](_0x44d923[_0x4301bd(0x285)]()))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)&&!_0x2fe6e5[typeof _0x44d923!='symbol'?_0x4301bd(0x208)+_0x44d923[_0x4301bd(0x285)]():_0x44d923]){if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}}}}if(_0x3d0195['type']=_0x254431,_0x4ab511?(_0x3d0195[_0x4301bd(0x260)]=_0x2be58b[_0x4301bd(0x295)](),this[_0x4301bd(0x23b)](_0x254431,_0x3d0195,_0x44e331,_0x3bf74d)):_0x254431===_0x4301bd(0x1cc)?_0x3d0195['value']=this[_0x4301bd(0x236)]['call'](_0x2be58b):_0x254431==='bigint'?_0x3d0195['value']=_0x2be58b['toString']():_0x254431===_0x4301bd(0x276)?_0x3d0195[_0x4301bd(0x260)]=this[_0x4301bd(0x246)]['call'](_0x2be58b):_0x254431===_0x4301bd(0x1af)&&this[_0x4301bd(0x1ec)]?_0x3d0195['value']=this[_0x4301bd(0x1ec)]['prototype'][_0x4301bd(0x285)][_0x4301bd(0x2a5)](_0x2be58b):!_0x44e331['depth']&&!(_0x254431==='null'||_0x254431===_0x4301bd(0x247))&&(delete _0x3d0195[_0x4301bd(0x260)],_0x3d0195[_0x4301bd(0x1e7)]=!0x0),_0x54c0e8&&(_0x3d0195[_0x4301bd(0x26b)]=!0x0),_0xe1c560=_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)],_0x44e331[_0x4301bd(0x1d6)]['current']=_0x3d0195,this['_treeNodePropertiesBeforeFullValue'](_0x3d0195,_0x44e331),_0x4ccf97[_0x4301bd(0x23a)]){for(_0xdfca62=0x0,_0x4e45e6=_0x4ccf97[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)_0x4ccf97[_0xdfca62](_0xdfca62);}_0x490004['length']&&(_0x3d0195[_0x4301bd(0x299)]=_0x490004);}catch(_0x13a65c){_0x297d9b(_0x13a65c,_0x3d0195,_0x44e331);}this[_0x4301bd(0x262)](_0x2be58b,_0x3d0195),this[_0x4301bd(0x248)](_0x3d0195,_0x44e331),_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)]=_0xe1c560,_0x44e331[_0x4301bd(0x1ff)]--,_0x44e331[_0x4301bd(0x1aa)]=_0x391024,_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331['autoExpandPreviousObjects'][_0x4301bd(0x26f)]();}finally{_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=_0x4d2a32),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=_0x55bf28),_0x328296[_0x4301bd(0x28c)]=_0x2053a4;}return _0x3d0195;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e3)]=function(_0x37b1bc){var _0x51bfab=_0x41415e;return Object[_0x51bfab(0x1f2)]?Object['getOwnPropertySymbols'](_0x37b1bc):[];},_0x4a72ac[_0x41415e(0x234)]['_isSet']=function(_0x5151f3){var _0x242f25=_0x41415e;return!!(_0x5151f3&&_0x328296[_0x242f25(0x2ae)]&&this[_0x242f25(0x267)](_0x5151f3)==='[object\\x20Set]'&&_0x5151f3[_0x242f25(0x271)]);},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c2)]=function(_0x3b2ce2,_0x2fdf14,_0x2192c9){var _0x341e44=_0x41415e;if(!_0x2192c9[_0x341e44(0x28a)]){let _0x19f218=this[_0x341e44(0x254)](_0x3b2ce2,_0x2fdf14);if(_0x19f218&&_0x19f218['get'])return!0x0;}return _0x2192c9[_0x341e44(0x1da)]?typeof _0x3b2ce2[_0x2fdf14]=='function':!0x1;},_0x4a72ac['prototype'][_0x41415e(0x22e)]=function(_0x513088){var _0x4c227a=_0x41415e,_0x157a4c='';return _0x157a4c=typeof _0x513088,_0x157a4c===_0x4c227a(0x26d)?this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x201)?_0x157a4c=_0x4c227a(0x2b2):this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x1ee)?_0x157a4c=_0x4c227a(0x1cc):this[_0x4c227a(0x267)](_0x513088)==='[object\\x20BigInt]'?_0x157a4c=_0x4c227a(0x204):_0x513088===null?_0x157a4c=_0x4c227a(0x24a):_0x513088['constructor']&&(_0x157a4c=_0x513088[_0x4c227a(0x1ab)][_0x4c227a(0x2a1)]||_0x157a4c):_0x157a4c===_0x4c227a(0x247)&&this[_0x4c227a(0x264)]&&_0x513088 instanceof this['_HTMLAllCollection']&&(_0x157a4c=_0x4c227a(0x22d)),_0x157a4c;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x267)]=function(_0x2c336f){var _0x2c18c5=_0x41415e;return Object[_0x2c18c5(0x234)][_0x2c18c5(0x285)][_0x2c18c5(0x2a5)](_0x2c336f);},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveType']=function(_0x54e81f){var _0x4e444c=_0x41415e;return _0x54e81f===_0x4e444c(0x256)||_0x54e81f==='string'||_0x54e81f==='number';},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveWrapperType']=function(_0x13b047){var _0x2a1a18=_0x41415e;return _0x13b047===_0x2a1a18(0x1f7)||_0x13b047===_0x2a1a18(0x274)||_0x13b047===_0x2a1a18(0x2b7);},_0x4a72ac['prototype'][_0x41415e(0x1d2)]=function(_0x406e1a,_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d){var _0x2b12c8=this;return function(_0x4d95dc){var _0x3db731=_0x18ce,_0x1680b2=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f8)],_0xa0004b=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)],_0x4358a4=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)];_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)]=_0x1680b2,_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)]=typeof _0x190068==_0x3db731(0x237)?_0x190068:_0x4d95dc,_0x406e1a['push'](_0x2b12c8[_0x3db731(0x1e1)](_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d)),_0x4b4336[_0x3db731(0x1d6)]['parent']=_0x4358a4,_0x4b4336[_0x3db731(0x1d6)]['index']=_0xa0004b;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x21c)]=function(_0xb89524,_0x39b154,_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a){var _0x4eb9c2=_0x41415e,_0x57619d=this;return _0x39b154[typeof _0x2b0a10!=_0x4eb9c2(0x1af)?'_p_'+_0x2b0a10[_0x4eb9c2(0x285)]():_0x2b0a10]=!0x0,function(_0x592143){var _0x524fed=_0x4eb9c2,_0x5db0ea=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f8)],_0x48ef88=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)],_0x2db377=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)];_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x5db0ea,_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)]=_0x592143,_0xb89524['push'](_0x57619d[_0x524fed(0x1e1)](_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a)),_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x2db377,_0x1a5280['node'][_0x524fed(0x1f5)]=_0x48ef88;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e1)]=function(_0x404a98,_0x224eea,_0x2a8ac8,_0xc4ef24,_0x209e86){var _0x15e881=_0x41415e,_0x5e29e0=this;_0x209e86||(_0x209e86=function(_0x39e6bc,_0x370650){return _0x39e6bc[_0x370650];});var _0x1b0f9a=_0x2a8ac8['toString'](),_0xa4b58b=_0xc4ef24['expressionsToEvaluate']||{},_0x5493d4=_0xc4ef24[_0x15e881(0x270)],_0x159f07=_0xc4ef24[_0x15e881(0x216)];try{var _0x399d89=this[_0x15e881(0x1b4)](_0x404a98),_0x531278=_0x1b0f9a;_0x399d89&&_0x531278[0x0]==='\\x27'&&(_0x531278=_0x531278[_0x15e881(0x24d)](0x1,_0x531278[_0x15e881(0x23a)]-0x2));var _0x453454=_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b[_0x15e881(0x208)+_0x531278];_0x453454&&(_0xc4ef24[_0x15e881(0x270)]=_0xc4ef24[_0x15e881(0x270)]+0x1),_0xc4ef24[_0x15e881(0x216)]=!!_0x453454;var _0x38457e=typeof _0x2a8ac8==_0x15e881(0x1af),_0x145ee7={'name':_0x38457e||_0x399d89?_0x1b0f9a:this[_0x15e881(0x1b6)](_0x1b0f9a)};if(_0x38457e&&(_0x145ee7['symbol']=!0x0),!(_0x224eea===_0x15e881(0x2b2)||_0x224eea===_0x15e881(0x1b9))){var _0x4fc38b=this[_0x15e881(0x254)](_0x404a98,_0x2a8ac8);if(_0x4fc38b&&(_0x4fc38b['set']&&(_0x145ee7[_0x15e881(0x268)]=!0x0),_0x4fc38b[_0x15e881(0x243)]&&!_0x453454&&!_0xc4ef24['resolveGetters']))return _0x145ee7[_0x15e881(0x25d)]=!0x0,this['_processTreeNodeResult'](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x5c7867;try{_0x5c7867=_0x209e86(_0x404a98,_0x2a8ac8);}catch(_0x390630){return _0x145ee7={'name':_0x1b0f9a,'type':_0x15e881(0x2aa),'error':_0x390630[_0x15e881(0x206)]},this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x239e42=this[_0x15e881(0x22e)](_0x5c7867),_0x153dbf=this[_0x15e881(0x239)](_0x239e42);if(_0x145ee7['type']=_0x239e42,_0x153dbf)this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x2a2d3f=_0x15e881;_0x145ee7[_0x2a2d3f(0x260)]=_0x5c7867[_0x2a2d3f(0x295)](),!_0x453454&&_0x5e29e0['_capIfString'](_0x239e42,_0x145ee7,_0xc4ef24,{});});else{var _0x170491=_0xc4ef24[_0x15e881(0x1aa)]&&_0xc4ef24['level']<_0xc4ef24[_0x15e881(0x259)]&&_0xc4ef24[_0x15e881(0x1ad)][_0x15e881(0x1d4)](_0x5c7867)<0x0&&_0x239e42!==_0x15e881(0x1c1)&&_0xc4ef24[_0x15e881(0x1c4)]<_0xc4ef24[_0x15e881(0x1bd)];_0x170491||_0xc4ef24[_0x15e881(0x1ff)]<_0x5493d4||_0x453454?this['serialize'](_0x145ee7,_0x5c7867,_0xc4ef24,_0x453454||{}):this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x29be9c=_0x15e881;_0x239e42==='null'||_0x239e42==='undefined'||(delete _0x145ee7[_0x29be9c(0x260)],_0x145ee7['capped']=!0x0);});}return _0x145ee7;}finally{_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b,_0xc4ef24[_0x15e881(0x270)]=_0x5493d4,_0xc4ef24[_0x15e881(0x216)]=_0x159f07;}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x23b)]=function(_0x149305,_0x4e4404,_0x187b3d,_0x59debf){var _0x4cdb3b=_0x41415e,_0x74bcfb=_0x59debf[_0x4cdb3b(0x1d8)]||_0x187b3d['strLength'];if((_0x149305==='string'||_0x149305===_0x4cdb3b(0x274))&&_0x4e4404[_0x4cdb3b(0x260)]){let _0x1e9dcd=_0x4e4404['value'][_0x4cdb3b(0x23a)];_0x187b3d[_0x4cdb3b(0x275)]+=_0x1e9dcd,_0x187b3d[_0x4cdb3b(0x275)]>_0x187b3d[_0x4cdb3b(0x1e6)]?(_0x4e4404[_0x4cdb3b(0x1e7)]='',delete _0x4e4404['value']):_0x1e9dcd>_0x74bcfb&&(_0x4e4404[_0x4cdb3b(0x1e7)]=_0x4e4404[_0x4cdb3b(0x260)][_0x4cdb3b(0x24d)](0x0,_0x74bcfb),delete _0x4e4404['value']);}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1b4)]=function(_0x4cafd8){var _0x1f56d7=_0x41415e;return!!(_0x4cafd8&&_0x328296[_0x1f56d7(0x1ea)]&&this[_0x1f56d7(0x267)](_0x4cafd8)==='[object\\x20Map]'&&_0x4cafd8[_0x1f56d7(0x271)]);},_0x4a72ac['prototype']['_propertyName']=function(_0x556f90){var _0x1a47d0=_0x41415e;if(_0x556f90[_0x1a47d0(0x221)](/^\\d+$/))return _0x556f90;var _0x409087;try{_0x409087=JSON[_0x1a47d0(0x1e5)](''+_0x556f90);}catch{_0x409087='\\x22'+this[_0x1a47d0(0x267)](_0x556f90)+'\\x22';}return _0x409087[_0x1a47d0(0x221)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x409087=_0x409087[_0x1a47d0(0x24d)](0x1,_0x409087[_0x1a47d0(0x23a)]-0x2):_0x409087=_0x409087['replace'](/'/g,'\\x5c\\x27')[_0x1a47d0(0x1e2)](/\\\\\"/g,'\\x22')[_0x1a47d0(0x1e2)](/(^\"|\"$)/g,'\\x27'),_0x409087;},_0x4a72ac[_0x41415e(0x234)]['_processTreeNodeResult']=function(_0x2ce4bf,_0x28f550,_0x44eea1,_0x4515b9){var _0x294ebc=_0x41415e;this[_0x294ebc(0x242)](_0x2ce4bf,_0x28f550),_0x4515b9&&_0x4515b9(),this[_0x294ebc(0x262)](_0x44eea1,_0x2ce4bf),this[_0x294ebc(0x248)](_0x2ce4bf,_0x28f550);},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesBeforeFullValue']=function(_0x172a9d,_0x25c126){var _0x3dad14=_0x41415e;this[_0x3dad14(0x28d)](_0x172a9d,_0x25c126),this['_setNodeQueryPath'](_0x172a9d,_0x25c126),this['_setNodeExpressionPath'](_0x172a9d,_0x25c126),this['_setNodePermissions'](_0x172a9d,_0x25c126);},_0x4a72ac[_0x41415e(0x234)]['_setNodeId']=function(_0x1537f2,_0x3ab443){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1ef)]=function(_0x2427d1,_0x358bf3){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1cd)]=function(_0x54e5a6,_0x43bba0){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20e)]=function(_0x54acf6){var _0x335ec4=_0x41415e;return _0x54acf6===this[_0x335ec4(0x207)];},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesAfterFullValue']=function(_0x3d7e71,_0x54743f){var _0x59cd8a=_0x41415e;this['_setNodeLabel'](_0x3d7e71,_0x54743f),this['_setNodeExpandableState'](_0x3d7e71),_0x54743f[_0x59cd8a(0x1c7)]&&this[_0x59cd8a(0x1c6)](_0x3d7e71),this['_addFunctionsNode'](_0x3d7e71,_0x54743f),this[_0x59cd8a(0x1e0)](_0x3d7e71,_0x54743f),this['_cleanNode'](_0x3d7e71);},_0x4a72ac['prototype'][_0x41415e(0x262)]=function(_0x58500d,_0x2f1ff0){var _0x53b67e=_0x41415e;try{_0x58500d&&typeof _0x58500d['length']==_0x53b67e(0x237)&&(_0x2f1ff0[_0x53b67e(0x23a)]=_0x58500d[_0x53b67e(0x23a)]);}catch{}if(_0x2f1ff0[_0x53b67e(0x257)]===_0x53b67e(0x237)||_0x2f1ff0['type']==='Number'){if(isNaN(_0x2f1ff0[_0x53b67e(0x260)]))_0x2f1ff0[_0x53b67e(0x263)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];else switch(_0x2f1ff0[_0x53b67e(0x260)]){case Number[_0x53b67e(0x29b)]:_0x2f1ff0[_0x53b67e(0x228)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case Number['NEGATIVE_INFINITY']:_0x2f1ff0[_0x53b67e(0x25a)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case 0x0:this[_0x53b67e(0x258)](_0x2f1ff0[_0x53b67e(0x260)])&&(_0x2f1ff0['negativeZero']=!0x0);break;}}else _0x2f1ff0[_0x53b67e(0x257)]==='function'&&typeof _0x58500d[_0x53b67e(0x2a1)]==_0x53b67e(0x1e9)&&_0x58500d[_0x53b67e(0x2a1)]&&_0x2f1ff0[_0x53b67e(0x2a1)]&&_0x58500d[_0x53b67e(0x2a1)]!==_0x2f1ff0['name']&&(_0x2f1ff0['funcName']=_0x58500d[_0x53b67e(0x2a1)]);},_0x4a72ac[_0x41415e(0x234)]['_isNegativeZero']=function(_0x5c40e7){var _0x716367=_0x41415e;return 0x1/_0x5c40e7===Number[_0x716367(0x293)];},_0x4a72ac['prototype'][_0x41415e(0x1c6)]=function(_0x20eb48){var _0x1c5169=_0x41415e;!_0x20eb48[_0x1c5169(0x299)]||!_0x20eb48['props'][_0x1c5169(0x23a)]||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x2b2)||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x1ea)||_0x20eb48['type']==='Set'||_0x20eb48[_0x1c5169(0x299)][_0x1c5169(0x279)](function(_0x415953,_0x627e36){var _0x3dc3b7=_0x1c5169,_0x10fc8e=_0x415953[_0x3dc3b7(0x2a1)][_0x3dc3b7(0x2a0)](),_0x279c34=_0x627e36[_0x3dc3b7(0x2a1)]['toLowerCase']();return _0x10fc8e<_0x279c34?-0x1:_0x10fc8e>_0x279c34?0x1:0x0;});},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c0)]=function(_0x16876f,_0x162fd2){var _0x3d2a76=_0x41415e;if(!(_0x162fd2[_0x3d2a76(0x1da)]||!_0x16876f[_0x3d2a76(0x299)]||!_0x16876f['props']['length'])){for(var _0x2f6f65=[],_0x358cf7=[],_0x167b6c=0x0,_0x2108d8=_0x16876f['props'][_0x3d2a76(0x23a)];_0x167b6c<_0x2108d8;_0x167b6c++){var _0x3c39e8=_0x16876f[_0x3d2a76(0x299)][_0x167b6c];_0x3c39e8[_0x3d2a76(0x257)]===_0x3d2a76(0x1c1)?_0x2f6f65[_0x3d2a76(0x1dd)](_0x3c39e8):_0x358cf7[_0x3d2a76(0x1dd)](_0x3c39e8);}if(!(!_0x358cf7[_0x3d2a76(0x23a)]||_0x2f6f65[_0x3d2a76(0x23a)]<=0x1)){_0x16876f[_0x3d2a76(0x299)]=_0x358cf7;var _0x20ca6a={'functionsNode':!0x0,'props':_0x2f6f65};this['_setNodeId'](_0x20ca6a,_0x162fd2),this['_setNodeLabel'](_0x20ca6a,_0x162fd2),this['_setNodeExpandableState'](_0x20ca6a),this[_0x3d2a76(0x2a3)](_0x20ca6a,_0x162fd2),_0x20ca6a['id']+='\\x20f',_0x16876f[_0x3d2a76(0x299)][_0x3d2a76(0x2a4)](_0x20ca6a);}}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e0)]=function(_0x3123fd,_0x4647e8){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20a)]=function(_0x2ca82b){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1f9)]=function(_0x41db73){var _0x3b2dc0=_0x41415e;return Array[_0x3b2dc0(0x21f)](_0x41db73)||typeof _0x41db73==_0x3b2dc0(0x26d)&&this['_objectToString'](_0x41db73)==='[object\\x20Array]';},_0x4a72ac['prototype'][_0x41415e(0x2a3)]=function(_0x5900cd,_0x4da276){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x2b1)]=function(_0x3153d5){var _0x60e45=_0x41415e;delete _0x3153d5['_hasSymbolPropertyOnItsPath'],delete _0x3153d5['_hasSetOnItsPath'],delete _0x3153d5[_0x60e45(0x1ed)];},_0x4a72ac['prototype'][_0x41415e(0x214)]=function(_0x1c5b52,_0xeb8701){};let _0x1b1f6a=new _0x4a72ac(),_0x5ab55c={'props':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x299)]||0x64,'elements':_0x4a1853[_0x41415e(0x25c)]['elements']||0x64,'strLength':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1d8)]||0x400*0x32,'totalStrLength':_0x4a1853[_0x41415e(0x25c)]['totalStrLength']||0x400*0x32,'autoExpandLimit':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1bd)]||0x1388,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x259)]||0xa},_0x1bc32b={'props':_0x4a1853['reducedLimits'][_0x41415e(0x299)]||0x5,'elements':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x24f)]||0x5,'strLength':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1d8)]||0x100,'totalStrLength':_0x4a1853['reducedLimits'][_0x41415e(0x1e6)]||0x100*0x3,'autoExpandLimit':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1bd)]||0x1e,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x259)]||0x2};if(_0x40ff3c){let _0x465da0=_0x1b1f6a[_0x41415e(0x22b)][_0x41415e(0x1bf)](_0x1b1f6a);_0x1b1f6a['serialize']=function(_0x5bb6ac,_0xc8b820,_0x217e83,_0x48221d){return _0x465da0(_0x5bb6ac,_0x40ff3c(_0xc8b820),_0x217e83,_0x48221d);};}function _0x5d0dae(_0x36176c,_0x50f2a2,_0x31d836,_0x2f1b40,_0x356462,_0x21c4d){var _0x31131d=_0x41415e;let _0xc471d5,_0x41a687;try{_0x41a687=_0x33481b(),_0xc471d5=_0x31d747[_0x50f2a2],!_0xc471d5||_0x41a687-_0xc471d5['ts']>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x26e)]&&_0xc471d5[_0x31131d(0x215)]&&_0xc471d5['time']/_0xc471d5['count']<_0x513504[_0x31131d(0x2ab)][_0x31131d(0x1ba)]?(_0x31d747[_0x50f2a2]=_0xc471d5={'count':0x0,'time':0x0,'ts':_0x41a687},_0x31d747[_0x31131d(0x1b2)]={}):_0x41a687-_0x31d747[_0x31131d(0x1b2)]['ts']>_0x513504[_0x31131d(0x25e)][_0x31131d(0x26e)]&&_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]&&_0x31d747['hits']['time']/_0x31d747['hits']['count']<_0x513504['global'][_0x31131d(0x1ba)]&&(_0x31d747['hits']={});let _0x33ab9c=[],_0x32224c=_0xc471d5[_0x31131d(0x261)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]?_0x1bc32b:_0x5ab55c,_0x4ed7e1=_0x541a03=>{var _0x1d9f10=_0x31131d;let _0xb83276={};return _0xb83276[_0x1d9f10(0x299)]=_0x541a03[_0x1d9f10(0x299)],_0xb83276['elements']=_0x541a03['elements'],_0xb83276[_0x1d9f10(0x1d8)]=_0x541a03[_0x1d9f10(0x1d8)],_0xb83276[_0x1d9f10(0x1e6)]=_0x541a03[_0x1d9f10(0x1e6)],_0xb83276[_0x1d9f10(0x1bd)]=_0x541a03[_0x1d9f10(0x1bd)],_0xb83276[_0x1d9f10(0x259)]=_0x541a03[_0x1d9f10(0x259)],_0xb83276[_0x1d9f10(0x1c7)]=!0x1,_0xb83276[_0x1d9f10(0x1da)]=!_0x52ae61,_0xb83276[_0x1d9f10(0x270)]=0x1,_0xb83276['level']=0x0,_0xb83276[_0x1d9f10(0x29c)]=_0x1d9f10(0x1ac),_0xb83276[_0x1d9f10(0x2b3)]=_0x1d9f10(0x222),_0xb83276['autoExpand']=!0x0,_0xb83276['autoExpandPreviousObjects']=[],_0xb83276[_0x1d9f10(0x1c4)]=0x0,_0xb83276[_0x1d9f10(0x28a)]=_0x4a1853['resolveGetters'],_0xb83276[_0x1d9f10(0x275)]=0x0,_0xb83276[_0x1d9f10(0x1d6)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xb83276;};for(var _0x4872b1=0x0;_0x4872b1<_0x356462[_0x31131d(0x23a)];_0x4872b1++)_0x33ab9c['push'](_0x1b1f6a[_0x31131d(0x22b)]({'timeNode':_0x36176c===_0x31131d(0x213)||void 0x0},_0x356462[_0x4872b1],_0x4ed7e1(_0x32224c),{}));if(_0x36176c==='trace'||_0x36176c===_0x31131d(0x250)){let _0xbe35ed=Error[_0x31131d(0x1d5)];try{Error[_0x31131d(0x1d5)]=0x1/0x0,_0x33ab9c[_0x31131d(0x1dd)](_0x1b1f6a[_0x31131d(0x22b)]({'stackNode':!0x0},new Error()[_0x31131d(0x1fc)],_0x4ed7e1(_0x32224c),{'strLength':0x1/0x0}));}finally{Error[_0x31131d(0x1d5)]=_0xbe35ed;}}return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':_0x33ab9c,'id':_0x50f2a2,'context':_0x21c4d}]};}catch(_0x5f1a84){return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':[{'type':_0x31131d(0x2aa),'error':_0x5f1a84&&_0x5f1a84[_0x31131d(0x206)]}],'id':_0x50f2a2,'context':_0x21c4d}]};}finally{try{if(_0xc471d5&&_0x41a687){let _0x1e910a=_0x33481b();_0xc471d5[_0x31131d(0x215)]++,_0xc471d5[_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0xc471d5['ts']=_0x1e910a,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]++,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0x31d747[_0x31131d(0x1b2)]['ts']=_0x1e910a,(_0xc471d5[_0x31131d(0x215)]>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x21e)]||_0xc471d5[_0x31131d(0x213)]>_0x513504['perLogpoint'][_0x31131d(0x200)])&&(_0xc471d5['reduceLimits']=!0x0),(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x21e)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x200)])&&(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]=!0x0);}}catch{}}}return _0x5d0dae;}function G(_0x57f7c8){var _0x8989a5=_0x11737d;if(_0x57f7c8&&typeof _0x57f7c8==_0x8989a5(0x26d)&&_0x57f7c8[_0x8989a5(0x1ab)])switch(_0x57f7c8[_0x8989a5(0x1ab)][_0x8989a5(0x2a1)]){case _0x8989a5(0x1c9):return _0x57f7c8[_0x8989a5(0x202)](Symbol[_0x8989a5(0x220)])?Promise[_0x8989a5(0x27d)]():_0x57f7c8;case _0x8989a5(0x273):return Promise[_0x8989a5(0x27d)]();}return _0x57f7c8;}((_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x8035f7,_0x1eee1e,_0x4e67e7,_0x1dcc2b,_0x36ad0d,_0x5eec70,_0x325478)=>{var _0x417c2e=_0x11737d;if(_0x49a927[_0x417c2e(0x272)])return _0x49a927['_console_ninja'];let _0x493a09={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!X(_0x49a927,_0x4e67e7,_0x4fe531))return _0x49a927[_0x417c2e(0x272)]=_0x493a09,_0x49a927['_console_ninja'];let _0x1c6bc5=b(_0x49a927),_0x2b8f39=_0x1c6bc5[_0x417c2e(0x2b5)],_0x2d109f=_0x1c6bc5[_0x417c2e(0x25f)],_0x200f28=_0x1c6bc5[_0x417c2e(0x280)],_0x19208f={'hits':{},'ts':{}},_0xc7afd2=J(_0x49a927,_0x1dcc2b,_0x19208f,_0x8035f7,_0x325478,_0x4fe531==='next.js'?G:void 0x0),_0x118149=(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122)=>{var _0x3ee198=_0x417c2e;let _0x42dc9c=_0x49a927[_0x3ee198(0x272)];try{return _0x49a927[_0x3ee198(0x272)]=_0x493a09,_0xc7afd2(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122);}finally{_0x49a927[_0x3ee198(0x272)]=_0x42dc9c;}},_0x11bc8c=_0x374f3d=>{_0x19208f['ts'][_0x374f3d]=_0x2d109f();},_0x1c419e=(_0x19a11f,_0x5262fc)=>{var _0x3954f9=_0x417c2e;let _0x325002=_0x19208f['ts'][_0x5262fc];if(delete _0x19208f['ts'][_0x5262fc],_0x325002){let _0x493846=_0x2b8f39(_0x325002,_0x2d109f());_0x5bf617(_0x118149(_0x3954f9(0x213),_0x19a11f,_0x200f28(),_0x4202ca,[_0x493846],_0x5262fc));}},_0x2e039f=_0x5b0257=>{var _0x102273=_0x417c2e,_0x56d8f6;return _0x4fe531===_0x102273(0x211)&&_0x49a927['origin']&&((_0x56d8f6=_0x5b0257==null?void 0x0:_0x5b0257[_0x102273(0x21b)])==null?void 0x0:_0x56d8f6[_0x102273(0x23a)])&&(_0x5b0257[_0x102273(0x21b)][0x0][_0x102273(0x282)]=_0x49a927[_0x102273(0x282)]),_0x5b0257;};_0x49a927[_0x417c2e(0x272)]={'consoleLog':(_0xb0ef16,_0x4b56f2)=>{var _0x51186d=_0x417c2e;_0x49a927[_0x51186d(0x21d)][_0x51186d(0x1ce)]['name']!==_0x51186d(0x1fd)&&_0x5bf617(_0x118149(_0x51186d(0x1ce),_0xb0ef16,_0x200f28(),_0x4202ca,_0x4b56f2));},'consoleTrace':(_0xb88eb7,_0x523325)=>{var _0xc218c5=_0x417c2e,_0x514946,_0x272087;_0x49a927[_0xc218c5(0x21d)][_0xc218c5(0x1ce)][_0xc218c5(0x2a1)]!==_0xc218c5(0x20d)&&((_0x272087=(_0x514946=_0x49a927[_0xc218c5(0x1cb)])==null?void 0x0:_0x514946[_0xc218c5(0x2a8)])!=null&&_0x272087[_0xc218c5(0x1d6)]&&(_0x49a927[_0xc218c5(0x238)]=!0x0),_0x5bf617(_0x2e039f(_0x118149(_0xc218c5(0x288),_0xb88eb7,_0x200f28(),_0x4202ca,_0x523325))));},'consoleError':(_0x36ac47,_0x2b4a69)=>{var _0x24b679=_0x417c2e;_0x49a927[_0x24b679(0x238)]=!0x0,_0x5bf617(_0x2e039f(_0x118149('error',_0x36ac47,_0x200f28(),_0x4202ca,_0x2b4a69)));},'consoleTime':_0x2a2292=>{_0x11bc8c(_0x2a2292);},'consoleTimeEnd':(_0x186230,_0x3edf28)=>{_0x1c419e(_0x3edf28,_0x186230);},'autoLog':(_0x196e30,_0x4757f9)=>{var _0x14995c=_0x417c2e;_0x5bf617(_0x118149(_0x14995c(0x1ce),_0x4757f9,_0x200f28(),_0x4202ca,[_0x196e30]));},'autoLogMany':(_0x590664,_0x511674)=>{var _0x150948=_0x417c2e;_0x5bf617(_0x118149(_0x150948(0x1ce),_0x590664,_0x200f28(),_0x4202ca,_0x511674));},'autoTrace':(_0xf09034,_0x477842)=>{_0x5bf617(_0x2e039f(_0x118149('trace',_0x477842,_0x200f28(),_0x4202ca,[_0xf09034])));},'autoTraceMany':(_0x5dfffd,_0x37f583)=>{var _0x1a70f9=_0x417c2e;_0x5bf617(_0x2e039f(_0x118149(_0x1a70f9(0x288),_0x5dfffd,_0x200f28(),_0x4202ca,_0x37f583)));},'autoTime':(_0xa8fce3,_0x13dfa8,_0x217929)=>{_0x11bc8c(_0x217929);},'autoTimeEnd':(_0x48d600,_0x2b5f35,_0x5c28a8)=>{_0x1c419e(_0x2b5f35,_0x5c28a8);},'coverage':_0x2ec881=>{_0x5bf617({'method':'coverage','version':_0x8035f7,'args':[{'id':_0x2ec881}]});}};let _0x5bf617=H(_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x36ad0d,_0x5eec70),_0x4202ca=_0x49a927['_console_ninja_session'];return _0x49a927[_0x417c2e(0x272)];})(globalThis,_0x11737d(0x2a2),'52991',_0x11737d(0x1bb),_0x11737d(0x1b8),_0x11737d(0x25b),_0x11737d(0x20f),_0x11737d(0x1de),_0x11737d(0x281),_0x11737d(0x223),'1',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}});");
}
catch (e) {
    console.error(e);
} }
; /* istanbul ignore next */
function oo_oo(i, ...v) { try {
    oo_cm().consoleLog(i, v);
}
catch (e) { } return v; }
;
oo_oo; /* istanbul ignore next */
function oo_tr(i, ...v) { try {
    oo_cm().consoleTrace(i, v);
}
catch (e) { } return v; }
;
oo_tr; /* istanbul ignore next */
function oo_tx(i, ...v) { try {
    oo_cm().consoleError(i, v);
}
catch (e) { } return v; }
;
oo_tx; /* istanbul ignore next */
function oo_ts(v) { try {
    oo_cm().consoleTime(v);
}
catch (e) { } return v; }
;
oo_ts; /* istanbul ignore next */
function oo_te(v, i) { try {
    oo_cm().consoleTimeEnd(v, i);
}
catch (e) { } return v; }
;
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/



/***/ }),

/***/ "./src/js/legend-toggle.ts":
/*!*********************************!*\
  !*** ./src/js/legend-toggle.ts ***!
  \*********************************/
/***/ (() => {


document.addEventListener("DOMContentLoaded", () => {
    const legendContainer = document.querySelector(".map-legend");
    const toggleButton = document.querySelector(".legend-scroll-indicator");
    if (!legendContainer || !toggleButton) {
        return;
    }
    // Only enable toggle functionality on mobile
    const isMobile = () => window.innerWidth <= 576;
    if (isMobile()) {
        // Start collapsed on mobile
        legendContainer.classList.remove("expanded");
        toggleButton.classList.remove("expanded");
    }
    toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isMobile())
            return; // Only work on mobile
        const isExpanded = legendContainer.classList.toggle("expanded");
        toggleButton.classList.toggle("expanded");
    });
    // Handle window resize
    window.addEventListener("resize", () => {
        if (!isMobile()) {
            // Reset on desktop
            legendContainer.classList.remove("expanded");
            toggleButton.classList.remove("expanded");
        }
    });
});


/***/ }),

/***/ "./src/js/menu.ts":
/*!************************!*\
  !*** ./src/js/menu.ts ***!
  \************************/
/***/ (() => {


document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header-menu-burger");
    const menuContent = document.querySelector(".header-menu-content");
    const menuItems = document.querySelectorAll(".menu-item-has-children");
    const removeAccents = (text) => {
        return text
            .replace(/é/g, "e")
            .replace(/è/g, "e")
            .replace(/ê/g, "e")
            .replace(/ë/g, "e")
            .replace(/à/g, "a")
            .replace(/â/g, "a")
            .replace(/ä/g, "a")
            .replace(/ù/g, "u")
            .replace(/û/g, "u")
            .replace(/ü/g, "u")
            .replace(/î/g, "i")
            .replace(/ï/g, "i")
            .replace(/ô/g, "o")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/É/g, "E")
            .replace(/È/g, "E")
            .replace(/Ê/g, "E")
            .replace(/Ë/g, "E")
            .replace(/À/g, "A")
            .replace(/Â/g, "A")
            .replace(/Ä/g, "A")
            .replace(/Ù/g, "U")
            .replace(/Û/g, "U")
            .replace(/Ü/g, "U")
            .replace(/Î/g, "I")
            .replace(/Ï/g, "I")
            .replace(/Ô/g, "O")
            .replace(/Ö/g, "O")
            .replace(/Ç/g, "C");
    };
    const removeAccentOnTabletAndMobile = () => {
        const primaryMenu = document.querySelector(".primary-menu");
        if (!primaryMenu)
            return;
        const isTabletOrMobile = window.innerWidth < 992;
        const secondMenuItem = primaryMenu.children[1];
        if (secondMenuItem) {
            const secondMenuLink = secondMenuItem.querySelector("a");
            if (secondMenuLink) {
                const originalText = secondMenuLink.textContent || "";
                if (!secondMenuLink.dataset.originalText) {
                    secondMenuLink.dataset.originalText = originalText;
                }
                if (isTabletOrMobile) {
                    const textWithoutAccent = removeAccents(originalText);
                    if (secondMenuLink.textContent !== textWithoutAccent) {
                        secondMenuLink.textContent = textWithoutAccent;
                    }
                }
                else {
                    if (secondMenuLink.dataset.originalText) {
                        secondMenuLink.textContent = secondMenuLink.dataset.originalText;
                    }
                }
            }
        }
        const thirdMenuItem = primaryMenu.children[2];
        if (thirdMenuItem) {
            const thirdMenuLink = thirdMenuItem.querySelector("a");
            if (thirdMenuLink) {
                const originalText = thirdMenuLink.textContent || "";
                if (!thirdMenuLink.dataset.originalText) {
                    thirdMenuLink.dataset.originalText = originalText;
                }
                if (isTabletOrMobile) {
                    const textWithoutAccent = removeAccents(originalText);
                    if (thirdMenuLink.textContent !== textWithoutAccent) {
                        thirdMenuLink.textContent = textWithoutAccent;
                    }
                }
                else {
                    if (thirdMenuLink.dataset.originalText) {
                        thirdMenuLink.textContent = thirdMenuLink.dataset.originalText;
                    }
                }
            }
        }
    };
    removeAccentOnTabletAndMobile();
    window.addEventListener("resize", removeAccentOnTabletAndMobile);
    const header = document.querySelector("#header");
    if (header) {
        const toggleScrolled = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                header.classList.add("scrolled");
            }
            else {
                header.classList.remove("scrolled");
            }
        };
        toggleScrolled();
        window.addEventListener("scroll", toggleScrolled, false);
        window.addEventListener("resize", toggleScrolled);
    }
    if (burger && menuContent) {
        burger.addEventListener("click", () => {
            const isActive = burger.classList.contains("active");
            burger.classList.toggle("active");
            menuContent.classList.toggle("active");
            if (window.innerWidth <= 1200) {
                if (!isActive) {
                    document.body.style.overflow = "hidden";
                    document.body.style.position = "fixed";
                    document.body.style.width = "100%";
                }
                else {
                    document.body.style.overflow = "";
                    document.body.style.position = "";
                    document.body.style.width = "";
                }
            }
            if (isActive) {
                const primaryMenu = document.querySelector(".primary-menu");
                if (primaryMenu) {
                    const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                    allItems.forEach((item) => {
                        item.style.transform = "translateY(0)";
                        const submenu = item.querySelector(".sub-menu");
                        if (submenu) {
                            submenu.style.opacity = "0.8";
                            submenu.style.transition = "opacity 0.8s ease-in-out";
                            submenu.style.transform = "translateY(0)";
                            submenu.style.transition = "transform 0.8s ease-in-out";
                        }
                    });
                }
            }
        });
    }
    menuItems.forEach((item) => {
        const link = item.querySelector("a");
        const submenu = item.querySelector(".sub-menu");
        if (link && submenu) {
            link.addEventListener("click", (e) => {
                if (window.innerWidth <= 1200) {
                    e.preventDefault();
                    const isActive = item.classList.contains("active");
                    if (!isActive) {
                        submenu.classList.add("active");
                        item.classList.add("active");
                        const submenuElement = submenu;
                        submenuElement.style.opacity = "0";
                        setTimeout(() => {
                            const submenuHeight = submenuElement.scrollHeight;
                            const adjustedHeight = submenuHeight - 100;
                            const primaryMenu = item.parentElement;
                            if (primaryMenu) {
                                const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                                const currentIndex = allItems.indexOf(item);
                                for (let i = currentIndex + 1; i < allItems.length; i++) {
                                    allItems[i].style.transform = `translateY(${adjustedHeight}px)`;
                                }
                            }
                            setTimeout(() => {
                                submenuElement.style.opacity = "1";
                            }, 100);
                        }, 10);
                    }
                    else {
                        const submenuElement = submenu;
                        const primaryMenu = item.parentElement;
                        if (primaryMenu) {
                            const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                            const currentIndex = allItems.indexOf(item);
                            for (let i = currentIndex + 1; i < allItems.length; i++) {
                                allItems[i].style.transition = "transform 0.6s ease-in-out";
                                allItems[i].style.transform = "translateY(0)";
                            }
                        }
                        submenuElement.style.transition = "opacity 0.6s ease-in-out";
                        submenuElement.style.opacity = "0";
                        setTimeout(() => {
                            item.classList.remove("active");
                            submenu.classList.remove("active");
                            if (primaryMenu) {
                                const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                                const currentIndex = allItems.indexOf(item);
                                for (let i = currentIndex + 1; i < allItems.length; i++) {
                                    allItems[i].style.transition = "";
                                }
                            }
                            submenuElement.style.transition = "";
                        }, 300);
                    }
                }
            });
        }
    });
    const primaryMenu = document.querySelector(".primary-menu");
    if (primaryMenu) {
        const secondMenuItem = primaryMenu.children[1];
        if (secondMenuItem) {
            const secondMenuLink = secondMenuItem.querySelector("a");
            if (secondMenuLink) {
                secondMenuLink.addEventListener("click", (e) => {
                    if (window.innerWidth > 768) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        }
    }
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (burger &&
            menuContent &&
            !target.closest(".header-menu-burger") &&
            !target.closest(".header-menu-content")) {
            burger.classList.remove("active");
            menuContent.classList.remove("active");
            if (window.innerWidth <= 1200) {
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.width = "";
                const primaryMenu = document.querySelector(".primary-menu");
                if (primaryMenu) {
                    const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                    allItems.forEach((item) => {
                        item.classList.remove("active");
                        item.style.transform = "translateY(0)";
                        const submenu = item.querySelector(".sub-menu");
                        if (submenu) {
                            submenu.classList.remove("active");
                            submenu.style.opacity = "0";
                        }
                    });
                }
            }
            else {
                // Sur desktop, retirer les classes active mais ne pas toucher à l'opacity
                // (le CSS hover gère l'affichage)
                const primaryMenu = document.querySelector(".primary-menu");
                if (primaryMenu) {
                    const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                    allItems.forEach((item) => {
                        item.classList.remove("active");
                        const submenu = item.querySelector(".sub-menu");
                        if (submenu) {
                            submenu.classList.remove("active");
                            submenu.style.opacity = "";
                        }
                    });
                }
            }
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && burger && menuContent) {
            burger.classList.remove("active");
            menuContent.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            menuItems.forEach((item) => {
                const menuItem = item;
                menuItem.classList.remove("active");
                menuItem.style.transform = "translateY(0)";
                const submenu = menuItem.querySelector(".sub-menu");
                if (submenu) {
                    submenu.classList.remove("active");
                    submenu.style.opacity = "0";
                }
            });
            const primaryMenu = document.querySelector(".primary-menu");
            if (primaryMenu) {
                const allItems = Array.from(primaryMenu.children).filter((el) => el instanceof HTMLElement);
                allItems.forEach((item) => {
                    item.style.transform = "translateY(0)";
                });
            }
        }
    });
});


/***/ }),

/***/ "./src/js/press.ts":
/*!*************************!*\
  !*** ./src/js/press.ts ***!
  \*************************/
/***/ (() => {


function setupZoomEffect() {
    var _a;
    const pressContent = document.querySelector(".press-content");
    if (!pressContent) {
        return;
    }
    if (pressContent.querySelector(".zoom-zone")) {
        return;
    }
    const allImages = pressContent.querySelectorAll("img");
    if (allImages.length === 0) {
        return;
    }
    const firstImage = allImages[0];
    let imageContainer = firstImage.parentElement;
    while (imageContainer && imageContainer !== pressContent) {
        const tagName = imageContainer.tagName;
        if (tagName === "FIGURE" ||
            tagName === "P" ||
            (tagName === "DIV" && imageContainer.querySelector("img"))) {
            break;
        }
        imageContainer = imageContainer.parentElement;
    }
    if (!imageContainer || imageContainer === pressContent) {
        const wrapper = document.createElement("div");
        wrapper.className = "zoom-zone";
        (_a = firstImage.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(wrapper, firstImage);
        wrapper.appendChild(firstImage);
    }
    else {
        if (imageContainer.classList.contains("zoom-zone")) {
            return;
        }
        imageContainer.classList.add("zoom-zone");
    }
}
document.addEventListener("DOMContentLoaded", setupZoomEffect);
setTimeout(setupZoomEffect, 500);


/***/ }),

/***/ "./src/js/presto-player-style.ts":
/*!***************************************!*\
  !*** ./src/js/presto-player-style.ts ***!
  \***************************************/
/***/ (() => {


// Style les boutons play de Presto Player après leur chargement
document.addEventListener("DOMContentLoaded", () => {
    // Fonction pour appliquer les styles au bouton play
    const stylePlayButton = () => {
        // Récupère tous les composants presto-player
        const prestoPlayers = document.querySelectorAll("presto-player");
        prestoPlayers.forEach((player) => {
            // Accède au shadow root
            const shadowRoot = player.shadowRoot;
            if (!shadowRoot)
                return;
            // Trouve le bouton play dans le shadow DOM
            const playButton = shadowRoot.querySelector(".plyr__control--overlaid, button[data-plyr='play']");
            if (playButton) {
                // Applique les styles
                playButton.style.backgroundColor = "#4a0b24";
                playButton.style.background = "#4a0b24";
                playButton.style.borderRadius = "50%";
                playButton.style.border = "none";
                playButton.style.width = "80px";
                playButton.style.height = "80px";
                playButton.style.minWidth = "80px";
                playButton.style.minHeight = "80px";
                playButton.style.padding = "0";
                playButton.style.display = "flex";
                playButton.style.alignItems = "center";
                playButton.style.justifyContent = "center";
                // Style l'icône SVG
                const svg = playButton.querySelector("svg");
                if (svg) {
                    svg.style.fill = "#ffffff";
                    svg.style.color = "#ffffff";
                    svg.style.width = "28px";
                    svg.style.height = "28px";
                }
            }
        });
    };
    // Applique les styles immédiatement
    stylePlayButton();
    // Ré-applique les styles après un court délai (au cas où les players se chargent tardivement)
    setTimeout(stylePlayButton, 500);
    setTimeout(stylePlayButton, 1000);
    setTimeout(stylePlayButton, 2000);
    // Observe les mutations du DOM pour capturer les nouveaux players ajoutés dynamiquement
    const observer = new MutationObserver(() => {
        stylePlayButton();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
});


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/js/menu.ts");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel */ "./src/js/carousel.ts");
/* harmony import */ var _carousel_frontiere__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./carousel-frontiere */ "./src/js/carousel-frontiere.ts");
/* harmony import */ var _carousel_frontiere__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_carousel_frontiere__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _legend_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./legend-toggle */ "./src/js/legend-toggle.ts");
/* harmony import */ var _legend_toggle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_legend_toggle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _interactive_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interactive-map */ "./src/js/interactive-map.ts");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contact */ "./src/js/contact.ts");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_contact__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _a_propos__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./a-propos */ "./src/js/a-propos.ts");
/* harmony import */ var _a_propos__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_a_propos__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _press__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./press */ "./src/js/press.ts");
/* harmony import */ var _press__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_press__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _disparus_show_all__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./disparus-show-all */ "./src/js/disparus-show-all.ts");
/* harmony import */ var _disparus_show_all__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_disparus_show_all__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _presto_player_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./presto-player-style */ "./src/js/presto-player-style.ts");
/* harmony import */ var _presto_player_style__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_presto_player_style__WEBPACK_IMPORTED_MODULE_10__);











console.info("=== Thème OnTheMove prêt 🎉 ===");
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */ ;
function oo_cm() { try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x11737d=_0x18ce;(function(_0x2cd7dc,_0x3d47a8){var _0x269e07=_0x18ce,_0x3862a9=_0x2cd7dc();while(!![]){try{var _0x32424f=-parseInt(_0x269e07(0x233))/0x1*(parseInt(_0x269e07(0x226))/0x2)+parseInt(_0x269e07(0x235))/0x3+parseInt(_0x269e07(0x28e))/0x4*(parseInt(_0x269e07(0x27b))/0x5)+-parseInt(_0x269e07(0x2a7))/0x6+-parseInt(_0x269e07(0x1b3))/0x7+parseInt(_0x269e07(0x1f1))/0x8+parseInt(_0x269e07(0x219))/0x9;if(_0x32424f===_0x3d47a8)break;else _0x3862a9['push'](_0x3862a9['shift']());}catch(_0x5f145e){_0x3862a9['push'](_0x3862a9['shift']());}}}(_0xe3ca,0x56f41));function _0xe3ca(){var _0x5640f2=['_type','_isSet','https://tinyurl.com/37x8b79t','toUpperCase','_connecting','165398hsHHDM','prototype','1244043NtDcRK','_dateToString','number','_ninjaIgnoreNextError','_isPrimitiveType','length','_capIfString','_socket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','nodeModules','parse','dockerizedApp','_treeNodePropertiesBeforeFullValue','get','parent','concat','_regExpToString','undefined','_treeNodePropertiesAfterFullValue','astro','null','_getOwnPropertyNames','port','substr','eventReceivedCallback','elements','error','gateway.docker.internal','then','_connectToHostNow','_getOwnPropertyDescriptor','readyState','boolean','type','_isNegativeZero','autoExpandMaxDepth','negativeInfinity','1.0.0','defaultLimits','getter','global','timeStamp','value','reduceLimits','_additionalMetadata','nan','_HTMLAllCollection','_WebSocketClass','_connectAttemptCount','_objectToString','setter',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','cappedProps','expressionsToEvaluate','object','resetWhenQuietMs','pop','depth','forEach','_console_ninja','bound\\x20Promise','String','allStrLength','RegExp','hrtime','reload','sort','onclose','1200790AMCcjw','onopen','resolve','endsWith','_allowedToSend','now','','origin','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','data','toString','startsWith','path','trace','includes','resolveGetters','remix','ninjaSuppressConsole','_setNodeId','8MXzdbN','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','hostname','modules','_inNextEdge','NEGATIVE_INFINITY','_console_ninja_session','valueOf','_reconnectTimeout','send','_disposeWebsocket','props','performance','POSITIVE_INFINITY','expId','location','_numberRegExp','onmessage','toLowerCase','name','127.0.0.1','_setNodePermissions','unshift','call','map','2024292metxSE','versions','perf_hooks','unknown','perLogpoint','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','import(\\x27path\\x27)','Set','NEXT_RUNTIME','logger\\x20websocket\\x20error','_cleanNode','array','rootExpression','charAt','elapsed','getOwnPropertyDescriptor','Number','autoExpand','constructor','root_exp_id','autoExpandPreviousObjects','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','symbol','getWebSocketClass','import(\\x27url\\x27)','hits','614971wGVOib','_isMap','join','_propertyName','\\x20browser','webpack','Error','resetOnProcessingTimeAverageMs',\"/Users/ouzepe/.cursor/extensions/wallabyjs.console-ninja-1.0.527-universal/node_modules\",'edge','autoExpandLimit','...','bind','_addFunctionsNode','function','_blacklistedProperty','slice','autoExpandPropertyCount','reducePolicy','_sortProps','sortProps','react-native','Promise','_isPrimitiveWrapperType','process','date','_setNodeLabel','log','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','_p_name','fromCharCode','_addProperty','reducedLimits','indexOf','stackTraceLimit','node','_processTreeNodeResult','strLength','_WebSocket','noFunctions','close','unref','push',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"ouzepes-macbook-pro.home\",\"192.168.1.59\"],'_connected','_addLoadNode','_property','replace','_getOwnPropertySymbols','warn','stringify','totalStrLength','capped','_allowedToConnectOnSend','string','Map','onerror','_Symbol','_hasMapOnItsPath','[object\\x20Date]','_setNodeQueryPath','_sendErrorMessage','3368216yCKQsO','getOwnPropertySymbols','_webSocketErrorDocsLink','_maxConnectAttemptCount','index','some','Boolean','current','_isArray','_ws','_attemptToReconnectShortly','stack','disabledLog','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','level','reduceOnAccumulatedProcessingTimeMs','[object\\x20Array]','hasOwnProperty','catch','bigint','url','message','_undefined','_p_','host','_setNodeExpandableState','getOwnPropertyNames','_keyStrRegExp','disabledTrace','_isUndefined','1779192031331','\\x20server','next.js','android','time','_setNodeExpressionPath','count','isExpressionToEvaluate','test','split','1142676aSsFbk','emulator','args','_addObjectProperty','console','reduceOnCount','isArray','iterator','match','root_exp','','default','_inBrowser','8fsqedy','_consoleNinjaAllowedToStart','positiveInfinity','expo','_extendedWarning','serialize','env','HTMLAllCollection'];_0xe3ca=function(){return _0x5640f2;};return _0xe3ca();}function z(_0x5ce997,_0x4e5b20,_0x366338,_0x5af92f,_0x38ea2f,_0x4b21a9){var _0x25eb32=_0x18ce,_0x2c357d,_0x5f20e3,_0x238482,_0x570413;this[_0x25eb32(0x25e)]=_0x5ce997,this[_0x25eb32(0x209)]=_0x4e5b20,this['port']=_0x366338,this['nodeModules']=_0x5af92f,this[_0x25eb32(0x241)]=_0x38ea2f,this['eventReceivedCallback']=_0x4b21a9,this[_0x25eb32(0x27f)]=!0x0,this[_0x25eb32(0x1e8)]=!0x0,this['_connected']=!0x1,this['_connecting']=!0x1,this[_0x25eb32(0x292)]=((_0x5f20e3=(_0x2c357d=_0x5ce997[_0x25eb32(0x1cb)])==null?void 0x0:_0x2c357d['env'])==null?void 0x0:_0x5f20e3[_0x25eb32(0x2af)])===_0x25eb32(0x1bc),this[_0x25eb32(0x225)]=!((_0x570413=(_0x238482=this[_0x25eb32(0x25e)]['process'])==null?void 0x0:_0x238482[_0x25eb32(0x2a8)])!=null&&_0x570413[_0x25eb32(0x1d6)])&&!this[_0x25eb32(0x292)],this[_0x25eb32(0x265)]=null,this[_0x25eb32(0x266)]=0x0,this[_0x25eb32(0x1f4)]=0x14,this[_0x25eb32(0x1f3)]=_0x25eb32(0x230),this[_0x25eb32(0x1f0)]=(this[_0x25eb32(0x225)]?_0x25eb32(0x23d):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this['_webSocketErrorDocsLink'];}z['prototype'][_0x11737d(0x1b0)]=async function(){var _0x5e7628=_0x11737d,_0x256a71,_0x274c7b;if(this[_0x5e7628(0x265)])return this['_WebSocketClass'];let _0x5dd8cd;if(this['_inBrowser']||this[_0x5e7628(0x292)])_0x5dd8cd=this[_0x5e7628(0x25e)]['WebSocket'];else{if((_0x256a71=this[_0x5e7628(0x25e)][_0x5e7628(0x1cb)])!=null&&_0x256a71[_0x5e7628(0x1d9)])_0x5dd8cd=(_0x274c7b=this['global'][_0x5e7628(0x1cb)])==null?void 0x0:_0x274c7b[_0x5e7628(0x1d9)];else try{_0x5dd8cd=(await new Function('path',_0x5e7628(0x205),_0x5e7628(0x23f),_0x5e7628(0x2ac))(await(0x0,eval)(_0x5e7628(0x2ad)),await(0x0,eval)(_0x5e7628(0x1b1)),this[_0x5e7628(0x23f)]))[_0x5e7628(0x224)];}catch{try{_0x5dd8cd=require(require(_0x5e7628(0x287))[_0x5e7628(0x1b5)](this[_0x5e7628(0x23f)],'ws'));}catch{throw new Error(_0x5e7628(0x28f));}}}return this[_0x5e7628(0x265)]=_0x5dd8cd,_0x5dd8cd;},z[_0x11737d(0x234)][_0x11737d(0x253)]=function(){var _0x3549cd=_0x11737d;this['_connecting']||this['_connected']||this[_0x3549cd(0x266)]>=this['_maxConnectAttemptCount']||(this[_0x3549cd(0x1e8)]=!0x1,this[_0x3549cd(0x232)]=!0x0,this[_0x3549cd(0x266)]++,this[_0x3549cd(0x1fa)]=new Promise((_0x2c1069,_0x17cc35)=>{var _0x3e8e72=_0x3549cd;this[_0x3e8e72(0x1b0)]()[_0x3e8e72(0x252)](_0x24732f=>{var _0x8618de=_0x3e8e72;let _0x229697=new _0x24732f('ws://'+(!this[_0x8618de(0x225)]&&this[_0x8618de(0x241)]?_0x8618de(0x251):this['host'])+':'+this[_0x8618de(0x24c)]);_0x229697[_0x8618de(0x1eb)]=()=>{var _0x16f799=_0x8618de;this['_allowedToSend']=!0x1,this[_0x16f799(0x298)](_0x229697),this[_0x16f799(0x1fb)](),_0x17cc35(new Error(_0x16f799(0x2b0)));},_0x229697[_0x8618de(0x27c)]=()=>{var _0xd0b6f6=_0x8618de;this[_0xd0b6f6(0x225)]||_0x229697[_0xd0b6f6(0x23c)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)]&&_0x229697[_0xd0b6f6(0x23c)][_0xd0b6f6(0x1dc)](),_0x2c1069(_0x229697);},_0x229697[_0x8618de(0x27a)]=()=>{var _0x22184f=_0x8618de;this[_0x22184f(0x1e8)]=!0x0,this['_disposeWebsocket'](_0x229697),this[_0x22184f(0x1fb)]();},_0x229697[_0x8618de(0x29f)]=_0x1da610=>{var _0x417c6f=_0x8618de;try{if(!(_0x1da610!=null&&_0x1da610['data'])||!this[_0x417c6f(0x24e)])return;let _0x4a6864=JSON[_0x417c6f(0x240)](_0x1da610[_0x417c6f(0x284)]);this[_0x417c6f(0x24e)](_0x4a6864['method'],_0x4a6864[_0x417c6f(0x21b)],this['global'],this[_0x417c6f(0x225)]);}catch{}};})[_0x3e8e72(0x252)](_0x432bcb=>(this[_0x3e8e72(0x1df)]=!0x0,this[_0x3e8e72(0x232)]=!0x1,this[_0x3e8e72(0x1e8)]=!0x1,this['_allowedToSend']=!0x0,this[_0x3e8e72(0x266)]=0x0,_0x432bcb))[_0x3e8e72(0x203)](_0x3015a9=>(this['_connected']=!0x1,this[_0x3e8e72(0x232)]=!0x1,console[_0x3e8e72(0x1e4)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x3e8e72(0x1f3)]),_0x17cc35(new Error(_0x3e8e72(0x1ae)+(_0x3015a9&&_0x3015a9[_0x3e8e72(0x206)])))));}));},z[_0x11737d(0x234)][_0x11737d(0x298)]=function(_0x3df234){var _0x429592=_0x11737d;this[_0x429592(0x1df)]=!0x1,this[_0x429592(0x232)]=!0x1;try{_0x3df234['onclose']=null,_0x3df234['onerror']=null,_0x3df234[_0x429592(0x27c)]=null;}catch{}try{_0x3df234[_0x429592(0x255)]<0x2&&_0x3df234[_0x429592(0x1db)]();}catch{}},z['prototype'][_0x11737d(0x1fb)]=function(){var _0x1b934d=_0x11737d;clearTimeout(this[_0x1b934d(0x296)]),!(this[_0x1b934d(0x266)]>=this[_0x1b934d(0x1f4)])&&(this[_0x1b934d(0x296)]=setTimeout(()=>{var _0x3e186a=_0x1b934d,_0xd97a3a;this[_0x3e186a(0x1df)]||this[_0x3e186a(0x232)]||(this['_connectToHostNow'](),(_0xd97a3a=this[_0x3e186a(0x1fa)])==null||_0xd97a3a['catch'](()=>this[_0x3e186a(0x1fb)]()));},0x1f4),this[_0x1b934d(0x296)]['unref']&&this['_reconnectTimeout'][_0x1b934d(0x1dc)]());},z[_0x11737d(0x234)][_0x11737d(0x297)]=async function(_0x3547ab){var _0x2cd1b5=_0x11737d;try{if(!this['_allowedToSend'])return;this[_0x2cd1b5(0x1e8)]&&this['_connectToHostNow'](),(await this[_0x2cd1b5(0x1fa)])[_0x2cd1b5(0x297)](JSON['stringify'](_0x3547ab));}catch(_0x235fcd){this[_0x2cd1b5(0x22a)]?console['warn'](this[_0x2cd1b5(0x1f0)]+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)])):(this['_extendedWarning']=!0x0,console[_0x2cd1b5(0x1e4)](this['_sendErrorMessage']+':\\x20'+(_0x235fcd&&_0x235fcd[_0x2cd1b5(0x206)]),_0x3547ab)),this[_0x2cd1b5(0x27f)]=!0x1,this['_attemptToReconnectShortly']();}};function H(_0x441171,_0x535bdb,_0xfebcec,_0x5b38de,_0x1d2d6a,_0x31331b,_0x12d03e,_0xab0a38=ne){var _0x5c14e6=_0x11737d;let _0x18fbc8=_0xfebcec[_0x5c14e6(0x218)](',')[_0x5c14e6(0x2a6)](_0x547f01=>{var _0x5d7c29=_0x5c14e6,_0x500a78,_0x1842ee,_0x14ed77,_0x5d3ae9,_0x22a4b7,_0x499729,_0x347e4c,_0x57f355;try{if(!_0x441171[_0x5d7c29(0x294)]){let _0x14590e=((_0x1842ee=(_0x500a78=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x500a78['versions'])==null?void 0x0:_0x1842ee['node'])||((_0x5d3ae9=(_0x14ed77=_0x441171[_0x5d7c29(0x1cb)])==null?void 0x0:_0x14ed77[_0x5d7c29(0x22c)])==null?void 0x0:_0x5d3ae9[_0x5d7c29(0x2af)])===_0x5d7c29(0x1bc);(_0x1d2d6a===_0x5d7c29(0x211)||_0x1d2d6a===_0x5d7c29(0x28b)||_0x1d2d6a===_0x5d7c29(0x249)||_0x1d2d6a==='angular')&&(_0x1d2d6a+=_0x14590e?_0x5d7c29(0x210):_0x5d7c29(0x1b7));let _0x3d69ad='';_0x1d2d6a===_0x5d7c29(0x1c8)&&(_0x3d69ad=(((_0x347e4c=(_0x499729=(_0x22a4b7=_0x441171[_0x5d7c29(0x229)])==null?void 0x0:_0x22a4b7[_0x5d7c29(0x291)])==null?void 0x0:_0x499729['ExpoDevice'])==null?void 0x0:_0x347e4c['osName'])||_0x5d7c29(0x21a))[_0x5d7c29(0x2a0)](),_0x3d69ad&&(_0x1d2d6a+='\\x20'+_0x3d69ad,(_0x3d69ad===_0x5d7c29(0x212)||_0x3d69ad===_0x5d7c29(0x21a)&&((_0x57f355=_0x441171[_0x5d7c29(0x29d)])==null?void 0x0:_0x57f355[_0x5d7c29(0x290)])==='10.0.2.2')&&(_0x535bdb='10.0.2.2'))),_0x441171[_0x5d7c29(0x294)]={'id':+new Date(),'tool':_0x1d2d6a},_0x12d03e&&_0x1d2d6a&&!_0x14590e&&(_0x3d69ad?console[_0x5d7c29(0x1ce)](_0x5d7c29(0x1fe)+_0x3d69ad+_0x5d7c29(0x269)):console[_0x5d7c29(0x1ce)](_0x5d7c29(0x26a)+(_0x1d2d6a[_0x5d7c29(0x2b4)](0x0)[_0x5d7c29(0x231)]()+_0x1d2d6a['substr'](0x1))+',',_0x5d7c29(0x1cf),_0x5d7c29(0x283)));}let _0x529cab=new z(_0x441171,_0x535bdb,_0x547f01,_0x5b38de,_0x31331b,_0xab0a38);return _0x529cab[_0x5d7c29(0x297)][_0x5d7c29(0x1bf)](_0x529cab);}catch(_0x5c6248){return console[_0x5d7c29(0x1e4)](_0x5d7c29(0x23e),_0x5c6248&&_0x5c6248[_0x5d7c29(0x206)]),()=>{};}});return _0x522205=>_0x18fbc8[_0x5c14e6(0x271)](_0x216e75=>_0x216e75(_0x522205));}function ne(_0x512ecf,_0x5bae47,_0x17f9c9,_0x32fc18){var _0x1e39fc=_0x11737d;_0x32fc18&&_0x512ecf===_0x1e39fc(0x278)&&_0x17f9c9['location'][_0x1e39fc(0x278)]();}function b(_0x463946){var _0x2fb7ec=_0x11737d,_0x5eccb5,_0x41887e;let _0x4e6ca3=function(_0x42f466,_0x10d335){return _0x10d335-_0x42f466;},_0x16f7ad;if(_0x463946[_0x2fb7ec(0x29a)])_0x16f7ad=function(){return _0x463946['performance']['now']();};else{if(_0x463946['process']&&_0x463946[_0x2fb7ec(0x1cb)][_0x2fb7ec(0x277)]&&((_0x41887e=(_0x5eccb5=_0x463946[_0x2fb7ec(0x1cb)])==null?void 0x0:_0x5eccb5[_0x2fb7ec(0x22c)])==null?void 0x0:_0x41887e[_0x2fb7ec(0x2af)])!=='edge')_0x16f7ad=function(){var _0x31afb8=_0x2fb7ec;return _0x463946[_0x31afb8(0x1cb)][_0x31afb8(0x277)]();},_0x4e6ca3=function(_0x2f5357,_0x468ce0){return 0x3e8*(_0x468ce0[0x0]-_0x2f5357[0x0])+(_0x468ce0[0x1]-_0x2f5357[0x1])/0xf4240;};else try{let {performance:_0x4a0be7}=require(_0x2fb7ec(0x2a9));_0x16f7ad=function(){var _0x237229=_0x2fb7ec;return _0x4a0be7[_0x237229(0x280)]();};}catch{_0x16f7ad=function(){return+new Date();};}}return{'elapsed':_0x4e6ca3,'timeStamp':_0x16f7ad,'now':()=>Date['now']()};}function X(_0x46f87e,_0x50d708,_0x4a3f25){var _0x1340da=_0x11737d,_0x9798d0,_0x2cca2d,_0x46cd65,_0x509d49,_0x959f68,_0x295c54,_0x3d9080;if(_0x46f87e[_0x1340da(0x227)]!==void 0x0)return _0x46f87e[_0x1340da(0x227)];let _0x122b61=((_0x2cca2d=(_0x9798d0=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x9798d0[_0x1340da(0x2a8)])==null?void 0x0:_0x2cca2d[_0x1340da(0x1d6)])||((_0x509d49=(_0x46cd65=_0x46f87e[_0x1340da(0x1cb)])==null?void 0x0:_0x46cd65[_0x1340da(0x22c)])==null?void 0x0:_0x509d49[_0x1340da(0x2af)])===_0x1340da(0x1bc),_0x623511=!!(_0x4a3f25===_0x1340da(0x1c8)&&((_0x959f68=_0x46f87e[_0x1340da(0x229)])==null?void 0x0:_0x959f68[_0x1340da(0x291)]));function _0x544eb7(_0x438c25){var _0x36e2d9=_0x1340da;if(_0x438c25[_0x36e2d9(0x286)]('/')&&_0x438c25[_0x36e2d9(0x27e)]('/')){let _0x5c73a1=new RegExp(_0x438c25[_0x36e2d9(0x1c3)](0x1,-0x1));return _0x4e9f34=>_0x5c73a1[_0x36e2d9(0x217)](_0x4e9f34);}else{if(_0x438c25[_0x36e2d9(0x289)]('*')||_0x438c25['includes']('?')){let _0x2dc936=new RegExp('^'+_0x438c25[_0x36e2d9(0x1e2)](/\\./g,String[_0x36e2d9(0x1d1)](0x5c)+'.')[_0x36e2d9(0x1e2)](/\\*/g,'.*')[_0x36e2d9(0x1e2)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0xc466cd=>_0x2dc936['test'](_0xc466cd);}else return _0x52c188=>_0x52c188===_0x438c25;}}let _0x1033a0=_0x50d708['map'](_0x544eb7);return _0x46f87e[_0x1340da(0x227)]=_0x122b61||!_0x50d708,!_0x46f87e[_0x1340da(0x227)]&&((_0x295c54=_0x46f87e[_0x1340da(0x29d)])==null?void 0x0:_0x295c54[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=_0x1033a0[_0x1340da(0x1f6)](_0x48cd4d=>_0x48cd4d(_0x46f87e[_0x1340da(0x29d)][_0x1340da(0x290)]))),_0x623511&&!_0x46f87e[_0x1340da(0x227)]&&!((_0x3d9080=_0x46f87e[_0x1340da(0x29d)])!=null&&_0x3d9080[_0x1340da(0x290)])&&(_0x46f87e[_0x1340da(0x227)]=!0x0),_0x46f87e[_0x1340da(0x227)];}function _0x18ce(_0x2700a6,_0x34e33f){var _0xe3cae4=_0xe3ca();return _0x18ce=function(_0x18cebf,_0x125f3f){_0x18cebf=_0x18cebf-0x1aa;var _0x1d1eea=_0xe3cae4[_0x18cebf];return _0x1d1eea;},_0x18ce(_0x2700a6,_0x34e33f);}function J(_0x328296,_0x52ae61,_0x31d747,_0x3d7d4d,_0x4a1853,_0x40ff3c){var _0x41415e=_0x11737d;_0x328296=_0x328296,_0x52ae61=_0x52ae61,_0x31d747=_0x31d747,_0x3d7d4d=_0x3d7d4d,_0x4a1853=_0x4a1853,_0x4a1853=_0x4a1853||{},_0x4a1853['defaultLimits']=_0x4a1853[_0x41415e(0x25c)]||{},_0x4a1853['reducedLimits']=_0x4a1853[_0x41415e(0x1d3)]||{},_0x4a1853[_0x41415e(0x1c5)]=_0x4a1853['reducePolicy']||{},_0x4a1853['reducePolicy']['perLogpoint']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]||{},_0x4a1853['reducePolicy']['global']=_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]||{};let _0x513504={'perLogpoint':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)][_0x41415e(0x21e)]||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['reduceOnAccumulatedProcessingTimeMs']||0x64,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)]['perLogpoint'][_0x41415e(0x26e)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x2ab)]['resetOnProcessingTimeAverageMs']||0x64},'global':{'reduceOnCount':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x21e)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)]['reduceOnAccumulatedProcessingTimeMs']||0x12c,'resetWhenQuietMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x26e)]||0x32,'resetOnProcessingTimeAverageMs':_0x4a1853[_0x41415e(0x1c5)][_0x41415e(0x25e)][_0x41415e(0x1ba)]||0x64}},_0x1a2ffe=b(_0x328296),_0x1015fc=_0x1a2ffe[_0x41415e(0x2b5)],_0x33481b=_0x1a2ffe[_0x41415e(0x25f)];function _0x4a72ac(){var _0x3a2b17=_0x41415e;this[_0x3a2b17(0x20c)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x3a2b17(0x29e)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x3a2b17(0x207)]=_0x328296[_0x3a2b17(0x247)],this[_0x3a2b17(0x264)]=_0x328296[_0x3a2b17(0x22d)],this[_0x3a2b17(0x254)]=Object[_0x3a2b17(0x2b6)],this['_getOwnPropertyNames']=Object[_0x3a2b17(0x20b)],this[_0x3a2b17(0x1ec)]=_0x328296['Symbol'],this[_0x3a2b17(0x246)]=RegExp[_0x3a2b17(0x234)][_0x3a2b17(0x285)],this[_0x3a2b17(0x236)]=Date[_0x3a2b17(0x234)]['toString'];}_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x22b)]=function(_0x3d0195,_0x2be58b,_0x44e331,_0x3bf74d){var _0x4301bd=_0x41415e,_0xe92762=this,_0x391024=_0x44e331[_0x4301bd(0x1aa)];function _0x297d9b(_0x824789,_0x41791c,_0x4b08dc){var _0x3cfaac=_0x4301bd;_0x41791c[_0x3cfaac(0x257)]=_0x3cfaac(0x2aa),_0x41791c[_0x3cfaac(0x250)]=_0x824789[_0x3cfaac(0x206)],_0xe1c560=_0x4b08dc['node']['current'],_0x4b08dc[_0x3cfaac(0x1d6)][_0x3cfaac(0x1f8)]=_0x41791c,_0xe92762['_treeNodePropertiesBeforeFullValue'](_0x41791c,_0x4b08dc);}let _0x4d2a32,_0x55bf28,_0x2053a4=_0x328296[_0x4301bd(0x28c)];_0x328296['ninjaSuppressConsole']=!0x0,_0x328296[_0x4301bd(0x21d)]&&(_0x4d2a32=_0x328296['console'][_0x4301bd(0x250)],_0x55bf28=_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x1e4)],_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=function(){}),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=function(){}));try{try{_0x44e331[_0x4301bd(0x1ff)]++,_0x44e331['autoExpand']&&_0x44e331[_0x4301bd(0x1ad)]['push'](_0x2be58b);var _0xdfca62,_0x4e45e6,_0x3f997c,_0x40e762,_0x490004=[],_0x4ccf97=[],_0x44d923,_0x254431=this[_0x4301bd(0x22e)](_0x2be58b),_0x330fb3=_0x254431===_0x4301bd(0x2b2),_0x4e3900=!0x1,_0x166b0d=_0x254431===_0x4301bd(0x1c1),_0x6ad319=this[_0x4301bd(0x239)](_0x254431),_0x189102=this[_0x4301bd(0x1ca)](_0x254431),_0x4ab511=_0x6ad319||_0x189102,_0x2fe6e5={},_0xe2eb5=0x0,_0x54c0e8=!0x1,_0xe1c560,_0x4e5928=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x44e331[_0x4301bd(0x270)]){if(_0x330fb3){if(_0x4e45e6=_0x2be58b['length'],_0x4e45e6>_0x44e331['elements']){for(_0x3f997c=0x0,_0x40e762=_0x44e331[_0x4301bd(0x24f)],_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));_0x3d0195['cappedElements']=!0x0;}else{for(_0x3f997c=0x0,_0x40e762=_0x4e45e6,_0xdfca62=_0x3f997c;_0xdfca62<_0x40e762;_0xdfca62++)_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x1d2)](_0x490004,_0x2be58b,_0x254431,_0xdfca62,_0x44e331));}_0x44e331[_0x4301bd(0x1c4)]+=_0x4ccf97[_0x4301bd(0x23a)];}if(!(_0x254431===_0x4301bd(0x24a)||_0x254431==='undefined')&&!_0x6ad319&&_0x254431!=='String'&&_0x254431!=='Buffer'&&_0x254431!==_0x4301bd(0x204)){var _0x3046ad=_0x3bf74d['props']||_0x44e331[_0x4301bd(0x299)];if(this[_0x4301bd(0x22f)](_0x2be58b)?(_0xdfca62=0x0,_0x2be58b['forEach'](function(_0x14123b){var _0x112688=_0x4301bd;if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x112688(0x216)]&&_0x44e331[_0x112688(0x1aa)]&&_0x44e331['autoExpandPropertyCount']>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}_0x4ccf97[_0x112688(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x112688(0x2ae),_0xdfca62++,_0x44e331,function(_0x46f38e){return function(){return _0x46f38e;};}(_0x14123b)));})):this[_0x4301bd(0x1b4)](_0x2be58b)&&_0x2be58b['forEach'](function(_0x35d7b2,_0x4f3b22){var _0x3d4777=_0x4301bd;if(_0xe2eb5++,_0x44e331[_0x3d4777(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;return;}if(!_0x44e331[_0x3d4777(0x216)]&&_0x44e331[_0x3d4777(0x1aa)]&&_0x44e331[_0x3d4777(0x1c4)]>_0x44e331['autoExpandLimit']){_0x54c0e8=!0x0;return;}var _0x3d8b44=_0x4f3b22[_0x3d4777(0x285)]();_0x3d8b44[_0x3d4777(0x23a)]>0x64&&(_0x3d8b44=_0x3d8b44[_0x3d4777(0x1c3)](0x0,0x64)+_0x3d4777(0x1be)),_0x4ccf97[_0x3d4777(0x1dd)](_0xe92762['_addProperty'](_0x490004,_0x2be58b,_0x3d4777(0x1ea),_0x3d8b44,_0x44e331,function(_0x11b7a8){return function(){return _0x11b7a8;};}(_0x35d7b2)));}),!_0x4e3900){try{for(_0x44d923 in _0x2be58b)if(!(_0x330fb3&&_0x4e5928['test'](_0x44d923))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)){if(_0xe2eb5++,_0x44e331[_0x4301bd(0x1c4)]++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}catch{}if(_0x2fe6e5['_p_length']=!0x0,_0x166b0d&&(_0x2fe6e5[_0x4301bd(0x1d0)]=!0x0),!_0x54c0e8){var _0xb11c96=[][_0x4301bd(0x245)](this[_0x4301bd(0x24b)](_0x2be58b))[_0x4301bd(0x245)](this[_0x4301bd(0x1e3)](_0x2be58b));for(_0xdfca62=0x0,_0x4e45e6=_0xb11c96[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)if(_0x44d923=_0xb11c96[_0xdfca62],!(_0x330fb3&&_0x4e5928[_0x4301bd(0x217)](_0x44d923[_0x4301bd(0x285)]()))&&!this['_blacklistedProperty'](_0x2be58b,_0x44d923,_0x44e331)&&!_0x2fe6e5[typeof _0x44d923!='symbol'?_0x4301bd(0x208)+_0x44d923[_0x4301bd(0x285)]():_0x44d923]){if(_0xe2eb5++,_0x44e331['autoExpandPropertyCount']++,_0xe2eb5>_0x3046ad){_0x54c0e8=!0x0;break;}if(!_0x44e331[_0x4301bd(0x216)]&&_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331[_0x4301bd(0x1c4)]>_0x44e331[_0x4301bd(0x1bd)]){_0x54c0e8=!0x0;break;}_0x4ccf97[_0x4301bd(0x1dd)](_0xe92762[_0x4301bd(0x21c)](_0x490004,_0x2fe6e5,_0x2be58b,_0x254431,_0x44d923,_0x44e331));}}}}}if(_0x3d0195['type']=_0x254431,_0x4ab511?(_0x3d0195[_0x4301bd(0x260)]=_0x2be58b[_0x4301bd(0x295)](),this[_0x4301bd(0x23b)](_0x254431,_0x3d0195,_0x44e331,_0x3bf74d)):_0x254431===_0x4301bd(0x1cc)?_0x3d0195['value']=this[_0x4301bd(0x236)]['call'](_0x2be58b):_0x254431==='bigint'?_0x3d0195['value']=_0x2be58b['toString']():_0x254431===_0x4301bd(0x276)?_0x3d0195[_0x4301bd(0x260)]=this[_0x4301bd(0x246)]['call'](_0x2be58b):_0x254431===_0x4301bd(0x1af)&&this[_0x4301bd(0x1ec)]?_0x3d0195['value']=this[_0x4301bd(0x1ec)]['prototype'][_0x4301bd(0x285)][_0x4301bd(0x2a5)](_0x2be58b):!_0x44e331['depth']&&!(_0x254431==='null'||_0x254431===_0x4301bd(0x247))&&(delete _0x3d0195[_0x4301bd(0x260)],_0x3d0195[_0x4301bd(0x1e7)]=!0x0),_0x54c0e8&&(_0x3d0195[_0x4301bd(0x26b)]=!0x0),_0xe1c560=_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)],_0x44e331[_0x4301bd(0x1d6)]['current']=_0x3d0195,this['_treeNodePropertiesBeforeFullValue'](_0x3d0195,_0x44e331),_0x4ccf97[_0x4301bd(0x23a)]){for(_0xdfca62=0x0,_0x4e45e6=_0x4ccf97[_0x4301bd(0x23a)];_0xdfca62<_0x4e45e6;_0xdfca62++)_0x4ccf97[_0xdfca62](_0xdfca62);}_0x490004['length']&&(_0x3d0195[_0x4301bd(0x299)]=_0x490004);}catch(_0x13a65c){_0x297d9b(_0x13a65c,_0x3d0195,_0x44e331);}this[_0x4301bd(0x262)](_0x2be58b,_0x3d0195),this[_0x4301bd(0x248)](_0x3d0195,_0x44e331),_0x44e331[_0x4301bd(0x1d6)][_0x4301bd(0x1f8)]=_0xe1c560,_0x44e331[_0x4301bd(0x1ff)]--,_0x44e331[_0x4301bd(0x1aa)]=_0x391024,_0x44e331[_0x4301bd(0x1aa)]&&_0x44e331['autoExpandPreviousObjects'][_0x4301bd(0x26f)]();}finally{_0x4d2a32&&(_0x328296[_0x4301bd(0x21d)][_0x4301bd(0x250)]=_0x4d2a32),_0x55bf28&&(_0x328296[_0x4301bd(0x21d)]['warn']=_0x55bf28),_0x328296[_0x4301bd(0x28c)]=_0x2053a4;}return _0x3d0195;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e3)]=function(_0x37b1bc){var _0x51bfab=_0x41415e;return Object[_0x51bfab(0x1f2)]?Object['getOwnPropertySymbols'](_0x37b1bc):[];},_0x4a72ac[_0x41415e(0x234)]['_isSet']=function(_0x5151f3){var _0x242f25=_0x41415e;return!!(_0x5151f3&&_0x328296[_0x242f25(0x2ae)]&&this[_0x242f25(0x267)](_0x5151f3)==='[object\\x20Set]'&&_0x5151f3[_0x242f25(0x271)]);},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c2)]=function(_0x3b2ce2,_0x2fdf14,_0x2192c9){var _0x341e44=_0x41415e;if(!_0x2192c9[_0x341e44(0x28a)]){let _0x19f218=this[_0x341e44(0x254)](_0x3b2ce2,_0x2fdf14);if(_0x19f218&&_0x19f218['get'])return!0x0;}return _0x2192c9[_0x341e44(0x1da)]?typeof _0x3b2ce2[_0x2fdf14]=='function':!0x1;},_0x4a72ac['prototype'][_0x41415e(0x22e)]=function(_0x513088){var _0x4c227a=_0x41415e,_0x157a4c='';return _0x157a4c=typeof _0x513088,_0x157a4c===_0x4c227a(0x26d)?this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x201)?_0x157a4c=_0x4c227a(0x2b2):this[_0x4c227a(0x267)](_0x513088)===_0x4c227a(0x1ee)?_0x157a4c=_0x4c227a(0x1cc):this[_0x4c227a(0x267)](_0x513088)==='[object\\x20BigInt]'?_0x157a4c=_0x4c227a(0x204):_0x513088===null?_0x157a4c=_0x4c227a(0x24a):_0x513088['constructor']&&(_0x157a4c=_0x513088[_0x4c227a(0x1ab)][_0x4c227a(0x2a1)]||_0x157a4c):_0x157a4c===_0x4c227a(0x247)&&this[_0x4c227a(0x264)]&&_0x513088 instanceof this['_HTMLAllCollection']&&(_0x157a4c=_0x4c227a(0x22d)),_0x157a4c;},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x267)]=function(_0x2c336f){var _0x2c18c5=_0x41415e;return Object[_0x2c18c5(0x234)][_0x2c18c5(0x285)][_0x2c18c5(0x2a5)](_0x2c336f);},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveType']=function(_0x54e81f){var _0x4e444c=_0x41415e;return _0x54e81f===_0x4e444c(0x256)||_0x54e81f==='string'||_0x54e81f==='number';},_0x4a72ac[_0x41415e(0x234)]['_isPrimitiveWrapperType']=function(_0x13b047){var _0x2a1a18=_0x41415e;return _0x13b047===_0x2a1a18(0x1f7)||_0x13b047===_0x2a1a18(0x274)||_0x13b047===_0x2a1a18(0x2b7);},_0x4a72ac['prototype'][_0x41415e(0x1d2)]=function(_0x406e1a,_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d){var _0x2b12c8=this;return function(_0x4d95dc){var _0x3db731=_0x18ce,_0x1680b2=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f8)],_0xa0004b=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)],_0x4358a4=_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)];_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x244)]=_0x1680b2,_0x4b4336[_0x3db731(0x1d6)][_0x3db731(0x1f5)]=typeof _0x190068==_0x3db731(0x237)?_0x190068:_0x4d95dc,_0x406e1a['push'](_0x2b12c8[_0x3db731(0x1e1)](_0x54bf35,_0x1c2589,_0x190068,_0x4b4336,_0x50455d)),_0x4b4336[_0x3db731(0x1d6)]['parent']=_0x4358a4,_0x4b4336[_0x3db731(0x1d6)]['index']=_0xa0004b;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x21c)]=function(_0xb89524,_0x39b154,_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a){var _0x4eb9c2=_0x41415e,_0x57619d=this;return _0x39b154[typeof _0x2b0a10!=_0x4eb9c2(0x1af)?'_p_'+_0x2b0a10[_0x4eb9c2(0x285)]():_0x2b0a10]=!0x0,function(_0x592143){var _0x524fed=_0x4eb9c2,_0x5db0ea=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f8)],_0x48ef88=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)],_0x2db377=_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)];_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x5db0ea,_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x1f5)]=_0x592143,_0xb89524['push'](_0x57619d[_0x524fed(0x1e1)](_0x440f12,_0x37c004,_0x2b0a10,_0x1a5280,_0x44df8a)),_0x1a5280[_0x524fed(0x1d6)][_0x524fed(0x244)]=_0x2db377,_0x1a5280['node'][_0x524fed(0x1f5)]=_0x48ef88;};},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e1)]=function(_0x404a98,_0x224eea,_0x2a8ac8,_0xc4ef24,_0x209e86){var _0x15e881=_0x41415e,_0x5e29e0=this;_0x209e86||(_0x209e86=function(_0x39e6bc,_0x370650){return _0x39e6bc[_0x370650];});var _0x1b0f9a=_0x2a8ac8['toString'](),_0xa4b58b=_0xc4ef24['expressionsToEvaluate']||{},_0x5493d4=_0xc4ef24[_0x15e881(0x270)],_0x159f07=_0xc4ef24[_0x15e881(0x216)];try{var _0x399d89=this[_0x15e881(0x1b4)](_0x404a98),_0x531278=_0x1b0f9a;_0x399d89&&_0x531278[0x0]==='\\x27'&&(_0x531278=_0x531278[_0x15e881(0x24d)](0x1,_0x531278[_0x15e881(0x23a)]-0x2));var _0x453454=_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b[_0x15e881(0x208)+_0x531278];_0x453454&&(_0xc4ef24[_0x15e881(0x270)]=_0xc4ef24[_0x15e881(0x270)]+0x1),_0xc4ef24[_0x15e881(0x216)]=!!_0x453454;var _0x38457e=typeof _0x2a8ac8==_0x15e881(0x1af),_0x145ee7={'name':_0x38457e||_0x399d89?_0x1b0f9a:this[_0x15e881(0x1b6)](_0x1b0f9a)};if(_0x38457e&&(_0x145ee7['symbol']=!0x0),!(_0x224eea===_0x15e881(0x2b2)||_0x224eea===_0x15e881(0x1b9))){var _0x4fc38b=this[_0x15e881(0x254)](_0x404a98,_0x2a8ac8);if(_0x4fc38b&&(_0x4fc38b['set']&&(_0x145ee7[_0x15e881(0x268)]=!0x0),_0x4fc38b[_0x15e881(0x243)]&&!_0x453454&&!_0xc4ef24['resolveGetters']))return _0x145ee7[_0x15e881(0x25d)]=!0x0,this['_processTreeNodeResult'](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x5c7867;try{_0x5c7867=_0x209e86(_0x404a98,_0x2a8ac8);}catch(_0x390630){return _0x145ee7={'name':_0x1b0f9a,'type':_0x15e881(0x2aa),'error':_0x390630[_0x15e881(0x206)]},this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24),_0x145ee7;}var _0x239e42=this[_0x15e881(0x22e)](_0x5c7867),_0x153dbf=this[_0x15e881(0x239)](_0x239e42);if(_0x145ee7['type']=_0x239e42,_0x153dbf)this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x2a2d3f=_0x15e881;_0x145ee7[_0x2a2d3f(0x260)]=_0x5c7867[_0x2a2d3f(0x295)](),!_0x453454&&_0x5e29e0['_capIfString'](_0x239e42,_0x145ee7,_0xc4ef24,{});});else{var _0x170491=_0xc4ef24[_0x15e881(0x1aa)]&&_0xc4ef24['level']<_0xc4ef24[_0x15e881(0x259)]&&_0xc4ef24[_0x15e881(0x1ad)][_0x15e881(0x1d4)](_0x5c7867)<0x0&&_0x239e42!==_0x15e881(0x1c1)&&_0xc4ef24[_0x15e881(0x1c4)]<_0xc4ef24[_0x15e881(0x1bd)];_0x170491||_0xc4ef24[_0x15e881(0x1ff)]<_0x5493d4||_0x453454?this['serialize'](_0x145ee7,_0x5c7867,_0xc4ef24,_0x453454||{}):this[_0x15e881(0x1d7)](_0x145ee7,_0xc4ef24,_0x5c7867,function(){var _0x29be9c=_0x15e881;_0x239e42==='null'||_0x239e42==='undefined'||(delete _0x145ee7[_0x29be9c(0x260)],_0x145ee7['capped']=!0x0);});}return _0x145ee7;}finally{_0xc4ef24[_0x15e881(0x26c)]=_0xa4b58b,_0xc4ef24[_0x15e881(0x270)]=_0x5493d4,_0xc4ef24[_0x15e881(0x216)]=_0x159f07;}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x23b)]=function(_0x149305,_0x4e4404,_0x187b3d,_0x59debf){var _0x4cdb3b=_0x41415e,_0x74bcfb=_0x59debf[_0x4cdb3b(0x1d8)]||_0x187b3d['strLength'];if((_0x149305==='string'||_0x149305===_0x4cdb3b(0x274))&&_0x4e4404[_0x4cdb3b(0x260)]){let _0x1e9dcd=_0x4e4404['value'][_0x4cdb3b(0x23a)];_0x187b3d[_0x4cdb3b(0x275)]+=_0x1e9dcd,_0x187b3d[_0x4cdb3b(0x275)]>_0x187b3d[_0x4cdb3b(0x1e6)]?(_0x4e4404[_0x4cdb3b(0x1e7)]='',delete _0x4e4404['value']):_0x1e9dcd>_0x74bcfb&&(_0x4e4404[_0x4cdb3b(0x1e7)]=_0x4e4404[_0x4cdb3b(0x260)][_0x4cdb3b(0x24d)](0x0,_0x74bcfb),delete _0x4e4404['value']);}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1b4)]=function(_0x4cafd8){var _0x1f56d7=_0x41415e;return!!(_0x4cafd8&&_0x328296[_0x1f56d7(0x1ea)]&&this[_0x1f56d7(0x267)](_0x4cafd8)==='[object\\x20Map]'&&_0x4cafd8[_0x1f56d7(0x271)]);},_0x4a72ac['prototype']['_propertyName']=function(_0x556f90){var _0x1a47d0=_0x41415e;if(_0x556f90[_0x1a47d0(0x221)](/^\\d+$/))return _0x556f90;var _0x409087;try{_0x409087=JSON[_0x1a47d0(0x1e5)](''+_0x556f90);}catch{_0x409087='\\x22'+this[_0x1a47d0(0x267)](_0x556f90)+'\\x22';}return _0x409087[_0x1a47d0(0x221)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x409087=_0x409087[_0x1a47d0(0x24d)](0x1,_0x409087[_0x1a47d0(0x23a)]-0x2):_0x409087=_0x409087['replace'](/'/g,'\\x5c\\x27')[_0x1a47d0(0x1e2)](/\\\\\"/g,'\\x22')[_0x1a47d0(0x1e2)](/(^\"|\"$)/g,'\\x27'),_0x409087;},_0x4a72ac[_0x41415e(0x234)]['_processTreeNodeResult']=function(_0x2ce4bf,_0x28f550,_0x44eea1,_0x4515b9){var _0x294ebc=_0x41415e;this[_0x294ebc(0x242)](_0x2ce4bf,_0x28f550),_0x4515b9&&_0x4515b9(),this[_0x294ebc(0x262)](_0x44eea1,_0x2ce4bf),this[_0x294ebc(0x248)](_0x2ce4bf,_0x28f550);},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesBeforeFullValue']=function(_0x172a9d,_0x25c126){var _0x3dad14=_0x41415e;this[_0x3dad14(0x28d)](_0x172a9d,_0x25c126),this['_setNodeQueryPath'](_0x172a9d,_0x25c126),this['_setNodeExpressionPath'](_0x172a9d,_0x25c126),this['_setNodePermissions'](_0x172a9d,_0x25c126);},_0x4a72ac[_0x41415e(0x234)]['_setNodeId']=function(_0x1537f2,_0x3ab443){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1ef)]=function(_0x2427d1,_0x358bf3){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1cd)]=function(_0x54e5a6,_0x43bba0){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20e)]=function(_0x54acf6){var _0x335ec4=_0x41415e;return _0x54acf6===this[_0x335ec4(0x207)];},_0x4a72ac[_0x41415e(0x234)]['_treeNodePropertiesAfterFullValue']=function(_0x3d7e71,_0x54743f){var _0x59cd8a=_0x41415e;this['_setNodeLabel'](_0x3d7e71,_0x54743f),this['_setNodeExpandableState'](_0x3d7e71),_0x54743f[_0x59cd8a(0x1c7)]&&this[_0x59cd8a(0x1c6)](_0x3d7e71),this['_addFunctionsNode'](_0x3d7e71,_0x54743f),this[_0x59cd8a(0x1e0)](_0x3d7e71,_0x54743f),this['_cleanNode'](_0x3d7e71);},_0x4a72ac['prototype'][_0x41415e(0x262)]=function(_0x58500d,_0x2f1ff0){var _0x53b67e=_0x41415e;try{_0x58500d&&typeof _0x58500d['length']==_0x53b67e(0x237)&&(_0x2f1ff0[_0x53b67e(0x23a)]=_0x58500d[_0x53b67e(0x23a)]);}catch{}if(_0x2f1ff0[_0x53b67e(0x257)]===_0x53b67e(0x237)||_0x2f1ff0['type']==='Number'){if(isNaN(_0x2f1ff0[_0x53b67e(0x260)]))_0x2f1ff0[_0x53b67e(0x263)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];else switch(_0x2f1ff0[_0x53b67e(0x260)]){case Number[_0x53b67e(0x29b)]:_0x2f1ff0[_0x53b67e(0x228)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case Number['NEGATIVE_INFINITY']:_0x2f1ff0[_0x53b67e(0x25a)]=!0x0,delete _0x2f1ff0[_0x53b67e(0x260)];break;case 0x0:this[_0x53b67e(0x258)](_0x2f1ff0[_0x53b67e(0x260)])&&(_0x2f1ff0['negativeZero']=!0x0);break;}}else _0x2f1ff0[_0x53b67e(0x257)]==='function'&&typeof _0x58500d[_0x53b67e(0x2a1)]==_0x53b67e(0x1e9)&&_0x58500d[_0x53b67e(0x2a1)]&&_0x2f1ff0[_0x53b67e(0x2a1)]&&_0x58500d[_0x53b67e(0x2a1)]!==_0x2f1ff0['name']&&(_0x2f1ff0['funcName']=_0x58500d[_0x53b67e(0x2a1)]);},_0x4a72ac[_0x41415e(0x234)]['_isNegativeZero']=function(_0x5c40e7){var _0x716367=_0x41415e;return 0x1/_0x5c40e7===Number[_0x716367(0x293)];},_0x4a72ac['prototype'][_0x41415e(0x1c6)]=function(_0x20eb48){var _0x1c5169=_0x41415e;!_0x20eb48[_0x1c5169(0x299)]||!_0x20eb48['props'][_0x1c5169(0x23a)]||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x2b2)||_0x20eb48[_0x1c5169(0x257)]===_0x1c5169(0x1ea)||_0x20eb48['type']==='Set'||_0x20eb48[_0x1c5169(0x299)][_0x1c5169(0x279)](function(_0x415953,_0x627e36){var _0x3dc3b7=_0x1c5169,_0x10fc8e=_0x415953[_0x3dc3b7(0x2a1)][_0x3dc3b7(0x2a0)](),_0x279c34=_0x627e36[_0x3dc3b7(0x2a1)]['toLowerCase']();return _0x10fc8e<_0x279c34?-0x1:_0x10fc8e>_0x279c34?0x1:0x0;});},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1c0)]=function(_0x16876f,_0x162fd2){var _0x3d2a76=_0x41415e;if(!(_0x162fd2[_0x3d2a76(0x1da)]||!_0x16876f[_0x3d2a76(0x299)]||!_0x16876f['props']['length'])){for(var _0x2f6f65=[],_0x358cf7=[],_0x167b6c=0x0,_0x2108d8=_0x16876f['props'][_0x3d2a76(0x23a)];_0x167b6c<_0x2108d8;_0x167b6c++){var _0x3c39e8=_0x16876f[_0x3d2a76(0x299)][_0x167b6c];_0x3c39e8[_0x3d2a76(0x257)]===_0x3d2a76(0x1c1)?_0x2f6f65[_0x3d2a76(0x1dd)](_0x3c39e8):_0x358cf7[_0x3d2a76(0x1dd)](_0x3c39e8);}if(!(!_0x358cf7[_0x3d2a76(0x23a)]||_0x2f6f65[_0x3d2a76(0x23a)]<=0x1)){_0x16876f[_0x3d2a76(0x299)]=_0x358cf7;var _0x20ca6a={'functionsNode':!0x0,'props':_0x2f6f65};this['_setNodeId'](_0x20ca6a,_0x162fd2),this['_setNodeLabel'](_0x20ca6a,_0x162fd2),this['_setNodeExpandableState'](_0x20ca6a),this[_0x3d2a76(0x2a3)](_0x20ca6a,_0x162fd2),_0x20ca6a['id']+='\\x20f',_0x16876f[_0x3d2a76(0x299)][_0x3d2a76(0x2a4)](_0x20ca6a);}}},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1e0)]=function(_0x3123fd,_0x4647e8){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x20a)]=function(_0x2ca82b){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x1f9)]=function(_0x41db73){var _0x3b2dc0=_0x41415e;return Array[_0x3b2dc0(0x21f)](_0x41db73)||typeof _0x41db73==_0x3b2dc0(0x26d)&&this['_objectToString'](_0x41db73)==='[object\\x20Array]';},_0x4a72ac['prototype'][_0x41415e(0x2a3)]=function(_0x5900cd,_0x4da276){},_0x4a72ac[_0x41415e(0x234)][_0x41415e(0x2b1)]=function(_0x3153d5){var _0x60e45=_0x41415e;delete _0x3153d5['_hasSymbolPropertyOnItsPath'],delete _0x3153d5['_hasSetOnItsPath'],delete _0x3153d5[_0x60e45(0x1ed)];},_0x4a72ac['prototype'][_0x41415e(0x214)]=function(_0x1c5b52,_0xeb8701){};let _0x1b1f6a=new _0x4a72ac(),_0x5ab55c={'props':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x299)]||0x64,'elements':_0x4a1853[_0x41415e(0x25c)]['elements']||0x64,'strLength':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1d8)]||0x400*0x32,'totalStrLength':_0x4a1853[_0x41415e(0x25c)]['totalStrLength']||0x400*0x32,'autoExpandLimit':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x1bd)]||0x1388,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x25c)][_0x41415e(0x259)]||0xa},_0x1bc32b={'props':_0x4a1853['reducedLimits'][_0x41415e(0x299)]||0x5,'elements':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x24f)]||0x5,'strLength':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1d8)]||0x100,'totalStrLength':_0x4a1853['reducedLimits'][_0x41415e(0x1e6)]||0x100*0x3,'autoExpandLimit':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x1bd)]||0x1e,'autoExpandMaxDepth':_0x4a1853[_0x41415e(0x1d3)][_0x41415e(0x259)]||0x2};if(_0x40ff3c){let _0x465da0=_0x1b1f6a[_0x41415e(0x22b)][_0x41415e(0x1bf)](_0x1b1f6a);_0x1b1f6a['serialize']=function(_0x5bb6ac,_0xc8b820,_0x217e83,_0x48221d){return _0x465da0(_0x5bb6ac,_0x40ff3c(_0xc8b820),_0x217e83,_0x48221d);};}function _0x5d0dae(_0x36176c,_0x50f2a2,_0x31d836,_0x2f1b40,_0x356462,_0x21c4d){var _0x31131d=_0x41415e;let _0xc471d5,_0x41a687;try{_0x41a687=_0x33481b(),_0xc471d5=_0x31d747[_0x50f2a2],!_0xc471d5||_0x41a687-_0xc471d5['ts']>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x26e)]&&_0xc471d5[_0x31131d(0x215)]&&_0xc471d5['time']/_0xc471d5['count']<_0x513504[_0x31131d(0x2ab)][_0x31131d(0x1ba)]?(_0x31d747[_0x50f2a2]=_0xc471d5={'count':0x0,'time':0x0,'ts':_0x41a687},_0x31d747[_0x31131d(0x1b2)]={}):_0x41a687-_0x31d747[_0x31131d(0x1b2)]['ts']>_0x513504[_0x31131d(0x25e)][_0x31131d(0x26e)]&&_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]&&_0x31d747['hits']['time']/_0x31d747['hits']['count']<_0x513504['global'][_0x31131d(0x1ba)]&&(_0x31d747['hits']={});let _0x33ab9c=[],_0x32224c=_0xc471d5[_0x31131d(0x261)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]?_0x1bc32b:_0x5ab55c,_0x4ed7e1=_0x541a03=>{var _0x1d9f10=_0x31131d;let _0xb83276={};return _0xb83276[_0x1d9f10(0x299)]=_0x541a03[_0x1d9f10(0x299)],_0xb83276['elements']=_0x541a03['elements'],_0xb83276[_0x1d9f10(0x1d8)]=_0x541a03[_0x1d9f10(0x1d8)],_0xb83276[_0x1d9f10(0x1e6)]=_0x541a03[_0x1d9f10(0x1e6)],_0xb83276[_0x1d9f10(0x1bd)]=_0x541a03[_0x1d9f10(0x1bd)],_0xb83276[_0x1d9f10(0x259)]=_0x541a03[_0x1d9f10(0x259)],_0xb83276[_0x1d9f10(0x1c7)]=!0x1,_0xb83276[_0x1d9f10(0x1da)]=!_0x52ae61,_0xb83276[_0x1d9f10(0x270)]=0x1,_0xb83276['level']=0x0,_0xb83276[_0x1d9f10(0x29c)]=_0x1d9f10(0x1ac),_0xb83276[_0x1d9f10(0x2b3)]=_0x1d9f10(0x222),_0xb83276['autoExpand']=!0x0,_0xb83276['autoExpandPreviousObjects']=[],_0xb83276[_0x1d9f10(0x1c4)]=0x0,_0xb83276[_0x1d9f10(0x28a)]=_0x4a1853['resolveGetters'],_0xb83276[_0x1d9f10(0x275)]=0x0,_0xb83276[_0x1d9f10(0x1d6)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xb83276;};for(var _0x4872b1=0x0;_0x4872b1<_0x356462[_0x31131d(0x23a)];_0x4872b1++)_0x33ab9c['push'](_0x1b1f6a[_0x31131d(0x22b)]({'timeNode':_0x36176c===_0x31131d(0x213)||void 0x0},_0x356462[_0x4872b1],_0x4ed7e1(_0x32224c),{}));if(_0x36176c==='trace'||_0x36176c===_0x31131d(0x250)){let _0xbe35ed=Error[_0x31131d(0x1d5)];try{Error[_0x31131d(0x1d5)]=0x1/0x0,_0x33ab9c[_0x31131d(0x1dd)](_0x1b1f6a[_0x31131d(0x22b)]({'stackNode':!0x0},new Error()[_0x31131d(0x1fc)],_0x4ed7e1(_0x32224c),{'strLength':0x1/0x0}));}finally{Error[_0x31131d(0x1d5)]=_0xbe35ed;}}return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':_0x33ab9c,'id':_0x50f2a2,'context':_0x21c4d}]};}catch(_0x5f1a84){return{'method':_0x31131d(0x1ce),'version':_0x3d7d4d,'args':[{'ts':_0x31d836,'session':_0x2f1b40,'args':[{'type':_0x31131d(0x2aa),'error':_0x5f1a84&&_0x5f1a84[_0x31131d(0x206)]}],'id':_0x50f2a2,'context':_0x21c4d}]};}finally{try{if(_0xc471d5&&_0x41a687){let _0x1e910a=_0x33481b();_0xc471d5[_0x31131d(0x215)]++,_0xc471d5[_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0xc471d5['ts']=_0x1e910a,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]++,_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]+=_0x1015fc(_0x41a687,_0x1e910a),_0x31d747[_0x31131d(0x1b2)]['ts']=_0x1e910a,(_0xc471d5[_0x31131d(0x215)]>_0x513504[_0x31131d(0x2ab)][_0x31131d(0x21e)]||_0xc471d5[_0x31131d(0x213)]>_0x513504['perLogpoint'][_0x31131d(0x200)])&&(_0xc471d5['reduceLimits']=!0x0),(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x215)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x21e)]||_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x213)]>_0x513504[_0x31131d(0x25e)][_0x31131d(0x200)])&&(_0x31d747[_0x31131d(0x1b2)][_0x31131d(0x261)]=!0x0);}}catch{}}}return _0x5d0dae;}function G(_0x57f7c8){var _0x8989a5=_0x11737d;if(_0x57f7c8&&typeof _0x57f7c8==_0x8989a5(0x26d)&&_0x57f7c8[_0x8989a5(0x1ab)])switch(_0x57f7c8[_0x8989a5(0x1ab)][_0x8989a5(0x2a1)]){case _0x8989a5(0x1c9):return _0x57f7c8[_0x8989a5(0x202)](Symbol[_0x8989a5(0x220)])?Promise[_0x8989a5(0x27d)]():_0x57f7c8;case _0x8989a5(0x273):return Promise[_0x8989a5(0x27d)]();}return _0x57f7c8;}((_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x8035f7,_0x1eee1e,_0x4e67e7,_0x1dcc2b,_0x36ad0d,_0x5eec70,_0x325478)=>{var _0x417c2e=_0x11737d;if(_0x49a927[_0x417c2e(0x272)])return _0x49a927['_console_ninja'];let _0x493a09={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!X(_0x49a927,_0x4e67e7,_0x4fe531))return _0x49a927[_0x417c2e(0x272)]=_0x493a09,_0x49a927['_console_ninja'];let _0x1c6bc5=b(_0x49a927),_0x2b8f39=_0x1c6bc5[_0x417c2e(0x2b5)],_0x2d109f=_0x1c6bc5[_0x417c2e(0x25f)],_0x200f28=_0x1c6bc5[_0x417c2e(0x280)],_0x19208f={'hits':{},'ts':{}},_0xc7afd2=J(_0x49a927,_0x1dcc2b,_0x19208f,_0x8035f7,_0x325478,_0x4fe531==='next.js'?G:void 0x0),_0x118149=(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122)=>{var _0x3ee198=_0x417c2e;let _0x42dc9c=_0x49a927[_0x3ee198(0x272)];try{return _0x49a927[_0x3ee198(0x272)]=_0x493a09,_0xc7afd2(_0x4b882a,_0x96562,_0x3f27ad,_0x13190a,_0x5817de,_0x3fb122);}finally{_0x49a927[_0x3ee198(0x272)]=_0x42dc9c;}},_0x11bc8c=_0x374f3d=>{_0x19208f['ts'][_0x374f3d]=_0x2d109f();},_0x1c419e=(_0x19a11f,_0x5262fc)=>{var _0x3954f9=_0x417c2e;let _0x325002=_0x19208f['ts'][_0x5262fc];if(delete _0x19208f['ts'][_0x5262fc],_0x325002){let _0x493846=_0x2b8f39(_0x325002,_0x2d109f());_0x5bf617(_0x118149(_0x3954f9(0x213),_0x19a11f,_0x200f28(),_0x4202ca,[_0x493846],_0x5262fc));}},_0x2e039f=_0x5b0257=>{var _0x102273=_0x417c2e,_0x56d8f6;return _0x4fe531===_0x102273(0x211)&&_0x49a927['origin']&&((_0x56d8f6=_0x5b0257==null?void 0x0:_0x5b0257[_0x102273(0x21b)])==null?void 0x0:_0x56d8f6[_0x102273(0x23a)])&&(_0x5b0257[_0x102273(0x21b)][0x0][_0x102273(0x282)]=_0x49a927[_0x102273(0x282)]),_0x5b0257;};_0x49a927[_0x417c2e(0x272)]={'consoleLog':(_0xb0ef16,_0x4b56f2)=>{var _0x51186d=_0x417c2e;_0x49a927[_0x51186d(0x21d)][_0x51186d(0x1ce)]['name']!==_0x51186d(0x1fd)&&_0x5bf617(_0x118149(_0x51186d(0x1ce),_0xb0ef16,_0x200f28(),_0x4202ca,_0x4b56f2));},'consoleTrace':(_0xb88eb7,_0x523325)=>{var _0xc218c5=_0x417c2e,_0x514946,_0x272087;_0x49a927[_0xc218c5(0x21d)][_0xc218c5(0x1ce)][_0xc218c5(0x2a1)]!==_0xc218c5(0x20d)&&((_0x272087=(_0x514946=_0x49a927[_0xc218c5(0x1cb)])==null?void 0x0:_0x514946[_0xc218c5(0x2a8)])!=null&&_0x272087[_0xc218c5(0x1d6)]&&(_0x49a927[_0xc218c5(0x238)]=!0x0),_0x5bf617(_0x2e039f(_0x118149(_0xc218c5(0x288),_0xb88eb7,_0x200f28(),_0x4202ca,_0x523325))));},'consoleError':(_0x36ac47,_0x2b4a69)=>{var _0x24b679=_0x417c2e;_0x49a927[_0x24b679(0x238)]=!0x0,_0x5bf617(_0x2e039f(_0x118149('error',_0x36ac47,_0x200f28(),_0x4202ca,_0x2b4a69)));},'consoleTime':_0x2a2292=>{_0x11bc8c(_0x2a2292);},'consoleTimeEnd':(_0x186230,_0x3edf28)=>{_0x1c419e(_0x3edf28,_0x186230);},'autoLog':(_0x196e30,_0x4757f9)=>{var _0x14995c=_0x417c2e;_0x5bf617(_0x118149(_0x14995c(0x1ce),_0x4757f9,_0x200f28(),_0x4202ca,[_0x196e30]));},'autoLogMany':(_0x590664,_0x511674)=>{var _0x150948=_0x417c2e;_0x5bf617(_0x118149(_0x150948(0x1ce),_0x590664,_0x200f28(),_0x4202ca,_0x511674));},'autoTrace':(_0xf09034,_0x477842)=>{_0x5bf617(_0x2e039f(_0x118149('trace',_0x477842,_0x200f28(),_0x4202ca,[_0xf09034])));},'autoTraceMany':(_0x5dfffd,_0x37f583)=>{var _0x1a70f9=_0x417c2e;_0x5bf617(_0x2e039f(_0x118149(_0x1a70f9(0x288),_0x5dfffd,_0x200f28(),_0x4202ca,_0x37f583)));},'autoTime':(_0xa8fce3,_0x13dfa8,_0x217929)=>{_0x11bc8c(_0x217929);},'autoTimeEnd':(_0x48d600,_0x2b5f35,_0x5c28a8)=>{_0x1c419e(_0x2b5f35,_0x5c28a8);},'coverage':_0x2ec881=>{_0x5bf617({'method':'coverage','version':_0x8035f7,'args':[{'id':_0x2ec881}]});}};let _0x5bf617=H(_0x49a927,_0x1a871b,_0x483899,_0xef7368,_0x4fe531,_0x36ad0d,_0x5eec70),_0x4202ca=_0x49a927['_console_ninja_session'];return _0x49a927[_0x417c2e(0x272)];})(globalThis,_0x11737d(0x2a2),'52991',_0x11737d(0x1bb),_0x11737d(0x1b8),_0x11737d(0x25b),_0x11737d(0x20f),_0x11737d(0x1de),_0x11737d(0x281),_0x11737d(0x223),'1',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}});");
}
catch (e) {
    console.error(e);
} }
; /* istanbul ignore next */
function oo_oo(i, ...v) { try {
    oo_cm().consoleLog(i, v);
}
catch (e) { } return v; }
;
oo_oo; /* istanbul ignore next */
function oo_tr(i, ...v) { try {
    oo_cm().consoleTrace(i, v);
}
catch (e) { } return v; }
;
oo_tr; /* istanbul ignore next */
function oo_tx(i, ...v) { try {
    oo_cm().consoleError(i, v);
}
catch (e) { } return v; }
;
oo_tx; /* istanbul ignore next */
function oo_ts(v) { try {
    oo_cm().consoleTime(v);
}
catch (e) { } return v; }
;
oo_ts; /* istanbul ignore next */
function oo_te(v, i) { try {
    oo_cm().consoleTimeEnd(v, i);
}
catch (e) { } return v; }
;
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

})();

/******/ })()
;
//# sourceMappingURL=main.js.map