//function to validate the email return true if valid and false otherwise
const validateEmail = (email) => {
  //regex for validating email
  const regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,6})/;
  var result = regx.test(email);
  return result;
};

//function to validate the user's phone number
const validateContact = (contact) => {
  //regex for validating phone number
  const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return regex.test(contact);
};

//function to validate zipCode
const validateZipCode = (zipCode) => {
  const regex = /^\d{6}$/;
  return regex.test(zipCode);
};

module.exports = { validateEmail, validateContact, validateZipCode };
