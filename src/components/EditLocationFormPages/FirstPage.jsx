import React, { Fragment } from 'react'
import LocationSearchInput from '../LocationSearchInput';
import { FormikField, PageSelect } from '../Helpers';

const EditLocationFirstPage = (props) => {
  return (
    <Fragment>
      {FormikField("First Name", "name", "input", "text", "Name", "name")}
      {FormikField("Location", "location", LocationSearchInput, "text", "Location")}
	    {FormikField("Address", "address",  "input", "text", "Address", "street-address")}
	    {FormikField("City", "city",  "input", "text", "City", "address-level2")}
	    {FormikField("State", "state",  "input", "text", "State", "address-level1")}
	    {FormikField("Zipcode", "zipcode",  "input", "text", "Zipcode", "postal-code")}
	    {FormikField("Phone number", "phoneNumber",  "input", "tel", "Phone number", "tel-national")}
	    {FormikField("Website link", "website",  "input", "text", "Website")}
	    {FormikField("Cuisines", "cuisines",  PageSelect, "input", "Cuisines", "", "", props.selectOptions)}
    </Fragment>
  )
};

export default EditLocationFirstPage;


