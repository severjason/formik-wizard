import React, { Fragment } from 'react'
import LocationSearchInput from '../LocationSearchInput';
import { FormikField, PageSelect } from '../Helpers';
import PropTypes from 'prop-types';

const _EditLocationFirstPageProps = {
  cuisines: PropTypes.array,
};

const Location = (props) => {
  return (
    <Fragment>
      <div className="form-group">
        {FormikField("First Name", "name", "input", "text", "Name", "name")}
      </div>
      <div className="form-group">
        {FormikField(false, "address", "input", "text", "", "", "hidden-field")}
      </div>
      <div className="form-group">
        {FormikField("Location", "location", LocationSearchInput, "text", "Location")}
      </div>
      <div className="form-group ">
        {FormikField("Phone number", "phone",  "input", "tel", "Phone number", "tel-national")}
      </div>
      <div className='flex-wrap row'>
        <div className="form-group col-12 col-lg-6">
          {FormikField("Website link", "website",  "input", "text", "Website")}
        </div>
        <div className="form-group col-12 col-lg-6">
          {FormikField("Cuisines", "cuisines_arr",  PageSelect, "input", "Cuisines", "", "", props.cuisines)}
        </div>
        <div className="form-group col-12 col-lg-6">
          {FormikField(false, "cuisines", "input", "text", "", "", "hidden-field")}
        </div>
      </div>
    </Fragment>
  )
};

Location.propTypes = _EditLocationFirstPageProps;

export default Location;
