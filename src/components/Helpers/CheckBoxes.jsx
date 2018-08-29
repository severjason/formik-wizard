import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const CheckBoxes = (props) => {
  const allServices = props[0];
	const {field, form} = props;
	const values = field.value.map((value) => value.id);
	const labels = allServices.map((service, index) => (
		<div key={index} className="col-sm-3 col-xs-6 text-center checkbox-item">
      <span className="restaurant-checkbox" >
        {allServices[index].name}
      </span>
			<div className="input-checkbox">
        <Checkbox value={service.id} id={service.name} className="hidden"/>
				<label htmlFor={service.name}/>
			</div>

		</div>

	));
	return (
		<CheckboxGroup
			value={values}
			checkboxDepth={3}
      className="form-group checkbox-group"
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