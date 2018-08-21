import React, {Fragment} from 'react';
import { Field, FieldArray } from 'formik';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const allServices = [
  {
    "id": 1,
    "name": "Parking/Valet"
  },
  {
    "id": 2,
    "name": "Outdoor Seating"
  },
  {
    "id": 3,
    "name": "Pet Friendly"
  },
  {
    "id": 4,
    "name": "Handicap Accessible"
  },
  {
    "id": 5,
    "name": "Smoking Allowed"
  },
  {
    "id": 6,
    "name": "Cocktails"
  },
  {
    "id": 7,
    "name": "Private Parties"
  },
  {
    "id": 8,
    "name": "Big Groups"
  },
];


const CheckBoxes = (props) => {
  const { field, form } = props;
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
          name: allServices[value - 1].name
        }));
        form.setFieldValue('services', convertedValues);
        console.log(values);
        console.log(convertedValues);
      }}
    >
      {labels}
    </CheckboxGroup>
  )};

const EditLocationFourthPage = (props) => {
  return (
    <Fragment>
      <h3>Average price per plate.</h3>
      <div>
        <label>Min menu item price ($)</label>
        <Field
          name="min_cost_item"
          component="input"
          type="text"
          placeholder="Min price"
        />
        <Error name="min_cost_item"/>
      </div>
      <div>
        <label>Max menu item price ($)</label>
        <Field
          name="max_cost_item"
          component="input"
          type="input"
          placeholder="Max price"
        />
        <Error name="max_cost_item"/>
      </div>
      <div>
        <label>Service offerings.</label>
        <Field
          name="services"
          component={CheckBoxes}
        />
        <Error name="services"/>
      </div>

    </Fragment>
  )
};

export default EditLocationFourthPage;