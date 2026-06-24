import React from 'react';
import packageInfo from '../../../package.json';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        Copyright © - Designed and Created by: <strong>Carlos Mur</strong>
      </p>
      <p>
        <small>
          <i>Version: {packageInfo.version}</i>
        </small>
      </p>
    </footer>
  );
};

export default Footer;
