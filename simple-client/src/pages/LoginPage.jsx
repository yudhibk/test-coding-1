import React, { useEffect } from 'react';
import LocaleContext, { LocaleListTexts } from "../contexts/LocaleContext";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import SystemLoading from '../components/SystemLoading';
import PropTypes from 'prop-types';

class LoginPageClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }
  
  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  async onSubmitEventHandler(event) {
    event.preventDefault();
    try {
      this.props.onLoading(true);
      const sendJson = this.state;
      const fetchData = await fetch(`${this.props.baseUrlApi}/auth/signin`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams(this.state)
      });
      const response = await fetchData.json();
      if (response) {
        alert(response.message ?? 'Berhasil Masuk!');
        if (response.status === 'success' || response.statusCode === 200) {
          this.props.setupUser(response.access_token, () => {
            this.props.navigate('/');
          });
        }
      } else {
        alert(response.message ?? 'Bermasalah, Silahkan coba beberapa saat lagi!');
      }
    } catch (error) {
      console.error(error, `'Fetch Gagal!'`)
    }
    this.props.onLoading(false);
  }

  render() {
    return (
      <>
        <SystemLoading loadingMode={this.props.loadingMode} />
        <div className='login-container'>
          <form onSubmit={this.onSubmitEventHandler}>

            <h2 className='text-xl'>{LocaleListTexts[this.props.locale].InfoLogin}</h2>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputEmail}</label>
            <input type='email' name='email' className='input-kolom input-email text-2xl' onChange={this.onEmailChangeHandler}/>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputPassword}</label>
            <input type='password' name='password' className='input-kolom input-password text-2xl' onChange={this.onPasswordChangeHandler}/>
            
            <button type='submit' className='btn-login text-2xl'>{LocaleListTexts[this.props.locale].BtnLogin}</button>
            <small className='d-block'>
              <span>{LocaleListTexts[this.props.locale].InfoLinkLogin} </span> 
              <Link to="/register" className='link-register'>{LocaleListTexts[this.props.locale].LinkLogin}</Link>
            </small>

          </form>
        </div>
      </>
    );
  }
}

function LoginPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.checkIsLogin(navigate);
  }, [navigate]);

  const { locale } = React.useContext( LocaleContext );
  return <LoginPageClass {...props} locale={locale} navigate={navigate} />
}

// LoginPageClass.propTypes = {
//   navigate: PropTypes.func.isRequired,
//   locale: PropTypes.string.isRequired,
//   tokenAccount: PropTypes.string,
//   onLoading: PropTypes.func.isRequired,
//   loadingMode: PropTypes.bool.isRequired,
//   checkIsLogin: PropTypes.func.isRequired,
//   loginApps: PropTypes.func.isRequired,
// };

// LoginPage.propTypes = {
//   tokenAccount: PropTypes.string,
//   onLoading: PropTypes.func.isRequired,
//   loadingMode: PropTypes.bool.isRequired,
//   checkIsLogin: PropTypes.func.isRequired,
//   loginApps: PropTypes.func.isRequired,
// };

export default LoginPage;