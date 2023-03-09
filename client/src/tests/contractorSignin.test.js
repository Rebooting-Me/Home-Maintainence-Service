/**
 * Contains tests for the sign in page.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from '../App';
import { AuthContextProvider } from '../context/AuthContext';

import {
    HOMEOWNER_USER_TYPE,
    signinEmailInputTestId, signinPasswordInputTestId, signinButtonTestId
} from '../constants/testingConstants'

const contractorName = 'Contractor name';
const contractorEmail = 'ContractorEmail@email.com';
const contractorPassword = 'ContractorPassword15!';
const contractorToken = 'contractorToken';

describe('Attempting to sign in as a homeowner', function () {

    let originalFetch;

    beforeEach(() => {
        // Save global fetch
        originalFetch = global.fetch;

        // Mock global fetch
        const mockFetch = jest.fn(() => new Promise((resolve) => {
            resolve({
                ok: true, status: 200, json: () => {
                    return Promise.resolve({
                        name: contractorName,
                        userType: HOMEOWNER_USER_TYPE,
                        token: contractorToken
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


    it('should sign in a contractor user.', async function () {
        // Do userEvent setup before rendering any components.
        const user = userEvent.setup();
        render(
            <React.StrictMode>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </React.StrictMode>);

        // Click on a sign in link to navigate to the Sign in page.
        const signInElement = screen.getByRole('link', { name: 'Sign In' });
        await user.click(signInElement);

        // Fill in the sign-in form fields
        const emailInput = screen.getByTestId(signinEmailInputTestId);
        const passwordInput = screen.getByTestId(signinPasswordInputTestId);
        await user.type(emailInput, contractorEmail);
        await user.type(passwordInput, contractorPassword);

        // Check that the form was filled out
        expect(screen.getByTestId(signinEmailInputTestId)).toHaveValue(contractorEmail);
        expect(screen.getByTestId(signinPasswordInputTestId)).toHaveValue(contractorPassword);

        // Attempt to sign in
        const signinButton = screen.getByTestId(signinButtonTestId);
        expect(signinButton).toBeEnabled();
        await user.click(signinButton);
    });
});
