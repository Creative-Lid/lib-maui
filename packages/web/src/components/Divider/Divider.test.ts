import { calculateMargin } from './Divider';

describe('calculateMargin()', () => {
    it('should return 0rem for horizontal orientation no spacer', () => {
        const output = calculateMargin(10, false, false, 15);
        expect(output).toBe('0rem');
    });

    it('should return 0rem for horizontal orientation with spacer', () => {
        const output = calculateMargin(10, true, false, 15);
        expect(output).toBe('0rem');
    });

    it('should return default margin for vertical orientation with spacer no margin', () => {
        const output = calculateMargin(10, true, true);
        expect(output).toBe('10rem');
    });

    it('should return default margin for vertical orientation with spacer invalid margin', () => {
        const output = calculateMargin(10, true, true, '15');
        expect(output).toBe('10rem');
    });

    it('should return 0rem for margin with spacer and 0 margin', () => {
        const output = calculateMargin(10, true, true, 0);
        expect(output).toBe('0rem');
    });
});
