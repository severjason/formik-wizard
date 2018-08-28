import React, {Fragment} from 'react';
import { FormikField } from '../Helpers';

const EditLocationSecondPage = () => {
  return (
    <Fragment>
      <h3>About your location</h3>
      <div className="form-group">
        {FormikField("Menu link", "menu_link", "input", "text", "", "")}
      </div>
      <div className="form-group">
        {FormikField("A short blurb about your discount or restaurant.", "short_description", "textarea", "textarea", "Short blurb", "")}
      </div>
      <div className="form-group">
        {FormikField("A longer description about restaurant.", "long_description", "textarea", "textarea", "Longer description", "")}
      </div>
    </Fragment>
  )
};

export default EditLocationSecondPage;