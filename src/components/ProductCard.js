import React from 'react'
import { Button, Card} from 'react-bootstrap'
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { useCart } from 'react-use-cart'
import {BsCartPlus} from 'react-icons/bs'
import { Link } from '@reach/router';

const ProductCard = (props) => {
    let {image, price, title, id} = props.data
    const [theme] = useThemeHook();
    const {addItem} = useCart();
    
    const addToCart = () => {
        addItem(props.data)
    }
    
  return (
    <Card 
    style={{ width: '18rem', height: 'auto' }}
    className={` ${theme ? 'bg-light-black text-light' : 'bg-light text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}>
      
      <Link to={`/product-details/${id}`}>
              <div style={{background: 'white', height: '15rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 'inherit'}}>
            <div style={{width: '9rem'}}>
                <Card.Img variant="top" src={image} className="img-fluid"/>
            </div>
        </div>
      </Link>
      
      <Card.Body>
        <Card.Title style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {title}
            </Card.Title>
            
        <Card.Title style={{color: 'green'}}>
            $ <span className='h3'>{price}</span>
        </Card.Title>
        
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
        <Button 
            onClick={() => addToCart()}
            className={` ${theme ? 'bg-dark-primary text-black' : 'bg-light-primary text-light'} d-flex align-items-center m-auto border-0 `}>
             Add to Cart 
             <BsCartPlus size='1.1rem' 
             style={{position: 'relative', bottom: '1', right: '-3'}}/> 
             </Button>
             
      </Card.Body>
      
    </Card>
  );
};

export default ProductCard