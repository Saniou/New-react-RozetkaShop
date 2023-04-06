import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button, Form, Spinner, InputGroup} from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider'
import { Link, useNavigate } from '@reach/router'
import ImgLogo from '../Image/logo.png'
import {AiOutlineUser} from 'react-icons/ai'
import {VscKey} from 'react-icons/vsc'
import axios from 'axios'
import {Icon} from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [theme] = useThemeHook();
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
    }
    
    const [input, setInput] = useState({
      email: "", 
      password: ""}
      )

      const submit = (e) => {
        e.preventDefault();
        const logger = JSON.parse(localStorage.getItem("user"));
        if(input.email === logger.email && input.password === logger.password) {
          localStorage.setItem("login", true)
          navigate("/") //------------------------------------------------------------------
        } else {
          alert("Login uncorrect")
        }
      };
    
    // const handleSubmit = (event)=>{
    //     const form = event.currentTarget;
    //     event.preventDefault();
    //     const username = form.username.value;
    //     const password = form.password.value;
    //     if(username && password){
    //         setLoading(true);
    //         fetch('https://fakestoreapi.com/auth/login',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body:JSON.stringify({
    //                 username: username,
    //                 password: password
    //             })
    //         }).then(res=>res.json())
    //         .then(json=>sessionStorage.setItem("token", json.token))
    //         .catch(error=> console.error(error))
    //         .finally(()=>{
    //             setLoading(false);
    //             navigate('/', {replace: true})
    //             alert('Login successfully');
    //         })
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
            <Form 
            onSubmit={submit}
            // onSubmit={handleSubmit} 
            style={{justifyContent: 'center'
        }}>
                <InputGroup className="mb-4 mt-5" >
                    <InputGroup.Text style={{width: '377px'}}>
                        <InputGroup.Text>
                        <AiOutlineUser size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control name="email" type="text" placeholder='Email' required
                    value={input.email}
                    onChange={(e) => setInput({
                        ...input,
                        [e.target.name]: e.target.value
                    })}
                    />
                   
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-4" >
                    <InputGroup.Text style={{width: '377px'}}>
                    <InputGroup.Text>
                        <VscKey size='1.2rem'/>
                        </InputGroup.Text>
                    <Form.Control name="password"
                    placeholder='Password' minLength={6} required
                    type={type}
                    value={input.password}
                        onChange={(e) => setInput({
                            ...input,
                            [e.target.name]: e.target.value
                        })}
                    />
                    
                    </InputGroup.Text>
                    <span className="OpenEyeLogin" style={{position: 'relative', cursor: 'pointer', right: '-290px', top: '-40px', }} onClick={handleToggle}>
                        <Icon className="EyeIcon" icon={icon}/>
                    </span>
                </InputGroup>
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
                    </> : 'Login'
                    }
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