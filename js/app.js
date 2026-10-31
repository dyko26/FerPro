/* ==========================================================================
   HOSPEDAJE DESCANSO · EDÉN ECO BUNGALOW (LA FORTUNA, ALAJUELA, COSTA RICA)
   Complete Application Logic: Bilingual (ES/EN), Dark/Light Theme,
   Airbnb Direct Links, Payment Options (PayPal, SINPE Móvil, Efectivo, Tarjeta),
   Room Photo Sliders, Live Open-Meteo Weather & WhatsApp Package Quoter (No Prices)
   WhatsApp & SINPE Oficial: +506 8709-9538
   ========================================================================== */

const WHATSAPP_PHONE = "50687099538";
const SINPE_NUMBER = "87099538";
const MAPS_URL = "https://maps.app.goo.gl/Zo6J9n3V8yj61SLQA?g_st=aw";
const LATITUDE = 10.4674;
const LONGITUDE = -84.6427;

let currentLang = "es";
let latestWeatherData = null;

/* --------------------------------------------------------------------------
   1. ACCOMMODATIONS DATASET (Exact Airbnb Links, No Prices Displayed)
   -------------------------------------------------------------------------- */
const ROOMS_DATA = [
  {
    id: "room-1",
    valueEs: "Cabaña Familiar",
    titleEs: "Cabaña Familiar",
    titleEn: "Family Cabin",
    tagEs: "Familias & Grupos · Estancia Amplia",
    tagEn: "Families & Groups · Spacious Stay",
    badgeEs: "Airbnb & Reserva Directa",
    badgeEn: "Airbnb & Direct Booking",
    descEs: "Ideal para familias o grupos. Espacio amplio, cocina equipada y terraza privada.",
    descEn: "Ideal for families or groups. Ample space, equipped kitchen and private terrace.",
    specsEs: ["Cocina equipada", "Terraza privada", "Wi-Fi fibra", "Parqueo privado"],
    specsEn: ["Equipped kitchen", "Private terrace", "Fiber Wi-Fi", "Private parking"],
    airbnbUrl: "https://www.airbnb.mx/rooms/1804644948837495315?unique_share_id=521fc1b9-64c3-4e9f-952d-b5fd61528e98&viralityEntryPoint=1&s=76",
    paypalContainer: "#paypal-button-container-1",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    ],
    slideIndex: 0
  },
  {
    id: "room-2",
    valueEs: "Suite Parejas",
    titleEs: "Suite Parejas",
    titleEn: "Couples Suite",
    tagEs: "Escapada Romántica · 2 Huéspedes",
    tagEn: "Romantic Getaway · 2 Guests",
    badgeEs: "Airbnb & Reserva Directa",
    badgeEn: "Airbnb & Direct Booking",
    descEs: "Un espacio íntimo y acogedor, perfecto para escapadas románticas con vistas increíbles.",
    descEn: "An intimate and cozy space, perfect for romantic getaways with incredible views.",
    specsEs: ["Vista panorámica", "Cama Queen", "Ambiente privado", "Confort total"],
    specsEn: ["Panoramic view", "Queen bed", "Private setting", "Total comfort"],
    airbnbUrl: "https://www.airbnb.mx/rooms/1293799830440487852?unique_share_id=e254b20d-bc0e-439c-8d14-106ff2956caa&viralityEntryPoint=1&s=76",
    paypalContainer: "#paypal-button-container-2",
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    ],
    slideIndex: 0
  },
  {
    id: "room-3",
    valueEs: "Estudio Rústico",
    titleEs: "Estudio Rústico",
    titleEn: "Rustic Studio",
    tagEs: "Diseño Tradicional · 1 a 2 Huéspedes",
    tagEn: "Traditional Design · 1 to 2 Guests",
    badgeEs: "Airbnb & Reserva Directa",
    badgeEn: "Airbnb & Direct Booking",
    descEs: "Diseño tradicional con todas las comodidades modernas. Excelente iluminación natural.",
    descEn: "Traditional design with all modern comforts. Excellent natural lighting.",
    specsEs: ["Iluminación natural", "Detalles en madera", "Wi-Fi rápido", "Jardín tropical"],
    specsEn: ["Natural lighting", "Wood details", "Fast Wi-Fi", "Tropical garden"],
    airbnbUrl: "https://www.airbnb.mx/rooms/988456864879818369?unique_share_id=ffab125d-317f-427f-86cd-4e8f2a187663&viralityEntryPoint=1&s=76",
    paypalContainer: "#paypal-button-container-3",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1499955085172-a104c9463ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
    ],
    slideIndex: 0
  }
];

/* --------------------------------------------------------------------------
   2. FULL BILINGUAL TRANSLATION DICTIONARY (ES / EN)
   -------------------------------------------------------------------------- */
