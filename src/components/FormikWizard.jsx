import React from 'react';
import { Formik } from 'formik';

class FormikWizard extends React.Component {

  static Page = ({ children }) => children;

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.props.page
      ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  next = values => this.props.next(Math.min(this.props.page + 1, this.props.children.length - 1),values);

  handleSubmit = (values, bag) => {
    const { children, onSubmit, page } = this.props;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const {
      children,
      page,
      values,
      previous,
      handleSelect} = this.props;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {
                <button type="button" onClick={previous} disabled={page === 0}>
                  « Previous
                </button>
              }
              {!isLastPage && <button type="submit" onClick={handleSelect}>Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={isSubmitting}>
                  Finish
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default FormikWizard;