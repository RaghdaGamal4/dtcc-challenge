export default {
    preset: 'ts-jest',
    transform: {
        // process `*.tsx` files with `ts-jest`
        "^.+\\.tsx?$": "ts-jest" ,
        "\\.[jt]sx?$": "babel-jest" 
    },
    testEnvironment:"jsdom",
    moduleNameMapper: {
        "@/(.*)$":"<rootDir>/src/$1",
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    },
    setupFilesAfterEnv:["./src/jest.setup.ts"],
    coverageDirectory:"coverage"
}