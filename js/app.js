(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } }),
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let r = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = r + "px"),
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
    r = !0,
    i = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    };
  function a(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function o(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  function l(e, t) {
    const s = Array.from(e).filter(function (e, s, r) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const r = {},
          i = s.dataset[t].split(",");
        (r.value = i[0]),
          (r.type = i[1] ? i[1].trim() : "max"),
          (r.item = s),
          e.push(r);
      });
      let r = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      r = o(r);
      const i = [];
      if (r.length)
        return (
          r.forEach((t) => {
            const s = t.split(","),
              r = s[1],
              n = s[2],
              a = window.matchMedia(s[0]),
              o = e.filter(function (e) {
                if (e.value === r && e.type === n) return !0;
              });
            i.push({ itemsArray: o, matchMedia: a });
          }),
          i
        );
    }
  }
  let d = (e, t = !1, s = 500, r = 0) => {
    const n = "string" == typeof e ? document.querySelector(e) : e;
    if (n) {
      let o = "",
        l = 0;
      t &&
        ((o = "header.header"), (l = document.querySelector(o).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: s,
        header: o,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (i(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", d);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      a(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else a(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  let c = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
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
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              c.removeError(t);
          }
          let r = t.querySelectorAll(".checkbox__input");
          if (r.length > 0)
            for (let e = 0; e < r.length; e++) {
              r[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const r = s[t].querySelector("select");
                e.select.selectBuild(r);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function p(e) {
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
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : p(t[s]) && p(e[s]) && Object.keys(t[s]).length > 0 && u(e[s], t[s]);
      });
  }
  const m = {
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
    return u(e, m), e;
  }
  const f = {
    document: m,
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
  function v() {
    const e = "undefined" != typeof window ? window : {};
    return u(e, f), e;
  }
  function g(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function w() {
    return Date.now();
  }
  function y(e, t) {
    void 0 === t && (t = "x");
    const s = v();
    let r, i, n;
    const a = (function (e) {
      const t = v();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = a.transform || a.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (r = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === r.length
          ? parseFloat(r[12])
          : parseFloat(r[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === r.length
          ? parseFloat(r[13])
          : parseFloat(r[5])),
      i || 0
    );
  }
  function S(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function T() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < arguments.length; r += 1) {
      const i = r < 0 || arguments.length <= r ? void 0 : arguments[r];
      if (
        null != i &&
        ((s = i),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, r = s.length; t < r; t += 1) {
          const r = s[t],
            n = Object.getOwnPropertyDescriptor(i, r);
          void 0 !== n &&
            n.enumerable &&
            (S(e[r]) && S(i[r])
              ? i[r].__swiper__
                ? (e[r] = i[r])
                : T(e[r], i[r])
              : !S(e[r]) && S(i[r])
              ? ((e[r] = {}), i[r].__swiper__ ? (e[r] = i[r]) : T(e[r], i[r]))
              : (e[r] = i[r]));
        }
      }
    }
    var s;
    return e;
  }
  function b(e, t, s) {
    e.style.setProperty(t, s);
  }
  function E(e) {
    let { swiper: t, targetPosition: s, side: r } = e;
    const i = v(),
      n = -t.translate;
    let a,
      o = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > n ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      p = () => {
        (a = new Date().getTime()), null === o && (o = a);
        const e = Math.max(Math.min((a - o) / l, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = n + d * (s - n);
        if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [r]: u }), c(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [r]: u });
            }),
            void i.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = i.requestAnimationFrame(p);
      };
    p();
  }
  function x(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function M(e, t) {
    return v().getComputedStyle(e, null).getPropertyValue(t);
  }
  function C(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function P(e, t, s) {
    const r = v();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let L, A, I;
  function k() {
    return (
      L ||
        (L = (function () {
          const e = v(),
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
      L
    );
  }
  function O(e) {
    return (
      void 0 === e && (e = {}),
      A ||
        (A = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = k(),
            r = v(),
            i = r.navigator.platform,
            n = t || r.navigator.userAgent,
            a = { ios: !1, android: !1 },
            o = r.screen.width,
            l = r.screen.height,
            d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = n.match(/(iPad).*OS\s([\d_]+)/);
          const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            m = "Win32" === i;
          let h = "MacIntel" === i;
          return (
            !c &&
              h &&
              s.touch &&
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
              ].indexOf(`${o}x${l}`) >= 0 &&
              ((c = n.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (h = !1)),
            d && !m && ((a.os = "android"), (a.android = !0)),
            (c || u || p) && ((a.os = "ios"), (a.ios = !0)),
            a
          );
        })(e)),
      A
    );
  }
  function z() {
    return (
      I ||
        (I = (function () {
          const e = v();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, r] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && r < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      I
    );
  }
  var _ = {
    on(e, t, s) {
      const r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if ("function" != typeof t) return r;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          r.eventsListeners[e] || (r.eventsListeners[e] = []),
            r.eventsListeners[e][i](t);
        }),
        r
      );
    },
    once(e, t, s) {
      const r = this;
      if (!r.eventsListeners || r.destroyed) return r;
      if ("function" != typeof t) return r;
      function i() {
        r.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
        for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
          n[a] = arguments[a];
        t.apply(r, n);
      }
      return (i.__emitterProxy = t), r.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const r = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[r](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((r, i) => {
                  (r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, r;
      for (var i = arguments.length, n = new Array(i), a = 0; a < i; a++)
        n[a] = arguments[a];
      "string" == typeof n[0] || Array.isArray(n[0])
        ? ((t = n[0]), (s = n.slice(1, n.length)), (r = e))
        : ((t = n[0].events), (s = n[0].data), (r = n[0].context || e)),
        s.unshift(r);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(r, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(r, s);
              });
        }),
        e
      );
    },
  };
  const G = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    D = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    N = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const r =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        i = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = i,
          n = [s - t];
        return (
          n.push(...Array.from({ length: t }).map((e, t) => s + r + t)),
          void e.slides.forEach((t, s) => {
            n.includes(t.column) && D(e, s);
          })
        );
      }
      const n = i + r - 1;
      if (e.params.rewind || e.params.loop)
        for (let r = i - t; r <= n + t; r += 1) {
          const t = ((r % s) + s) % s;
          (t < i || t > n) && D(e, t);
        }
      else
        for (let r = Math.max(i - t, 0); r <= Math.min(n + t, s - 1); r += 1)
          r !== i && (r > n || r < i) && D(e, r);
    };
  var $ = {
    updateSize: function () {
      const e = this;
      let t, s;
      const r = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : r.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : r.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(M(r, "padding-left") || 0, 10) -
            parseInt(M(r, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(M(r, "padding-top") || 0, 10) -
            parseInt(M(r, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const r = e.params,
        {
          wrapperEl: i,
          slidesEl: n,
          size: a,
          rtlTranslate: o,
          wrongRTL: l,
        } = e,
        d = e.virtual && r.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = x(n, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let m = [];
      const h = [],
        f = [];
      let v = r.slidesOffsetBefore;
      "function" == typeof v && (v = r.slidesOffsetBefore.call(e));
      let g = r.slidesOffsetAfter;
      "function" == typeof g && (g = r.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        y = e.slidesGrid.length;
      let S = r.spaceBetween,
        T = -v,
        E = 0,
        C = 0;
      if (void 0 === a) return;
      "string" == typeof S && S.indexOf("%") >= 0
        ? (S = (parseFloat(S.replace("%", "")) / 100) * a)
        : "string" == typeof S && (S = parseFloat(S)),
        (e.virtualSize = -S),
        p.forEach((e) => {
          o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        r.centeredSlides &&
          r.cssMode &&
          (b(i, "--swiper-centered-offset-before", ""),
          b(i, "--swiper-centered-offset-after", ""));
      const L = r.grid && r.grid.rows > 1 && e.grid;
      let A;
      L && e.grid.initSlides(u);
      const I =
        "auto" === r.slidesPerView &&
        r.breakpoints &&
        Object.keys(r.breakpoints).filter(
          (e) => void 0 !== r.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < u; i += 1) {
        let n;
        if (
          ((A = 0),
          p[i] && (n = p[i]),
          L && e.grid.updateSlide(i, n, u, t),
          !p[i] || "none" !== M(n, "display"))
        ) {
          if ("auto" === r.slidesPerView) {
            I && (p[i].style[t("width")] = "");
            const a = getComputedStyle(n),
              o = n.style.transform,
              l = n.style.webkitTransform;
            if (
              (o && (n.style.transform = "none"),
              l && (n.style.webkitTransform = "none"),
              r.roundLengths)
            )
              A = e.isHorizontal() ? P(n, "width", !0) : P(n, "height", !0);
            else {
              const e = s(a, "width"),
                t = s(a, "padding-left"),
                r = s(a, "padding-right"),
                i = s(a, "margin-left"),
                o = s(a, "margin-right"),
                l = a.getPropertyValue("box-sizing");
              if (l && "border-box" === l) A = e + i + o;
              else {
                const { clientWidth: s, offsetWidth: a } = n;
                A = e + t + r + i + o + (a - s);
              }
            }
            o && (n.style.transform = o),
              l && (n.style.webkitTransform = l),
              r.roundLengths && (A = Math.floor(A));
          } else
            (A = (a - (r.slidesPerView - 1) * S) / r.slidesPerView),
              r.roundLengths && (A = Math.floor(A)),
              p[i] && (p[i].style[t("width")] = `${A}px`);
          p[i] && (p[i].swiperSlideSize = A),
            f.push(A),
            r.centeredSlides
              ? ((T = T + A / 2 + E / 2 + S),
                0 === E && 0 !== i && (T = T - a / 2 - S),
                0 === i && (T = T - a / 2 - S),
                Math.abs(T) < 0.001 && (T = 0),
                r.roundLengths && (T = Math.floor(T)),
                C % r.slidesPerGroup == 0 && m.push(T),
                h.push(T))
              : (r.roundLengths && (T = Math.floor(T)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && m.push(T),
                h.push(T),
                (T = T + A + S)),
            (e.virtualSize += A + S),
            (E = A),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + g),
        o &&
          l &&
          ("slide" === r.effect || "coverflow" === r.effect) &&
          (i.style.width = `${e.virtualSize + S}px`),
        r.setWrapperSize && (i.style[t("width")] = `${e.virtualSize + S}px`),
        L && e.grid.updateWrapperSize(A, m, t),
        !r.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < m.length; s += 1) {
          let i = m[s];
          r.roundLengths && (i = Math.floor(i)),
            m[s] <= e.virtualSize - a && t.push(i);
        }
        (m = t),
          Math.floor(e.virtualSize - a) - Math.floor(m[m.length - 1]) > 1 &&
            m.push(e.virtualSize - a);
      }
      if (d && r.loop) {
        const t = f[0] + S;
        if (r.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                r.slidesPerGroup,
            ),
            i = t * r.slidesPerGroup;
          for (let e = 0; e < s; e += 1) m.push(m[m.length - 1] + i);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === r.slidesPerGroup && m.push(m[m.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === m.length && (m = [0]), 0 !== S)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(r.cssMode && !r.loop) || t !== p.length - 1,
        ).forEach((e) => {
          e.style[s] = `${S}px`;
        });
      }
      if (r.centeredSlides && r.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (S || 0);
        }),
          (e -= S);
        const t = e - a;
        m = m.map((e) => (e <= 0 ? -v : e > t ? t + g : e));
      }
      if (r.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (S || 0);
          }),
          (e -= S),
          e < a)
        ) {
          const t = (a - e) / 2;
          m.forEach((e, s) => {
            m[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: m,
          slidesGrid: h,
          slidesSizesGrid: f,
        }),
        r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
      ) {
        b(i, "--swiper-centered-offset-before", -m[0] + "px"),
          b(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        m.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== y && e.emit("slidesGridLengthChange"),
        r.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || r.cssMode || ("slide" !== r.effect && "fade" !== r.effect)))
      ) {
        const t = `${r.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= r.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        r = t.virtual && t.params.virtual.enabled;
      let i,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) => (r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !r) break;
            s.push(a(e));
          }
      else s.push(a(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let r = 0; r < t.length; r += 1)
        t[r].swiperSlideOffset =
          (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: r, rtlTranslate: i, snapGrid: n } = t;
      if (0 === r.length) return;
      void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      i && (a = e),
        r.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let o = s.spaceBetween;
      "string" == typeof o && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
        : "string" == typeof o && (o = parseFloat(o));
      for (let e = 0; e < r.length; e += 1) {
        const l = r[e];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= r[0].swiperSlideOffset);
        const c =
            (a + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          p =
            (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          u = -(a - d),
          m = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (m > 1 && m <= t.size) ||
          (u <= 0 && m >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          r[e].classList.add(s.slideVisibleClass)),
          (l.progress = i ? -c : c),
          (l.originalProgress = i ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        r = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: n, isEnd: a, progressLoop: o } = t;
      const l = n,
        d = a;
      if (0 === r) (i = 0), (n = !0), (a = !0);
      else {
        i = (e - t.minTranslate()) / r;
        const s = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (n = s || i <= 0), (a = o || i >= 1), s && (i = 0), o && (i = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          r = t.getSlideIndexByData(t.slides.length - 1),
          i = t.slidesGrid[s],
          n = t.slidesGrid[r],
          a = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= i ? (l - i) / a : (l + a - n) / a), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: i,
        progressLoop: o,
        isBeginning: n,
        isEnd: a,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !l && t.emit("reachBeginning toEdge"),
        a && !d && t.emit("reachEnd toEdge"),
        ((l && !n) || (d && !a)) && t.emit("fromEdge"),
        t.emit("progress", i);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: r, activeIndex: i } = e,
        n = e.virtual && s.virtual.enabled,
        a = (e) => x(r, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        n)
      )
        if (s.loop) {
          let t = i - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = a(`[data-swiper-slide-index="${t}"]`));
        } else o = a(`[data-swiper-slide-index="${i}"]`);
      else o = t[i];
      if (o) {
        o.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const r = e.nextElementSibling;
            t ? r.matches(t) && s.push(r) : s.push(r), (e = r);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let r = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const r = e.previousElementSibling;
            t ? r.matches(t) && s.push(r) : s.push(r), (e = r);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !r && (r = t[t.length - 1]),
          r && r.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: r,
          params: i,
          activeIndex: n,
          realIndex: a,
          snapIndex: o,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              r = e.rtlTranslate ? e.translate : -e.translate;
            let i;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (i = e)
                  : r >= t[e] && r < t[e + 1] && (i = e + 1)
                : r >= t[e] && (i = e);
            return (
              s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i
            );
          })(t)),
        r.indexOf(s) >= 0)
      )
        l = r.indexOf(s);
      else {
        const e = Math.min(i.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / i.slidesPerGroup);
      }
      if ((l >= r.length && (l = r.length - 1), d === n))
        return (
          l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && i.virtual.enabled && i.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10,
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
        t.initialized && N(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (a !== p && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        r = s.params;
      let i = e.closest(`.${r.slideClass}, swiper-slide`);
      !i &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !i &&
            e.matches &&
            e.matches(`.${r.slideClass}, swiper-slide`) &&
            (i = e);
        });
      let n,
        a = !1;
      if (i)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === i) {
            (a = !0), (n = e);
            break;
          }
      if (!i || !a)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = i),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              i.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = n),
        r.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var V = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: r, wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -r : r;
      if (t.cssMode) return r;
      let n = y(i, e);
      return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: r, params: i, wrapperEl: n, progress: a } = s;
      let o,
        l = 0,
        d = 0;
      s.isHorizontal() ? (l = r ? -e : e) : (d = e),
        i.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : d),
        i.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -d)
          : i.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (n.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
        o !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, r, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === r && (r = !0);
      const n = this,
        { params: a, wrapperEl: o } = n;
      if (n.animating && a.preventInteractionOnTransition) return !1;
      const l = n.minTranslate(),
        d = n.maxTranslate();
      let c;
      if (
        ((c = r && e > l ? l : r && e < d ? d : e),
        n.updateProgress(c),
        a.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!n.support.smoothScroll)
            return (
              E({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, i), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, i),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd,
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function F(e) {
    let { swiper: t, runCallbacks: s, direction: r, step: i } = e;
    const { activeIndex: n, previousIndex: a } = t;
    let o = r;
    if (
      (o || (o = n > a ? "next" : n < a ? "prev" : "reset"),
      t.emit(`transition${i}`),
      s && n !== a)
    ) {
      if ("reset" === o) return void t.emit(`slideResetTransition${i}`);
      t.emit(`slideChangeTransition${i}`),
        "next" === o
          ? t.emit(`slideNextTransition${i}`)
          : t.emit(`slidePrevTransition${i}`);
    }
  }
  var W = {
    slideTo: function (e, t, s, r, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const n = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: m,
        enabled: h,
      } = n;
      if ((n.animating && o.preventInteractionOnTransition) || (!h && !r && !i))
        return !1;
      const f = Math.min(n.params.slidesPerGroupSkip, a);
      let v = f + Math.floor((a - f) / n.params.slidesPerGroup);
      v >= l.length && (v = l.length - 1);
      const g = -l[v];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * g),
            s = Math.floor(100 * d[e]),
            r = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < r - (r - s) / 2
              ? (a = e)
              : t >= s && t < r && (a = e + 1)
            : t >= s && (a = e);
        }
      if (n.initialized && a !== p) {
        if (
          !n.allowSlideNext &&
          (u
            ? g > n.translate && g > n.minTranslate()
            : g < n.translate && g < n.minTranslate())
        )
          return !1;
        if (
          !n.allowSlidePrev &&
          g > n.translate &&
          g > n.maxTranslate() &&
          (p || 0) !== a
        )
          return !1;
      }
      let w;
      if (
        (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
        n.updateProgress(g),
        (w = a > p ? "next" : a < p ? "prev" : "reset"),
        (u && -g === n.translate) || (!u && g === n.translate))
      )
        return (
          n.updateActiveIndex(a),
          o.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== o.effect && n.setTranslate(g),
          "reset" !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)),
          !1
        );
      if (o.cssMode) {
        const e = n.isHorizontal(),
          s = u ? g : -g;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
              ? ((n._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  m[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (m[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._immediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              E({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(g),
        n.updateActiveIndex(a),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, r),
        n.transitionStart(s, w),
        0 === t
          ? n.transitionEnd(s, w)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd,
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, w));
              }),
            n.wrapperEl.addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, r) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const i = this;
      let n = e;
      return (
        i.params.loop &&
          (i.virtual && i.params.virtual.enabled
            ? (n += i.virtual.slidesBefore)
            : (n = i.getSlideIndexByData(n))),
        i.slideTo(n, t, s, r)
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const r = this,
        { enabled: i, params: n, animating: a } = r;
      if (!i) return r;
      let o = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (o = Math.max(r.slidesPerViewDynamic("current", !0), 1));
      const l = r.activeIndex < n.slidesPerGroupSkip ? 1 : o,
        d = r.virtual && n.virtual.enabled;
      if (n.loop) {
        if (a && !d && n.loopPreventsSliding) return !1;
        if (
          (r.loopFix({ direction: "next" }),
          (r._clientLeft = r.wrapperEl.clientLeft),
          r.activeIndex === r.slides.length - 1 && n.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              r.slideTo(r.activeIndex + l, e, t, s);
            }),
            !0
          );
      }
      return n.rewind && r.isEnd
        ? r.slideTo(0, e, t, s)
        : r.slideTo(r.activeIndex + l, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const r = this,
        {
          params: i,
          snapGrid: n,
          slidesGrid: a,
          rtlTranslate: o,
          enabled: l,
          animating: d,
        } = r;
      if (!l) return r;
      const c = r.virtual && i.virtual.enabled;
      if (i.loop) {
        if (d && !c && i.loopPreventsSliding) return !1;
        r.loopFix({ direction: "prev" }),
          (r._clientLeft = r.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(o ? r.translate : -r.translate),
        m = n.map((e) => p(e));
      let h = n[m.indexOf(u) - 1];
      if (void 0 === h && i.cssMode) {
        let e;
        n.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== h &&
          ((f = a.indexOf(h)),
          f < 0 && (f = r.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((f = f - r.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        i.rewind && r.isBeginning)
      ) {
        const i =
          r.params.virtual && r.params.virtual.enabled && r.virtual
            ? r.virtual.slides.length - 1
            : r.slides.length - 1;
        return r.slideTo(i, e, t, s);
      }
      return i.loop && 0 === r.activeIndex && i.cssMode
        ? (requestAnimationFrame(() => {
            r.slideTo(f, e, t, s);
          }),
          !0)
        : r.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, r) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === r && (r = 0.5);
      const i = this;
      let n = i.activeIndex;
      const a = Math.min(i.params.slidesPerGroupSkip, n),
        o = a + Math.floor((n - a) / i.params.slidesPerGroup),
        l = i.rtlTranslate ? i.translate : -i.translate;
      if (l >= i.snapGrid[o]) {
        const e = i.snapGrid[o];
        l - e > (i.snapGrid[o + 1] - e) * r && (n += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[o - 1];
        l - e <= (i.snapGrid[o] - e) * r && (n -= i.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, i.slidesGrid.length - 1)),
        i.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        r =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        n = e.clickedIndex;
      const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? n < e.loopedSlides - r / 2 ||
              n > e.slides.length - e.loopedSlides + r / 2
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  x(s, `${a}[data-swiper-slide-index="${i}"]`)[0],
                )),
                g(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - r
            ? (e.loopFix(),
              (n = e.getSlideIndex(
                x(s, `${a}[data-swiper-slide-index="${i}"]`)[0],
              )),
              g(() => {
                e.slideTo(n);
              }))
            : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  var B = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: r } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      x(r, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: r,
        setTranslate: i,
        activeSlideIndex: n,
        byController: a,
        byMousewheel: o,
      } = void 0 === e ? {} : e;
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
        slides: d,
        allowSlidePrev: c,
        allowSlideNext: p,
        slidesEl: u,
        params: m,
      } = l;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && m.virtual.enabled)
      )
        return (
          s &&
            (m.centeredSlides || 0 !== l.snapIndex
              ? m.centeredSlides && l.snapIndex < m.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = c),
          (l.allowSlideNext = p),
          void l.emit("loopFix")
        );
      const h =
        "auto" === m.slidesPerView
          ? l.slidesPerViewDynamic()
          : Math.ceil(parseFloat(m.slidesPerView, 10));
      let f = m.loopedSlides || h;
      f % m.slidesPerGroup != 0 &&
        (f += m.slidesPerGroup - (f % m.slidesPerGroup)),
        (l.loopedSlides = f);
      const v = [],
        g = [];
      let w = l.activeIndex;
      void 0 === n
        ? (n = l.getSlideIndex(
            l.slides.filter((e) => e.classList.contains(m.slideActiveClass))[0],
          ))
        : (w = n);
      const y = "next" === r || !r,
        S = "prev" === r || !r;
      let T = 0,
        b = 0;
      if (n < f) {
        T = Math.max(f - n, m.slidesPerGroup);
        for (let e = 0; e < f - n; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          v.push(d.length - t - 1);
        }
      } else if (n > l.slides.length - 2 * f) {
        b = Math.max(n - (l.slides.length - 2 * f), m.slidesPerGroup);
        for (let e = 0; e < b; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          g.push(t);
        }
      }
      if (
        (S &&
          v.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.prepend(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        y &&
          g.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.append(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === m.slidesPerView && l.updateSlides(),
        m.watchSlidesProgress && l.updateSlidesOffset(),
        s)
      )
        if (v.length > 0 && S)
          if (void 0 === t) {
            const e = l.slidesGrid[w],
              t = l.slidesGrid[w + T] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(w + T, 0, !1, !0),
                i &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else
            i &&
              (l.slideToLoop(t, 0, !1, !0),
              (l.touchEventsData.currentTranslate = l.translate));
        else if (g.length > 0 && y)
          if (void 0 === t) {
            const e = l.slidesGrid[w],
              t = l.slidesGrid[w - b] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(w - b, 0, !1, !0),
                i &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else l.slideToLoop(t, 0, !1, !0);
      if (
        ((l.allowSlidePrev = c),
        (l.allowSlideNext = p),
        l.controller && l.controller.control && !a)
      ) {
        const e = {
          slideRealIndex: t,
          direction: r,
          setTranslate: i,
          activeSlideIndex: n,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === m.slidesPerView && s,
                });
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix({
              ...e,
              slideTo:
                l.controller.control.params.slidesPerView === m.slidesPerView &&
                s,
            });
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const r = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        r[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        r.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function q(e) {
    const t = this,
      s = h(),
      r = v(),
      i = t.touchEventsData;
    i.evCache.push(e);
    const { params: n, touches: a, enabled: o } = t;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (i.isTouched && i.isMoved) return;
    const c = !!n.noSwipingClass && "" !== n.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && p && (d = p[0]);
    const u = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      m = !(!l.target || !l.target.shadowRoot);
    if (
      n.noSwiping &&
      (m
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === h() || s === v()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const r = s.closest(e);
                return r || s.getRootNode ? r || t(s.getRootNode().host) : null;
              })(t)
            );
          })(u, d)
        : d.closest(u))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
    (a.currentX = l.pageX), (a.currentY = l.pageY);
    const f = a.currentX,
      g = a.currentY,
      y = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
      S = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (y && (f <= S || f >= r.innerWidth - S)) {
      if ("prevent" !== y) return;
      e.preventDefault();
    }
    Object.assign(i, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (a.startX = f),
      (a.startY = g),
      (i.touchStartTime = w()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (i.allowThresholdMove = !1);
    let T = !0;
    d.matches(i.focusableElements) &&
      ((T = !1), "SELECT" === d.nodeName && (i.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(i.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const b = T && t.allowTouchMove && n.touchStartPreventDefault;
    (!n.touchStartForcePreventDefault && !b) ||
      d.isContentEditable ||
      l.preventDefault(),
      n.freeMode &&
        n.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function R(e) {
    const t = h(),
      s = this,
      r = s.touchEventsData,
      { params: i, touches: n, rtlTranslate: a, enabled: o } = s;
    if (!o) return;
    if (!i.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !r.isTouched))
      return void (
        r.startMoving &&
        r.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    const d = r.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (r.evCache[d] = l);
    const c = r.evCache.length > 1 ? r.evCache[0] : l,
      p = c.pageX,
      u = c.pageY;
    if (l.preventedByNestedSwiper) return (n.startX = p), void (n.startY = u);
    if (!s.allowTouchMove)
      return (
        l.target.matches(r.focusableElements) || (s.allowClick = !1),
        void (
          r.isTouched &&
          (Object.assign(n, {
            startX: p,
            startY: u,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: p,
            currentY: u,
          }),
          (r.touchStartTime = w()))
        )
      );
    if (i.touchReleaseOnEdges && !i.loop)
      if (s.isVertical()) {
        if (
          (u < n.startY && s.translate <= s.maxTranslate()) ||
          (u > n.startY && s.translate >= s.minTranslate())
        )
          return (r.isTouched = !1), void (r.isMoved = !1);
      } else if (
        (p < n.startX && s.translate <= s.maxTranslate()) ||
        (p > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(r.focusableElements)
    )
      return (r.isMoved = !0), void (s.allowClick = !1);
    if (
      (r.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (n.currentX = p), (n.currentY = u);
    const m = n.currentX - n.startX,
      f = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(m ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === r.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (r.isScrolling = !1)
        : m * m + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(m))) / Math.PI),
          (r.isScrolling = s.isHorizontal()
            ? e > i.touchAngle
            : 90 - e > i.touchAngle));
    }
    if (
      (r.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === r.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (r.startMoving = !0)),
      r.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          r.evCache.length > 1))
    )
      return void (r.isTouched = !1);
    if (!r.startMoving) return;
    (s.allowClick = !1),
      !i.cssMode && l.cancelable && l.preventDefault(),
      i.touchMoveStopPropagation && !i.nested && l.stopPropagation();
    let v = s.isHorizontal() ? m : f,
      g = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    i.oneWayMovement &&
      ((v = Math.abs(v) * (a ? 1 : -1)), (g = Math.abs(g) * (a ? 1 : -1))),
      (n.diff = v),
      (v *= i.touchRatio),
      a && ((v = -v), (g = -g));
    const y = s.touchesDirection;
    (s.swipeDirection = v > 0 ? "prev" : "next"),
      (s.touchesDirection = g > 0 ? "prev" : "next");
    const S = s.params.loop && !i.cssMode,
      T =
        ("next" === s.swipeDirection && s.allowSlideNext) ||
        ("prev" === s.swipeDirection && s.allowSlidePrev);
    if (!r.isMoved) {
      if (
        (S && T && s.loopFix({ direction: s.swipeDirection }),
        (r.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (r.allowMomentumBounce = !1),
        !i.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l);
    }
    let b;
    r.isMoved &&
      y !== s.touchesDirection &&
      S &&
      T &&
      Math.abs(v) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (b = !0)),
      s.emit("sliderMove", l),
      (r.isMoved = !0),
      (r.currentTranslate = v + r.startTranslate);
    let E = !0,
      x = i.resistanceRatio;
    if (
      (i.touchReleaseOnEdges && (x = 0),
      v > 0
        ? (S &&
            T &&
            !b &&
            r.currentTranslate >
              (i.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          r.currentTranslate > s.minTranslate() &&
            ((E = !1),
            i.resistance &&
              (r.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + r.startTranslate + v) ** x)))
        : v < 0 &&
          (S &&
            T &&
            !b &&
            r.currentTranslate <
              (i.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === i.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(i.slidesPerView, 10))),
            }),
          r.currentTranslate < s.maxTranslate() &&
            ((E = !1),
            i.resistance &&
              (r.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - r.startTranslate - v) ** x))),
      E && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        r.currentTranslate < r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        r.currentTranslate > r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (r.currentTranslate = r.startTranslate),
      i.threshold > 0)
    ) {
      if (!(Math.abs(v) > i.threshold || r.allowThresholdMove))
        return void (r.currentTranslate = r.startTranslate);
      if (!r.allowThresholdMove)
        return (
          (r.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (r.currentTranslate = r.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    i.followFinger &&
      !i.cssMode &&
      (((i.freeMode && i.freeMode.enabled && s.freeMode) ||
        i.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      i.freeMode &&
        i.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(r.currentTranslate),
      s.setTranslate(r.currentTranslate));
  }
  function H(e) {
    const t = this,
      s = t.touchEventsData,
      r = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (r >= 0 && s.evCache.splice(r, 1),
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        e.type,
      ))
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(e.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: i,
      touches: n,
      rtlTranslate: a,
      slidesGrid: o,
      enabled: l,
    } = t;
    if (!l) return;
    if (!i.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", d),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    i.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = w(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target, e),
        t.emit("tap click", d),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((s.lastClickTime = w()),
      g(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = i.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      i.cssMode)
    )
      return;
    if (i.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let m = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((m = e), (h = o[e + t] - o[e]))
        : u >= o[e] && ((m = e), (h = o[o.length - 1] - o[o.length - 2]));
    }
    let f = null,
      v = null;
    i.rewind &&
      (t.isBeginning
        ? (v =
            i.virtual && i.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const y = (u - o[m]) / h,
      S = m < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (p > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (y >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? f : m + S)
          : t.slideTo(m)),
        "prev" === t.swipeDirection &&
          (y > 1 - i.longSwipesRatio
            ? t.slideTo(m + S)
            : null !== v && y < 0 && Math.abs(y) > i.longSwipesRatio
            ? t.slideTo(v)
            : t.slideTo(m));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(m + S)
          : t.slideTo(m)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : m + S),
          "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m));
    }
  }
  function j() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: r, allowSlidePrev: i, snapGrid: n } = e,
      a = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !a
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
      (e.allowSlidePrev = i),
      (e.allowSlideNext = r),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function X(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Y() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: r } = e;
    if (!r) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (i = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function U(e) {
    const t = this;
    G(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let K = !1;
  function Z() {}
  const Q = (e, t) => {
    const s = h(),
      { params: r, el: i, wrapperEl: n, device: a } = e,
      o = !!r.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    i[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (r.preventClicks || r.preventClicksPropagation) &&
        i[l]("click", e.onClick, !0),
      r.cssMode && n[l]("scroll", e.onScroll),
      r.updateOnWindowResize
        ? e[d](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            j,
            !0,
          )
        : e[d]("observerUpdate", j, !0),
      i[l]("load", e.onLoad, { capture: !0 });
  };
  const J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ee = {
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
    loopedSlides: null,
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
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function te(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const r = Object.keys(s)[0],
        i = s[r];
      "object" == typeof i && null !== i
        ? (!0 === e[r] && (e[r] = { enabled: !0 }),
          "navigation" === r &&
            e[r] &&
            e[r].enabled &&
            !e[r].prevEl &&
            !e[r].nextEl &&
            (e[r].auto = !0),
          ["pagination", "scrollbar"].indexOf(r) >= 0 &&
            e[r] &&
            e[r].enabled &&
            !e[r].el &&
            (e[r].auto = !0),
          r in e && "enabled" in i
            ? ("object" != typeof e[r] ||
                "enabled" in e[r] ||
                (e[r].enabled = !0),
              e[r] || (e[r] = { enabled: !1 }),
              T(t, s))
            : T(t, s))
        : T(t, s);
    };
  }
  const se = {
      eventsEmitter: _,
      update: $,
      translate: V,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: r } = s;
          r.cssMode ||
            (r.autoHeight && s.updateAutoHeight(),
            F({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: r } = s;
          (s.animating = !1),
            r.cssMode ||
              (s.setTransition(0),
              F({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: W,
      loop: B,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
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
            t = h(),
            { params: s } = e;
          (e.onTouchStart = q.bind(e)),
            (e.onTouchMove = R.bind(e)),
            (e.onTouchEnd = H.bind(e)),
            s.cssMode && (e.onScroll = Y.bind(e)),
            (e.onClick = X.bind(e)),
            (e.onLoad = U.bind(e)),
            K || (t.addEventListener("touchstart", Z), (K = !0)),
            Q(e, "on");
        },
        detachEvents: function () {
          Q(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: r, el: i } = e,
            n = r.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const o = (a in n ? n[a] : void 0) || e.originalParams,
            l = J(e, r),
            d = J(e, o),
            c = r.enabled;
          l && !d
            ? (i.classList.remove(
                `${r.containerModifierClass}grid`,
                `${r.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (i.classList.add(`${r.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === r.grid.fill)) &&
                i.classList.add(`${r.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === o[t]) return;
              const s = r[t] && r[t].enabled,
                i = o[t] && o[t].enabled;
              s && !i && e[t].disable(), !s && i && e[t].enable();
            });
          const p = o.direction && o.direction !== r.direction,
            u = r.loop && (o.slidesPerView !== r.slidesPerView || p),
            m = r.loop;
          p && s && e.changeDirection(), T(e.params, o);
          const h = e.params.enabled,
            f = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !h ? e.disable() : !c && h && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", o),
            s &&
              (u
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !m && f
                ? (e.loopCreate(t), e.updateSlides())
                : m && !f && e.loopDestroy()),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let r = !1;
          const i = v(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < a.length; e += 1) {
            const { point: n, value: o } = a[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${o}px)`).matches && (r = n)
              : o <= s.clientWidth && (r = n);
          }
          return r || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: r } = s;
          if (r) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * r;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: r, el: i, device: n } = e,
            a = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((r) => {
                        e[r] && s.push(t + r);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: r },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: n.android },
                { ios: n.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...a), i.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    re = {};
  class ie {
    constructor() {
      let e, t;
      for (var s = arguments.length, r = new Array(s), i = 0; i < s; i++)
        r[i] = arguments[i];
      1 === r.length &&
      r[0].constructor &&
      "Object" === Object.prototype.toString.call(r[0]).slice(8, -1)
        ? (t = r[0])
        : ([e, t] = r),
        t || (t = {}),
        (t = T({}, t)),
        e && !t.el && (t.el = e);
      const n = h();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const r = T({}, t, { el: s });
            e.push(new ie(r));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = k()),
        (a.device = O({ userAgent: t.userAgent })),
        (a.browser = z()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
      const o = {};
      a.modules.forEach((e) => {
        e({
          params: t,
          swiper: a,
          extendParams: te(t, o),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const l = T({}, ee, o);
      return (
        (a.params = T({}, l, re, t)),
        (a.originalParams = T({}, a.params)),
        (a.passedParams = T({}, t)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
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
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        r = C(x(t, `.${s.slideClass}, swiper-slide`)[0]);
      return C(e) - r;
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
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const r = s.minTranslate(),
        i = (s.maxTranslate() - r) * e + r;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
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
      e.slides.forEach((s) => {
        const r = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: r }), e.emit("_slideClass", s, r);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: r,
        slidesGrid: i,
        slidesSizesGrid: n,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = r[o] ? r[o].swiperSlideSize : 0;
        for (let s = o + 1; s < r.length; s += 1)
          r[s] &&
            !e &&
            ((t += r[s].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let s = o - 1; s >= 0; s -= 1)
          r[s] &&
            !e &&
            ((t += r[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < r.length; e += 1) {
          (t ? i[e] + n[e] - i[o] < a : i[e] - i[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          i[o] - i[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function r() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && G(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        r(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          i = e.slideTo(t.length - 1, 0, !1, !0);
        } else i = e.slideTo(e.activeIndex, 0, !1, !0);
        i || r();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        r = s.params.direction;
      return (
        e || (e = "horizontal" === r ? "vertical" : "horizontal"),
        e === r ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
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
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const r = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let i = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(r());
        }
        return x(s, r())[0];
      })();
      return (
        !i &&
          t.params.createElements &&
          ((i = (function (e, t) {
            void 0 === t && (t = []);
            const s = document.createElement(e);
            return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
          })("div", t.params.wrapperClass)),
          s.append(i),
          x(s, `.${t.params.slideClass}`).forEach((e) => {
            i.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: i,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : i,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction")),
          wrongRTL: "-webkit-box" === M(i, "display"),
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
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? G(t, e)
            : e.addEventListener("load", (e) => {
                G(t, e.target);
              });
        }),
        N(t),
        (t.initialized = !0),
        N(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: r, el: i, wrapperEl: n, slides: a } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          r.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttribute("style"),
            n.removeAttribute("style"),
            a &&
              a.length &&
              a.forEach((e) => {
                e.classList.remove(
                  r.slideVisibleClass,
                  r.slideActiveClass,
                  r.slideNextClass,
                  r.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
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
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      T(re, e);
    }
    static get extendedDefaults() {
      return re;
    }
    static get defaults() {
      return ee;
    }
    static installModule(e) {
      ie.prototype.__modules__ || (ie.prototype.__modules__ = []);
      const t = ie.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ie.installModule(e)), ie)
        : (ie.installModule(e), ie);
    }
  }
  function ne(e) {
    let t,
      s,
      { swiper: r, extendParams: i, on: n, emit: a, params: o } = e;
    (r.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      i({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let l,
      d,
      c,
      p,
      u,
      m,
      f,
      v = o && o.autoplay ? o.autoplay.delay : 3e3,
      g = o && o.autoplay ? o.autoplay.delay : 3e3,
      w = new Date().getTime;
    function y(e) {
      r &&
        !r.destroyed &&
        r.wrapperEl &&
        e.target === r.wrapperEl &&
        (r.wrapperEl.removeEventListener("transitionend", y), M());
    }
    const S = () => {
        if (r.destroyed || !r.autoplay.running) return;
        r.autoplay.paused ? (d = !0) : d && ((g = l), (d = !1));
        const e = r.autoplay.paused ? l : w + g - new Date().getTime();
        (r.autoplay.timeLeft = e),
          a("autoplayTimeLeft", e, e / v),
          (s = requestAnimationFrame(() => {
            S();
          }));
      },
      T = (e) => {
        if (r.destroyed || !r.autoplay.running) return;
        cancelAnimationFrame(s), S();
        let i = void 0 === e ? r.params.autoplay.delay : e;
        (v = r.params.autoplay.delay), (g = r.params.autoplay.delay);
        const n = (() => {
          let e;
          if (
            ((e =
              r.virtual && r.params.virtual.enabled
                ? r.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : r.slides[r.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(n) &&
          n > 0 &&
          void 0 === e &&
          ((i = n), (v = n), (g = n)),
          (l = i);
        const o = r.params.speed,
          d = () => {
            r &&
              !r.destroyed &&
              (r.params.autoplay.reverseDirection
                ? !r.isBeginning || r.params.loop || r.params.rewind
                  ? (r.slidePrev(o, !0, !0), a("autoplay"))
                  : r.params.autoplay.stopOnLastSlide ||
                    (r.slideTo(r.slides.length - 1, o, !0, !0), a("autoplay"))
                : !r.isEnd || r.params.loop || r.params.rewind
                ? (r.slideNext(o, !0, !0), a("autoplay"))
                : r.params.autoplay.stopOnLastSlide ||
                  (r.slideTo(0, o, !0, !0), a("autoplay")),
              r.params.cssMode &&
                ((w = new Date().getTime()),
                requestAnimationFrame(() => {
                  T();
                })));
          };
        return (
          i > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                d();
              }, i)))
            : requestAnimationFrame(() => {
                d();
              }),
          i
        );
      },
      b = () => {
        (r.autoplay.running = !0), T(), a("autoplayStart");
      },
      E = () => {
        (r.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          a("autoplayStop");
      },
      x = (e, s) => {
        if (r.destroyed || !r.autoplay.running) return;
        clearTimeout(t), e || (f = !0);
        const i = () => {
          a("autoplayPause"),
            r.params.autoplay.waitForTransition
              ? r.wrapperEl.addEventListener("transitionend", y)
              : M();
        };
        if (((r.autoplay.paused = !0), s))
          return m && (l = r.params.autoplay.delay), (m = !1), void i();
        const n = l || r.params.autoplay.delay;
        (l = n - (new Date().getTime() - w)),
          (r.isEnd && l < 0 && !r.params.loop) || (l < 0 && (l = 0), i());
      },
      M = () => {
        (r.isEnd && l < 0 && !r.params.loop) ||
          r.destroyed ||
          !r.autoplay.running ||
          ((w = new Date().getTime()),
          f ? ((f = !1), T(l)) : T(),
          (r.autoplay.paused = !1),
          a("autoplayResume"));
      },
      C = () => {
        if (r.destroyed || !r.autoplay.running) return;
        const e = h();
        "hidden" === e.visibilityState && ((f = !0), x(!0)),
          "visible" === e.visibilityState && M();
      },
      P = (e) => {
        "mouse" === e.pointerType &&
          ((f = !0), r.animating || r.autoplay.paused || x(!0));
      },
      L = (e) => {
        "mouse" === e.pointerType && r.autoplay.paused && M();
      };
    n("init", () => {
      r.params.autoplay.enabled &&
        (r.params.autoplay.pauseOnMouseEnter &&
          (r.el.addEventListener("pointerenter", P),
          r.el.addEventListener("pointerleave", L)),
        h().addEventListener("visibilitychange", C),
        (w = new Date().getTime()),
        b());
    }),
      n("destroy", () => {
        r.el.removeEventListener("pointerenter", P),
          r.el.removeEventListener("pointerleave", L),
          h().removeEventListener("visibilitychange", C),
          r.autoplay.running && E();
      }),
      n("beforeTransitionStart", (e, t, s) => {
        !r.destroyed &&
          r.autoplay.running &&
          (s || !r.params.autoplay.disableOnInteraction ? x(!0, !0) : E());
      }),
      n("sliderFirstMove", () => {
        !r.destroyed &&
          r.autoplay.running &&
          (r.params.autoplay.disableOnInteraction
            ? E()
            : ((c = !0),
              (p = !1),
              (f = !1),
              (u = setTimeout(() => {
                (f = !0), (p = !0), x(!0);
              }, 200))));
      }),
      n("touchEnd", () => {
        if (!r.destroyed && r.autoplay.running && c) {
          if (
            (clearTimeout(u),
            clearTimeout(t),
            r.params.autoplay.disableOnInteraction)
          )
            return (p = !1), void (c = !1);
          p && r.params.cssMode && M(), (p = !1), (c = !1);
        }
      }),
      n("slideChange", () => {
        !r.destroyed && r.autoplay.running && (m = !0);
      }),
      Object.assign(r.autoplay, { start: b, stop: E, pause: x, resume: M });
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
      ie.prototype[t] = se[e][t];
    });
  }),
    ie.use([
      function (e) {
        let { swiper: t, on: s, emit: r } = e;
        const i = v();
        let n = null,
          a = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (r("beforeResize"), r("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && r("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== i.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                a = i.requestAnimationFrame(() => {
                  const { width: s, height: r } = t;
                  let i = s,
                    n = r;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: r, target: a } = e;
                    (a && a !== t.el) ||
                      ((i = r ? r.width : (s[0] || s).inlineSize),
                      (n = r ? r.height : (s[0] || s).blockSize));
                  }),
                    (i === s && n === r) || o();
                });
              })),
              n.observe(t.el))
            : (i.addEventListener("resize", o),
              i.addEventListener("orientationchange", l));
        }),
          s("destroy", () => {
            a && i.cancelAnimationFrame(a),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              i.removeEventListener("resize", o),
              i.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: r, emit: i } = e;
        const n = [],
          a = v(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const r = new (a.MutationObserver || a.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void i("observerUpdate", e[0]);
                const s = function () {
                  i("observerUpdate", e[0]);
                };
                a.requestAnimationFrame
                  ? a.requestAnimationFrame(s)
                  : a.setTimeout(s, 0);
              },
            );
            r.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(r);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          r("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = (function (e, t) {
                  const s = [];
                  let r = e.parentElement;
                  for (; r; )
                    t ? r.matches(t) && s.push(r) : s.push(r),
                      (r = r.parentElement);
                  return s;
                })(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          r("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      ae(),
        document.querySelector(".partners__swiper") &&
          new ie(".swiper", {
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
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]"),
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`,
        ),
          o(
            Array.from(e).map(function (e) {
              return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${
                e.dataset.watchMargin ? e.dataset.watchMargin : "0px"
              }|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            }),
          ).forEach((t) => {
            let s = t.split("|"),
              r = { root: s[0], margin: s[1], threshold: s[2] },
              i = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  i = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === r.root &&
                  String(s) === r.margin &&
                  String(i) === r.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(r);
            this.scrollWatcherInit(i, n);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`,
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %",
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`,
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`,
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && a(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } }),
        );
    }
  })({});
  let oe = !1;
  if (
    (setTimeout(() => {
      if (oe) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0),
    window.matchMedia("(min-width: 991.98px)").matches)
  ) {
    const e = document.querySelector(".parallax"),
      t = document.querySelector(".promo");
    window.addEventListener("scroll", () => {
      let s = window.scrollY;
      (e.style.backgroundPosition = `0 -${0.5 * s}px`),
        (t.style.top = `-${0.2 * s}px`);
    });
  }
  (window.FLS = !0),
    (function () {
      let e = document.querySelector(".icon-burger");
      e &&
        e.addEventListener("click", function (e) {
          r &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? i(e) : n(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    window.addEventListener("load", function (e) {
      const r = document.querySelectorAll("[data-showmore]");
      let i, n;
      function a(e) {
        e.forEach((e) => {
          o(e.itemsArray, e.matchMedia);
        });
      }
      function o(e, r) {
        e.forEach((e) => {
          !(function (e, r = !1) {
            let i = (e = r ? e.item : e).querySelectorAll(
                "[data-showmore-content]",
              ),
              n = e.querySelectorAll("[data-showmore-button]");
            (i = Array.from(i).filter(
              (t) => t.closest("[data-showmore]") === e,
            )[0]),
              (n = Array.from(n).filter(
                (t) => t.closest("[data-showmore]") === e,
              )[0]);
            const a = d(e, i);
            (r.matches || !r) &&
            a <
              (function (e) {
                let t = e.offsetHeight;
                e.style.removeProperty("height");
                let s = e.offsetHeight;
                return (e.style.height = `${t}px`), s;
              })(i)
              ? (t(i, 0, a), (n.hidden = !1))
              : (s(i, 0, a), (n.hidden = !0));
          })(e, r);
        });
      }
      function d(e, t) {
        let s = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            r = t.children;
          for (
            let t = 1;
            t < r.length && ((s += r[t - 1].offsetHeight), t != e);
            t++
          );
        } else s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return s;
      }
      function c(e) {
        const r = e.target,
          l = e.type;
        if ("click" === l) {
          if (r.closest("[data-showmore-button]")) {
            const e = r
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              i = e.querySelector("[data-showmore-content]"),
              n = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              a = d(e, i);
            i.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? t(i, n, a)
                : s(i, n, a),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === l && (i && i.length && o(i), n && n.length && a(n));
      }
      r.length &&
        ((i = Array.from(r).filter(function (e, t, s) {
          return !e.dataset.showmoreMedia;
        })),
        i.length && o(i),
        document.addEventListener("click", c),
        window.addEventListener("resize", c),
        (n = l(r, "showmoreMedia")),
        n &&
          n.length &&
          (n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              o(e.itemsArray, e.matchMedia);
            });
          }),
          a(n)));
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
            c.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && c.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const s = document.forms;
      if (s.length)
        for (const e of s)
          e.addEventListener("submit", function (e) {
            r(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              c.formClean(t);
            });
      async function r(e, s) {
        if (0 === (t ? c.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            s.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              r = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              n = new FormData(e);
            e.classList.add("_sending");
            const a = await fetch(t, { method: r, body: n });
            if (a.ok) {
              await a.json();
              e.classList.remove("_sending"), i(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (s.preventDefault(), i(e));
        } else {
          s.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && d(t, !0, 1e3);
        }
      }
      function i(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } }),
        ),
          setTimeout(() => {
            if (e.popup) {
              const s = t.dataset.popupMessage;
              s && e.popup.open(s);
            }
          }, 0),
          c.formClean(t),
          a(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0);
})();
