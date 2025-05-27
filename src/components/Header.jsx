import { Link } from 'react-router-dom';
import '../styles/header.css'

/**
 * Компонент Header отображает верхнюю панель сайта с элементами управления плеером,
 * логотипом и навигацией по сайту.
 *
 * @component
 * @returns {JSX.Element} JSX разметка хедера с кнопками плеера, логотипом и навигацией.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="player-controls">
          <button className="control-btn">
            <img src="https://www.last.fm/static/images/playbar/previous_track.1e1b1fccec35.svg" alt="Previous" className="prev-btn" />
          </button>
          <button className="control-btn">
            <img src="https://clipart-library.com/images/5iRraekRT.png" alt="Play/Stop" className="play-btn" />
          </button>
          <button className="control-btn">
            <img src="https://www.last.fm/static/images/playbar/previous_track.1e1b1fccec35.svg" alt="Next" className="next-btn" />
          </button>
          <button className="control-btn">
            <svg className="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
              />
            </svg></button>
        </div>
      </div>

      <div className="header-center">
        <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/1200px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo-img" /></Link>
      </div>

      <div className="header-right">
        <Link to="/search" className="search-btn">
          <img src="https://www.last.fm/static/images/icons/search/search_16.9c1d552b8f55.svg" alt="Search" />
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-links-a">Home</Link>
          <a href="#" className="nav-links-a">Live</a>
          <Link to="/music" className="nav-links-a">Music</Link>
          <a href="#" className="nav-links-a">Charts</a>
          <a href="#" className="nav-links-a">Events</a>
          <a href="#" className="nav-links-a">Features</a>
        </nav>
        <div className="user-avatar"></div>
      </div>
    </header>
  );
}

export default Header;