import React, {useState} from 'react'
import Papa from "papaparse"


const FileUploadPage = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler = (event) => {
		
		const files = event.target.files
		console.log(files)
		if (files) {
		  Papa.parse(files[0], {
			complete: function(results) {
			  console.log("Finished:", results.data)
				// Example POST method implementation:
				// async function postData(url = '', data = results.data) {
				// 	// Default options are marked with *
				// 	const response = await fetch(url, {
				// 	method: 'POST', // *GET, POST, PUT, DELETE, etc.
				// 	mode: 'cors', // no-cors, *cors, same-origin
				// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				// 	credentials: 'same-origin', // include, *same-origin, omit
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 		// 'Content-Type': 'application/x-www-form-urlencoded',
				// 	},
				// 	redirect: 'follow', // manual, *follow, error
				// 	referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				// 	body: JSON.stringify(data) // body data type must match "Content-Type" header
				// 	});
				// 	return response.json(); // parses JSON response into native JavaScript objects
				// }
  
				
			}}
		  )
		}

		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile)

		console.log(selectedFile)

		// fetch(
		// 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 	}
		// )
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});
	}
	// const handleSubmission = () => {
	// 	const formData = new FormData();

	// 	formData.append('File', selectedFile);

	// 	fetch(
	// 		'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
	// 		{
	// 			method: 'POST',
	// 			body: formData,
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			console.log('Success:', result);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// }

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default FileUploadPage