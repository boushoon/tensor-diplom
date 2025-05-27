/**
 * Компонент ArtistCard отображает карточку исполнителя с аватаром, именем и тегами.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.artist - Объект исполнителя.
 * @param {string} props.artist.name - Имя исполнителя.
 * @param {Array<Object>} [props.artist.image] - Массив изображений исполнителя разных размеров.
 * Каждый объект изображения содержит поле `#text` с URL картинки.
 * @param {string|string[]} [props.artist.tags] - Теги, связанные с исполнителем.
 *
 * @returns {JSX.Element} JSX-элемент с карточкой исполнителя.
 */
function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <div className="artist-avatar">
        <img
          className="artist-avatar-img-card"
          src={artist.image?.[2]?.['#text'] || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.jpg'}
          alt={artist.name}
        />
      </div>
      <div className="artist-name-card">{artist.name}</div>
      <div className="artist-tags">{artist.tags || 'No tags'}</div>
    </div>
  );
}

export default ArtistCard;