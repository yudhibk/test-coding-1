import React, { useEffect } from 'react';
import LocaleContext, { LocaleListTexts } from "../contexts/LocaleContext";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import SystemLoading from '../components/SystemLoading';
import PropTypes from 'prop-types';

class RegisterPageClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
    this.onNicknameChangeHandler = this.onNicknameChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onConfirmPasswordChangeHandler = this.onConfirmPasswordChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }
  
  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onNicknameChangeHandler(event) {
    this.setState(() => {
      return {
        username: event.target.value,
      };
    });
  }

  onNameChangeHandler(event) {
    this.setState(() => {
      return {
        fullname: event.target.value,
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

  onConfirmPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        confirmPassword: event.target.value,
      };
    });
  }

  async onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.onLoading(true);
    if (this.state.password === this.state.confirmPassword) {
      try {
        const sendJson = this.state;
        delete sendJson.confirmPassword;
        const fetchData = await fetch(`${this.props.baseUrlApi}/auth/signup`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams(sendJson)
        });
        const response = await fetchData.json();
        if (response) {
          alert(response.message);
          if (response.status === 'success' || response.statusCode === 200) {
            this.props.navigate('/login');
          }
        } else {
          alert('Error, Silahkan coba beberapa saat lagi!');
        }
      } catch (error) {
        console.error(error, `'Fetch Gagal!'`)
      }
    } else {
      alert('Password konfirmasi salah! Silahkan cek kembali!');
    }
    this.props.onLoading(false);
  }

  render() {
    return (
      <>
        <SystemLoading loadingMode={this.props.loadingMode} />
        <div className='register-container'>
          <form onSubmit={this.onSubmitEventHandler}>

            <h2 className='text-xl'>{LocaleListTexts[this.props.locale].InfoRegister}</h2>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputName}</label>
            <input type='text' name='text' className='input-kolom input-name text-2xl' onChange={this.onNameChangeHandler}/>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputNickname}</label>
            <input type='text' name='text' className='input-kolom input-name text-2xl' onChange={this.onNicknameChangeHandler}/>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputEmail}</label>
            <input type='email' name='email' className='input-kolom input-email text-2xl' onChange={this.onEmailChangeHandler}/>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputPassword}</label>
            <input type='password' name='password' className='input-kolom input-password text-2xl' onChange={this.onPasswordChangeHandler}/>

            <label className='d-block text-2xl'>{LocaleListTexts[this.props.locale].InputConfirmPassword}</label>
            <input type='password' name='password' className='input-kolom input-password text-2xl' onChange={this.onConfirmPasswordChangeHandler}/>

            <button type='submit' className='btn-register text-2xl' onClick={this.onSubmitEventHandler}>{LocaleListTexts[this.props.locale].BtnRegister}</button>
            <small className='d-block'>
              <span>{LocaleListTexts[this.props.locale].InfoLinkRegister}</span> <Link to="/login" className='link-login'>{LocaleListTexts[this.props.locale].LinkRegister}</Link>
            </small>

          </form>
        </div>
      </>
    );
  }
}

function RegisterPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.checkIsLogin(navigate);
  }, [navigate]);

  const { locale } = React.useContext( LocaleContext );
  return <RegisterPageClass {...props} locale={locale} navigate={navigate} />
}

RegisterPageClass.propTypes = {
  navigate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  tokenAccount: PropTypes.string,
  onLoading: PropTypes.func.isRequired,
  loadingMode: PropTypes.bool.isRequired,
  checkIsLogin: PropTypes.func.isRequired,
};

RegisterPage.propTypes = {
  tokenAccount: PropTypes.string,
  onLoading: PropTypes.func.isRequired,
  loadingMode: PropTypes.bool.isRequired,
  checkIsLogin: PropTypes.func.isRequired,
};

export default RegisterPage;