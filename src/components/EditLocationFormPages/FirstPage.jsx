import React, { Fragment } from 'react'
import { Field } from 'formik';
import Select from 'react-select';
import LocationSearchInput from '../LocationSearchInput';

const Error = ({name}) => (
  <Field
    name={name}
    render={({form: {touched, errors}}) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const PageSelect = (props) => {
  const {selectOptions, form, field} = props;
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

const EditLocationFirstPage = (props) => {
  return (
    <Fragment>
      <div>
        <label>First Name</label>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Name"
        />
        <Error name="name"/>
      </div>
      <div>
        <label>Location</label>
        <Field
          name="location"
          component={LocationSearchInput}
          type="text"
          placeholder="Location"
        />
        <Error name="location"/>
      </div>
      <div>
        <label>Address</label>
        <Field
          name="address"
          component="input"
          type="text"
          placeholder="address"
        />
        <Error name="address"/>
      </div>
      <div>
        <label>City</label>
        <Field
          name="city"
          component="input"
          type="text"
          placeholder="City"
        />
        <Error name="city"/>
      </div>
      <div>
        <label>State</label>
        <Field
          name="state"
          component="input"
          type="text"
          placeholder="State"
        />
        <Error name="state"/>
      </div>
      <div>
        <label>Zipcode</label>
        <Field
          name="zipcode"
          component="input"
          type="text"
          placeholder="Zipcode"
        />
        <Error name="zipcode"/>
      </div>
      <div>
        <label>Phone number</label>
        <Field
          name="phoneNumber"
          component="input"
          type="text"
          placeholder="Phone number"
        />
        <Error name="phoneNumber"/>
      </div>
      <div>
        <label>Website link</label>
        <Field
          name="website"
          component="input"
          type="text"
          placeholder="Website"
        />
        <Error name="website"/>
      </div>
      <div style={{maxWidth:'500px'}}>
        <label>Cuisines</label>
        <Field
          selectOptions={props.selectOptions}
          name="cuisines"
          component={PageSelect}
          placeholder="Cuisines"
          type="input"
        />
        <Error name="cuisines"/>
      </div>
    </Fragment>
  )
};

export default EditLocationFirstPage;


