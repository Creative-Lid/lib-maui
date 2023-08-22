const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/__mocks__/',
    ],
    coverageReporters: ['cobertura'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(
            {
                '@creativelid/maui-constants/*': ['../../constants/*'],
                '@creativelid/maui-styles/*': ['../../styles/*'],
                '@creativelid/maui-web/*': ['../../web/src/*'],
                '@creativelid/maui-utils/*': ['../../utils/*'],
            },
            {
                prefix: '<rootDir>/src/',
            }
        ),
        '\\.(css|less|saas|scss)$': '<rootDir>/__mocks__/styleMock.js', // mocking out styles
        '@fontsource/palanquin-dark': '<rootDir>/__mocks__/styleMock.js',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    reporters: [
        'default',
        [
            'jest-junit',
            { outputDirectory: 'coverage', outputName: 'junit.xml' },
        ],
    ],
    silent: false,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
};
