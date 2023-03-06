
// const jwt = require('jsonwebtoken');
// const MOCK_JWT_SECRET = 'secret_string';

// const mockCreateToken = (_id) => {
//     return jwt.sign({ _id }, JWT_SECRET, { expiresIn: '3d' });
// }

async function mockFetchHomeownerSignUp(url) {
    switch (url) {
        case '/api/user/signup':
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ name: 'Name', email: 'Email', userType: 'Homeowner' })
            });
        default: {
            throw new Error(`Unhandled URL: ${url}`)
        }
    }
}

module.exports = { mockFetchHomeownerSignUp }