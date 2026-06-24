import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Header from './Header';

test('renders the navigation links', () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Inicio')).toBeInTheDocument();
  expect(screen.getByText('Añadir')).toBeInTheDocument();
});
