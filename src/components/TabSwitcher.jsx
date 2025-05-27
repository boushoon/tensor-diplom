/**
 * Компонент TabSwitcher отображает набор вкладок (tabs),
 * позволяя выбрать активную вкладку и переключаться между ними.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.activeTab - Ключ активной вкладки (например, 'top results', 'artists' и т.д.).
 * @param {function(string): void} props.setActiveTab - Функция для установки активной вкладки.
 *
 * @returns {JSX.Element} JSX-элемент навигации с вкладками.
 */
function TabSwitcher({ activeTab, setActiveTab }) {
  const tabs = ['Top Results', 'Artists', 'Albums', 'Tracks'];

  return (
    <nav className="tabs">
      {tabs.map(tab => {
        const tabKey = tab.toLowerCase();
        return (
          <button
            key={tabKey}
            className={activeTab === tabKey ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab(tabKey)}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}

export default TabSwitcher;