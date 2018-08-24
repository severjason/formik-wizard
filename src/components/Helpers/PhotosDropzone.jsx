import React from 'react'
import Dropzone from 'react-dropzone';

const PhotosDropzone = (props) => {
	//console.log(props);
	const values = props.field.value;
	//console.log(values);
	return (
		<Dropzone accept="image/*" onDrop={(acceptedFiles) => {
			// do nothing if no files
			if (acceptedFiles.length === 0) { return; }
			//console.log(acceptedFiles);
			// on drop we add to the existing files
			//setFieldValue("files", values.files.concat(acceptedFiles));
		}}>
			{({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
				if (isDragActive) {
					return "This file is authorized";
				}

				if (isDragReject) {
					return "This file is not authorized";
				}

				if (values.length === 0) {
					return <p>Try dragging a file here!</p>
				}

				return values.map((file, i) => {
					//console.log(file);
					return <img key={i} src={file.file.url} alt=''/>
				});
			}}
		</Dropzone>
	)
};

export default PhotosDropzone;