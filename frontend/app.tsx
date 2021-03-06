import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

import { Supplier } from './supplierApp/Supplier';
import { VendingMachine  } from './vendingMachine/VendingMachine';
import { AuthConsumer, AuthProvider } from './supplierApp/AuthContext';
import { NavBar } from './supplierApp/NavBar';
import { VendingMachineList } from './vendingMachine/VendingMachineList';

export const App: React.FC = () => {
  const { authed } = AuthConsumer();
  return (
    <div>
      Some helpful links here. Should be removed/modified later
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/allmachines'>All Vending Machines</Link>
        </li>
        <li>
          <Link to='/supplier'>Supplier Login Page</Link>
        </li>
        { authed && (
          <>
            <li>
              <Link to='/supplier/logout'>Supplier Logout</Link>
            </li>
            <li>
              <Link to='/dashboard'>Supplier Dashboard</Link>
            </li>
          </>
        )}
      </ul>
      <AuthProvider>
        <Route exact path='/'>
          <div>
            <h1>
              Home page for Vendiman
            </h1>
          </div>
        </Route>
        <Route path='/allmachines'>
          <VendingMachineList/>
        </Route>
        <Route path='/vending/:machineId?'>
          <VendingMachine />
        </Route>
        <Route exact={true} path='/supplier'>
          <Supplier/>
        </Route>
        <Route exact={true} path='/supplier/:page'>
          <RequireAuth>
            <NavBar/>
          </RequireAuth>
        </Route>
      </AuthProvider>
    </div>
);}

const RequireAuth: React.FC<{}> = ({children}) => {
  const { authed } = AuthConsumer();
  return authed === true 
    ? (<>{children}</>)
    : <Redirect to='/supplier'/>
}