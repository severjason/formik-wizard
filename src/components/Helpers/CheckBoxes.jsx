import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const CheckBoxes = (props) => {
  const allServices = props[0];
	const {field, form} = props;
	const values = field.value.map((value) => value.id);
	const labels = allServices.map((service, index) => (
		<label key={index}>
			<Checkbox value={service.id}/>
			{allServices[index].name}
		</label>
	));
	return (
		<CheckboxGroup
			value={values}
			checkboxDepth={2}
			onChange={(values) => {
				const convertedValues = values.map(value => ({
					id: value,
					name: allServices[value - 1].name,
				}));
				form.setFieldValue('services', convertedValues);
			}}
		>
			{labels}
		</CheckboxGroup>
	)
};

export default CheckBoxes;