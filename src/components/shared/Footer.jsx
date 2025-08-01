import React from 'react';
import packageInfo from '../../../package.json';

const Footer = () => {
  return (
    <footer className="py-1 fixed-bottom bg-custom">
      <div className="container px-4 px-lg-5">
        <p className="m-0 text-center text-white">
          {' '}
          Copyright © - Designed and Created by: <strong>Carlos Mur</strong>
        </p>
        <p className="m-0 text-center text-white">
          <small>
            <i>Version: {packageInfo.version}</i>
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
