import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const allServices = [
	{
		"id": 1,
		"name": "Parking/Valet",
	},
	{
		"id": 2,
		"name": "Outdoor Seating",
	},
	{
		"id": 3,
		"name": "Pet Friendly",
	},
	{
		"id": 4,
		"name": "Handicap Accessible",
	},
	{
		"id": 5,
		"name": "Smoking Allowed",
	},
	{
		"id": 6,
		"name": "Cocktails",
	},
	{
		"id": 7,
		"name": "Private Parties",
	},
	{
		"id": 8,
		"name": "Big Groups",
	},
];

const CheckBoxes = (props) => {
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