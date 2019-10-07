module.exports = {
    roots: ['<rootDir>/__tests__'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(.*|(\\.|/)(test|spec))\\.tsx?$',
    testPathIgnorePatterns: ['tsconfig.json', 'external.d.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    modulePathIgnorePatterns: ['fixtures/*']
}
