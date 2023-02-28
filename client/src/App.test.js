import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { AuthContextProvider } from './context/AuthContext';


test('renders learn react link', () => {
  render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>);
  const linkElement = screen.getByText('About');
  expect(linkElement).toBeInTheDocument();
});
