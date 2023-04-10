import React, { useState, useEffect } from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider'
import Lightbox from 'react-lightbox-component'
import 'react-lightbox-component/build/css/index.css'
import './css/productDetails.css'
import { useCart } from 'react-use-cart'

const ProductDetails = (props) => {
  const [productData, setProductData] = useState([])
  const [theme] = useThemeHook()
  const { addItem } = useCart()
  
  useEffect(() => {
    getResponse();
    
  }, [])
  
  const getResponse = async() =>{
    const res = await fetch(`https://fakestoreapi.com/products/${props.productId}`)
    .then(res => res.json())
    setProductData(await res)
  }
      console.log(productData)
  return (
    <>
  <Container className='py-5'>
    <Row className='justify-content-center mt-5'>
      <Col className='p-0' xs={10} md={7} lg={5}>
        <Lightbox 
        images={[
          {
          src: productData.image,
          title: productData.title,
          description: productData.name
        },
      ]}
        />
      </Col>
      <Col xs={10} md={7} lg={7} className={`${theme ? 'text-light' : 'text-black'} product-details`} style={{}}>
      <h1>{productData.title}</h1>
      <br/>
      <Button onClick={() => addItem(productData)} className={`${theme? 'bg-dark-primary text-black' : 'bg-light-primary'}`} style={{borderRadius: 0, border: 0}}>
        Add to cart
      </Button>
      <br/>
      <b className={`${theme? 'text-dark-primary text-black' : 'text-light-primary'} h4 ,t-3 d-block`}
      style={{}}>
        $ {productData.price}
      </b>
      <br/>
      <div className='mt-3 h5' style={{opacity: '0.8', fontWeight: '400', fontSize: '24px'}}>{productData.description}</div>
      </Col>
    </Row>
  </Container>
  </>
  )
}

export default ProductDetails