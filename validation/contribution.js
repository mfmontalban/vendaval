const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : ``;
  data.description = !isEmpty(data.description) ? data.description : ``;

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Contribution title field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Contribution description is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
