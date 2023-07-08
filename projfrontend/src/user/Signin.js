import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Navigate } from 'react-router-dom'
import { signin, authenticate, isAuthenticatedUser } from '../auth/helper'

const Signin = () => {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        loading:false,
        didRedirect:false
    })
    const { name, email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:false, loading:true});

    signin({email,password})
    .then((data)=>{
        
        if(data.token){
            // let sessionToken = data.token;
            authenticate(data, ()=>{
                console.log("token added");
                setValues({...values, didRedirect:true})
            });
        }
        else{
            setValues({...values, loading:false})
        }
    })
    .catch(err=>console.log(err));
  }

  const performRedirect = () => {
    if(isAuthenticatedUser()){
        return <Navigate to="/"/>
    }
  };

  const loadingMessage = () => {
    return (
        loading && (
            <div className='alert alert-info'>
                <h2>Loading...</h2>
            </div>
        )
    )
  }



    const signinForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
               
                <div className="form-group mt-2">
                  <label className="text-light">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    type="text"
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="text-light">Password</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                  />
                </div>
                <button
                  onClick={onSubmit}
                  className="btn btn-success btn-block mt-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };

      const successMessage = () => {
        return(
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{display: success? "":"none"}}>
                    New account created successfully, Please <Link to="/signin">login now.</Link>
                </div>
            </div>
    
          </div>
        )
      }
    
      const errorMessage = () => {
        return(
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display: error? "":"none"}}>
                    Check all fields again.
                </div>
            </div>
    
          </div>
        )
      }
    
  return (
    <Base title='Sign in '>
        {loadingMessage()}
        {signinForm()}
        <p className='text-center'>{JSON.stringify(values)}</p>
        {performRedirect()}
    </Base>
  )
}

export default Signin;