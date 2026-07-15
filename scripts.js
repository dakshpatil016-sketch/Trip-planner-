const cityInfos = {
  "New York": {
    description: "The city that never sleeps, packed with iconic landmarks, world-class museums, and a vibrant food scene.",
    highlights: ["Central Park", "Statue of Liberty", "Times Square", "Brooklyn Bridge", "Metropolitan Museum of Art"]
  },
  "Los Angeles": {
    description: "A sun-soaked metropolis of beaches, film studios, and creative neighborhoods where star power meets coastal chill.",
    highlights: ["Hollywood Sign", "Santa Monica Pier", "Griffith Observatory", "Venice Beach", "Getty Center"]
  },
  "Chicago": {
    description: "A lakeside city with bold architecture, famous blues music, and hearty food in a friendly Midwestern vibe.",
    highlights: ["Millennium Park", "Navy Pier", "Art Institute of Chicago", "Willis Tower", "Magnificent Mile"]
  },
  "San Francisco": {
    description: "A scenic bay city with iconic bridges, colorful neighborhoods, and a charming mix of tech and historic culture.",
    highlights: ["Golden Gate Bridge", "Alcatraz Island", "Fisherman's Wharf", "Chinatown", "Painted Ladies"]
  },
  "Miami": {
    description: "A tropical destination known for its vibrant nightlife, Art Deco architecture, and beautiful beach culture.",
    highlights: ["South Beach", "Wynwood Walls", "Little Havana", "Biscayne Bay", "Vizcaya Museum"]
  },
  "London": {
    description: "A historic capital blending royal tradition, world-famous museums, and charming neighborhoods along the Thames.",
    highlights: ["Tower of London", "British Museum", "Buckingham Palace", "London Eye", "Camden Market"]
  },
  "Paris": {
    description: "The city of lights, romance, and timeless art, with elegant boulevards, iconic monuments, and top-tier cuisine.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre", "Seine River Cruise"]
  },
  "Tokyo": {
    description: "A dynamic city where futuristic technology and ancient tradition sit side by side in a lively urban maze.",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower", "Meiji Shrine", "Tsukiji Market"]
  },
  "Dubai": {
    description: "A desert metropolis known for luxurious malls, soaring skyscrapers, and spectacular modern architecture.",
    highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari", "Dubai Marina"]
  },
  "Sydney": {
    description: "A sunny harbor city with a world-famous opera house, great beaches, and outdoor lifestyle appeal.",
    highlights: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach", "The Rocks", "Taronga Zoo"]
  },
  "Barcelona": {
    description: "A colorful coastal city famed for Gaudí architecture, lively markets, and a Mediterranean seaside ambiance.",
    highlights: ["Sagrada Familia", "Park Güell", "La Rambla", "Gothic Quarter", "Montjuïc"]
  },
  "Rome": {
    description: "A historic capital filled with ancient ruins, magnificent churches, and the world’s most famous piazzas.",
    highlights: ["Colosseum", "Vatican Museums", "Trevi Fountain", "Pantheon", "Roman Forum"]
  },
  "Bangkok": {
    description: "A bustling Southeast Asian hub with ornate temples, vibrant street markets, and unforgettable street food.",
    highlights: ["Grand Palace", "Wat Pho", "Chatuchak Market", "Khao San Road", "Chao Phraya River"]
  },
  "Singapore": {
    description: "A modern city-state with lush gardens, cutting-edge architecture, and a fusion of cultures and cuisine.",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa", "Chinatown", "Orchard Road"]
  }
};

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';
const usersStorageKey = 'tripPlannerUsers';
const currentUserKey = 'tripPlannerCurrentUser';
const adminSessionKey = 'tripPlannerAdmin';

const cityCoords = {
  "New York": { lat: 40.7128, lon: -74.0060 },
  "Los Angeles": { lat: 34.0522, lon: -118.2437 },
  "Chicago": { lat: 41.8781, lon: -87.6298 },
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  "Miami": { lat: 25.7617, lon: -80.1918 },
  "London": { lat: 51.5074, lon: -0.1278 },
  "Paris": { lat: 48.8566, lon: 2.3522 },
  "Tokyo": { lat: 35.6895, lon: 139.6917 },
  "Dubai": { lat: 25.2048, lon: 55.2708 },
  "Sydney": { lat: -33.8688, lon: 151.2093 },
  "Barcelona": { lat: 41.3851, lon: 2.1734 },
  "Rome": { lat: 41.9028, lon: 12.4924 },
  "Bangkok": { lat: 13.7563, lon: 100.5018 },
  "Singapore": { lat: 1.3521, lon: 103.8198 }
};

