/**
 * capitalize.test.js
 */

 const { capitalize } = require('./capitalize.js');

 describe('Capitalize', function () {
   it('Single Word', function () {
     expect(capitalize("hello")).toEqual("Hello");
   });
 
   it('Multiple Words', function () {
     expect(capitalize("hello world")).toEqual("Hello World");
   });
 
   it('Outter Spaces', function () {
     expect(capitalize("  hello world  ")).toEqual("Hello World");
   });
 it('Inner Spaces', function () {
     expect(capitalize("hello   world")).toEqual("Hello World");
   });
 
   it('Multiple UpperCase', function () {
     expect(capitalize("heLLo woRLd")).toEqual("Hello World");
   });
 
   it('All In', function () {
     expect(capitalize("  heLLo   woRLd  ")).toEqual("Hello World");
   });
 });