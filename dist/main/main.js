import { m as h, _ as q } from "../__chunks__/icon.CS4dR0Rb.js";

const p = () => {
  const t = document.querySelector("#main");
  return t ? window.location.href === "about:srcdoc" && t.classList.contains("sidekick-library") : false;
};

function y(t) {
  return t
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const P = (t, e) => {
  e.split(",").forEach((a) => {
    t.classList.add(y(a.trim()));
  });
};

function w(t, e = document) {
  const a = t && t.includes(":") ? "property" : "name";
  const o = [...e.head.querySelectorAll(`meta[${a}="${t}"]`)]
    .map((r) => r.content)
    .join(", ");
  return o.length ? o : "";
}

function B() {
  const t = w("template");
  if (t) P(document.body, t);
  const e = w("theme");
  if (e) P(document.body, e);
}

function N(t) {
  t.querySelectorAll("a").forEach((e) => {
    e.title = e.title || e.textContent;
    if (e.href !== e.textContent) {
      const a = e.parentElement;
      const s = e.parentElement.parentElement;
      if (!e.querySelector("img")) {
        if (a.childNodes.length === 1 && (a.tagName === "P" || a.tagName === "DIV")) {
          e.className = "button";
          a.classList.add("button-container");
        }
        if (
          a.childNodes.length === 1 &&
          a.tagName === "STRONG" &&
          s.childNodes.length === 1 &&
          s.tagName === "P"
        ) {
          e.className = "button primary";
          s.classList.add("button-container");
        }
        if (
          a.childNodes.length === 1 &&
          a.tagName === "EM" &&
          s.childNodes.length === 1 &&
          s.tagName === "P"
        ) {
          e.className = "button secondary";
          s.classList.add("button-container");
        }
      }
    }
  });
}

function R(t) {
  return t.trim() === "" ? void 0 : t;
}

function $() {
  const t = w("language");
  document.documentElement.lang = R(t) || "en";
}

function U() {
  return p() ? window.parent.location : window.location;
}

function M() {
  return p() ? window.parent.location.origin : window.location.origin;
}

const z = (t) => {
  try {
    const e = M();
    const a = new URL(window.hlx.codeBasePath, e);
    return new URL(t, a);
  } catch (e) {
    throw new Error(`Failed to build Url for endpoint: ${e}`);
  }
};

function f(t) {
  return new Promise((e, a) => {
    const { href: s } = z(t);
    if (document.querySelector(`head > link[href="${s}"]`)) {
      e();
    } else {
      const o = document.createElement("link");
      o.rel = "stylesheet";
      o.href = s;
      o.onload = () => e();
      o.onerror = a;
      document.head.append(o);
    }
  });
}

const L = {
  mainTsPath: "./src/main.ts",
  mainScssPath: "./src/styles/sass/main.scss",
  iconsDirPath: "./public/icons",
  iconsTypesPath: "./src/types/icons.types.ts",
  fontsScssPath: "./src/styles/sass/fonts.scss",
  fontsCssPath: "./dist/fonts/fonts.css",
  lazyStylesScssPath: "./src/styles/sass/lazy-styles.scss",
  lazyStylesCssPath: "./dist/lazyStyles/lazyStyles.css",
  sidekickLibraryStylesScssPath: "./src/styles/sass/sidekick-library-styles.scss",
  sidekickLibraryStylesCssPath: "./dist/sidekickLibraryStyles/sidekickLibraryStyles.css",
  lcpBlocks: [],
};

async function S() {
  const { fontsCssPath: t } = L;
  if (t) {
    await f(t);
    try {
      if (!U().hostname.includes("localhost")) {
        sessionStorage.setItem("fonts-loaded", "true");
      }
    } catch (e) {
      h.error("loadFonts: Error setting fonts-loaded in session storage", e);
    }
  }
}

function i(t, e = {}) {
  i.defer = i.defer || [];

  const a = (s) => {
    i[s] =
      i[s] ||
      ((...o) => {
        i.defer.push({ fnname: s, args: o });
      });
  };

  i.drain =
    i.drain ||
    ((s, o) => {
      i[s] = o;
      i.defer
        .filter(({ fnname: r }) => s === r)
        .forEach(({ fnname: r, args: l }) => {
          i[r](...l);
        });
    });

  i.always = i.always || [];
  i.always.on = (s, o) => {
    i.always[s] = o;
  };

  i.on = (s, o) => {
    i.cases[s] = o;
  };

  a("observe");
  a("cwv");

  try {
    window.hlx = window.hlx || {};

    if (!window.hlx.rum) {
      const param = new URLSearchParams(window.location.search).get("rum");
      const n = param === "on" ? 1 : 100;
      const c = Array.from({ length: 75 }, (b, A) => String.fromCharCode(48 + A))
        .filter((b) => /\d|[A-Z]/i.test(b))
        .filter(() => Math.random() * 75 > 70)
        .join("");
      const d = Math.random();
      const m = d * n < 1;
      const T = Date.now();
      const x = {
        full: () => window.location.href,
        origin: () => window.location.origin,
        path: () => window.location.href.replace(/\?.*$/, ""),
      };

      window.hlx.rum = {
        weight: n,
        id: c,
        random: d,
        isSelected: m,
        firstReadTime: T,
        sampleRUM: i,
        sanitizeURL: x[window.hlx.RUM_MASK_URL || "path"],
      };
    }

    const { weight: s, id: o, firstReadTime: r } = window.hlx.rum;

    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const l = [
        "weight",
        "id",
        "referer",
        "checkpoint",
        "t",
        "source",
        "target",
        "cwv",
        "CLS",
        "FID",
        "LCP",
        "INP",
      ];

      const n = (c = e) => {
        const d = JSON.stringify(
          {
            weight: s,
            id: o,
            referer: window.hlx.rum.sanitizeURL(),
            checkpoint: t,
            t: Date.now() - r,
            ...e,
          },
          l
        );
        const m = `https://rum.hlx.page/.rum/${s}`;
        navigator.sendBeacon(m, d);
        console.debug(`ping:${t}`, c);
      };

      i.cases =
        i.cases || {
          cwv: () => i.cwv(e) || true,
          lazy: () => {
            const c = document.createElement("script");
            c.src = "https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js";
            document.head.appendChild(c);
            return true;
          },
        };

      n(e);
      if (i.cases[t]) i.cases[t]();
    }

    if (i.always[t]) i.always[t](e);
  } catch {
    // ignore errors
  }
}

