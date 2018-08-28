import React from 'react';
import { Field } from 'formik';

const Error = ({name}) => (
	<Field
		name={name}
		render={({form: {touched, errors}}) =>
			touched[name] && errors[name] ? <label className="error">{errors[name]}</label> : null
		}
	/>
);

export default Error;