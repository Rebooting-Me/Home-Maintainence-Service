/**
 * Dummy test file demonstrating how to use Jest for testing.
 */
const dummySum = require('./dummy');

test('adds 1 + 2 to equal 3', () => {
    expect(dummySum(1, 2)).toBe(3);
});
