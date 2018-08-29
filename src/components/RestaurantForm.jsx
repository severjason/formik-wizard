import React from 'react';
import FormikWizard from './FormikWizard';
import {
  EditLocationFirstPage,
  EditLocationSecondPage,
  EditLocationThirdPage,
  EditLocationFourthPage,
} from './EditLocationFormPages';
import * as validators from './Helpers/validate';
import './RestaurantForm.css';

class RestaurantForm extends React.Component {

  initialValues = {
    name: this.props.name ? this.props.name : '',
    location: '',
    /*address: '',
    city: '',
    state: '',
    zipcode: '',*/
    phoneNumber: '',
    website: '',
    cuisines: [],
    menu_link: '',
    short_description: '',
    long_description: '',
    photos: [],
    min_cost_item: '',
    max_cost_item:'',
    services: [],
    lat: '',
    lng: '',
  };

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    const {cuisines, services} = this.props.restaurant;
    return (
      <main className='new-restaurant-page'>
        <section className='new-restaurant-section py-5'>
          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8 d-flex align-items-center flex-column">
                <h2 className='project-title--medium black-color mb-3'>
                  Add a restaurant.
                </h2>
                <FormikWizard
                  initialValues={this.initialValues}
                  onSubmit={this.onSubmit}
                >
                  <FormikWizard.Page validate={validators.validateFirstPage}>
                    <EditLocationFirstPage cuisines={cuisines}/>
                  </FormikWizard.Page>
                  <FormikWizard.Page validate={validators.validateSecondPage}>
                    <EditLocationSecondPage/>
                  </FormikWizard.Page>
                  <FormikWizard.Page>
                    <EditLocationThirdPage/>
                  </FormikWizard.Page>
                  <FormikWizard.Page>
                    <EditLocationFourthPage services={services}/>
                  </FormikWizard.Page>
                </FormikWizard>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default RestaurantForm;