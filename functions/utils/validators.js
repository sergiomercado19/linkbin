const isEmail = require('validator/lib/isEmail');

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = errMessages.empty;
  if (isEmpty(data.password)) errors.password = errMessages.empty;
  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.validateSignupData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = errMessages.empty;
	} else if (!isEmail(data.email)) {
		errors.email = errMessages.invalidEmail;
	}

	if (isEmpty(data.firstName)) errors.firstName = errMessages.empty;
	if (isEmpty(data.lastName)) errors.lastName = errMessages.empty;

	if (isEmpty(data.password)) errors.password = errMessages.empty;
	if (data.password !== data.confirmPassword) errors.confirmPassword = errMessages.diffPasswords;

	return {
		errors,
		valid: Object.keys(errors).length === 0
	};
};

exports.errMessages = {
  wrongCred: "Wrong credentials",
  empty: "Field cannot be empty",
  invalidEmail: "Email is invalid",
  takenEmail: "Email has already been registered",
  diffPasswords: "Passwords do not match",
  dunno: "Something went wrong",
  userNotFound: "User not found"
}