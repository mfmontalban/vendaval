const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateForgotInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ``;

  if(data.language === 'es') {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'E-correo no es valido';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Entrada de e-correo es requierido';
    }
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
