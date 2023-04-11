import React, {useState, useEffect} from 'react'
import ModalAdd from '../components/modal/ModalAdd';
import ModalDelete from '../components/modal/ModalDelete';
import ModalEdit from '../components/modal/ModalEdit';
import './css/productTable.css'
import {AiOutlinePlus, AiOutlineEdit, AiFillDelete} from 'react-icons/ai';
import {Button, Form} from 'react-bootstrap'
import axios from 'axios';

const ProductTable = () => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
  const[modalActive, setModalActive] = useState(false)
  const[modalDelActive, setModalDelActive] = useState(false)
  const[modalEditActive, setModalEditActive] = useState(false)
  
  const[_id, setId] = useState('')
  const[category, setCategory] = useState('')
  const[name, setName] = useState('')
  const[quantity, setQuantity] = useState('')
  const[price, setPrice] = useState('')
  const[employees, setUsers] = useState([])

 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  // async function Load() {
  //   const result = await axios.get("http://localhost:8000/user/getAll",{
  //     headers: {
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   });
  //   setUsers(result.data.data);
  //   console.log(result.data);
  // }
  
  async function Load() {
    try {
      const result = await axios.get("http://localhost:8000/user/getAll",{
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      setUsers(result.data.data);
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }
 
  async function save(event) {
    event.preventDefault();
    if (!name || !category || !quantity || !price) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/user/create", {
        name: name,
        category: category,
        quantity: quantity,
        price: price,
      });
      alert("Employee Registration Successfully");
      setId("");
      setName("");
      setCategory("");
      setQuantity("");
      setPrice("");
      Load();
    } catch (err) {
      alert("User Registration Failed");
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
    // alert("Employee deleted Successfully");
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
      alert("Registration Updated");
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
      
    {/* <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter ID"
        id='id'
        value={_id} 
        onChange={(event) => {setId(event.target.value)}}
        />
      </Form.Group> */}
      
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
        <Form.Control type="text" step="1" placeholder="Enter Price" 
        id='Price'
        value={price} 
        onChange={(event) => {setPrice(event.target.value.replace(/[^0-9]/g, ''))}}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={save}>
        Submit
      </Button>
      <Button variant="danger" type="submit" style={{marginLeft: '10px'}}
      onClick={(e) => {e.preventDefault(); setModalActive(false)}}>
        Cancel
      </Button>
    </Form>
    </ModalAdd>
    
    <ModalEdit active={modalEditActive} setActive={setModalEditActive}>
      <h1>Edit data product</h1>
    <Form>
      
    {/* <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter ID"
        id='id'
        value={_id} 
        onChange={(event) => {setId(event.target.value)}}
        />
      </Form.Group> */}
      
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
        <Form.Control type="text" step="1" placeholder="Enter Price" 
        inputMode="numeric"
        id='Price'
        value={price} 
        onChange={(event) => {setPrice(event.target.value.replace(/[^0-9]/g, ''))}}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={update}>
        Submit
      </Button>
      <Button variant="danger" type="submit" style={{marginLeft: '10px'}}
      onClick={(e) => {e.preventDefault(); setModalEditActive(false)}}>
        Cancel
      </Button>
    </Form>
    </ModalEdit>
    
    <ModalDelete active={modalDelActive} setActive={setModalDelActive}>
    <div>
      <h4>Are you sure you want to delete the product?</h4>
      <Button variant="primary" type="submit" onClick={() => DeleteEmployee() && setModalDelActive(false)}>
        Submit
      </Button>
      <Button variant="danger" type="submit" style={{marginLeft: '10px'}}
      onClick={(e) => {e.preventDefault(); setModalDelActive(false)}}>
        Cancel
      </Button>
    </div>
    </ModalDelete>
    
    <table className="tableProduct" align="center">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price (₴)</th>
          </tr>
        </thead>
        {employees.map(function fn(employee, index) {
          
          return (
            <tbody key={employee._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <tr>
                <th scope="row">{employee._id} </th>
                <td>{employee.category}</td>
                <td>{employee.name}</td>
                <td>{employee.quantity}</td>
                <td>{employee.price}</td>
                <td>
                  <button className='btnEditDelete'>
                    <AiOutlineEdit size="1.3rem"
                  onClick={() => editEmployee(employee) && setModalEditActive(true)}
                  />
                  </button>
                  <button className='btnEditDelete'>
                    <AiFillDelete size="1.3rem"
                  onClick={() => setModalDelActive(true)}
                  />
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