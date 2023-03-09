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
    CONTRACTOR_USER_TYPE,
    signupNameInputTestId, signupEmailInputTestId, signupPasswordInputTestId,
    signupCheckboxTestId, signupContractorButtonTestId
} from '../constants/testingConstants'

const contractorName = 'Contractor name';
const contractorEmail = 'ContractorEmail@email.com';
const contractorPassword = 'ContractorPassword15!';
const contractorToken = 'contractorToken';


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
                        name: contractorName,
                        userType: CONTRACTOR_USER_TYPE,
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
        const nameInput = screen.getByTestId(signupNameInputTestId);
        const emailInput = screen.getByTestId(signupEmailInputTestId);
        const passwordInput = screen.getByTestId(signupPasswordInputTestId);
        await user.type(nameInput, contractorName);
        await user.type(emailInput, contractorEmail);
        await user.type(passwordInput, contractorPassword);

        // Check that the form was filled out
        expect(screen.getByTestId(signupNameInputTestId)).toHaveValue(contractorName);
        expect(screen.getByTestId(signupEmailInputTestId)).toHaveValue(contractorEmail);
        expect(screen.getByTestId(signupPasswordInputTestId)).toHaveValue(contractorPassword);

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

