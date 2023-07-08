import React from 'react'
import Menu from './Menu';

const Base = ({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
}) => {
  return (
    <div>
      <Menu/>
      <div className='container-fluid'>
        <div className='jumbotron bg-dark text-white text-center'>
            <h2 className='display-4'>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className='footer bg-dark mt-auto py-3'>
            <div className='container-fluid bg-success text-white text-center py-3'>
                <h1>if you have any quetions reach me out on instagram.</h1>
                <button className='btn btn-warning btn-lg'>Contanct us</button>
                <div className='container'>
                    <span className='text-warning'>Amazing T-Shirt Store.</span>
                </div>
            </div>
      </footer>
    </div>
  )
}

export default Base;