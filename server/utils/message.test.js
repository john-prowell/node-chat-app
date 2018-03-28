const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 36.1453333;
    var lng = -115.2778317;  
    var url = `https://www.google.com/maps?q=${lat},${lng}`;  
    var message = generateLocationMessage(from, lat, lng);
    expect(typeof(message.createdAt)).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', url);
  });
});