(function () {
  'use strict';

  var sliderHtml = "<div id=\"externalWrapper\">\n  <div id=\"slidesWrapper\">\n    <slot id=\"slidesSlot\">\n      <p class=\"slidesFallback\">No content available</p>\n    </slot>\n  </div>\n</div>\n\n<div id=\"navigation\">\n  <slot id=\"navigationSlot\" name=\"navigationSlot\"></slot>\n</div>\n\n<div id=\"pagination\">\n  <slot id=\"paginationSlot\" name=\"paginationSlot\"></slot>\n</div>\n\n<div id=\"aria-live\">\n  <slot id=\"ariaSlot\" name=\"ariaSlot\"></slot>\n</div>\n";

  var css = "/*******************************************************************************\n  Host and CSS properties\n*******************************************************************************/\n\n:host {\n  position: relative;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n\n  contain: content;\n\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n\n  --macro-carousel-gap: 16px;\n\n  --macro-carousel-background-color: transparent;\n\n  --macro-carousel-slide-min-height: 0px;\n  --macro-carousel-slide-max-height: none;\n\n  --macro-carousel-transition-duration: 0.6s;\n  --macro-carousel-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  --macro-carousel-pagination-gap: 2px;\n  --macro-carousel-pagination-height: 44px;\n\n  --macro-carousel-fallback-message-color-background: #fff;\n\n  --macro-carousel__internal__slides-per-view: 1;\n}\n\n:host([hidden]) {\n  display: none\n}\n\n/* focus-visible polyfill: no outline on :focus when it's not .focus-visible */\n:host-context(.js-focus-visible) :focus:not(.focus-visible),\n:host-context(.js-focus-visible) ::slotted(*:focus:not(.focus-visible)) {\n  outline: 0;\n}\n\n/*******************************************************************************\n  External wrapper: fixed size, containment, bg color, touch-action, pointer.\n*******************************************************************************/\n#externalWrapper {\n  height: 100%;\n\n  overflow: hidden;\n  contain: paint;\n\n  background-color: var(--macro-carousel-background-color);\n\n  /*\n    https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md\n  */\n  -ms-touch-action: pan-y pinch-zoom;\n      touch-action: pan-y pinch-zoom;\n\n  cursor: -webkit-grab;\n\n  cursor: grab;\n}\n\n#externalWrapper:active {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n\n:host([disable-drag]) #externalWrapper {\n  cursor: default;\n}\n\n/*******************************************************************************\n  Slides wrapper: flexbox container, is the transitioning element when moving\n  the slides.\n*******************************************************************************/\n#slidesWrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n\n  height: 100%;\n  min-height: var(--macro-carousel-slide-min-height);\n  max-height: var(--macro-carousel-slide-max-height);\n\n  will-change: transform;\n}\n\n:host([transitioning]) #slidesWrapper {\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  -webkit-transition-duration: var(--macro-carousel-transition-duration);\n          transition-duration: var(--macro-carousel-transition-duration);\n  -webkit-transition-timing-function: var(--macro-carousel-transition-timing-function);\n          transition-timing-function: var(--macro-carousel-transition-timing-function);\n}\n\n/*******************************************************************************\n  Slides: width is calculated with a css formula\n*******************************************************************************/\n#slidesWrapper ::slotted(*) {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  /* (100% - gap * (slidesPerView - 1)) / slidesPerView */\n  -ms-flex-preferred-size: calc((100% - (var(--macro-carousel__internal__slides-per-view) - 1) *\n      var(--macro-carousel-gap)) / var(--macro-carousel__internal__slides-per-view));\n      flex-basis: calc((100% - (var(--macro-carousel__internal__slides-per-view) - 1) *\n      var(--macro-carousel-gap)) / var(--macro-carousel__internal__slides-per-view));\n\n  min-height: var(--macro-carousel-slide-min-height);\n  max-height: var(--macro-carousel-slide-max-height);\n\n  margin-right: var(--macro-carousel-gap);\n\n  /*\n   * Enforces the slides to keep their size even if the content requires\n   * a bigger slide size.\n   */\n  overflow: hidden;\n\n  outline: 0;\n\n  -webkit-user-select: none;\n\n     -moz-user-select: none;\n\n      -ms-user-select: none;\n\n          user-select: none;\n}\n\n.slidesFallback {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  margin: 0;\n  padding: .5em 1em;\n\n  width: 100%;\n\n  background-color: var(--macro-carousel-fallback-message-color-background);\n}\n\n:host([disable-drag]) #slidesWrapper ::slotted(*) {\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n}\n\n/*******************************************************************************\n  Pagination styles\n*******************************************************************************/\n#pagination {\n  display: none;\n}\n\n:host([pagination]) #pagination {\n  -ms-flex-item-align: center;\n      align-self: center;\n\n  display: -webkit-box;\n\n  display: -ms-flexbox;\n\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  width: 100%;\n  height: var(--macro-carousel-pagination-height);\n\n  contain: strict;\n\n  font-size: 0;\n}\n\ndiv ::slotted(macro-carousel-pagination-indicator) {\n  margin: 0 calc(var(--macro-carousel-pagination-gap) / 2);\n  padding: 0;\n\n  font-size: inherit;\n\n  opacity: .8;\n}\n\n\ndiv ::slotted(macro-carousel-pagination-indicator:hover),\ndiv ::slotted(macro-carousel-pagination-indicator.selected) {\n  opacity: 1;\n}\n\n/*******************************************************************************\n  Navigation styles (rest of styles is in macro-carousel-nav-button.css)\n*******************************************************************************/\n#navigation {\n  display: none;\n}\n\n:host([navigation]) #navigation {\n  display: block;\n}\n\ndiv ::slotted(macro-carousel-nav-button) {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n:host([pagination]) div ::slotted(macro-carousel-nav-button) {\n  top: calc(50% - var(--macro-carousel-pagination-height) / 2);\n}\n\ndiv ::slotted(.macro-carousel-previous) {\n  left: 0;\n}\n\ndiv ::slotted(.macro-carousel-next) {\n  right: 0;\n}\n\n/*******************************************************************************\n  aria-live styles\n*******************************************************************************/\n#aria-live ::slotted(*) {\n  position: absolute;\n\n  height: 1px;\n  width: 1px;\n\n  margin: -1px;\n  padding: 0;\n\n  clip: rect(0 0 0 0);\n\n  overflow: hidden;\n\n  border: 0;\n}\n\n/*******************************************************************************\n * Print styles:\n * - Show all slides and stack them vertically\n * - Eliminate the slide gap, show an outline\n * - make sure the page doesn't break a slide in half\n * - hide pagination and navigation buttons\n*******************************************************************************/\n\n@media print {\n  #slidesWrapper ::slotted(*) {\n    margin-right: 0;\n    margin-bottom: .2em;\n\n    outline: 1px solid #000;\n\n    color: #000;\n\n    page-break-inside: avoid;\n  }\n\n  /* Remove the navigational buttons, they provide no context in print */\n   :host([navigation]) #navigation,\n   :host([pagination]) #pagination {\n    display: none;\n  }\n\n  /* Stack the slides */\n  #slidesWrapper {\n    display: block;\n\n    -webkit-transform: none !important;\n\n            transform: none !important;\n    -webkit-transition: 0s;\n    transition: 0s;\n  }\n}\n";

  let _passiveEvtSupport;

  /**
   * Detects browser support for passive event listeners. See
   * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   * @returns {boolean} True if the browser support passive event listeners.
   * @private
   */
  function _passiveEvtListenersSupported() {
    if (typeof _passiveEvtSupport === 'undefined') {
      _passiveEvtSupport = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: () => {
            _passiveEvtSupport = true;
          },
        });
        window.addEventListener('test', null, opts);
      } catch (e) {}
    }

    return _passiveEvtSupport;
  }

  /**
   * Returns the event options (including passive if the browser supports it)
   * @param {boolean} isPassive Whether the event is passive or not.
   * @returns {Object|boolean} Based on browser support, returns either an
   * object representing the options (including passive), or a boolean.
   */
  function getEvtListenerOptions(isPassive) {
    return _passiveEvtListenersSupported() ? {passive: isPassive} : false;
  }

  /**
   * Clamps a number between a min and a max.
   * @param {number} x The number to be clamped.
   * @param {number} [min] The min value.
   * @param {number} [max] The max value.
   * @return {number} The clamped number.
   * @throws {RangeError} min must be strictly less than max.
   */
  function clamp(x, min = x, max = x) {
    let clamped = x;

    if (min > max) {
      throw new RangeError(`'min' ${min} should be lower than 'max' ${max}`);
    }

    if (x < min) {
      clamped = min;
    }

    if (x > max) {
      clamped = max;
    }

    return clamped;
  }

  /**
   * Clamps a number according to its absolute value, but still retaining its
   *  sign.
   * @param {number} x The number to be clamped.
   * @param {number} [min] The min value.
   * @param {number} [max] The max value.
   * @return {number} The clamped number.
   */
  function clampAbs(x, min, max) {
    if (x === 0) {
      throw new RangeError('x must be different from `0`');
    }

    return x / Math.abs(x) * clamp(Math.abs(x), min, max);
  }

  /**
   * Computes the tan of an angle in degress, and rounds it to 2 decimals.
   * @param {number} deg The angle in degrees.
   * @return {number} The rounded tan.
   */
  function roundedTan(deg) {
    return Math.round(Math.tan(deg * Math.PI / 180) * 100) / 100;
  }

  /**
   * Standard setter for a Custom Element boolean property reflected to attribute.
   * @param {HTMLElement} element
   * @param {string} attributeName
   * @param {boolean} flag
   */
  function booleanSetter(element, attributeName, flag) {
    if (flag) {
      element.setAttribute(attributeName, '');
    } else {
      element.removeAttribute(attributeName);
    }
  }

  /**
   * Standard getter for a Custom Element boolean property reflected to attribute.
   * @param {HTMLElement} element
   * @param {string} attributeName
   * @return {boolean} Whether the element has that specific attribute
   */
  function booleanGetter(element, attributeName) {
    return element.hasAttribute(attributeName);
  }

  /**
   * Standard setter for a Custom Element int property reflected to attribute.
   * @param {HTMLElement} element
   * @param {string} attributeName
   * @param {number} value
   */
  function intSetter(element, attributeName, value) {
    element.setAttribute(attributeName, `${value}`);
  }

  /**
   * Standard getter for a Custom Element int property reflected to attribute.
   * @param {HTMLElement} element
   * @param {string} attributeName
   * @param {number} [defaultValue=0]
   * @return {number} Whether the element has that specific attribute
   */
  function intGetter(element, attributeName, defaultValue = 0) {
    const value = element.getAttribute(attributeName);
    return value === null ? defaultValue : parseInt(value, 10);
  }

  /**
   * An object representing either a touch event or a mouse event.
   * @typedef {object} NormalisedPointerEvent
   * @property {number} x The x coordinate.
   * @property {number} y The y coordinate.
   * @property {?number} id The pointer identifier.
   * @property {MouseEvent|TouchEvent} event The original event object.
   */

  /**
   * Normalises touch and mouse events into an object with the same properties.
   * @param {MouseEvent|TouchEvent} ev The mouse or touch event.
   * @returns {NormalisedPointerEvent}
   * @private
   */
  function normalizeEvent(ev) {
    // touch
    if (ev.type === 'touchstart' ||
        ev.type === 'touchmove' ||
        ev.type === 'touchend') {
      const touch = ev.targetTouches[0] || ev.changedTouches[0];
      return {
        x: touch.clientX,
        y: touch.clientY,
        id: touch.identifier,
        event: ev,
      };

    // mouse
    } else {
      return {
        x: ev.clientX,
        y: ev.clientY,
        id: null,
        event: ev,
      };
    }
  }

  /**
   * Gets the value of a CSS Custom property on a HTML Element.
   * @param {HTMLElement} element The element to get the property from.
   * @param {string} propertyName The property name.
   * @return {string} The property value.
   */
  function getCSSCustomProperty(element, propertyName) {
    const cssStyles = getComputedStyle(element);
    return String(cssStyles.getPropertyValue(propertyName)).trim();
  }

  /**
   * Sets the value of a CSS Custom property on a HTML Element.
   * @param {HTMLElement} element The element to get the property onto.
   * @param {string} propertyName The property name.
   * @param {string|number} propertyValue The property value.
   */
  function setCSSCustomProperty(element, propertyName, propertyValue) {
    element.style.setProperty(propertyName, `${propertyValue}`);
    if (window.ShadyCSS) {
      window.ShadyCSS.styleSubtree(element, {[propertyName]: propertyValue});
    }
  }

  /**
   * Check if a variable is undefined
   * @param {*} a Anything
   * @return {boolean}
   */
  function isUndefined(a) {
    return typeof a === 'undefined';
  }

  const baseName = 'macro-carousel';

  const TAGNAMES = {
    CAROUSEL: baseName,
    NAV_BTN: `${baseName}-nav-button`,
    PAG_BTN: `${baseName}-pagination-indicator`,
  };

  const IDS = {
    CAROUSEL: {
      WRAPPER_EXTERNAL: 'externalWrapper',
      WRAPPER_SLIDES: 'slidesWrapper',
      SLOT_SLIDES: 'slidesSlot',
      SLOT_ARIA: 'ariaSlot',
      SLOT_PAGINATION: 'paginationSlot',
      SLOT_NAVIGATION: 'navigationSlot',
    },
  };

  const CLASSNAMES = {
    CAROUSEL: {},

    NAV_BTN: {
      PREVIOUS: `${baseName}-previous -button`,
      NEXT: `${baseName}-next -button`,
    },

    PAG_BTN: {
      SELECTED: 'selected',
    },
  };

  const EVENTS = {
    STANDARD: {
      CLICK: 'click',
      TOUCHSTART: 'touchstart',
      TOUCHMOVE: 'touchmove',
      TOUCHEND: 'touchend',
      TOUCHCANCEL: 'touchcancel',
      MOUSEDOWN: 'mousedown',
      MOUSEMOVE: 'mousemove',
      MOUSEUP: 'mouseup',
      KEYDOWN: 'keydown',
      RESIZE: 'resize',
      SLOTCHANGE: 'slotchange',
      TRANSITIONEND: 'transitionend',
    },

    CAROUSEL: {
      SELECTED_CHANGED: `${TAGNAMES.CAROUSEL}-selected-changed`,
    },

    NAV_BTN: {
      CLICKED: `${TAGNAMES.NAV_BTN}-clicked`,
    },

    PAG_BTN: {
      CLICKED: `${TAGNAMES.PAG_BTN}-clicked`,
    },
  };

  const KEYCODES = {
    ENTER: 13,
    SPACE: 32,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,

  };

  const ATTRS = {
    STANDARD: {
      ROLE: 'role',
      TABINDEX: 'tabindex',
      INERT: 'inert',
      ARIA: {
        HIDDEN: 'aria-hidden',
        LABEL: 'aria-label',
        LIVE: 'aria-live',
        ATOMIC: 'aria-atomic',
        DISABLED: 'aria-disabled',
      },
      SLOT: 'slot',
      DISABLED: 'disabled',
    },

    NAV_BTN: {
      FLIPPED: 'flipped',
    },
  };

  const ATTR_VALUES = {
    ARIA_LIVE: {
      POLITE: 'polite',
    },

    ROLES: {
      BUTTON: 'button',
      LIST: 'list',
      LISTITEM: 'listitem',
    },

    TRUE: 'true',
    FALSE: 'false',
  };

  const SLOTNAMES = {
    ARIA: 'ariaSlot',
    PAGINATION: 'paginationSlot',
    NAVIGATION: 'navigationSlot',
  };

  const CSS_PROPS = {
    STANDARD: {
      MARGIN_RIGHT: 'margin-right',
    },

    CAROUSEL: {
      GAP: `--${baseName}-gap`,
      SLIDES_PER_VIEW: `--${baseName}__internal__slides-per-view`,
    },
  };

  /**
   * Markup and styles.
   */
  const template = document.createElement('template');
  template.innerHTML = `<style>${css}</style> ${sliderHtml}`;

  if (window.ShadyCSS) {
    window.ShadyCSS.prepareTemplate(template, TAGNAMES.CAROUSEL);
  }




  // A fraction of the slider width, a size used to compute
  // by how many slides the slider would move after a swipe.
  const _velocityThresholdFactor = 0.5;

  // How many slides more than slidesPerView can be swiped
  // at the highest swiped velocity.
  const _velocityMaxAdditionalSlides = 2;

  // How strictly the carousel detects a horizontal drag.
  // The angle (in degrees) should be in range (0, 90)
  // 45 degrees is the neutral angle.
  // The higher the value, the stricter the detection.
  const _dragAngleAllowance = Math.abs(roundedTan(35));

  // Distance (in px) that has to be covered before the carousel starts
  // detecting a horizontal vs vertical movement.
  const _dragDistanceAllowance = 5;


  // Label builders.
  const previousButtonLabel = (loop, isFirst) =>
    `Go to ${loop && isFirst ? 'last' : 'previous'} item`;

  const nextButtonLabel = (loop, isLast) =>
    `Go to ${loop && isLast ? 'first' : 'next'} item`;

  const goToSlideButtonLabel = (i) => `Go to item ${i + 1}`;

  const slidesStatusCaption = (firstSlideIndex, numSlides, slidesPerView) => {
    const slidesInView = [];
    for (let i = 0; i < slidesPerView; i++) {
      slidesInView.push((firstSlideIndex + i) % numSlides + 1);
    }

    return `Item${slidesPerView > 1 ? 's' : ''} ${
    slidesInView.join(', ').replace(/(,)(\s[^,]*)$/, ' and$2')
  } of ${numSlides} visible`;
  };

  /**
   * An object representing either a touch event or a mouse event.
   * @typedef {object} NormalisedPointerEvent
   * @property {number} x The x coordinate.
   * @property {number} y The y coordinate.
   * @property {?number} id The pointer identifier.
   * @property {MouseEvent|TouchEvent} event The original event object.
   */

  /**
   * An object containing information about a slide.
   * @typedef {object} SlideInfo
   * @property {HTMLElement} element The DOM element.
   * @property {number} layoutIndex The real index in the layout.
   * @property {number} position The current position within the slider (in px).
   */

  /**
   * @typedef {object} TrackingPoint
   * @property {Date} time Current time.
   * @property {number} x Last position of the pointer on the x axis.
   */

  /**
   * A slider/carousel Web Component.
   */
  class MacroCarousel extends HTMLElement {
    /**
     * Creates a new instance of MacroCarousel.
     * @constructor
     */
    constructor() {
      /*
       * Runs anytime a new instance is created (in HTML or JS).
       * The constructor is a good place to create shadow DOM, though you should
       * avoid touching any attributes or light DOM children as they may not
       * be available yet.
       */
      super();

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      /**
       * The wrapper element enclosing the slides.
       * @type {HTMLElement}
       * @private
       */
      this._externalWrapper =
          this._getShadowElementById(IDS.CAROUSEL.WRAPPER_EXTERNAL);

      /**
       * The internal wrapper element (responsible for the slides layout
       *  and for sliding).
       * @type {HTMLElement}
       * @private
       */
      this._slidesWrapper =
          this._getShadowElementById(IDS.CAROUSEL.WRAPPER_SLIDES);

      /**
       * The slot where the slides are injected into.
       * @type {HTMLSlotElement}
       * @private
       */
      this._slidesSlot = this._getShadowElementById(IDS.CAROUSEL.SLOT_SLIDES);

      /**
       * The slot where the aria-live element is injected into.
       * @type {HTMLSlotElement}
       * @private
       */
      this._ariaSlot = this._getShadowElementById(IDS.CAROUSEL.SLOT_ARIA);

      /**
       * The slot where the pagination indicators are injected into.
       * @type {HTMLSlotElement}
       * @private
       */
      this._paginationSlot =
          this._getShadowElementById(IDS.CAROUSEL.SLOT_PAGINATION);

      /**
       * Array of pagination indicators.
       * @type {Array<HTMLElement>}
       * @private
       */
      this._paginationIndicators = [];

      /**
       * The slot where the navigation previous/next buttons are injected into.
       * @type {HTMLSlotElement}
       * @private
       */
      this._navigationSlot =
          this._getShadowElementById(IDS.CAROUSEL.SLOT_NAVIGATION);

      /**
       * The navigation `previous` button.
       * @type {HTMLElement|undefined}
       * @private
       */
      this._prevButton = undefined;

      /**
       * The navigation `next` button.
       * @type {HTMLElement|undefined}
       * @private
       */
      this._nextButton = undefined;

      /**
       * The array of slides, i.e. the children of this._slidesSlot.
       * @type {Array<SlideInfo>}
       * @private
       */
      this._slides = [];

      /**
       * The index of the the last view.
       * @type {number}
       * @private
       */
      this._lastViewIndex = -1;

      /**
       * Whether the first/previous slide should infinite loop
       * @type {boolean}
       * @private
       */
      this._infiniteLoop = false;

      /**
       * An internal index representing the "wrapAround" iteration about the
       * selected index. If _infiniteLoop is false, its value doesn't change.
       * @type {number}
       * @private
       */
      this._selectedIteration = 0;

      /**
       * An internal index keeping track of the previous value for the layout
       * index. Useful for understanding which slides need to be moved.Gets
       * updated every time `selected` changes.
       * @type {number}
       * @private
       */
      this._previousEffectiveLayoutIndex = 0;

      /**
       * The width of this._slidesWrapper (in px). Derived from CSS.
       * @type {number}
       * @private
       */
      this._wrapperWidth = 0;

      /**
       * The width of the gap between each slide (in px). Derived from CSS.
       * @type {number}
       * @private
       */
      this._slidesGap = 0;

      /**
       * The width of each individual slide (in px). Computed mathematically
       * from other properties.
       * @type {number}
       * @private
       */
      this._slidesWidth = 0;

      /**
       * The translation on the X axis applied to this._slidesWrapper (in px).
       * @type {number}
       * @private
       */
      this._wrapperTranslateX = 0;

      /**
       * The reference to the timer used to debounce the `update()` function.
       * @type {number|undefined}
       * @private
       */
      this._updateTimer = undefined;

      /**
       * True when CSS transitions are enabled.
       * @type {boolean}
       * @private
       */
      this._transitioning = false;

      // Touch / drag

      /**
       * Whether the user's pointer is currently being used to drag the slides.
       * @type {boolean}
       * @private
       */
      this._isPointerActive = false;

      /**
       * The ID of the active pointer that is dragging the slides.
       * @type {number|undefined}
       * @private
       */
      this._pointerId = undefined;

      /**
       * The coordinate on the X axis at which the active pointer first "touched".
       * @type {number|undefined}
       * @private
       */
      this._pointerFirstX = undefined;

      /**
       * The coordinate on the Y axis at which the active pointer first "touched".
       * @type {number|undefined}
       * @private
       */
      this._pointerFirstY = undefined;

      /**
       * The coordinate on the X axis used to the set the wrapper's translation
       * during the last frame.
       * @type {number|undefined}
       * @private
       */
      this._pointerLastX = undefined;

      /**
       * The coordinate on the Y axis used to the set the wrapper's translation
       * during the last frame.
       * @type {number|undefined}
       * @private
       */
      this._pointerLastY = undefined;

      /**
       * The coordinate on the X axis at which the active pointer last "touched".
       * @type {number|undefined}
       * @private
       */
      this._pointerCurrentX = undefined;

      /**
       * The coordinate on the Y axis at which the active pointer last "touched".
       * @type {number|undefined}
       * @private
       */
      this._pointerCurrentY = undefined;

      /**
       * Updated during pointer events.
       * @type {number|undefined}
       * @private
       */
      this._lastDraggedLayoutIndex = undefined;

      /**
       * Array containing the translation value assumed by the slidesWrapper in
       * the last 100ms. Used to compute the starting velocity when decelerating.
       * @type {Array<TrackingPoint>}
       * @private
       */
      this._trackingPoints = [];

      /**
       * Flag used to limit the number of updates to the slidesWrapper to once
       * per frame (the pointer events may fire more frequently than that).
       * @type {boolean}
       * @private
       */
      this._dragTicking = false;

      /**
       * The upper bound for the initial value of the velocity when decelerating.
       * @type {number}
       * @private
       */
      this._maxDecelVelocity = 50;

      /**
       * The lower bound for the initial value of the velocity when decelerating.
       * @type {number}
       * @private
       */
      this._minDecelVelocity = 20;

      /**
       * The value for the friction strength used when decelerating.
       * 0 < friction < 1.
       * @type {number}
       * @private
       */
      this._friction = 0.7;

      /**
       * The value for the attraction strength used when decelerating.
       * @type {number}
       * @private
       */
      this._attraction = 0.04;

      /**
       * The value of the deceleration velocity (in px).
       * @type {number}
       * @private
       */
      this._decelVelocity = 0;

      /**
       * Whether the slider is currently decelerating towards its final point
       * after being dragged by the user.
       * @type {boolean}
       * @private
       *
       */
      this._decelerating = false;
    }

    /**
     * Queries the Shadow DOM looking for an element matching the id
     * @param {string} id The id of the element
     * @returns {HTMLElement}
     */
    _getShadowElementById(id) {
      return this.shadowRoot.querySelector(`#${id}`);
    }

    /**
     * Fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     * @private
     */
    connectedCallback() {
      // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
      // because if you shim Custom Properties (CSS variables) the element
      // will need access to its parent node.
      if (window.ShadyCSS) {
        window.ShadyCSS.styleElement(this);
      }

      // Setting role=list (we set role=listitem for the slides)
      if (!this.hasAttribute(ATTRS.STANDARD.ROLE)) {
        this.setAttribute(ATTRS.STANDARD.ROLE, ATTR_VALUES.ROLES.LIST);
      }

      // Setup the component.
      [
        'selected',
        'loop',
        'navigation',
        'pagination',
        'disableDrag',
        'slidesPerView',
        'reducedMotion',
        'autoFocus',
      ].forEach((p) => this._upgradeProperty(p));

      this._previousEffectiveLayoutIndex = this.selected;

      // Enable transitions only after the initial setup.
      this._enableWrapperTransitions();

      // Add event listeners.
      this._slidesSlot.addEventListener(EVENTS.STANDARD.SLOTCHANGE, this);
      window.addEventListener(EVENTS.STANDARD.RESIZE, this,
          getEvtListenerOptions(true));
      this.addEventListener(EVENTS.STANDARD.KEYDOWN, this);

      // fixes weird safari 10 bug where preventDefault is prevented
      // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
      window.addEventListener(EVENTS.STANDARD.TOUCHMOVE, function() {});

      // Sometimes the 'slot-changed' event doesn't fire consistently across
      // browsers, depending on how the Custom Element was parsed and initialised
      // (see https://github.com/whatwg/dom/issues/447)
      this._onSlidesSlotChange();
    }

    /**
     * Fires when the element is removed from the DOM.
     * It's a good place to do clean up work like releasing references and
     * removing event listeners.
     * @private
     */
    disconnectedCallback() {
      this._slidesSlot.removeEventListener(EVENTS.STANDARD.SLOTCHANGE, this);
      window.removeEventListener(EVENTS.STANDARD.RESIZE, this);

      if (!this.disableDrag) {
        this._externalWrapper
            .removeEventListener(EVENTS.STANDARD.TOUCHSTART, this);
        this._externalWrapper
            .removeEventListener(EVENTS.STANDARD.MOUSEDOWN, this);
      }

      if (this.navigation) {
        this._prevButton.removeEventListener(EVENTS.NAV_BTN.CLICKED, this);
        this._nextButton.removeEventListener(EVENTS.NAV_BTN.CLICKED, this);
      }

      if (this.pagination) {
        this._paginationIndicators.forEach((p) =>
          p.removeEventListener(EVENTS.PAG_BTN.CLICKED, this));
      }
    }

    /**
     * Defining handleEvent allows to pass `this` as the callback to every
     * `addEventListener` and `removeEventListener`. This avoids the need of
     * binding every function. See
     * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
     *
     * @param {Event} e Any event.
     * @private
     */
    handleEvent(e) {
      // Window resize
      if (e.type === EVENTS.STANDARD.RESIZE && e.target === window) {
        this._disableWrapperTransitions();
        this.update();

      // Slot change
      } else if (e.type === EVENTS.STANDARD.SLOTCHANGE &&
          e.target === this._slidesSlot) {
        this._onSlidesSlotChange();

      // Pagination indicators
      } else if (e.type === EVENTS.PAG_BTN.CLICKED && this.pagination) {
        this._onPaginationClicked(e);

      // Navigation (prev / next button)
      } else if (e.type === EVENTS.NAV_BTN.CLICKED && this.navigation) {
        if (e.target === this._prevButton) {
          this.previous();
        } else if (e.target === this._nextButton) {
          this.next();
        }

      // Keyboard.
      } else if (e.type === EVENTS.STANDARD.KEYDOWN) {
        // Left / Up.
        if (e.keyCode === KEYCODES.LEFT || e.keyCode === KEYCODES.UP) {
          this.previous();
        // Right / Down.
        } else if (e.keyCode === KEYCODES.RIGHT || e.keyCode === KEYCODES.DOWN) {
          this.next();
        }

      // transitionend (CSS)
      } else if (e.type === EVENTS.STANDARD.TRANSITIONEND &&
          e.target === this._slidesWrapper) {
        this._updateSlidesA11y();
        this._focusSelectedSlide();
        this._updateAriaLiveDom();

      // Touch / drag
      } else if (e.type === EVENTS.STANDARD.TOUCHSTART ||
          e.type === EVENTS.STANDARD.MOUSEDOWN) {
        this._onPointerDown(normalizeEvent(e));
      } else if (e.type === EVENTS.STANDARD.TOUCHMOVE ||
          e.type === EVENTS.STANDARD.MOUSEMOVE) {
        this._onPointerMove(normalizeEvent(e));
      } else if (e.type === EVENTS.STANDARD.TOUCHEND ||
          e.type === EVENTS.STANDARD.MOUSEUP) {
        this._onPointerEnd(normalizeEvent(e));
      } else if (e.type === EVENTS.STANDARD.TOUCHCANCEL) {
        this._stopPointerTracking();
      }
    }

    /**
     * Used for upgrading properties in case this element is upgraded lazily.
     * See web/fundamentals/architecture/building-components/best-practices#lazy-properties
     * @param {*} prop
     * @private
     */
    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }


    // ===========================================================================
    // Public methods (update, previous, next)
    // ===========================================================================

    /**
     * "Forces" an update by sliding the current view in, and updating
     * navigation and pagination.
     */
    update() {
      // Debouncing update.
      clearTimeout(this._updateTimer);
      this._disableWrapperTransitions();
      this._updateTimer = setTimeout(() => {
        this._internalUpdate();
      }, 50);
    }

    /**
     * Internal implementation of update(). Split in a separate function in
     * order to allow debouncing.
     * @private
     */
    _internalUpdate() {
      this._computeSizes();
      this._updateInfiniteLoop();
      this._computeSlidesPerViewLayout();
      this._shiftSlides(this._slides.map(slide => slide.layoutIndex), true);
      this._slideTo(this.selected);
      this._updatePagination();
      this._updateNavigation();
      this._updateDragEventListeners();
      this._updateSlidesA11y();
      this._updateAriaLiveDom();

      this._enableWrapperTransitions();
    }

    /**
     * Selects the slide preceding the currently selected one.
     * If the currently selected slide is the first slide and the loop
     * functionality is disabled, nothing happens.
     */
    previous() {
      this.selected = this._computePrevious(this.selected);
    }

    /**
     * Computes the previous index.
     * @param {number} i The index of reference used to compute the previous.
     * @return {number} The previous index with respect to the input.
     * @private
     */
    _computePrevious(i) {
      let previousSlideIndex = i;

      // Wrap around is true only if loop is true.
      if (i > 0) {
        previousSlideIndex = i - 1;
      } else if (this.loop) {
        if (this._infiniteLoop) {
          this._selectedIteration -= 1;
        }

        previousSlideIndex = this._lastViewIndex;
      }

      return clamp(previousSlideIndex, 0, this._lastViewIndex);
    }

    /**
     * Selects the slide following the currently selected one.
     * If the currently selected slide is the last slide and the loop
     * functionality is disabled, nothing happens.
     */
    next() {
      this.selected = this._computeNext(this.selected);
    }

    /**
     * Computes the next index.
     * @param {number} i The index of reference used to compute the next.
     * @return {number} The next index with respect to the input.
     * @private
     */
    _computeNext(i) {
      let nextSlideIndex = i;

      // Wrap around is true only if loop is true.
      if (i < this._lastViewIndex) {
        nextSlideIndex = i + 1;
      } else if (this.loop) {
        if (this._infiniteLoop) {
          this._selectedIteration += 1;
        }

        nextSlideIndex = 0;
      }

      return clamp(nextSlideIndex, 0, this._lastViewIndex);
    }


    // ===========================================================================
    // Attributes / properties (selected, loop, navigation, pagination,
    // slides-per-view)
    // ===========================================================================

    /**
     * An array of the observed attributes.
     * @static
     */
    static get observedAttributes() {
      return [
        'selected',
        'loop',
        'navigation',
        'pagination',
        'disable-drag',
        'slides-per-view',
        'reduced-motion',
        'auto-focus',
      ];
    }

    /**
     * Fired when the selected slide changes.
     * @event MacroCarousel#macro-carousel-selected-changed
     * @type {Object}
     * @param {number} detail The index of the new selected slide.
     */

    /**
     * Called whenever an observedAttribute's value changes.
     * @param {string} name The attribute's local name.
     * @param {*} oldValue The attribute's previous value.
     * @param {*} newValue The attribute's new value.
     * @fires MacroCarousel#macro-carousel-selected-changed
     * @private
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (this._slides.length === 0) {
        this._onSlidesSlotChange();
      }

      switch (name) {
        case 'selected':
          const parsedNewValue = parseInt(newValue, 10);

          // Accept only numbers between `0` and `this._lastViewIndex`.
          if (!Number.isFinite(parsedNewValue) ||
              parsedNewValue > this._lastViewIndex ||
              parsedNewValue < 0) {
            this.selected = oldValue || 0;
            return;
          }

          if (this._infiniteLoop) {
            const effectiveLayoutIndex = this.selected +
                this._selectedIteration * (this._lastViewIndex + 1);

            // Get the "jump" between the current layout position and the previous
            // one. This gives the indication of which slides need to be moved to
            // a different location.
            // selectionDelta: if negative, we're selecting a slide to the right
            // The absolute value is shows by how many slides the "jump" is.
            // If selectionDelta === 0, no action is needed.
            const selectionDelta = this._previousEffectiveLayoutIndex -
                effectiveLayoutIndex;

            // Compute which slides are going to be in view in the upcoming
            // transition.
            const slidesInViewIndexes = [];
            const indexOffset = selectionDelta < 0 ?
                this.slidesPerView + selectionDelta : 0;
            // Starting at -1 means that we're also shifting the slide to the left
            // of the current one. Useful to not brake the slider while dragging
            // left.
            for (let i = -1; i < Math.abs(selectionDelta); i++) {
              // The index is compute by adding up:
              // - i: the current iteration's index
              // - effectiveLayoutIndex: where the slider is currently at
              // - indexOffset: compensates when scrolling right by taking into
              //   account the number of slidesPerView and selectionDelta
              slidesInViewIndexes.push(i + effectiveLayoutIndex + indexOffset);
            }

            this._shiftSlides(slidesInViewIndexes);

            this._previousEffectiveLayoutIndex = effectiveLayoutIndex;
          }

          this._slideTo(this.selected);
          this._updatePagination();
          this._updateNavigation();

          this.dispatchEvent(new CustomEvent(EVENTS.CAROUSEL.SELECTED_CHANGED, {
            detail: this.selected,
            bubbles: true,
          }));

          // Apply a11y changes immediately only if the slider is not
          // transitioning (i.e. CSS transitions) or decelerating (i.e. after
          // dragging). In those cases, the functions below are triggered in a
          // transitionend event listener, or at the end of the deceleration
          // rendering loop.
          if (!this._transitioning && !this._decelerating) {
            this._updateSlidesA11y();
            this._focusSelectedSlide();
            this._updateAriaLiveDom();
          }

          break;

        case 'loop':
          this._updateInfiniteLoop();
          this._computeSlidesPerViewLayout();

          // Reset the slides 'layoutIndex', transform and position.
          this._shiftSlides(this._slides.map((slide, index) => index));
          this._updateNavigation();
          this._updatePagination();
          this._updateSlidesA11y();
          this._focusSelectedSlide();
          this._updateAriaLiveDom();

          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree(this);
          }
          break;

        case 'navigation':
          // Calling `update()` instead of `_updateNavigation()` as adding/
          // removing navigation buttons causes the slidesWrapper to resize.
          this.update();

          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree(this);
          }
          break;

        case 'pagination':
          this._updatePagination();

          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree(this);
          }
          break;

        case 'disable-drag':
          this._updateDragEventListeners();
          break;

        case 'slides-per-view':
          const parsedSlidesPerView = parseInt(newValue, 10);

          // Accept only numbers greater than `1`.
          if (!Number.isFinite(parsedSlidesPerView) ||
              parsedSlidesPerView < 1 ||
              parsedSlidesPerView > this._slides.length) {
            this.slidesPerView = oldValue || 1;
            return;
          }

          this.update();

          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree(this);
          }
          break;

        case 'reduced-motion':
          if (newValue !== null) {
            this._disableWrapperTransitions();
          } else {
            this._enableWrapperTransitions();
          }
          break;
      }
    }

    /**
     * The 0-based index of the selected slide.
     * @type {number}
     * @default 0
     */
    set selected(index) {
      intSetter(this, 'selected', index);
    }

    get selected() {
      return intGetter(this, 'selected');
    }

    /**
     * Whether the slider is looping (e.g wrapping around).
     * @type {boolean}
     * @default false
     */
    set loop(flag) {
      booleanSetter(this, 'loop', flag);
    }

    get loop() {
      return booleanGetter(this, 'loop');
    }

    /**
     * Whether the navigation buttons (prev/next) are shown.
     * @type {boolean}
     * @default false
     */
    set navigation(flag) {
      booleanSetter(this, 'navigation', flag);
    }

    get navigation() {
      return booleanGetter(this, 'navigation');
    }

    /**
     * Whether the pagination indicators are shown.
     * @type {boolean}
     * @default false
     */
    set pagination(flag) {
      booleanSetter(this, 'pagination', flag);
    }

    get pagination() {
      return booleanGetter(this, 'pagination');
    }

    /**
     * If true, the slides can not be dragged with pointer events.
     * @type {boolean}
     * @default false
     */
    set disableDrag(flag) {
      booleanSetter(this, 'disable-drag', flag);
    }

    get disableDrag() {
      return booleanGetter(this, 'disable-drag');
    }

    /**
     * The number of slides seen at once in the slider
     * @type {number}
     * @default 1
     */
    set slidesPerView(index) {
      intSetter(this, 'slides-per-view', index);
    }

    get slidesPerView() {
      return intGetter(this, 'slides-per-view', 1);
    }

    /**
     * If true, disables CSS transitions and drag deceleration.
     * @type {boolean}
     * @default false
     */
    set reducedMotion(flag) {
      booleanSetter(this, 'reduced-motion', flag);
    }

    get reducedMotion() {
      return booleanGetter(this, 'reduced-motion');
    }

    /**
     * If true, newly selected slides will focused automatically. This will likely
     * move the page so that the slide is completely in view.
     * @type {boolean}
     * @default false
     */
    set autoFocus(flag) {
      booleanSetter(this, 'auto-focus', flag);
    }

    get autoFocus() {
      return booleanGetter(this, 'auto-focus');
    }


    // ===========================================================================
    // Layout-related
    // ===========================================================================

    /**
     * Disables CSS transitions on the slide wrapper. Useful when dragging and
     * resizing.
     * @private
     */
    _disableWrapperTransitions() {
      this._transitioning = false;
      this.removeAttribute('transitioning');
      this._slidesWrapper
          .removeEventListener(EVENTS.STANDARD.TRANSITIONEND, this, false);
    }

    /**
     * Enables CSS transitions on the slide wrapper.
     * @private
     */
    _enableWrapperTransitions() {
      // If reduced motion is true, transitions remain disabled.
      if (this.reducedMotion) {
        return;
      }

      // Double rAF is necessary to wait for 'selected' to take effect.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this._transitioning = true;
          this.setAttribute('transitioning', '');
          this._slidesWrapper
              .addEventListener(EVENTS.STANDARD.TRANSITIONEND, this, false);
        });
      });
    }

    /**
     * Computes a few value needed to lay out the UI.
     * @private
     */
    _computeSizes() {
      this._wrapperWidth = this._slidesWrapper.getBoundingClientRect().width;
      this._slidesGap = this._getSlidesGap();
      this._slidesWidth = this._getSlideWidth();
    }

    /**
     * Computes the width of one slide given the layout constraint.
     * @returns {number} The width (in px) of one slide.
     * @private
     */
    _getSlideWidth() {
      return (this._wrapperWidth - (this.slidesPerView - 1) * this._slidesGap) /
          this.slidesPerView;
    }

    /**
     * Computes the slide gap value from CSS.
     * @returns {number} The width (in px) of the gap between slides.
     * @private
     */
    _getSlidesGap() {
      // Check if gap has unitless values (i.e. values ending with a digit).
      if (/\d$/.test(getCSSCustomProperty(this, CSS_PROPS.CAROUSEL.GAP))) {
        console.warn(`Warning: it seems ${CSS_PROPS.CAROUSEL.GAP} has a unitless
value. Add CSS units to its value to avoid breaking the slides layout.`);
      }
      // Getting the computed style because we need a value in px, while
      // the actual CSS property can be declared with any unit.
      const parsedGap = parseInt(getComputedStyle(
          this._slides[0].element)[CSS_PROPS.STANDARD.MARGIN_RIGHT], 10);
      return !Number.isFinite(parsedGap) ? 0 : parsedGap;
    }

    /**
     * Updates the internal CSS variable used to lay out the slides.
     * @private
     */
    _computeSlidesPerViewLayout() {
      // Used to compute the slides's width.
      setCSSCustomProperty(this,
          CSS_PROPS.CAROUSEL.SLIDES_PER_VIEW, `${this.slidesPerView}`);

      // Recompute the index of the last view (aka max value for `selected`).
      this._lastViewIndex = this._infiniteLoop ? this._slides.length - 1 :
          this._computeLastViewIndex();
      // TODO: check if the wrapAround check makes sense. The idea is to not force
      // a new value for selected in case the slider is wrapping around. But
      // probably we need to recompute slide positions and translate to them
      if (!this._infiniteLoop && this.selected > this._lastViewIndex) {
        this.selected = this._lastViewIndex;
      }
    }

    /**
     * Computes how many views there could be if the slider didn't wrap around.
     * @return {number} The index of the last view.
     * @private
     */
    _computeLastViewIndex() {
      return Math.max(0, this._slides.length - this.slidesPerView);
    }


    /**
     * Extracts the slide's data index (i.e. between 0 and this._slides.length -1)
     * from its layoutIndex.
     * @param {number} layoutIndex The slide's layoutIndex
     * @return {number} The slide's data index.
     * @private
     */
    _getSlideDataIndexFromLayoutIndex(layoutIndex) {
      let positiveLayoutIndex = layoutIndex;
      while (positiveLayoutIndex < 0) {
        positiveLayoutIndex += this._slides.length;
      }
      return positiveLayoutIndex % this._slides.length;
    }

    /**
     * Shifts the slides to the new position needed.
     * @param {Array<number>} slidesInViewIndexes Layout indexes of the slides
     * that will be seen during the next slider transition.
     * @param {boolean} [force=false] A value of true forces all slides to update.
     * @private
     */
    _shiftSlides(slidesInViewIndexes, force = false) {
      let dataIndex;
      slidesInViewIndexes.forEach(inViewIndex => {
        if (force ||
            !this._slides.find(slide => slide.layoutIndex === inViewIndex)) {
          // Correctly compute dataIndex also when it's negative.
          dataIndex = this._getSlideDataIndexFromLayoutIndex(inViewIndex);

          this._slides[dataIndex].layoutIndex = inViewIndex;
          this._slides[dataIndex].position =
              this._computeSlidePosition(inViewIndex);
          // Using (dataIndex - inViewIndex) instead of (inViewIndex - dataIndex)
          // to compensate for the "-" in the this._computeSlidePosition function.
          this._slides[dataIndex].element.style.transform = `translateX(${
          this._computeSlidePosition(dataIndex - inViewIndex)}px)`;
        }
      });
    }

    /**
     * Computes the slide's position along the x axis given its index.
     * @param {number} slideIndex
     * @return {number} The view's position (in px).
     * @private
     */
    _computeSlidePosition(slideIndex) {
      return - slideIndex * (this._slidesWidth + this._slidesGap);
    }

    /**
     * Updates the wrapper's translateX property (ie. shows a different view).
     * @param {number} tx The value (in px) for the wrapper's translateX property.
     * @private
     */
    _setWrapperTranslateX(tx) {
      this._slidesWrapper.style.transform = `translate3d(${tx}px, 0, 0)`;
      this._wrapperTranslateX = tx;
    }

    /**
     * Translates the slider to show the target view.
     * @param {number} targetView The view to slide to.
     * @private
     */
    _slideTo(targetView) {
      if (!this._slidesWrapper || this._decelerating) {
        return;
      }

      this._setWrapperTranslateX(this._slides[targetView].position);
    }

    /**
     * Moves the focus to the selected slide.
     * @private
     */
    _focusSelectedSlide() {
      if (!this.autoFocus) {
        return;
      }

      this._slides[this.selected].element.focus();
    }

    /**
     * Updates the `aria-hidden` and `inert` attributes on the slides.
     * @private
     */
    _updateSlidesA11y() {
      const slidesInView = [];
      for (let i = 0; i < this.slidesPerView; i++) {
        slidesInView.push((this.selected + i) % this._slides.length);
      }

      // Set aria-hidden to false only for the slides whose indexes are included
      // in the slidesInView array.
      let isSlideInView;
      this._slides.map(slide => slide.element).forEach((slideEl, slideIndex) => {
        isSlideInView = !isUndefined(slidesInView.find(i => i === slideIndex));
        // Slides in view have `aria-hidden` set to `false`.
        slideEl.setAttribute(ATTRS.STANDARD.ARIA.HIDDEN,
            isSlideInView ? ATTR_VALUES.FALSE : ATTR_VALUES.TRUE);
        // Slides in view don't have the `inert` attribute and can be focused.
        if (isSlideInView) {
          slideEl.removeAttribute(ATTRS.STANDARD.INERT);
          slideEl.setAttribute(ATTRS.STANDARD.TABINDEX, '-1');
        } else {
          slideEl.setAttribute(ATTRS.STANDARD.INERT, '');
        }
      });
    }

    /**
     * Updates the pagination indicators (depending on the current value of
     * `pagination`) to reflect the current number of views and the selected view.
     * @private
     */
    _updatePagination() {
      if (!this.pagination || (this.pagination &&
          this._paginationSlot.assignedNodes().length !==
          this._lastViewIndex + 1)) {
        // Remove all the assignedNodes of pagination slot and their ev listeners
        this._paginationIndicators.forEach(indicatorEl => {
          indicatorEl
              .removeEventListener(EVENTS.PAG_BTN.CLICKED, this);
          this.removeChild(indicatorEl);
        });
        this._paginationIndicators.length = 0;
      }

      if (this.pagination) {
        // Create dom for pagination indicators
        if (this._paginationSlot.assignedNodes().length !==
            this._lastViewIndex + 1) {
          const frag = document.createDocumentFragment();
          for (let i = 0; i <= this._lastViewIndex; i++) {
            const btn = document.createElement(TAGNAMES.PAG_BTN);
            btn.textContent = i;
            btn.setAttribute(ATTRS.STANDARD.SLOT, SLOTNAMES.PAGINATION);
            btn.setAttribute(ATTRS.STANDARD.ARIA.LABEL,
                goToSlideButtonLabel(i));
            btn.addEventListener(EVENTS.PAG_BTN.CLICKED, this);

            frag.appendChild(btn);
            this._paginationIndicators.push(btn);
          }
          this.appendChild(frag);
        }

        // Update `disabled` to highlight the selected slide.
        this._paginationIndicators.forEach((btn, index) => {
          if (index === this.selected) {
            btn.classList.add(CLASSNAMES.PAG_BTN.SELECTED);
          } else {
            btn.classList.remove(CLASSNAMES.PAG_BTN.SELECTED);
          }
        });
      }
    }

    /**
     * Called when any pagination bullet point is selected.
     * @param {Event} e The 'change' event fired by the radio input.
     * @private
     */
    _onPaginationClicked(e) {
      this.selected = parseInt(e.target.textContent, 10);
    }

    /**
     * Creates a navigation button element.
     * @param {string} className The class of the button element.
     * @returns {HTMLButtonElement} The button element.
     * @private
     */
    _createNavigationButton(className) {
      const btn = document.createElement(TAGNAMES.NAV_BTN);
      btn.classList.add(className);
      btn.setAttribute(ATTRS.STANDARD.SLOT, SLOTNAMES.NAVIGATION);
      btn.addEventListener(EVENTS.NAV_BTN.CLICKED, this);
      if (/next/.test(className)) {
        btn.setAttribute(ATTRS.NAV_BTN.FLIPPED, '');
      }
      return btn;
    }

    /**
     * Updates the navigation buttons (prev/next) depending on the value of
     * `navigation`, `loop` and the currently selected view.
     * @private
     */
    _updateNavigation() {
      if (!this.navigation || (this.navigation &&
          this._navigationSlot.assignedNodes().length !== 2)) {
        // remove all navigation slot assigned nodes and their ev listeners
        this._navigationSlot.assignedNodes().forEach(button => {
          button.removeEventListener(EVENTS.NAV_BTN.CLICKED, this);
          this.removeChild(button);
        });

        this._prevButton = undefined;
        this._nextButton = undefined;
      }

      if (this.navigation) {
        if (this._navigationSlot.assignedNodes().length !== 2) {
          // add buttons and add ev listeners
          this._prevButton =
              this._createNavigationButton(CLASSNAMES.NAV_BTN.PREVIOUS);
          this.appendChild(this._prevButton);

          this._nextButton =
              this._createNavigationButton(CLASSNAMES.NAV_BTN.NEXT);
          this.appendChild(this._nextButton);
        }

        // update `disabled`
        this._prevButton.disabled =
            !this.loop && this.selected === 0;
        this._nextButton.disabled =
            !this.loop && this.selected === this._lastViewIndex;

        // update 'aria-label'
        this._prevButton.setAttribute(ATTRS.STANDARD.ARIA.LABEL,
            previousButtonLabel(this.loop, this.selected === 0));
        this._nextButton.setAttribute(ATTRS.STANDARD.ARIA.LABEL,
            nextButtonLabel(this.loop, this.selected === this._lastViewIndex));
      }
    }

    /**
     * Decides whether to wrapAround or not based on the number of views.
     * @private
     */
    _updateInfiniteLoop() {
      // this._computeLastViewIndex() > 1 means that there are at least 2 slides
      // more than the number of slides in view. 2 extra slides are need in
      // order to successfully shift the slides and simulate an infinite loop.
      this._infiniteLoop = this.loop && this._computeLastViewIndex() > 1;
    }


    // ===========================================================================
    // Slides slot
    // ===========================================================================

    /**
     * Gets the elements in the light DOM (assignedNodes() of #slidesSlot).
     * @returns {Array<SlideInfo>} Info about the slides found in #slidesSlot.
     * @private
     */
    _getSlides() {
      // Always use {flatten: true} in order to pick up the fallback content.

      // Remove text nodes (if they are around, they may cause the text content
      // to not be picked up)
      this._slidesSlot.assignedNodes({flatten: true}).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });

      // Get light DOM in #slidesSlot, keep only Element nodes.
      const slideElements = this._slidesSlot.assignedNodes({flatten: true})
          .filter(node => node.nodeType === Node.ELEMENT_NODE);

      // Return an array of SlideInfo object, one per slide found.
      return slideElements.map((node, index) => ({
        element: node,
        layoutIndex: index,
        position: this._computeSlidePosition(index),
      })) || [];
    }

    /**
     * Updates the slider to react to DOM changes in #slidesSlot.
     * @private
     */
    _onSlidesSlotChange() {
      this._slides = this._getSlides();
      this._slides.forEach(slide => {
        if (!slide.element.hasAttribute(ATTRS.STANDARD.TABINDEX)) {
          slide.element.setAttribute(ATTRS.STANDARD.TABINDEX, '-1');
        }

        if (this.getAttribute(ATTRS.STANDARD.ROLE) === ATTR_VALUES.ROLES.LIST) {
          slide.element.setAttribute(ATTRS.STANDARD.ROLE,
              ATTR_VALUES.ROLES.LISTITEM);
        }
      });

      // Getting the value of _lastViewIndex before calling internalUpdate(),
      // as _internalUpdate() will update its value.
      // This is done to avoid a locking situation, e.g. when the carousel is
      // initialised, selected wouldn't be assigned because of _lastViewIndex
      // still being -1. When we parse the slides from the slot, we can compute
      // _lastViewIndex, and then we can force an update on selected.
      const shouldForceSelectedUpdate = this._slides.length > 0 &&
          this._lastViewIndex === -1;

      // Calling internalUpdate instead of update, to avoid race conditions
      // (update is debounced). This is because the number of slides is
      // essential for computing the remaining internal values.
      this._internalUpdate();

      // See a few lines above.
      if (shouldForceSelectedUpdate) {
        this.selected = this.selected;
      }
    }


    // ===========================================================================
    // aria-live region
    // ===========================================================================
    /**
     * Updates the aria-live region, used to notify screen readers.
     * @private
     */
    _updateAriaLiveDom() {
      return
      if (this._ariaSlot.assignedNodes().length !== 1) {
        this._ariaLiveRegion = document.createElement('div');
        this._ariaLiveRegion.setAttribute(ATTRS.STANDARD.SLOT, SLOTNAMES.ARIA);
        this._ariaLiveRegion.setAttribute(ATTRS.STANDARD.ARIA.LIVE,
            ATTR_VALUES.ARIA_LIVE.POLITE);
        this._ariaLiveRegion.setAttribute(ATTRS.STANDARD.ARIA.ATOMIC,
            ATTR_VALUES.TRUE);
        this.appendChild(this._ariaLiveRegion);
      }

      const firstSlideIndex = this._slides[this.selected].layoutIndex;
      this._ariaLiveRegion.textContent = slidesStatusCaption(
          firstSlideIndex, this._slides.length, this.slidesPerView);
    }


    // ===========================================================================
    // Pointer events + drag
    // ===========================================================================

    /**
     * Add/remove event listeners for pointer interactions.
     * @private
     */
    _updateDragEventListeners() {
      if (this.disableDrag) {
        this._externalWrapper
            .removeEventListener(EVENTS.STANDARD.TOUCHSTART, this);
        this._externalWrapper
            .removeEventListener(EVENTS.STANDARD.MOUSEDOWN, this);
      } else {
        this._externalWrapper.addEventListener(EVENTS.STANDARD.TOUCHSTART, this,
            getEvtListenerOptions(true));
        this._externalWrapper.addEventListener(EVENTS.STANDARD.MOUSEDOWN, this,
            getEvtListenerOptions(true));
      }
    }

    /**
     * Begins to track pointer events in order to drag the wrapper.
     * @param {NormalisedPointerEvent} e The normalised pointer event.
     * @private
     */
    _onPointerDown(e) {
      if (!this._isPointerActive) {
        this._decelerating = false;
        this._isPointerActive = true;
        this._pointerId = e.id;
        this._pointerFirstX = this._pointerLastX = this._pointerCurrentX = e.x;
        this._pointerFirstY = this._pointerLastY = this._pointerCurrentY = e.y;
        this._lastDraggedLayoutIndex = this._slides[this.selected].layoutIndex;

        this._trackingPoints = [];
        this._addTrackingPoint(this._pointerLastX);

        window.addEventListener(EVENTS.STANDARD.TOUCHMOVE, this,
            getEvtListenerOptions(false));
        window.addEventListener(EVENTS.STANDARD.MOUSEMOVE, this,
            getEvtListenerOptions(false));
        window.addEventListener(EVENTS.STANDARD.MOUSEUP, this);
        window.addEventListener(EVENTS.STANDARD.TOUCHEND, this);
        window.addEventListener(EVENTS.STANDARD.TOUCHCANCEL, this);
      }
    }

    /**
     * Tracks the pointer movement and reflects it to the UI.
     * @param {NormalisedPointerEvent} e The normalised pointer event.
     * @private
     */
    _onPointerMove(e) {
      // Checking the pointer id avoids running the same code twice
      // in case of touch screens.
      if (this._isPointerActive && e.id === this._pointerId) {
        // Always update the current value of the pointer.
        // Once per frame, it gets consumed and becomes the last value.
        this._pointerCurrentX = e.x;
        this._pointerCurrentY = e.y;

        const dX = Math.abs(this._pointerCurrentX - this._pointerFirstX);
        const dY = Math.abs(this._pointerCurrentY - this._pointerFirstY);

        // If dragging horizontally.
        if (dX / dY > _dragAngleAllowance ||
            dY === 0 ||
            (dY > dX && dY - dX < _dragDistanceAllowance)) {
          e.event.preventDefault();

          this._addTrackingPoint(this._pointerLastX);
          this._disableWrapperTransitions();
          this._requestDragTick();
        } else {
          // If dragging vertically.
          this._stopPointerTracking();
        }
      }
    }

    /**
     * Stops the pointer tracking.
     * @param {NormalisedPointerEvent} e The normalised pointer event.
     * @private
     */
    _onPointerEnd(e) {
      if (this._isPointerActive && e.id === this._pointerId) {
        this._stopPointerTracking();
      }
    }

    /**
     * Stops the tracking of pointer events, resets the dragging logic,
     * and possibly starts the deceleration.
     * @private
     */
    _stopPointerTracking() {
      this._isPointerActive = false;
      this._pointerId = undefined;

      this._addTrackingPoint(this._pointerLastX);

      window.removeEventListener(EVENTS.STANDARD.TOUCHMOVE, this);
      window.removeEventListener(EVENTS.STANDARD.MOUSEMOVE, this);
      window.removeEventListener(EVENTS.STANDARD.TOUCHEND, this);
      window.removeEventListener(EVENTS.STANDARD.MOUSEUP, this);
      window.removeEventListener(EVENTS.STANDARD.TOUCHCANCEL, this);

      this._startDecelerating();
    }

    /**
     * Stores the last 100ms worth of tracking data from pointer events.
     * @param {number} x The x coordinate value to store.
     * @private
     */
    _addTrackingPoint(x) {
      const time = Date.now();
      // Keep only data from the last 100ms
      while (this._trackingPoints.length > 0) {
        if (time - this._trackingPoints[0].time <= 100) {
          break;
        }
        this._trackingPoints.shift();
      }

      this._trackingPoints.push({x, time});
    }

    /**
     * Updates the UI once per animation frame.
     * @private
     */
    _requestDragTick() {
      if (!this._dragTicking) {
        requestAnimationFrame(this._updateDragPosition.bind(this));
      }
      this._dragTicking = true;
    }

    /**
     * Updates the UI while the user is dragging the slides.
     * @private
     */
    _updateDragPosition() {
      // Current position + the amount of drag happened since the last rAF.
      const newPosition = this._wrapperTranslateX +
          this._pointerCurrentX - this._pointerLastX;

      // Get the slide that we're dragging onto.
      let slideIndex;
      let slidePosition;
      this._slides.forEach((slideObj, index) => {
        if (slideObj.position >= newPosition &&
            (isUndefined(slidePosition) || slideObj.position < slidePosition)) {
          slidePosition = slideObj.position;
          slideIndex = index;
        }
      });

      if (this._infiniteLoop) {
        let firstLayoutIndex;

        // Sometimes there's no slide to the left of the current one - in that
        // case, slideIndex would be undefined.
        if (isUndefined(slideIndex)) {
          // Get the leftmost slide - the one we just left to the pointer's right.
          const leftMostSlide = this._slides.slice(0)
              .sort((a, b) => a.layoutIndex > b.layoutIndex)[0];
          // Compute the slideIndex as a valid index for this._slides.
          slideIndex = leftMostSlide.layoutIndex - 1;
          while (slideIndex < 0) {
            slideIndex += this._slides.length;
          }
          slideIndex = slideIndex % this._slides.length;
          // Compute firstLayoutIndex.
          firstLayoutIndex = leftMostSlide.layoutIndex - 2;
        } else {
          // If slideIndex is defined, firstLayoutIndex is easy to compute.
          firstLayoutIndex = this._slides[slideIndex].layoutIndex - 1;
        }

        // Updated (shift) slides.
        const slidesToShift = [];
        const lastLayoutIndex = firstLayoutIndex + this.slidesPerView + 2;
        for (let i = firstLayoutIndex; i < lastLayoutIndex; i++) {
          slidesToShift.push(i);
        }
        this._shiftSlides(slidesToShift);
      } else {
        // When _infiniteLoop is disabled, if we drag to the left of the first
        // slide, the algorithm can't find a value for slideIndex (as indexes
        // don't go negative in that case).
        slideIndex = slideIndex || 0;
      }

      this._lastDraggedLayoutIndex = this._slides[slideIndex].layoutIndex;

      this._setWrapperTranslateX(newPosition);

      this._pointerLastX = this._pointerCurrentX;
      this._pointerLastY = this._pointerCurrentY;
      this._dragTicking = false;
    }

    /**
     * Computes the initial parameters of the deceleration.
     * @private
     */
    _startDecelerating() {
      this._decelerating = true;

      const lastPoint = this._trackingPoints[this._trackingPoints.length - 1];
      const firstPoint = this._trackingPoints[0];
      const diffX = (lastPoint.x - firstPoint.x) || 0;

      this._selectedIteration =
          Math.floor(this._lastDraggedLayoutIndex / this._slides.length);

      const currentSlideIndex =
          this._getSlideDataIndexFromLayoutIndex(this._lastDraggedLayoutIndex);

      let newSelected;

      if (diffX === 0) {
        this._decelVelocity = 0;

        // If the user's pointer was not moving, pick the new selected slide
        // based on the pointer's position.
        // Because currentSlideIndex is the slide the pointer is currently onto,
        // distToCurrent is always going to be positive.
        const distToCurrent = this._slides[currentSlideIndex].position -
            this._wrapperTranslateX;
        newSelected = distToCurrent > this._slidesWidth / 2 ?
            this._computeNext(currentSlideIndex) : currentSlideIndex;
      } else {
        this._decelVelocity = clampAbs(diffX,
            this._minDecelVelocity, this._maxDecelVelocity);

        let slidesToMove = 1;

        // In case the velocity is quite high, move by an additional
        // number of slides.
        const thresholdStep = this._wrapperWidth * _velocityThresholdFactor;
        while (Math.abs(diffX) > thresholdStep * slidesToMove &&
            slidesToMove < this.slidesPerView + _velocityMaxAdditionalSlides) {
          slidesToMove += 1;
        }

        // If dragging left, we subtract 1 to slidesToMove, as the current slide
        // would already be a previous slide with respect to where we started
        // dragging from.
        if (diffX > 0) {
          slidesToMove -= 1;
        }

        // Finally, apply next/prev for [slidesToMove] times and set the new value
        // of selected.
        let targetSlide = currentSlideIndex;
        for (let i = 0; i < slidesToMove; i++) {
          targetSlide = diffX < 0 ? this._computeNext(targetSlide) :
              this._computePrevious(targetSlide);
        }
        newSelected = targetSlide;
      }

      // Clamping to ensure that `selected` stays into its allowed values.
      this.selected = clamp(newSelected, 0, this._lastViewIndex);

      requestAnimationFrame(this._decelerationStep.bind(this));
    }

    /**
     * Animates the slider while updating the deceleration velocity.
     * @private
     */
    _decelerationStep() {
      if (!this._decelerating) {
        return;
      }

      const snapX = this._slides[this.selected].position;

      // Apply attraction: it moves the slider towards the target.
      // Attraction is bigger when the slide is further away.
      this._decelVelocity += this._attraction * (snapX - this._wrapperTranslateX);
      // Apply friction: friction slows down the slider.
      this._decelVelocity *= this._friction;

      const newPosition = this._wrapperTranslateX + this._decelVelocity;

      // Keep animating until the carousel is close to the snapping point
      // with a very small velocity. This results in a springy effect.
      // Do not animate if the reduced-motion mode is enabled.
      const tooFarOrTooFast = Math.abs(snapX - newPosition) >= 1 ||
          Math.abs(this._decelVelocity) >= 1;
      if (tooFarOrTooFast && !this.reducedMotion) {
        this._setWrapperTranslateX(newPosition);
        requestAnimationFrame(this._decelerationStep.bind(this));
      } else {
        this._setWrapperTranslateX(snapX);
        this._decelerating = false;
        this._enableWrapperTransitions();

        requestAnimationFrame(() => {
          this._updateSlidesA11y();
          this._focusSelectedSlide();
          this._updateAriaLiveDom();
        });
      }
    }
  }

  window.customElements.define(TAGNAMES.CAROUSEL, MacroCarousel);

  /**
   * A generic button.
   */
  class MacroCarouselButton extends HTMLElement {
    /**
     * Creates a new instance of MacroCarousel.
     * @constructor
     */
    constructor() {
      /*
       * Runs anytime a new instance is created (in HTML or JS).
       * The construtor is a good place to create shadow DOM, though you should
       * avoid touching any attributes or light DOM children as they may not
       * be available yet.
       */
      super();

      // Get the template property on the actual instance
      // (and not on the MacroCarouselButton class).
      const template = Object.getPrototypeOf(this).constructor.template;
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * `connectedCallback()` fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     */
    connectedCallback() {
      // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
      // because if you shim Custom Properties (CSS variables) the element
      // will need access to its parent node.
      if (window.ShadyCSS) {
        window.ShadyCSS.styleElement(this);
      }

      this._defaultTabIndex = 0;

      if (!this.hasAttribute(ATTRS.STANDARD.ROLE)) {
        this.setAttribute(ATTRS.STANDARD.ROLE, ATTR_VALUES.ROLES.BUTTON);
      }

      if (!this.hasAttribute(ATTRS.STANDARD.TABINDEX)) {
        this.setAttribute(ATTRS.STANDARD.TABINDEX, this._defaultTabIndex);
      } else {
        this._defaultTabIndex = this.getAttribute(ATTRS.STANDARD.TABINDEX);
      }

      this._upgradeProperty(ATTRS.STANDARD.DISABLED);

      this.addEventListener(EVENTS.STANDARD.KEYDOWN, this);
      this.addEventListener(EVENTS.STANDARD.CLICK, this);
    }

    /**
     * Used for upgrading properties in case this element is upgraded lazily.
     * See web/fundamentals/architecture/building-components/best-practices#lazy-properties
     * @param {*} prop
     * @private
     */
    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    /**
     * An array of the observed attributes.
     * @static
     */
    static get observedAttributes() {
      return [
        ATTRS.STANDARD.DISABLED,
      ];
    }

    /**
     * Whether the button is disabled.
     * @type {boolean}
     * @default false
     */
    set disabled(flag) {
      booleanSetter(this, ATTRS.STANDARD.DISABLED, flag);
    }

    get disabled() {
      return booleanGetter(this, ATTRS.STANDARD.DISABLED);
    }

    /**
     * Called whenever an observedAttribute's value changes.
     * @param {string} name The attribute's local name.
     * @param {*} oldValue The attribute's previous value.
     * @param {*} newValue The attribute's new value.
     * @private
     */
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case ATTRS.STANDARD.DISABLED:
          if (oldValue === newValue) {
            return;
          }

          if (this.disabled) {
            this._defaultTabIndex = this.getAttribute(ATTRS.STANDARD.TABINDEX);
            this.removeAttribute(ATTRS.STANDARD.TABINDEX);
            this.setAttribute(ATTRS.STANDARD.ARIA.DISABLED, ATTR_VALUES.TRUE);
          } else {
            this.setAttribute(ATTRS.STANDARD.TABINDEX, this._defaultTabIndex);
            this.setAttribute(ATTRS.STANDARD.ARIA.DISABLED, ATTR_VALUES.FALSE);
          }
          break;
      }
    }

    /**
     * Defining handleEvent allows to pass `this` as the callback to every
     * `addEventListener` and `removeEventListener`. This avoids the need of
     * binding every function. See
     * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
     *
     * @param {Event} e Any event.
     * @private
     */
    handleEvent(e) {
      if (this.disabled) {
        e.preventDefault();
        return;
      }

      // Click
      if (e.type === EVENTS.STANDARD.CLICK) {
        this._onClick && this._onClick();

      // Space / Enter
      } else if (e.type === EVENTS.STANDARD.KEYDOWN &&
          (e.keyCode === KEYCODES.SPACE || e.keyCode === KEYCODES.ENTER)) {
        // preventDefault called to avoid page scroll when hitting spacebar.
        e.preventDefault();
        this._onClick && this._onClick();
      }
    }
  }

  var buttonHtml = "<div class=\"content\">\n  <div class=\"bg\"></div>\n  <div class=\"icon\"></div>\n</div>\n";

  var css$1 = "/*******************************************************************************\n  Host and CSS properties\n*******************************************************************************/\n\n:host {\n  --macro-carousel-navigation-color: #000;\n  --macro-carousel-navigation-color-focus: var(--macro-carousel-navigation-color);\n  --macro-carousel-navigation-color-background: transparent;\n  --macro-carousel-navigation-color-background-focus: #f0f0f0;\n  --macro-carousel-navigation-button-size: 48px;\n  --macro-carousel-navigation-icon-size: 24px;\n  --macro-carousel-navigation-icon-mask: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E %3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E %3C/svg%3E\");\n\n  position: relative;\n\n  display: -webkit-inline-box;\n\n  display: -ms-inline-flexbox;\n\n  display: inline-flex;\n  min-width: var(--macro-carousel-navigation-button-size);\n  min-height: var(--macro-carousel-navigation-button-size);\n\n  border-radius: 50%;\n\n  overflow: hidden;\n\n  cursor: pointer;\n\n  contain: paint;\n}\n\n:host([disabled]) {\n  opacity: .2;\n}\n\n.content,\n.bg {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n\n  background-color: var(--macro-carousel-navigation-color-background);\n}\n\n/*\n * bg colored circle.\n */\n.bg {\n  z-index: 0;\n\n  background-color: var(--macro-carousel-navigation-color-background-focus);\n\n  opacity: 0;\n\n  will-change: opacity;\n}\n\n.icon {\n  position: relative;\n\n  z-index: 1;\n\n  width: var(--macro-carousel-navigation-icon-size);\n  height: var(--macro-carousel-navigation-icon-size);\n\n  /*\n   * Fallback for when mask-image is not supported:\n   * using the SVG as a background. Only issue, the icon color\n   * won't change.\n  */\n  color: var(--macro-carousel-navigation-color);\n\n  background: var(--macro-carousel-navigation-icon-mask);\n}\n\n@supports ((-webkit-mask-image: var(--macro-carousel-navigation-icon-mask)) or (mask-image: var(--macro-carousel-navigation-icon-mask))) {\n  .icon {\n    background: var(--macro-carousel-navigation-color);\n\n    /* References:\n    * - https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image\n    * - https://codepen.io/tigt/post/optimizing-svgs-in-data-uris\n    */\n    -webkit-mask-image: var(--macro-carousel-navigation-icon-mask);\n            mask-image: var(--macro-carousel-navigation-icon-mask);\n  }\n}\n\n:host([flipped]) .icon {\n  -webkit-transform: rotateZ(180deg);\n          transform: rotateZ(180deg);\n}\n\n/*\n * Show the bg circle when the button is not disabled and is hovered, active,\n * focused or keyboard-focused (thanks to the focus-visible polyfill).\n */\n:host(:hover:not([disabled])) .bg,\n:host(:active:not([disabled])) .bg,\n:host(:focus:not([disabled])) .bg,\n:host(.focus-visible) .bg {\n  opacity: 1;\n}\n\n/*\n * Do not show the bg circle if the button is focused (but not active or not hovered)\n * and doesn't have a focused-visible class. This means, do not leave the bg showing\n * after the user clicks on the button.\n */\n:host-context(.js-focus-visible):host(:focus:not(:active):not(:hover):not(.focus-visible)) .bg {\n  opacity: 0;\n}\n\n@supports ((-webkit-mask-image: var(--macro-carousel-navigation-icon-mask)) or (mask-image: var(--macro-carousel-navigation-icon-mask))) {\n  /*\n   * Same as rules above, but for the icon's color.\n   */\n  :host(:hover:not([disabled])) .icon,\n  :host(:active:not([disabled])) .icon,\n  :host(:focus:not([disabled])) .icon,\n  :host(.focus-visible) .icon {\n    background: var(--macro-carousel-navigation-color-focus);\n  }\n\n  :host-context(.js-focus-visible):host(:focus:not(:active):not(:hover):not(.focus-visible)) .icon {\n    background: var(--macro-carousel-navigation-color);\n  }\n}\n";

  const buttonTmpl = document.createElement('template');
  buttonTmpl.innerHTML = `<style>${css$1}</style> ${buttonHtml}`;

  if (window.ShadyCSS) {
    window.ShadyCSS.prepareTemplate(buttonTmpl, TAGNAMES.NAV_BTN);
  }

  /**
   * A navigation button.
   */
  class MacroCarouselNavButton extends MacroCarouselButton {
    static get template() {
      return buttonTmpl;
    }

    /**
     * Fired when the button is clicked / pressed.
     * @event MacroCarouselNavButton#macro-carousel-nav-button-clicked
     * @type {Object}
     */

    /**
     * Called when the button is clicked / pressed.
     * @fires MacroCarouselNavButton#macro-carousel-nav-button-clicked
     * @private
     */
    _onClick() {
      this.dispatchEvent(new CustomEvent(EVENTS.NAV_BTN.CLICKED));
    }
  }

  window.customElements.define(TAGNAMES.NAV_BTN, MacroCarouselNavButton);

  var indicatorHtml = "<div class=\"bg\"></div>\n<div class=\"fg\"></div>\n";

  var css$2 = "/*******************************************************************************\n  Host and CSS properties\n*******************************************************************************/\n\n:host {\n  --macro-carousel-pagination-color: #999;\n  --macro-carousel-pagination-color-selected: #000;\n  --macro-carousel-pagination-size-clickable: 24px;\n  --macro-carousel-pagination-size-dot: 8px;\n  --macro-carousel-pagination-border: 1px solid var(--macro-carousel-pagination-color);\n  --macro-carousel-pagination-border-selected: 1px solid var(--macro-carousel-pagination-color-selected);\n\n  position: relative;\n\n  display: -webkit-inline-box;\n\n  display: -ms-inline-flexbox;\n\n  display: inline-flex;\n\n  width: var(--macro-carousel-pagination-size-clickable);\n  height: var(--macro-carousel-pagination-size-clickable);\n\n  border-radius: 50%;\n\n  overflow: hidden;\n\n  cursor: pointer;\n\n  contain: paint;\n}\n\n.bg,\n.fg {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n\n  -webkit-transform: translate(-50%, -50%);\n\n          transform: translate(-50%, -50%);\n\n  display: block;\n\n  width: var(--macro-carousel-pagination-size-dot);\n  height: var(--macro-carousel-pagination-size-dot);\n\n  border-radius: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n\n  background-color: var(--macro-carousel-pagination-color);\n\n  content: '';\n}\n\n.bg {\n  -webkit-transform: translate(-50%, -50%) scale(2);\n          transform: translate(-50%, -50%) scale(2);\n\n  opacity: 0;\n\n  will-change: opacity;\n}\n\n.fg {\n  border: var(--macro-carousel-pagination-border);\n}\n\n:host(:hover) .bg,\n:host(.focus-visible) .bg {\n  opacity: .2;\n}\n\n:host(.selected) .fg {\n  background-color: var(--macro-carousel-pagination-color-selected);\n  border: var(--macro-carousel-pagination-border-selected);\n}\n\n";

  const paginationTmpl = document.createElement('template');
  paginationTmpl.innerHTML = `<style>${css$2}</style> ${indicatorHtml}`;

  if (window.ShadyCSS) {
    window.ShadyCSS.prepareTemplate(paginationTmpl, TAGNAMES.PAG_BTN);
  }

  /**
   * A pagination indicator button.
   */
  class MacroCarouselPaginationIndicator extends MacroCarouselButton {
    static get template() {
      return paginationTmpl;
    }

    /**
     * Fired when the button is clicked / pressed.
     * @event MacroCarouselPaginationIndicator#macro-carousel-pagination-indicator-clicked
     * @type {Object}
     */

    /**
     * Called when the button is clicked / pressed.
     * @fires MacroCarouselPaginationIndicator#macro-carousel-pagination-indicator-clicked
     * @private
     */
    _onClick() {
      this.dispatchEvent(new CustomEvent(EVENTS.PAG_BTN.CLICKED));
    }
  }

  window.customElements.define(TAGNAMES.PAG_BTN,
      MacroCarouselPaginationIndicator);

}());
