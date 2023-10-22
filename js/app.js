(() => {
  "use strict";
  const e = {};
  let t = !0,
    r = (e = 500) => {
      let r = document.querySelector("body");
      if (t) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < o.length; e++) {
            o[e].style.paddingRight = "0px";
          }
          (r.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let r = document.querySelector("body");
      if (t) {
        let o = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < o.length; e++) {
          o[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (r.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function s(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function n(e) {
    return e.filter(function (e, t, r) {
      return r.indexOf(e) === t;
    });
  }
  e.mousePrlx = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          r = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          o = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          s = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          n = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          l = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let a = 0,
          c = 0,
          i = 0,
          d = 0;
        function h(t = window) {
          t.addEventListener("mousemove", function (t) {
            const r = e.getBoundingClientRect().top + window.scrollY;
            if (r >= window.scrollY || r + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                r = window.innerHeight,
                o = t.clientX - e / 2,
                s = t.clientY - r / 2;
              (i = (o / e) * 100), (d = (s / r) * 100);
            }
          });
        }
        !(function t() {
          (a += ((i - a) * l) / 1e3),
            (c += ((d - c) * l) / 1e3),
            (e.style.cssText = `transform: translate3D(${(s * a) / (r / 10)}%,${
              (n * c) / (o / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? h(t) : h();
      });
    }
    setLogging(e) {
      this.config.logging && s(`[PRLX Mouse]: ${e}`);
    }
  })({});
  let l = (e, t = !1, o = 500, n = 0) => {
    const l = "string" == typeof e ? document.querySelector(e) : e;
    if (l) {
      let a = "",
        c = 0;
      t &&
        ((a = "header.header"), (c = document.querySelector(a).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: o,
        header: a,
        offset: n,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (r(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(l, "", i);
      else {
        let e = l.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: c ? e - c : e, behavior: "smooth" });
      }
      s(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else s(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  let a = {
    getErrors(e) {
      let t = 0,
        r = e.querySelectorAll("*[data-required]");
      return (
        r.length &&
          r.forEach((e) => {
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
          let r = t.querySelectorAll("input,textarea");
          for (let e = 0; e < r.length; e++) {
            const t = r[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              a.removeError(t);
          }
          let o = t.querySelectorAll(".checkbox__input");
          if (o.length > 0)
            for (let e = 0; e < o.length; e++) {
              o[e].checked = !1;
            }
          if (e.select) {
            let r = t.querySelectorAll(".select");
            if (r.length)
              for (let t = 0; t < r.length; t++) {
                const o = r[t].querySelector("select");
                e.select.selectBuild(o);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
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
          n(
            Array.from(e).map(function (e) {
              return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${
                e.dataset.watchMargin ? e.dataset.watchMargin : "0px"
              }|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            }),
          ).forEach((t) => {
            let r = t.split("|"),
              o = { root: r[0], margin: r[1], threshold: r[2] },
              s = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  r = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === o.root &&
                  String(r) === o.margin &&
                  String(s) === o.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(s, n);
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
      this.config.logging && s(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const r = e.target;
      this.scrollWatcherIntersecting(e, r),
        r.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(r, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } }),
        );
    }
  })({});
  let c = !1;
  setTimeout(() => {
    if (c) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const i = document.querySelector(".parallax"),
    d = document.querySelector(".promo");
  window.addEventListener("scroll", () => {
    let e = window.scrollY;
    console.log(e),
      (i.style.backgroundPosition = `0 -${0.5 * e}px`),
      (d.style.top = `-${0.2 * e}px`);
  }),
    (window.FLS = !0),
    (function () {
      let e = document.querySelector(".icon-burger");
      e &&
        e.addEventListener("click", function (e) {
          t &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? r(e) : o(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
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
            a.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && a.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const r = document.forms;
      if (r.length)
        for (const e of r)
          e.addEventListener("submit", function (e) {
            o(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              a.formClean(t);
            });
      async function o(e, r) {
        if (0 === (t ? a.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            r.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              o = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              s = new FormData(e);
            e.classList.add("_sending");
            const l = await fetch(t, { method: o, body: s });
            if (l.ok) {
              await l.json();
              e.classList.remove("_sending"), n(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (r.preventDefault(), n(e));
        } else {
          r.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && l(t, !0, 1e3);
        }
      }
      function n(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } }),
        ),
          setTimeout(() => {
            if (e.popup) {
              const r = t.dataset.popupMessage;
              r && e.popup.open(r);
            }
          }, 0),
          a.formClean(t),
          s(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0);
})();