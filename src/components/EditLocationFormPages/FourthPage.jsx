import React, {Fragment} from 'react';
import { Field } from 'formik';

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const EditLocationFourthPage = () => {
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
    </Fragment>
  )
};

export default EditLocationFourthPage;