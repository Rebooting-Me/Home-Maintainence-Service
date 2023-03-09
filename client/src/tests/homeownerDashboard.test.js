/**
 * Contains tests for the landing page.
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Dashboard from '../components/dashboard/homeowner/Dashboard/Dashboard';
import { AuthContextProvider } from '../context/AuthContext';


const HOMEOWNER_USER_TYPE = 'Homeowner';
const homeownerUser = {
    name: 'Homeowner Name',
    userType: HOMEOWNER_USER_TYPE
}

describe('The dashboard page for a homeowner', function () {

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


    it('should contain Your Projects, Contractors and Settings in a Sidebar.', async function () {
        const testingState = {
            user: homeownerUser
        };

        // We need an await/act to make sure rendering occurs as it would in a browser.
        await act(async () => {
            render(
                <AuthContextProvider testingState={testingState}>
                    <Dashboard />
                </AuthContextProvider>
            );

        })
        expect(screen.getByText('Your Projects')).toBeInTheDocument();
        expect(screen.getByText('Contractors')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});

