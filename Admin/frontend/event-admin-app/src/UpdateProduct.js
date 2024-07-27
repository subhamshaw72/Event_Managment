import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const [pid, setPid] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [image_id, setImage_id] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false); // State for showing upload progress
  const [updating, setUpdating] = useState(false); // State for showing update progress

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.state.pid;
    setPid(id);
    getProductDetails(id);
  }, []);

  const getProductDetails = async (id) => {
    try {
      const res = await fetch(`https://event-managment-admin-backend-1.onrender.com/Manage/getProductById/${id}`);
      const data = await res.json();
      setName(data.name);
      setPrice(data.price);
      setDesc(data.desc);
      setImage(data.image);
      setImage_id(data.image_id);
    } catch (error) {
      console.error('Error fetching product details: ', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'guzlvbm5'); // Replace 'your_upload_preset' with your actual upload preset

    try {
      setUploading(true); // Start uploading

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dgxez4jic/image/upload',
        formData
      );

      setImage(res.data.secure_url);
      setImage_id(res.data.public_id);

      setUploading(false); // Finish uploading
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false); // Finish uploading in case of error
    }
  };

  const upload = async () => {
    setUpdating(true); // Start updating
    const product = {
      name: name,
      desc: desc,
      price: price,
      image: image,
      image_id: image_id
    };

    try {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      };

      const response = await fetch(`https://event-managment-admin-backend-1.onrender.com/Manage/updateProduct/${pid}`, requestOptions);
      const data = await response.json();

      if (data._id != null) {
        navigate('/ManageEvent');
      } else {
        setMessage("Failed");
        setUpdating(false); // Stop updating in case of error
      }
    } catch (error) {
      console.error('Error updating product: ', error);
      setMessage("Failed");
      setUpdating(false); // Stop updating in case of error
    }
  };

  return (
    <div className="container-fluid">
      <h1>Update Event Details</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Enter Event Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Event Description:</label>
          <textarea className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Event Price:</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Event Image:</label>
          <input type="file" className="form-control" onChange={handleImageUpload} />
        </div>
        {image && (
          <div className="mb-3">
            <img src={image} alt="Product" style={{ maxWidth: '12%', height: '50%' }} />
          </div>
        )}
        {uploading ? (
          <button className="btn btn-primary" type="button" disabled>
            Uploading...
          </button>
        ) : (
          image && (
            <button className="btn btn-primary" type="button" onClick={upload} disabled={updating}>
              {updating ? 'Updating...' : 'Update'}
            </button>
          )
        )}
        {message && <p className="text-danger">{message}</p>}
      </form>
    </div>
  );
}

export default UpdateProduct;
