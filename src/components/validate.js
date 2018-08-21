export const validateFirstPage = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.location) {
    errors.location = 'Required'
  }
  if (!values.address) {
    errors.address = 'Required'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.state) {
    errors.state = 'Required'
  }
  if (!values.zipcode) {
    errors.zipcode = 'Required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  }
  if (!values.website) {
    errors.website = 'Required'
  }
  if (!values.cuisines) {
    errors.cuisines = 'Required'
  }
  return errors
};

export const validateSecondPage = values => {
  const errors = {};
  if (!values.menu_link) {
    errors.menu_link = 'Required'
  }
  if (!values.short_description) {
    errors.short_description = 'Required'
  }
  if (!values.long_description) {
    errors.long_description = 'Required'
  }
  return errors;
};

