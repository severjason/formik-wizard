import React, { Fragment } from 'react'
import { FormikField, PhotosDropzone } from '../Helpers';

const Photos = () => {
  return (
    <Fragment>
      <div className="h5 text-center">Upload your photos.</div>
	    {FormikField(false, "photos", PhotosDropzone, "text", "Photos", "")}
    </Fragment>
  )
};

export default Photos;


