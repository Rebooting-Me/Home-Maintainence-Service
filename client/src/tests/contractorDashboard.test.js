/**
 * Contains tests for the landing page.
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Dashboard from '../components/dashboard/contractor/Dashboard/Dashboard';
import { AuthContextProvider } from '../context/AuthContext';
import {
    CONTRACTOR_USER_TYPE,
} from '../constants/testingConstants'

const contractorUser = {
    name: 'Contractor Name',
    userType: CONTRACTOR_USER_TYPE
}

describe('The dashboard page for a contractor', function () {

    let originalFetch;

    beforeEach(() => {
        // Save global fetch
        originalFetch = global.fetch;

        // Mock global fetch
        const mockFetch = jest.fn(() => new Promise((resolve) => {
            resolve({
                ok: true, status: 200, json: () => {
                    // We need to return an empty array 
                    // for the Listings component
                    return Promise.resolve([]);
                }
            });
        }));
        global.fetch = mockFetch;

    });

    afterEach(() => {
        // Restore fetch
        global.fetch = originalFetch;
    })


    it('should contain "Your Profile" and "Homeowner Projects" in the page.', async function () {
        const testingState = {
            user: contractorUser
        };

        // We need an await/act to make sure rendering occurs as it would in a browser.
        await act(async () => {
            render(
                <AuthContextProvider testingState={testingState}>
                    <Dashboard />
                </AuthContextProvider>
            );

        })
        expect(screen.getByText('Your Profile')).toBeInTheDocument();
        expect(screen.getByText('Homeowner Projects')).toBeInTheDocument();
    });
});

