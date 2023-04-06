import React, {useState} from 'react'
import {Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider'
import ImgLogo from '../Image/logo.png'
import PhoneInput from 'react-phone-input-2'
import { useNavigate } from '@reach/router'

import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [number, setNumber] = useState(null)
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
    
    const [input, setInput] = useState(
      {
      email: "", 
      password: ""}
      )

    const submit = (e) => {
      e.preventDefault();
      localStorage.setItem("user", JSON.stringify(input))
      setLoading(true);
      alert('Register Success')
      navigate("/login")
    };
    
    
    // const handleSubmit = (event)=>{
    //     const form = event.currentTarget;
    //     event.preventDefault();
    //     const username = form.username;
    //     const password = form.password;
    //     const email = form.email;
    //     const phoneNumber = form.phoneNumber;
    //     if(username && password && email && phoneNumber){
    //         setLoading(true);
    //     }
    // }
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
            <Form onSubmit={submit}
                //onSubmit={handleSubmit}
            style={{justifyContent: 'center'}}>    
                <Row>
                    <Form.Group className='mb-3 mt-3 col-lg-6'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type="email" placeholder='Email' required 
                        value={input.email}
                        onChange={(e) => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3 mt-3 col-lg-6'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name='username' type="text" placeholder='User Name' required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <PhoneInput country={'ua'} value={number}
                        onChange={phone => setNumber(phone)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type={type} placeholder='Password...' 
                        required 
                        value={input.password}
                        onChange={(e) => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                        />
                         <span className="OpenEyeRegister" style={{position: 'relative', cursor: 'pointer', right: '-300px', top: '-33px', }}  onClick={handleToggle}>
                        <Icon className="EyeIcon" size='1.2rem' icon={icon}/>
                    </span>
                    </Form.Group>
                </Row>
            
                <Button type='submit' style={{border: 0}} disabled={loading}
                className={`${theme ? 'bg-dark-primary text-black' : 'bg-light-primary'} m-auto d-block`}>
                    {loading ? 
                    <>
                    <Spinner 
                    as="span"
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden="true"
                     />
                     &nbsp;Loading...
                    </> : 'Register'
                    }
                </Button>
    
            </Form>
            
            </Col>
    
        </Row>
    
    </Container>
  )
}

export default Register