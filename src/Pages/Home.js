import React, {useState, useEffect} from 'react'
import {Container, Row, Col, InputGroup, FormControl} from 'react-bootstrap'
import {useThemeHook} from '../GlobalComponents/ThemeProvider'
import SearchFilter from  'react-filter-search'
import ProductCard from '../components/ProductCard'

import {BiSearch} from 'react-icons/bi'

const Home = () => {
    
    const [theme] = useThemeHook()
    const [searchInput, setSearchInput] = useState('')
    const [productData, setProductData] = useState([])
    
    async function getResponse() {
        const res = await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        setProductData(await res)
    }

    useEffect(() => {
        getResponse()
        console.log(productData)
    }, [])
    
    return (

        <Container className='py-4'>
            <Row className='justify-content-center'>
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-a to text-center">
                    <h1
                        className={theme
                            ? 'text-light my-5'
                            : 'text-black my-5'}>Products Search</h1>
                    <InputGroup className="mb-3">
                        
                        <InputGroup.Text className={theme ? 'bg-black text-dark-primary' : 'bg-light text-light-primary'}>
                            <BiSearch size="1.3rem"
                            className={theme ? 'bg-black text-dark-primary' : 'bg-light text-light-primary'}/>
                        </InputGroup.Text>
                        
                        <FormControl
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className={theme ? 'bg-light-black text-light' : 'bg-light text-light-primary'} />
                    </InputGroup>
                </Col>
                
                <SearchFilter
                    value={searchInput}
                    data={productData}
                    renderResults={ results =>(
                        <Row className='justify-content-center'>
                            {results.map((item)=>(
                                    <ProductCard key={item.id} data={item}/>
                                ))}
                        </Row>
                    )
                        
                    }
                />
                
            </Row>
        </Container>

    )
}

export default Home