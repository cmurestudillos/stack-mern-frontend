import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import logo from '../../assets/img/logo.svg';
import { useAppTheme } from '../../context/ThemeContext';

const Header = () => {
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useAppTheme();

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Añadir', icon: 'pi pi-plus', command: () => navigate('/crear') },
  ];

  const start = <img src={logo} alt="Logo" width="36" height="36" className="mr-3" />;
  const end = (
    <Button
      icon={isDark ? 'pi pi-sun' : 'pi pi-moon'}
      rounded
      text
      severity="secondary"
      aria-label="Cambiar tema"
      onClick={toggleDarkMode}
    />
  );

  return <Menubar model={items} start={start} end={end} className="app-menubar" />;
};

export default Header;
