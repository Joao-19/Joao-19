/**
 * Recreio Shopping (ALLOS) — Funções e Interatividades Globais
 * Versão: 2.1.0
 */

// Estado da Aplicação
let currentFloor = 'all';
let currentCategory = 'all';
let currentActiveMap = 'L1_0';
let currentSlide = 0;
let slideInterval = null;

// Inicialização segura do Lucide
function initLucide() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* =========================================================================
   0. PRELOADER & TRANSIÇÃO DE ENTRADA SUAVE (1 SEGUNDO EXATO)
   ========================================================================= */
function initPageLoader() {
  const preloader = document.getElementById('pagePreloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const pageContent = document.getElementById('pageContentWrapper');

  if (preloaderBar) {
    setTimeout(() => {
      preloaderBar.style.width = '100%';
    }, 40);
  }

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 500);
    }
    if (pageContent) {
      pageContent.classList.add('page-enter-active');
      setTimeout(() => {
        pageContent.style.transform = 'none';
      }, 650);
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initIaraBot();
});

/* =========================================================================
   1. CAROUSEL HERO
   ========================================================================= */
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.getElementById('carouselIndicators');
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  if (indicators && indicators.children.length) {
    Array.from(indicators.children).forEach((dot, i) => {
      if (i === index) {
        dot.className = 'w-8 h-1.5 rounded-full bg-gold-400 transition-all cursor-pointer';
      } else {
        dot.className = 'w-2.5 h-1.5 rounded-full bg-white/40 hover:bg-white transition-all cursor-pointer';
      }
    });
  }

  currentSlide = index;
}

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function goToSlide(index) {
  showSlide(index);
  resetCarouselTimer();
}

function startCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 7000);
  }
}

function resetCarouselTimer() {
  if (slideInterval) clearInterval(slideInterval);
  startCarousel();
}

/* =========================================================================
   2. DROPDOWNS & MENUS
   ========================================================================= */
