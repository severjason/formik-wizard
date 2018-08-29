import React, { Fragment } from 'react'
import LocationSearchInput from '../LocationSearchInput';
import { FormikField, PageSelect } from '../Helpers';
import PropTypes from 'prop-types';

const _EditLocationFirstPageProps = {
  cuisines: PropTypes.array,
};

const EditLocationFirstPage = (props) => {
  return (
    <Fragment>
      <div className="form-group">
        {FormikField("First Name", "name", "input", "text", "Name", "name")}
      </div>
      <div className="form-group">
        {FormikField(false, "lat", "input", "text", "", "", "hidden-field")}
      </div>
      <div className="form-group">
        {FormikField(false, "lng", "input", "text", "", "", "hidden-field")}
      </div>
      <div className="form-group">
        {FormikField("Location", "location", LocationSearchInput, "text", "Location")}
      </div>
      <div className="form-group ">
        {FormikField("Phone number", "phoneNumber",  "input", "tel", "Phone number", "tel-national")}
      </div>
      <div className='flex-wrap row'>
{/*        <div className="form-group col-12 col-lg-6">
          {FormikField("City", "city",  "input", "text", "City", "address-level2")}
        </div>
        <div className="form-group col-12 col-lg-6">
          {FormikField("State", "state",  "input", "text", "State", "address-level1")}
        </div>
        <div className="form-group col-12 col-lg-6">
          {FormikField("Zipcode", "zipcode",  "input", "text", "Zipcode", "postal-code")}
        </div>*/}
        <div className="form-group col-12 col-lg-6">
          {FormikField("Website link", "website",  "input", "text", "Website")}
        </div>
        <div className="form-group col-12 col-lg-6">
          {FormikField("Cuisines", "cuisines",  PageSelect, "input", "Cuisines", "", "", props.cuisines)}
        </div>
      </div>
    </Fragment>
  )
};

EditLocationFirstPage.propTypes = _EditLocationFirstPageProps;

export default EditLocationFirstPage;
