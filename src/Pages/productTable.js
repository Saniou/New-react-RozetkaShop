import React, {useState, useEffect} from 'react'
import ModalAdd from '../components/modal/ModalAdd';
import './css/productTable.css'
import {AiOutlinePlus} from 'react-icons/ai';
import {Button, Form} from 'react-bootstrap'
import axios from 'axios';

const ProductTable = () => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
  const[modalActive, setModalActive] = useState(false)
  
  const[_id, setId] = useState('')
  const[category, setCategory] = useState('')
  const[name, setName] = useState('')
  const[quantity, setQuantity] = useState('')
  const[price, setPrice] = useState('')
  const[employees, setUsers] = useState([])
  
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    const result = await axios.get("http://localhost:8000/user/getAll",{
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    setUsers(result.data.data);
    console.log(result.data);
  }
 
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/create", {
        name: name,
        category: category,
        quantity: quantity,
        price: price,
      },
      );
      alert("Employee Registation Successfully");
      setId("");
      setName("");
      setCategory("");
      setQuantity("");
      setPrice("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editEmployee(employees) {
    setName(employees.name);
    setCategory(employees.category);
    setQuantity(employees.quantity);
    setPrice(employees.price)
 
    setId(employees._id);
  }
 
  async function DeleteEmployee(_id) {
    await axios.delete("http://localhost:8000/user/delete/" + _id);
    alert("Employee deleted Successfully");
    Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:8000/user/update/" +
          employees.find((u) => u._id === _id)._id || _id,
        {
          _id: _id,
          name: name,
          category: category,
          quantity: quantity,
          price: price,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setCategory("");
      setQuantity("");
      setPrice("");
      Load();
    } catch (err) {
      alert(err);
    }
  }
  
  
  return (
    <>
    <div className='containerBtn'>
    <button className='modalBtnAdd' 
    onClick={() => setModalActive(true)}>
      <AiOutlinePlus className='addIcon' size={'1.3rem'}/>
      Add Product
      </button>
    </div>
    
    <div className='contentContainer'>
      <h1>Products</h1>
    </div>
        
    <ModalAdd active={modalActive} setActive={setModalActive}>
      <h1>Add product</h1>
    <Form>
      
    <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter ID"
        id='id'
        value={_id} 
        onChange={(event) => {setId(event.target.value)}}
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category"
        id='email'
        value={category} 
        onChange={(event) => {setCategory(event.target.value)}}
        />
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" 
        id='name'
        value={name} 
        onChange={(event) => {setName(event.target.value)}}
        />
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" placeholder="Enter Quantity" 
        id='quantity'
        value={quantity} 
        onChange={(event) => {setQuantity(event.target.value)}}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price(₴)</Form.Label>
        <Form.Control type="text" placeholder="Enter Price" 
        id='Price'
        value={price} 
        onChange={(event) => {setPrice(event.target.value)}}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={save}>
        Submit
      </Button>
      <Button variant="danger" type="submit" style={{marginLeft: '10px'}}
      onClick={() => setModalActive(false)}>
        Cancel
      </Button>
    </Form>
    </ModalAdd>
    
    <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Employee Address</th>
            <th scope="col">Employee Mobile</th>
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {employees.map(function fn(employee) {
          return (
            <tbody>
              <tr>
                <th scope="row">{employee._id} </th>
                <td>{employee.name}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  )
}

export default ProductTable