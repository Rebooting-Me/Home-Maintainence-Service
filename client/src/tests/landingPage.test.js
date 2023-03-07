/**
 * Contains tests for the landing page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from '../App';
import { AuthContextProvider } from '../context/AuthContext';


describe('The landing page for a non-logged-in user', function () {
  it('should contain an About, Sign In, and Sign Up.', function () {
    render(
      <React.StrictMode>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </React.StrictMode>);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

describe('Clicking on Sign Up from the landing page', function () {
  it('should redirect the user to the Sign Up page.', async function () {
    // Do userEvent setup before rendering any components.
    const user = userEvent.setup();
    render(
      <React.StrictMode>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </React.StrictMode>);

    // Click on a sign up link to navigate to the Sign Up page.
    const signUpElement = screen.getByRole('link', { name: 'Sign up' });
    await user.click(signUpElement);

    // Check for the sign-up form
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});

describe('Clicking on Sign In from the landing page', function () {
  it('should redirect the user to the Sign In page.', async function () {
    // Do userEvent setup before rendering any components.
    const user = userEvent.setup();
    render(
      <React.StrictMode>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </React.StrictMode>);

    // Click on a sign in link to navigate to the Sign In page.
    const signInElement = screen.getByRole('link', { name: 'Sign in' });
    await user.click(signInElement);

    // Check for the sign-in form
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});
