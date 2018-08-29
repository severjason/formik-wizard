export const validateFirstPage = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'This field is required'
  }
  if (!values.location) {
    errors.location = 'This field is required'
  }
  /*if (!values.address) {
    errors.address = 'This field is required'
  }
  if (!values.city) {
    errors.city = 'This field is required'
  }
  if (!values.state) {
    errors.state = 'This field is required'
  }
  if (!values.zipcode) {
    errors.zipcode = 'This field is required'
  }*/
  if (!values.phoneNumber) {
    errors.phoneNumber = 'This field is required'
  }
  if (isNaN(values.phoneNumber)) {
    errors.phoneNumber = 'This field should contain only numbers'
  }
  if (!values.cuisines) {
    errors.cuisines = 'This field is required'
  }
  return errors
};

export const validateSecondPage = values => {
  const errors = {};
  if (!values.short_description) {
    errors.short_description = 'This field is required'
  }
  if (!values.long_description) {
    errors.long_description = 'This field is required'
  }
  return errors;
};

