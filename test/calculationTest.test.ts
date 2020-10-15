import { describe,it } from 'mocha'
import { expect } from 'chai'
import Message from "../src/models/Message";
import {calculateFromMessage} from "../src/utils/mathUtils";

describe("Test calculations", () =>{

  describe('standard calculation', () =>{
    it('should return 37', () =>{
      let expression = "5 + 2 + 5 * 6"
      let result = 37
      let message = new Message("client", expression);
      expect(calculateFromMessage(message)).to.equal(result);
    })
  })

  describe('starts with negative calculation', () =>{
    it('should return 45', () =>{
      let expression = "-5 + 20 + 5 * 6"
      let result = 45
      let message = new Message("client", expression);
      expect(calculateFromMessage(message)).to.equal(result);
    })
  })

  describe("calculation with parentheses", () =>{
    it('should return 34', () =>{
      let expression = "5 + 9 + (32/8) * 5";
      let result = 34;
      let message = new Message("client", expression);
      expect(calculateFromMessage(message)).to.equal(result);
    });
  });

  describe("calculations begin with minus", () =>{
    it("should return 5", () =>{
      let expression = "-5+ 2+8";
      let result = 5
      let message = new Message("client", expression);
      expect(calculateFromMessage(message) ).to.equal(result);
    })
  })

  describe("calculation with non-numeric", () =>{
    it('should throw error', () =>{
      let expression = "2 + 6 * i + 32";
      let message = new Message("client", expression);
      expect(()=>calculateFromMessage(message) ).to.throw();
    })
  });

  describe("calculation with e notation" , () =>{
    it('should return correct value', () =>{
      let expression = "52e+2 + 5 - 2e+5";
      let result = 52e+2 + 5 - 2e+5;
      let message = new Message("client", expression);
      expect(calculateFromMessage(message) ).to.equal(result)
    })
  });

  describe("calculation with decimal" , () =>{
    it('should return correct value', () =>{
      let expression = "5.525 + 22.9e+5 - 99 + (61 * -0.5) + 5.";
      let result = 5.525 + 22.9e+5 - 99 + (61 * -0.5) + 5.;
      let message = new Message("client", expression);
      expect(calculateFromMessage(message) ).to.equal(result)
    })
  });

  describe("calculation with weird decimal", () =>{
    it("should throw error", () =>{
      let expression = "7.2.5 + 64";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  })

  describe("inject program termination" , () =>{
    it('should throw error', () =>{
      let expression = "process.exit(1)";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  });


  describe("Missing exponent", () =>{
    it("should throw error", () =>{
      let expression = "5+ 10-64+ 5e+";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  })

  describe("inject require" , () =>{
    it('should throw error', () =>{
      let expression = "require('fs')";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  });

  describe("input wrong parentheses", () =>{
    it("should throw error", () =>{
      let expression = "5 + ((2+5) + (7+7)";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  })

  describe("calculation with equality", () =>{
    it("should throw error", () =>{
      let expression = "5 + ((2+5) + (7+7)) = 26";
      let message = new Message("client", expression);
      expect(() => calculateFromMessage(message) ).to.throw();
    })
  })



});