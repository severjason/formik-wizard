import React from 'react'
import Dropzone from 'react-dropzone';

class PhotosDropzone extends React.Component {

  state = {
    error: null,
    defaultPhotoId: null,
    maxFiles: 4,
  };

  clearErrors = () => this.setState({error: null});

  handleDelete = (file, onImageDelete, setFieldValue, values) => {
    onImageDelete(file).then(() => {
      setFieldValue('photos', values.filter((f) => f.id !== file.id))
    })
  }

  showError = (error) =>
    <div className="error-container" onClick={this.clearErrors}>
      <div className='error-text'>
        {error}
      </div>
    </div>;


  render() {
    const setFieldValue = this.props.form.setFieldValue;
    const {defaultPhotoId, error, maxFiles} = this.state;
    const values = this.props.field.value;
    const onPhotosUpload = this.props[0];
    const onImageDelete = this.props[1];
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
          const upload = async (values) => {
            const newValues = values;
            for (const file of acceptedFiles) {
              await onPhotosUpload(file, defaultPhotoId)
                .then(responce => newValues.push(responce.data))
                .catch((error) => this.setState({error: error.message}));
            }
            setFieldValue("photos", newValues.slice(0, maxFiles));
          };
          return upload(values);
        }}>
        {() => {
          if (error && values.length === 0) return this.showError(error);
          if (values.length === 0) {
            return <div onClick={() => dropzoneRef.open()} className="add-photo-icon">+</div>
          }
          return <React.Fragment>
            {(error) &&
            <div className="error-container" onClick={this.clearErrors}>
              <div className='error-text'>
                {error}
              </div>
            </div>
            }
            <div className="inner-container" onClick={() => dropzoneRef.open()}/>
            {(error) && this.showError(error)}
            {values.map((file, i) => {
              return <div key={i} className={`dropzone-image-container ${file.id === defaultPhotoId ? 'title' : ''}`}>
                <div
                  className="dropzone-action close-icon"
                  onClick={() => this.handleDelete(file, onImageDelete, setFieldValue, values)}>delete
                </div>
                <img src={file.url} alt=''/>
                <div
                  className="dropzone-action set-default"
                  onClick={() => this.setState({defaultPhotoId: file.id})}
                >
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
