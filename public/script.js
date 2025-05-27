const API_KEY = '25426500cbd993d0f08b55b5702293a1';
const API_BASE = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Выполняет запрос к API Last.fm с заданным методом и параметрами.
 * @param {string} method - Имя метода API (например, 'chart.gettopartists').
 * @param {Object<string, string|number>} [params={}] - Дополнительные параметры запроса.
 * @returns {Promise<any>} - Обещание с распарсенным JSON-ответом.
 * @throws {Error} - Если HTTP-статус не успешный.
 */
const fetchFromApi = async (method, params = {}) => {
  // Создаём URL с базой
  const url = new URL(API_BASE);

  // Формируем параметры запроса: метод, ключ, формат и дополнительные параметры
  const query = { method, api_key: API_KEY, format: 'json', ...params };
  Object.entries(query)
    .filter(([_, v]) => v != null) // фильтруем null/undefined
    .forEach(([k, v]) => url.searchParams.set(k, String(v)));

  // Выполняем fetch-запрос
  const res = await fetch(url);

  // Проверяем успешность ответа
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  // Возвращаем распарсенный JSON
  return res.json();
};

/**
 * Получает список топ-артистов.
 * @param {number} [limit=12] - Максимальное количество артистов.
 * @returns {Promise<Artist[]>} - Массив артистов.
 */
const getHotArtists = async (limit = 12) => {
  const data = await fetchFromApi('chart.gettopartists', { limit });
  // Возвращаем массив артистов или пустой массив, если данных нет
  return data.artists?.artist || [];
};

/**
 * Получает список топ-треков.
 * @param {number} [limit=18] - Максимальное количество треков.
 * @returns {Promise<Track[]>} - Массив треков.
 */
const getPopularTracks = async (limit = 18) => {
  const data = await fetchFromApi('chart.gettoptracks', { limit });
  return data.tracks?.track || [];
};

/**
 * Получает теги для артиста.
 * @param {string} artist - Имя артиста.
 * @param {number} [limit=3] - Сколько тегов вернуть.
 * @returns {Promise<Tag[]>} - Массив тегов.
 */
const getArtistTags = async (artist, limit = 3) => {
  try {
    const data = await fetchFromApi('artist.gettoptags', { artist });
    const tags = data.toptags?.tag || [];
    // Фильтруем по наличию url, ограничиваем по лимиту
    return tags.filter(t => t.url).slice(0, limit);
  } catch {
    // В случае ошибки возвращаем пустой массив
    return [];
  }
};

/**
 * Получает теги для трека.
 * @param {string} artist - Имя артиста.
 * @param {string} track - Название трека.
 * @param {number} [limit=3] - Сколько тегов вернуть.
 * @returns {Promise<Tag[]>} - Массив тегов.
 */
const getTrackTags = async (artist, track, limit = 3) => {
  try {
    const data = await fetchFromApi('track.gettoptags', { artist, track });
    const tags = data.toptags?.tag || [];
    return tags.filter(t => t.url).slice(0, limit);
  } catch {
    return [];
  }
};

/**
 * Отрисовывает список артистов в элемент с id 'artists-line'.
 * @param {number} [limit=12] - Сколько артистов загрузить.
 * @returns {Promise<void>}
 */
const renderArtists = async (limit = 12) => {
  const container = document.getElementById('artists-line');
  container.innerHTML = ''; // Очищаем контейнер перед вставкой

  // Получаем топ артистов
  const artists = await getHotArtists(limit);

  // Формируем карточки артистов
  for (const artist of artists) {
    // Получаем теги артиста (не дожидаемся рендеринга, ждем перед вставкой)
    const tags = await getArtistTags(artist.name, 3);
    const tagText = tags.map(t => t.name).join(' · ');

    // Создаем карточку артиста
    const card = document.createElement('div');
    card.className = 'artist-card';

    // Создаем аватар с картинкой (если есть)
    const avatar = document.createElement('div');
    avatar.className = 'artist-avatar';
    if (artist.image && artist.image.length) {
      const img = document.createElement('img');
      img.className = 'artist-avatar-img';
      // Берём изображение среднего размера (2-й индекс), если нет — пустая строка
      img.src = artist.image[2]?.['#text'] || '';
      img.alt = artist.name;
      avatar.appendChild(img);
    }

    // Имя артиста
    const name = document.createElement('div');
    name.className = 'artist-name';
    name.textContent = artist.name;

    // Теги артиста
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'artist-tags';
    tagsDiv.textContent = tagText;

    // Собираем карточку
    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(tagsDiv);

    // Добавляем в контейнер
    container.appendChild(card);
  }
};

/**
 * Отрисовывает список треков в элемент с id 'tracks-line'.
 * @param {number} [limit=18] - Сколько треков загрузить.
 * @returns {Promise<void>}
 */
const renderTracks = async (limit = 18) => {
  const container = document.getElementById('tracks-line');
  container.innerHTML = ''; // Очищаем контейнер

  // Получаем топ треков
  const tracks = await getPopularTracks(limit);

  for (const track of tracks) {
    // Получаем теги трека
    const tags = await getTrackTags(track.artist.name, track.name, 3);
    const tagText = tags.map(t => t.name).join(' · ');

    // Создаем элемент трека
    const item = document.createElement('div');
    item.className = 'track-item';

    // Создаем обложку трека
    const cover = document.createElement('div');
    cover.className = 'track-cover';

    // Вставляем изображение (если есть)
    if (track.image && track.image.length) {
      const img = document.createElement('img');
      img.className = 'track-cover-img';
      // Берём маленькое изображение (1-й индекс)
      img.src = track.image[1]?.['#text'] || '';
      img.alt = track.name;
      cover.appendChild(img);
    }

    // Информация о треке
    const info = document.createElement('div');
    info.className = 'track-info';

    // Название трека
    const title = document.createElement('div');
    title.className = 'track-title';
    title.textContent = track.name;

    // Имя артиста
    const artist = document.createElement('div');
    artist.className = 'track-artist';
    artist.textContent = track.artist.name;

    // Теги трека
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'track-tags';
    tagsDiv.textContent = tagText;

    // Собираем инфо
    info.appendChild(title);
    info.appendChild(artist);
    info.appendChild(tagsDiv);

    // Собираем элемент трека
    item.appendChild(cover);
    item.appendChild(info);

    // Вставляем в контейнер
    container.appendChild(item);
  }
};

// При загрузке страницы запускаем отрисовку артистов и треков с обработкой ошибок
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Параллельно запускаем загрузку артистов и треков для скорости
    await Promise.all([renderArtists(), renderTracks()]);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});