const TRANSLATIONS = {
  es: {
    "brand-sub": "Edén Eco Bungalow · La Fortuna",
    "nav-advantages": "Ventajas",
    "nav-options": "Alojamientos",
    "nav-experiences": "Experiencias",
    "nav-planner": "Cotizador",
    "nav-reviews": "Reseñas",
    "nav-location": "Ubicación",
    "nav-contact": "Contáctanos",

    "hero-badge": "Refugio Natural · La Fortuna, Alajuela",
    "hero-title": "Tu escape perfecto a la naturaleza",
    "hero-subtitle": "Descubre nuestras opciones de hospedaje diseñadas para brindarte paz, comodidad y una experiencia inolvidable.",
    "hero-btn": "Ver Alojamientos",
    "hero-btn-quote": "Cotizar Paquete",

    "dock-lbl-room": "Alojamiento",
    "dock-lbl-in": "Check-in",
    "dock-lbl-out": "Check-out",
    "dock-lbl-guests": "Huéspedes",
    "dock-btn": "Consultar Disponibilidad",

    "adv-eyebrow": "Hospitalidad & Entorno",
    "adv-title": "¿Por qué elegirnos?",
    "adv-sub": "Arquitectura acogedora rodeada de vegetación tropical con acceso inmediato a las mejores experiencias de la zona.",
    "adv-1-title": "Entorno Natural",
    "adv-1-desc": "Rodeado de naturaleza, ideal para desconectar de la rutina.",
    "adv-2-title": "Comodidad Total",
    "adv-2-desc": "Equipamiento completo para que te sientas como en casa.",
    "adv-3-title": "Excelente Ubicación",
    "adv-3-desc": "Fácil acceso y cerca de atractivos turísticos locales.",

    "rooms-eyebrow": "Estancias Privadas",
    "rooms-title": "Nuestras Opciones",
    "rooms-sub": "Explora cada alojamiento directamente en Airbnb o reserva con nosotros mediante PayPal, SINPE Móvil, efectivo o tarjeta.",
    "btn-airbnb": "Ver en Airbnb",
    "btn-quote-room": "Cotizar Estadía",
    "btn-pay-options": "Métodos de Pago (PayPal, SINPE, Efectivo, Tarjeta)",
    "pay-accepted-lbl": "Medios de pago aceptados:",
    "pay-cash": "Efectivo",
    "pay-card": "Tarjeta",
    "pay-sinpe-lbl": "SINPE Móvil: 8709-9538",
    "btn-copy-sinpe": "Copiar",
    "btn-copied": "Copiado",

    "exp-eyebrow": "Tours & Bienestar",
    "exp-title": "Experiencias y Aventura",
    "exp-desc": "Complementa tu estadía con actividades inolvidables. Haz clic en cualquier experiencia para sumarla directamente a tu cotización.",
    "exp-click-hint": "+ Agregar al paquete",
    "exp-selected-hint": "✓ En tu paquete",
    "exp-1-title": "Aguas Termales & Rafting",
    "exp-1-desc": "Aventura en los rápidos y relajación total en las piscinas naturales.",
    "exp-2-title": "Tour a Caballo",
    "exp-2-desc": "Recorridos guiados para disfrutar de la naturaleza desde otra perspectiva.",
    "exp-3-title": "Canopy & Caminatas",
    "exp-3-desc": "Sobrevuela el bosque en canopy o descubre la vida silvestre en nuestras caminatas nocturnas.",
    "exp-4-title": "Masajes Relajantes",
    "exp-4-desc": "Renueva tu energía con sesiones de terapia corporal a tu disposición.",

    "plan-eyebrow": "Planificador en Línea",
    "plan-main-title": "Clima en Tiempo Real & Cotizador de Paquetes",
    "plan-main-sub": "Consulta las condiciones actuales en La Fortuna y solicita disponibilidad personalizada por WhatsApp.",
    "weather-eyebrow": "Telemetría Local",
    "weather-title": "Clima en la Zona",
    "weather-desc": "Ideal para planificar tus tours y actividades al aire libre.",
    "weather-lbl-loc": "Ubicación",
    "weather-lbl-wind": "Viento actual",
    "weather-lbl-cond": "Condición",
    "weather-lbl-rec": "Recomendación hoy",

    "pay-box-eyebrow": "Facilidades de Pago",
    "pay-box-title": "Reserva Directa o por Airbnb",
    "pay-box-desc": "Aceptamos múltiples métodos para tu comodidad al reservar directamente con nosotros:",
    "pay-m1": "PayPal (Internacional)",
    "pay-m2": "SINPE Móvil (8709-9538)",
    "pay-m3": "Efectivo en recepción",
    "pay-m4": "Tarjeta (Débito / Crédito)",

    "pkg-title": "Cotiza tu Paquete Personalizado",
    "pkg-lbl-room": "Alojamiento de interés",
    "pkg-opt-undecided": "Aún no lo decido",
    "pkg-lbl-guests": "Número de Personas",
    "pkg-lbl-checkin": "Fecha de Check-in",
    "pkg-lbl-checkout": "Fecha de Check-out",
    "pkg-lbl-payment": "Método de Pago Preferido",
    "pkg-pay-sinpe": "SINPE Móvil (8709-9538)",
    "pkg-pay-paypal": "PayPal",
    "pkg-pay-card": "Tarjeta (Débito / Crédito)",
    "pkg-pay-cash": "Efectivo",
    "pkg-pay-airbnb": "Reserva vía Airbnb",
    "pkg-lbl-exp": "Selecciona las experiencias que deseas agregar:",
    "pkg-exp-1": "Aguas Termales & Rafting",
    "pkg-exp-2": "Tour a Caballo",
    "pkg-exp-3": "Canopy & Caminatas",
    "pkg-exp-4": "Masajes Relajantes",
    "pkg-exp-5": "Servicio de Alimentación (Desayunos, Almuerzos, Cenas)",
    "pkg-est-label": "Resumen de tu solicitud",
    "pkg-est-status": "Cotización Directa",
    "pkg-est-note": "PayPal · SINPE Móvil · Efectivo · Tarjeta",
    "pkg-btn": "Cotizar mi paquete por WhatsApp",

    "rev-eyebrow": "Calificación 5.0 ★ en Airbnb",
    "rev-title": "Lo que dicen nuestros huéspedes",
    "rev-sub": "Reseñas verificadas de viajeros que se han hospedado con nosotros.",
    "rev-guest": "Huésped de Airbnb",
    "rev-1-text": "\"Un lugar increíble para desconectar. Las cabañas están impecables, el entorno natural es bellísimo y la atención fue de primera. Definitivamente volveremos.\"",
    "rev-2-text": "\"La mejor opción si buscas paz. Tomamos el tour a caballo y los masajes, todo estuvo perfectamente coordinado. La cama era muy cómoda.\"",
    "rev-3-text": "\"Excelente ubicación para visitar las aguas termales y luego descansar rodeado de naturaleza. El desayuno que sirven a la habitación es delicioso.\"",

    "loc-eyebrow": "Cómo Llegar",
    "loc-title": "Nuestra Ubicación",
    "loc-desc": "Estamos ubicados en un punto estratégico en La Fortuna (Edén Eco Bungalow). Utiliza el enlace directo para navegar desde Google Maps o Waze.",
    "loc-place-lbl": "Propiedad",
    "loc-region-lbl": "Zona",
    "loc-coords-lbl": "Coordenadas",
    "loc-btn": "Abrir en Google Maps",
    "loc-waze-btn": "Abrir en Waze",
    "loc-contact-title": "Atención Directa & Pagos",
    "loc-contact-desc": "¿Tienes dudas o peticiones especiales? Escríbenos directamente por WhatsApp.",

    "footer-copy": "© 2026 Hospedaje Descanso · Edén Eco Bungalow. Naturaleza y Descanso en La Fortuna, Costa Rica."
  },
  en: {
    "brand-sub": "Edén Eco Bungalow · La Fortuna",
    "nav-advantages": "Advantages",
    "nav-options": "Lodgings",
    "nav-experiences": "Experiences",
    "nav-planner": "Planner",
    "nav-reviews": "Reviews",
    "nav-location": "Location",
    "nav-contact": "Contact Us",

    "hero-badge": "Nature Retreat · La Fortuna, Alajuela",
    "hero-title": "Your perfect escape to nature",
    "hero-subtitle": "Discover our lodging options designed to bring you peace, comfort, and an unforgettable experience.",
    "hero-btn": "View Lodgings",
    "hero-btn-quote": "Quote Package",

    "dock-lbl-room": "Lodging",
    "dock-lbl-in": "Check-in",
    "dock-lbl-out": "Check-out",
    "dock-lbl-guests": "Guests",
    "dock-btn": "Check Availability",

    "adv-eyebrow": "Hospitality & Surroundings",
    "adv-title": "Why choose us?",
    "adv-sub": "Warm architecture surrounded by lush tropical nature with immediate access to the area's best experiences.",
    "adv-1-title": "Natural Environment",
    "adv-1-desc": "Surrounded by nature, ideal to disconnect from routine.",
    "adv-2-title": "Total Comfort",
    "adv-2-desc": "Fully equipped so you feel right at home.",
    "adv-3-title": "Excellent Location",
    "adv-3-desc": "Easy access and close to local tourist attractions.",

    "rooms-eyebrow": "Private Stays",
    "rooms-title": "Our Options",
    "rooms-sub": "Explore each accommodation directly on Airbnb or book with us via PayPal, SINPE Móvil, cash, or card.",
    "btn-airbnb": "View on Airbnb",
    "btn-quote-room": "Quote Stay",
    "btn-pay-options": "Payment Methods (PayPal, SINPE, Cash, Card)",
    "pay-accepted-lbl": "Accepted payment methods:",
    "pay-cash": "Cash",
    "pay-card": "Card",
    "pay-sinpe-lbl": "SINPE Móvil: 8709-9538",
    "btn-copy-sinpe": "Copy",
    "btn-copied": "Copied",

    "exp-eyebrow": "Tours & Wellness",
    "exp-title": "Experiences & Adventure",
    "exp-desc": "Complement your stay with unforgettable activities. Click any experience below to add it directly to your package quote.",
    "exp-click-hint": "+ Add to package",
    "exp-selected-hint": "✓ Added to package",
    "exp-1-title": "Hot Springs & Rafting",
    "exp-1-desc": "Adventure in the rapids and total relaxation in natural pools.",
    "exp-2-title": "Horseback Riding",
    "exp-2-desc": "Guided tours to enjoy nature from another perspective.",
    "exp-3-title": "Canopy & Hiking",
    "exp-3-desc": "Fly over the forest canopy or discover wildlife on night walks.",
    "exp-4-title": "Relaxing Massages",
    "exp-4-desc": "Renew your energy with body therapy sessions at your disposal.",

    "plan-eyebrow": "Online Planner",
    "plan-main-title": "Live Weather & Custom Package Quoter",
    "plan-main-sub": "Check current conditions in La Fortuna and request personalized availability via WhatsApp.",
    "weather-eyebrow": "Local Telemetry",
    "weather-title": "Local Weather",
    "weather-desc": "Ideal for planning your tours and outdoor activities.",
    "weather-lbl-loc": "Location",
    "weather-lbl-wind": "Current wind",
    "weather-lbl-cond": "Condition",
    "weather-lbl-rec": "Today's tip",

    "pay-box-eyebrow": "Payment Options",
    "pay-box-title": "Direct Booking or Airbnb",
    "pay-box-desc": "We accept multiple payment methods when booking directly with us:",
    "pay-m1": "PayPal (International)",
    "pay-m2": "SINPE Móvil (8709-9538)",
    "pay-m3": "Cash at reception",
    "pay-m4": "Credit / Debit Card",

    "pkg-title": "Quote your Custom Package",
    "pkg-lbl-room": "Lodging of interest",
    "pkg-opt-undecided": "Not decided yet",
    "pkg-lbl-guests": "Number of Guests",
    "pkg-lbl-checkin": "Check-in Date",
    "pkg-lbl-checkout": "Check-out Date",
    "pkg-lbl-payment": "Preferred Payment Method",
    "pkg-pay-sinpe": "SINPE Móvil (8709-9538)",
    "pkg-pay-paypal": "PayPal",
    "pkg-pay-card": "Card (Debit / Credit)",
    "pkg-pay-cash": "Cash",
    "pkg-pay-airbnb": "Book via Airbnb",
    "pkg-lbl-exp": "Select the experiences you want to add:",
    "pkg-exp-1": "Hot Springs & Rafting",
    "pkg-exp-2": "Horseback Riding",
    "pkg-exp-3": "Canopy & Hiking",
    "pkg-exp-4": "Relaxing Massages",
    "pkg-exp-5": "Food Service (Breakfast, Lunch, Dinner)",
    "pkg-est-label": "Request summary",
    "pkg-est-status": "Direct Quote",
    "pkg-est-note": "PayPal · SINPE Móvil · Cash · Card",
    "pkg-btn": "Get quote via WhatsApp",

    "rev-eyebrow": "Rated 5.0 ★ on Airbnb",
    "rev-title": "What our guests say",
    "rev-sub": "Verified reviews from travelers who have stayed with us.",
    "rev-guest": "Airbnb Guest",
    "rev-1-text": "\"An incredible place to disconnect. The cabins are spotless, the natural environment is beautiful, and the service was top-notch. We will definitely return.\"",
    "rev-2-text": "\"The best option if you are looking for peace. We took the horseback riding tour and massages, everything was perfectly coordinated. The bed was very comfortable.\"",
    "rev-3-text": "\"Excellent location to visit the hot springs and then rest surrounded by nature. The breakfast served to the room is delicious.\"",

    "loc-eyebrow": "Getting Here",
    "loc-title": "Our Location",
    "loc-desc": "Strategically located in La Fortuna (Edén Eco Bungalow). Use the direct buttons below to navigate via Google Maps or Waze.",
    "loc-place-lbl": "Property",
    "loc-region-lbl": "Region",
    "loc-coords-lbl": "Coordinates",
    "loc-btn": "Open in Google Maps",
    "loc-waze-btn": "Open in Waze",
    "loc-contact-title": "Direct Contact & Payments",
    "loc-contact-desc": "Do you have questions or special requests? Write to us directly on WhatsApp.",

    "footer-copy": "© 2026 Hospedaje Descanso · Edén Eco Bungalow. Nature & Rest in La Fortuna, Costa Rica."
  }
};

