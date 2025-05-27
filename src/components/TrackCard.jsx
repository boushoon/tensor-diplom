/**
 * Компонент TrackCard отображает карточку трека с обложкой, названием,
 * именем исполнителя и тегами.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.track - Объект с информацией о треке.
 * @param {string} props.track.name - Название трека.
 * @param {Object|string} [props.track.artist] - Исполнитель трека. Может быть строкой или объектом с полем name.
 * @param {Array} [props.track.image] - Массив объектов изображений разного размера.
 * @param {Array|string} [props.track.tags] - Теги трека. Если массив, нужно форматировать отдельно.
 *
 * @returns {JSX.Element} JSX-элемент карточки трека.
 */
function TrackCard({ track }) {
  return (
    <div className="track-card">
      <div className="track-cover">
        <img
          className="track-cover-img"
          src={track.image?.[1]?.['#text'] || 'https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg'}
          alt={track.name}
        />
      </div>
      <div className="track-info-card">
        <div className="track-title-card">{track.name || 'Unknown Track'}</div>
        <div className="track-artist-card">{track.artist?.name || track.artist || 'Unknown Artist'}</div>
        <div className="track-tags">{track.tags || 'no tags'}</div>
      </div>
    </div>
  );
}

export default TrackCard;