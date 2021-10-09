import { capitalLettersPattern, emailPattern, namePattern, smallLettersPattern } from "./patterns";


describe('Validation patterns', () => {

  describe('emailPattern', () => {
    it('should be true when valid email', () => {
      [
        'a@a.com',
        'a.a@a.com',
        'a+a@a.b.co',
      ].forEach((text) => {
        expect(emailPattern.test(text)).toBeTrue()
      });
    });

    it('should be false when invalid email', () => {
      [
        '',
        ' ',
        '@a.com',
        'a@.com',
        'a@a.c',
        'a@a',
        'a-a.co',
        'some text',
        'some text',
        'a @a.com',
        'a@ a.com',
        'a@a. com',
        '.a@a.com',
      ].forEach((text) => {
        expect(emailPattern.test(text)).toBeFalse()
      });
    });
  });

  describe('namePattern', () => {
    it('should be false for unacceptable names', () => {
      [
        'A',
        '',
        'aa',
        'A1',
        'A-',
        '-=+',
        'saM',
      ].forEach((text) => {
        expect(namePattern.test(text)).toBeFalse()
      });
    });

    it('should be true for acceptable names', () => {
      [
        'Ann',
        'Ra',
      ].forEach((text) => {
        expect(namePattern.test(text)).toBeTrue()
      });
    })
  });

  describe('smallLettersPattern', () => {
    it('should be true when text contains small letters', () => {
      [
        'a - .',
        'asdWdfrW',
        'a+a@a.b.co',
      ].forEach((text) => {
        expect(smallLettersPattern.test(text)).toBeTrue()
      });
    });

    it('should be false when text does not contain small letters', () => {
      [
        '',
        ' ',
        'A',
        '1234',
        'A@$?',
      ].forEach((text) => {
        expect(smallLettersPattern.test(text)).toBeFalse()
      });
    });
  });

  describe('capitalLettersPattern', () => {
    it('should be true when text contains capital letters', () => {
      [
        'A - .',
        'asdWdfrW',
        '+a@a.b.Co',
      ].forEach((text) => {
        expect(capitalLettersPattern.test(text)).toBeTrue()
      });
    });

    it('should be false when text does not contain capital letters', () => {
      [
        '',
        ' ',
        'a',
        '1234',
        'a@$?',
      ].forEach((text) => {
        expect(capitalLettersPattern.test(text)).toBeFalse()
      });
    });
  });
});
