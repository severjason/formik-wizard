import * as Yup from 'yup';

function validationSchemaFirstPage(values) {
  return Yup.object().shape({
    name: Yup.string()
      .required('This field is required'),
    location: Yup.string()
      .required('This field is required'),
    phone: Yup.string()
      .matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, 'Phone is not valid')
      .required('This field is required'),
    cuisines_arr: Yup.array()
      .required('This field is required'),
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
    services_arr: Yup.array()
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