const cityImages = {
  "New York": "Image/New york.jpg",
  "Los Angeles": "Image/los angeles.jpg",
  "Chicago": "Image/Chicago.jpg",
  "San Francisco": "Image/San Francisco.jpg",
  "Miami": "Image/Miami.jpg",
  "London": "Image/London.jpg",
  "Paris": "Image/Paris.jpg",
  "Tokyo": "Image/Tokyo.jpg",
  "Dubai": "Image/Dubai.jpg",
  "Sydney": "Image/Sydney.jpg",
  "Barcelona": "Image/Barcelona.jpg",
  "Rome": "Image/Rome.jpg",
  "Bangkok": "Image/Bangkok.jpg",
  "Singapore": "Image/Singapore.jpg"
};

function getCityImageUrl(city) {
  return cityImages[city] ? encodeURI(cityImages[city]) : null;
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(usersStorageKey) || '[]');
  } catch (error) {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function getCurrentUserEmail() {
  return localStorage.getItem(currentUserKey);
}

function setCurrentUserEmail(email) {
  localStorage.setItem(currentUserKey, email);
}

function logoutCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

function setAdminSession() {
  localStorage.setItem(adminSessionKey, 'true');
}

function clearAdminSession() {
  localStorage.removeItem(adminSessionKey);
}

function isAdminLoggedIn() {
  return localStorage.getItem(adminSessionKey) === 'true';
}

function findUser(email) {
  if (!email) return null;
  return getStoredUsers().find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

function getCurrentUserName() {
  const user = findUser(getCurrentUserEmail());
  return user ? user.name : null;
}

function saveUser(user) {
  const users = getStoredUsers();
  const existingIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  saveStoredUsers(users);
}

function addTripToUser(email, tripData) {
  if (!email || !tripData) return;
  const user = findUser(email);
  if (!user) return;
  user.trips = user.trips || [];
  user.trips.push({ createdAt: new Date().toISOString(), ...tripData });
  saveUser(user);
}

function parseDateDMY(value) {
  if (!value) return null;

  const isoMatch = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
  }

  const dmyMatch = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!dmyMatch) return null;

  const day = Number(dmyMatch[1]);
  const month = Number(dmyMatch[2]) - 1;
  const year = Number(dmyMatch[3]);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

function formatDate(value) {
  let date = null;

  if (value instanceof Date) {
    date = value;
  } else {
    date = parseDateDMY(value);
    if (!date) {
      date = new Date(value);
    }
  }

  if (!date || Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function autoFormatDateInput(event) {
  const input = event.target;
  const digits = input.value.replace(/\D/g, '').slice(0, 8);
  const parts = [];
  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
    if (digits.length >= 4) {
      parts.push(digits.slice(2, 4));
      if (digits.length > 4) {
        parts.push(digits.slice(4));
      }
    } else {
      parts.push(digits.slice(2));
    }
  } else {
    parts.push(digits);
  }
  input.value = parts.join('/');
  updateDatePreview(input.id, input.id === 'depart-date' ? document.getElementById('depart-preview') : document.getElementById('return-preview'));
}

function updateDatePreview(inputId, previewElement) {
  const input = document.getElementById(inputId);
  const date = parseDateDMY(input.value);
  previewElement.textContent = date ? formatDate(date) : 'dd/mm/yyyy';
}
function getMapEmbedUrl(query) {
  const encoded = encodeURIComponent(query.trim() || 'travel destination');
  return `https://maps.google.com/maps?q=${encoded}&z=6&output=embed`;
}

function renderMapPreview(destination, element) {
  if (!element) return;
  if (!destination) {
    element.innerHTML = '<p>Map preview and travel route appear here.</p>';
    return;
  }
  element.innerHTML = `
    <iframe class="map-frame" src="${getMapEmbedUrl(destination)}" title="Map of ${destination}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;
}

function getDuration(start, end) {
  const startDate = parseDateDMY(start);
  const endDate = parseDateDMY(end);
  if (!startDate || !endDate) return 0;
  const diffMs = endDate - startDate;
  return diffMs >= 0 ? Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1 : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function calculateDistanceKm(fromCity, toCity) {
  const from = cityCoords[fromCity];
  const to = cityCoords[toCity];
  if (!from || !to) return null;

  const toRad = degrees => degrees * (Math.PI / 180);
  const R = 6371;
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function createStat(label, value) {
  return `
    <div class="stat">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `;
}


function buildDayPlan(highlights, duration, style) {
  const plan = [];
  for (let i = 0; i < duration; i += 1) {
    const dayNumber = i + 1;
    const highlight = highlights[i] || highlights[i % highlights.length] || 'Explore the city';
    let headline;
    let details;

    if (i === 0) {
      headline = `Welcome day: ${highlight}`;
      details = `Arrive, settle in, and begin with ${highlight} to feel the local rhythm.`;
    } else if (i === duration - 1) {
      headline = `Final day: ${highlight}`;
      details = `Spend your last day soaking up ${highlight} and finish with a relaxing evening.`;
    } else {
      headline = `Day ${dayNumber}: ${highlight}`;
      if (style === 'Adventure trip') {
        details = `Make it adventurous with ${highlight} plus an exciting local experience.`;
      } else if (style === 'Relaxing vacation') {
        details = `Take it easy with ${highlight}, local food, and plenty of leisure time.`;
      } else if (style === 'Business travel') {
        details = `Visit ${highlight} with an efficient schedule around your meetings.`;
      } else if (style === 'Family getaway') {
        details = `Enjoy ${highlight} with easy family-friendly activities nearby.`;
      } else {
        details = `Explore ${highlight} and enjoy the city's best atmosphere.`;
      }
    }

    plan.push({ headline, details });
  }
  return plan;
}

