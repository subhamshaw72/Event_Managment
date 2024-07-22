import React, { useState } from "react";
import axios from 'axios';
 import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AddEvent() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [imageId, setImageId] = useState('');
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        setUploading(true); // Start loading
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'guzlvbm5'); // Replace with your actual upload preset

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dgxez4jic/upload',
                formData
            );

            console.log("response: ", res.data);
            setImage(res.data.secure_url);
            setImageId(res.data.public_id);
        } catch (error) {
            console.error('Error uploading image: ', error);
        } finally {
            setUploading(false); // Stop loading
        }
    };

    const uploadProduct = async () => {
        const product = {
            name,
            desc,
            price,
            image,
            image_id: imageId
        };

        try {
            const response = await axios.post('http://localhost:8000/Manage/upload_product', product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            
            if (data._id) {
                setMessage("Uploaded Successfully");
            } else {
                setMessage("Failed");
            }

            // Optionally reload the page or reset the form
            window.location.reload();
        } catch (error) {
            console.error('Error uploading product:', error);
            setMessage('Failed to upload product');
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="my-4">Upload New Event</h1>
            <form>
                <div className="form-group">
                    <label>Enter Event Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Enter Event Description:</label>
                    <input type="text" className="form-control" onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Enter Event Price:</label>
                    <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Select Event Image:</label>
                    <input type="file" className="form-control-file" onChange={handleImageUpload} />
                </div>
                {uploading ? (
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Uploading...
                    </button>
                ) : (
                    image && <button type="button" className="btn btn-success" onClick={uploadProduct}>Upload</button>
                )}
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}

export default AddEvent;
