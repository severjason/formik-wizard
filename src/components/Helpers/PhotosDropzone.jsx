import React from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';

const PhotosDropzone = (props) => {
	//console.log(props);
	const values = props.field.value;
	//console.log(values);
	return (
		<Dropzone className="dropzone-container"  accept="image/*" onDrop={(acceptedFiles) => {
			// do nothing if no files
			if (acceptedFiles.length === 0) { return; }
			console.log(acceptedFiles);
			axios.post('restaurant_owner/photos_upload', acceptedFiles);
			// on drop we add to the existing files
			//setFieldValue("files", values.files.concat(acceptedFiles));
		}}>
			{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
				if (isDragActive) {
					return <div className="upload-background file-authorized"/>;
				}

				if (isDragReject) {
					return <div className="upload-background file-not-authorized"/>;
				}

				if (values.length === 0) {
					return <div className="add-photo-icon">+</div>
				}

				return values.map((file, i) => {
					//console.log(file);
					return <div key={i} className="dropzone-image-container">
            <img  src={file.file.url} alt=''/>
					</div>
				});
			}}
		</Dropzone>
	)
};

export default PhotosDropzone;