function initIndexPage() {
  if (!getCurrentUserEmail()) {
    window.location.href = 'login.html';
    return;
  }

  const greetingElement = document.getElementById('user-greeting');
  const userName = getCurrentUserName();
  if (greetingElement && userName) {
    greetingElement.textContent = `Hi ${userName}!`;
  }

  const form = document.getElementById('trip-form');
  if (!form) return;

  const departPreview = document.getElementById('depart-preview');
  const returnPreview = document.getElementById('return-preview');
  const departInput = document.getElementById('depart-date');
  const returnInput = document.getElementById('return-date');
  const destinationInput = document.getElementById('destination');
  const mapPreview = document.getElementById('map-preview');

  departInput.addEventListener('input', autoFormatDateInput);
  returnInput.addEventListener('input', autoFormatDateInput);
  departInput.addEventListener('blur', () => updateDatePreview('depart-date', departPreview));
  returnInput.addEventListener('blur', () => updateDatePreview('return-date', returnPreview));
  destinationInput.addEventListener('input', () => renderMapPreview(destinationInput.value.trim(), mapPreview));
  updateDatePreview('depart-date', departPreview);
  updateDatePreview('return-date', returnPreview);
  renderMapPreview(destinationInput.value.trim(), mapPreview);

  form.addEventListener('submit', event => {
    event.preventDefault();

    const startCity = document.getElementById('start-city').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const departDate = document.getElementById('depart-date').value;
    const returnDate = document.getElementById('return-date').value;
    const style = document.getElementById('travel-style').value;
    const notes = document.getElementById('notes').value.trim();
    const totalBudget = parseFloat(document.getElementById('total-budget').value) || 0;
    const dailyBudget = parseFloat(document.getElementById('daily-budget').value) || 0;

    updateDatePreview('depart-date', departPreview);
    updateDatePreview('return-date', returnPreview);

    if (!parseDateDMY(departDate) || !parseDateDMY(returnDate)) {
      alert('Please enter both dates as dd/mm/yyyy.');
      return;
    }

    const duration = getDuration(departDate, returnDate);
    const styleLabel = document.querySelector('#travel-style option:checked').textContent;
    const budgetText = totalBudget > 0 ? formatCurrency(totalBudget) : 'Estimate not set';
    const dailyText = dailyBudget > 0 ? `${formatCurrency(dailyBudget)} / day` : 'No daily estimate';

    const tripData = {
      startCity,
      destination,
      departDate,
      returnDate,
      duration,
      travelStyle: styleLabel,
      notes,
      totalBudget,
      dailyBudget,
      budgetText,
      dailyText,
      cityDetails: cityInfos[destination] || null
    };

    const tripDataJson = JSON.stringify(tripData);
    sessionStorage.setItem('tripPlannerDraft', tripDataJson);
    localStorage.setItem('tripPlannerDraft', tripDataJson);
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
      addTripToUser(currentUserEmail, tripData);
    }
    window.location.href = 'itinerary.html';
  });
}