function I(t = "/dist/main/main.js") {
  window.hlx = window.hlx || {};
  window.hlx.RUM_MASK_URL = "full";
  window.hlx.codeBasePath = "";
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get("lighthouse") === "on";

  const e = document.querySelector(`script[src$="${t}"]`);
  if (e) {
    try {
      [window.hlx.codeBasePath] = new URL(e.src).pathname.split(t);
    } catch (a) {
      h.log("setupHlxObj: Could not set codeBasePath.", a);
    }
  }
}

function _() {
  I();
  i("top");
  window.addEventListener("load", () => i("load"));
  window.addEventListener("unhandledrejection", (t) => {
    i("error", { source: t.reason.sourceURL, target: t.reason.line });
  });
  window.addEventListener("error", (t) => {
    i("error", { source: t.filename, target: t.lineno });
  });
}

function C(t) {
  const e = [];
  t.querySelectorAll("[data-block-name]").forEach((s) => {
    e.push({ name: s.dataset.blockName, element: s });
  });
  return e;
}

async function v(t) {
  if ((t.element.dataset.blockStatus ?? "unloaded") === "unloaded") {
    try {
      t.element.dataset.blockStatus = "loading";
      const { href: a } = z(`dist/${t.name}/${t.name}.js`);
      const s = await q(() => import(a), __vite__mapDeps([]));
      if (s.default) await s.default(t.element);
      t.element.dataset.blockStatus = "loaded";
    } catch (a) {
      t.element.dataset.blockStatus = "error";
      h.error("loadBlockModules:", a);
    }
  }
}

async function D(t) {
  try {
    await f(`dist/${t.name}/${t.name}.css`);
  } catch (e) {
    h.error("loadBlockStyles: Could not load css styles.", e);
  }
}

function g(t) {
  t.style.removeProperty("display");
}

async function j(t) {
  const e = C(t);
  if (!e.length) {
    g(t);
    return;
  }
  const a = [];
  for (const s of e) {
    a.push(Promise.all([v(s), D(s)]));
  }
  await Promise.all(a);
  g(t);
}

async function O() {
  const e = [...document.querySelectorAll(".section")].map((a) => j(a));
  await Promise.all(e);
}

function F() {
  document.querySelectorAll(".default-content-wrapper picture").forEach((e) => {
    const a = e.parentElement;
    if (a) a.classList.add("image", "main");
  });
}

