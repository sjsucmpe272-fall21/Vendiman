import React, { useState } from 'react';

import './supplierloginform.scss';

export const SupplierLoginForm: React.FC <{login: (detail: any) => void,error: any}> = ({login,error}) => {

  const [details, setDetails] = useState ({ name: "", email: "", password: "" });

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        login(details);
        
    }
    

  return (
    <>
      <div className="formStyle">
        <form onSubmit={submitHandler}>
              <div className="form-inner">
                  <h2>Login</h2>
                  {(error != "") ? ( <div className="error">{error}</div>) : ""}
                  <div className="form-group inputStyle">
                      <label htmlFor="name">Name: </label>
                      <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                  </div>
                  <div className="form-group inputStyle">
                      <label htmlFor="email">Email: </label>
                      <input type="text" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}  />
                  </div>
                  <div className="form-group inputStyle">
                      <label htmlFor="password">Password: </label>
                      <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}  />
                  </div>
                  <input type="submit" value="Login" />
                  <a  href="/supplier/signup" >Sign Up</a>
              </div>
        </form>
      </div>
    </>
  );
}