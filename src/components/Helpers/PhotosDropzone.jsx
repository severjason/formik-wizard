import React from 'react'
import Dropzone from 'react-dropzone';
import axios from '../../../axios-dinelyy';


class PhotosDropzone extends React.Component {

  state = {
    error: null,
  };

	render() {
    const setFieldValue = this.props.form.setFieldValue;
    const values = this.props.field.value;
    return (
      <Dropzone className="dropzone-container"  accept="image/*" onDrop={(acceptedFiles) => {
        // do nothing if no files
        if (acceptedFiles.length === 0) { return; }
        this.setState({error: null});

        const uploaders = acceptedFiles.map(file => {
          const formData = new FormData();
          formData.append("file", file);
          return axios.post("restaurant_owner/photos_upload", formData)
            .then(response => response.data)
            .catch(error => this.setState({error}))
        });

        Promise.all(uploaders).then((photos) => {
          setFieldValue("photos", values.concat(photos))
        });
      }}>
        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
          if (isDragActive) {
            return <div className="upload-background file-authorized"/>;
          }

          if (isDragReject) {
            return <div className="upload-background file-not-authorized"/>;
          }

          if (this.state.error) {
            return <div className="upload-background file-not-authorized">
              <div className='error-text'>Error occurred on the server, please try again later</div>
            </div>;
          }

          if (values.length === 0) {
            return <div className="add-photo-icon">+</div>
          }

          return values.map((file, i) => {
            return <div key={i} className="dropzone-image-container">
              <img  src={file.url} alt=''/>
            </div>
          });
        }}
      </Dropzone>
    )
  }
};

export default PhotosDropzone;