import '../styles/footer.css'

/**
 * Компонент Footer отображает нижний колонтитул сайта с информацией о компании,
 * справочной информацией, полезными ссылками, аккаунтом пользователя, социальными сетями,
 * выбором языка, часовым поясом и юридической информацией.
 *
 * Структура футера разделена на несколько колонок с заголовками и списками ссылок,
 * а также включает секцию выбора языка и информацию о правах.
 *
 * @component
 * @returns {JSX.Element} JSX-элемент с футером сайта.
 */
function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-column">
                <div className="footer-column-header">COMPANY</div>
                <ul className="footer-column-ul">
                    <li className="footer-column-li"><a href="#" className="footer-column-a">About Last.fm</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Contact Us</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Jobs</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <div className="footer-column-header">HELP</div>
                <ul className="footer-column-ul">
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Track My Music</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Community Support</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Community Guidelines</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Help</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <div className="footer-column-header">GOODIES</div>
                <ul className="footer-column-ul">
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Download Scrobbler</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Developer API</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Free Music Downloads</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Merchandise</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <div className="footer-column-header">ACCOUNT</div>
                <ul className="footer-column-ul">
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Inbox</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Settings</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Last.fmPro</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Logout</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <div className="footer-column-header">FOLLOW US</div>
                <ul className="footer-column-ul">
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Facebook</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Twitter</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">Instagram</a></li>
                    <li className="footer-column-li"><a href="#" className="footer-column-a">YouTube</a></li>
                </ul>
            </div>
        </div>

        <div className="language-selector">
            <div className="footer-inner">
                <div className="footer-left">
                    <div className="language-inner">
                        <a href="#" className="active">English</a>
                        <a href="#" className="no-active">Deutsch</a>
                        <a href="#" className="no-active">Español</a>
                        <a href="#" className="no-active">Français</a>
                        <a href="#" className="no-active">Italiano</a>
                        <a href="#" className="no-active">日本語</a>
                        <a href="#" className="no-active">Polski</a>
                        <a href="#" className="no-active">Português</a>
                        <a href="#" className="no-active">Pyccкий</a>
                        <a href="#" className="no-active">Svenska</a>
                        <a href="#" className="no-active">Türkçe</a>
                        <a href="#" className="no-active">南美中文</a>
                    </div>

                    <a href="#" className="time-zone">
                        Time zone:
                        <strong>Europe/Moscow</strong>
                    </a>
                </div>

                <div className="footer-right">
                    <div className="audioscrobbler-text">Audioscrobbler</div>
                    <img src="https://www.last.fm/static/images/footer_logo@2x.49ca51948b0a.png" alt="Logo" className="footer-logo"/>
                </div>
            </div>
        </div>

        <div className="copyright">
            <div className="copyright-content">
                <a href="#" className="copyright-content-a">CBS Interactive</a>© 2022 Last.fm Ltd. All rights reserved
                <div className="copyright-links">
                    ·<a href="#" className="copyright-content-a">Terms of Use</a>
                    ·<a href="#" className="copyright-content-a">Privacy Policy</a>
                    ·<a href="#" className="copyright-content-a">Legal Policies</a>
                    ·<a href="#" className="copyright-content-a">Cookies Policy</a>
                    ·<a href="#" className="copyright-content-a">Do Not Sell Try Personal Information</a>
                </div>
                <div className="copyright-credits">· <a href="#" className="copyright-content-a">Jebra Vinson/CBS</a> · <a href="#" className="copyright-content-a">Last.fm Music</a></div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;