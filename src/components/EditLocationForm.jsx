import React from 'react';
import FormikWizard from './FormikWizard';
import {
  EditLocationFirstPage,
  EditLocationSecondPage,
  EditLocationThirdPage,
  EditLocationFourthPage,
} from './EditLocationFormPages';
import * as validators from './validate';

class EditLocationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: {
        name: props.name ? props.name : '',
        location: '1',
        address: props.address ? props.address.address : '',
        city: props.address ? props.address.city : '',
        state: props.address ? props.address.state : '',
        zipcode: props.address ? props.address.zip_code : '',
        phoneNumber: props.phone ? props.phone : '',
        website: props.website_link ? props.website_link : '',
        cuisinesOptions: props.cuisines && props.cuisines.length > 0 ? props.cuisines : '',
        cuisines: '',
        menu_link: props.menu_link ? props.menu_link : '',
        short_description: props.short_description ? props.short_description : '',
        long_description: props.long_description ? props.long_description : '',
        photos: props.photos && props.photos.length ? props.photos : [],
        min_cost_item: props.min_cost_item ? props.min_cost_item : '',
        max_cost_item: props.max_cost_item ? props.max_cost_item : '',
      },
    };
  }

  next = (page, values) => this.setState(() => ({page, values}));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSelect = (e, values) => {
    console.log(arguments)
  };

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    const {values, page} = this.state;
    return (
      <div style={{display: 'flex', maxWidth: '600px', paddingTop:'100px', margin:'0 auto'}}>
        <FormikWizard
          values={values}
          page={page}
          next={this.next}
          previous={this.previous}
          onSubmit={this.onSubmit}
        >
          <FormikWizard.Page validate={validators.validateFirstPage}>
            <EditLocationFirstPage/>
          </FormikWizard.Page>
          <FormikWizard.Page validate={validators.validateSecondPage}>
            <EditLocationSecondPage/>
          </FormikWizard.Page>
          <FormikWizard.Page >
            <EditLocationThirdPage/>
          </FormikWizard.Page>
          <FormikWizard.Page >
            <EditLocationFourthPage/>
          </FormikWizard.Page>
        </FormikWizard>
      </div>

    )
  }
}

export default EditLocationForm;