import React, {Fragment} from 'react';
import { CheckBoxes, FormikField } from '../Helpers';
import PropTypes from 'prop-types';

const _EditLocationFourthPageProps = {
  services: PropTypes.array,
};

const EditLocationFourthPage = (props) => {
  return (
    <Fragment>
      <h3>Average price per plate.</h3>
      <div className="form-group">
        {FormikField("Min menu item price ($)", "min_cost_item", "input", "text", "Min price", "")}
      </div>
      <div className="form-group">
        {FormikField("Max menu item price ($)", "max_cost_item", "input", "text", "Max price", "")}
      </div>
      <div className="form-group">
        {FormikField("Service offerings.", "services", CheckBoxes, "", "", "", "", props.services)}
      </div>
    </Fragment>
  )
};

EditLocationFourthPage.propTypes = _EditLocationFourthPageProps;

export default EditLocationFourthPage;