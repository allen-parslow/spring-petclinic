import {validatorTypes, validateAll} from "../";

describe('Validation', () => {

  describe('required fields', () => {
    it('Should fail validation on missing value', () => {
      var result = validatorTypes.required("name", "");
      expect(result.name.valid).toBe(false);
      expect(result.name.text).toBe("Required");
    });

    it('Should fail validation on null value', () => {
      var result = validatorTypes.required("name", null);
      expect(result.name.valid).toBe(false);
      expect(result.name.text).toBe("Required");
    });  

    it('Should fail validation on empty value', () => {
      var result = validatorTypes.required("name", " ");
      expect(result.name.valid).toBe(false);
      expect(result.name.text).toBe("Required");
    });

    it('Should pass validation with non-empty value', () => {
      var result = validatorTypes.required("name", "X");
      expect(result.name.valid).toBe(true);
      expect(result.name.text).toBe(undefined);
    }); 
  });

  describe('digits fields', () => {
      it('Should NOT fail validation on missing value', () => {
        var result = validatorTypes.digits("zip", "");
        expect(result.zip.valid).toBe(true);
      });  
  
      it('Should NOT fail validation on null value', () => {
        var result = validatorTypes.digits("zip", null);
        expect(result.zip.valid).toBe(true);
      });  

      it('Should fail validation on letters', () => {
        var result = validatorTypes.digits("zip", "ABC");
        expect(result.zip.valid).toBe(false);
        expect(result.zip.text).toBe("Digits Only");
      }); 

      it('Should pass validation on number', () => {
        var result = validatorTypes.digits("zip", "123");
        expect(result.zip.valid).toBe(true);
      }); 
    });

    describe('validateAll', () => {
      const sampleValidators = {
        name: [validatorTypes.required],
        empty: [],
        zip: [validatorTypes.required, validatorTypes.digits]
      };
      
      it('Should pass validation with valid fields', () => {
        var data = {
          name: "Joe",
          empty: "",
          other: "",
          zip: "12345"
        };
        var result = validateAll(data, sampleValidators);
        expect(result).toBe(null);
      }); 

      it('Should fail validation on multiple invalid fields', () => {
        var data = {
          name: "",
          zip: ""
        };
        var result = validateAll(data, sampleValidators);
        expect(result.name.valid).toBe(false);
        expect(result.zip.valid).toBe(false);
        expect(result.zip.text).toBe("Required");
      }); 

      it('Should fail validation on invalid field (2nd validator in list)', () => {
        var data = {
          name: "Joe",
          zip: "A"
        };
        var result = validateAll(data, sampleValidators);
        expect(result.name).toBe(undefined);
        expect(result.zip.valid).toBe(false);
        expect(result.zip.text).toBe("Digits Only");
      });
    });
});