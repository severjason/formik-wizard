import React from 'react';
import { Formik } from 'formik';

class FormikWizard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: this.props.initialValues,
    };
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

  setPage = (page) =>
    this.setState(state => ({page}));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = (values, bag) => {
    const {children, onSubmit} = this.props;
    const {page} = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const {children} = this.props;
    const {page, values} = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({values, isValid, validateForm, handleSubmit, isSubmitting, handleReset}) => (
          <div className="card card--middle w-100 steps-form">
            <div className="card-header">
              <div className='steps-form__header mb-4 d-flex extra-small-text'>
                <div className="steps-form__header__item">
                  <div className='mb-4'>
                    <span className="spep_numer">1.</span>
                    <span className='spep_name'>Location</span>
                  </div>
                  <div className={`step__point ${page === 0 ? 'active' : ''}`}>
                    <div className='line'/>
                    <div className='circle'/>
                    <div className='line'/>
                  </div>
                </div>
                <div className="steps-form__header__item">
                  <div className='mb-4' >
                    <span className="spep_numer">2.</span>
                    <span className='spep_name'>About</span>
                  </div>
                  <div className={`step__point ${page === 1 ? 'active' : ''}`}>
                    <div className='line'/>
                    <div className='circle'/>
                    <div className='line'/>
                  </div>
                </div>
                <div className="steps-form__header__item">
                  <div className='mb-4' >
                    <span className="spep_numer">3.</span>
                    <span className='spep_name'>Photos</span>
                  </div>
                  <div className={`step__point ${page === 2 ? 'active' : ''}`}>
                    <div className='line'/>
                    <div className='circle'/>
                    <div className='line'/>
                  </div>
                </div>
                <div className="steps-form__header__item">
                  <div className='mb-4'>
                    <span className="spep_numer">4.</span>
                    <span className='spep_name'>Services</span>
                  </div>
                  <div className={`step__point ${page === 3 ? 'active' : ''}`}>
                    <div className='line'/>
                    <div className='circle'/>
                    <div className='line'/>
                  </div>
                </div>
              </div>
              <div className="steps-form__body card card--small bg-secondary mb-4">
                <form onSubmit={handleSubmit}>
                  {activePage}
{/*
                  {<pre>{JSON.stringify(values, null, 2)}</pre>}
*/}
                </form>
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
                  <button className="btn btn-primary uppercase" type="button" disabled={isSubmitting} onClick={handleSubmit}>
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