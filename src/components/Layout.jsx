import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Компонент Layout служит основным шаблоном страницы, который содержит
 * верхний колонтитул (Header), нижний колонтитул (Footer) и пространство
 * для отображения вложенных маршрутов с помощью <Outlet /> из react-router-dom.
 *
 * @component
 * @returns {JSX.Element} Основной макет страницы с Header, Footer и контентом маршрута.
 */
function Layout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
