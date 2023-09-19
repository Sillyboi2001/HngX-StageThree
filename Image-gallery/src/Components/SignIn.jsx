import { useState, useEffect, useRef } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from "@clerk/clerk-react";

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')

  const { isLoaded, signIn, setActive } = useSignIn();
  const errRef = useRef();
  const navigate = useNavigate()
  useEffect(() => {
    setErr('');
  }, [email, password]);

  if (!isLoaded) {
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    await signIn
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          console.log(result);
          setActive({ session: result.createdSessionId });
          setSuccess(true)
          navigate('/home')
        }
         else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  const loginWithGoogle = () => {
      navigate('/home')
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
    <form onSubmit={submit}>
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
       onClick={loginWithGoogle}
      >Login with Google</button>
      <p>Don&apos; t have an account?<a href="#">Sign Up</a></p>
    </form>
  </div>
    }
  </>
  )
}
  
export default SignInForm;