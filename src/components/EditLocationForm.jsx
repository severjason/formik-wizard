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

  initialValues = {
    name: this.props.name ? this.props.name : '',
    location: '1',
    address: this.props.address ? this.props.address.address : '',
    city: this.props.address ? this.props.address.city : '',
    state: this.props.address ? this.props.address.state : '',
    zipcode: this.props.address ? this.props.address.zip_code : '',
    phoneNumber: this.props.phone ? this.props.phone : '',
    website: this.props.website_link ? this.props.website_link : '',
    cuisines: [
      {
        "id": 9,
        "name": "Mexican",
        "image": {
          "url": "/uploads/restaurant/cuisine/image/9/cuisine-american.jpeg"
        },
        "value": "Mexican",
        "label": "Mexican"
      }
    ],
    menu_link: this.props.menu_link ? this.props.menu_link : '',
    short_description: this.props.short_description ? this.props.short_description : '',
    long_description: this.props.long_description ? this.props.long_description : '',
    photos: this.props.photos && this.props.photos.length ? this.props.photos : [],
    min_cost_item: this.props.min_cost_item ? this.props.min_cost_item : '',
    max_cost_item: this.props.max_cost_item ? this.props.max_cost_item : '',
    services: this.props.services ? this.props.services : '',
  };

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    const {cuisines, services} = this.props;
    return (
      <div style={{display: 'flex', maxWidth: '600px', paddingTop:'100px', margin:'0 auto'}}>
        <FormikWizard
          initialValues={this.initialValues}
          onSubmit={this.onSubmit}
        >
          <FormikWizard.Page validate={validators.validateFirstPage}>
            <EditLocationFirstPage
              selectOptions={cuisines && cuisines.length > 0 ? cuisines : ''}/>
          </FormikWizard.Page>
          <FormikWizard.Page validate={validators.validateSecondPage}>
            <EditLocationSecondPage />
          </FormikWizard.Page>
          <FormikWizard.Page >
            <EditLocationThirdPage/>
          </FormikWizard.Page>
          <FormikWizard.Page >
            <EditLocationFourthPage services={services}/>
          </FormikWizard.Page>
        </FormikWizard>
      </div>

    )
  }
}

export default EditLocationForm;