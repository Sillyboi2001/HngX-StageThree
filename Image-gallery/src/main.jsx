import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from './Components/SignIn.jsx';
import App from './App.jsx';
import {
  ClerkProvider,
  SignedIn
} from "@clerk/clerk-react";
import { CLERK_KEY } from '../Api/ApiKeys.js';

const REACT_APP_CLERK_PUBLISHABLE_KEY = CLERK_KEY
 
if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkWithRoutes = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    > 
     <Routes>
       <Route 
        path='/' 
        element={<SignIn redirectUrl={'/home'} />} 
        />
       <Route
          path="/home"
          element={
          <>
            <SignedIn>
              <App />
            </SignedIn>
          </>
          }
        />
     </Routes>
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