function H(t) {
  const e = [];
  let a = false;
  [...t.children].forEach((s) => {
    if (s.tagName === "DIV" || !a) {
      const o = document.createElement("div");
      e.push(o);
      a = s.tagName !== "DIV";
      if (a) o.classList.add("default-content-wrapper");
    }
    e[e.length - 1].append(s);
  });
  e.forEach((s) => t.append(s));
  F();
  t.classList.add("section");
  t.dataset.sectionStatus = "initialized";
  t.style.display = "none";
}

function V(t) {
  return /^[a-z][A-Za-z0-9]*$/.test(t)
    ? t
    : /^[A-Z][A-Za-z0-9]*$/.test(t)
    ? t.charAt(0).toLowerCase() + t.slice(1)
    : y(t).replace(/-([a-z])/g, (e) => e[1].toUpperCase());
}

function Z(t) {
  const e = {};
  t.querySelectorAll(":scope > div").forEach((a) => {
    if (a.children) {
      const s = [...a.children];
      if (s[1]) {
        const o = s[1];
        const r = y(s[0].textContent ?? "");
        let l = "";
        if (o.querySelector("a")) {
          const n = [...o.querySelectorAll("a")];
          if (n.length === 1) {
            l = n[0].href;
          } else {
            l = n.map((c) => c.href);
          }
        } else if (o.querySelector("img")) {
          const n = [...o.querySelectorAll("img")];
          if (n.length === 1) {
            l = n[0].src;
          } else {
            l = n.map((c) => c.src);
          }
        } else if (o.querySelector("p")) {
          const n = [...o.querySelectorAll("p")];
          if (n.length === 1) {
            l = n[0].textContent;
          } else {
            l = n.map((c) => c.textContent);
          }
        } else {
          l = a.children[1].textContent;
        }
        e[r] = l;
      }
    }
  });
  return e;
}

function X(t) {
  const e = t.querySelector("div.section-metadata");
  if (e) {
    const a = Z(e);
    Object.keys(a).forEach((s) => {
      if (s === "style") {
        a.style
          .split(",")
          .filter((r) => r)
          .map((r) => y(r.trim()))
          .forEach((r) => t.classList.add(r));
      } else {
        t.dataset[V(s)] = a[s];
      }
    });
    e.parentElement && e.parentElement.remove();
  }
}

function K(t) {
  t.querySelectorAll(":scope > div").forEach((e) => {
    H(e);
    X(e);
  });
}

function G(t) {
  t.querySelectorAll("div.section > div > div").forEach((e) => {
    const a = e.classList[0];
    if (a) {
      e.classList.add("block");
      e.dataset.blockName = a;
      const s = e.parentElement;
      s == null || s.classList.add(`${a}-wrapper`);
      const o = e.closest(".section");
      if (o) o.classList.add(`${a}-container`);
    }
  });
}

async function J() {
  const t = document.querySelector(".section");
  const { lcpBlocks: e } = L;
  if (t) {
    const o = C(t).map(async (r) => {
      if (e?.includes(r.name)) {
        await Promise.all([v(r), D(r)]);
      }
    });
    await Promise.all(o);
    g(t);
  }
  document.body.style.display = null;
  const a = document.querySelector("main img");
  await new Promise((s) => {
    if (a && !a.complete) {
      a.setAttribute("loading", "eager");
      a.setAttribute("fetchpriority", "high");
      a.addEventListener("load", () => s());
      a.addEventListener("error", () => s());
    } else {
      s();
    }
  });
}

class Y {
  constructor() {
    this.beforeEagerCallbacks = [];
    this.loadEagerCallbacks = [];
    this.beforeLoadLazyCallbacks = [];
    this.loadLazyCallbacks = [];
    this.beforeLoadDelayedCallbacks = [];
    this.loadDelayedCallbacks = [];
    this.initializedCallbacks = [];
  }

  get beforeEager() {
    if (this.beforeEagerPromise === void 0) {
      this.beforeEagerPromise = this.beforeLoadEager();
    }
    return this.beforeEagerPromise;
  }

  get loadEager() {
    if (this.eagerPromise === void 0) {
      this.eagerPromise = this.loadEagerPromise();
    }
    return this.eagerPromise;
  }

  get beforeLoadLazy() {
    if (this.beforeLazyPromise === void 0) {
      this.beforeLazyPromise = this.beforeLoadLazyPromise();
    }
    return this.beforeLazyPromise;
  }

  get loadLazy() {
    if (this.lazyPromise === void 0) {
      this.lazyPromise = this.loadLazyPromise();
    }
    return this.lazyPromise;
  }

