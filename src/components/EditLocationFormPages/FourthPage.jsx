import React, {Fragment} from 'react';
import { CheckBoxes, FormikField } from '../Helpers';

const EditLocationFourthPage = () => {
  return (
    <Fragment>
      <h3>Average price per plate.</h3>
	    {FormikField("Min menu item price ($)", "min_cost_item", "input", "text", "Min price", "")}
	    {FormikField("Max menu item price ($)", "max_cost_item", "input", "text", "Max price", "")}
	    {FormikField("Service offerings.", "services", CheckBoxes, "", "", "")}
    </Fragment>
  )
};

export default EditLocationFourthPage;