import { describe,it } from 'mocha'
import { expect } from 'chai'
import Message from "../src/models/Message";
import {calculateFromMessage} from "../src/utils/mathUtils";
import {isValidNumbers, isValidSymbols} from "../src/utils/validationUtils";

describe("Symbol validation", () =>{

  describe('Standard symbol input', () =>{
    it('success should be true', () =>{
      let arr = "+ - ^ % * / ) (".split(" ")
      expect(isValidSymbols(arr).success).to.be.true;
    })
  })

  describe('Unrecognized symbol input', () =>{
    it('success should be false', () =>{
      let arr = "- + * ^ & ( )".split(" ")
      expect(isValidSymbols(arr)).to.be.eql({success: false, problem: '&'});
    })

    it('should be false and problem should be @', () =>{
      let arr = "( @ )".split(" ")
      expect(isValidSymbols(arr)).to.be.eql({success: false, problem: '@'});
    })

    it('should be false and problem should be #', () =>{
      let arr = "( # )".split(" ")
      expect(isValidSymbols(arr)).to.be.eql({success: false, problem: '#'});
    })

    it('should be false and problem should be =', () =>{
      let arr = "( + - / ^ * ) =".split(" ")
      expect(isValidSymbols(arr)).to.be.eql({success: false, problem: '='});
    })
  })

});


describe("Number validation", () =>{

  describe('Acceptable numbers input', () =>{
    it('success should be true', () =>{
      let arr = "1 2 3 4 5 6 7 8 9 0 10 23 634 10e+5 64e+2 10000000 5000000000".split(" ")
      expect(isValidNumbers(arr).success).to.be.true;
    })
  })

  describe('Unacceptable numbers input', () =>{
    it('success should be false', () =>{
      let arr = "523.5 23 810 e".split(" ")
      expect(isValidNumbers(arr)).to.be.eql({success: false, problem: 'e'});
    })

    it('success should be false and problem should be 5x', () =>{
      let arr = "5 10 5e+10 34 63 10.63 512.234 5x".split(" ")
      expect(isValidNumbers(arr)).to.be.eql({success: false, problem: '5x'});
    })
  })


});