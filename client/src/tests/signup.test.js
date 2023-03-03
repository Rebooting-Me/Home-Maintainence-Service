/**
 * Contains tests for the sign up page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'


import App from '../App';
import { AuthContextProvider } from '../context/AuthContext';

import { signupNameInputTestId, signupEmailInputTestId, signupPasswordInputTestId, signupCheckboxTestId, signupHomeownerButtonTestId } from '../constants/testingConstants'


beforeEach(() => {
    fetchMock.resetMocks();
})


describe('Hitting submit for on Sign In from the landing page', function () {
    it('should sign up the user.', async function () {
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

        // Check that the sign up as a homeowner button is disabled
        expect(screen.getByTestId(signupHomeownerButtonTestId)).toBeDisabled();

        // Fill in the sign-up form fields
        const name = 'User name';
        const email = 'useremail@email.com'
        const password = 'passwordForUser135!';
        const nameInput = screen.getByTestId(signupNameInputTestId);
        const emailInput = screen.getByTestId(signupEmailInputTestId);
        const passwordInput = screen.getByTestId(signupPasswordInputTestId);
        await user.type(nameInput, name);
        await user.type(emailInput, email);
        await user.type(passwordInput, password);

        // Check that the form was filled out
        expect(screen.getByTestId(signupNameInputTestId)).toHaveValue(name);
        expect(screen.getByTestId(signupEmailInputTestId)).toHaveValue(email);
        expect(screen.getByTestId(signupPasswordInputTestId)).toHaveValue(password);

        // Mark the checkbox
        const checkbox = screen.getByTestId(signupCheckboxTestId);
        await user.click(checkbox);
        expect(screen.getByTestId(signupCheckboxTestId)).toBeChecked();

        // The homeowner button should now be enabled
        const homeownerButton = screen.getByTestId(signupHomeownerButtonTestId);
        expect(homeownerButton).toBeEnabled();

        // Attempt to sign up
        fetchMock.mockResponse(JSON.stringify({ name: 'Name', email: 'Email', userType: 'Homeowner' }));
        const res = await user.click(homeownerButton);
        expect(res.name).toBe('name');
        // expect(res.ok).toBe(true);
        // expect(res.status).toBe(200);
    });
});