function initItineraryPage() {
  if (!getCurrentUserEmail()) {
    window.location.href = 'login.html';
    return;
  }

  const tripData = JSON.parse(sessionStorage.getItem('tripPlannerDraft') || localStorage.getItem('tripPlannerDraft') || 'null');
  const tripSummary = document.getElementById('trip-summary');
  if (!tripSummary) return;

  const dailyPlan = document.getElementById('daily-plan');
  const cityDetails = document.getElementById('city-details');
  const itineraryMap = document.getElementById('itinerary-map');
  const backButton = document.getElementById('back-button');
  const heroTitle = document.getElementById('hero-title');
  const heroCopy = document.getElementById('hero-copy');
  const tripStats = document.getElementById('trip-stats');

  if (!tripData) {
    heroTitle.textContent = 'No itinerary found';
    heroCopy.textContent = 'Create a trip plan first to see your route, highlights, and daily activities.';
    tripStats.innerHTML = '';
    tripSummary.innerHTML = `<div class="card"><strong>No itinerary found</strong><p>Go back and create a trip plan first.</p></div>`;
    dailyPlan.innerHTML = '';
    cityDetails.innerHTML = '';
    backButton.textContent = 'Back to planner';
    backButton.addEventListener('click', () => window.location.href = 'index.html');
    return;
  }

  const startInfo = cityInfos[tripData.startCity] || null;
  const destinationInfo = cityInfos[tripData.destination] || null;
  const distanceKm = calculateDistanceKm(tripData.startCity, tripData.destination);
  const distanceText = distanceKm !== null ? `${distanceKm.toLocaleString()} km` : 'Distance unavailable';
  const destinationImageUrl = getCityImageUrl(tripData.destination);

  heroTitle.textContent = `Your trip to ${tripData.destination}`;
  heroCopy.textContent = destinationInfo
    ? destinationInfo.description
    : `Your itinerary includes top local attractions and city guidance for ${tripData.destination}.`;

  tripStats.innerHTML = `
    ${createStat('Destination', tripData.destination)}
    ${createStat('Distance', distanceText)}
    ${createStat('Trip days', tripData.duration)}
    ${createStat('Travel style', tripData.travelStyle)}
    ${createStat('Budget', tripData.budgetText)}
  `;

  tripSummary.innerHTML = `
    <div class="card">
      <strong>${tripData.startCity} → ${tripData.destination}</strong>
      <p><strong>Dates:</strong> ${tripData.departDate} – ${tripData.returnDate}</p>
      <p><strong>Duration:</strong> ${tripData.duration} day${tripData.duration === 1 ? '' : 's'}</p>
      <p><strong>Travel style:</strong> ${tripData.travelStyle}</p>
      <p><strong>Budget:</strong> ${tripData.budgetText} ${tripData.dailyText ? `(${tripData.dailyText})` : ''}</p>
      <p><strong>Notes:</strong> ${tripData.notes || 'No special notes added.'}</p>
    </div>
  `;

  if (itineraryMap) {
    const mapQuery = tripData.destination;
    itineraryMap.innerHTML = `
      <iframe class="map-frame" src="${getMapEmbedUrl(mapQuery)}" title="Map of ${tripData.destination}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
  }

  const planHighlights = destinationInfo ? destinationInfo.highlights : ['Discover the city'];
  const dayPlan = buildDayPlan(planHighlights, tripData.duration, tripData.travelStyle);
  dailyPlan.innerHTML = `
    <div class="card">
      <strong>Suggested daily experience</strong>
      <div class="daily-list">
        ${dayPlan.map(item => `
          <div class="daily-item">
            <h3>${item.headline}</h3>
            <p>${item.details}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  cityDetails.innerHTML = `
    ${startInfo ? `
      <div class="city-card">
        <div class="city-card-body">
          <h3>${tripData.startCity} guide</h3>
          <p>${startInfo.description}</p>
          <p class="section-title">Must-visit places:</p>
          <ul>${startInfo.highlights.map(place => `<li>${place}</li>`).join('')}</ul>
        </div>
      </div>
    ` : ''}

    <div class="city-card city-details-card">
      <div class="city-card-body">
        <h3>${tripData.destination} guide</h3>
        <p>${destinationInfo ? destinationInfo.description : 'This city is not listed in the built-in guide, but you can still explore local favorites and top sights.'}</p>
        ${destinationInfo ? `<p class="section-title">Must-visit places:</p><ul>${destinationInfo.highlights.map(place => `<li>${place}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="city-card-image">
        ${destinationImageUrl ? `<img src="${destinationImageUrl}" alt="${tripData.destination} preview image" />` : `<div class="city-card-placeholder">Image unavailable for ${tripData.destination}</div>`}
      </div>
    </div>
  `;

  backButton.addEventListener('click', () => window.location.href = 'index.html');
}

function setupPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.input);
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Hide' : 'Show';
      button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });
}

function initLoginPage() {
  setupPasswordToggles();
  const userForm = document.getElementById('user-login-form');
  const adminForm = document.getElementById('admin-login-form');

  if (userForm) {
    userForm.addEventListener('submit', event => {
      event.preventDefault();
      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const passwordInput = document.getElementById('user-password');

      const name = nameInput.value.trim() || emailInput.value.split('@')[0];
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      const existing = findUser(email);
      if (existing && existing.password !== password) {
        alert('Incorrect password for this user.');
        return;
      }

      const userRecord = existing || {
        name,
        email,
        password,
        trips: [],
        createdAt: new Date().toISOString()
      };

      if (!existing) {
        userRecord.name = name;
      }

      saveUser(userRecord);
      setCurrentUserEmail(userRecord.email);
      window.location.href = 'index.html';
    });
  }

  if (adminForm) {
    if (isAdminLoggedIn()) {
      window.location.href = 'admin.html';
      return;
    }

    adminForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('admin-email').value.trim().toLowerCase();
      const password = document.getElementById('admin-password').value;

      if (!email || !password) {
        alert('Please enter the master admin ID and password.');
        return;
      }

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setAdminSession();
        window.location.href = 'admin.html';
      } else {
        alert('Invalid admin credentials. Use the master admin ID and password.');
      }
    });
  }
}

function initAdminPage() {
  const userList = document.getElementById('user-list');
  if (!userList) return;

  if (!isAdminLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  let users = getStoredUsers();
  const searchInput = document.getElementById('admin-search');
  const refreshButton = document.getElementById('refresh-admin');
  const resetButton = document.getElementById('reset-search');
  const userCountEl = document.getElementById('admin-user-count');
  const tripCountEl = document.getElementById('admin-trip-count');
  const newestUserEl = document.getElementById('admin-recent-user');
  const topTravelerEl = document.getElementById('admin-top-traveler');

  const refreshUsers = () => {
    users = getStoredUsers();
    if (!Array.isArray(users)) users = [];
  };

  const getTopTraveler = list => {
    const top = list.reduce((best, user) => {
      const trips = user.trips?.length || 0;
      return trips > (best.trips || 0) ? { name: user.name || user.email, trips } : best;
    }, { name: '—', trips: 0 });
    return top.trips > 0 ? `${top.name} (${top.trips})` : '—';
  };

  const renderUserList = list => {
    if (list.length === 0) {
      userList.innerHTML = '<div class="card"><strong>No registered users found.</strong><p>Try a different search term or reset the filter.</p></div>';
      return;
    }

    userList.innerHTML = list.map(user => {
      const tripsHtml = user.trips && user.trips.length > 0
        ? `<div class="admin-trips">${user.trips.map((trip, index) => `
            <div class="card admin-trip-card">
              <strong>${trip.startCity} → ${trip.destination}</strong>
              <p>${trip.departDate} - ${trip.returnDate} (${trip.duration} day${trip.duration === 1 ? '' : 's'})</p>
              <div class="card-actions">
                <button type="button" class="button-secondary delete-trip" data-email="${encodeURIComponent(user.email)}" data-index="${index}">Delete trip</button>
              </div>
            </div>
          `).join('')}</div>`
        : '<p>No saved trips yet.</p>';

      return `
        <div class="card admin-user-card">
          <div class="admin-user-meta">
            <strong>${user.name || user.email}</strong>
            <p>${user.email}</p>
            <p>Registered: ${formatDate(user.createdAt)}</p>
            <p><strong>${user.trips?.length || 0}</strong> trip${(user.trips?.length || 0) === 1 ? '' : 's'}</p>
          </div>
          ${tripsHtml}
          <div class="card-actions">
            <button type="button" class="button-secondary delete-user" data-email="${encodeURIComponent(user.email)}">Delete user</button>
          </div>
        </div>
      `;
    }).join('');
  };

  const updateStats = filteredUsers => {
    const filteredCount = filteredUsers.length;
    const filteredTrips = filteredUsers.reduce((sum, user) => sum + (user.trips?.length || 0), 0);
    const filteredNewest = filteredUsers.length ? filteredUsers[filteredUsers.length - 1].name || filteredUsers[filteredUsers.length - 1].email : '—';
    const filteredTopTraveler = getTopTraveler(filteredUsers);

    if (userCountEl) userCountEl.textContent = filteredCount;
    if (tripCountEl) tripCountEl.textContent = filteredTrips;
    if (newestUserEl) newestUserEl.textContent = filteredNewest;
    if (topTravelerEl) topTravelerEl.textContent = filteredTopTraveler;
  };

  const filterUsers = () => {
    const query = searchInput?.value.trim().toLowerCase() || '';
    const filtered = query
      ? users.filter(user => {
          const name = (user.name || '').toLowerCase();
          const email = (user.email || '').toLowerCase();
          return name.includes(query) || email.includes(query);
        })
      : users;

    renderUserList(filtered);
    updateStats(filtered);
  };

  const deleteUser = email => {
    const decodedEmail = decodeURIComponent(email || '');
    if (!decodedEmail || !confirm(`Delete ${decodedEmail} and all saved trips?`)) return;

    const currentUserEmail = getCurrentUserEmail();
    const isCurrentUserDeleted = currentUserEmail && currentUserEmail.toLowerCase() === decodedEmail.toLowerCase();

    users = users.filter(user => user.email.toLowerCase() !== decodedEmail.toLowerCase());
    saveStoredUsers(users);

    if (isCurrentUserDeleted && !isAdminLoggedIn()) {
      logoutCurrentUser();
      window.location.href = 'login.html';
      return;
    }

    filterUsers();
  };

  const deleteTrip = (email, tripIndex) => {
    const decodedEmail = decodeURIComponent(email || '');
    const user = users.find(u => u.email.toLowerCase() === decodedEmail.toLowerCase());
    if (!user || !Array.isArray(user.trips) || tripIndex < 0 || tripIndex >= user.trips.length) return;
    if (!confirm(`Delete this trip for ${decodedEmail}?`)) return;

    user.trips.splice(tripIndex, 1);
    saveUser(user);
    filterUsers();
  };

  userList.addEventListener('click', event => {
    const deleteUserButton = event.target.closest('.delete-user');
    const deleteTripButton = event.target.closest('.delete-trip');

    if (deleteUserButton) {
      deleteUser(deleteUserButton.dataset.email);
      return;
    }

    if (deleteTripButton) {
      deleteTrip(deleteTripButton.dataset.email, Number(deleteTripButton.dataset.index));
      return;
    }
  });

  if (searchInput) {
    searchInput.placeholder = 'Search by name or email';
    searchInput.addEventListener('input', filterUsers);
  }

  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      refreshUsers();
      filterUsers();
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      refreshUsers();
      filterUsers();
    });
  }

  renderUserList(users);
  updateStats(users);

  const logoutButton = document.getElementById('logout-admin');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      clearAdminSession();
      window.location.href = 'login.html';
    });
  }

  const adminNav = document.querySelector('.admin-nav');
  const adminPage = document.querySelector('.admin-page');
  const adminBackdrop = document.getElementById('admin-controls-backdrop');
  const adminClose = document.getElementById('admin-controls-close');

  const closeAdminControls = () => {
    adminPage?.classList.remove('show-admin-controls');
  };

  if (adminNav && adminPage) {
    adminNav.addEventListener('click', event => {
      const target = event.target.closest('a');
      if (!target) return;

      if (target.getAttribute('href') === '#admin-controls') {
        event.preventDefault();
        adminPage.classList.add('show-admin-controls');
      }
    });
  }

  if (adminBackdrop) {
    adminBackdrop.addEventListener('click', closeAdminControls);
  }

  if (adminClose) {
    adminClose.addEventListener('click', closeAdminControls);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('trip-form')) {
    initIndexPage();
  }
  if (document.getElementById('trip-summary')) {
    initItineraryPage();
  }
  if (document.getElementById('user-login-form') || document.getElementById('admin-login-form')) {
    initLoginPage();
  }
  if (document.getElementById('user-list')) {
    initAdminPage();
  }
});
