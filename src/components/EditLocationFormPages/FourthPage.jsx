import React, {Fragment} from 'react';
import { CheckBoxes, FormikField } from '../Helpers';
import PropTypes from 'prop-types';

const _EditLocationFourthPageProps = {
  services: PropTypes.array,
};

const EditLocationFourthPage = (props) => {
  return (
    <Fragment>
      <div className="h5 text-center">Average price per plate.</div>
      <div className="form-group">
        {FormikField("Min menu item price ($)", "min_cost_item", "input", "text", "Min price", "")}
      </div>
      <div className="form-group">
        {FormikField("Max menu item price ($)", "max_cost_item", "input", "text", "Max price", "")}
      </div>
        <div className="h5 text-center">Service offerings.</div>
        {FormikField(false, "services_arr", CheckBoxes, "", "", "", "", props.services)}
        {FormikField(false, "services", "input", "text", "", "", "hidden-field")}
    </Fragment>
  )
};

EditLocationFourthPage.propTypes = _EditLocationFourthPageProps;

export default EditLocationFourthPage;