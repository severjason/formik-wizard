import React, { Fragment } from 'react'
import { FormikField, PhotosDropzone } from '../Helpers';

const Photos = ({onPhotosUpload, onImageDelete}) => {
  return (
    <Fragment>
      <div className="h5 text-center"><span>Upload your photos</span> <div className="small-text">/jpg, jpeg, png/</div></div>
	    {FormikField(false, "photos", PhotosDropzone, "text", "Photos", "", "", onPhotosUpload, onImageDelete)}
    </Fragment>
  )
};

export default Photos;


