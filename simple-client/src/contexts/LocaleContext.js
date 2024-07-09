import React from 'react';
     
const LocaleContext = React.createContext();

const LocaleProvider = LocaleContext.Provider;
const LocaleConsumer = LocaleContext.Consumer;
const LocaleListTexts = [];
LocaleListTexts['id'] = {
  TitleLogout: 'Test Zenmirai',
  InfoRegister: 'Silahkan isi form untuk pendaftaran akun.',
  InfoLinkRegister: 'Sudah punya akun?',
  LinkRegister: 'Masuk Disini',
  BtnRegister: 'PENDAFTARAN',
  InfoLogin: 'Silahkan isi form masuk.',
  InfoLinkLogin: "Tidak punya akun?",
  LinkLogin: 'Daftar Disini',
  BtnLogin: 'MASUK',
  InputName: 'Nama',
  InputNickname: 'Panggilan',
  InputEmail: 'Email',
  InputPassword: 'Kata Sandi',
  InputConfirmPassword: 'Konfirmasi Sandi',
  BtnLogout: 'Keluar',
  CodeDate: 'id-ID',
  PageEmpty: 'Data tidak ditemukan! 😮‍💨'
};
LocaleListTexts['en'] = {
  TitleLogout: 'Test Zenmirai',
  InfoRegister: 'Fill the form to register account.',
  InfoLinkRegister: 'Already have an account?',
  LinkRegister: 'Login Here',
  BtnRegister: 'REGISTER',
  InfoLogin: 'Login to use app, please.',
  InfoLinkLogin: "Don't have an account?",
  LinkLogin: 'Register Here',
  BtnLogin: 'LOGIN',
  InputName: 'Fullname',
  InputNickname: 'Nickname',
  InputEmail: 'Email',
  InputPassword: 'Password',
  InputConfirmPassword: 'Confirm Password',
  BtnLogout: 'Logout',
  CodeDate: 'en-US',
  PageEmpty: 'Not Found! 😮‍💨'
};

export {
  LocaleProvider,
  LocaleConsumer,
  LocaleListTexts
}
export default LocaleContext;