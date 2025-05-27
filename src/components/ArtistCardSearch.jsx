/**
 * Компонент ArtistCardSearch отображает карточку исполнителя для поиска с изображением,
 * именем исполнителя и числом слушателей.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.artist - Объект исполнителя.
 * @param {string} [props.artist.name] - Имя исполнителя.
 * @param {Array<Object>} [props.artist.image] - Массив изображений исполнителя.
 * Каждый объект изображения содержит поле `#text` с URL картинки.
 * @param {string|number} [props.artist.listeners] - Количество слушателей исполнителя.
 *
 * @returns {JSX.Element} JSX-элемент с карточкой исполнителя для поиска.
 */
function ArtistCardSearch({ artist }) {
  const imageSrc =
    artist.image?.[3]?.['#text'] ? artist.image?.[3]?.['#text'] : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.jpg';

  const artistName = artist.name || 'Unknown Artist';
  const listeners = artist.listeners ? `${artist.listeners} listeners` : '';

  return (
    <div className="card">
      <img
        src={imageSrc}
        alt={`Artist ${artistName}`}
        className="result-image"
      />
      <div className="artist-info">
        <a href="#" className="artist-name">{artistName}</a>
        <p className="artist-listeners">{listeners} listeners</p>
      </div>
    </div>
  );
}

export default ArtistCardSearch;