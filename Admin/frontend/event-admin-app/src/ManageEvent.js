import React, { useEffect, useState } from 'react'
import './App.css'
import {useNavigate} from 'react-router-dom';


const ManageEvent = () => {
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')

    const navigate = useNavigate(); 

    const getAllProducts = async () =>{
        const response = await fetch('https://event-managment-admin-backend-1.onrender.com/Manage/getAllProducts');
        const data = await response.json()

        console.log(10, data)

        setProducts(data)
    }

    useEffect(() =>{
        getAllProducts()
    }, [])

    const editProduct = (pid) =>{
        navigate('/updateProduct', {state: {"pid": pid}});
    }

    const deleteProduct = async(id) =>{
        if(window.confirm('Are you sure you want to delete'))
        {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };
    
            const response = await fetch(`https://event-managment-admin-backend-1.onrender.com/Manage/delete_product/${id}`, requestOptions);
            const data = await response.json();
        
            window.location.href = ""; 
    
            setMessage(data.message)
        }
    }

  return (
    
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <table className="table table-image">
                    <thead>
                    <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Event Name</th>
                        <th scope="col">Event Price</th>
                        <th scope="col">Action</th>
                    </tr>
		            </thead>
          <tbody>
      {
        products.map((product, index) =>
            <tr>
                <th scope="row">{index+1}</th>
                <td className="w-25">
                    <img src={product.image} class="img-fluid img-thumbnail" alt="Sheep" width="20%"/>
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <button className="btn btn-primary m-2" onClick={(e) => editProduct(product._id)}>Edit</button>
                    <button className="btn btn-danger m-2" onClick={(e) => deleteProduct(product._id)}>Delete</button>
                </td>
            </tr>
        )
      }
                    </tbody>
                </table>   
            </div>
        </div>
        </div>
   
  )
}

export default ManageEvent