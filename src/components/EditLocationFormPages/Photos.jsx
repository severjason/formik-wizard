import React, { Fragment } from 'react'
import { FormikField, PhotosDropzone } from '../Helpers';

const Photos = ({onPhotosUpload}) => {
  return (
    <Fragment>
      <div className="h5 text-center">Upload your photos.</div>
	    {FormikField(false, "photos", PhotosDropzone, "text", "Photos", "", "", onPhotosUpload)}
    </Fragment>
  )
};

export default Photos;


