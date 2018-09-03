import React, {Fragment} from 'react';
import {Field} from 'formik';
import {Error} from '../Helpers';

const FormikField = (labelName, fieldName, component, type, placeholder, autoComplete, fieldClass = "", ...props) => (
  <Fragment>
    {labelName && <label htmlFor={fieldName} className='opacity-text extra-small-text'>{labelName}</label>}
    {fieldName === 'phone'
      ? <Field
        id={fieldName}
        name={fieldName}
        render={({field, form}) => {
          const formatter = (value) =>
            form.setFieldValue(fieldName, value.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
          return (
            <input
              autoComplete={autoComplete ? autoComplete : ''}
              maxLength={14}
              {...field}
              placeholder={placeholder}
              className={`form-control project-input bg-white ${fieldClass}`}
              onChange={(e) => {
                field.onChange(e);
                formatter(e.target.value);
              }}
            />
          )
        }}
      />
      : <Field
        id={fieldName}
        className={`form-control project-input bg-white ${fieldClass}`}
        autoComplete={autoComplete ? autoComplete : ''}
        name={fieldName}
        component={component}
        type={type}
        maxLength={(fieldName === 'short_description' || fieldName === 'long_description') ? 4000 : 40}
        placeholder={placeholder}
        {...props}
      />}
    <Error name={fieldName}/>
  </Fragment>
);

export default FormikField;