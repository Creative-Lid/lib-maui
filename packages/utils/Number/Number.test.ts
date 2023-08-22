import {
    convertToBytes,
    formatBytes,
    getFixedTwoDecimals,
    parseFloat,
} from './Number';

describe('convertToBytes()', () => {
    it('should return a number from MB into bytes', () => {
        const output = convertToBytes(5);
        expect(output).toBe(5242880);
    });
});

describe('formatBytes()', () => {
    it('should return a number', () => {
        const output = formatBytes(5);
        expect(output).toBe(5);
    });

    it('should return a number with MB', () => {
        const output = formatBytes(5, true);
        expect(output).toBe('5 MB');
    });
});

describe('getFixedTwoDecimals()', () => {
    it('should return a raw input if the input is not convertible to a number', () => {
        let output = getFixedTwoDecimals('abc');
        expect(output).toBe('abc');

        output = getFixedTwoDecimals('abc');
        expect(output).toBe('abc');
    });

    it('should return a string if it is convertible to a number', () => {
        const output = getFixedTwoDecimals(123);
        expect(typeof output).toBe('string');
    });

    it('should return a string that contain a number if it is convertible to a number', () => {
        const output = getFixedTwoDecimals(123);
        expect(output).toBe('123');
    });

    it('should return the input with two decimals if it is convertible to a number', () => {
        const output = getFixedTwoDecimals(123.45);
        expect(output).toBe('123.45');
    });

    it('should skip all zeros in decimals from the end', () => {
        let output = getFixedTwoDecimals(123.00);
        expect(output).toBe('123');

        output = getFixedTwoDecimals(123.40);
        expect(output).toBe('123.4');

        output = getFixedTwoDecimals(123.500);
        expect(output).toBe('123.5');
    });

    it('123.01000 -> "123.01"', () => {
        const output = getFixedTwoDecimals(123.01000);
        expect(output).toBe('123.01');
    });

    it('123.10001 -> "123.1"', () => {
        const output = getFixedTwoDecimals(123.10001);
        expect(output).toBe('123.1');
    });
});

describe('parseFloat()', () => {
    it('should return a number in MB with a whole number', () => {
        const output = parseFloat((Math.floor(5242880) / Math.pow(1024, 2)) * 1, 2);
        expect(output).toBe(5);
    });

    it('should return a number in MB with two decimal places', () => {
        const output = parseFloat((Math.floor(5942880) / Math.pow(1024, 2)) * 1, 2);
        expect(output).toBe(5.66);
    });
});
