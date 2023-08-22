module.exports = {
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    coverageReporters: ['cobertura'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
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
