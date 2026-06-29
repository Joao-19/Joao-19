/* ============================================================
   main.js — Tema (dark/light), idioma (pt/en), nav, footer,
   efeitos (typing, reveal) e linha do tempo cinematográfica.
   ============================================================ */

const STORAGE = { theme: "jv-theme", lang: "jv-lang" };

const getTheme = () => localStorage.getItem(STORAGE.theme) || "dark";
const getLang = () => localStorage.getItem(STORAGE.lang) || "pt";

/* -------- Tema -------- */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE.theme, theme);
  document.querySelectorAll("[data-theme-icon]").forEach((el) => {
    el.textContent = theme === "dark" ? "[◐]" : "[◑]";
  });
}
const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

/* -------- Idioma -------- */
function setLang(lang) {
  localStorage.setItem(STORAGE.lang, lang);
  if (window.applyI18n) window.applyI18n(lang);
  document.querySelectorAll("[data-lang-label]").forEach((el) => {
    el.textContent = lang === "pt" ? "[EN]" : "[PT]";
  });
}
function toggleLang() {
  setLang(getLang() === "pt" ? "en" : "pt");
  scrambleTagline();
}

/* -------- Nav e Footer (injetados) -------- */
function navHTML(active) {
  const link = (page, n, key, label) =>
    `<a href="${page}" class="${active === page ? "is-active" : ""}"><span class="n">${n}</span><span data-i18n="nav.${key}">${label}</span></a>`;
  return `
  <nav class="top" aria-label="Principal">
    <a href="index.html" class="brand">joao_vitor<span class="blink">_</span></a>
    <div class="links">
      ${link("index.html", "00", "home", "início")}
      ${link("sobre.html", "01", "about", "sobre")}
      ${link("projetos.html", "02", "projects", "projetos")}
      ${link("curriculo.html", "03", "resume", "currículo")}
      ${link("contato.html", "04", "contact", "contato")}
    </div>
    <div class="toggles">
      <button type="button" id="langToggle" title="idioma / language"><span data-lang-label>[EN]</span></button>
      <button type="button" id="themeToggle" title="tema / theme"><span data-theme-icon>[◐]</span></button>
    </div>
  </nav>`;
}

function footerHTML() {
  return `
  <footer class="site">
    <span class="acc">●</span>
    <span>joao_vitor</span>
    <span>·</span>
    <span data-i18n="home.role">Desenvolvedor Full Stack</span>
    <span class="spacer"></span>
    <span>// rio de janeiro · br &nbsp; <span class="acc">EOF</span></span>
  </footer>`;
}

/* -------- Efeito de digitação no nome do hero -------- */
function typeHero() {
  const el = document.getElementById("typer");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const full = el.innerHTML;
  const plain = el.textContent;
  el.textContent = "";
  el.style.minHeight = "1.05em";
  let i = 0;
  (function step() {
    if (i <= plain.length) {
      el.textContent = plain.slice(0, i);
      i++;
      setTimeout(step, 52);
    } else {
      el.innerHTML = full;
    }
  })();
}

/* -------- Efeito "código → texto" na frase do hero -------- */
class TextScramble {
  constructor(el) {
    this.el = el;
    // glifos de código (sem < > & para não quebrar o HTML)
    this.chars = "01{}[]()/\\|=+*#%$;:.~^—_10アイウエオ01";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    this.el.textContent = "";
    const promise = new Promise((r) => (this.resolve = r));
    this.queue = [];
    for (let i = 0; i < newText.length; i++) {
      const start = Math.floor(i * 1.15);
      const end = start + 16 + Math.floor(Math.random() * 22);
      this.queue.push({ to: newText[i], start, end, char: "" });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const q = this.queue[i];
      if (this.frame >= q.end) {
        complete++;
        output += q.to;
      } else if (this.frame >= q.start) {
        if (q.to === " ") {
          output += " ";
        } else {
          if (!q.char || Math.random() < 0.3) {
            q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
          }
          output += '<span class="dud">' + q.char + "</span>";
        }
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.el.textContent = this.queue.map((q) => q.to).join("");
      if (this.resolve) this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

function scrambleTagline() {
  const el = document.querySelector('.tagline [data-i18n="home.tagline"]');
  if (!el) return;
  const finalText = el.textContent;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = finalText;
    return;
  }
  if (!el.__fx) el.__fx = new TextScramble(el);
  el.__fx.setText(finalText);
}

/* -------- Reveal on scroll -------- */
function initReveal(root) {
  const els = (root || document).querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.14, root: root || null }
  );
  els.forEach((e) => io.observe(e));
}

/* -------- Linha do tempo cinematográfica (página Sobre) -------- */
function initCine() {
  const scroller = document.querySelector(".cine");
  if (!scroller) return;
  const sectors = [...scroller.querySelectorAll(".sector")];
  const nodes = [...document.querySelectorAll(".rail__node")];
  const fill = document.getElementById("railFill");
  if (!sectors.length || !nodes.length) return;

  const setActive = (idx) => {
    nodes.forEach((n, i) => {
      n.classList.toggle("active", i === idx);
      n.classList.toggle("done", i < idx);
    });
    sectors.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    if (fill) fill.style.height = ((idx) / (sectors.length - 1)) * 100 + "%";
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(sectors.indexOf(e.target));
      });
    },
    { root: scroller, threshold: 0.55 }
  );
  sectors.forEach((s) => io.observe(s));
  setActive(0);

  // clique nos nós navega até o setor
  nodes.forEach((n, i) =>
    n.addEventListener("click", () => sectors[i] && sectors[i].scrollIntoView({ behavior: "smooth" }))
  );
}

