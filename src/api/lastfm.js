const API_KEY = '25426500cbd993d0f08b55b5702293a1';
const API_BASE = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Универсальная функция для запроса к Last.fm API.
 * Формирует URL с параметрами и выполняет fetch.
 *
 * @param {string} method - Название метода API, например 'chart.gettopartists'.
 * @param {Object} [params={}] - Дополнительные параметры запроса.
 * @returns {Promise<Object>} - Ответ API в формате JSON.
 * @throws {Error} - Бросает ошибку при неуспешном HTTP ответе.
 */
async function fetchFromApi(method, params = {}) {
  const url = new URL(API_BASE);
  Object.entries({ method, api_key: API_KEY, format: 'json', ...params })
    .forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, String(value));
    });

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
}

/**
 * Получить топ исполнителей с тегами.
 *
 * @param {number} [limit=12] - Количество артистов для получения.
 * @returns {Promise<Array<Object>>} - Массив артистов с добавленным полем tags (строка тегов).
 */
export async function getHotArtists(limit = 12) {
  const data = await fetchFromApi('chart.gettopartists', { limit });

  const artistsWithTags = await Promise.all(
      data.artists?.artist.map(async artist => {
        const tagsArray = await getArtistTags(artist.name, 3);
        // Преобразуем массив тегов в строку, берём только имена тегов
        const tagsString = tagsArray.map(tag => tag.name).join(' · ');
        return {
          ...artist,
          tags: tagsString,
        };
      })
    );

    return artistsWithTags;
}

/**
 * Получить топ треков с тегами.
 *
 * @param {number} [limit=18] - Количество треков для получения.
 * @returns {Promise<Array<Object>>} - Массив треков с добавленным полем tags (строка тегов).
 */
export async function getPopularTracks(limit = 18) {
  const data = await fetchFromApi('chart.gettoptracks', { limit });
  const tracks = data.tracks?.track || [];

    const tracksWithTags = await Promise.all(
      tracks.map(async (track) => {
        // Получаем теги трека
        const tagsArray = await getTrackTags(track.artist.name, track.name, 3);
        // Формируем строку тегов, например "rock - pop - indie"
        const tagsString = tagsArray.map(tag => tag.name).join(' - ');
        return {
          ...track,
          tags: tagsString,
        };
      })
    );

    return tracksWithTags;
}

/**
 * Поиск исполнителей по имени.
 *
 * @param {string} query - Строка для поиска.
 * @param {number} [limit=14] - Максимальное количество результатов.
 * @returns {Promise<Array<Object>>} - Массив найденных артистов.
 */
export async function searchArtists(query, limit = 14) {
  const data = await fetchFromApi('artist.search', { artist: query, limit });
  return data.results?.artistmatches?.artist || [];
}

/**
 * Поиск альбомов по названию.
 *
 * @param {string} query - Строка для поиска.
 * @param {number} [limit=14] - Максимальное количество результатов.
 * @returns {Promise<Array<Object>>} - Массив найденных альбомов.
 */
export async function searchAlbums(query, limit = 14) {
  const data = await fetchFromApi('album.search', { album: query, limit });
  return data.results?.albummatches?.album || [];
}

/**
 * Поиск треков по названию.
 *
 * @param {string} query - Строка для поиска.
 * @param {number} [limit=10] - Максимальное количество результатов.
 * @returns {Promise<Array<Object>>} - Массив найденных треков.
 */
export async function searchTracks(query, limit = 10) {
  const data = await fetchFromApi('track.search', { track: query, limit });
  return data.results?.trackmatches?.track || [];
}

/**
 * Получить популярные теги для артиста.
 *
 * @param {string} artist - Имя исполнителя.
 * @param {number} [limit=3] - Максимальное количество тегов.
 * @returns {Promise<Array<{name: string, url: string}>>} - Массив тегов с именами и URL.
 */
export const getArtistTags = async (artist, limit = 3) => {
  try {
    const data = await fetchFromApi('artist.gettoptags', { artist });
    const tags = data.toptags?.tag || [];
    return tags.filter(t => t.url).slice(0, limit);
  } catch {
    return [];
  }
};

/**
 * Получить популярные теги для трека.
 *
 * @param {string} artist - Имя исполнителя.
 * @param {string} track - Название трека.
 * @param {number} [limit=3] - Максимальное количество тегов.
 * @returns {Promise<Array<{name: string, url: string}>>} - Массив тегов с именами и URL.
 */
export const getTrackTags = async (artist, track, limit = 3) => {
  try {
    const data = await fetchFromApi('track.gettoptags', { artist, track });
    const tags = data.toptags?.tag || [];
    return tags.filter(t => t.url).slice(0, limit);
  } catch {
    return [];
  }
};