/* --------------------------------------------------------------------------
   3. COPY SINPE HELPER
   -------------------------------------------------------------------------- */
function copySinpeNumber(btnEl) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(SINPE_NUMBER).catch(() => {});
  }
  if (btnEl) {
    const dict = TRANSLATIONS[currentLang];
    const original = dict["btn-copy-sinpe"];
    btnEl.textContent = dict["btn-copied"];
    setTimeout(() => {
      btnEl.textContent = TRANSLATIONS[currentLang]["btn-copy-sinpe"];
    }, 1800);
  }
}

/* --------------------------------------------------------------------------
   4. LANGUAGE ENGINE (ES / EN)
   -------------------------------------------------------------------------- */
function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "es";
  document.documentElement.lang = currentLang;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
  });

  const dict = TRANSLATIONS[currentLang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict && dict[key]) {
      el.textContent = dict[key];
    }
  });

  renderRooms();
  updateRoomSelectOptions();
  syncExperienceCardsUI();
  updatePackageEstimate();
  if (latestWeatherData) {
    renderWeatherUI(latestWeatherData);
  }
}

function toggleLanguage() {
  setLanguage(currentLang === "es" ? "en" : "es");
}

/* --------------------------------------------------------------------------
   5. DARK / LIGHT THEME ENGINE
   -------------------------------------------------------------------------- */
