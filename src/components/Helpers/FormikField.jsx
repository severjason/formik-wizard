import React, { Fragment } from 'react';
import { Field } from 'formik';
import { Error } from '../Helpers';

const FormikField = (labelName, fieldName, component, type, placeholder, autoComplete, fieldClass = "", ...props) => (
	<Fragment>
		{labelName && <label htmlFor={fieldName} className='opacity-text extra-small-text'>{labelName}</label>}
		<Field
			id={fieldName}
			className={`form-control project-input bg-white ${fieldClass}`}
			autoComplete={autoComplete ? autoComplete : ''}
			name={fieldName}
			component={component}
			type={type}
			placeholder={placeholder}
			{...props}
		/>
		<Error name={fieldName}/>
  </Fragment>
);

export default FormikField;