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
  }
});
