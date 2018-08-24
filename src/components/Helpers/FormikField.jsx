import React from 'react';
import { Field } from 'formik';
import { Error } from '../Helpers';

const FormikField = (labelName, fieldName, component, type, placeholder, autoComplete, fieldClass = "", ...props) => (
	<div>
		{labelName && <label>{labelName}</label>}
		<Field
			className={fieldClass}
			autoComplete={autoComplete ? autoComplete : ''}
			name={fieldName}
			component={component}
			type={type}
			placeholder={placeholder}
			{...props}
		/>
		<Error name={fieldName}/>
	</div>
);

export default FormikField;