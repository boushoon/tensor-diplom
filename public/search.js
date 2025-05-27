const API_BASE = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = '25426500cbd993d0f08b55b5702293a1';

/**
 * Выполняет запрос к API Last.fm с заданным методом и параметрами.
 * Формирует URL с параметрами и ключом API, возвращает JSON-ответ.
 * @param {string} method - Имя метода API, например 'artist.search'
 * @param {Object} [params={}] - Дополнительные параметры запроса
 * @returns {Promise<Object>} - Ответ API в формате JSON
 * @throws {Error} При ошибке HTTP-запроса
 */
async function fetchFromApi(method, params = {}) {
  // Создаём URL с параметрами
  const url = new URL(API_BASE);
  Object.entries({ method, api_key: API_KEY, format: 'json', ...params })
    .forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, String(value));
    });

  // Делаем запрос
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
}

// --- Функции поиска по категориям ---

/**
 * Поиск артистов по запросу
 * @param {string} query
 * @returns {Promise<Array>} массив артистов
 */
async function searchArtists(query) {
  const data = await fetchFromApi('artist.search', { artist: query, limit: 14 });
  // Возвращаем массив артистов из ответа API
  return data.results?.artistmatches?.artist || [];
}

/**
 * Поиск альбомов по запросу
 * @param {string} query
 * @returns {Promise<Array>} массив альбомов
 */
async function searchAlbums(query) {
  const data = await fetchFromApi('album.search', { album: query, limit: 14 });
  return data.results?.albummatches?.album || [];
}

/**
 * Поиск треков по запросу
 * @param {string} query
 * @returns {Promise<Array>} массив треков
 */
async function searchTracks(query) {
  const data = await fetchFromApi('track.search', { track: query, limit: 10 });
  return data.results?.trackmatches?.track || [];
}

// --- Функции отрисовки результатов ---

/**
 * Отрисовка артистов в секции Artists
 * @param {Array} artists
 */
function renderArtists(artists) {
  const container = document.querySelector('.results-section:nth-of-type(1) .card-grid');
  container.innerHTML = ''; // очистка контейнера

  if (!artists.length) {
      const message = document.createElement('p');
      message.className = 'no-results-message';
      message.textContent = 'Artists not found';
      container.appendChild(message);
      return;
  }

  artists.forEach(artist => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'result-image';
    // Last.fm возвращает несколько размеров картинок, берем средний
    img.src = artist.image?.[3]?.['#text'] ? artist.image?.[3]?.['#text'] : "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.jpg";
    img.alt = artist.name;
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'artist-info';

    const nameLink = document.createElement('a');
    nameLink.href = '#';
    nameLink.className = 'artist-name';
    nameLink.textContent = artist.name;
    info.appendChild(nameLink);

    const listeners = document.createElement('p');
    listeners.className = 'artist-listeners';
    // Кол-во слушателей может отсутствовать, тогда показываем "-"
    listeners.textContent = artist.listeners ? `${artist.listeners} listeners` : '- listeners';
    info.appendChild(listeners);

    card.appendChild(info);
    container.appendChild(card);
  });
}

/**
 * Отрисовка альбомов в секции Albums
 * @param {Array} albums
 */
function renderAlbums(albums) {
  const container = document.querySelector('.results-section:nth-of-type(2) .card-grid');
  container.innerHTML = '';

  if (!albums.length) {
      const message = document.createElement('p');
      message.className = 'no-results-message';
      message.textContent = 'Albums not found';
      container.appendChild(message);
      return;
  }

  albums.forEach(album => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'result-image';
    img.src = album.image?.[3]?.['#text'] ? album.image?.[3]?.['#text'] : "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.jpg";
    img.alt = album.name;
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'album-info';

    const albumName = document.createElement('a');
    albumName.href = '#';
    albumName.className = 'album-name';
    albumName.textContent = album.name;
    info.appendChild(albumName);

    const artistName = document.createElement('p');
    artistName.className = 'album-artist';
    artistName.textContent = 'By ' + album.artist;
    info.appendChild(artistName);

    card.appendChild(info);
    container.appendChild(card);
  });
}

