import React from 'react';
import PropTypes from 'prop-types';

const _TitlePropsTypes = {
  title: PropTypes.string,
  pageNumber: PropTypes.number,
  statePage: PropTypes.number,
  errors: PropTypes.object,
  apiErrors: PropTypes.object,
  checkErrorsRelations: PropTypes.func,
  handleTitleClick: PropTypes.func,
};

const Title = ({title, pageNumber, statePage, errors, apiErrors, checkErrorsRelations, handleTitleClick}) => (
  <div className="steps-form__header__item">
    <div className={`mb-4 ${checkErrorsRelations(apiErrors)[pageNumber] ? 'label-error' : ''}`}>
      <span className="spep_numer">{pageNumber + 1}.</span>
      <span className='spep_name'>{title}</span>
    </div>
    <div className={`step__point ${statePage === pageNumber ? 'active' : ''}`}
         onClick={() => handleTitleClick(errors, pageNumber)}
    >
      <div className='line'/>
      <div className='circle'/>
      <div className='line'/>
    </div>
  </div>
);

Title.propTypes = _TitlePropsTypes;

export default Title;