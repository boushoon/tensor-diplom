import { useEffect, useState } from 'react';
import { getHotArtists, getPopularTracks } from '../api/lastfm';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';
import '../styles/main.css';

/**
 * Главная страница с отображением популярных артистов и треков.
 * Загружает данные с Last.fm при монтировании компонента.
 *
 * @component
 * @returns {JSX.Element}
 */
function Home() {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistsTags, setArtistsTags] = useState([])
  const [tracksTags, setTracksTags] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [artistsData, tracksData] = await Promise.all([
        getHotArtists(),
        getPopularTracks()
      ]);

      setArtists(artistsData);
      setTracks(tracksData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header-page">Music</div>

      <div className="header-block">Hot right now</div>
      <div className="artists-line">
        {artists.map(artist => (
          <ArtistCard key={artist.name} artist={artist} />
        ))}
      </div>

      <div className="header-block">Popular tracks</div>
      <div className="tracks-line">
        {tracks.map(track => (
          <TrackCard key={`${track.name}-${track.artist}`} track={track} />
        ))}
      </div>
    </div>
  );
}

export default Home;