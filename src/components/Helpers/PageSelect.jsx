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
		className="dinelly-select"
		isMulti={true}
		options={cuisines}
		value={field.value}
		onChange={(values) => {
			form.setFieldValue('cuisines_arr', values);
      form.setFieldValue('cuisines', values.map((cuisine) => cuisine.id));
    }}
	/>;
};

export default PageSelect;