/* -------- Setores expansíveis (página Sobre) -------- */
function initExpanders() {
  // setores expansíveis (Sobre)
  document.querySelectorAll(".sector__expand").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.parentElement.querySelector(".sector__more");
      if (!panel) return;
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  // cards de projeto expansíveis (Projetos)
  document.querySelectorAll(".pcard__head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.parentElement.querySelector(".pcard__body");
      if (!panel) return;
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
}

/* -------- Componente reutilizável: pílula de empresa -------- */
/* Registro de empresas — adicione novas aqui (aceita ícone + título + url). */
const COMPANIES = {
  byterain: { title: "ByteRain", logo: "assets/byterain.svg", url: "https://byterain-it.com" },
};

function renderCompanyPills() {
  document.querySelectorAll(".cpill[data-company]").forEach((el) => {
    const c = COMPANIES[el.getAttribute("data-company")];
    if (!c) return;
    const prefix = el.getAttribute("data-prefix");
    el.innerHTML =
      (prefix ? `<span class="cpill__via">${prefix}</span>` : "") +
      `<button type="button" class="cpill__btn" data-url="${c.url}" data-title="${c.title}" aria-label="${c.title} — abrir site">` +
      `<img class="cpill__logo" src="${c.logo}" alt="" aria-hidden="true" />` +
      `<span class="cpill__name">${c.title}</span></button>`;
  });
  document.querySelectorAll(".cpill__btn").forEach((btn) => {
    btn.addEventListener("click", () => openRedirectModal(btn.dataset.url, btn.dataset.title));
  });
}

/* -------- Modal de aviso de redirecionamento (padrão do componente) -------- */
let pendingUrl = null;
function ensureModal() {
  if (document.getElementById("redirectModal")) return;
  const wrap = document.createElement("div");
  wrap.id = "redirectModal";
  wrap.className = "modal";
  wrap.innerHTML = `
    <div class="modal__backdrop" data-close></div>
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal__bar"><span class="dot"></span><span>external_redirect.sh</span></div>
      <div class="modal__body">
        <p class="modal__title" id="modalTitle" data-i18n="modal.title">Você será redirecionado</p>
        <p class="modal__text"><span data-i18n="modal.text">Saindo do portfólio para um site externo:</span><br><span class="modal__url" id="modalUrl"></span></p>
        <div class="modal__actions">
          <button class="btn" data-close><span class="p">✕</span> <span data-i18n="modal.cancel">cancelar</span></button>
          <button class="btn btn--solid" id="modalGo"><span class="p">↗</span> <span data-i18n="modal.continue">continuar</span></button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  wrap.querySelectorAll("[data-close]").forEach((e) => e.addEventListener("click", closeRedirectModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeRedirectModal(); });
}
function openRedirectModal(url) {
  ensureModal();
  pendingUrl = url;
  const m = document.getElementById("redirectModal");
  m.querySelector("#modalUrl").textContent = url;
  m.querySelector("#modalGo").onclick = () => {
    if (pendingUrl) window.open(pendingUrl, "_blank", "noopener");
    closeRedirectModal();
  };
  m.classList.add("open");
}
function closeRedirectModal() {
  const m = document.getElementById("redirectModal");
  if (m) m.classList.remove("open");
}

/* -------- Inicialização -------- */
function initChrome() {
  const active = document.body.getAttribute("data-page") || "index.html";
  const navMount = document.getElementById("site-nav");
  const footMount = document.getElementById("site-footer");
  if (navMount) navMount.innerHTML = navHTML(active);
  if (footMount) footMount.innerHTML = footerHTML();

  ensureModal();
  renderCompanyPills();

  const themeBtn = document.getElementById("themeToggle");
  const langBtn = document.getElementById("langToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  setTheme(getTheme());
  setLang(getLang());

  typeHero();
  scrambleTagline();
  initReveal();
  initCine();
  initExpanders();
}

setTheme(getTheme()); // evita flash
document.addEventListener("DOMContentLoaded", initChrome);
