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

  static Page = ({ children }) => children;

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

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  handleChange = (selectedValues) => {
    console.log(selectedValues);
  };

  render() {
    const {children} = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {
                <button type="button" onClick={this.previous} disabled={page === 0}>
                  « Previous
                </button>
              }
              {!isLastPage && <button type="submit">Next »</button>}
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