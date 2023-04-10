import React, {useState} from 'react'
import {Container, Row, Col, Button, Form, InputGroup} from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider'
import { Link, navigate  } from '@reach/router'
import axios from 'axios'

import ImgLogo from '../Image/logo.png'
import {AiOutlineUser} from 'react-icons/ai'
import {VscKey} from 'react-icons/vsc'
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

const Login = ({ setLoginUser}) => {
    const [theme] = useThemeHook();
    
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
    }
    
    const [user, setUser] = useState({
      email: "", 
      password: ""}
      )
      
      const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:9003/login", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/")
        })
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
            style={{justifyContent: 'center'
        }}>
                <InputGroup className="mb-4 mt-5" >
                    <InputGroup.Text style={{width: '377px'}}>
                        <InputGroup.Text>
                        <AiOutlineUser size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control name="email" type="text" placeholder='Email' required
                    value={user.email}
                    onChange={handleChange}
                    />
                   
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-4" >
                    <InputGroup.Text style={{width: '377px'}} >
                    <InputGroup.Text >
                        <VscKey size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control name="password" 
                    placeholder='Password' minLength={6} required
                    type={type}
                    value={user.password}
                    onChange={handleChange}
                    />
                    <span className="OpenEyeLogin"  style={{cursor: 'pointer', margin: '10px', marginRight: '5px'}} onClick={handleToggle}>
                    <Icon className="EyeIcon" size='1.1rem' icon={icon}/>
                    </span>
                    </InputGroup.Text>
                </InputGroup>
                
                <Button type='submit' style={{border: 0,}} 
                // disabled={loading}
                onClick={login}
                className={`${theme ? 'bg-dark-primary text-black' : 'bg-light-primary'} m-auto d-block`}>
                    Login
                </Button>
                
                <Form.Group className='mt-3 text-center'>
                    <Form.Text className='text-muted fw-bold'>
                    Sign up if you don't have an account yet.
                    </Form.Text>
                    <Row className='py-2 border-bottom mb-3'/>
                    <Link to="/register" className={`text-center pb-3 ${theme ? 'text-light' : 'text-dark'} btn btn-`}>
                    Create your account
                    </Link>
                </Form.Group>
            </Form>
            
            </Col>
        </Row>
    </Container>
  )
}

export default Login