/**
 * Компонент TrackCardSearch отображает карточку трека с обложкой,
 * названием, именем артиста и кнопкой "лайк".
 *
 * Используются fallback-значения для изображения, названия и артиста,
 * чтобы избежать пустых элементов в интерфейсе.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.track - Объект трека с информацией.
 * @param {string} [props.track.name] - Название трека.
 * @param {Object|string} [props.track.artist] - Исполнитель трека, может быть объектом с полем name или строкой.
 * @param {Array} [props.track.image] - Массив изображений трека разных размеров.
 *
 * @returns {JSX.Element} JSX элемент с карточкой трека.
 */
function TrackCardSearch({ track }) {
  // fallback для картинки
  const imageSrc =
    track.image?.[1]?.['#text'] ? track.image?.[1]?.['#text'] :
    'https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg';

  // fallback для названия и артиста
  const trackName = track.name || 'Unknown Track';
  const artistName = track.artist?.name || track.artist || 'Unknown Artist';

  return (
    <div className="track-card">
      <img
        src={imageSrc}
        alt={`Cover for ${trackName}`}
        className="track-image"
        loading="lazy"
      />
      <div className="track-info">
        <a href="#" className="track-title" title={trackName}>
          {trackName}
        </a>
        <span className="track-artist">{artistName}</span>
      </div>
      <div className="track-actions">
        <button className="like-button" aria-label="Like track">
          ❤
        </button>
      </div>
    </div>
  );
}

export default TrackCardSearch;