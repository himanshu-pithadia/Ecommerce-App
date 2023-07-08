import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import PaymentB from './PaymentB';

const Cart = () => {

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect(()=>{

    setProducts(loadCart());

  },[reload])


  const loadAllProducts = (products) => {
    return(
      <div>
        {products.map((product, index)=>(
          <Card key={index} product={product} removeFromCart={true} addtoCart={false} reload={reload} setReload={setReload}/>
        ))}
      </div>
    )
  };

  const loadCheckOut = () => {
    return(
      <div>
        <h1>checkout</h1>
      </div>
    )
  }
  return (
    <Base title="Cart Page" description="Welcome to cart.">
        <div className='row text-center'>
          <div className='col-6'>
            {products.length>0 ? (loadAllProducts(products)) : (<h4>No products</h4>)}
          </div>
          <div className='col-6'>
            {products.length>0 ? (<PaymentB products={products} setReaload={setReload}/>) : (<h4>please log in or add product in cart.</h4>)}
          </div>

        </div>
      
    </Base>
  )
}

export default Cart;
