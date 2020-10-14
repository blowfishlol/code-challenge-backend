import { describe,it } from 'mocha'
import { expect } from 'chai'
import Message from "../src/models/Message";
import {validateAndCalculate} from "../src/utils/mathUtils";

describe("Test calculations", () =>{

  describe('standard calculation', () =>{
    it('should return 37', () =>{
      let expression = "5 + 2 + 5 * 6"
      let result = 37
      let message = new Message("client", expression)
      expect(validateAndCalculate(message)).to.equal(result)
    })
  })

  describe("calculation with parentheses", () =>{
    it('should return 34', () =>{
      let expression = "5 + 9 + (32/8) * 5";
      let result = 34;
      let message = new Message("client", expression);
      expect(validateAndCalculate(message)).to.equal(result)
    });

  });

  describe("calculation with non-numeric", () =>{
    it('should throw error', () =>{
      let expression = "2 + 6 * i + 32"
      let message = new Message("client", expression)
      expect(()=>validateAndCalculate(message) ).to.throw()
    })
  })

  describe("calculation with e notation" , () =>{
    it('should return', () =>{
      let expression = "52e+2 + 5 - 2e+5"
      let result = 52e+2 + 5 - 2e+5
      let message = new Message("client", expression)
      expect(validateAndCalculate(message) ).to.equal(result)
    })
  })

  describe("inject program termination" , () =>{
    it('should throw error', () =>{
      let expression = "process.exit(1)"
      let message = new Message("client", expression)
      expect(() => validateAndCalculate(message) ).to.throw()
    })
  })

  describe("inject require" , () =>{
    it('should throw error', () =>{
      let expression = "require('fs')"
      let message = new Message("client", expression)
      expect(() => validateAndCalculate(message) ).to.throw()
    })
  })

})