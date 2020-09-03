const { userError } = require('./error');

const isEmail = require('validator/lib/isEmail');

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

exports.validateLoginData = (data) => {
  let errors = [];
  if (isEmpty(data.email)) errors.push(userError.emptyEmail);
  if (isEmpty(data.password)) errors.push(userError.emptyPassword);
  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.validateSignupData = (data) => {
	let errors = [];

	if (isEmpty(data.email)) {
		errors.push(userError.emptyEmail);
	} else if (!isEmail(data.email)) {
		errors.push(userError.invalidEmail);
	}

	if (isEmpty(data.firstName)) errors.push(userError.emptyFirstName);
	if (isEmpty(data.lastName)) errors.push(userError.emptyLastName);

	if (isEmpty(data.password)) errors.push(userError.emptyPassword);
	if (data.password !== data.confirmPassword) errors.push(userError.diffPasswords);

	return {
		errors,
		valid: Object.keys(errors).length === 0
	};
};
