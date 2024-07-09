import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import NavbarAtas from './components/NavbarAtas'
import HomePage from './pages/HomePage';

class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenAccount: null,
      keyStorage: 'KEY_FOR_TESTS_YUDHI',
      dataUser: {},
      loadingMode: false,
      baseUrlApi: 'http://localhost:3232',
    }
    this.onLoading = this.onLoading.bind(this);
    this.logoutApps = this.logoutApps.bind(this);
    this.setupUser = this.setupUser.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.checkIsLogout = this.checkIsLogout.bind(this);
    
  }

  async onLoading(stateLoading) {
    this.setState((prevState) => {
      return {
        loadingMode: stateLoading
      }
    });
  }

  checkStorage() {
    return typeof(Storage) !== undefined;
  }

  logoutApps(navigate) {
    if (this.checkStorage()) {
      sessionStorage.removeItem(this.state.keyStorage);
    }
    this.setState((prevState) => {
      return {
        tokenAccount: null,
        dataUser: {}
      }
    }, () => {
      navigate('/login');
    });
  }

  async setupUser(token, callback = () => {}) {
    sessionStorage.setItem(this.state.keyStorage, token);
    const dataUser = await this.checkUser(token);
    this.setState((prevState) => {
      return {
        tokenAccount: token,
        dataUser: {
          fullname: dataUser.fullname,
          username: dataUser.username,
          email: dataUser.email,
        }
      }
    }, () => {
      callback();
    });
  }

  async checkUser(token) {
    this.onLoading(true);
    const fetchData = await fetch(`${this.state.baseUrlApi}/auth/profile`, {
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + token
      }
    });
    const response = await fetchData.json();
    this.onLoading(false);
    return response;
  }

  checkIsLogout(navigate) {
    const getAccountToken = this.state.tokenAccount ?? this.checkStorage() ? sessionStorage.getItem(this.state.keyStorage) : null;
    if (!getAccountToken || Object.keys(this.state.dataUser).length === 0) {
      navigate('/login');
    } else {
      this.setupUser(getAccountToken, () => {});
    }
  }

  async checkIsLogin(navigate) {
    const getAccountToken = this.state.tokenAccount ?? this.checkStorage() ? sessionStorage.getItem(this.state.keyStorage) : null;
    if (getAccountToken) {
      await this.setupUser(getAccountToken, () => {
        navigate('/');
      });
    }
  }

  // async checkActiveNotes() {
  //   this.onLoading(true);
  //   const response = await fetch('https://notes-api.dicoding.dev/v1/notes', {
  //     method: 'GET',
  //     headers: {
  //       "Authorization": 'Bearer ' + this.state.tokenAccount
  //     }
  //   });
  //   const responseJson = await response.json();
  //   this.onLoading(false);
  //   if (responseJson.status === 'success') {
  //     return responseJson.data;
  //   } else {
  //     return [];
  //   }
  // }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.props.theme);
  }

  async componentDidUpdate(prevProps, prevState) {
    document.documentElement.setAttribute('data-theme', this.props.theme);
  }
 
  render() {
    return (
      <>
        <header>
          <NavbarAtas
            title={'Aplikasi Catatan'}
            tokenAccount={this.state.tokenAccount}
            checkStorage={this.checkStorage}
            keyStorage={this.state.keyStorage}
            logoutApps={this.logoutApps}
          />
        </header>
        <main>
          <Routes>
            {["/", "/home"].map((path, index) => 
              <Route path={path} key={index} element={<HomePage
                tokenAccount={this.state.tokenAccount}
                onLoading={this.onLoading}
                loadingMode={this.state.loadingMode}
                checkIsLogout={this.checkIsLogout}
                dataUser={this.state.dataUser}
              />} />
            )}
            <Route path="/login" element={<LoginPage
              tokenAccount={this.state.tokenAccount}
              onLoading={this.onLoading}
              loadingMode={this.state.loadingMode}
              checkIsLogin={this.checkIsLogin}
              baseUrlApi={this.state.baseUrlApi}
              setupUser={this.setupUser}
            />} />
            <Route path="/register" element={<RegisterPage
              tokenAccount={this.state.tokenAccount}
              onLoading={this.onLoading}
              loadingMode={this.state.loadingMode}
              checkIsLogin={this.checkIsLogin}
              baseUrlApi={this.state.baseUrlApi}
            />} />
          </Routes>
        </main>
        <footer>
          <span>©️ Yudhi | Test-Zenmirai</span>
        </footer>
      </>
    );
  }

}

function App(props) {
  const navigate = useNavigate;
  const [theme, funTheme] = React.useState('light');
  const [locale, funLocale] = React.useState('id');

  const setTheme = () => {
    funTheme(prevState => {
      return prevState === 'light' ? 'dark' : 'light';
    });
  }

  const setLocale = () => {
    funLocale(prevState => {
      return prevState === 'id' ? 'en' : 'id';
    });
  }

  return (
    <ThemeProvider value={{theme, setTheme}}>
      <LocaleProvider value={{locale, setLocale}}>
        <AppClass {...props} navigate={navigate} theme={theme} locale={locale} />
      </LocaleProvider>
    </ThemeProvider>
  );
}

AppClass.propTypes = {
  navigate: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};
 
export default App;