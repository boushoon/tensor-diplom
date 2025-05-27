/**
 * Компонент AlbumCard отображает карточку альбома с изображением, названием и исполнителем.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.album - Объект альбома.
 * @param {string} props.album.name - Название альбома.
 * @param {Object|String} [props.album.artist] - Исполнитель альбома. Может быть строкой или объектом с полем `name`.
 * @param {Array<Object>} [props.album.image] - Массив изображений с разными размерами.
 * Каждый объект изображения содержит поле `#text` с URL изображения.
 *
 * @returns {JSX.Element} JSX-элемент с карточкой альбома.
 */
function AlbumCard({ album }) {
  return (
    <div className="card">
        <img
          className="result-image"
          src={album.image?.[3]?.['#text'] ? album.image?.[3]?.['#text'] : 'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg'}
          alt={album.name}
        />
      <div className="album-info">
          <a href="#" className="album-name">{album.name || 'Unknown Album'}</a>
          <div className="album-artist">{album.artist?.name || album.artist || 'Unknown Artist'}</div>
      </div>
    </div>
  );
}

export default AlbumCard;