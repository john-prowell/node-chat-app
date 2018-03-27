const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // call generateMessage with two values
    var from = 'Joe';
    var text = 'This is a test';
    // get response back and strore res in var
    var message = generateMessage(from, text);
    // asser createdAt is number    
    expect(typeof(message.createdAt)).toBe('number');
    // assert from match
    expect(message.from).toEqual(from);
    // assert text match
    expect(message.text).toEqual(text);
  });
});