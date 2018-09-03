import React, {Fragment} from 'react';
import { FormikField } from '../Helpers';

const About = () => {
  return (
    <Fragment>
      <div className="h5 text-center">About your location.</div>
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

export default About;