/**
 * Contains tests for the sign up page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from '../App';
import { AuthContextProvider } from '../context/AuthContext';

import {
    HOMEOWNER_USER_TYPE,
    signupNameInputTestId, signupEmailInputTestId, signupPasswordInputTestId,
    signupCheckboxTestId, signupHomeownerButtonTestId
} from '../constants/testingConstants'

const homeownerName = 'Homeowner name';
const homeownerEmail = 'HomeownerEmail@email.com';
const homeownerPassword = 'HomeownerPassword15!';
const homeownerToken = 'homeownerToken';

describe('Attempting to sign up as a homeowner', function () {

    let originalFetch;

    beforeEach(() => {
        // Save global fetch
        originalFetch = global.fetch;

        // Mock global fetch
        const mockFetch = jest.fn(() => new Promise((resolve) => {
            resolve({
                ok: true, status: 200, json: () => {
                    return Promise.resolve({
                        name: homeownerName,
                        userType: HOMEOWNER_USER_TYPE,
                        token: homeownerToken
                    });
                }
            });
        }));
        global.fetch = mockFetch;

    });

    afterEach(() => {
        // Restore fetch
        global.fetch = originalFetch;
    })


    it('should sign up a homeowner user.', async function () {
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
        const nameInput = screen.getByTestId(signupNameInputTestId);
        const emailInput = screen.getByTestId(signupEmailInputTestId);
        const passwordInput = screen.getByTestId(signupPasswordInputTestId);
        await user.type(nameInput, homeownerName);
        await user.type(emailInput, homeownerEmail);
        await user.type(passwordInput, homeownerPassword);

        // Check that the form was filled out
        expect(screen.getByTestId(signupNameInputTestId)).toHaveValue(homeownerName);
        expect(screen.getByTestId(signupEmailInputTestId)).toHaveValue(homeownerEmail);
        expect(screen.getByTestId(signupPasswordInputTestId)).toHaveValue(homeownerPassword);

        // Mark the checkbox
        const checkbox = screen.getByTestId(signupCheckboxTestId);
        await user.click(checkbox);
        expect(screen.getByTestId(signupCheckboxTestId)).toBeChecked();

        // The homeowner button should now be enabled
        const homeownerButton = screen.getByTestId(signupHomeownerButtonTestId);
        expect(homeownerButton).toBeEnabled();

        // Attempt to sign up
        await user.click(homeownerButton);

        // User should be redirected to their dashboard
        // expect(screen.getByText('Your Projects')).toBeInTheDocument();
    });
});