function toggleDarkMode() {
  const htmlEl = document.documentElement;
  htmlEl.classList.toggle("dark");
  const isDark = htmlEl.classList.contains("dark");
  try {
    localStorage.setItem("hd_theme", isDark ? "dark" : "light");
  } catch (e) {}
  updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
  const sunIcon = document.getElementById("iconSun");
  const moonIcon = document.getElementById("iconMoon");
  if (sunIcon && moonIcon) {
    sunIcon.style.display = isDark ? "inline-block" : "none";
    moonIcon.style.display = isDark ? "none" : "inline-block";
  }
}

/* --------------------------------------------------------------------------
   6. RENDER ACCOMMODATION CARDS & SLIDERS (NO PRICES)
   -------------------------------------------------------------------------- */
function renderRooms() {
  ROOMS_DATA.forEach((room, idx) => {
    const titleEl = document.getElementById(`room-title-${idx}`);
    const tagEl = document.getElementById(`room-tag-${idx}`);
    const descEl = document.getElementById(`room-desc-${idx}`);
    const badgeEl = document.getElementById(`room-badge-${idx}`);
    const specsEl = document.getElementById(`room-specs-${idx}`);
    const imgEl = document.getElementById(`room-img-${idx}`);
    const counterEl = document.getElementById(`room-counter-${idx}`);

    if (titleEl) titleEl.textContent = currentLang === "es" ? room.titleEs : room.titleEn;
    if (tagEl) tagEl.textContent = currentLang === "es" ? room.tagEs : room.tagEn;
    if (descEl) descEl.textContent = currentLang === "es" ? room.descEs : room.descEn;
    if (badgeEl) badgeEl.textContent = currentLang === "es" ? room.badgeEs : room.badgeEn;

    if (specsEl) {
      const specs = currentLang === "es" ? room.specsEs : room.specsEn;
      specsEl.innerHTML = specs.map((s) => `<span class="spec-chip">${s}</span>`).join("");
    }

    if (imgEl) {
      imgEl.src = room.images[room.slideIndex];
      imgEl.alt = currentLang === "es" ? room.titleEs : room.titleEn;
    }

    if (counterEl) {
      counterEl.textContent = `${room.slideIndex + 1} / ${room.images.length}`;
    }
  });
}

