import React, {useState, useEffect} from 'react';
import getProducts from "./helper/coreapicalls"
import Base from './Base';
import "../styles.css";
import Card from './Card';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const getAllProducts = () => {
    getProducts()
    .then((data)=>{
      if(data.error){
        setError(data.error);
        console.log(data.error);
      }
      else
      {
        setProducts(data);
      }
    });
  };

  useEffect(()=>{
    getAllProducts();
  },[]);
  return (
    <Base title='Home Page' description='Welcome to T-Shirt Store.'>
        <h1>Home Component</h1>
        <div className='row'>
          {products.map((product, index)=>{
            return(
              <div key={index} className='col-4 mb-4'>
                <Card product={product}/>
              </div>
            )
          })}
        </div>
    </Base>
  )
}

export default Home;
