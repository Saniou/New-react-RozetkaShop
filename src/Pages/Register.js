import React, {useState} from 'react'
import {Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider'
import { useNavigate } from '@reach/router'
import axios from 'axios'

import ImgLogo from '../Image/logo.png'
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {VscKey} from 'react-icons/vsc'

const Register = () => {
    const [theme] = useThemeHook()
    
    const navigate = useNavigate();
    
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };
    
    const [user, setUser] = useState(
      {
      email: "", 
      userName: "",
      password: "",
      rePassword: "",
    }
      )
      
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    
    const register = (e) =>{
        e.preventDefault();
        const {userName, email, password, rePassword} = user
        if(userName && email && password && (password === rePassword)){
            axios.post("http://localhost:9003/register", user)
            navigate("/login")
            .then(res => console.log(res))
        } else {
            alert('invalid')
        }
    }
    
  return (
    
    <Container className='py-5 mt-5'>
        <Row className='justify-content-center mt-5'>
            <Col xs={11} sm={10} md={8} lg={4} className={`p-4 rounded ${theme ? 'text-light bg-dark' : 'text-black bg-light'}`}>
            <div className={'text-center border-bottom'}>
                <div
                className={`text-center pb-3 ${theme ? 'text-dark-primary' : 'text-light-primary'}`} style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                <img src={ImgLogo} alt='/'
                className={`${theme ? 'bg-black-logo-darkMode' : 'bg-black-logo'}`} 
                style={{width: 'auto', height:'50%', marginRight: '10px'}}/> 
                <h1 style={{fontSize: '25px', position: 'relative', top: '5px'}}>ROZETKA</h1>
                </div>
            </div>
            <Form 
            style={{justifyContent: 'center'}}>    
                <Row>
                    <Form.Group className='mb-3 mt-3 col-lg-6'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type="email" placeholder='Email' required 
                        value={user.email}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3 mt-3 col-lg-6'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name='userName' type="text" placeholder='User Name'
                        value={user.userName}
                        onChange={handleChange}
                        required />
                    </Form.Group>
                <InputGroup className="mb-4" >
                    <InputGroup.Text style={{width: '377px'}} >
                    <InputGroup.Text >
                        <VscKey size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control 
                    name="password" 
                    placeholder='Password' 
                    minLength={6} required
                    type={type}
                    value={user.password}
                    onChange={handleChange}
                    />
                    <span className="OpenEyeLogin"  style={{cursor: 'pointer', margin: '10px', marginRight: '5px'}} onClick={handleToggle}>
                    <Icon className="EyeIcon" size='1.1rem' icon={icon}/>
                    </span>
                    
                    </InputGroup.Text>
                </InputGroup>
                
                <InputGroup className="mb-4" >
                    <InputGroup.Text style={{width: '377px'}} >
                    <InputGroup.Text >
                        <VscKey size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control 
                    name="rePassword" 
                    placeholder='Re-Enter Password' 
                    minLength={6} required
                    type={type}
                    value={user.rePassword}
                    onChange={handleChange}
                    />
                    <span className="OpenEyeLogin"  style={{cursor: 'pointer', margin: '10px', marginRight: '5px'}} onClick={handleToggle}>
                    <Icon className="EyeIcon" size='1.1rem' icon={icon}/>
                    </span>
                    
                    </InputGroup.Text>
                </InputGroup>
                
                </Row>
            
                <Button type='submit' style={{border: 0}} 
                onClick={register}
                className={`${theme ? 'bg-dark-primary text-black' : 'bg-light-primary'} m-auto d-block`}>Register</Button>
    
            </Form>
            
            </Col>
    
        </Row>
    
    </Container>
  )
}

export default Register