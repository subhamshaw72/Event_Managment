import React, { useState } from "react";
import axios from 'axios';
 import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function About() {
    const [name, setName] = useState('');
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
           
            image,
            image_id: imageId
        };

        try {
            const response = await axios.post('https://event-managment-admin-backend-1.onrender.com/Aboutserver/upload_About', product, {
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
            <h1 className="my-4">Upload New Product</h1>
            <form>
                <div className="form-group">
                    <label>Enter  Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Enter Product Description:</label>
                    <input type="text" className="form-control" onChange={(e) => setDesc(e.target.value)} />
                </div>
               
                <div className="form-group">
                    <label>Select Product Image:</label>
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

export default About;
