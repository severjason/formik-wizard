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

const EditLocationSecondPage = props => {
  return (
    <Fragment>
      <h3>About your location</h3>
      <div>
        <label>Menu link</label>
        <Field
          name="menu_link"
          component="input"
          type="text"
          placeholder=""
        />
        <Error name="menu_link"/>
      </div>
      <div>
        <label>A short blurb about your discount or restaurant.</label>
        <Field
          name="short_description"
          component="textarea"
          type="textarea"
          placeholder="Short blurb"
        />
        <Error name="short_description"/>
      </div>
      <div>
        <label>A longer description about restaurant.</label>
        <Field
          name="long_description"
          component="textarea"
          type="textarea"
          placeholder="Longer description"
        />
        <Error name="long_description"/>
      </div>
    </Fragment>
  )
};

export default EditLocationSecondPage;