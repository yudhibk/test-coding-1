import React, { useEffect } from "react";
import '../styles/profile.css'
import LocaleContext, { LocaleListTexts } from "../contexts/LocaleContext";
import { showFormattedDate } from "../utils";
import PropTypes from 'prop-types';
import SystemLoading from "../components/SystemLoading";
import { useNavigate } from "react-router-dom";

class HomePageClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SystemLoading loadingMode={this.props.loadingMode} />
        <h2 className="text-center names-body">Hello, {this.props.dataUser.fullname}</h2>
      </>
    );
  }
}

function HomePage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.checkIsLogout(navigate);
  }, [navigate]);

  const { locale } = React.useContext( LocaleContext );
  return <HomePageClass {...props} locale={locale} />
}

// HomePageClass.propTypes = {
//   locale: PropTypes.string.isRequired,
//   tokenAccount: PropTypes.string,
//   onLoading: PropTypes.func.isRequired,
//   loadingMode: PropTypes.bool.isRequired,
//   checkIsLogout: PropTypes.func.isRequired,
//   setupUserLogin: PropTypes.func.isRequired,
//   setupAllNotes: PropTypes.func.isRequired,
//   archiveNotesData: PropTypes.array,
// };

// HomePage.propTypes = {
//   tokenAccount: PropTypes.string,
//   onLoading: PropTypes.func.isRequired,
//   loadingMode: PropTypes.bool.isRequired,
//   checkIsLogout: PropTypes.func.isRequired,
//   setupUserLogin: PropTypes.func.isRequired,
//   setupAllNotes: PropTypes.func.isRequired,
//   archiveNotesData: PropTypes.array,
// };

export default HomePage;