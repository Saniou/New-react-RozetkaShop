import React, {useContext, useState, useEffect} from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap'
import { ThemeContext } from '../GlobalComponents/ThemeProvider'
import { GiElectricalSocket } from 'react-icons/gi'
import { BiSun, BiMoon, BiCart } from 'react-icons/bi'
import { Link } from '@reach/router'
import { useCart } from 'react-use-cart'
import ImgLogo from '../Image/logo.png'

const Header = () => {
    
    const {theme, setThemeMode} = useContext(ThemeContext)
    const [darkMode, setDarkMode] = useState(theme)
    
    useEffect(() => {
    
        setThemeMode(darkMode)
        
    }, [darkMode])
    
    const { isEmpty, totalItems} = useCart();
    
  return(
    <Navbar collapseOnSelect expand="md"
            variant={darkMode ? 'dark' : 'light'}
            className={darkMode ? 'bg-light-black border-bottom' : 'bg-light border-bottom'}
            style = {{width: '100%', position: 'fixed', zIndex: 100}}
    >
    <Container>
        
        <Link to="/">
        <Navbar.Brand  className={darkMode ? 'text-dark-primary' : 'text-light-primary'}>
        <img src={ImgLogo} className={darkMode ? 'bg-black-logo-darkMode' : 'bg-black-logo'} style={{marginRight: '10px'}} alt='/' />
        {/* <GiElectricalSocket size="1.1rem" style={{position: 'relative', bottom: '2', right: '3'}}/> */}
        <b style={{textDecoration: 'none', border: 0}}>ROZETKA</b>
      </Navbar.Brand>
        </Link>
        
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            className={darkMode ? 'text-dark-primary' : 'text-light-primary'}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <BiSun size='1.7rem'/> : <BiMoon size='1.7rem'/>}
          </Nav.Link>
          <Link to = "/cart"
          className={`${darkMode ? 'text-dark-primary' : 'text-light-primary'} d-flex align-items-center`}
          >
            <BiCart size='2rem'/>
            {!isEmpty && <span style={{ position: 'relative', left:'-21px', top: '-18px' }}>
                {totalItems}</span>}
                <span style={{marginLeft: !isEmpty ? '-13px' : 0}}>Cart</span>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;