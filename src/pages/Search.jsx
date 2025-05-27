import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchArtists, searchAlbums, searchTracks } from '../api/lastfm';
import SearchBar from '../components/SearchBar';
import TabSwitcher from '../components/TabSwitcher';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import TrackCard from '../components/TrackCard';
import TrackCardSearch from '../components/TrackCardSearch'
import ArtistCardSearch from '../components/ArtistCardSearch'
import '../styles/search.css';

/**
 * Компонент страницы поиска музыки.
 * Отображает результаты поиска артистов, альбомов и треков по запросу из URL.
 * Поддерживает переключение вкладок между "top results", "artists", "albums", "tracks".
 *
 * @component
 * @returns {JSX.Element} UI для страницы поиска
 */
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [activeTab, setActiveTab] = useState('top results');

  /**
   * Запрос к API при изменении поискового запроса.
   * Использует Promise.all для параллельных запросов артистов, альбомов и треков.
   * Обновляет состояния с результатами поиска.
   */
  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const [artistsData, albumsData, tracksData] = await Promise.all([
          searchArtists(query),
          searchAlbums(query),
          searchTracks(query)
        ]);
        setArtists(artistsData);
        setAlbums(albumsData);
        setTracks(tracksData);
      };
      fetchData();
    }
  }, [query]);

  return (
    <>
      <div className="search-header">
        <div className="search-container">
          <h1 className="search-head">Search results for "{query}"</h1>
          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <main className="main-content">
        <div className="search-container">
          <SearchBar initialQuery={query} />

          {(activeTab === 'top results' || activeTab === 'artists') && (
            <section className="results-section">
              <h2 className="result-head">Artists</h2>
              <div className="card-grid">
                {artists.length > 0 ? (
                  artists.map(artist => (
                    <ArtistCardSearch key={artist.name} artist={artist} />
                  ))
                ) : (
                  <p className="no-results-message">Artists not found</p>
                )}
              </div>
              <a href="#" class="more">More artists ></a>
            </section>
          )}

          {(activeTab === 'top results' || activeTab === 'albums') && (
            <section className="results-section">
              <h2 className="result-head">Albums</h2>
              <div className="card-grid">
                {albums.length > 0 ? (
                  albums.map(album => (
                    <AlbumCard key={`${album.name}-${album.artist}`} album={album} />
                  ))
                ) : (
                  <p className="no-results-message">Albums not found</p>
                )}
              </div>
              <a href="#" class="more">More albums ></a>
            </section>
          )}

          {(activeTab === 'top results' || activeTab === 'tracks') && (
            <section className="results-section">
              <h2 className="result-head">Tracks</h2>
              <div className="track-list">
                {tracks.length > 0 ? (
                  tracks.map(track => (
                    <TrackCardSearch key={`${track.name}-${track.artist}`} track={track} />
                  ))
                ) : (
                  <p className="no-results-message">Tracks not found</p>
                )}
              </div>
              <a href="#" class="more">More tracks ></a>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Search;