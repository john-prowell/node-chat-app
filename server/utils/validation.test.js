const expect = require('expect');
const { isRealString } = require('./validate.js');

describe('isRealString', () => {
    it('should reject not string values', () => {
        const res = isRealString(1234);
        expect(res).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        const res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        const res = isRealString('  FOMO  ');
        expect(res).toBe(true);
    });
});