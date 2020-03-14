const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ``;
  data.password = !isEmpty(data.password) ? data.password : ``;

  if(data.language === 'es') {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'E-correo no es valido';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = 'Entrada de e-correo es requierido';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Entrada de contraseña es requierido';
    }
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }

  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