function changeRoomSlide(roomIdx, delta) {
  const room = ROOMS_DATA[roomIdx];
  if (!room) return;
  room.slideIndex = (room.slideIndex + delta + room.images.length) % room.images.length;
  const imgEl = document.getElementById(`room-img-${roomIdx}`);
  const counterEl = document.getElementById(`room-counter-${roomIdx}`);
  if (imgEl) imgEl.src = room.images[room.slideIndex];
  if (counterEl) counterEl.textContent = `${room.slideIndex + 1} / ${room.images.length}`;
}

function togglePayPalDrawer(idx) {
  const drawer = document.getElementById(`paypal-drawer-${idx}`);
  if (!drawer) return;
  drawer.classList.toggle("open");
}

function selectRoomForQuote(roomValueEs) {
  const pkgRoom = document.getElementById("pkg-room");
  if (pkgRoom) {
    pkgRoom.value = roomValueEs;
    updatePackageEstimate();
  }
  const plannerSection = document.getElementById("planificador");
  if (plannerSection) {
    plannerSection.scrollIntoView({ behavior: "smooth" });
  }
}

/* --------------------------------------------------------------------------
   7. QUICK AVAILABILITY DOCK -> PACKAGE PLANNER SYNC
   -------------------------------------------------------------------------- */