  get beforeLoadDelayed() {
    if (this.beforeDelayedPromise === void 0) {
      this.beforeDelayedPromise = this.beforeLoadDelayedPromise();
    }
    return this.beforeDelayedPromise;
  }

  get loadDelayed() {
    if (this.delayedPromise === void 0) {
      this.delayedPromise = this.loadDelayedPromise();
    }
    return this.delayedPromise;
  }

  get initialized() {
    if (this.initializedPromise === void 0) {
      this.initializedPromise = this.getInitializedPromise();
    }
    return this.initializedPromise;
  }

  addBeforeEagerTask(e) {
    this.beforeEagerCallbacks.push(e);
  }

  addLoadEagerTask(e) {
    this.loadEagerCallbacks.push(e);
  }

  addBeforeLoadLazyTask(e) {
    this.beforeLoadLazyCallbacks.push(e);
  }

  addLoadLazyTask(e) {
    this.loadLazyCallbacks.push(e);
  }

  addBeforeLoadDelayedTask(e) {
    this.beforeLoadDelayedCallbacks.push(e);
  }

  addLoadDelayedTask(e) {
    this.loadDelayedCallbacks.push(e);
  }

  addInitializedTask(e) {
    this.initializedCallbacks.push(e);
  }

  async init() {
    await this.beforeEager;
    await this.loadEager;
    await this.beforeLoadLazy;
    await this.loadLazy;
    await this.beforeLoadDelayed;
    await this.loadDelayed;
    await this.initialized;
  }

  async beforeLoadEager() {
    const e = new Promise((a) => {
      _();
      B();
      $();
      a();
    });
    await Promise.all([...this.beforeEagerCallbacks.map((a) => a()), e]);
  }

  async loadEagerPromise() {
    const e = new Promise(async (a) => {
      try {
        const s = document.querySelector("main");
        N(s);
        K(s);
        G(s);

        setTimeout(() => {
          document.body.classList.add("show");
          a();
        }, 100);

        if (window.innerWidth >= 900 || sessionStorage.getItem("fonts-loaded")) {
          await S();
        }
      } catch (s) {
        h.error("index: could not load fonts", s);
      }
    });

    await Promise.all([...this.loadEagerCallbacks.map((a) => a()), e, J()]);
  }

  async beforeLoadLazyPromise() {
    const e = new Promise((a) => a());
    await Promise.all([...this.beforeLoadLazyCallbacks.map((a) => a()), e]);
  }

  async loadLazyPromise() {
    const e = new Promise(async (a) => {
      try {
        const {
          lazyStylesScssPath: s,
          sidekickLibraryStylesScssPath: o,
          fontsScssPath: r,
          lazyStylesCssPath: l,
          sidekickLibraryStylesCssPath: n,
        } = L;
        await O();

        const { hash: c } = window.location;
        const d = c ? document.getElementById(c.substring(1)) : false;
        if (c && d) d.scrollIntoView();

        if (s && l) await f(l);
        if (o && n && p()) await f(n);
        if (r) await S();

        i("lazy");

        const m = document.querySelector("main");
        i.observe(m.querySelectorAll("div[data-block-name]"));
        i.observe(m.querySelectorAll("picture > img"));
      } catch (s) {
        h.error("LoadLazyTask: ", s);
      }
      a();
    });
    await Promise.all([...this.loadLazyCallbacks.map((a) => a()), e]);
  }

  async beforeLoadDelayedPromise() {
    const e = new Promise((a) => a());
    await Promise.all([...this.beforeLoadDelayedCallbacks.map((a) => a()), e]);
  }

  async loadDelayedPromise() {
    const e = new Promise((a) => {
      setTimeout(() => {
        a();
      }, 3000);
    });
    await Promise.all([...this.loadDelayedCallbacks.map((a) => a()), e]);
  }

  async getInitializedPromise() {
    const e = new Promise((a) => a());
    await Promise.all([...this.initializedCallbacks.map((a) => a()), e]);
  }
}

const k = new Y();
const u = { interactive: "interactive", complete: "complete" };

async function E() {
  k.addBeforeEagerTask(() => {
    document.getElementsByTagName("main")[0].setAttribute("id", "main");
    return Promise.resolve();
  });
  await k.init();
}

function Q() {
  if (document.readyState === u.interactive || document.readyState === u.complete) {
    E();
  } else {
    document.addEventListener("readystatechange", () => {
      const t = document.readyState;
      if (t === u.interactive || t === u.complete) E();
    });
  }
}

Q();

function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = [];
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
//# sourceMappingURL=main.js.map