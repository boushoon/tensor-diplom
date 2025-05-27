import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

/**
 * Главный компонент приложения.
 * Отвечает за настройку маршрутизации с помощью React Router.
 * Использует Layout как общий контейнер, в котором по умолчанию показывается Home,
 * и отдельно обрабатывается маршрут для страницы поиска.
 *
 * @component
 * @returns {JSX.Element} Корневой компонент приложения с маршрутизацией
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
           <Route path="search" element={<Search />} />
           <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
    </Router>
  );
}

export default App;