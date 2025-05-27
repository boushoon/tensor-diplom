import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

/**
 * Точка входа в React-приложение.
 * Создает корень React на элементе с id 'root' и рендерит в него главный компонент <App />.
 * Оборачивает приложение в <React.StrictMode> для дополнительной проверки и предупреждений в разработке.
 *
 * @module index
 */

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);