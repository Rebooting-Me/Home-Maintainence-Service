/**
 * Contains tests for the sign up page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'


import jwt from 'jsonwebtoken';
const MOCK_JWT_SECRET = 'mock_secret';
const createToken = (_id) => {
    return jwt.sign({ _id }, MOCK_JWT_SECRET, { expiresIn: '3d' });
}
const HOMEOWNER_USER_TYPE = 'HOMEOWNER';


import App from '../App';
import { AuthContextProvider } from '../context/AuthContext';

import {
    signupNameInputTestId, signupEmailInputTestId, signupPasswordInputTestId,
    signupCheckboxTestId, signupContractorButtonTestId
} from '../constants/testingConstants'


describe('Attempting to sign up as a contractor', function () {

    let originalFetch;

    beforeEach(() => {
        // Save global fetch
        originalFetch = global.fetch;

        // Mock global fetch
        const mockFetch = jest.fn(() => new Promise((resolve) => {
            resolve({
                ok: true, status: 200, json: () => {
                    return Promise.resolve({
                        name: 'User name',
                        userType: HOMEOWNER_USER_TYPE,
                        token: createToken('dummy_token_id')
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


    it('should sign up a contractor user.', async function () {
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

        // Check that the sign up as a contractor button is disabled
        expect(screen.getByTestId(signupContractorButtonTestId)).toBeDisabled();

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

        // The contractor button should now be enabled
        const contractorButton = screen.getByTestId(signupContractorButtonTestId);
        expect(contractorButton).toBeEnabled();

        // Attempt to sign up
        await user.click(contractorButton);
        // User should be redirected to their dashboard
        // expect(screen.getByText('Homeowner Projects')).toBeInTheDocument();
    });
});