/**
 * Отрисовка треков в секции Tracks
 * @param {Array} tracks
 */
function renderTracks(tracks) {
  const container = document.querySelector('.results-section:nth-of-type(3) .track-list');
  container.innerHTML = '';

  if (!tracks.length) {
      const message = document.createElement('p');
      message.className = 'no-results-message';
      message.textContent = 'Tracks not found';
      container.appendChild(message);
      return;
  }

  tracks.forEach(track => {
    const card = document.createElement('div');
    card.className = 'track-card';

    const img = document.createElement('img');
    img.className = 'track-image';
    img.src = track.image?.[0]?.['#text'] || "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.jpg";
    img.alt = track.name;
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'track-info';

    const trackTitle = document.createElement('a');
    trackTitle.href = '#';
    trackTitle.className = 'track-title';
    trackTitle.textContent = track.name;
    info.appendChild(trackTitle);

    const trackArtist = document.createElement('span');
    trackArtist.className = 'track-artist';
    trackArtist.textContent = track.artist;
    info.appendChild(trackArtist);

    card.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'track-actions';

    const likeButton = document.createElement('button');
    likeButton.className = 'like-button';
    likeButton.setAttribute('aria-label', 'Like track');
    likeButton.textContent = '❤';
    actions.appendChild(likeButton);

    card.appendChild(actions);

    container.appendChild(card);
  });
}

// --- Управление вкладками ---

/**
 * Показываем нужную секцию и активируем вкладку
 * @param {string} tabName - одно из: 'top', 'artists', 'albums', 'tracks'
 */
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tabs .tab');
  const sections = document.querySelectorAll('.results-section');

  tabs.forEach(tab => {
    if (tab.textContent.toLowerCase().includes(tabName)) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Показываем соответствующую секцию, прячем остальные
  sections.forEach((section, index) => {
    switch (tabName) {
      case 'top':
        section.style.display = 'block'; // На самом деле можно показывать сразу все или кастомный топ-результат
        break;
      case 'artists':
        section.style.display = index === 0 ? 'block' : 'none';
        break;
      case 'albums':
        section.style.display = index === 1 ? 'block' : 'none';
        break;
      case 'tracks':
        section.style.display = index === 2 ? 'block' : 'none';
        break;
    }
  });
}

/**
 * Основная функция поиска.
 * Выполняет параллельный поиск по артистам, альбомам и трекам,
 * обновляет URL и заголовок, рендерит результаты и переключает вкладку.
 * @param {string} query - Строка поиска
 */
async function performSearch(query) {
  if (!query) return;
  console.log("hello");

  const url = new URL(window.location);
  url.searchParams.set('search', query);
  window.history.replaceState(null, '', url);

  // Обновляем заголовок с текстом поиска
  const resultsHeader = document.querySelector('.search-head');
  resultsHeader.textContent = `Search results for '${query}'`;

  // Запускаем параллельно все три поиска
  const [artists, albums, tracks] = await Promise.all([
    searchArtists(query),
    searchAlbums(query),
    searchTracks(query),
  ]);

  // Отрисовываем результаты
  renderArtists(artists);
  renderAlbums(albums);
  renderTracks(tracks);

  // Переключаемся на вкладку Top Results или Artists по умолчанию
  switchTab('top');
}

// --- Инициализация обработчиков ---

// Поиск по нажатию Enter или кнопки поиска
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    performSearch(searchInput.value.trim());
  }
});

searchButton.addEventListener('click', () => {
  performSearch(searchInput.value.trim());
});

// Вкладки
const tabs = document.querySelectorAll('.tabs .tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.textContent.toLowerCase();
    switchTab(tabName);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  // Читаем параметры URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get('search') || ''; // если параметр есть — используем, иначе пусто

  performSearch(query);
});
