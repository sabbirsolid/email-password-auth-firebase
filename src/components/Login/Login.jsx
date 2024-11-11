import React, { useRef, useState } from 'react';
import { auth } from '../../email.init';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef()
    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        setSuccess(false);
        setErrorMessage('')
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result);
            if(!result.user.emailVerified){
                setErrorMessage('Verify your mail');
            }
            else{
                setSuccess(true);
                console.log(result.user);
            }
        })
        .catch(error => {
            console.log("Error", error.message);
            setErrorMessage(error.message);
        })
    }
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            alert('provide a valid email address');
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email is sent, check your mail');
            })
        }
    }
    
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 mx-auto mt-5 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a onClick={handleForgotPassword} href="#"  className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button  className="btn btn-primary">Login</button>
          </div>
        </form>
        {
            success && <p className='text-green-700 text-center'>Successfully Logged in</p>
        }
        {
            errorMessage && <p className='text-center text-red-600'>{errorMessage}</p>
        }
        <p className='text-center'>New to this website? <Link to='/signup' className='font-bold text-blue-700 '>Sign Up</Link></p>
      </div>
    );
};

export default Login;