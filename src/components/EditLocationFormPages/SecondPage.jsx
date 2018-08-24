import React, {Fragment} from 'react';
import { FormikField } from '../Helpers';

const EditLocationSecondPage = () => {
  return (
    <Fragment>
      <h3>About your location</h3>
	    {FormikField("Menu link", "menu_link", "input", "text", "", "")}
	    {FormikField("A short blurb about your discount or restaurant.", "short_description", "textarea", "textarea", "Short blurb", "")}
	    {FormikField("A longer description about restaurant.", "long_description", "textarea", "textarea", "Longer description", "")}
    </Fragment>
  )
};

export default EditLocationSecondPage;