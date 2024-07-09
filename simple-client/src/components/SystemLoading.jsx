import React from "react";
import '../styles/loading.css';
import { TbLoader2 } from "react-icons/tb";
import PropTypes from 'prop-types';

function SystemLoading(props) {
  return <div className={`loading-screen ${props.loadingMode ? 'active' : ''}`}>
    <div className="loading-text"><TbLoader2 className="rotating d-inline-block loader-icons" /> Loading...</div>
  </div>
}

SystemLoading.propTypes = {
  loadingMode: PropTypes.bool.isRequired,
};

export default SystemLoading;