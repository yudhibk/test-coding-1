import React from "react";
import LocaleContext, { LocaleListTexts } from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";
import { BsTranslate } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles/navbar.css';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

class NavbarAtasClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let logoutMenu = null;
    const linkLogoutMenu = <li>
      <button type="button" className="borderless" onClick={() => {this.props.logoutApps(this.props.navigate)}}><IoMdLogOut /></button>
    </li>;
    if (this.props.checkStorage()) {
      const getAccountToken = sessionStorage.getItem(this.props.keyStorage);
      if (getAccountToken) {
        logoutMenu = linkLogoutMenu;
      }
    } else {
      if (this.props.tokenAccount) {
        logoutMenu = linkLogoutMenu;
      }
    }

    return (
      <nav className="nav-atas text-3xl">
        <h1>{LocaleListTexts[this.props.locale].TitleLogout}</h1>
        <ul>
          <li>
            <button type="button" className="borderless" onClick={this.props.setLocale} >
              <BsTranslate />
            </button>
          </li>
          <li>
            <button type="button" className="borderless" onClick={this.props.setTheme} >{this.props.theme === 'light' ? <FaMoon /> : <FaSun />}</button>
          </li>
          {logoutMenu}
        </ul>
      </nav>
    );
  }
}

function NavbarAtas(props) {
  const navigate = useNavigate();
  const { locale, setLocale } = React.useContext(LocaleContext);
  const { theme, setTheme } = React.useContext(ThemeContext);

  return <NavbarAtasClass {...props} locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} navigate={navigate} />;
}

NavbarAtas.propTypes = {
  checkStorage: PropTypes.func.isRequired,
  keyStorage: PropTypes.string.isRequired,
  tokenAccount: PropTypes.string,
  logoutApps: PropTypes.func.isRequired,
};
NavbarAtasClass.propTypes = {
  checkStorage: PropTypes.func.isRequired,
  keyStorage: PropTypes.string.isRequired,
  tokenAccount: PropTypes.string,
  logoutApps: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  setLocale:  PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default NavbarAtas;