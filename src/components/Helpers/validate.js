import * as Yup from 'yup';

export const validateFirstPage1 = values => {
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

function validationSchemaFirstPage(values) {
  return Yup.object().shape({
    name: Yup.string()
      .required('This field is required'),
    location: Yup.string()
      .required('This field is required'),
    phoneNumber: Yup.number()
      .typeError('Phone should contain only numbers')
      .required('This field is required'),
   /* cuisines: Yup.array()
      .required('This field is required'),*/
  })
}

function validationSchemaSecondPage(values) {
  return Yup.object().shape({
    short_description: Yup.string()
      .required('This field is required'),
    long_description: Yup.string()
      .required('This field is required'),
  })
}

function validationSchemaFourthPage(values) {
  return Yup.object().shape({
    min_cost_item: Yup.number()
      .typeError('Min price should contain only numbers')
      .required('This field is required'),
    max_cost_item: Yup.number()
      .typeError('Max price should contain only numbers')
      .required('This field is required'),
  })
}

export const validateFirstPage = (values) => {
    const validationSchema = validationSchemaFirstPage(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
};

export const validateSecondPage = (values) => {
  const validationSchema = validationSchemaSecondPage(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {}
  } catch (error) {
    return getErrorsFromValidationError(error)
  }
};

export const validateFourthPage = (values) => {
  const validationSchema = validationSchemaFourthPage(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {}
  } catch (error) {
    return getErrorsFromValidationError(error)
  }
};

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {});
}