function toggleHoursDropdown() {
  const dropdown = document.getElementById('hoursDropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('mobileMenuIcon');
  if (menu) {
    const isHidden = menu.classList.toggle('hidden');
    if (icon) {
      icon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
      initLucide();
    }
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastMessage');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4000);
}

function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  if (input) {
    showToast(`Obrigado! ${input.value} cadastrado com sucesso no Clube ALLOS.`);
    input.value = '';
  }
}

/* =========================================================================
   3. MODAIS (BUSCA, LOJA, PET, TRAILER, MAPA, MATÉRIA)
   ========================================================================= */
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  const input = document.getElementById('modalSearchInput');
  if (input) {
    input.value = '';
    input.focus();
    handleInstantSearch();
  }
  document.body.style.overflow = 'hidden';
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function quickModalSearch(text) {
  const input = document.getElementById('modalSearchInput');
  if (input) {
    input.value = text;
    handleInstantSearch();
  }
}

function handleInstantSearch() {
  const input = document.getElementById('modalSearchInput');
  const resultsContainer = document.getElementById('searchResultsList');
  if (!input || !resultsContainer || typeof STORES_DATABASE === 'undefined') return;

  const term = input.value.toLowerCase().trim();

  if (!term) {
    resultsContainer.innerHTML = `
      <div class="text-xs text-slate-400 py-2">Destaques rápidos:</div>
      <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
        <button onclick="quickModalSearch('Coco Bambu')" class="p-2.5 rounded-xl bg-sand-50 hover:bg-gold-50 text-left text-ocean-900 flex items-center justify-between">
          <span>Coco Bambu (Frutos do Mar)</span>
          <span class="text-slate-400 text-[10px]">Piso L1</span>
        </button>
        <button onclick="quickModalSearch('Cinesystem')" class="p-2.5 rounded-xl bg-sand-50 hover:bg-gold-50 text-left text-ocean-900 flex items-center justify-between">
          <span>Cinesystem VIP Laser</span>
          <span class="text-slate-400 text-[10px]">Piso L3</span>
        </button>
        <button onclick="quickModalSearch('Farm Rio')" class="p-2.5 rounded-xl bg-sand-50 hover:bg-gold-50 text-left text-ocean-900 flex items-center justify-between">
          <span>Farm Rio (Moda)</span>
          <span class="text-slate-400 text-[10px]">Piso L2</span>
        </button>
        <button onclick="quickModalSearch('Bodytech')" class="p-2.5 rounded-xl bg-sand-50 hover:bg-gold-50 text-left text-ocean-900 flex items-center justify-between">
          <span>Bodytech (Academia)</span>
          <span class="text-slate-400 text-[10px]">Piso L3</span>
        </button>
      </div>
    `;
    return;
  }

  const matchedStores = STORES_DATABASE.filter(s => 
    s.name.toLowerCase().includes(term) || 
    s.category.toLowerCase().includes(term) ||
    s.floor.toLowerCase().includes(term) ||
    s.tag.toLowerCase().includes(term)
  );

  const matchedMovies = typeof MOVIES_DATABASE !== 'undefined' ? MOVIES_DATABASE.filter(m => 
    m.title.toLowerCase().includes(term) || 
    m.genre.toLowerCase().includes(term)
  ) : [];

  let html = '';

  if (matchedStores.length > 0) {
    html += `<div class="text-xs font-bold text-ocean-900 uppercase tracking-wider py-1 border-b border-sand-200">Lojas & Gastronomia (${matchedStores.length})</div>`;
    matchedStores.slice(0, 5).forEach(s => {
      html += `
        <div onclick="openStoreDetails(${s.id}); closeSearchModal();" class="p-3 rounded-xl hover:bg-gold-50 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-gold-300">
          <div class="flex items-center space-x-3">
            <img src="${s.image}" class="w-10 h-10 rounded-lg object-cover">
            <div>
              <h4 class="text-sm font-bold text-ocean-900">${s.name}</h4>
              <p class="text-xs text-slate-500">${s.category} • Piso ${s.floor}</p>
            </div>
          </div>
          <span class="text-emerald-600 text-xs font-semibold flex items-center">
            <i data-lucide="message-circle" class="w-3.5 h-3.5 mr-1"></i> WhatsApp
          </span>
        </div>
      `;
    });
  }

  if (matchedMovies.length > 0) {
    html += `<div class="text-xs font-bold text-coral-600 uppercase tracking-wider py-1 mt-3 border-b border-sand-200">Filmes Cinesystem (${matchedMovies.length})</div>`;
    matchedMovies.forEach(m => {
      html += `
        <a href="cinema.html" class="p-3 rounded-xl hover:bg-coral-50 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-coral-300 block">
          <div class="flex items-center space-x-3">
            <img src="${m.poster}" class="w-10 h-10 rounded-lg object-cover">
            <div>
              <h4 class="text-sm font-bold text-ocean-900">${m.title}</h4>
              <p class="text-xs text-slate-500">${m.genre} • ${m.duration}</p>
            </div>
          </div>
          <span class="bg-coral-500 text-white text-[10px] font-bold px-2 py-1 rounded">Ver Sessões</span>
        </a>
      `;
    });
  }

  if (matchedStores.length === 0 && matchedMovies.length === 0) {
    html = `
      <div class="text-center py-8 text-slate-500 text-xs">
        Nenhum resultado encontrado para "<strong>${term}</strong>".
      </div>
    `;
  }

  resultsContainer.innerHTML = html;
  initLucide();
}

function openStoreDetails(storeId) {
  if (typeof STORES_DATABASE === 'undefined') return;
  const store = STORES_DATABASE.find(s => s.id === storeId);
  if (!store) return;

  const modal = document.getElementById('storeModal');
  if (!modal) return;

  document.getElementById('modalStoreTitle').textContent = store.name;
  document.getElementById('modalStoreFloor').innerHTML = `<i data-lucide="map-pin" class="w-3.5 h-3.5 mr-1 inline"></i> Piso ${store.floor} • Recreio Shopping`;
  document.getElementById('modalStoreDescription').textContent = store.description;
  document.getElementById('modalStoreHours').textContent = store.hours;
  document.getElementById('modalStorePet').textContent = store.petFriendly ? "Sim (Pet Friendly)" : "Somente na Varanda";
  document.getElementById('modalStoreImage').src = store.image;
  document.getElementById('modalStoreCategoryBadge').textContent = store.category;
  document.getElementById('modalStoreWhatsAppBtn').href = `https://wa.me/${store.whatsapp}?text=Ol%C3%A1%20${encodeURIComponent(store.name)},%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20pelo%20portal%20do%20Recreio%20Shopping`;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  initLucide();
}

function closeStoreModal() {
  const modal = document.getElementById('storeModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openPetModal() {
  const modal = document.getElementById('petModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closePetModal() {
  const modal = document.getElementById('petModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openTrailerModal(title, url) {
  const modal = document.getElementById('movieTrailerModal');
  if (!modal) return;
  document.getElementById('trailerMovieTitle').textContent = title;
  document.getElementById('trailerIframe').src = url;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
  const modal = document.getElementById('movieTrailerModal');
  if (modal) {
    document.getElementById('trailerIframe').src = '';
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openFullscreenMap() {
  const modal = document.getElementById('fullscreenMapModal');
  if (modal) {
    changeFloorMap(currentActiveMap);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeFullscreenMap() {
  const modal = document.getElementById('fullscreenMapModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function changeFloorMap(floorKey) {
  if (typeof FLOOR_MAPS_DATABASE === 'undefined') return;
  const mapData = FLOOR_MAPS_DATABASE[floorKey];
  if (!mapData) return;

  currentActiveMap = floorKey;

  const activeImg = document.getElementById('activeMapImage');
  if (activeImg) {
    activeImg.src = mapData.image;
    activeImg.alt = `Planta do ${mapData.title}`;
  }

  const activeTitle = document.getElementById('activeMapFloorTitle');
  if (activeTitle) activeTitle.textContent = mapData.title;

  const activeInfoTitle = document.getElementById('activeMapInfoTitle');
  if (activeInfoTitle) activeInfoTitle.textContent = mapData.title;

  const activeInfoDesc = document.getElementById('activeMapInfoDesc');
  if (activeInfoDesc) activeInfoDesc.textContent = mapData.desc;

  const storesList = document.getElementById('activeMapStoresList');
  if (storesList) {
    storesList.innerHTML = mapData.stores.map(storeName => `
      <span class="bg-sand-100 text-ocean-900 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-gold-100 transition-colors">${storeName}</span>
    `).join('');
  }

  const facilitiesList = document.getElementById('activeMapFacilitiesList');
  if (facilitiesList) {
    facilitiesList.innerHTML = mapData.facilities.map(fac => `
      <div class="flex items-center space-x-2 p-2 rounded-xl bg-sand-50 border border-sand-100">
        ${fac.icon ? `<img src="${fac.icon}" alt="${fac.name}" class="w-5 h-5 object-contain">` : `<i data-lucide="${fac.lucide || 'headphones'}" class="w-5 h-5 text-ocean-800"></i>`}
        <span class="font-semibold text-slate-800 text-[11px]">${fac.name}</span>
      </div>
    `).join('');
  }

  document.querySelectorAll('.floor-map-tab').forEach(btn => {
    if (btn.dataset.map === floorKey) {
      btn.className = 'floor-map-tab shrink-0 min-h-[38px] px-4 py-2 rounded-xl bg-ocean-900 text-white shadow-sm transition-all cursor-pointer font-bold';
    } else {
      btn.className = 'floor-map-tab shrink-0 min-h-[38px] px-4 py-2 rounded-xl bg-white text-slate-700 hover:bg-sand-200 border border-sand-200 transition-all cursor-pointer font-bold';
    }
  });

  const fsImg = document.getElementById('fullscreenModalImg');
  if (fsImg) fsImg.src = mapData.image;

  const fsTitle = document.getElementById('fullscreenModalTitle');
  if (fsTitle) fsTitle.textContent = `Planta Arquitetônica Oficial — ${mapData.title}`;

  ['L1_0', 'L1_1', 'L2', 'L3'].forEach(k => {
    const btn = document.getElementById(`fsTab${k}`);
    if (btn) {
      if (k === floorKey) {
        btn.className = 'px-2.5 py-1 rounded-lg bg-gold-500 text-ocean-950 font-bold transition-all';
      } else {
        btn.className = 'px-2.5 py-1 rounded-lg hover:bg-ocean-700 text-white font-bold transition-all';
      }
    }
  });

  initLucide();
}

function openArticleModal(id) {
  if (typeof ARTICLES_DATABASE === 'undefined') return;
  const article = ARTICLES_DATABASE.find(a => a.id === id);
  if (!article) return;

  const img = document.getElementById('modalArticleImage');
  if (img) img.src = article.image;

  const tag = document.getElementById('modalArticleTag');
  if (tag) tag.textContent = article.tag;

  const date = document.getElementById('modalArticleDate');
  if (date) date.textContent = article.date;

  const title = document.getElementById('modalArticleTitle');
  if (title) title.textContent = article.title;

  const content = document.getElementById('modalArticleContent');
  if (content) content.innerHTML = article.content;

  const waBtn = document.getElementById('modalArticleWhatsAppShare');
  if (waBtn) {
    waBtn.href = `https://wa.me/?text=${encodeURIComponent(article.title + ' - Confira no portal oficial do Recreio Shopping!')}`;
  }

  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  initLucide();
}

function closeArticleModal() {
  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/* =========================================================================
   4. RENDERIZAÇÃO: FILMES CINESYSTEM
   ========================================================================= */
function renderMovies(containerId = 'moviesGrid', limit = null) {
  const grid = document.getElementById(containerId);
  if (!grid || typeof MOVIES_DATABASE === 'undefined') return;

  const movies = limit ? MOVIES_DATABASE.slice(0, limit) : MOVIES_DATABASE;

  grid.innerHTML = movies.map(movie => `
    <div class="smooth-card bg-ocean-900 rounded-2xl overflow-hidden border border-ocean-800 shadow-luxury flex flex-col justify-between group">
      
      <!-- Poster e Badges -->
      <div class="relative h-64 overflow-hidden bg-black">
        <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-ocean-950 via-transparent to-black/40"></div>
        
        <span class="absolute top-3 left-3 ${movie.ratingColor} text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow">
          ${movie.rating}
        </span>

        <button onclick="openTrailerModal('${movie.title}', '${movie.trailerUrl}')" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-2xs cursor-pointer">
          <span class="w-12 h-12 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <i data-lucide="play" class="w-5 h-5 ml-1"></i>
          </span>
        </button>

        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
          <span>${movie.duration}</span>
          <span>${movie.genre}</span>
        </div>
      </div>

      <!-- Info & Sessões -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-coral-400 transition-colors leading-tight">${movie.title}</h3>
          <p class="text-xs text-slate-400 mt-1 line-clamp-2">${movie.synopsis}</p>
        </div>

        <div>
          <div class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center space-x-1">
            <i data-lucide="clock" class="w-3 h-3 text-coral-400"></i>
            <span>Sessões Disponíveis:</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${movie.sessionsToday.map(session => `
              <span class="bg-ocean-800 hover:bg-ocean-700 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-ocean-700/80 cursor-pointer" onclick="showToast('Sessão ${session} selecionada. Redirecionando para compra...')">
                ${session}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-2 border-t border-ocean-800/80 flex items-center justify-between">
          <button onclick="openTrailerModal('${movie.title}', '${movie.trailerUrl}')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 font-medium cursor-pointer">
            <i data-lucide="video" class="w-3.5 h-3.5"></i>
            <span>Trailer</span>
          </button>
          <a href="https://www.cinesystem.com.br" target="_blank" class="bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center space-x-1">
            <span>Comprar Assentos</span>
            <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </a>
        </div>

      </div>

    </div>
  `).join('');

  initLucide();
}

function setCinemaDay(day) {
  document.querySelectorAll('.cinema-day-btn').forEach(btn => {
    if (btn.dataset.day === day) {
      btn.className = 'cinema-day-btn px-4 py-2 rounded-full bg-coral-500 text-white transition-all font-bold';
    } else {
      btn.className = 'cinema-day-btn px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all font-medium';
    }
  });
  showToast(`Programação de cinema atualizada para ${day === 'today' ? 'Hoje' : day === 'tomorrow' ? 'Amanhã' : 'Fim de Semana'}.`);
}

/* =========================================================================
   5. RENDERIZAÇÃO: EVENTOS & .ICS
   ========================================================================= */
function renderEvents(filter = 'all', containerId = 'eventsGrid', limit = null) {
  const grid = document.getElementById(containerId);
  if (!grid || typeof EVENTS_DATABASE === 'undefined') return;

  const filtered = EVENTS_DATABASE.filter(ev => filter === 'all' || ev.type === filter);
  const events = limit ? filtered.slice(0, limit) : filtered;

  grid.innerHTML = events.map(ev => `
    <div class="smooth-card bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-luxury flex flex-col justify-between group">
      
      <div class="relative h-44 overflow-hidden bg-ocean-900">
        <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <span class="absolute top-3 left-3 ${ev.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          ${ev.typeLabel}
        </span>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center space-x-1.5 text-gold-500 text-xs font-semibold">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
            <span>${ev.date}</span>
          </div>
          <h3 class="text-base font-bold text-ocean-900 mt-1">${ev.title}</h3>
          <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">${ev.desc}</p>
          <div class="text-[11px] text-slate-500 mt-2 flex items-center space-x-1">
            <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
            <span>${ev.location}</span>
          </div>
        </div>

        <button onclick="downloadCalendarEvent('${encodeURIComponent(ev.title)}', '${encodeURIComponent(ev.desc)}', '${encodeURIComponent(ev.location)}', '${ev.startISO}', '${ev.endISO}')" class="w-full min-h-[42px] py-2.5 rounded-xl bg-sand-100 hover:bg-gold-50 text-ocean-900 text-xs font-bold transition-all border border-sand-200 flex items-center justify-center space-x-1.5 hover:border-gold-400 cursor-pointer">
          <i data-lucide="calendar-plus" class="w-4 h-4 text-gold-500"></i>
          <span>Salvar no Calendário (.ics)</span>
        </button>

      </div>

    </div>
  `).join('');

  initLucide();
}

function filterEvents(type) {
  document.querySelectorAll('.event-btn').forEach(btn => {
    if (btn.dataset.type === type) {
      btn.className = 'event-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-ocean-900 text-white transition-all cursor-pointer font-bold';
    } else {
      btn.className = 'event-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-white text-slate-700 hover:bg-sand-200 border border-sand-200 transition-all cursor-pointer font-semibold';
    }
  });
  renderEvents(type);
}

function downloadCalendarEvent(title, desc, loc, startISO, endISO) {
  const decodedTitle = decodeURIComponent(title);
  const decodedDesc = decodeURIComponent(desc);
  const decodedLoc = decodeURIComponent(loc);

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Recreio Shopping//Agenda Viva//PT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `SUMMARY:${decodedTitle}`,
    `DESCRIPTION:${decodedDesc}`,
    `LOCATION:${decodedLoc}`,
    `DTSTART:${startISO}`,
    `DTEND:${endISO}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${decodedTitle.toLowerCase().replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Evento "${decodedTitle}" salvo no seu calendário!`);
}

/* =========================================================================
   6. RENDERIZAÇÃO: LOJAS & VITRINE
   ========================================================================= */
function renderStores(containerId = 'storesGrid', limit = null) {
  const grid = document.getElementById(containerId);
  const emptyState = document.getElementById('noStoresFound');
  if (!grid || typeof STORES_DATABASE === 'undefined') return;

  const searchInput = document.getElementById('storeSearchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = STORES_DATABASE.filter(store => {
    const matchesFloor = (currentFloor === 'all' || store.floor === currentFloor);
    const matchesCat = (currentCategory === 'all' || store.category === currentCategory);
    const matchesSearch = !searchTerm || 
      store.name.toLowerCase().includes(searchTerm) || 
      store.description.toLowerCase().includes(searchTerm) ||
      store.category.toLowerCase().includes(searchTerm) ||
      store.floor.toLowerCase().includes(searchTerm);

    return matchesFloor && matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  const stores = limit ? filtered.slice(0, limit) : filtered;

  grid.innerHTML = stores.map(store => `
    <div class="smooth-card bg-white rounded-2xl overflow-hidden border border-sand-200/90 shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between group">
      
      <!-- Store Image & Badges -->
      <div class="relative h-44 overflow-hidden bg-ocean-900">
        <img src="${store.image}" alt="${store.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <span class="absolute top-3 left-3 bg-ocean-900/90 backdrop-blur-xs text-gold-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-gold-500/30 uppercase tracking-wider">
          Piso ${store.floor}
        </span>

        <span class="absolute bottom-3 left-3 bg-white/95 text-ocean-900 font-bold text-[10px] px-2 py-0.5 rounded shadow-2xs">
          ${store.tag}
        </span>

        ${store.petFriendly ? `
          <span class="absolute top-3 right-3 bg-palm-600/90 text-white p-1 rounded-full text-[10px]" title="Aceita Pets">
            <i data-lucide="dog" class="w-3.5 h-3.5"></i>
          </span>
        ` : ''}
      </div>

      <!-- Info Body -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${store.category}</span>
            <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Aberto</span>
          </div>
          <h3 class="text-lg font-bold text-ocean-900 mt-1 group-hover:text-gold-500 transition-colors">${store.name}</h3>
          <p class="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">${store.description}</p>
        </div>

        <div class="mt-5 pt-3 border-t border-sand-100 flex items-center justify-between gap-2">
          <button onclick="openStoreDetails(${store.id})" class="flex-1 min-h-[42px] py-2 px-3 rounded-xl bg-sand-100 hover:bg-sand-200 text-ocean-900 text-xs font-bold transition-colors text-center cursor-pointer">
            Ver Loja
          </button>
          <a href="https://wa.me/${store.whatsapp}?text=Ol%C3%A1%20${encodeURIComponent(store.name)},%20vi%20sua%20loja%20no%20portal%20do%20Recreio%20Shopping" target="_blank" class="min-h-[42px] py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer" title="Falar no WhatsApp">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span class="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  `).join('');

  initLucide();
}

function setFloorFilter(floor) {
  currentFloor = floor;
  document.querySelectorAll('.floor-btn').forEach(btn => {
    if (btn.dataset.floor === floor) {
      btn.className = 'floor-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-ocean-900 text-white transition-all cursor-pointer font-bold';
    } else {
      btn.className = 'floor-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-white text-slate-700 hover:bg-sand-100 border border-sand-200 transition-all cursor-pointer font-bold';
    }
  });
  renderStores();
}

function setCategoryFilter(cat) {
  currentCategory = cat;
  document.querySelectorAll('.category-btn').forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = 'category-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-gold-500 text-ocean-900 font-bold transition-all cursor-pointer';
    } else {
      btn.className = 'category-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-white text-slate-600 hover:bg-sand-100 border border-sand-200 transition-all cursor-pointer font-semibold';
    }
  });
  renderStores();
}

function filterStores() {
  renderStores();
}

function resetStoreFilters() {
  currentFloor = 'all';
  currentCategory = 'all';
  const input = document.getElementById('storeSearchInput');
  if (input) input.value = '';
  setFloorFilter('all');
  setCategoryFilter('all');
}

/* =========================================================================
   7. RENDERIZAÇÃO: GASTRONOMIA
   ========================================================================= */
function renderDining(filter = 'all', containerId = 'diningGrid') {
  const grid = document.getElementById(containerId);
  if (!grid || typeof DINING_DATABASE === 'undefined') return;

  const filtered = DINING_DATABASE.filter(item => filter === 'all' || item.tag === filter);

  grid.innerHTML = filtered.map(item => `
    <div class="smooth-card bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-luxury flex flex-col justify-between group">
      
      <div class="relative h-52 overflow-hidden bg-ocean-900">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute top-3 left-3 bg-palm-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
          ${item.tagLabel}
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs font-semibold text-gold-500">${item.type}</span>
          <h3 class="text-xl font-bold text-ocean-900 mt-1">${item.name}</h3>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">${item.desc}</p>
          
          <div class="flex flex-wrap gap-1.5 mt-3">
            ${item.features.map(f => `
              <span class="bg-sand-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded">
                ${f}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-sand-100 flex items-center justify-between text-xs">
          <span class="text-slate-500">${item.hours}</span>
          <a href="https://wa.me/${item.whatsapp}?text=Ol%C3%A1%20${encodeURIComponent(item.name)},%20gostaria%20de%20consultar%20o%20card%C3%A1pio%20e%20fazer%20uma%20reserva" target="_blank" class="bg-palm-600 hover:bg-palm-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition-colors flex items-center space-x-1">
            <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i>
            <span>Reservar Mesa</span>
          </a>
        </div>

      </div>

    </div>
  `).join('');

  initLucide();
}

function filterDining(type) {
  document.querySelectorAll('.dining-btn').forEach(btn => {
    if (btn.dataset.filter === type) {
      btn.className = 'dining-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-palm-600 text-white transition-all cursor-pointer font-bold';
    } else {
      btn.className = 'dining-btn shrink-0 min-h-[38px] px-4 py-2 rounded-full bg-white text-slate-700 hover:bg-sand-100 border border-sand-200 transition-all cursor-pointer font-semibold';
    }
  });
  renderDining(type);
}

/* =========================================================================
   8. LISTENERS GLOBAIS DE JANELA & TECLADO
   ========================================================================= */
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('hoursDropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    const btn = e.target.closest('button[onclick="toggleHoursDropdown()"]');
    const inside = e.target.closest('#hoursDropdown');
    if (!btn && !inside) {
      dropdown.classList.add('hidden');
    }
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
  if (e.key === 'Escape') {
    closeSearchModal();
    closeStoreModal();
    closePetModal();
    closeTrailerModal();
    closeFullscreenMap();
    closeArticleModal();
    closeIaraChat();
  }
});

/* =========================================================================
   17. IARA — SISTEMA DE ATENDIMENTO VIRTUAL INTELIGENTE (ALLOS)
   ========================================================================= */

function initIaraBot() {
  if (document.getElementById('iaraBotLauncherContainer')) {
    initLucide();
    return;
  }

  const container = document.createElement('div');
  container.innerHTML = `
    <!-- Launcher Flutuante IARA -->
    <div id="iaraBotLauncherContainer" class="fixed bottom-5 right-5 z-40 flex items-center space-x-2">
      <!-- Speech bubble oficial IARA -->
      <div onclick="openIaraChat()" class="cursor-pointer hidden sm:flex items-center space-x-2 bg-white/95 backdrop-blur-md text-ocean-950 px-3.5 py-2 rounded-2xl shadow-xl border border-gold-400/40 hover:scale-105 transition-all">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-xs font-semibold">Olá, precisa de ajuda?</span>
        <span class="bg-ocean-900 text-gold-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full tracking-wider">IARA</span>
      </div>

      <!-- Botão Circular do Bot -->
      <button 
        onclick="toggleIaraChat()" 
        id="iaraLauncherBtn" 
        aria-label="Abrir Atendimento Virtual IARA" 
        class="relative bg-gradient-to-br from-ocean-900 via-ocean-950 to-ocean-900 hover:from-ocean-800 hover:to-ocean-900 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-gold-400/60 group cursor-pointer"
      >
        <div class="relative flex items-center justify-center">
          <i data-lucide="bot" class="w-6 h-6 text-gold-400 group-hover:rotate-12 transition-transform"></i>
          <span class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ocean-950 animate-pulse"></span>
        </div>
      </button>
    </div>

    <!-- Modal / Janela Flutuante do Chat IARA -->
    <div id="iaraChatWidget" class="hidden fixed bottom-5 right-5 z-50 w-96 max-w-[calc(100vw-32px)] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-sand-200 flex flex-col overflow-hidden transition-all">
      <!-- Header do Chat -->
      <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-ocean-950 text-white p-3.5 border-b border-gold-500/30 flex items-center justify-between shrink-0 shadow-sm">
        <div class="flex items-center space-x-2.5">
          <div class="relative w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/60 flex items-center justify-center shrink-0">
            <i data-lucide="bot" class="w-5 h-5 text-gold-300"></i>
            <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ocean-950 animate-pulse"></span>
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="font-bold text-sm text-white tracking-wide">IARA</span>
              <span class="text-[9px] font-extrabold uppercase bg-gold-500/30 text-gold-300 px-1.5 py-0.5 rounded-md tracking-wider">ALLOS IA</span>
            </div>
            <p class="text-[11px] text-slate-300">Assistente Virtual • Recreio Shopping</p>
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <button onclick="resetIaraChat()" title="Reiniciar conversa" class="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-ocean-800 transition-colors cursor-pointer">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
          </button>
          <button onclick="closeIaraChat()" title="Fechar chat" class="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-ocean-800 transition-colors cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Feed de Mensagens -->
      <div id="iaraChatMessages" class="flex-1 overflow-y-auto p-3.5 space-y-3 bg-sand-50/60 text-xs">
        <!-- Mensagem Inicial de Boas-vindas -->
        <div class="flex items-start space-x-2">
          <div class="w-7 h-7 rounded-full bg-ocean-900 text-gold-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>
          <div class="bg-white border border-sand-200 rounded-2xl rounded-tl-none p-3 text-slate-800 shadow-xs max-w-[85%] space-y-1.5">
            <p class="font-medium text-ocean-950">Olá! Sou a <strong>IARA</strong>, a assistente virtual e inteligência artificial do <strong>Recreio Shopping</strong> (ALLOS). ✨</p>
            <p class="text-slate-600">Estou disponível 24 horas para ajudar você com lojas, cinema, gastronomia, horários e atrações do shopping. Como posso te orientar?</p>
          </div>
        </div>

        <!-- Quick Chips Iniciais -->
        <div id="iaraDefaultChips" class="space-y-1.5 pt-1">
          <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Atalhos rápidos:</p>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="handleIaraChip('🕒 Horários de Funcionamento')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🕒 Horários</button>
            <button onclick="handleIaraChip('🎬 Filmes no Cinema')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🎬 Cinema VIP</button>
            <button onclick="handleIaraChip('🛍️ Lojas & Marcas')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🛍️ Lojas</button>
            <button onclick="handleIaraChip('🍽️ Polo Gastronômico')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🍽️ Restaurantes</button>
            <button onclick="handleIaraChip('📅 Eventos no Mall')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">📅 Eventos</button>
            <button onclick="handleIaraChip('🐾 Regras Pet Friendly')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🐾 Pet Friendly</button>
            <button onclick="handleIaraChip('🚗 Estacionamento & BRT')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🚗 Estacionamento</button>
            <button onclick="handleIaraChip('💬 WhatsApp de Atendimento')" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">💬 WhatsApp (+55 21 4040-2274)</button>
          </div>
        </div>
      </div>

      <!-- Formulário de Envio -->
      <form onsubmit="handleIaraSubmit(event)" class="p-2.5 bg-white border-t border-sand-200 flex items-center space-x-2 shrink-0">
        <input 
          type="text" 
          id="iaraChatInput" 
          placeholder="Digite sua dúvida para a IARA..." 
          class="flex-1 bg-sand-50 border border-sand-200 rounded-full px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
          autocomplete="off"
        >
        <button 
          type="submit" 
          aria-label="Enviar mensagem" 
          class="bg-ocean-900 hover:bg-ocean-800 text-gold-400 w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <i data-lucide="send" class="w-4 h-4"></i>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(container);
  initLucide();
}

function toggleIaraChat() {
  const widget = document.getElementById('iaraChatWidget');
  if (!widget) {
    initIaraBot();
    return toggleIaraChat();
  }
  if (widget.classList.contains('hidden')) {
    openIaraChat();
  } else {
    closeIaraChat();
  }
}

function openIaraChat() {
  const widget = document.getElementById('iaraChatWidget');
  if (!widget) {
    initIaraBot();
    return openIaraChat();
  }
  widget.classList.remove('hidden');
  initLucide();
  const input = document.getElementById('iaraChatInput');
  if (input) input.focus();
  scrollIaraToBottom();
}

function closeIaraChat() {
  const widget = document.getElementById('iaraChatWidget');
  if (widget) {
    widget.classList.add('hidden');
  }
}

function scrollIaraToBottom() {
  const messages = document.getElementById('iaraChatMessages');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}

function resetIaraChat() {
  const messages = document.getElementById('iaraChatMessages');
  if (!messages) return;
  messages.innerHTML = `
    <div class="flex items-start space-x-2">
      <div class="w-7 h-7 rounded-full bg-ocean-900 text-gold-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="bg-white border border-sand-200 rounded-2xl rounded-tl-none p-3 text-slate-800 shadow-xs max-w-[85%] space-y-1.5">
        <p class="font-medium text-ocean-950">Conversa reiniciada! Sou a <strong>IARA</strong>, assistente virtual do Recreio Shopping. ✨</p>
        <p class="text-slate-600">Como posso te ajudar agora?</p>
      </div>
    </div>
    <div id="iaraDefaultChips" class="space-y-1.5 pt-1">
      <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Atalhos rápidos:</p>
      <div class="flex flex-wrap gap-1.5">
        <button onclick="handleIaraChip('🕒 Horários de Funcionamento')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🕒 Horários</button>
        <button onclick="handleIaraChip('🎬 Filmes no Cinema')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🎬 Cinema VIP</button>
        <button onclick="handleIaraChip('🛍️ Lojas & Marcas')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🛍️ Lojas</button>
        <button onclick="handleIaraChip('🍽️ Polo Gastronômico')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🍽️ Restaurantes</button>
        <button onclick="handleIaraChip('📅 Eventos no Mall')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">📅 Eventos</button>
        <button onclick="handleIaraChip('🐾 Regras Pet Friendly')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🐾 Pet Friendly</button>
        <button onclick="handleIaraChip('🚗 Estacionamento & BRT')" class="bg-white hover:bg-gold-50 text-ocean-900 border border-sand-200 hover:border-gold-400 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">🚗 Estacionamento</button>
        <button onclick="handleIaraChip('💬 WhatsApp de Atendimento')" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs">💬 WhatsApp (+55 21 4040-2274)</button>
      </div>
    </div>
  `;
  initLucide();
}

function handleIaraSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('iaraChatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  processIaraMessage(text);
}

function handleIaraChip(text) {
  processIaraMessage(text);
}

function processIaraMessage(userText) {
  const messages = document.getElementById('iaraChatMessages');
  if (!messages) return;

  // 1. Renderiza mensagem do usuário
  const userBubble = document.createElement('div');
  userBubble.className = 'flex justify-end';
  userBubble.innerHTML = `
    <div class="bg-ocean-900 text-white rounded-2xl rounded-tr-none px-3.5 py-2 shadow-xs max-w-[85%] text-slate-100 font-medium">
      ${userText}
    </div>
  `;
  messages.appendChild(userBubble);
  scrollIaraToBottom();

  // 2. Typing indicator simulando raciocínio da IA (400ms)
  const typingId = 'typing_' + Date.now();
  const typingBubble = document.createElement('div');
  typingBubble.id = typingId;
  typingBubble.className = 'flex items-start space-x-2';
  typingBubble.innerHTML = `
    <div class="w-7 h-7 rounded-full bg-ocean-900 text-gold-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
      <i data-lucide="bot" class="w-4 h-4"></i>
    </div>
    <div class="bg-white border border-sand-200 rounded-2xl rounded-tl-none px-3.5 py-2 text-slate-500 shadow-xs flex items-center space-x-1.5">
      <span class="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  `;
  messages.appendChild(typingBubble);
  initLucide();
  scrollIaraToBottom();

  setTimeout(() => {
    const el = document.getElementById(typingId);
    if (el) el.remove();

    const botResponse = getIaraBotAnswer(userText);
    const botBubble = document.createElement('div');
    botBubble.className = 'flex items-start space-x-2';
    botBubble.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-ocean-900 text-gold-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="bg-white border border-sand-200 rounded-2xl rounded-tl-none p-3 text-slate-800 shadow-xs max-w-[85%] space-y-1.5">
        ${botResponse}
      </div>
    `;
    messages.appendChild(botBubble);
    initLucide();
    scrollIaraToBottom();
  }, 450);
}

function getIaraBotAnswer(query) {
  const q = query.toLowerCase();

  // Horários
  if (q.includes('horário') || q.includes('horario') || q.includes('abre') || q.includes('fecha') || q.includes('funcionamento') || q.includes('domingo')) {
    return `
      <p class="font-bold text-ocean-950">🕒 Horários de Funcionamento:</p>
      <p>• <strong>Segunda a Sábado:</strong> Lojas e Alimentação das 10h às 22h.</p>
      <p>• <strong>Domingos e Feriados:</strong> Alimentação das 12h às 21h | Lojas das 13h às 21h.</p>
      <p class="text-slate-500 pt-1 text-[11px]">As salas Cinesystem abrem 30 minutos antes da primeira sessão do dia.</p>
    `;
  }

  // Cinema / Filmes
  if (q.includes('cinema') || q.includes('filme') || q.includes('cinesystem') || q.includes('ingresso') || q.includes('cartaz') || q.includes('sess') || q.includes('pipoca')) {
    return `
      <p class="font-bold text-ocean-950">🎬 Cinesystem VIP Laser Recreio Shopping:</p>
      <p>Temos <strong>6 filmes em cartaz</strong> com projeção Laser e poltronas elétricas reclináveis:</p>
      <p class="text-slate-600">• Capitão América: Admirável Mundo Novo<br>• Sonic 3: O Filme<br>• Moana 2<br>• O Auto da Compadecida 2<br>• Mufasa: O Rei Leão<br>• Wicked</p>
      <div class="pt-1.5">
        <a href="cinema.html" class="inline-flex items-center space-x-1 text-gold-600 hover:text-gold-700 font-bold underline">
          <span>Ver programação e horários completos</span> &rarr;
        </a>
      </div>
    `;
  }

  // Lojas / Compras
  if (q.includes('loja') || q.includes('marca') || q.includes('comprar') || q.includes('roupa') || q.includes('sapato') || q.includes('renner') || q.includes('c&a') || q.includes('riachuelo') || q.includes('centauro') || q.includes('sephora')) {
    return `
      <p class="font-bold text-ocean-950">🛍️ Mais de 140 Lojas & Marcas:</p>
      <p>Você encontra no Recreio Shopping grandes âncoras e marcas exclusivas: <strong>C&A, Lojas Renner, Riachuelo, Centauro, Casas Bahia, Sephora, Vivara, Ponto, O Boticário</strong> e muito mais!</p>
      <div class="pt-1.5">
        <a href="lojas.html" class="inline-flex items-center space-x-1 text-gold-600 hover:text-gold-700 font-bold underline">
          <span>Buscar no catálogo completo de lojas</span> &rarr;
        </a>
      </div>
    `;
  }

  // Polo Gastronômico / Restaurantes
  if (q.includes('restaurante') || q.includes('comer') || q.includes('gastronom') || q.includes('varanda') || q.includes('almoço') || q.includes('jantar') || q.includes('outback') || q.includes('pizza') || q.includes('chopp')) {
    return `
      <p class="font-bold text-ocean-950">🍽️ Polo Gastronômico Varanda do Recreio:</p>
      <p>Experiência gastronômica ao ar livre com <strong>Outback Steakhouse, Mamma Jamma Pizzaria, Camarada Camarão, Vizinhando Espetaria, Cervejaria Noi e Bacio di Latte</strong>.</p>
      <p class="text-slate-600 pt-1">Todos com mesas ao ar livre e ambiente familiar e pet friendly.</p>
    `;
  }

  // Eventos / Programação / Fique por Dentro
  if (q.includes('evento') || q.includes('agenda') || q.includes('show') || q.includes('teatro') || q.includes('programação') || q.includes('programacao') || q.includes('lazer')) {
    return `
      <p class="font-bold text-ocean-950">📅 Agenda Viva no Recreio:</p>
      <p>• <strong>Encontro Hot Wheels:</strong> Sábados no Piso L2.</p>
      <p>• <strong>Feira de Adoção Pet Love:</strong> Fins de semana no Piso L1.</p>
      <p>• <strong>Teatro Infantil Recreio:</strong> Domingos no Piso L3.</p>
      <p>• <strong>Música ao Vivo:</strong> Sextas e Sábados na Varanda.</p>
      <div class="pt-1.5">
        <a href="eventos.html" class="inline-flex items-center space-x-1 text-gold-600 hover:text-gold-700 font-bold underline">
          <span>Ver calendário e salvar na sua agenda</span> &rarr;
        </a>
      </div>
    `;
  }

  // Pet Friendly
  if (q.includes('pet') || q.includes('cachorro') || q.includes('gato') || q.includes('animal')) {
    return `
      <p class="font-bold text-ocean-950">🐾 Somos 100% Pet Friendly!</p>
      <p>Seu melhor amigo é muito bem-vindo no Recreio Shopping! Temos:</p>
      <p>• <strong>Carrinho Pet gratuito:</strong> Empréstimo no Balcão de Informações (L1).</p>
      <p>• <strong>Pet Park:</strong> Espaço exclusivo para brincadeiras ao ar livre.</p>
      <p>• <strong>Kit Higiênico:</strong> Disponível em todos os acessos do mall.</p>
      <p class="text-slate-500 text-[11px] pt-1">Permitida a entrada de cães e gatos com coleira e guia.</p>
    `;
  }

  // Estacionamento / Como Chegar / BRT / Carro
  if (q.includes('estacionamento') || q.includes('carro') || q.includes('vaga') || q.includes('brt') || q.includes('chegar') || q.includes('endereço') || q.includes('endereco') || q.includes('localização') || q.includes('localizacao')) {
    return `
      <p class="font-bold text-ocean-950">🚗 Como Chegar & Estacionamento:</p>
      <p>• <strong>Endereço:</strong> Av. das Américas, 19.019 - Recreio dos Bandeirantes, Rio de Janeiro.</p>
      <p>• <strong>BRT:</strong> Estação Recreio Shopping (TransOeste) com passarela direta integrada.</p>
      <p>• <strong>Estacionamento:</strong> Amplo estacionamento coberto e descoberto com pontos de recarga para veículos elétricos no Piso L1.</p>
    `;
  }

  // Acessibilidade / TEA / Fraldário
  if (q.includes('autis') || q.includes('tea') || q.includes('abafador') || q.includes('frald') || q.includes('bebê') || q.includes('bebe') || q.includes('cadeira') || q.includes('acessib')) {
    return `
      <p class="font-bold text-ocean-950">💙 Acessibilidade & Acolhimento:</p>
      <p>• <strong>Acolhimento TEA:</strong> Empréstimo gratuito de abafadores de ruído, cordão de girassol e kits sensoriais no Balcão de Informações.</p>
      <p>• <strong>Espaço Família & Fraldário:</strong> Pisos L1 e L2 com poltronas para amamentação e micro-ondas.</p>
      <p>• <strong>Cadeiras de Rodas:</strong> Disponíveis nos acessos principais e Balcão de Atendimento.</p>
    `;
  }

  // WhatsApp / Atendimento Humano / Telefone / SAC
  if (q.includes('whatsapp') || q.includes('sac') || q.includes('humano') || q.includes('atendente') || q.includes('contato') || q.includes('telefone') || q.includes('ouvidoria') || q.includes('email') || q.includes('e-mail')) {
    return `
      <p class="font-bold text-ocean-950">💬 Canais de Atendimento Recreio Shopping:</p>
      <p>• <strong>WhatsApp Oficial:</strong> <a href="https://wa.me/552140402274?text=Ol%C3%A1%20Recreio%20Shopping,%20gostaria%20de%20atendimento" target="_blank" class="text-emerald-700 font-bold underline">+55 (21) 4040-2274</a></p>
      <p>• <strong>Central Telefônica:</strong> (21) 2018-5421</p>
      <p>• <strong>E-mail:</strong> espaco.cliente@recreioshopping.com.br</p>
      <p>• <strong>Balcão de Atendimento Presencial:</strong> Piso L1, próximo à Praça de Eventos.</p>
    `;
  }

  // Resposta padrão inteligente
  return `
    <p>Entendi sua dúvida sobre <em>"${query}"</em>! ✨</p>
    <p>Como assistente virtual do shopping, posso te orientar sobre:</p>
    <p class="text-slate-600">• <strong>Horários</strong> de funcionamento<br>• <strong>Cinema VIP Laser</strong> e programação<br>• Localização de <strong>Lojas e Restaurantes</strong><br>• <strong>Eventos</strong> e regras <strong>Pet Friendly</strong></p>
    <div class="pt-1.5 flex flex-col space-y-1">
      <a href="https://wa.me/552140402274?text=Ol%C3%A1,%20gostaria%20de%20atendimento%20humano%20sobre%20${encodeURIComponent(query)}" target="_blank" class="text-emerald-600 font-bold hover:underline flex items-center gap-1">
        <span>Falar no WhatsApp com nossa equipe (+55 21 4040-2274)</span> &rarr;
      </a>
    </div>
  `;
}
