import { useState, useEffect, useRef } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')
  const errRef = useRef();
  const navigate = useNavigate()
  useEffect(() => {
    setErr('');
  }, [email, password]);
  const users = [{
    email: 'user@example.com',
    password: '1Password'
  }]

  const handleSignIn = (e) => {
    e.preventDefault()
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setSuccess(true);
      navigate('/home');
    } else {
      setErr('Invalid Email or Password')
    } 
    errRef.current.focus();
  }

  return (
  <>
    <nav>
      <div className="brand">
        <h1 href="#">ARTFRAME</h1>
      </div>
    </nav>
    {success ? (
      <div className='loaded-center'> 
        <ClipLoader
          color={'steelblue'}
          loading={success}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
      </div>
    ) : 
    <div className="signup-form">
    <p ref={errRef} className={err ? 'errmsg' : 'offscreen'} aria-live="assertive">{err}</p>
    <h1>Sign In</h1>
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        className="input-box"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required
      />
      <input
        type="password"
        className="input-box"
        placeholder="Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="signup-btn">Sign In</button>
      <hr />
      <p className="or">OR</p>
      <button type="button"
       className="twitter-btn"
      >Login with Google</button>
      <p>Don&apos; t have an account?<a href="#">Sign Up</a></p>
    </form>
  </div>
    }
  </>
  )
}
  
export default SignIn;