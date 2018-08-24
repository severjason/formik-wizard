import React, { Fragment } from 'react'
import { FormikField, PhotosDropzone } from '../Helpers';

const EditLocationThirdPage = () => {
  return (
    <Fragment>
	    <h3>Upload your photos.</h3>
	    {FormikField(false, "photos", PhotosDropzone, "text", "Photos", "")}
    </Fragment>
  )
};

export default EditLocationThirdPage;


