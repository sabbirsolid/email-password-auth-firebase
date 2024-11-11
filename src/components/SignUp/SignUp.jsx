import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../email.init';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [success, setSuccess] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword]  = useState(false);

//   const handleSignUp = (event) => {
//     setErrorMessage('');
//     setSuccess('');
//     event.preventDefault();
//     const email = event.target.email.value;
//     const password = event.target.password.value;
//     const terms = event.target.terms.checked;
    
//     if(password.length < 6){
//       setErrorMessage('Password should be at least 6 characters');
//       return;
//     }

//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
//     if(!regex.test(password)){
//       setErrorMessage('Password should contain one uppercase, one lowercase, one special character');
//       return;
//     }

//     if(terms === false){
//       setErrorMessage('Accept our terms and condition');
//       return;
//     }

//     createUserWithEmailAndPassword(auth, email, password)
//     .then(result => {
//       console.log(result)
//       setSuccess('Successfully Created an Account');
//     })
//     .catch(error => {
//       console.log('error', error)
//       setErrorMessage(error)
//     })
// }
const handleSignUp = (event) => {
  setErrorMessage('');
  setSuccess('');
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const terms = event.target.terms.checked;
  const name = event.target.name.value;
  const photoURL = event.target.photoURL.value;
  const profile = {
    photoURL: photoURL,
    displayName: name
  }
  
  if(password.length < 6){
    setErrorMessage('Password should be at least 6 characters');
    return;
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
  if(!regex.test(password)){
    setErrorMessage('Password should contain one uppercase, one lowercase, one special character');
    return;
  }

  if(terms === false){
    setErrorMessage('Accept our terms and condition');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result);
      setSuccess('Successfully Created an Account');
      // setErrorMessage(''); // Clear any previous errors after success
      // verification of email address
      sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Verification Mail Sent');
      })
      // updating information
      updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log('Profile data updated')
      })
      .catch(error => console.log("error", error))
    })
    .catch(error => {
      console.log('error', error);
      setErrorMessage(error.message); // Show actual error message
    });
}

// console.log(error);
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="name" name='name' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="photoURL" name='photoURL' className="input input-bordered" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type={showPassword ? 'text' : 'password'} placeholder="password" name='password' className="input input-bordered" required />
                <button onClick={() => setShowPassword(!showPassword)} className='absolute right-6 top-12'>
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
              <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Accept our terms and condition</span>
                <input type="checkbox" name='terms' className="checkbox checkbox-success" />
              </label>
            </div>
            </form>
            {/* error message */}
            <div>
              {
                errorMessage && <div>
                  <p className='text-red-700'>{errorMessage}</p>
                </div>
              }
              {
                success && <p className='text-green-700'>{success}</p>
              }
              <p className='text-center'>Already have an account? <Link to='/login' className='font-bold text-blue-600'>Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;