import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент SearchBar отображает строку поиска с возможностью ввода текста и кнопкой запуска поиска.
 *
 * Локальное состояние `query` хранит текущий поисковый запрос, которое инициализируется
 * значением пропса `initialQuery` (по умолчанию пустая строка).
 *
 * При нажатии кнопки поиска или клавиши Enter происходит навигация на страницу `/search`
 * с параметром `search` в URL, содержащим закодированный поисковый запрос.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.initialQuery=''] - Начальное значение поискового запроса.
 * @returns {JSX.Element} JSX-элемент строки поиска.
 */
function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

   /**
   * Обработчик запуска поиска: если введён непустой запрос,
   * происходит переход на страницу /search с параметром запроса.
   */
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="search-button" onClick={handleSearch}>
        <img
          src="https://www.last.fm/static/images/icons/search/search_232323_16.fd4564f92909.png"
          alt="Search"
          className="search-bar-icon"
        />
      </button>
    </div>
  );
}

export default SearchBar;