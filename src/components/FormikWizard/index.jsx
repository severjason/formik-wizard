import React from 'react';
import { Formik } from 'formik';
import _map from 'lodash/map';
import { Title } from '../Helpers';

class FormikWizard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: this.props.initialValues,
      apiErrors: null,
    };
    this.titles = ['Location', 'About', 'Photos', 'Services'];
  }

  static Page = ({children}) => children;

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
      ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  setPage = (page) => this.setState(() => ({page}));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  transformApiErrors(errors) {
    const errorsObj = {};
    _map(errors, (error, key) => {
      (key === 'address.location') ? errorsObj.location = error[0].join(", ") : errorsObj[key] = error[0];
    });
    return errorsObj;
  }

  handleError = (errors, bag) => {
    this.setState({apiErrors: this.transformApiErrors(errors)}, () => bag.setErrors(this.state.apiErrors));
  };

  checkErrorsRelations = (errors) => [
    (errors) ? !!(errors.name || errors.location || errors.phone || errors.cuisines_arr) : null,
    (errors) ? !!(errors.short_description || errors.long_description) : null,
    null,
    (errors) ? !!(errors.min_cost_item || errors.max_cost_item || errors.cuisines_arr) : null,
  ];

  handleSubmit = (values, bag) => {
    const {children, onSubmit} = this.props;
    const {page} = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      this.setState({apiErrors: null});
      return onSubmit(values)
        .then(({data}) => window.location = data.redirect_to)
        .catch((error) => {
          this.handleError(error.response.data, bag);
          bag.setSubmitting(false);
        });
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  handleTitleClick = (errors, page) => {
    const statePage = this.state.page;
    return !this.checkErrorsRelations(errors)[statePage] && statePage >= page ? this.setPage(page) : {};
  };

  render() {
    const {children} = this.props;
    const {page, values, apiErrors} = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({values, validateForm, handleSubmit, isSubmitting, errors}) => (
          <div className="card card--middle w-100 steps-form">
            <div className="card-header">
              <div className='steps-form__header mb-4 d-flex extra-small-text'>
                {this.titles.map((title, index) => (
                  <Title
                    key={title}
                    title={title}
                    pageNumber={index}
                    statePage={page}
                    errors={errors}
                    apiErrors={apiErrors}
                    checkErrorsRelations={this.checkErrorsRelations}
                    handleTitleClick={this.handleTitleClick}
                  />
                ))}
              </div>
              <div
                className={`steps-form__body card card--small bg-secondary mb-4 ${apiErrors ? 'with-api-errors' : ''}`}>
                <form onSubmit={handleSubmit}>
                  {activePage}
{/*


                 {<pre>{JSON.stringify(values, null, 2)}</pre>}

*/}

                </form>
                {apiErrors && <div className="api-error">
                  Please, fix errors in {} and try again...
                </div>}
              </div>
              <div className="card-buttons d-flex align-items-center justify-content-center mb-3">
                {
                  <button
                    className="btn btn-secondary uppercase mr-3 bg-grey grey-color no-borders"
                    type="button" onClick={this.previous} disabled={page === 0}>
                    Previous
                  </button>
                }
                {!isLastPage &&
                <button className="btn btn-primary uppercase" type="button" onClick={handleSubmit}>Next</button>}
                {isLastPage && (
                  <button className="btn btn-primary uppercase" type="button" disabled={isSubmitting}
                          onClick={handleSubmit}>
                    Finish
                  </button>
                )}
              </div>
              <div>
                <a href="#" className="project-link--primary no-decoration text-small">Cancel</a>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default FormikWizard;