/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  const e = {};
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let i = (e, t = 500, i = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = i ? `${i}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !i),
            !i && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !i && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } }),
            );
        }, t));
    },
    s = (e, t = 500, i = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          i && e.style.removeProperty("height");
        let s = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = s + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } }),
              );
          }, t);
      }
    },
    o = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? n(e) : a(e);
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (o) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (o) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, e);
      }
    };
  function l(e, t) {
    const i = Array.from(e).filter(function (e, i, s) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (i.length) {
      const e = [];
      i.forEach((i) => {
        const s = {},
          o = i.dataset[t].split(",");
        (s.value = o[0]),
          (s.type = o[1] ? o[1].trim() : "max"),
          (s.item = i),
          e.push(s);
      });
      let s = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      s = (function (e) {
        return e.filter(function (e, t, i) {
          return i.indexOf(e) === t;
        });
      })(s);
      const o = [];
      if (s.length)
        return (
          s.forEach((t) => {
            const i = t.split(","),
              s = i[1],
              r = i[2],
              n = window.matchMedia(i[0]),
              a = e.filter(function (e) {
                if (e.value === s && e.type === r) return !0;
              });
            o.push({ itemsArray: a, matchMedia: n });
          }),
          o
        );
    }
  }
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${i}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          o &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        i = Array.prototype.slice.call(t),
        s = i.indexOf(document.activeElement);
      e.shiftKey && 0 === s && (i[i.length - 1].focus(), e.preventDefault()),
        e.shiftKey || s !== i.length - 1 || (i[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[Попапос]: ${e}`);
    }
  })({});
  let d = {
    getErrors(e) {
      let t = 0,
        i = e.querySelectorAll("*[data-required]");
      return (
        i.length &&
          i.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let i = t.querySelectorAll("input,textarea");
          for (let e = 0; e < i.length; e++) {
            const t = i[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              d.removeError(t);
          }
          let s = t.querySelectorAll(".checkbox__input");
          if (s.length > 0)
            for (let e = 0; e < s.length; e++) {
              s[e].checked = !1;
            }
          if (e.select) {
            let i = t.querySelectorAll(".select");
            if (i.length)
              for (let t = 0; t < i.length; t++) {
                const s = i[t].querySelector("select");
                e.select.selectBuild(s);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function c(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function u(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((i) => {
        void 0 === e[i]
          ? (e[i] = t[i])
          : c(t[i]) && c(e[i]) && Object.keys(t[i]).length > 0 && u(e[i], t[i]);
      });
  }
  const p = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function h() {
    const e = "undefined" != typeof document ? document : {};
    return u(e, p), e;
  }
  const g = {
    document: p,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function m() {
    const e = "undefined" != typeof window ? window : {};
    return u(e, g), e;
  }
  function f(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function v() {
    return Date.now();
  }
  function y(e, t) {
    void 0 === t && (t = "x");
    const i = m();
    let s, o, r;
    const n = (function (e) {
      const t = m();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((o = n.transform || n.webkitTransform),
          o.split(",").length > 6 &&
            (o = o
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new i.WebKitCSSMatrix("none" === o ? "" : o)))
        : ((r =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (s = r.toString().split(","))),
      "x" === t &&
        (o = i.WebKitCSSMatrix
          ? r.m41
          : 16 === s.length
            ? parseFloat(s[12])
            : parseFloat(s[4])),
      "y" === t &&
        (o = i.WebKitCSSMatrix
          ? r.m42
          : 16 === s.length
            ? parseFloat(s[13])
            : parseFloat(s[5])),
      o || 0
    );
  }
  function b(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function w() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const o = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (
        null != o &&
        ((i = o),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? i instanceof HTMLElement
          : i && (1 === i.nodeType || 11 === i.nodeType)))
      ) {
        const i = Object.keys(Object(o)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, s = i.length; t < s; t += 1) {
          const s = i[t],
            r = Object.getOwnPropertyDescriptor(o, s);
          void 0 !== r &&
            r.enumerable &&
            (b(e[s]) && b(o[s])
              ? o[s].__swiper__
                ? (e[s] = o[s])
                : w(e[s], o[s])
              : !b(e[s]) && b(o[s])
                ? ((e[s] = {}), o[s].__swiper__ ? (e[s] = o[s]) : w(e[s], o[s]))
                : (e[s] = o[s]));
        }
      }
    }
    var i;
    return e;
  }
  function S(e, t, i) {
    e.style.setProperty(t, i);
  }
  function T(e) {
    let { swiper: t, targetPosition: i, side: s } = e;
    const o = m(),
      r = -t.translate;
    let n,
      a = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      o.cancelAnimationFrame(t.cssModeFrameID);
    const d = i > r ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      u = () => {
        (n = new Date().getTime()), null === a && (a = n);
        const e = Math.max(Math.min((n - a) / l, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let p = r + d * (i - r);
        if ((c(p, i) && (p = i), t.wrapperEl.scrollTo({ [s]: p }), c(p, i)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [s]: p });
            }),
            void o.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = o.requestAnimationFrame(u);
      };
    u();
  }
  function x(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function E(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function C(e, t) {
    void 0 === t && (t = []);
    const i = document.createElement(e);
    return (
      i.classList.add(
        ...(Array.isArray(t)
          ? t
          : (function (e) {
              return (
                void 0 === e && (e = ""),
                e
                  .trim()
                  .split(" ")
                  .filter((e) => !!e.trim())
              );
            })(t)),
      ),
      i
    );
  }
  function I(e, t) {
    return m().getComputedStyle(e, null).getPropertyValue(t);
  }
  function L(e) {
    let t,
      i = e;
    if (i) {
      for (t = 0; null !== (i = i.previousSibling); )
        1 === i.nodeType && (t += 1);
      return t;
    }
  }
  function M(e, t, i) {
    const s = m();
    return i
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let O, P, A;
  function _() {
    return (
      O ||
        (O = (function () {
          const e = m(),
            t = h();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      O
    );
  }
  function k(e) {
    return (
      void 0 === e && (e = {}),
      P ||
        (P = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const i = _(),
            s = m(),
            o = s.navigator.platform,
            r = t || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            a = s.screen.width,
            l = s.screen.height,
            d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = r.match(/(iPad).*OS\s([\d_]+)/);
          const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === o;
          let g = "MacIntel" === o;
          return (
            !c &&
              g &&
              i.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${l}`) >= 0 &&
              ((c = r.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (g = !1)),
            d && !h && ((n.os = "android"), (n.android = !0)),
            (c || p || u) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      P
    );
  }
  function z() {
    return (
      A ||
        (A = (function () {
          const e = m();
          let t = !1;
          function i() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (i()) {
            const i = String(e.navigator.userAgent);
            if (i.includes("Version/")) {
              const [e, s] = i
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && s < 2);
            }
          }
          return {
            isSafari: t || i(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      A
    );
  }
  var D = {
    on(e, t, i) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof t) return s;
      const o = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][o](t);
        }),
        s
      );
    },
    once(e, t, i) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof t) return s;
      function o() {
        s.off(e, o), o.__emitterProxy && delete o.__emitterProxy;
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
          r[n] = arguments[n];
        t.apply(s, r);
      }
      return (o.__emitterProxy = t), s.on(e, o, i);
    },
    onAny(e, t) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof e) return i;
      const s = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return !i.eventsListeners || i.destroyed
        ? i
        : i.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (i.eventsListeners[e] = [])
                : i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach((s, o) => {
                    (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                      i.eventsListeners[e].splice(o, 1);
                  });
            }),
            i)
          : i;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, i, s;
      for (var o = arguments.length, r = new Array(o), n = 0; n < o; n++)
        r[n] = arguments[n];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (i = r.slice(1, r.length)), (s = e))
        : ((t = r[0].events), (i = r[0].data), (s = r[0].context || e)),
        i.unshift(s);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(s, [t, ...i]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(s, i);
              });
        }),
        e
      );
    },
  };
  const G = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const i = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (i) {
        let t = i.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (i.shadowRoot
            ? (t = i.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                i.shadowRoot &&
                  ((t = i.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    V = (e, t) => {
      if (!e.slides[t]) return;
      const i = e.slides[t].querySelector('[loading="lazy"]');
      i && i.removeAttribute("loading");
    },
    B = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const i = e.slides.length;
      if (!i || !t || t < 0) return;
      t = Math.min(t, i);
      const s =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        o = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const i = o,
          r = [i - t];
        return (
          r.push(...Array.from({ length: t }).map((e, t) => i + s + t)),
          void e.slides.forEach((t, i) => {
            r.includes(t.column) && V(e, i);
          })
        );
      }
      const r = o + s - 1;
      if (e.params.rewind || e.params.loop)
        for (let s = o - t; s <= r + t; s += 1) {
          const t = ((s % i) + i) % i;
          (t < o || t > r) && V(e, t);
        }
      else
        for (let s = Math.max(o - t, 0); s <= Math.min(r + t, i - 1); s += 1)
          s !== o && (s > r || s < o) && V(e, s);
    };
  var F = {
    updateSize: function () {
      const e = this;
      let t, i;
      const s = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : s.clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : s.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(I(s, "padding-left") || 0, 10) -
            parseInt(I(s, "padding-right") || 0, 10)),
          (i =
            i -
            parseInt(I(s, "padding-top") || 0, 10) -
            parseInt(I(s, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, i) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(i)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: s,
          slidesEl: o,
          size: r,
          rtlTranslate: n,
          wrongRTL: a,
        } = e,
        l = e.virtual && i.virtual.enabled,
        d = l ? e.virtual.slides.length : e.slides.length,
        c = x(o, `.${e.params.slideClass}, swiper-slide`),
        u = l ? e.virtual.slides.length : c.length;
      let p = [];
      const h = [],
        g = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let f = i.slidesOffsetAfter;
      "function" == typeof f && (f = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        y = e.slidesGrid.length;
      let b = i.spaceBetween,
        w = -m,
        T = 0,
        E = 0;
      if (void 0 === r) return;
      "string" == typeof b && b.indexOf("%") >= 0
        ? (b = (parseFloat(b.replace("%", "")) / 100) * r)
        : "string" == typeof b && (b = parseFloat(b)),
        (e.virtualSize = -b),
        c.forEach((e) => {
          n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (S(s, "--swiper-centered-offset-before", ""),
          S(s, "--swiper-centered-offset-after", ""));
      const C = i.grid && i.grid.rows > 1 && e.grid;
      let L;
      C ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const O =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let s = 0; s < u; s += 1) {
        let o;
        if (
          ((L = 0),
          c[s] && (o = c[s]),
          C && e.grid.updateSlide(s, o, c),
          !c[s] || "none" !== I(o, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            O && (c[s].style[e.getDirectionLabel("width")] = "");
            const r = getComputedStyle(o),
              n = o.style.transform,
              a = o.style.webkitTransform;
            if (
              (n && (o.style.transform = "none"),
              a && (o.style.webkitTransform = "none"),
              i.roundLengths)
            )
              L = e.isHorizontal() ? M(o, "width", !0) : M(o, "height", !0);
            else {
              const e = t(r, "width"),
                i = t(r, "padding-left"),
                s = t(r, "padding-right"),
                n = t(r, "margin-left"),
                a = t(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) L = e + n + a;
              else {
                const { clientWidth: t, offsetWidth: r } = o;
                L = e + i + s + n + a + (r - t);
              }
            }
            n && (o.style.transform = n),
              a && (o.style.webkitTransform = a),
              i.roundLengths && (L = Math.floor(L));
          } else
            (L = (r - (i.slidesPerView - 1) * b) / i.slidesPerView),
              i.roundLengths && (L = Math.floor(L)),
              c[s] && (c[s].style[e.getDirectionLabel("width")] = `${L}px`);
          c[s] && (c[s].swiperSlideSize = L),
            g.push(L),
            i.centeredSlides
              ? ((w = w + L / 2 + T / 2 + b),
                0 === T && 0 !== s && (w = w - r / 2 - b),
                0 === s && (w = w - r / 2 - b),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                E % i.slidesPerGroup == 0 && p.push(w),
                h.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                  e.params.slidesPerGroup ==
                  0 && p.push(w),
                h.push(w),
                (w = w + L + b)),
            (e.virtualSize += L + b),
            (T = L),
            (E += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + f),
        n &&
          a &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (s.style.width = `${e.virtualSize + b}px`),
        i.setWrapperSize &&
          (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + b}px`),
        C && e.grid.updateWrapperSize(L, p),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < p.length; s += 1) {
          let o = p[s];
          i.roundLengths && (o = Math.floor(o)),
            p[s] <= e.virtualSize - r && t.push(o);
        }
        (p = t),
          Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
            p.push(e.virtualSize - r);
      }
      if (l && i.loop) {
        const t = g[0] + b;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup,
            ),
            o = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) p.push(p[p.length - 1] + o);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && p.push(p[p.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === p.length && (p = [0]), 0 !== b)) {
        const t =
          e.isHorizontal() && n
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${b}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        g.forEach((t) => {
          e += t + (b || 0);
        }),
          (e -= b);
        const t = e - r;
        p = p.map((e) => (e <= 0 ? -m : e > t ? t + f : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (g.forEach((t) => {
            e += t + (b || 0);
          }),
          (e -= b),
          e < r)
        ) {
          const t = (r - e) / 2;
          p.forEach((e, i) => {
            p[i] = e - t;
          }),
            h.forEach((e, i) => {
              h[i] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: p,
          slidesGrid: h,
          slidesSizesGrid: g,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        S(s, "--swiper-centered-offset-before", -p[0] + "px"),
          S(
            s,
            "--swiper-centered-offset-after",
            e.size / 2 - g[g.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      if (
        (u !== d && e.emit("slidesLengthChange"),
        p.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== y && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        s = t.virtual && t.params.virtual.enabled;
      let o,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (s ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            i.push(e);
          });
        else
          for (o = 0; o < Math.ceil(t.params.slidesPerView); o += 1) {
            const e = t.activeIndex + o;
            if (e > t.slides.length && !s) break;
            i.push(n(e));
          }
      else i.push(n(t.activeIndex));
      for (o = 0; o < i.length; o += 1)
        if (void 0 !== i[o]) {
          const e = i[o].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        i = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset =
          (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) -
          i -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        i = t.params,
        { slides: s, rtlTranslate: o, snapGrid: r } = t;
      if (0 === s.length) return;
      void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      o && (n = e),
        s.forEach((e) => {
          e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let a = i.spaceBetween;
      "string" == typeof a && a.indexOf("%") >= 0
        ? (a = (parseFloat(a.replace("%", "")) / 100) * t.size)
        : "string" == typeof a && (a = parseFloat(a));
      for (let e = 0; e < s.length; e += 1) {
        const l = s[e];
        let d = l.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (d -= s[0].swiperSlideOffset);
        const c =
            (n + (i.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + a),
          u =
            (n - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + a),
          p = -(n - d),
          h = p + t.slidesSizesGrid[e],
          g = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (p <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          s[e].classList.add(i.slideVisibleClass)),
          g && s[e].classList.add(i.slideFullyVisibleClass),
          (l.progress = o ? -c : c),
          (l.originalProgress = o ? -u : u);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        s = t.maxTranslate() - t.minTranslate();
      let { progress: o, isBeginning: r, isEnd: n, progressLoop: a } = t;
      const l = r,
        d = n;
      if (0 === s) (o = 0), (r = !0), (n = !0);
      else {
        o = (e - t.minTranslate()) / s;
        const i = Math.abs(e - t.minTranslate()) < 1,
          a = Math.abs(e - t.maxTranslate()) < 1;
        (r = i || o <= 0), (n = a || o >= 1), i && (o = 0), a && (o = 1);
      }
      if (i.loop) {
        const i = t.getSlideIndexByData(0),
          s = t.getSlideIndexByData(t.slides.length - 1),
          o = t.slidesGrid[i],
          r = t.slidesGrid[s],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (a = l >= o ? (l - o) / n : (l + n - r) / n), a > 1 && (a -= 1);
      }
      Object.assign(t, {
        progress: o,
        progressLoop: a,
        isBeginning: r,
        isEnd: n,
      }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !l && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((l && !r) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", o);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: i, slidesEl: s, activeIndex: o } = e,
        r = e.virtual && i.virtual.enabled,
        n = e.grid && i.grid && i.grid.rows > 1,
        a = (e) => x(s, `.${i.slideClass}${e}, swiper-slide${e}`)[0];
      let l, d, c;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            i.slideActiveClass,
            i.slideNextClass,
            i.slidePrevClass,
          );
        }),
        r)
      )
        if (i.loop) {
          let t = o - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (l = a(`[data-swiper-slide-index="${t}"]`));
        } else l = a(`[data-swiper-slide-index="${o}"]`);
      else
        n
          ? ((l = t.filter((e) => e.column === o)[0]),
            (c = t.filter((e) => e.column === o + 1)[0]),
            (d = t.filter((e) => e.column === o - 1)[0]))
          : (l = t[o]);
      l &&
        (l.classList.add(i.slideActiveClass),
        n
          ? (c && c.classList.add(i.slideNextClass),
            d && d.classList.add(i.slidePrevClass))
          : ((c = (function (e, t) {
              const i = [];
              for (; e.nextElementSibling; ) {
                const s = e.nextElementSibling;
                t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
              }
              return i;
            })(l, `.${i.slideClass}, swiper-slide`)[0]),
            i.loop && !c && (c = t[0]),
            c && c.classList.add(i.slideNextClass),
            (d = (function (e, t) {
              const i = [];
              for (; e.previousElementSibling; ) {
                const s = e.previousElementSibling;
                t ? s.matches(t) && i.push(s) : i.push(s), (e = s);
              }
              return i;
            })(l, `.${i.slideClass}, swiper-slide`)[0]),
            i.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(i.slidePrevClass))),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: s,
          params: o,
          activeIndex: r,
          realIndex: n,
          snapIndex: a,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let i = e - t.virtual.slidesBefore;
        return (
          i < 0 && (i = t.virtual.slides.length + i),
          i >= t.virtual.slides.length && (i -= t.virtual.slides.length),
          i
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: i } = e,
              s = e.rtlTranslate ? e.translate : -e.translate;
            let o;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? s >= t[e] && s < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (o = e)
                  : s >= t[e] && s < t[e + 1] && (o = e + 1)
                : s >= t[e] && (o = e);
            return (
              i.normalizeSlideIndex && (o < 0 || void 0 === o) && (o = 0), o
            );
          })(t)),
        s.indexOf(i) >= 0)
      )
        l = s.indexOf(i);
      else {
        const e = Math.min(o.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / o.slidesPerGroup);
      }
      if ((l >= s.length && (l = s.length - 1), d === r && !t.params.loop))
        return void (l !== a && ((t.snapIndex = l), t.emit("snapIndexChange")));
      if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const u = t.grid && o.grid && o.grid.rows > 1;
      let p;
      if (t.virtual && o.virtual.enabled && o.loop) p = c(d);
      else if (u) {
        const e = t.slides.filter((e) => e.column === d)[0];
        let i = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(i) && (i = Math.max(t.slides.indexOf(e), 0)),
          (p = Math.floor(i / o.grid.rows));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        p = e ? parseInt(e, 10) : d;
      } else p = d;
      Object.assign(t, {
        previousSnapIndex: a,
        snapIndex: l,
        previousRealIndex: n,
        realIndex: p,
        previousIndex: r,
        activeIndex: d,
      }),
        t.initialized && B(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== p && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const i = this,
        s = i.params;
      let o = e.closest(`.${s.slideClass}, swiper-slide`);
      !o &&
        i.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !o &&
            e.matches &&
            e.matches(`.${s.slideClass}, swiper-slide`) &&
            (o = e);
        });
      let r,
        n = !1;
      if (o)
        for (let e = 0; e < i.slides.length; e += 1)
          if (i.slides[e] === o) {
            (n = !0), (r = e);
            break;
          }
      if (!o || !n)
        return (i.clickedSlide = void 0), void (i.clickedIndex = void 0);
      (i.clickedSlide = o),
        i.virtual && i.params.virtual.enabled
          ? (i.clickedIndex = parseInt(
              o.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (i.clickedIndex = r),
        s.slideToClickedSlide &&
          void 0 !== i.clickedIndex &&
          i.clickedIndex !== i.activeIndex &&
          i.slideToClickedSlide();
    },
  };
  var H = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: i, translate: s, wrapperEl: o } = this;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      let r = y(o, e);
      return (r += this.cssOverflowAdjustment()), i && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        { rtlTranslate: s, params: o, wrapperEl: r, progress: n } = i;
      let a,
        l = 0,
        d = 0;
      i.isHorizontal() ? (l = s ? -e : e) : (d = e),
        o.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? l : d),
        o.cssMode
          ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -l
              : -d)
          : o.virtualTranslate ||
            (i.isHorizontal()
              ? (l -= i.cssOverflowAdjustment())
              : (d -= i.cssOverflowAdjustment()),
            (r.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = i.maxTranslate() - i.minTranslate();
      (a = 0 === c ? 0 : (e - i.minTranslate()) / c),
        a !== n && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, i, s, o) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
        void 0 === s && (s = !0);
      const r = this,
        { params: n, wrapperEl: a } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = s && e > l ? l : s && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              T({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, o), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, o),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd,
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    i && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function $(e) {
    let { swiper: t, runCallbacks: i, direction: s, step: o } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let a = s;
    if (
      (a || (a = r > n ? "next" : r < n ? "prev" : "reset"),
      t.emit(`transition${o}`),
      i && r !== n)
    ) {
      if ("reset" === a) return void t.emit(`slideResetTransition${o}`);
      t.emit(`slideChangeTransition${o}`),
        "next" === a
          ? t.emit(`slideNextTransition${o}`)
          : t.emit(`slidePrevTransition${o}`);
    }
  }
  var N = {
    slideTo: function (e, t, i, s, o) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: u,
        rtlTranslate: p,
        wrapperEl: h,
        enabled: g,
      } = r;
      if ((r.animating && a.preventInteractionOnTransition) || (!g && !s && !o))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, n);
      let f = m + Math.floor((n - m) / r.params.slidesPerGroup);
      f >= l.length && (f = l.length - 1);
      const v = -l[f];
      if (a.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            i = Math.floor(100 * d[e]),
            s = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= i && t < s - (s - i) / 2
              ? (n = e)
              : t >= i && t < s && (n = e + 1)
            : t >= i && (n = e);
        }
      if (r.initialized && n !== u) {
        if (
          !r.allowSlideNext &&
          (p
            ? v > r.translate && v > r.minTranslate()
            : v < r.translate && v < r.minTranslate())
        )
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (u || 0) !== n
        )
          return !1;
      }
      let y;
      if (
        (n !== (c || 0) && i && r.emit("beforeSlideChangeStart"),
        r.updateProgress(v),
        (y = n > u ? "next" : n < u ? "prev" : "reset"),
        (p && -v === r.translate) || (!p && v === r.translate))
      )
        return (
          r.updateActiveIndex(n),
          a.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== a.effect && r.setTranslate(v),
          "reset" !== y && (r.transitionStart(i, y), r.transitionEnd(i, y)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          i = p ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = i;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              T({ swiper: r, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, s),
        r.transitionStart(i, y),
        0 === t
          ? r.transitionEnd(i, y)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(i, y));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, i, s) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const o = this,
        r = o.grid && o.params.grid && o.params.grid.rows > 1;
      let n = e;
      if (o.params.loop)
        if (o.virtual && o.params.virtual.enabled) n += o.virtual.slidesBefore;
        else {
          let e;
          if (r) {
            const t = n * o.params.grid.rows;
            e = o.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = o.getSlideIndexByData(n);
          const t = r
              ? Math.ceil(o.slides.length / o.params.grid.rows)
              : o.slides.length,
            { centeredSlides: i } = o.params;
          let s = o.params.slidesPerView;
          "auto" === s
            ? (s = o.slidesPerViewDynamic())
            : ((s = Math.ceil(parseFloat(o.params.slidesPerView, 10))),
              i && s % 2 == 0 && (s += 1));
          let a = t - e < s;
          if ((i && (a = a || e < Math.ceil(s / 2)), a)) {
            const s = i
              ? e < o.activeIndex
                ? "prev"
                : "next"
              : e - o.activeIndex - 1 < o.params.slidesPerView
                ? "next"
                : "prev";
            o.loopFix({
              direction: s,
              slideTo: !0,
              activeSlideIndex: "next" === s ? e + 1 : e - t + 1,
              slideRealIndex: "next" === s ? o.realIndex : void 0,
            });
          }
          if (r) {
            const e = n * o.params.grid.rows;
            n = o.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else n = o.getSlideIndexByData(n);
        }
      return (
        requestAnimationFrame(() => {
          o.slideTo(n, t, i, s);
        }),
        o
      );
    },
    slideNext: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const s = this,
        { enabled: o, params: r, animating: n } = s;
      if (!o) return s;
      let a = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (a = Math.max(s.slidesPerViewDynamic("current", !0), 1));
      const l = s.activeIndex < r.slidesPerGroupSkip ? 1 : a,
        d = s.virtual && r.virtual.enabled;
      if (r.loop) {
        if (n && !d && r.loopPreventsSliding) return !1;
        if (
          (s.loopFix({ direction: "next" }),
          (s._clientLeft = s.wrapperEl.clientLeft),
          s.activeIndex === s.slides.length - 1 && r.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              s.slideTo(s.activeIndex + l, e, t, i);
            }),
            !0
          );
      }
      return r.rewind && s.isEnd
        ? s.slideTo(0, e, t, i)
        : s.slideTo(s.activeIndex + l, e, t, i);
    },
    slidePrev: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const s = this,
        {
          params: o,
          snapGrid: r,
          slidesGrid: n,
          rtlTranslate: a,
          enabled: l,
          animating: d,
        } = s;
      if (!l) return s;
      const c = s.virtual && o.virtual.enabled;
      if (o.loop) {
        if (d && !c && o.loopPreventsSliding) return !1;
        s.loopFix({ direction: "prev" }),
          (s._clientLeft = s.wrapperEl.clientLeft);
      }
      function u(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = u(a ? s.translate : -s.translate),
        h = r.map((e) => u(e));
      let g = r[h.indexOf(p) - 1];
      if (void 0 === g && o.cssMode) {
        let e;
        r.forEach((t, i) => {
          p >= t && (e = i);
        }),
          void 0 !== e && (g = r[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== g &&
          ((m = n.indexOf(g)),
          m < 0 && (m = s.activeIndex - 1),
          "auto" === o.slidesPerView &&
            1 === o.slidesPerGroup &&
            o.slidesPerGroupAuto &&
            ((m = m - s.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        o.rewind && s.isBeginning)
      ) {
        const o =
          s.params.virtual && s.params.virtual.enabled && s.virtual
            ? s.virtual.slides.length - 1
            : s.slides.length - 1;
        return s.slideTo(o, e, t, i);
      }
      return o.loop && 0 === s.activeIndex && o.cssMode
        ? (requestAnimationFrame(() => {
            s.slideTo(m, e, t, i);
          }),
          !0)
        : s.slideTo(m, e, t, i);
    },
    slideReset: function (e, t, i) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, i)
      );
    },
    slideToClosest: function (e, t, i, s) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === s && (s = 0.5);
      const o = this;
      let r = o.activeIndex;
      const n = Math.min(o.params.slidesPerGroupSkip, r),
        a = n + Math.floor((r - n) / o.params.slidesPerGroup),
        l = o.rtlTranslate ? o.translate : -o.translate;
      if (l >= o.snapGrid[a]) {
        const e = o.snapGrid[a];
        l - e > (o.snapGrid[a + 1] - e) * s && (r += o.params.slidesPerGroup);
      } else {
        const e = o.snapGrid[a - 1];
        l - e <= (o.snapGrid[a] - e) * s && (r -= o.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, o.slidesGrid.length - 1)),
        o.slideTo(r, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: i } = e,
        s =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let o,
        r = e.clickedIndex;
      const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (o = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? r < e.loopedSlides - s / 2 ||
              r > e.slides.length - e.loopedSlides + s / 2
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  x(i, `${n}[data-swiper-slide-index="${o}"]`)[0],
                )),
                f(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - s
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  x(i, `${n}[data-swiper-slide-index="${o}"]`)[0],
                )),
                f(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var j = {
    loopCreate: function (e) {
      const t = this,
        { params: i, slidesEl: s } = t;
      if (!i.loop || (t.virtual && t.params.virtual.enabled)) return;
      const o = () => {
          x(s, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        r = t.grid && i.grid && i.grid.rows > 1,
        n = i.slidesPerGroup * (r ? i.grid.rows : 1),
        a = t.slides.length % n != 0,
        l = r && t.slides.length % i.grid.rows != 0,
        d = (e) => {
          for (let s = 0; s < e; s += 1) {
            const e = t.isElement
              ? C("swiper-slide", [i.slideBlankClass])
              : C("div", [i.slideClass, i.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (a) {
        if (i.loopAddBlankSlides) {
          d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides();
        } else
          E(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        o();
      } else if (l) {
        if (i.loopAddBlankSlides) {
          d(i.grid.rows - (t.slides.length % i.grid.rows)),
            t.recalcSlides(),
            t.updateSlides();
        } else
          E(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        o();
      } else o();
      t.loopFix({
        slideRealIndex: e,
        direction: i.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: i = !0,
        direction: s,
        setTranslate: o,
        activeSlideIndex: r,
        byController: n,
        byMousewheel: a,
      } = void 0 === e ? {} : e;
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
          slides: d,
          allowSlidePrev: c,
          allowSlideNext: u,
          slidesEl: p,
          params: h,
        } = l,
        { centeredSlides: g } = h;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && h.virtual.enabled)
      )
        return (
          i &&
            (h.centeredSlides || 0 !== l.snapIndex
              ? h.centeredSlides && l.snapIndex < h.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = c),
          (l.allowSlideNext = u),
          void l.emit("loopFix")
        );
      let m = h.slidesPerView;
      "auto" === m
        ? (m = l.slidesPerViewDynamic())
        : ((m = Math.ceil(parseFloat(h.slidesPerView, 10))),
          g && m % 2 == 0 && (m += 1));
      const f = h.slidesPerGroupAuto ? m : h.slidesPerGroup;
      let v = f;
      v % f != 0 && (v += f - (v % f)),
        (v += h.loopAdditionalSlides),
        (l.loopedSlides = v);
      const y = l.grid && h.grid && h.grid.rows > 1;
      d.length < m + v
        ? E(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : y &&
          "row" === h.grid.fill &&
          E(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const b = [],
        w = [];
      let S = l.activeIndex;
      void 0 === r
        ? (r = l.getSlideIndex(
            d.filter((e) => e.classList.contains(h.slideActiveClass))[0],
          ))
        : (S = r);
      const T = "next" === s || !s,
        x = "prev" === s || !s;
      let C = 0,
        I = 0;
      const L = y ? Math.ceil(d.length / h.grid.rows) : d.length,
        M = (y ? d[r].column : r) + (g && void 0 === o ? -m / 2 + 0.5 : 0);
      if (M < v) {
        C = Math.max(v - M, f);
        for (let e = 0; e < v - M; e += 1) {
          const t = e - Math.floor(e / L) * L;
          if (y) {
            const e = L - t - 1;
            for (let t = d.length - 1; t >= 0; t -= 1)
              d[t].column === e && b.push(t);
          } else b.push(L - t - 1);
        }
      } else if (M + m > L - v) {
        I = Math.max(M - (L - 2 * v), f);
        for (let e = 0; e < I; e += 1) {
          const t = e - Math.floor(e / L) * L;
          y
            ? d.forEach((e, i) => {
                e.column === t && w.push(i);
              })
            : w.push(t);
        }
      }
      if (
        ((l.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          l.__preventObserver__ = !1;
        }),
        x &&
          b.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              p.prepend(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        T &&
          w.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              p.append(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === h.slidesPerView
          ? l.updateSlides()
          : y &&
            ((b.length > 0 && x) || (w.length > 0 && T)) &&
            l.slides.forEach((e, t) => {
              l.grid.updateSlide(t, e, l.slides);
            }),
        h.watchSlidesProgress && l.updateSlidesOffset(),
        i)
      )
        if (b.length > 0 && x) {
          if (void 0 === t) {
            const e = l.slidesGrid[S],
              t = l.slidesGrid[S + C] - e;
            a
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(S + C, 0, !1, !0),
                o &&
                  ((l.touchEventsData.startTranslate =
                    l.touchEventsData.startTranslate - t),
                  (l.touchEventsData.currentTranslate =
                    l.touchEventsData.currentTranslate - t)));
          } else if (o) {
            const e = y ? b.length / h.grid.rows : b.length;
            l.slideTo(l.activeIndex + e, 0, !1, !0),
              (l.touchEventsData.currentTranslate = l.translate);
          }
        } else if (w.length > 0 && T)
          if (void 0 === t) {
            const e = l.slidesGrid[S],
              t = l.slidesGrid[S - I] - e;
            a
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(S - I, 0, !1, !0),
                o &&
                  ((l.touchEventsData.startTranslate =
                    l.touchEventsData.startTranslate - t),
                  (l.touchEventsData.currentTranslate =
                    l.touchEventsData.currentTranslate - t)));
          } else {
            const e = y ? w.length / h.grid.rows : w.length;
            l.slideTo(l.activeIndex - e, 0, !1, !0);
          }
      if (
        ((l.allowSlidePrev = c),
        (l.allowSlideNext = u),
        l.controller && l.controller.control && !n)
      ) {
        const e = {
          slideRealIndex: t,
          direction: s,
          setTranslate: o,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && i,
                });
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix({
              ...e,
              slideTo:
                l.controller.control.params.slidesPerView === h.slidesPerView &&
                i,
            });
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: i } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const s = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        s[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        s.forEach((e) => {
          i.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function q(e, t, i) {
    const s = m(),
      { params: o } = e,
      r = o.edgeSwipeDetection,
      n = o.edgeSwipeThreshold;
    return (
      !r ||
      !(i <= n || i >= s.innerWidth - n) ||
      ("prevent" === r && (t.preventDefault(), !0))
    );
  }
  function R(e) {
    const t = this,
      i = h();
    let s = e;
    s.originalEvent && (s = s.originalEvent);
    const o = t.touchEventsData;
    if ("pointerdown" === s.type) {
      if (null !== o.pointerId && o.pointerId !== s.pointerId) return;
      o.pointerId = s.pointerId;
    } else
      "touchstart" === s.type &&
        1 === s.targetTouches.length &&
        (o.touchId = s.targetTouches[0].identifier);
    if ("touchstart" === s.type) return void q(t, s, s.targetTouches[0].pageX);
    const { params: r, touches: n, enabled: a } = t;
    if (!a) return;
    if (!r.simulateTouch && "mouse" === s.pointerType) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = s.target;
    if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(l)) return;
    if ("which" in s && 3 === s.which) return;
    if ("button" in s && s.button > 0) return;
    if (o.isTouched && o.isMoved) return;
    const d = !!r.noSwipingClass && "" !== r.noSwipingClass,
      c = s.composedPath ? s.composedPath() : s.path;
    d && s.target && s.target.shadowRoot && c && (l = c[0]);
    const u = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      p = !(!s.target || !s.target.shadowRoot);
    if (
      r.noSwiping &&
      (p
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(i) {
                if (!i || i === h() || i === m()) return null;
                i.assignedSlot && (i = i.assignedSlot);
                const s = i.closest(e);
                return s || i.getRootNode ? s || t(i.getRootNode().host) : null;
              })(t)
            );
          })(u, l)
        : l.closest(u))
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !l.closest(r.swipeHandler)) return;
    (n.currentX = s.pageX), (n.currentY = s.pageY);
    const g = n.currentX,
      f = n.currentY;
    if (!q(t, s, g)) return;
    Object.assign(o, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (n.startX = g),
      (n.startY = f),
      (o.touchStartTime = v()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (o.allowThresholdMove = !1);
    let y = !0;
    l.matches(o.focusableElements) &&
      ((y = !1), "SELECT" === l.nodeName && (o.isTouched = !1)),
      i.activeElement &&
        i.activeElement.matches(o.focusableElements) &&
        i.activeElement !== l &&
        i.activeElement.blur();
    const b = y && t.allowTouchMove && r.touchStartPreventDefault;
    (!r.touchStartForcePreventDefault && !b) ||
      l.isContentEditable ||
      s.preventDefault(),
      r.freeMode &&
        r.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", s);
  }
  function W(e) {
    const t = h(),
      i = this,
      s = i.touchEventsData,
      { params: o, touches: r, rtlTranslate: n, enabled: a } = i;
    if (!a) return;
    if (!o.simulateTouch && "mouse" === e.pointerType) return;
    let l,
      d = e;
    if ((d.originalEvent && (d = d.originalEvent), "pointermove" === d.type)) {
      if (null !== s.touchId) return;
      if (d.pointerId !== s.pointerId) return;
    }
    if ("touchmove" === d.type) {
      if (
        ((l = [...d.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !l || l.identifier !== s.touchId)
      )
        return;
    } else l = d;
    if (!s.isTouched)
      return void (
        s.startMoving &&
        s.isScrolling &&
        i.emit("touchMoveOpposite", d)
      );
    const c = l.pageX,
      u = l.pageY;
    if (d.preventedByNestedSwiper) return (r.startX = c), void (r.startY = u);
    if (!i.allowTouchMove)
      return (
        d.target.matches(s.focusableElements) || (i.allowClick = !1),
        void (
          s.isTouched &&
          (Object.assign(r, { startX: c, startY: u, currentX: c, currentY: u }),
          (s.touchStartTime = v()))
        )
      );
    if (o.touchReleaseOnEdges && !o.loop)
      if (i.isVertical()) {
        if (
          (u < r.startY && i.translate <= i.maxTranslate()) ||
          (u > r.startY && i.translate >= i.minTranslate())
        )
          return (s.isTouched = !1), void (s.isMoved = !1);
      } else if (
        (c < r.startX && i.translate <= i.maxTranslate()) ||
        (c > r.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      d.target === t.activeElement &&
      d.target.matches(s.focusableElements)
    )
      return (s.isMoved = !0), void (i.allowClick = !1);
    s.allowTouchCallbacks && i.emit("touchMove", d),
      (r.previousX = r.currentX),
      (r.previousY = r.currentY),
      (r.currentX = c),
      (r.currentY = u);
    const p = r.currentX - r.startX,
      g = r.currentY - r.startY;
    if (i.params.threshold && Math.sqrt(p ** 2 + g ** 2) < i.params.threshold)
      return;
    if (void 0 === s.isScrolling) {
      let e;
      (i.isHorizontal() && r.currentY === r.startY) ||
      (i.isVertical() && r.currentX === r.startX)
        ? (s.isScrolling = !1)
        : p * p + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(p))) / Math.PI),
          (s.isScrolling = i.isHorizontal()
            ? e > o.touchAngle
            : 90 - e > o.touchAngle));
    }
    if (
      (s.isScrolling && i.emit("touchMoveOpposite", d),
      void 0 === s.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (s.startMoving = !0)),
      s.isScrolling)
    )
      return void (s.isTouched = !1);
    if (!s.startMoving) return;
    (i.allowClick = !1),
      !o.cssMode && d.cancelable && d.preventDefault(),
      o.touchMoveStopPropagation && !o.nested && d.stopPropagation();
    let m = i.isHorizontal() ? p : g,
      f = i.isHorizontal()
        ? r.currentX - r.previousX
        : r.currentY - r.previousY;
    o.oneWayMovement &&
      ((m = Math.abs(m) * (n ? 1 : -1)), (f = Math.abs(f) * (n ? 1 : -1))),
      (r.diff = m),
      (m *= o.touchRatio),
      n && ((m = -m), (f = -f));
    const y = i.touchesDirection;
    (i.swipeDirection = m > 0 ? "prev" : "next"),
      (i.touchesDirection = f > 0 ? "prev" : "next");
    const b = i.params.loop && !o.cssMode,
      w =
        ("next" === i.touchesDirection && i.allowSlideNext) ||
        ("prev" === i.touchesDirection && i.allowSlidePrev);
    if (!s.isMoved) {
      if (
        (b && w && i.loopFix({ direction: i.swipeDirection }),
        (s.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        i.wrapperEl.dispatchEvent(e);
      }
      (s.allowMomentumBounce = !1),
        !o.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", d);
    }
    if (
      (new Date().getTime(),
      s.isMoved &&
        s.allowThresholdMove &&
        y !== i.touchesDirection &&
        b &&
        w &&
        Math.abs(m) >= 1)
    )
      return (
        Object.assign(r, {
          startX: c,
          startY: u,
          currentX: c,
          currentY: u,
          startTranslate: s.currentTranslate,
        }),
        (s.loopSwapReset = !0),
        void (s.startTranslate = s.currentTranslate)
      );
    i.emit("sliderMove", d),
      (s.isMoved = !0),
      (s.currentTranslate = m + s.startTranslate);
    let S = !0,
      T = o.resistanceRatio;
    if (
      (o.touchReleaseOnEdges && (T = 0),
      m > 0
        ? (b &&
            w &&
            s.allowThresholdMove &&
            s.currentTranslate >
              (o.centeredSlides
                ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1]
                : i.minTranslate()) &&
            i.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          s.currentTranslate > i.minTranslate() &&
            ((S = !1),
            o.resistance &&
              (s.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + s.startTranslate + m) ** T)))
        : m < 0 &&
          (b &&
            w &&
            s.allowThresholdMove &&
            s.currentTranslate <
              (o.centeredSlides
                ? i.maxTranslate() +
                  i.slidesSizesGrid[i.slidesSizesGrid.length - 1]
                : i.maxTranslate()) &&
            i.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                i.slides.length -
                ("auto" === o.slidesPerView
                  ? i.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(o.slidesPerView, 10))),
            }),
          s.currentTranslate < i.maxTranslate() &&
            ((S = !1),
            o.resistance &&
              (s.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - s.startTranslate - m) ** T))),
      S && (d.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        s.currentTranslate < s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        s.currentTranslate > s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (s.currentTranslate = s.startTranslate),
      o.threshold > 0)
    ) {
      if (!(Math.abs(m) > o.threshold || s.allowThresholdMove))
        return void (s.currentTranslate = s.startTranslate);
      if (!s.allowThresholdMove)
        return (
          (s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          void (r.diff = i.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    o.followFinger &&
      !o.cssMode &&
      (((o.freeMode && o.freeMode.enabled && i.freeMode) ||
        o.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      o.freeMode &&
        o.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(s.currentTranslate),
      i.setTranslate(s.currentTranslate));
  }
  function Y(e) {
    const t = this,
      i = t.touchEventsData;
    let s,
      o = e;
    o.originalEvent && (o = o.originalEvent);
    if ("touchend" === o.type || "touchcancel" === o.type) {
      if (
        ((s = [...o.changedTouches].filter(
          (e) => e.identifier === i.touchId,
        )[0]),
        !s || s.identifier !== i.touchId)
      )
        return;
    } else {
      if (null !== i.touchId) return;
      if (o.pointerId !== i.pointerId) return;
      s = o;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        o.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(o.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (i.pointerId = null), (i.touchId = null);
    const {
      params: r,
      touches: n,
      rtlTranslate: a,
      slidesGrid: l,
      enabled: d,
    } = t;
    if (!d) return;
    if (!r.simulateTouch && "mouse" === o.pointerType) return;
    if (
      (i.allowTouchCallbacks && t.emit("touchEnd", o),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    r.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = v(),
      u = c - i.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target, e),
        t.emit("tap click", o),
        u < 300 &&
          c - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((i.lastClickTime = v()),
      f(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        (0 === n.diff && !i.loopSwapReset) ||
        (i.currentTranslate === i.startTranslate && !i.loopSwapReset))
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let p;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (p = r.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    const h = p >= -t.maxTranslate() && !t.params.loop;
    let g = 0,
      m = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < l.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== l[e + t]
        ? (h || (p >= l[e] && p < l[e + t])) && ((g = e), (m = l[e + t] - l[e]))
        : (h || p >= l[e]) &&
          ((g = e), (m = l[l.length - 1] - l[l.length - 2]));
    }
    let y = null,
      b = null;
    r.rewind &&
      (t.isBeginning
        ? (b =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (y = 0));
    const w = (p - l[g]) / m,
      S = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (u > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (w >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? y : g + S)
          : t.slideTo(g)),
        "prev" === t.swipeDirection &&
          (w > 1 - r.longSwipesRatio
            ? t.slideTo(g + S)
            : null !== b && w < 0 && Math.abs(w) > r.longSwipesRatio
              ? t.slideTo(b)
              : t.slideTo(g));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(g + S)
          : t.slideTo(g)
        : ("next" === t.swipeDirection && t.slideTo(null !== y ? y : g + S),
          "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
    }
  }
  function X() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: s, allowSlidePrev: o, snapGrid: r } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const a = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    a
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = o),
      (e.allowSlideNext = s),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function U(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function K() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
    if (!s) return;
    let o;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (o = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      o !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function J(e) {
    const t = this;
    G(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function Z() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const Q = (e, t) => {
    const i = h(),
      { params: s, el: o, wrapperEl: r, device: n } = e,
      a = !!s.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    i[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: a }),
      o[l]("touchstart", e.onTouchStart, { passive: !1 }),
      o[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      i[l]("touchmove", e.onTouchMove, { passive: !1, capture: a }),
      i[l]("pointermove", e.onTouchMove, { passive: !1, capture: a }),
      i[l]("touchend", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      i[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      i[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      i[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (s.preventClicks || s.preventClicksPropagation) &&
        o[l]("click", e.onClick, !0),
      s.cssMode && r[l]("scroll", e.onScroll),
      s.updateOnWindowResize
        ? e[d](
            n.ios || n.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            X,
            !0,
          )
        : e[d]("observerUpdate", X, !0),
      o[l]("load", e.onLoad, { capture: !0 });
  };
  const ee = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var te = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ie(e, t) {
    return function (i) {
      void 0 === i && (i = {});
      const s = Object.keys(i)[0],
        o = i[s];
      "object" == typeof o && null !== o
        ? (!0 === e[s] && (e[s] = { enabled: !0 }),
          "navigation" === s &&
            e[s] &&
            e[s].enabled &&
            !e[s].prevEl &&
            !e[s].nextEl &&
            (e[s].auto = !0),
          ["pagination", "scrollbar"].indexOf(s) >= 0 &&
            e[s] &&
            e[s].enabled &&
            !e[s].el &&
            (e[s].auto = !0),
          s in e && "enabled" in o
            ? ("object" != typeof e[s] ||
                "enabled" in e[s] ||
                (e[s].enabled = !0),
              e[s] || (e[s] = { enabled: !1 }),
              w(t, i))
            : w(t, i))
        : w(t, i);
    };
  }
  const se = {
      eventsEmitter: D,
      update: F,
      translate: H,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode ||
            ((i.wrapperEl.style.transitionDuration = `${e}ms`),
            (i.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const i = this,
            { params: s } = i;
          s.cssMode ||
            (s.autoHeight && i.updateAutoHeight(),
            $({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const i = this,
            { params: s } = i;
          (i.animating = !1),
            s.cssMode ||
              (i.setTransition(0),
              $({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: N,
      loop: j,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (i.style.cursor = "move"),
            (i.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = R.bind(e)),
            (e.onTouchMove = W.bind(e)),
            (e.onTouchEnd = Y.bind(e)),
            (e.onDocumentTouchStart = Z.bind(e)),
            t.cssMode && (e.onScroll = K.bind(e)),
            (e.onClick = U.bind(e)),
            (e.onLoad = J.bind(e)),
            Q(e, "on");
        },
        detachEvents: function () {
          Q(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: i, params: s, el: o } = e,
            r = s.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const a = (n in r ? r[n] : void 0) || e.originalParams,
            l = ee(e, s),
            d = ee(e, a),
            c = s.enabled;
          l && !d
            ? (o.classList.remove(
                `${s.containerModifierClass}grid`,
                `${s.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (o.classList.add(`${s.containerModifierClass}grid`),
              ((a.grid.fill && "column" === a.grid.fill) ||
                (!a.grid.fill && "column" === s.grid.fill)) &&
                o.classList.add(`${s.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === a[t]) return;
              const i = s[t] && s[t].enabled,
                o = a[t] && a[t].enabled;
              i && !o && e[t].disable(), !i && o && e[t].enable();
            });
          const u = a.direction && a.direction !== s.direction,
            p = s.loop && (a.slidesPerView !== s.slidesPerView || u),
            h = s.loop;
          u && i && e.changeDirection(), w(e.params, a);
          const g = e.params.enabled,
            m = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !g ? e.disable() : !c && g && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", a),
            i &&
              (p
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !h && m
                  ? (e.loopCreate(t), e.updateSlides())
                  : h && !m && e.loopDestroy()),
            e.emit("breakpoint", a);
        },
        getBreakpoint: function (e, t, i) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !i)))
            return;
          let s = !1;
          const o = m(),
            r = "window" === t ? o.innerHeight : i.clientHeight,
            n = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < n.length; e += 1) {
            const { point: r, value: a } = n[e];
            "window" === t
              ? o.matchMedia(`(min-width: ${a}px)`).matches && (s = r)
              : a <= i.clientWidth && (s = r);
          }
          return s || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: s } = i;
          if (s) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: i, rtl: s, el: o, device: r } = e,
            n = (function (e, t) {
              const i = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((s) => {
                        e[s] && i.push(t + s);
                      })
                    : "string" == typeof e && i.push(t + e);
                }),
                i
              );
            })(
              [
                "initialized",
                i.direction,
                { "free-mode": e.params.freeMode && i.freeMode.enabled },
                { autoheight: i.autoHeight },
                { rtl: s },
                { grid: i.grid && i.grid.rows > 1 },
                {
                  "grid-column":
                    i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": i.cssMode },
                { centered: i.cssMode && i.centeredSlides },
                { "watch-progress": i.watchSlidesProgress },
              ],
              i.containerModifierClass,
            );
          t.push(...n), o.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    oe = {};
  class re {
    constructor() {
      let e, t;
      for (var i = arguments.length, s = new Array(i), o = 0; o < i; o++)
        s[o] = arguments[o];
      1 === s.length &&
      s[0].constructor &&
      "Object" === Object.prototype.toString.call(s[0]).slice(8, -1)
        ? (t = s[0])
        : ([e, t] = s),
        t || (t = {}),
        (t = w({}, t)),
        e && !t.el && (t.el = e);
      const r = h();
      if (
        t.el &&
        "string" == typeof t.el &&
        r.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          r.querySelectorAll(t.el).forEach((i) => {
            const s = w({}, t, { el: i });
            e.push(new re(s));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = _()),
        (n.device = k({ userAgent: t.userAgent })),
        (n.browser = z()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
      const a = {};
      n.modules.forEach((e) => {
        e({
          params: t,
          swiper: n,
          extendParams: ie(t, a),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const l = w({}, te, a);
      return (
        (n.params = w({}, l, oe, t)),
        (n.originalParams = w({}, n.params)),
        (n.passedParams = w({}, t)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: i } = this,
        s = L(x(t, `.${i.slideClass}, swiper-slide`)[0]);
      return L(e) - s;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = x(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const s = i.minTranslate(),
        o = (i.maxTranslate() - s) * e + s;
      i.translateTo(o, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((i) => {
        const s = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: i,
        slides: s,
        slidesGrid: o,
        slidesSizesGrid: r,
        size: n,
        activeIndex: a,
      } = this;
      let l = 1;
      if ("number" == typeof i.slidesPerView) return i.slidesPerView;
      if (i.centeredSlides) {
        let e,
          t = s[a] ? s[a].swiperSlideSize : 0;
        for (let i = a + 1; i < s.length; i += 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (l += 1), t > n && (e = !0));
        for (let i = a - 1; i >= 0; i -= 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (l += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < s.length; e += 1) {
          (t ? o[e] + r[e] - o[a] < n : o[e] - o[a] < n) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          o[a] - o[e] < n && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: i } = e;
      function s() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let o;
      if (
        (i.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && G(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        i.freeMode && i.freeMode.enabled && !i.cssMode)
      )
        s(), i.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === i.slidesPerView || i.slidesPerView > 1) &&
          e.isEnd &&
          !i.centeredSlides
        ) {
          const t =
            e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
          o = e.slideTo(t.length - 1, 0, !1, !0);
        } else o = e.slideTo(e.activeIndex, 0, !1, !0);
        o || s();
      }
      i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const i = this,
        s = i.params.direction;
      return (
        e || (e = "horizontal" === s ? "vertical" : "horizontal"),
        e === s ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
          i.el.classList.add(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let i = e || t.params.el;
      if (("string" == typeof i && (i = document.querySelector(i)), !i))
        return !1;
      (i.swiper = t),
        i.parentNode &&
          i.parentNode.host &&
          "SWIPER-CONTAINER" === i.parentNode.host.nodeName &&
          (t.isElement = !0);
      const s = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let o = (() => {
        if (i && i.shadowRoot && i.shadowRoot.querySelector) {
          return i.shadowRoot.querySelector(s());
        }
        return x(i, s())[0];
      })();
      return (
        !o &&
          t.params.createElements &&
          ((o = C("div", t.params.wrapperClass)),
          i.append(o),
          x(i, `.${t.params.slideClass}`).forEach((e) => {
            o.append(e);
          })),
        Object.assign(t, {
          el: i,
          wrapperEl: o,
          slidesEl:
            t.isElement && !i.parentNode.host.slideSlots
              ? i.parentNode.host
              : o,
          hostEl: t.isElement ? i.parentNode.host : i,
          mounted: !0,
          rtl: "rtl" === i.dir.toLowerCase() || "rtl" === I(i, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === i.dir.toLowerCase() || "rtl" === I(i, "direction")),
          wrongRTL: "-webkit-box" === I(o, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const i = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        i.forEach((e) => {
          e.complete
            ? G(t, e)
            : e.addEventListener("load", (e) => {
                G(t, e.target);
              });
        }),
        B(t),
        (t.initialized = !0),
        B(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const i = this,
        { params: s, el: o, wrapperEl: r, slides: n } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          s.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            o.removeAttribute("style"),
            r.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  s.slideVisibleClass,
                  s.slideFullyVisibleClass,
                  s.slideActiveClass,
                  s.slideNextClass,
                  s.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      w(oe, e);
    }
    static get extendedDefaults() {
      return oe;
    }
    static get defaults() {
      return te;
    }
    static installModule(e) {
      re.prototype.__modules__ || (re.prototype.__modules__ = []);
      const t = re.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => re.installModule(e)), re)
        : (re.installModule(e), re);
    }
  }
  function ne(e) {
    let t,
      i,
      { swiper: s, extendParams: o, on: r, emit: n, params: a } = e;
    (s.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      o({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let l,
      d,
      c,
      u,
      p,
      g,
      m,
      f,
      v = a && a.autoplay ? a.autoplay.delay : 3e3,
      y = a && a.autoplay ? a.autoplay.delay : 3e3,
      b = new Date().getTime();
    function w(e) {
      s &&
        !s.destroyed &&
        s.wrapperEl &&
        e.target === s.wrapperEl &&
        (s.wrapperEl.removeEventListener("transitionend", w), f || I());
    }
    const S = () => {
        if (s.destroyed || !s.autoplay.running) return;
        s.autoplay.paused ? (d = !0) : d && ((y = l), (d = !1));
        const e = s.autoplay.paused ? l : b + y - new Date().getTime();
        (s.autoplay.timeLeft = e),
          n("autoplayTimeLeft", e, e / v),
          (i = requestAnimationFrame(() => {
            S();
          }));
      },
      T = (e) => {
        if (s.destroyed || !s.autoplay.running) return;
        cancelAnimationFrame(i), S();
        let o = void 0 === e ? s.params.autoplay.delay : e;
        (v = s.params.autoplay.delay), (y = s.params.autoplay.delay);
        const r = (() => {
          let e;
          if (
            ((e =
              s.virtual && s.params.virtual.enabled
                ? s.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : s.slides[s.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(r) &&
          r > 0 &&
          void 0 === e &&
          ((o = r), (v = r), (y = r)),
          (l = o);
        const a = s.params.speed,
          d = () => {
            s &&
              !s.destroyed &&
              (s.params.autoplay.reverseDirection
                ? !s.isBeginning || s.params.loop || s.params.rewind
                  ? (s.slidePrev(a, !0, !0), n("autoplay"))
                  : s.params.autoplay.stopOnLastSlide ||
                    (s.slideTo(s.slides.length - 1, a, !0, !0), n("autoplay"))
                : !s.isEnd || s.params.loop || s.params.rewind
                  ? (s.slideNext(a, !0, !0), n("autoplay"))
                  : s.params.autoplay.stopOnLastSlide ||
                    (s.slideTo(0, a, !0, !0), n("autoplay")),
              s.params.cssMode &&
                ((b = new Date().getTime()),
                requestAnimationFrame(() => {
                  T();
                })));
          };
        return (
          o > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                d();
              }, o)))
            : requestAnimationFrame(() => {
                d();
              }),
          o
        );
      },
      x = () => {
        (b = new Date().getTime()),
          (s.autoplay.running = !0),
          T(),
          n("autoplayStart");
      },
      E = () => {
        (s.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(i),
          n("autoplayStop");
      },
      C = (e, i) => {
        if (s.destroyed || !s.autoplay.running) return;
        clearTimeout(t), e || (m = !0);
        const o = () => {
          n("autoplayPause"),
            s.params.autoplay.waitForTransition
              ? s.wrapperEl.addEventListener("transitionend", w)
              : I();
        };
        if (((s.autoplay.paused = !0), i))
          return g && (l = s.params.autoplay.delay), (g = !1), void o();
        const r = l || s.params.autoplay.delay;
        (l = r - (new Date().getTime() - b)),
          (s.isEnd && l < 0 && !s.params.loop) || (l < 0 && (l = 0), o());
      },
      I = () => {
        (s.isEnd && l < 0 && !s.params.loop) ||
          s.destroyed ||
          !s.autoplay.running ||
          ((b = new Date().getTime()),
          m ? ((m = !1), T(l)) : T(),
          (s.autoplay.paused = !1),
          n("autoplayResume"));
      },
      L = () => {
        if (s.destroyed || !s.autoplay.running) return;
        const e = h();
        "hidden" === e.visibilityState && ((m = !0), C(!0)),
          "visible" === e.visibilityState && I();
      },
      M = (e) => {
        "mouse" === e.pointerType &&
          ((m = !0), (f = !0), s.animating || s.autoplay.paused || C(!0));
      },
      O = (e) => {
        "mouse" === e.pointerType && ((f = !1), s.autoplay.paused && I());
      };
    r("init", () => {
      s.params.autoplay.enabled &&
        (s.params.autoplay.pauseOnMouseEnter &&
          (s.el.addEventListener("pointerenter", M),
          s.el.addEventListener("pointerleave", O)),
        h().addEventListener("visibilitychange", L),
        x());
    }),
      r("destroy", () => {
        s.el.removeEventListener("pointerenter", M),
          s.el.removeEventListener("pointerleave", O),
          h().removeEventListener("visibilitychange", L),
          s.autoplay.running && E();
      }),
      r("_freeModeStaticRelease", () => {
        (u || m) && I();
      }),
      r("_freeModeNoMomentumRelease", () => {
        s.params.autoplay.disableOnInteraction ? E() : C(!0, !0);
      }),
      r("beforeTransitionStart", (e, t, i) => {
        !s.destroyed &&
          s.autoplay.running &&
          (i || !s.params.autoplay.disableOnInteraction ? C(!0, !0) : E());
      }),
      r("sliderFirstMove", () => {
        !s.destroyed &&
          s.autoplay.running &&
          (s.params.autoplay.disableOnInteraction
            ? E()
            : ((c = !0),
              (u = !1),
              (m = !1),
              (p = setTimeout(() => {
                (m = !0), (u = !0), C(!0);
              }, 200))));
      }),
      r("touchEnd", () => {
        if (!s.destroyed && s.autoplay.running && c) {
          if (
            (clearTimeout(p),
            clearTimeout(t),
            s.params.autoplay.disableOnInteraction)
          )
            return (u = !1), void (c = !1);
          u && s.params.cssMode && I(), (u = !1), (c = !1);
        }
      }),
      r("slideChange", () => {
        !s.destroyed && s.autoplay.running && (g = !0);
      }),
      Object.assign(s.autoplay, { start: x, stop: E, pause: C, resume: I });
  }
  function ae() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(se).forEach((e) => {
    Object.keys(se[e]).forEach((t) => {
      re.prototype[t] = se[e][t];
    });
  }),
    re.use([
      function (e) {
        let { swiper: t, on: i, emit: s } = e;
        const o = m();
        let r = null,
          n = null;
        const a = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (s("beforeResize"), s("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && s("orientationchange");
          };
        i("init", () => {
          t.params.resizeObserver && void 0 !== o.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((r = new ResizeObserver((e) => {
                n = o.requestAnimationFrame(() => {
                  const { width: i, height: s } = t;
                  let o = i,
                    r = s;
                  e.forEach((e) => {
                    let { contentBoxSize: i, contentRect: s, target: n } = e;
                    (n && n !== t.el) ||
                      ((o = s ? s.width : (i[0] || i).inlineSize),
                      (r = s ? s.height : (i[0] || i).blockSize));
                  }),
                    (o === i && r === s) || a();
                });
              })),
              r.observe(t.el))
            : (o.addEventListener("resize", a),
              o.addEventListener("orientationchange", l));
        }),
          i("destroy", () => {
            n && o.cancelAnimationFrame(n),
              r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
              o.removeEventListener("resize", a),
              o.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: i, on: s, emit: o } = e;
        const r = [],
          n = m(),
          a = function (e, i) {
            void 0 === i && (i = {});
            const s = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void o("observerUpdate", e[0]);
                const i = function () {
                  o("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(i)
                  : n.setTimeout(i, 0);
              },
            );
            s.observe(e, {
              attributes: void 0 === i.attributes || i.attributes,
              childList: void 0 === i.childList || i.childList,
              characterData: void 0 === i.characterData || i.characterData,
            }),
              r.push(s);
          };
        i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = (function (e, t) {
                  const i = [];
                  let s = e.parentElement;
                  for (; s; )
                    t ? s.matches(t) && i.push(s) : i.push(s),
                      (s = s.parentElement);
                  return i;
                })(t.hostEl);
                for (let t = 0; t < e.length; t += 1) a(e[t]);
              }
              a(t.hostEl, { childList: t.params.observeSlideChildren }),
                a(t.wrapperEl, { attributes: !1 });
            }
          }),
          s("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      ae(),
        document.querySelector(".partners__swiper") &&
          new re(".swiper", {
            modules: [ne],
            autoplay: { delay: 2500, disableOnInteraction: !1 },
            slidesPerView: "auto",
            speed: 800,
            touchRatio: 0,
            breakpoints: {
              0: { slidesPerView: "auto", spaceBetween: 28 },
              320: { slidesPerView: "auto", spaceBetween: 28 },
              768: { spaceBetween: 0 },
              992: {},
              1268: {},
            },
            on: {},
          });
    });
  var le = function () {
    return (
      (le =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var o in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }),
      le.apply(this, arguments)
    );
  };
  var de = "lgAfterAppendSlide",
    ce = "lgInit",
    ue = "lgHasVideo",
    pe = "lgContainerResize",
    he = "lgUpdateSlides",
    ge = "lgAfterAppendSubHtml",
    me = "lgBeforeOpen",
    fe = "lgAfterOpen",
    ve = "lgSlideItemLoad",
    ye = "lgBeforeSlide",
    be = "lgAfterSlide",
    we = "lgPosterClick",
    Se = "lgDragStart",
    Te = "lgDragMove",
    xe = "lgDragEnd",
    Ee = "lgBeforeNextSlide",
    Ce = "lgBeforePrevSlide",
    Ie = "lgBeforeClose",
    Le = "lgAfterClose",
    Me = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      resetScrollPosition: !0,
      hideScrollbar: !1,
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      trapFocus: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
      strings: {
        closeGallery: "Close gallery",
        toggleMaximize: "Toggle maximize",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
        download: "Download",
        playVideo: "Play video",
        mediaLoadingFailed: "Oops... Failed to load content...",
      },
    };
  var Oe = (function () {
    function e(e) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(e)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (e.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          },
        );
      }),
      (e.prototype._getSelector = function (e, t) {
        return (
          void 0 === t && (t = document),
          "string" != typeof e
            ? e
            : ((t = t || document),
              "#" === e.substring(0, 1)
                ? t.querySelector(e)
                : t.querySelectorAll(e))
        );
      }),
      (e.prototype._each = function (e) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, e)
              : e(this.selector, 0),
            this)
          : this;
      }),
      (e.prototype._setCssVendorPrefix = function (e, t, i) {
        var s = t.replace(/-([a-z])/gi, function (e, t) {
          return t.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(s)
          ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (e.style["webkit" + s] = i),
            (e.style["moz" + s] = i),
            (e.style["ms" + s] = i),
            (e.style["o" + s] = i))
          : (e.style[s] = i);
      }),
      (e.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (e.prototype.isEventMatched = function (e, t) {
        var i = t.split(".");
        return e
          .split(".")
          .filter(function (e) {
            return e;
          })
          .every(function (e) {
            return -1 !== i.indexOf(e);
          });
      }),
      (e.prototype.attr = function (e, t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.getAttribute(e)
            : ""
          : (this._each(function (i) {
              i.setAttribute(e, t);
            }),
            this);
      }),
      (e.prototype.find = function (e) {
        return Pe(this._getSelector(e, this.selector));
      }),
      (e.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? Pe(this.selector[0])
          : Pe(this.selector);
      }),
      (e.prototype.eq = function (e) {
        return Pe(this.selector[e]);
      }),
      (e.prototype.parent = function () {
        return Pe(this.selector.parentElement);
      }),
      (e.prototype.get = function () {
        return this._getFirstEl();
      }),
      (e.prototype.removeAttr = function (e) {
        var t = e.split(" ");
        return (
          this._each(function (e) {
            t.forEach(function (t) {
              return e.removeAttribute(t);
            });
          }),
          this
        );
      }),
      (e.prototype.wrap = function (e) {
        if (!this.firstElement) return this;
        var t = document.createElement("div");
        return (
          (t.className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement),
          this
        );
      }),
      (e.prototype.addClass = function (e) {
        return (
          void 0 === e && (e = ""),
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.add(e);
            });
          }),
          this
        );
      }),
      (e.prototype.removeClass = function (e) {
        return (
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.remove(e);
            });
          }),
          this
        );
      }),
      (e.prototype.hasClass = function (e) {
        return !!this.firstElement && this.firstElement.classList.contains(e);
      }),
      (e.prototype.hasAttribute = function (e) {
        return !!this.firstElement && this.firstElement.hasAttribute(e);
      }),
      (e.prototype.toggleClass = function (e) {
        return this.firstElement
          ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
          : this;
      }),
      (e.prototype.css = function (e, t) {
        var i = this;
        return (
          this._each(function (s) {
            i._setCssVendorPrefix(s, e, t);
          }),
          this
        );
      }),
      (e.prototype.on = function (t, i) {
        var s = this;
        return this.selector
          ? (t.split(" ").forEach(function (t) {
              Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []),
                e.eventListeners[t].push(i),
                s.selector.addEventListener(t.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (e.prototype.once = function (e, t) {
        var i = this;
        return (
          this.on(e, function () {
            i.off(e), t(e);
          }),
          this
        );
      }),
      (e.prototype.off = function (t) {
        var i = this;
        return this.selector
          ? (Object.keys(e.eventListeners).forEach(function (s) {
              i.isEventMatched(t, s) &&
                (e.eventListeners[s].forEach(function (e) {
                  i.selector.removeEventListener(s.split(".")[0], e);
                }),
                (e.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (e.prototype.trigger = function (e, t) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(e.split(".")[0], { detail: t || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (e.prototype.load = function (e) {
        var t = this;
        return (
          fetch(e)
            .then(function (e) {
              return e.text();
            })
            .then(function (e) {
              t.selector.innerHTML = e;
            }),
          this
        );
      }),
      (e.prototype.html = function (e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (t) {
              t.innerHTML = e;
            }),
            this);
      }),
      (e.prototype.append = function (e) {
        return (
          this._each(function (t) {
            "string" == typeof e
              ? t.insertAdjacentHTML("beforeend", e)
              : t.appendChild(e);
          }),
          this
        );
      }),
      (e.prototype.prepend = function (e) {
        return (
          this._each(function (t) {
            t.insertAdjacentHTML("afterbegin", e);
          }),
          this
        );
      }),
      (e.prototype.remove = function () {
        return (
          this._each(function (e) {
            e.parentNode.removeChild(e);
          }),
          this
        );
      }),
      (e.prototype.empty = function () {
        return (
          this._each(function (e) {
            e.innerHTML = "";
          }),
          this
        );
      }),
      (e.prototype.scrollTop = function (e) {
        return void 0 !== e
          ? ((document.body.scrollTop = e),
            (document.documentElement.scrollTop = e),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (e.prototype.scrollLeft = function (e) {
        return void 0 !== e
          ? ((document.body.scrollLeft = e),
            (document.documentElement.scrollLeft = e),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (e.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var e = this.firstElement.getBoundingClientRect(),
          t = Pe("body").style().marginLeft;
        return {
          left: e.left - parseFloat(t) + this.scrollLeft(),
          top: e.top + this.scrollTop(),
        };
      }),
      (e.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (e.prototype.width = function () {
        var e = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(e.paddingLeft) -
          parseFloat(e.paddingRight)
        );
      }),
      (e.prototype.height = function () {
        var e = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(e.paddingTop) -
          parseFloat(e.paddingBottom)
        );
      }),
      (e.eventListeners = {}),
      e
    );
  })();
  function Pe(e) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new Oe(e)
    );
  }
  var Ae = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function _e(e) {
    return "href" === e
      ? "src"
      : (e = (e =
          (e = e.replace("data-", "")).charAt(0).toLowerCase() +
          e.slice(1)).replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }));
  }
  var ke = function (e, t, i, s) {
      void 0 === i && (i = 0);
      var o = Pe(e).attr("data-lg-size") || s;
      if (o) {
        var r = o.split(",");
        if (r[1])
          for (var n = window.innerWidth, a = 0; a < r.length; a++) {
            var l = r[a];
            if (parseInt(l.split("-")[2], 10) > n) {
              o = l;
              break;
            }
            a === r.length - 1 && (o = l);
          }
        var d = o.split("-"),
          c = parseInt(d[0], 10),
          u = parseInt(d[1], 10),
          p = t.width(),
          h = t.height() - i,
          g = Math.min(p, c),
          m = Math.min(h, u),
          f = Math.min(g / c, m / u);
        return { width: c * f, height: u * f };
      }
    },
    ze = function (e, t, i, s, o) {
      if (o) {
        var r = Pe(e).find("img").first();
        if (r.get()) {
          var n = t.get().getBoundingClientRect(),
            a = n.width,
            l = t.height() - (i + s),
            d = r.width(),
            c = r.height(),
            u = r.style(),
            p =
              (a - d) / 2 -
              r.offset().left +
              (parseFloat(u.paddingLeft) || 0) +
              (parseFloat(u.borderLeft) || 0) +
              Pe(window).scrollLeft() +
              n.left,
            h =
              (l - c) / 2 -
              r.offset().top +
              (parseFloat(u.paddingTop) || 0) +
              (parseFloat(u.borderTop) || 0) +
              Pe(window).scrollTop() +
              i;
          return (
            "translate3d(" +
            (p *= -1) +
            "px, " +
            (h *= -1) +
            "px, 0) scale3d(" +
            d / o.width +
            ", " +
            c / o.height +
            ", 1)"
          );
        }
      }
    },
    De = function (e, t, i, s, o, r) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        i +
        "; height: " +
        t +
        "; max-height:" +
        s +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (r ? 'title="' + r + '"' : "") +
        ' src="' +
        o +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    Ge = function (e, t, i, s, o, r) {
      var n =
          "<img " +
          i +
          " " +
          (s ? 'srcset="' + s + '"' : "") +
          "  " +
          (o ? 'sizes="' + o + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          e +
          '" src="' +
          t +
          '" />',
        a = "";
      r &&
        (a = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
          var t = "";
          return (
            Object.keys(e).forEach(function (i) {
              t += " " + i + '="' + e[i] + '"';
            }),
            "<source " + t + "></source>"
          );
        }));
      return "" + a + n;
    },
    Ve = function (e) {
      for (var t = [], i = [], s = "", o = 0; o < e.length; o++) {
        var r = e[o].split(" ");
        "" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]);
      }
      for (var n = window.innerWidth, a = 0; a < t.length; a++)
        if (parseInt(t[a], 10) > n) {
          s = i[a];
          break;
        }
      return s;
    },
    Be = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Fe = function (e, t, i, s, o) {
      return (
        '<div class="lg-video-cont ' +
        (o && o.youtube
          ? "lg-has-youtube"
          : o && o.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
        s +
        '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
        s +
        '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    He = function (e) {
      var t = e.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
      );
      return [].filter.call(t, function (e) {
        var t = window.getComputedStyle(e);
        return "none" !== t.display && "hidden" !== t.visibility;
      });
    },
    $e = function (e, t, i, s) {
      var o = [],
        r = (function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length;
          var s = Array(e),
            o = 0;
          for (t = 0; t < i; t++)
            for (var r = arguments[t], n = 0, a = r.length; n < a; n++, o++)
              s[o] = r[n];
          return s;
        })(Ae, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, n = 0; n < e.attributes.length; n++) {
            var a = e.attributes[n];
            if (a.specified) {
              var l = _e(a.name),
                d = "";
              r.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
            }
          }
          var c = Pe(e),
            u = c.find("img").first().attr("alt"),
            p = c.attr("title"),
            h = s ? c.attr(s) : c.find("img").first().attr("src");
          (t.thumb = h),
            i && !t.subHtml && (t.subHtml = p || u || ""),
            (t.alt = u || p || ""),
            o.push(t);
        }),
        o
      );
    },
    Ne = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    je = function (e, t, i) {
      if (!e)
        return t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/",
            );
      var s = e.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i,
        ),
        o = e.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i,
        ),
        r = e.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/,
        );
      return s ? { youtube: s } : o ? { vimeo: o } : r ? { wistia: r } : void 0;
    },
    qe = 0,
    Re = (function () {
      function e(e, t) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.bodyPaddingRight = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !e)
        )
          return this;
        if (
          (qe++,
          (this.lgId = qe),
          (this.el = e),
          (this.LGel = Pe(e)),
          this.generateSettings(t),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (e.prototype.generateSettings = function (e) {
          if (
            ((this.settings = le(le({}, Me), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : Ne())
          ) {
            var t = le(
              le({}, this.settings.mobileSettings),
              this.settings.mobileSettings,
            );
            this.settings = le(le({}, this.settings), t);
          }
        }),
        (e.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length,
            ));
        }),
        (e.prototype.init = function () {
          var e = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(ce, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (e.prototype.openGalleryOnItemClick = function () {
          for (
            var e = this,
              t = function (t) {
                var s = i.items[t],
                  o = Pe(s),
                  r = Oe.generateUUID();
                o.attr("data-lg-id", r).on(
                  "click.lgcustom-item-" + r,
                  function (i) {
                    i.preventDefault();
                    var o = e.settings.index || t;
                    e.openGallery(o, s);
                  },
                );
              },
              i = this,
              s = 0;
            s < this.items.length;
            s++
          )
            t(s);
        }),
        (e.prototype.buildModules = function () {
          var e = this;
          this.settings.plugins.forEach(function (t) {
            e.plugins.push(new t(e, Pe));
          });
        }),
        (e.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use",
              )
            : console.error("Please provide a valid license key");
        }),
        (e.prototype.getSlideItem = function (e) {
          return Pe(this.getSlideItemId(e));
        }),
        (e.prototype.getSlideItemId = function (e) {
          return "#lg-item-" + this.lgId + "-" + e;
        }),
        (e.prototype.getIdName = function (e) {
          return e + "-" + this.lgId;
        }),
        (e.prototype.getElementById = function (e) {
          return Pe("#" + this.getIdName(e));
        }),
        (e.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (e.prototype.buildStructure = function () {
          var e = this;
          if (!(this.$container && this.$container.get())) {
            var t = "",
              i = "";
            this.settings.controls &&
              (t =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="' +
                this.settings.strings.previousSlide +
                '" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="' +
                this.settings.strings.nextSlide +
                '" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (i =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var s = "";
            this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
            var o = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              r = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              n =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              a =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.closeGallery +
                    '" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              l = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="' +
                  this.settings.strings.toggleMaximize +
                  '" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                n +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                o +
                " " +
                r +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                s +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                t +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                l +
                "\n                    " +
                a +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            Pe(this.settings.container).append(d),
              document.body !== this.settings.container &&
                Pe(this.settings.container).css("position", "relative"),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms",
              );
            var c = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (c += "lg-grab "),
              this.outer.addClass(c),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing,
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms",
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="' +
                    this.settings.strings.download +
                    '" download class="lg-download lg-icon"></a>',
                ),
              this.counter(),
              Pe(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  e.refreshOnResize();
                },
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (e.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var e = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var t = this.mediaContainerPosition,
              i = t.top,
              s = t.bottom;
            if (
              ((this.currentImageSize = ke(
                this.items[this.index],
                this.outer,
                i + s,
                e && this.settings.videoMaxSize,
              )),
              e && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var o = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", o);
            }
            this.LGel.trigger(pe);
          }
        }),
        (e.prototype.resizeVideoSlide = function (e, t) {
          var i = this.getVideoContStyle(t);
          this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
        }),
        (e.prototype.updateSlides = function (e, t) {
          if (
            (this.index > e.length - 1 && (this.index = e.length - 1),
            1 === e.length && (this.index = 0),
            e.length)
          ) {
            var i = this.galleryItems[t].src;
            (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var s = 0;
            this.galleryItems.some(function (e, t) {
              return e.src === i && ((s = t), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(he);
          } else this.closeGallery();
        }),
        (e.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var e = Pe(this.settings.selectWithin);
                this.items = e.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return $e(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage,
          );
        }),
        (e.prototype.shouldHideScrollbar = function () {
          return (
            this.settings.hideScrollbar &&
            document.body === this.settings.container
          );
        }),
        (e.prototype.hideScrollbar = function () {
          if (this.shouldHideScrollbar()) {
            this.bodyPaddingRight = parseFloat(Pe("body").style().paddingRight);
            var e = document.documentElement.getBoundingClientRect(),
              t = window.innerWidth - e.width;
            Pe(document.body).css(
              "padding-right",
              t + this.bodyPaddingRight + "px",
            ),
              Pe(document.body).addClass("lg-overlay-open");
          }
        }),
        (e.prototype.resetScrollBar = function () {
          this.shouldHideScrollbar() &&
            (Pe(document.body).css(
              "padding-right",
              this.bodyPaddingRight + "px",
            ),
            Pe(document.body).removeClass("lg-overlay-open"));
        }),
        (e.prototype.openGallery = function (e, t) {
          var i = this;
          if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.removeClass("lg-hide-items"),
              this.hideScrollbar(),
              this.$container.addClass("lg-show");
            var s = this.getItemsToBeInsertedToDom(e, e);
            this.currentItemsInDom = s;
            var o = "";
            s.forEach(function (e) {
              o = o + '<div id="' + e + '" class="lg-item"></div>';
            }),
              this.$inner.append(o),
              this.addHtml(e);
            var r = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var n = this.mediaContainerPosition,
              a = n.top,
              l = n.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(a, l);
            var d = this.galleryItems[e].__slideVideoInfo;
            this.zoomFromOrigin &&
              t &&
              ((this.currentImageSize = ke(
                t,
                this.outer,
                a + l,
                d && this.settings.videoMaxSize,
              )),
              (r = ze(t, this.outer, a, l, this.currentImageSize))),
              (this.zoomFromOrigin && r) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(e).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              i.outer.addClass("lg-components-open");
            }, c),
              (this.index = e),
              this.LGel.trigger(me),
              this.getSlideItem(e).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = Pe(window).scrollTop()),
              setTimeout(function () {
                if (i.zoomFromOrigin && r) {
                  var t = i.getSlideItem(e);
                  t.css("transform", r),
                    setTimeout(function () {
                      t
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          i.settings.startAnimationDuration + "ms",
                        ),
                        i.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      t.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  i.$backdrop.addClass("in"),
                    i.$container.addClass("lg-show-in");
                }, 10),
                  setTimeout(function () {
                    i.settings.trapFocus &&
                      document.body === i.settings.container &&
                      i.trapFocus();
                  }, i.settings.backdropDuration + 50),
                  (i.zoomFromOrigin && r) ||
                    setTimeout(function () {
                      i.outer.addClass("lg-visible");
                    }, i.settings.backdropDuration),
                  i.slide(e, !1, !1, !1),
                  i.LGel.trigger(fe);
              }),
              document.body === this.settings.container &&
                Pe("html").addClass("lg-on");
          }
        }),
        (e.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var e = this.$toolbar.get().clientHeight || 0,
            t = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
            s = this.outer.find(".lg-thumb-outer").get();
          return { top: e, bottom: (s ? s.clientHeight : 0) + i };
        }),
        (e.prototype.setMediaContainerPosition = function (e, t) {
          void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            this.$content.css("top", e + "px").css("bottom", t + "px");
        }),
        (e.prototype.hideBars = function () {
          var e = this;
          setTimeout(function () {
            e.outer.removeClass("lg-hide-items"),
              e.settings.hideBarsDelay > 0 &&
                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  e.outer.removeClass("lg-hide-items"),
                    clearTimeout(e.hideBarTimeout),
                    (e.hideBarTimeout = setTimeout(function () {
                      e.outer.addClass("lg-hide-items");
                    }, e.settings.hideBarsDelay));
                }),
                e.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (e.prototype.initPictureFill = function (e) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [e.get()] });
            } catch (e) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.",
              );
            }
        }),
        (e.prototype.counter = function () {
          if (this.settings.counter) {
            var e =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(e);
          }
        }),
        (e.prototype.addHtml = function (e) {
          var t, i;
          if (
            (this.galleryItems[e].subHtmlUrl
              ? (i = this.galleryItems[e].subHtmlUrl)
              : (t = this.galleryItems[e].subHtml),
            !i)
          )
            if (t) {
              var s = t.substring(0, 1);
              ("." !== s && "#" !== s) ||
                (t =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? Pe(this.items).eq(e).find(t).first().html()
                    : Pe(t).first().html());
            } else t = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(t);
          else {
            var o = Pe(this.getSlideItemId(e));
            i
              ? o.load(i)
              : o.append('<div class="lg-sub-html">' + t + "</div>");
          }
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(ge, { index: e });
        }),
        (e.prototype.preload = function (e) {
          for (
            var t = 1;
            t <= this.settings.preload && !(t >= this.galleryItems.length - e);
            t++
          )
            this.loadContent(e + t, !1);
          for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
            this.loadContent(e - i, !1);
        }),
        (e.prototype.getDummyImgStyles = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                margin-left: -" +
                e.width / 2 +
                "px;\n                margin-top: -" +
                e.height / 2 +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getVideoContStyle = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getDummyImageContent = function (e, t, i) {
          var s;
          if ((this.settings.dynamic || (s = Pe(this.items).eq(t)), s)) {
            var o = void 0;
            if (
              !(o = this.settings.exThumbImage
                ? s.attr(this.settings.exThumbImage)
                : s.find("img").first().attr("src"))
            )
              return "";
            var r =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              o +
              '" />';
            return (
              e.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              r
            );
          }
          return "";
        }),
        (e.prototype.setImgMarkup = function (e, t, i) {
          var s = this.galleryItems[i],
            o = s.alt,
            r = s.srcset,
            n = s.sizes,
            a = s.sources,
            l = o ? 'alt="' + o + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(t, i, l)
                : Ge(i, e, l, r, n, a)) +
              "</picture>";
          t.prepend(d);
        }),
        (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
          var o = e.find(".lg-object").first();
          Be(o.get()) || t
            ? i()
            : (o.on("load.lg error.lg", function () {
                i && i();
              }),
              o.on("error.lg", function () {
                s && s();
              }));
        }),
        (e.prototype.onLgObjectLoad = function (e, t, i, s, o, r) {
          var n = this;
          this.onSlideObjectLoad(
            e,
            r,
            function () {
              n.triggerSlideItemLoad(e, t, i, s, o);
            },
            function () {
              e.addClass("lg-complete lg-complete_"),
                e.html(
                  '<span class="lg-error-msg">' +
                    n.settings.strings.mediaLoadingFailed +
                    "</span>",
                );
            },
          );
        }),
        (e.prototype.triggerSlideItemLoad = function (e, t, i, s, o) {
          var r = this,
            n = this.galleryItems[t],
            a = o && "video" === this.getSlideType(n) && !n.poster ? s : 0;
          setTimeout(function () {
            e.addClass("lg-complete lg-complete_"),
              r.LGel.trigger(ve, { index: t, delay: i || 0, isFirstSlide: o });
          }, a);
        }),
        (e.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (e.prototype.addSlideVideoInfo = function (e) {
          var t = this;
          e.forEach(function (e, i) {
            (e.__slideVideoInfo = je(e.src, !!e.video, i)),
              e.__slideVideoInfo &&
                t.settings.loadYouTubePoster &&
                !e.poster &&
                e.__slideVideoInfo.youtube &&
                (e.poster =
                  "//img.youtube.com/vi/" +
                  e.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (e.prototype.loadContent = function (e, t) {
          var i = this,
            s = this.galleryItems[e],
            o = Pe(this.getSlideItemId(e)),
            r = s.poster,
            n = s.srcset,
            a = s.sizes,
            l = s.sources,
            d = s.src,
            c = s.video,
            u = c && "string" == typeof c ? JSON.parse(c) : c;
          if (s.responsive) {
            var p = s.responsive.split(",");
            d = Ve(p) || d;
          }
          var h = s.__slideVideoInfo,
            g = "",
            m = !!s.iframe,
            f = !this.lGalleryOn,
            v = 0;
          if (
            (f &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !o.hasClass("lg-loaded"))
          ) {
            if (h) {
              var y = this.mediaContainerPosition,
                b = y.top,
                w = y.bottom,
                S = ke(
                  this.items[e],
                  this.outer,
                  b + w,
                  h && this.settings.videoMaxSize,
                );
              g = this.getVideoContStyle(S);
            }
            if (m) {
              var T = De(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                d,
                s.iframeTitle,
              );
              o.prepend(T);
            } else if (r) {
              var x = "";
              f &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (x = this.getDummyImageContent(o, e, ""));
              T = Fe(r, x || "", g, this.settings.strings.playVideo, h);
              o.prepend(T);
            } else if (h) {
              T = '<div class="lg-video-cont " style="' + g + '"></div>';
              o.prepend(T);
            } else if ((this.setImgMarkup(d, o, e), n || l)) {
              var E = o.find(".lg-object");
              this.initPictureFill(E);
            }
            (r || h) &&
              this.LGel.trigger(ue, {
                index: e,
                src: d,
                html5Video: u,
                hasPoster: !!r,
              }),
              this.LGel.trigger(de, { index: e }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(e);
          }
          var C = 0;
          v && !Pe(document.body).hasClass("lg-from-hash") && (C = v),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                o.removeClass(
                  "lg-start-end-progress lg-start-progress",
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              o.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if ("image" === i.getSlideType(s)) {
                    var t = s.alt,
                      c = t ? 'alt="' + t + '"' : "";
                    if (
                      (o
                        .find(".lg-img-wrap")
                        .append(Ge(e, d, c, n, a, s.sources)),
                      n || l)
                    ) {
                      var u = o.find(".lg-object");
                      i.initPictureFill(u);
                    }
                  }
                  ("image" === i.getSlideType(s) ||
                    ("video" === i.getSlideType(s) && r)) &&
                    (i.onLgObjectLoad(o, e, v, C, !0, !1),
                    i.onSlideObjectLoad(
                      o,
                      !(!h || !h.html5 || r),
                      function () {
                        i.loadContentOnFirstSlideLoad(e, o, C);
                      },
                      function () {
                        i.loadContentOnFirstSlideLoad(e, o, C);
                      },
                    ));
                }, this.settings.startAnimationDuration + 100)),
            o.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(s) || r)) ||
              this.onLgObjectLoad(o, e, v, C, f, !(!h || !h.html5 || r)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !o.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                o.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === t &&
              (o.hasClass("lg-complete_")
                ? this.preload(e)
                : o
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      i.preload(e);
                    }));
        }),
        (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
          var s = this;
          setTimeout(function () {
            t.find(".lg-dummy-img").remove(),
              t.removeClass("lg-first-slide"),
              s.outer.removeClass("lg-first-slide-loading"),
              (s.isDummyImageRemoved = !0),
              s.preload(e);
          }, i + 300);
        }),
        (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
          var s = this;
          void 0 === i && (i = 0);
          var o = [],
            r = Math.max(i, 3);
          r = Math.min(r, this.galleryItems.length);
          var n = "lg-item-" + this.lgId + "-" + t;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (e, t) {
                o.push("lg-item-" + s.lgId + "-" + t);
              }),
              o
            );
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var a = e; a > e - r / 2 && a >= 0; a--)
              o.push("lg-item-" + this.lgId + "-" + a);
            var l = o.length;
            for (a = 0; a < r - l; a++)
              o.push("lg-item-" + this.lgId + "-" + (e + a + 1));
          } else {
            for (a = e; a <= this.galleryItems.length - 1 && a < e + r / 2; a++)
              o.push("lg-item-" + this.lgId + "-" + a);
            for (l = o.length, a = 0; a < r - l; a++)
              o.push("lg-item-" + this.lgId + "-" + (e - a - 1));
          }
          return (
            this.settings.loop &&
              (e === this.galleryItems.length - 1
                ? o.push("lg-item-" + this.lgId + "-0")
                : 0 === e &&
                  o.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1),
                  )),
            -1 === o.indexOf(n) && o.push("lg-item-" + this.lgId + "-" + t),
            o
          );
        }),
        (e.prototype.organizeSlideItems = function (e, t) {
          var i = this,
            s = this.getItemsToBeInsertedToDom(
              e,
              t,
              this.settings.numberOfSlideItemsInDom,
            );
          return (
            s.forEach(function (e) {
              -1 === i.currentItemsInDom.indexOf(e) &&
                i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (e) {
              -1 === s.indexOf(e) && Pe("#" + e).remove();
            }),
            s
          );
        }),
        (e.prototype.getPreviousSlideIndex = function () {
          var e = 0;
          try {
            var t = this.outer.find(".lg-current").first().attr("id");
            e = parseInt(t.split("-")[3]) || 0;
          } catch (t) {
            e = 0;
          }
          return e;
        }),
        (e.prototype.setDownloadValue = function (e) {
          if (this.settings.download) {
            var t = this.galleryItems[e];
            if (!1 === t.downloadUrl || "false" === t.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", t.downloadUrl || t.src),
                t.download && i.attr("download", t.download);
            }
          }
        }),
        (e.prototype.makeSlideAnimation = function (e, t, i) {
          var s = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                s.outer.addClass("lg-no-trans"),
                  s.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === e
                    ? (t.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (t.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    s.outer.find(".lg-item").removeClass("lg-current"),
                      t.addClass("lg-current"),
                      s.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0,
            );
        }),
        (e.prototype.slide = function (e, t, i, s) {
          var o = this,
            r = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
            !this.lGalleryOn || r !== e)
          ) {
            var n = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(e);
              var a = this.getSlideItem(e),
                l = this.getSlideItem(r),
                d = this.galleryItems[e],
                c = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(e),
                c)
              ) {
                var u = this.mediaContainerPosition,
                  p = u.top,
                  h = u.bottom,
                  g = ke(
                    this.items[e],
                    this.outer,
                    p + h,
                    c && this.settings.videoMaxSize,
                  );
                this.resizeVideoSlide(e, g);
              }
              if (
                (this.LGel.trigger(ye, {
                  prevIndex: r,
                  index: e,
                  fromTouch: !!t,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(e),
                s || (e < r ? (s = "prev") : e > r && (s = "next")),
                t)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var m = void 0,
                  f = void 0;
                n > 2
                  ? ((m = e - 1),
                    (f = e + 1),
                    ((0 === e && r === n - 1) || (e === n - 1 && 0 === r)) &&
                      ((f = 0), (m = n - 1)))
                  : ((m = 0), (f = 1)),
                  "prev" === s
                    ? this.getSlideItem(f).addClass("lg-next-slide")
                    : this.getSlideItem(m).addClass("lg-prev-slide"),
                  a.addClass("lg-current");
              } else this.makeSlideAnimation(s, a, l);
              this.lGalleryOn
                ? setTimeout(
                    function () {
                      o.loadContent(e, !0),
                        ".lg-item" !== o.settings.appendSubHtmlTo &&
                          o.addHtml(e);
                    },
                    this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay),
                  )
                : this.loadContent(e, !0),
                setTimeout(
                  function () {
                    (o.lgBusy = !1),
                      l.removeClass("lg-slide-progress"),
                      o.LGel.trigger(be, {
                        prevIndex: r,
                        index: e,
                        fromTouch: t,
                        fromThumb: i,
                      });
                  },
                  (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay),
                );
            }
            this.index = e;
          }
        }),
        (e.prototype.updateCurrentCounter = function (e) {
          this.getElementById("lg-counter-current").html(e + 1 + "");
        }),
        (e.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + "",
          );
        }),
        (e.prototype.getSlideType = function (e) {
          return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
        }),
        (e.prototype.touchMove = function (e, t, i) {
          var s = t.pageX - e.pageX,
            o = t.pageY - e.pageY,
            r = !1;
          if (
            (this.swipeDirection
              ? (r = !0)
              : Math.abs(s) > 15
                ? ((this.swipeDirection = "horizontal"), (r = !0))
                : Math.abs(o) > 15 &&
                  ((this.swipeDirection = "vertical"), (r = !0)),
            r)
          ) {
            var n = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(n, s, 0);
              var a = n.get().offsetWidth,
                l = (15 * a) / 100 - Math.abs((10 * s) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -a + s - l,
                0,
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  a + s + l,
                  0,
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(o) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var c = 1 - Math.abs(o) / (2 * window.innerWidth);
              this.setTranslate(n, 0, o, c, c),
                Math.abs(o) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (e.prototype.touchEnd = function (e, t, i) {
          var s,
            o = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              o.$container.removeClass("lg-dragging-vertical"),
                o.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var r = !0;
              if ("horizontal" === o.swipeDirection) {
                s = e.pageX - t.pageX;
                var n = Math.abs(e.pageX - t.pageX);
                s < 0 && n > o.settings.swipeThreshold
                  ? (o.goToNextSlide(!0), (r = !1))
                  : s > 0 &&
                    n > o.settings.swipeThreshold &&
                    (o.goToPrevSlide(!0), (r = !1));
              } else if ("vertical" === o.swipeDirection) {
                if (
                  ((s = Math.abs(e.pageY - t.pageY)),
                  o.settings.closable && o.settings.swipeToClose && s > 100)
                )
                  return void o.closeGallery();
                o.$backdrop.css("opacity", 1);
              }
              if (
                (o.outer.find(".lg-item").removeAttr("style"),
                r && Math.abs(e.pageX - t.pageX) < 5)
              ) {
                var a = Pe(i.target);
                o.isPosterElement(a) && o.LGel.trigger(we);
              }
              o.swipeDirection = void 0;
            }),
            setTimeout(function () {
              o.outer.hasClass("lg-dragging") ||
                "lg-slide" === o.settings.mode ||
                o.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (e.prototype.enableSwipe = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            o = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var s = e.getSlideItem(e.index);
              (!Pe(i.target).hasClass("lg-item") &&
                !s.get().contains(i.target)) ||
                e.outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                1 !== i.touches.length ||
                ((o = !0),
                (e.touchAction = "swipe"),
                e.manageSwipeClass(),
                (t = { pageX: i.touches[0].pageX, pageY: i.touches[0].pageY }));
            }),
            this.$inner.on("touchmove.lg", function (r) {
              o &&
                "swipe" === e.touchAction &&
                1 === r.touches.length &&
                ((i = { pageX: r.touches[0].pageX, pageY: r.touches[0].pageY }),
                e.touchMove(t, i, r),
                (s = !0));
            }),
            this.$inner.on("touchend.lg", function (r) {
              if ("swipe" === e.touchAction) {
                if (s) (s = !1), e.touchEnd(i, t, r);
                else if (o) {
                  var n = Pe(r.target);
                  e.isPosterElement(n) && e.LGel.trigger(we);
                }
                (e.touchAction = void 0), (o = !1);
              }
            }));
        }),
        (e.prototype.enableDrag = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            o = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var o = e.getSlideItem(e.index);
              (Pe(i.target).hasClass("lg-item") ||
                o.get().contains(i.target)) &&
                (e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  (i.preventDefault(),
                  e.lgBusy ||
                    (e.manageSwipeClass(),
                    (t = { pageX: i.pageX, pageY: i.pageY }),
                    (s = !0),
                    (e.outer.get().scrollLeft += 1),
                    (e.outer.get().scrollLeft -= 1),
                    e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    e.LGel.trigger(Se))));
            }),
            Pe(window).on("mousemove.lg.global" + this.lgId, function (r) {
              s &&
                e.lgOpened &&
                ((o = !0),
                (i = { pageX: r.pageX, pageY: r.pageY }),
                e.touchMove(t, i),
                e.LGel.trigger(Te));
            }),
            Pe(window).on("mouseup.lg.global" + this.lgId, function (r) {
              if (e.lgOpened) {
                var n = Pe(r.target);
                o
                  ? ((o = !1), e.touchEnd(i, t, r), e.LGel.trigger(xe))
                  : e.isPosterElement(n) && e.LGel.trigger(we),
                  s &&
                    ((s = !1),
                    e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (e.prototype.triggerPosterClick = function () {
          var e = this;
          this.$inner.on("click.lg", function (t) {
            !e.dragOrSwipeEnabled &&
              e.isPosterElement(Pe(t.target)) &&
              e.LGel.trigger(we);
          });
        }),
        (e.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (t = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (e = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
            this.getSlideItem(e).addClass("lg-next-slide");
        }),
        (e.prototype.goToNextSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(Ee, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : i
                  ? ((this.index = 0),
                    this.LGel.trigger(Ee, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
        }),
        (e.prototype.goToPrevSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(Ce, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : i
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Ce, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
        }),
        (e.prototype.keyPress = function () {
          var e = this;
          Pe(window).on("keydown.lg.global" + this.lgId, function (t) {
            e.lgOpened &&
              !0 === e.settings.escKey &&
              27 === t.keyCode &&
              (t.preventDefault(),
              e.settings.allowMediaOverlap &&
              e.outer.hasClass("lg-can-toggle") &&
              e.outer.hasClass("lg-components-open")
                ? e.outer.removeClass("lg-components-open")
                : e.closeGallery()),
              e.lgOpened &&
                e.galleryItems.length > 1 &&
                (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
          });
        }),
        (e.prototype.arrow = function () {
          var e = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (e.prototype.arrowDisable = function (e) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var t = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            e + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === e
                ? t.attr("disabled", "disabled").addClass("disabled")
                : t.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (e.prototype.setTranslate = function (e, t, i, s, o) {
          void 0 === s && (s = 1),
            void 0 === o && (o = 1),
            e.css(
              "transform",
              "translate3d(" +
                t +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                s +
                ", " +
                o +
                ", 1)",
            );
        }),
        (e.prototype.mousewheel = function () {
          var e = this,
            t = 0;
          this.outer.on("wheel.lg", function (i) {
            if (i.deltaY && !(e.galleryItems.length < 2)) {
              i.preventDefault();
              var s = new Date().getTime();
              s - t < 1e3 ||
                ((t = s),
                i.deltaY > 0
                  ? e.goToNextSlide()
                  : i.deltaY < 0 && e.goToPrevSlide());
            }
          });
        }),
        (e.prototype.isSlideElement = function (e) {
          return (
            e.hasClass("lg-outer") ||
            e.hasClass("lg-item") ||
            e.hasClass("lg-img-wrap")
          );
        }),
        (e.prototype.isPosterElement = function (e) {
          var t = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            e.hasClass("lg-video-poster") ||
            e.hasClass("lg-video-play-button") ||
            (t && t.contains(e.get()))
          );
        }),
        (e.prototype.toggleMaximize = function () {
          var e = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            e.$container.toggleClass("lg-inline"), e.refreshOnResize();
          });
        }),
        (e.prototype.invalidateItems = function () {
          for (var e = 0; e < this.items.length; e++) {
            var t = Pe(this.items[e]);
            t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
          }
        }),
        (e.prototype.trapFocus = function () {
          var e = this;
          this.$container.get().focus({ preventScroll: !0 }),
            Pe(window).on("keydown.lg.global" + this.lgId, function (t) {
              if (e.lgOpened && ("Tab" === t.key || 9 === t.keyCode)) {
                var i = He(e.$container.get()),
                  s = i[0],
                  o = i[i.length - 1];
                t.shiftKey
                  ? document.activeElement === s &&
                    (o.focus(), t.preventDefault())
                  : document.activeElement === o &&
                    (s.focus(), t.preventDefault());
              }
            });
        }),
        (e.prototype.manageCloseGallery = function () {
          var e = this;
          if (this.settings.closable) {
            var t = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              e.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (i) {
                  var s = Pe(i.target);
                  t = !!e.isSlideElement(s);
                }),
                this.outer.on("mousemove.lg", function () {
                  t = !1;
                }),
                this.outer.on("mouseup.lg", function (i) {
                  var s = Pe(i.target);
                  e.isSlideElement(s) &&
                    t &&
                    (e.outer.hasClass("lg-dragging") || e.closeGallery());
                }));
          }
        }),
        (e.prototype.closeGallery = function (e) {
          var t = this;
          if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
          this.LGel.trigger(Ie),
            this.settings.resetScrollPosition &&
              !this.settings.hideScrollbar &&
              Pe(window).scrollTop(this.prevScrollTop);
          var i,
            s = this.items[this.index];
          if (this.zoomFromOrigin && s) {
            var o = this.mediaContainerPosition,
              r = o.top,
              n = o.bottom,
              a = this.galleryItems[this.index],
              l = a.__slideVideoInfo,
              d = a.poster,
              c = ke(
                s,
                this.outer,
                r + n,
                l && d && this.settings.videoMaxSize,
              );
            i = ze(s, this.outer, r, n, c);
          }
          this.zoomFromOrigin && i
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms",
                )
                .css("transform", i))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            Pe("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var u =
            this.zoomFromOrigin && i
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration,
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              t.zoomFromOrigin &&
                i &&
                t.outer.removeClass("lg-zoom-from-image"),
                t.$container.removeClass("lg-show"),
                t.resetScrollBar(),
                t.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    t.settings.backdropDuration + "ms",
                  ),
                t.outer.removeClass("lg-closing " + t.settings.startClass),
                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                t.$inner.empty(),
                t.lgOpened && t.LGel.trigger(Le, { instance: t }),
                t.$container.get() && t.$container.get().blur(),
                (t.lgOpened = !1);
            }, u + 100),
            u + 100
          );
        }),
        (e.prototype.initModules = function () {
          this.plugins.forEach(function (e) {
            try {
              e.init();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated",
              );
            }
          });
        }),
        (e.prototype.destroyModules = function (e) {
          this.plugins.forEach(function (t) {
            try {
              e ? t.destroy() : t.closeGallery && t.closeGallery();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed",
              );
            }
          });
        }),
        (e.prototype.refresh = function (e) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = e || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(he);
        }),
        (e.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (e.prototype.destroyGallery = function () {
          this.destroyModules(!0),
            this.settings.dynamic || this.invalidateItems(),
            Pe(window).off(".lg.global" + this.lgId),
            this.LGel.off(".lg"),
            this.$container.remove();
        }),
        (e.prototype.destroy = function () {
          var e = this.closeGallery(!0);
          return (
            e
              ? setTimeout(this.destroyGallery.bind(this), e)
              : this.destroyGallery(),
            e
          );
        }),
        e
      );
    })();
  const We = function (e, t) {
    return new Re(e, t);
  };
  var Ye = function () {
      return (
        (Ye =
          Object.assign ||
          function (e) {
            for (var t, i = 1, s = arguments.length; i < s; i++)
              for (var o in (t = arguments[i]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }),
        Ye.apply(this, arguments)
      );
    },
    Xe = {
      autoplayFirstVideo: !0,
      youTubePlayerParams: !1,
      vimeoPlayerParams: !1,
      wistiaPlayerParams: !1,
      gotoNextSlideOnVideoEnd: !0,
      autoplayVideoOnSlide: !1,
      videojs: !1,
      videojsTheme: "",
      videojsOptions: {},
    },
    Ue = "lgHasVideo",
    Ke = "lgSlideItemLoad",
    Je = "lgBeforeSlide",
    Ze = "lgAfterSlide",
    Qe = "lgPosterClick",
    et = function (e) {
      return Object.keys(e)
        .map(function (t) {
          return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
        })
        .join("&");
    },
    tt = function (e, t) {
      if (!e.youtube) return "";
      var i = e.youtube[2]
          ? e.youtube[2]
              .slice(1)
              .split("&")
              .map(function (e) {
                return e.split("=");
              })
              .reduce(function (e, t) {
                var i = t.map(decodeURIComponent),
                  s = i[0],
                  o = i[1];
                return (e[s] = o), e;
              }, {})
          : "",
        s = t || {},
        o = Ye(
          Ye(
            Ye({}, { wmode: "opaque", autoplay: 0, mute: 1, enablejsapi: 1 }),
            s,
          ),
          i,
        );
      return "?" + et(o);
    };
  const it = (function () {
      function e(e) {
        return (
          (this.core = e),
          (this.settings = Ye(Ye({}, Xe), this.core.settings)),
          this
        );
      }
      return (
        (e.prototype.init = function () {
          var e = this;
          this.core.LGel.on(Ue + ".video", this.onHasVideo.bind(this)),
            this.core.LGel.on(Qe + ".video", function () {
              var t = e.core.getSlideItem(e.core.index);
              e.loadVideoOnPosterClick(t);
            }),
            this.core.LGel.on(Ke + ".video", this.onSlideItemLoad.bind(this)),
            this.core.LGel.on(Je + ".video", this.onBeforeSlide.bind(this)),
            this.core.LGel.on(Ze + ".video", this.onAfterSlide.bind(this));
        }),
        (e.prototype.onSlideItemLoad = function (e) {
          var t = this,
            i = e.detail,
            s = i.isFirstSlide,
            o = i.index;
          this.settings.autoplayFirstVideo &&
            s &&
            o === this.core.index &&
            setTimeout(function () {
              t.loadAndPlayVideo(o);
            }, 200),
            !s &&
              this.settings.autoplayVideoOnSlide &&
              o === this.core.index &&
              this.loadAndPlayVideo(o);
        }),
        (e.prototype.onHasVideo = function (e) {
          var t = e.detail,
            i = t.index,
            s = t.src,
            o = t.html5Video;
          t.hasPoster ||
            (this.appendVideos(this.core.getSlideItem(i), {
              src: s,
              addClass: "lg-object",
              index: i,
              html5Video: o,
            }),
            this.gotoNextSlideOnVideoEnd(s, i));
        }),
        (e.prototype.onBeforeSlide = function (e) {
          if (this.core.lGalleryOn) {
            var t = e.detail.prevIndex;
            this.pauseVideo(t);
          }
        }),
        (e.prototype.onAfterSlide = function (e) {
          var t = this,
            i = e.detail,
            s = i.index,
            o = i.prevIndex,
            r = this.core.getSlideItem(s);
          this.settings.autoplayVideoOnSlide &&
            s !== o &&
            r.hasClass("lg-complete") &&
            setTimeout(function () {
              t.loadAndPlayVideo(s);
            }, 100);
        }),
        (e.prototype.loadAndPlayVideo = function (e) {
          var t = this.core.getSlideItem(e);
          this.core.galleryItems[e].poster
            ? this.loadVideoOnPosterClick(t, !0)
            : this.playVideo(e);
        }),
        (e.prototype.playVideo = function (e) {
          this.controlVideo(e, "play");
        }),
        (e.prototype.pauseVideo = function (e) {
          this.controlVideo(e, "pause");
        }),
        (e.prototype.getVideoHtml = function (e, t, i, s) {
          var o = "",
            r = this.core.galleryItems[i].__slideVideoInfo || {},
            n = this.core.galleryItems[i],
            a = n.title || n.alt;
          a = a ? 'title="' + a + '"' : "";
          var l =
            'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
          if (r.youtube) {
            var d = "lg-youtube" + i,
              c = tt(r, this.settings.youTubePlayerParams);
            o =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-youtube ' +
              t +
              '" ' +
              a +
              ' src="' +
              (e.includes("youtube-nocookie.com")
                ? "//www.youtube-nocookie.com/"
                : "//www.youtube.com/") +
              "embed/" +
              (r.youtube[1] + c) +
              '" ' +
              l +
              "></iframe>";
          } else if (r.vimeo) {
            d = "lg-vimeo" + i;
            var u = (function (e, t) {
              if (!t || !t.vimeo) return "";
              var i = t.vimeo[2] || "",
                s = e && 0 !== Object.keys(e).length ? "&" + et(e) : "",
                o = (
                  (t.vimeo[0].split("/").pop() || "").split("?")[0] || ""
                ).split("#")[0],
                r = t.vimeo[1] !== o;
              return (
                r && (i = i.replace("/" + o, "")),
                "?autoplay=0&muted=1" +
                  (r ? "&h=" + o : "") +
                  s +
                  ("?" == i[0] ? "&" + i.slice(1) : i || "")
              );
            })(this.settings.vimeoPlayerParams, r);
            o =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-vimeo ' +
              t +
              '" ' +
              a +
              ' src="//player.vimeo.com/video/' +
              (r.vimeo[1] + u) +
              '" ' +
              l +
              "></iframe>";
          } else if (r.wistia) {
            var p = "lg-wistia" + i;
            (u = (u = et(this.settings.wistiaPlayerParams)) ? "?" + u : ""),
              (o =
                '<iframe allow="autoplay" id="' +
                p +
                '" src="//fast.wistia.net/embed/iframe/' +
                (r.wistia[4] + u) +
                '" ' +
                a +
                ' class="wistia_embed lg-video-object lg-wistia ' +
                t +
                '" name="wistia_embed" ' +
                l +
                "></iframe>");
          } else if (r.html5) {
            for (var h = "", g = 0; g < s.source.length; g++)
              h +=
                '<source src="' +
                s.source[g].src +
                '" type="' +
                s.source[g].type +
                '">';
            if (s.tracks) {
              var m = function (e) {
                var t = "",
                  i = s.tracks[e];
                Object.keys(i || {}).forEach(function (e) {
                  t += e + '="' + i[e] + '" ';
                }),
                  (h += "<track " + t + ">");
              };
              for (g = 0; g < s.tracks.length; g++) m(g);
            }
            var f = "",
              v = s.attributes || {};
            Object.keys(v || {}).forEach(function (e) {
              f += e + '="' + v[e] + '" ';
            }),
              (o =
                '<video class="lg-video-object lg-html5 ' +
                (this.settings.videojs && this.settings.videojsTheme
                  ? this.settings.videojsTheme + " "
                  : "") +
                " " +
                (this.settings.videojs ? " video-js" : "") +
                '" ' +
                f +
                ">\n                " +
                h +
                "\n                Your browser does not support HTML5 video.\n            </video>");
          }
          return o;
        }),
        (e.prototype.appendVideos = function (e, t) {
          var i,
            s = this.getVideoHtml(t.src, t.addClass, t.index, t.html5Video);
          e.find(".lg-video-cont").append(s);
          var o = e.find(".lg-video-object").first();
          if (
            (t.html5Video &&
              o.on("mousedown.lg.video", function (e) {
                e.stopPropagation();
              }),
            this.settings.videojs &&
              (null ===
                (i = this.core.galleryItems[t.index].__slideVideoInfo) ||
              void 0 === i
                ? void 0
                : i.html5))
          )
            try {
              return videojs(o.get(), this.settings.videojsOptions);
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included videojs",
              );
            }
        }),
        (e.prototype.gotoNextSlideOnVideoEnd = function (e, t) {
          var i = this,
            s = this.core.getSlideItem(t).find(".lg-video-object").first(),
            o = this.core.galleryItems[t].__slideVideoInfo || {};
          if (this.settings.gotoNextSlideOnVideoEnd)
            if (o.html5)
              s.on("ended", function () {
                i.core.goToNextSlide();
              });
            else if (o.vimeo)
              try {
                new Vimeo.Player(s.get()).on("ended", function () {
                  i.core.goToNextSlide();
                });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js",
                );
              }
            else if (o.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: s.attr("id"),
                    onReady: function (e) {
                      e.bind("end", function () {
                        i.core.goToNextSlide();
                      });
                    },
                  });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js",
                );
              }
        }),
        (e.prototype.controlVideo = function (e, t) {
          var i = this.core.getSlideItem(e).find(".lg-video-object").first(),
            s = this.core.galleryItems[e].__slideVideoInfo || {};
          if (i.get())
            if (s.youtube)
              try {
                i.get().contentWindow.postMessage(
                  '{"event":"command","func":"' + t + 'Video","args":""}',
                  "*",
                );
              } catch (e) {
                console.error("lightGallery:- " + e);
              }
            else if (s.vimeo)
              try {
                new Vimeo.Player(i.get())[t]();
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js",
                );
              }
            else if (s.html5)
              if (this.settings.videojs)
                try {
                  videojs(i.get())[t]();
                } catch (e) {
                  console.error(
                    "lightGallery:- Make sure you have included videojs",
                  );
                }
              else i.get()[t]();
            else if (s.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: i.attr("id"),
                    onReady: function (e) {
                      e[t]();
                    },
                  });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js",
                );
              }
        }),
        (e.prototype.loadVideoOnPosterClick = function (e, t) {
          var i = this;
          if (e.hasClass("lg-video-loaded"))
            t && this.playVideo(this.core.index);
          else if (e.hasClass("lg-has-video")) this.playVideo(this.core.index);
          else {
            e.addClass("lg-has-video");
            var s = void 0,
              o = this.core.galleryItems[this.core.index].src,
              r = this.core.galleryItems[this.core.index].video;
            r && (s = "string" == typeof r ? JSON.parse(r) : r);
            var n = this.appendVideos(e, {
              src: o,
              addClass: "",
              index: this.core.index,
              html5Video: s,
            });
            this.gotoNextSlideOnVideoEnd(o, this.core.index);
            var a = e.find(".lg-object").first().get();
            e.find(".lg-video-cont").first().append(a),
              e.addClass("lg-video-loading"),
              n &&
                n.ready(function () {
                  n.on("loadedmetadata", function () {
                    i.onVideoLoadAfterPosterClick(e, i.core.index);
                  });
                }),
              e
                .find(".lg-video-object")
                .first()
                .on("load.lg error.lg loadedmetadata.lg", function () {
                  setTimeout(function () {
                    i.onVideoLoadAfterPosterClick(e, i.core.index);
                  }, 50);
                });
          }
        }),
        (e.prototype.onVideoLoadAfterPosterClick = function (e, t) {
          e.addClass("lg-video-loaded"), this.playVideo(t);
        }),
        (e.prototype.destroy = function () {
          this.core.LGel.off(".lg.video"), this.core.LGel.off(".video");
        }),
        e
      );
    })(),
    st = document.querySelectorAll("[data-gallery]");
  if (st.length) {
    let rt = [];
    st.forEach((e) => {
      rt.push({
        gallery: e,
        galleryClass: We(e, {
          selector: ".item-projects__image",
          plugins: [it],
          thumbnail: !0,
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
          download: !1,
        }),
      });
    }),
      (e.gallery = rt);
  }
  if (window.matchMedia("(min-width: 991.98px)").matches) {
    const nt = document.querySelector(".parallax"),
      at = document.querySelector(".promo");
    at &&
      window.addEventListener("scroll", () => {
        let e = window.scrollY;
        (nt.style.backgroundPosition = `0 -${0.5 * e}px`),
          (at.style.top = `-${0.2 * e}px`);
      });
  }
  if (window.matchMedia("(max-width: 991.98px)").matches) {
    document
      .querySelector(".menu__body")
      .querySelectorAll(".menu-item a")
      .forEach((e) => {
        e.addEventListener("click", () => {
          n(), document.documentElement.classList.remove("menu-open");
        });
      });
  }
  const ot = document.querySelector(".projects_home");
  if (ot) {
    const lt = ot.querySelector(".projects__body");
    if (t.any()) {
      let dt = ot.querySelectorAll(".item-projects"),
        ct = new IntersectionObserver(
          (e) => {
            e.forEach((e) => {
              const t = e.target,
                i = t.querySelector("video");
              i.load(), (i.preload = null);
              let s = i.play();
              void 0 !== s &&
                s
                  .then(() => {
                    !e.isIntersecting || e.intersectionRatio <= 0.9
                      ? (i.pause(),
                        t.classList.remove("item-projects_video-visible"))
                      : (i.play(),
                        t.classList.add("item-projects_video-visible"));
                  })
                  .catch((e) => {});
            });
          },
          { threshold: [0.9, 1] },
        );
      dt.forEach((e) => {
        ct.observe(e);
      });
    } else {
      function ut(e) {
        let t = e.target.closest(".item-projects");
        if (t) {
          let i = t.querySelector("video");
          console.log("video"),
            i &&
              ("mouseover" == e.type &&
                (t.classList.add("item-projects_video-visible"), i.play()),
              "mouseout" == e.type &&
                (t.classList.remove("item-projects_video-visible"), i.pause()));
        }
      }
      lt.onmouseover = lt.onmouseout = ut;
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const e = [
        {
          id: 1,
          title: "Senior JS/C++ (Client)",
          location: "Poland",
          type: "Remote",
          description:
            "<p>RabbitGames is looking for a Senior C# Backend Developer to work on a platform for casual games operation management...</p>",
        },
        {
          id: 2,
          title: "Senior C# (Backend)",
          location: "Remote",
          type: "Remote",
          description:
            "<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>",
        },
        {
          id: 3,
          title: "Senior UX Designer",
          location: "Germany",
          type: "Office",
          description:
            "<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>",
        },
        {
          id: 4,
          title: "C++/UE Developer",
          location: "Poland",
          type: "Hybrid",
          description:
            "<p>Create and optimize game logic and features using Unreal Engine and C++.</p>",
        },
      ],
      t = document.getElementById("locationFilter"),
      i = document.getElementById("typeFilter"),
      s = document.querySelector(".spollers"),
      o = document.querySelector(".vacancies__tabs-wrapper");
    if (!o)
      return void console.error(
        "Не удалось найти элемент .vacancies__tabs-wrapper.",
      );
    const r = document.createElement("div");
    r.classList.add("vacancies__tabs", "tabs"),
      (r.innerHTML =
        '\n    <nav data-tabs-titles class="tabs__navigation"></nav>\n    <div data-tabs-body class="tabs__content"></div>\n  '),
      o.appendChild(r);
    const n = r.querySelector(".tabs__navigation"),
      a = r.querySelector(".tabs__content"),
      l = (t) => {
        const i = e.map((e) => e[t]);
        return ["All", ...new Set(i)];
      },
      d = (e, t) => {
        (e.innerHTML = ""),
          t.forEach((t) => {
            const i = document.createElement("option");
            (i.value = t), (i.textContent = t), e.appendChild(i);
          });
      };
    d(t, l("location")), d(i, l("type"));
    const c = (e) => {
        if (
          (s.replaceChildren(),
          n.replaceChildren(),
          a.replaceChildren(),
          0 === e.length)
        ) {
          const e = document.createElement("p");
          return (
            e.classList.add("vacancies__no-results"),
            (e.textContent = "No vacancies found."),
            void s.appendChild(e)
          );
        }
        e.forEach((e, t) => {
          const i = document.createElement("div");
          i.classList.add("spollers__item"),
            (i.innerHTML = `\n        <button type="button" data-spoller class="spollers__title">${e.title}</button>\n        <div class="spollers__body" hidden>${e.description}</div>\n      `),
            s.appendChild(i);
          const o = document.createElement("button");
          (o.type = "button"),
            o.classList.add("tabs__title"),
            0 === t && o.classList.add("_tab-active"),
            o.setAttribute("data-location", e.location),
            o.setAttribute("data-type", e.type),
            (o.textContent = e.title),
            n.appendChild(o);
          const r = document.createElement("div");
          r.classList.add("tabs__body"),
            0 !== t && (r.style.display = "none"),
            r.setAttribute("data-location", e.location),
            r.setAttribute("data-type", e.type),
            (r.innerHTML = `\n        <h3>${e.title}</h3>\n        <p>${e.description}</p>\n        <a href="#" class="promo__button button button_opacity"><span>Contact US</span></a>\n      `),
            a.appendChild(r),
            o.addEventListener("click", () => {
              document
                .querySelectorAll(".tabs__title")
                .forEach((e) => e.classList.remove("_tab-active")),
                document
                  .querySelectorAll(".tabs__body")
                  .forEach((e) => (e.style.display = "none")),
                o.classList.add("_tab-active"),
                (r.style.display = "block");
            });
        });
      },
      u = () => {
        const s = ((t, i) =>
          e.filter((e) => {
            const s = "All" === t || e.location === t,
              o = "All" === i || e.type === i;
            return s && o;
          }))(t.value, i.value);
        c(s);
      };
    t.addEventListener("change", u), i.addEventListener("change", u), c(e);
  }),
    (window.FLS = !0),
    (function () {
      let e = document.querySelector(".icon-burger");
      e &&
        e.addEventListener("click", function (e) {
          o && (r(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, i) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && r(t);
        let o = l(e, "spollers");
        function r(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  n(e),
                  e.addEventListener("click", a))
                : (e.classList.remove("_spoller-init"),
                  n(e, !1),
                  e.removeEventListener("click", a));
          });
        }
        function n(e, t = !0) {
          let i = e.querySelectorAll("[data-spoller]");
          i.length &&
            ((i = Array.from(i).filter(
              (t) => t.closest("[data-spollers]") === e,
            )),
            i.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function a(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const o = t.closest("[data-spoller]"),
              r = o.closest("[data-spollers]"),
              n = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (n && !o.classList.contains("_spoller-active") && d(r),
              o.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? s(e, t) : i(e, t);
              })(o.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function d(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            i(t.nextElementSibling, 500));
        }
        o &&
          o.length &&
          o.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let t = [];
      if (e.length > 0) {
        const i = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        i && i.startsWith("tab-") && (t = i.replace("tab-", "").split("-")),
          e.forEach((e, i) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", i),
              e.addEventListener("click", n),
              (function (e) {
                let i = e.querySelectorAll("[data-tabs-titles]>*"),
                  s = e.querySelectorAll("[data-tabs-body]>*");
                const o = e.dataset.tabsIndex,
                  r = t[0] == o;
                if (r) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                s.length &&
                  ((s = Array.from(s).filter(
                    (t) => t.closest("[data-tabs]") === e,
                  )),
                  (i = Array.from(i).filter(
                    (t) => t.closest("[data-tabs]") === e,
                  )),
                  s.forEach((e, s) => {
                    i[s].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      r && s == t[1] && i[s].classList.add("_tab-active"),
                      (e.hidden = !i[s].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let s = l(e, "tabs");
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              o(e.itemsArray, e.matchMedia);
            }),
              o(e.itemsArray, e.matchMedia);
          });
      }
      function o(e, t) {
        e.forEach((e) => {
          let i = (e = e.item).querySelector("[data-tabs-titles]"),
            s = e.querySelectorAll("[data-tabs-title]"),
            o = e.querySelector("[data-tabs-body]"),
            r = e.querySelectorAll("[data-tabs-item]");
          (s = Array.from(s).filter((t) => t.closest("[data-tabs]") === e)),
            (r = Array.from(r).filter((t) => t.closest("[data-tabs]") === e)),
            r.forEach((r, n) => {
              t.matches
                ? (o.append(s[n]), o.append(r), e.classList.add("_tab-spoller"))
                : (i.append(s[n]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function r(e) {
        let t = e.querySelectorAll("[data-tabs-title]"),
          o = e.querySelectorAll("[data-tabs-item]");
        const r = e.dataset.tabsIndex;
        const n = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (o.length > 0) {
          const a = e.hasAttribute("data-tabs-hash");
          (o = Array.from(o).filter((t) => t.closest("[data-tabs]") === e)),
            (t = Array.from(t).filter((t) => t.closest("[data-tabs]") === e)),
            o.forEach((e, o) => {
              var l;
              t[o].classList.contains("_tab-active")
                ? (n ? s(e, n) : (e.hidden = !1),
                  a &&
                    !e.closest(".popup") &&
                    ((l = (l = `tab-${r}-${o}`)
                      ? `#${l}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", l)))
                : n
                  ? i(e, n)
                  : (e.hidden = !0);
            });
        }
      }
      function n(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const i = t.closest("[data-tabs-title]"),
            s = i.closest("[data-tabs]");
          if (
            !i.classList.contains("_tab-active") &&
            !s.querySelector("._slide")
          ) {
            let e = s.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === s)),
              e.length && e[0].classList.remove("_tab-active"),
              i.classList.add("_tab-active"),
              r(s);
          }
          e.preventDefault();
        }
      }
    })(),
    window.addEventListener("load", function (e) {
      const t = document.querySelectorAll("[data-showmore]");
      let o, r;
      function n(e) {
        e.forEach((e) => {
          a(e.itemsArray, e.matchMedia);
        });
      }
      function a(e, t) {
        e.forEach((e) => {
          !(function (e, t = !1) {
            let o = (e = t ? e.item : e).querySelectorAll(
                "[data-showmore-content]",
              ),
              r = e.querySelectorAll("[data-showmore-button]");
            (o = Array.from(o).filter(
              (t) => t.closest("[data-showmore]") === e,
            )[0]),
              (r = Array.from(r).filter(
                (t) => t.closest("[data-showmore]") === e,
              )[0]);
            const n = d(e, o);
            (t.matches || !t) &&
            n <
              (function (e) {
                let t = e.offsetHeight;
                e.style.removeProperty("height");
                let i = e.offsetHeight;
                return (e.style.height = `${t}px`), i;
              })(o)
              ? (i(o, 0, n), (r.hidden = !1))
              : (s(o, 0, n), (r.hidden = !0));
          })(e, t);
        });
      }
      function d(e, t) {
        let i = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            s = t.children;
          for (
            let t = 1;
            t < s.length && ((i += s[t - 1].offsetHeight), t != e);
            t++
          );
        } else i = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return i;
      }
      function c(e) {
        const t = e.target,
          l = e.type;
        if ("click" === l) {
          if (t.closest("[data-showmore-button]")) {
            const e = t
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              o = e.querySelector("[data-showmore-content]"),
              r = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              n = d(e, o);
            o.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? i(o, r, n)
                : s(o, r, n),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === l && (o && o.length && a(o), r && r.length && n(r));
      }
      t.length &&
        ((o = Array.from(t).filter(function (e, t, i) {
          return !e.dataset.showmoreMedia;
        })),
        o.length && a(o),
        document.addEventListener("click", c),
        window.addEventListener("resize", c),
        (r = l(t, "showmoreMedia")),
        r &&
          r.length &&
          (r.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            });
          }),
          n(r)));
    }),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            d.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && d.validateInput(t));
        });
    })();
})();
