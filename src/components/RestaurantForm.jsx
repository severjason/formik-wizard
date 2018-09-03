import React from 'react';
import FormikWizard from './FormikWizard';
import {
  Location,
  Photos,
  About,
  Services,
} from './EditLocationFormPages';
import * as validators from './Helpers/validate';
import './RestaurantForm.css';
//import axios from '../../axios-dinelyy';
import axios from 'axios';

class RestaurantForm extends React.Component {

  initialValues = {
    name: this.props.name ? this.props.name : '',
    location: '',
    address: '',
    /*city: '',
    state: '',
    zipcode: '',*/
    phone: '',
    website: '',
    cuisines_arr: [],
    cuisines: [],
    menu_link: '',
    short_description: '',
    long_description: '',
    photos: [],
    min_cost_item: '',
    max_cost_item:'',
    services_arr: [],
    services: [],
  };

  onSubmit = (values) => axios.post(this.props.url, values);

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
                    <Location cuisines={cuisines}/>
                  </FormikWizard.Page>
                  <FormikWizard.Page validate={validators.validateSecondPage}>
                    <About/>
                  </FormikWizard.Page>
                  <FormikWizard.Page>
                    <Photos/>
                  </FormikWizard.Page>
                  <FormikWizard.Page validate={validators.validateFourthPage}>
                    <Services services={services}/>
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