function applyHeroDockToPlanner() {
  const dockRoom = document.getElementById("dock-room");
  const dockIn = document.getElementById("dock-checkin");
  const dockOut = document.getElementById("dock-checkout");
  const dockGuests = document.getElementById("dock-guests");

  const pkgRoom = document.getElementById("pkg-room");
  const pkgIn = document.getElementById("pkg-checkin");
  const pkgOut = document.getElementById("pkg-checkout");
  const pkgGuests = document.getElementById("pkg-guests");

  if (dockRoom && pkgRoom) pkgRoom.value = dockRoom.value;
  if (dockIn && pkgIn && dockIn.value) pkgIn.value = dockIn.value;
  if (dockOut && pkgOut && dockOut.value) pkgOut.value = dockOut.value;
  if (dockGuests && pkgGuests && dockGuests.value) pkgGuests.value = dockGuests.value;

  updatePackageEstimate();
  const planner = document.getElementById("planificador");
  if (planner) planner.scrollIntoView({ behavior: "smooth" });
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE EXPERIENCES <-> CHECKBOXES SYNC
   -------------------------------------------------------------------------- */
function toggleExperienceCard(expValue) {
  const checkboxes = document.querySelectorAll(".pkg-experience");
  checkboxes.forEach((cb) => {
    if (cb.value === expValue) {
      cb.checked = !cb.checked;
    }
  });
  syncExperienceCardsUI();
  updatePackageEstimate();
}

function syncExperienceCardsUI() {
  const dict = TRANSLATIONS[currentLang];
  const checkedValues = new Set();
  document.querySelectorAll(".pkg-experience:checked").forEach((cb) => {
    checkedValues.add(cb.value);
  });

  document.querySelectorAll(".exp-card[data-exp]").forEach((card) => {
    const val = card.getAttribute("data-exp");
    const isSelected = checkedValues.has(val);
    card.classList.toggle("selected", isSelected);
    const badge = card.querySelector(".exp-select-indicator");
    if (badge) {
      badge.textContent = isSelected ? dict["exp-selected-hint"] : dict["exp-click-hint"];
    }
  });
}

/* --------------------------------------------------------------------------
   9. PACKAGE QUOTER SUMMARY (NO PRICES) & WHATSAPP GENERATOR
   -------------------------------------------------------------------------- */
function updateRoomSelectOptions() {
  const selects = [document.getElementById("pkg-room"), document.getElementById("dock-room")];
  selects.forEach((sel) => {
    if (!sel) return;
    const currentVal = sel.value;
    const opts = sel.querySelectorAll("option");
    opts.forEach((opt) => {
      const val = opt.value;
      const roomObj = ROOMS_DATA.find((r) => r.valueEs === val);
      if (roomObj) {
        opt.textContent = currentLang === "es" ? roomObj.titleEs : roomObj.titleEn;
      } else if (val === "Aún no lo decido") {
        opt.textContent = TRANSLATIONS[currentLang]["pkg-opt-undecided"];
      }
    });
    sel.value = currentVal;
  });
}

function calculateNights(checkinStr, checkoutStr) {
  if (!checkinStr || !checkoutStr) return 1;
  const d1 = new Date(checkinStr + "T00:00:00");
  const d2 = new Date(checkoutStr + "T00:00:00");
  const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

function updatePackageEstimate() {
  const roomVal = document.getElementById("pkg-room")?.value || "Cabaña Familiar";
  const checkin = document.getElementById("pkg-checkin")?.value || "";
  const checkout = document.getElementById("pkg-checkout")?.value || "";
  const guests = parseInt(document.getElementById("pkg-guests")?.value || "2", 10) || 2;
  const nights = calculateNights(checkin, checkout);

  const roomObj = ROOMS_DATA.find((r) => r.valueEs === roomVal);
  const breakdownEl = document.getElementById("pkgEstimateBreakdown");
  const checkedCount = document.querySelectorAll(".pkg-experience:checked").length;

  const roomLabel = roomObj
    ? currentLang === "es"
      ? roomObj.titleEs
      : roomObj.titleEn
    : TRANSLATIONS[currentLang]["pkg-opt-undecided"];

  if (breakdownEl) {
    breakdownEl.textContent =
      currentLang === "es"
        ? `${roomLabel} · ${nights} noche(s) · ${guests} persona(s) · ${checkedCount} experiencia(s)`
        : `${roomLabel} · ${nights} night(s) · ${guests} guest(s) · ${checkedCount} experience(s)`;
  }
}

function generateWhatsAppPackage() {
  const roomVal = document.getElementById("pkg-room")?.value || "Cabaña Familiar";
  const guests = document.getElementById("pkg-guests")?.value || "2";
  const checkin = document.getElementById("pkg-checkin")?.value || "";
  const checkout = document.getElementById("pkg-checkout")?.value || "";
  const paymentMethod = document.getElementById("pkg-payment")?.value || "SINPE Móvil";

  const roomObj = ROOMS_DATA.find((r) => r.valueEs === roomVal);
  const roomDisplay = roomObj
    ? currentLang === "es"
      ? roomObj.titleEs
      : roomObj.titleEn
    : currentLang === "es"
    ? "Aún no lo decido"
    : "Not decided yet";

  const checkboxes = document.querySelectorAll(".pkg-experience:checked");
  const experiences = [];
  checkboxes.forEach((cb) => experiences.push(cb.value));

  const nights = calculateNights(checkin, checkout);

  let msg =
    currentLang === "es"
      ? `¡Hola! Me gustaría consultar disponibilidad y cotizar en *Hospedaje Descanso (Edén Eco Bungalow)*:\n\n🏨 *Alojamiento:* ${roomDisplay}\n👥 *Personas:* ${guests}\n`
      : `Hello! I would like to check availability and get a quote at *Hospedaje Descanso (Edén Eco Bungalow)*:\n\n🏨 *Lodging:* ${roomDisplay}\n👥 *Guests:* ${guests}\n`;

  if (checkin && checkout) {
    msg +=
      currentLang === "es"
        ? `📅 *Fechas:* Del ${checkin} al ${checkout} (${nights} noche${nights > 1 ? "s" : ""})\n`
        : `📅 *Dates:* From ${checkin} to ${checkout} (${nights} night${nights > 1 ? "s" : ""})\n`;
  } else if (checkin) {
    msg += `📅 *Check-in:* ${checkin}\n`;
  }

  msg +=
    currentLang === "es"
      ? `💳 *Método de pago preferido:* ${paymentMethod}\n\n`
      : `💳 *Preferred payment method:* ${paymentMethod}\n\n`;

  if (experiences.length > 0) {
    msg +=
      currentLang === "es"
        ? `✨ *Experiencias / Extras de interés:*\n- ${experiences.join("\n- ")}`
        : `✨ *Selected Experiences / Extras:*\n- ${experiences.join("\n- ")}`;
  } else {
    msg +=
      currentLang === "es"
        ? `✨ *Extras:* Solo alojamiento por ahora.`
        : `✨ *Extras:* Just lodging for now.`;
  }

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* --------------------------------------------------------------------------
   10. LIVE WEATHER WIDGET (Open-Meteo API: 10.4674, -84.6427 La Fortuna)
   -------------------------------------------------------------------------- */
function getWeatherDescription(code, lang) {
  if (code === 0) {
    return {
      cond: lang === "es" ? "Cielo despejado" : "Clear sky",
      tip: lang === "es" ? "Excelente para Canopy, Cabalgata y Caminatas" : "Great for Canopy, Horseback Riding & Hikes"
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      cond: lang === "es" ? "Parcialmente nublado · Cálido" : "Partly cloudy · Warm",
      tip: lang === "es" ? "Clima ideal para todos los tours y Aguas Termales" : "Ideal weather for all tours & Hot Springs"
    };
  }
  if (code >= 45 && code <= 48) {
    return {
      cond: lang === "es" ? "Neblina de montaña" : "Mountain mist",
      tip: lang === "es" ? "Perfecto para Aguas Termales y Masajes Relajantes" : "Perfect for Hot Springs & Relaxing Massages"
    };
  }
  return {
    cond: lang === "es" ? "Lluvia tropical ligera" : "Tropical rain shower",
    tip: lang === "es" ? "Ideal para Aguas Termales calientes y Masajes" : "Ideal for warm Hot Springs & Massages"
  };
}

function renderWeatherUI(weather) {
  const temp = Math.round(weather.temperature);
  const wind = weather.windspeed;
  const info = getWeatherDescription(weather.weathercode, currentLang);

  const heroPill = document.getElementById("heroWeatherText");
  if (heroPill) {
    heroPill.textContent = `La Fortuna · ${temp}°C · ${info.cond}`;
  }

  const tempEl = document.getElementById("weatherTemp");
  const windEl = document.getElementById("weatherWind");
  const condEl = document.getElementById("weatherCond");
  const recEl = document.getElementById("weatherRec");

  if (tempEl) tempEl.textContent = `${temp}°C`;
  if (windEl) windEl.textContent = `${wind} km/h`;
  if (condEl) condEl.textContent = info.cond;
  if (recEl) recEl.textContent = info.tip;
}

function fetchLocalWeather() {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.current_weather) {
        latestWeatherData = data.current_weather;
        renderWeatherUI(latestWeatherData);
      }
    })
    .catch(() => {
      latestWeatherData = { temperature: 26, windspeed: 9.5, weathercode: 2 };
      renderWeatherUI(latestWeatherData);
    });
}

