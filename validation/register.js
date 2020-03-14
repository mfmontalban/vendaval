const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : ``;
  data.email = !isEmpty(data.email) ? data.email : ``;
  data.password = !isEmpty(data.password) ? data.password : ``;
  data.password2 = !isEmpty(data.password2) ? data.password2 : ``;

  if(data.language === 'es') {
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Nombre tiene que ser entre dos y trenta letras';
    }
  
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Entrada de nombre es requierido';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Entrada de e-correo es requierido';
    } 
  
    if (!Validator.isEmail(data.email)) {
      errors.email = 'E-correo no es valido';
    }
  
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Entrada de contraseña es requierido';
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Contraseña tiene que ser al minimo 6 letras';
    }
  
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Entrada a confirmar contraseña es requierido';
    }
  
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Contraseña deben coincidir';
    }
  }
  else {
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters';
    }
  
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    } 
  
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm Password field is required';
    }
  
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
