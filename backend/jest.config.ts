module.exports = {
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.+(ts)', '**/?(*.)+(test).+(ts)'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testEnvironment: 'node',
};