/* --------------------------------------------------------------------------
   11. SUBTLE SOCIAL PROOF NOTIFICATION
   -------------------------------------------------------------------------- */
const SOCIAL_PROOF_DATA = [
  { es: "Alguien de Suiza está viendo disponibilidad", en: "Someone from Switzerland is checking availability" },
  { es: "Un usuario de Alemania está consultando fechas", en: "A user from Germany is checking dates" },
  { es: "Alguien de Canadá está viendo la Suite Parejas", en: "Someone from Canada is viewing the Couples Suite" },
  { es: "Un usuario de Países Bajos solicitó información", en: "A user from the Netherlands requested information" },
  { es: "Alguien de Reino Unido está explorando opciones", en: "Someone from the UK is exploring options" }
];

let socialProofDismissed = false;

function dismissSocialProof() {
  socialProofDismissed = true;
  const toast = document.getElementById("social-proof-toast");
  if (toast) toast.classList.remove("visible");
}

function showSocialProof() {
  if (socialProofDismissed) return;
  const toast = document.getElementById("social-proof-toast");
  const msgEl = document.getElementById("sp-message");
  const timeEl = document.getElementById("sp-time");
  if (!toast || !msgEl || !timeEl) return;

  const item = SOCIAL_PROOF_DATA[Math.floor(Math.random() * SOCIAL_PROOF_DATA.length)];
  const mins = Math.floor(Math.random() * 14) + 1;

  msgEl.textContent = currentLang === "es" ? item.es : item.en;
  timeEl.textContent =
    currentLang === "es"
      ? mins === 1
        ? "Hace un momento · Consulta activa"
        : `Hace ${mins} minutos · Consulta activa`
      : mins === 1
      ? "Just now · Active inquiry"
      : `${mins} mins ago · Active inquiry`;

  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 5500);
}

