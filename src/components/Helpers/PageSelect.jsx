import React from 'react';
import Select from 'react-select';

const PageSelect = (props) => {
	const selectOptions = props[0];
	const {form, field} = props;
	const cuisines = selectOptions.map((cuisine) => ({
		...cuisine,
		value: cuisine.name,
		label: cuisine.name,
	}));
	return <Select
		isMulti={true}
		options={cuisines}
		value={field.value}
		onChange={(values) => form.setFieldValue('cuisines', values)}
	/>;
};

export default PageSelect;