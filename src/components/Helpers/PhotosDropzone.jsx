import React    from 'react'
import Dropzone from 'react-dropzone';

class PhotosDropzone extends React.Component {

  state = {
    error: null,
    defaultPhotoId: '',
  };

  handleImageDelete = (id) => {
    console.log(id);
  }

  render() {
    const setFieldValue = this.props.form.setFieldValue;
    const {defaultPhotoId, error} = this.state;
    const values = this.props.field.value;
    const onPhotosUpload = this.props[0];
    let dropzoneRef = null;
    return (
      <Dropzone
        className="dropzone-container"
        disablePreview
        disableClick
        accept="image/*"
        ref={(node) => {
          dropzoneRef = node;
        }}
        onDrop={(acceptedFiles) => {

          // do nothing if no files
          if (acceptedFiles.length === 0) {
            return;
          }
          this.setState({error: null});
          const uploaders = acceptedFiles.map(file => {
            return onPhotosUpload(file)
              .then(response => response.data)
              .catch(error => this.setState({error}))
          });

          Promise.all(uploaders).then((photos) => {
            setFieldValue("photos", values.concat(photos))
          });
        }}>
        {({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
          if (isDragActive) {
            return <div className="upload-background file-authorized"/>;
          }

          if (isDragReject) {
            return <div className="upload-background file-not-authorized"/>;
          }

          if (error) {
            return <div className="upload-background file-not-authorized">
              <div className='error-text'>Error occurred on the server, please try again later</div>
            </div>;
          }

          if (values.length === 0) {
            return <div onClick={() => dropzoneRef.open()} className="add-photo-icon">+</div>
          }

          return <React.Fragment>
            <div className="inner-container" onClick={() => dropzoneRef.open()}/>
            {values.map((file, i) => {
              return <div key={i} className={`dropzone-image-container ${file.id === defaultPhotoId ? 'title': ''}` }>
                <div className="dropzone-action close-icon" onClick={() => this.handleImageDelete(file.id)}>Delete</div>
                <img src={file.url} alt=''/>
                <div className="dropzone-action set-default" onClick={() => this.setState({defaultPhotoId: file.id})}>
                  {file.id === defaultPhotoId ? <div className='title'>Title</div> : <div>Set as title</div>}
                </div>
              </div>
            })}
          </React.Fragment>
        }}
      </Dropzone>
    )
  }
}

export default PhotosDropzone;