/* --------------------------------------------------------------------------
   12. PAYPAL SDK INITIALIZATION (NO FIXED VISIBLE PRICE ON UI)
   -------------------------------------------------------------------------- */
function initPayPalButtons() {
  if (typeof window.paypal === "undefined") return;
  const defaultAmounts = ["50.00", "45.00", "40.00"];
  ROOMS_DATA.forEach((room, idx) => {
    const container = document.querySelector(room.paypalContainer);
    if (!container) return;
    try {
      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            color: "black",
            shape: "rect",
            label: "paypal",
            height: 36,
            tagline: false
          },
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description: room.titleEs,
                  amount: { value: defaultAmounts[idx] || "50.00" }
                }
              ]
            }),
          onApprove: (data, actions) =>
            actions.order.capture().then(() => {
              const msg =
                currentLang === "es"
                  ? `¡Hola! Acabo de realizar el pago de reserva por PayPal para *${room.titleEs}*.`
                  : `Hello! I just completed a PayPal reservation payment for *${room.titleEn}*.`;
              window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
            })
        })
        .render(room.paypalContainer);
    } catch (e) {}
  });
}

/* --------------------------------------------------------------------------
   13. INITIALIZATION ON DOM READY
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const savedTheme = localStorage.getItem("hd_theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
  updateThemeIcons(document.documentElement.classList.contains("dark"));

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000 * 2);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  ["pkg-checkin", "dock-checkin"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("min", todayStr);
      el.value = todayStr;
    }
  });

  ["pkg-checkout", "dock-checkout"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("min", todayStr);
      el.value = tomorrowStr;
    }
  });

  ["pkg-room", "pkg-guests", "pkg-checkin", "pkg-checkout", "pkg-payment"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", updatePackageEstimate);
      el.addEventListener("input", updatePackageEstimate);
    }
  });

  document.querySelectorAll(".pkg-experience").forEach((cb) => {
    cb.addEventListener("change", () => {
      syncExperienceCardsUI();
      updatePackageEstimate();
    });
  });

  renderRooms();
  updateRoomSelectOptions();
  syncExperienceCardsUI();
  updatePackageEstimate();
  fetchLocalWeather();
  initPayPalButtons();

  setTimeout(showSocialProof, 5000);
  setInterval(showSocialProof, 24000);
});
